import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function twiml(body: string): Response {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><Response>${body}</Response>`,
    { headers: { ...corsHeaders, "Content-Type": "text/xml" } }
  );
}

function resolveTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] || "");
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildPlayUrl(baseUrl: string, text: string): string {
  const url = `${baseUrl}/functions/v1/voice-tts?text=${encodeURIComponent(text)}`;
  return url.replace(/&/g, "&amp;");
}

function buildGatherWithPlay(baseUrl: string, text: string, actionUrl: string): string {
  const playUrl = buildPlayUrl(baseUrl, text);
  return (
    `<Gather input="speech" action="${actionUrl}" speechTimeout="auto" language="en-US">` +
    `<Play>${playUrl}</Play>` +
    `</Gather>`
  );
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const baseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabase = createClient(baseUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // Twilio sends form-encoded data
    const formData = await req.formData();
    const callSid = formData.get("CallSid") as string || "";
    const speechResult = formData.get("SpeechResult") as string || "";
    const callerPhone = formData.get("From") as string || "";
    const calledNumber = formData.get("To") as string || "";

    // Resolve clientId
    let clientId = url.searchParams.get("clientId") || "";

    if (!clientId) {
      const { data: configs } = await supabase
        .from("client_configs")
        .select("client_account_id, phone_config")
        .not("phone_config", "is", null);

      if (configs) {
        for (const cfg of configs) {
          const pc = cfg.phone_config as any;
          if (pc?.twilioPhoneNumber && calledNumber.includes(pc.twilioPhoneNumber.replace(/\D/g, ""))) {
            clientId = cfg.client_account_id;
            break;
          }
        }
      }

      if (!clientId) {
        return twiml(`<Say voice="Polly.Joanna">Sorry, this number is not configured. Goodbye.</Say><Hangup/>`);
      }
    }

    // Load client data in parallel
    const [voiceConfigRes, clientRes, clientConfigRes] = await Promise.all([
      supabase.from("voice_configs").select("*").eq("client_account_id", clientId).maybeSingle(),
      supabase.from("client_accounts").select("business_name, services, industry").eq("id", clientId).single(),
      supabase.from("client_configs").select("knowledge_base").eq("client_account_id", clientId).maybeSingle(),
    ]);

    const voiceConfig = voiceConfigRes.data;
    const client = clientRes.data;
    const knowledgeBase = clientConfigRes.data?.knowledge_base;

    if (!voiceConfig?.active) {
      const msg = "This service is currently unavailable. Please call back later. Goodbye.";
      return twiml(`<Play>${buildPlayUrl(baseUrl, msg)}</Play><Hangup/>`);
    }

    const safeActionUrl = `${baseUrl}/functions/v1/voice-twiml?clientId=${clientId}`.replace(/&/g, "&amp;");
    const templateVars: Record<string, string> = { business_name: client?.business_name || "us" };

    // === FIRST TURN — no speech yet, play greeting ===
    if (!speechResult) {
      // Create conversation record in DB
      await supabase.from("voice_conversations").upsert({
        call_sid: callSid,
        client_account_id: clientId,
        caller_phone: callerPhone,
        messages: [],
      }, { onConflict: "call_sid" });

      const greeting = resolveTemplate(
        voiceConfig.greeting_script || "Hello, thank you for calling {{business_name}}. How can I help you today?",
        templateVars
      );

      return twiml(
        buildGatherWithPlay(baseUrl, greeting, safeActionUrl) +
        `<Say voice="Polly.Joanna">I didn't hear anything. Goodbye!</Say><Hangup/>`
      );
    }

    // === SUBSEQUENT TURNS — load history from DB ===
    const { data: convData } = await supabase
      .from("voice_conversations")
      .select("messages")
      .eq("call_sid", callSid)
      .maybeSingle();

    const history: { role: string; content: string }[] = convData?.messages || [];
    history.push({ role: "user", content: speechResult });

    // Build system prompt
    const kbContent = knowledgeBase
      ? Object.entries(knowledgeBase as Record<string, any>)
          .map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`)
          .join("\n")
      : "";

    const systemPrompt = `You are a friendly, professional female AI receptionist for ${client?.business_name || "the business"}.
Industry: ${client?.industry || "general services"}
Services: ${client?.services?.join(", ") || "various services"}

Greeting script: ${resolveTemplate(voiceConfig.greeting_script || "", templateVars)}
Qualification questions: ${resolveTemplate(voiceConfig.qualification_script || "", templateVars)}
Booking script: ${resolveTemplate(voiceConfig.booking_script || "", templateVars)}
${kbContent ? `\nKnowledge base:\n${kbContent}` : ""}

Rules:
- Keep responses conversational and under 3 sentences.
- If the caller needs emergency service, say you'll transfer them right away.
- If the caller is qualified, offer to book an appointment.
- Be warm, helpful, and natural-sounding.
- Never mention you are an AI unless directly asked.
- If you can't help, offer to take a message or transfer to a team member.`;

    const messages = [{ role: "system", content: systemPrompt }, ...history];

    // Call AI via Lovable AI gateway
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      const msg = "I'm having technical difficulties. Please call back shortly. Goodbye.";
      return twiml(`<Play>${buildPlayUrl(baseUrl, msg)}</Play><Hangup/>`);
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        max_tokens: 200,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      const msg = "I'm sorry, I'm having trouble right now. Can I take your number and have someone call you back?";
      return twiml(`<Play>${buildPlayUrl(baseUrl, msg)}</Play><Hangup/>`);
    }

    const aiData = await aiResponse.json();
    const assistantMessage = aiData.choices?.[0]?.message?.content || "I'm sorry, could you repeat that?";

    // Save updated history to DB
    history.push({ role: "assistant", content: assistantMessage });
    await supabase
      .from("voice_conversations")
      .update({ messages: history, updated_at: new Date().toISOString() })
      .eq("call_sid", callSid);

    // Check if conversation should end
    const shouldEnd = /goodbye|transfer|have a great day|talk to you soon/i.test(assistantMessage);

    if (shouldEnd) {
      // Save transcript and clean up
      try {
        await fetch(`${baseUrl}/functions/v1/voice-webhook`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientAccountId: clientId,
            callerPhone,
            transcript: history.map((h, i) => ({ role: h.role, content: h.content, timestamp: i })),
            summary: `Call with ${callerPhone}. ${history.length} turns.`,
            outcome: /transfer/i.test(assistantMessage) ? "transferred"
              : /book|appointment|schedule/i.test(assistantMessage) ? "booked" : "qualified",
            durationSeconds: history.length * 15,
          }),
        });
      } catch (e) {
        console.error("Failed to save transcript:", e);
      }

      // Clean up conversation record
      await supabase.from("voice_conversations").delete().eq("call_sid", callSid);

      return twiml(`<Play>${buildPlayUrl(baseUrl, assistantMessage)}</Play><Hangup/>`);
    }

    // Continue conversation
    return twiml(
      buildGatherWithPlay(baseUrl, assistantMessage, safeActionUrl) +
      `<Say voice="Polly.Joanna">I didn't catch that. Could you please repeat?</Say>` +
      `<Gather input="speech" action="${safeActionUrl}" speechTimeout="auto" language="en-US"/>` +
      `<Say voice="Polly.Joanna">I still couldn't hear you. Goodbye!</Say><Hangup/>`
    );
  } catch (e) {
    console.error("voice-twiml error:", e);
    return twiml(`<Say voice="Polly.Joanna">I'm sorry, something went wrong. Please try again later. Goodbye.</Say><Hangup/>`);
  }
});
