import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory conversation store (per isolate lifetime)
const conversations = new Map<string, { role: string; content: string }[]>();

function twiml(body: string): Response {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><Response>${body}</Response>`,
    { headers: { ...corsHeaders, "Content-Type": "text/xml" } }
  );
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Twilio sends form-encoded data
    const formData = await req.formData();
    const callSid = formData.get("CallSid") as string || "";
    const speechResult = formData.get("SpeechResult") as string || "";
    const callerPhone = formData.get("From") as string || "";
    const calledNumber = formData.get("To") as string || "";

    // Get clientId from query param or look up by phone number
    let clientId = url.searchParams.get("clientId") || "";
    const voice = url.searchParams.get("voice") || "Polly.Joanna";

    if (!clientId) {
      // First call — look up client by their Twilio phone number
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
        return twiml(`<Say voice="${voice}">Sorry, this number is not configured. Goodbye.</Say><Hangup/>`);
      }
    }

    // Load client data
    const [voiceConfigRes, clientRes, clientConfigRes] = await Promise.all([
      supabase.from("voice_configs").select("*").eq("client_account_id", clientId).maybeSingle(),
      supabase.from("client_accounts").select("business_name, services, industry").eq("id", clientId).single(),
      supabase.from("client_configs").select("knowledge_base").eq("client_account_id", clientId).maybeSingle(),
    ]);

    const voiceConfig = voiceConfigRes.data;
    const client = clientRes.data;
    const knowledgeBase = clientConfigRes.data?.knowledge_base;

    if (!voiceConfig?.active) {
      return twiml(`<Say voice="${voice}">This service is currently unavailable. Please call back later. Goodbye.</Say><Hangup/>`);
    }

    // Get selected voice from transfer_rules
    const selectedVoice = (voiceConfig.transfer_rules as any)?.voiceSelection || voice;

    const baseUrl = Deno.env.get("SUPABASE_URL")!;
    const actionUrl = `${baseUrl}/functions/v1/voice-twiml?clientId=${clientId}&voice=${encodeURIComponent(selectedVoice)}`;

    const templateVars: Record<string, string> = {
      business_name: client?.business_name || "us",
    };

    // First turn — no speech yet, play greeting
    if (!speechResult) {
      conversations.set(callSid, []);

      const greeting = resolveTemplate(
        voiceConfig.greeting_script || 
          "Hello, thank you for calling {{business_name}}. How can I help you today?",
        templateVars
      );

      return twiml(
        `<Gather input="speech" action="${actionUrl}" speechTimeout="auto" language="en-US">` +
        `<Say voice="${selectedVoice}">${escapeXml(greeting)}</Say>` +
        `</Gather>` +
        `<Say voice="${selectedVoice}">I didn't hear anything. Goodbye!</Say><Hangup/>`
      );
    }

    // Subsequent turns — process speech with Gemini
    const history = conversations.get(callSid) || [];
    history.push({ role: "user", content: speechResult });

    // Build system prompt
    const kbContent = knowledgeBase ? 
      Object.entries(knowledgeBase as Record<string, any>)
        .map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`)
        .join("\n") : "";

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

    const messages = [
      { role: "system", content: systemPrompt },
      ...history,
    ];

    // Call Gemini via Lovable AI gateway
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return twiml(`<Say voice="${selectedVoice}">I'm having technical difficulties. Please call back shortly. Goodbye.</Say><Hangup/>`);
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
      return twiml(`<Say voice="${selectedVoice}">I'm sorry, I'm having trouble right now. Can I take your number and have someone call you back?</Say><Hangup/>`);
    }

    const aiData = await aiResponse.json();
    const assistantMessage = aiData.choices?.[0]?.message?.content || "I'm sorry, could you repeat that?";

    history.push({ role: "assistant", content: assistantMessage });
    conversations.set(callSid, history);

    // Check if conversation should end (transfer, booking, or goodbye)
    const shouldEnd = /goodbye|transfer|have a great day|talk to you soon/i.test(assistantMessage);

    if (shouldEnd) {
      // Save transcript via voice-webhook
      try {
        await fetch(`${baseUrl}/functions/v1/voice-webhook`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientAccountId: clientId,
            callerPhone,
            transcript: history.map((h, i) => ({ role: h.role, content: h.content, timestamp: i })),
            summary: `Call with ${callerPhone}. ${history.length} turns.`,
            outcome: /transfer/i.test(assistantMessage) ? "transferred" : 
                     /book|appointment|schedule/i.test(assistantMessage) ? "booked" : "qualified",
            durationSeconds: history.length * 15,
          }),
        });
      } catch (e) {
        console.error("Failed to save transcript:", e);
      }

      conversations.delete(callSid);
      return twiml(`<Say voice="${selectedVoice}">${escapeXml(assistantMessage)}</Say><Hangup/>`);
    }

    // Continue conversation
    return twiml(
      `<Gather input="speech" action="${actionUrl}" speechTimeout="auto" language="en-US">` +
      `<Say voice="${selectedVoice}">${escapeXml(assistantMessage)}</Say>` +
      `</Gather>` +
      `<Say voice="${selectedVoice}">I didn't catch that. Could you please repeat?</Say>` +
      `<Gather input="speech" action="${actionUrl}" speechTimeout="auto" language="en-US"/>` +
      `<Say voice="${selectedVoice}">I still couldn't hear you. Goodbye!</Say><Hangup/>`
    );
  } catch (e) {
    console.error("voice-twiml error:", e);
    return twiml(`<Say voice="Polly.Joanna">I'm sorry, something went wrong. Please try again later. Goodbye.</Say><Hangup/>`);
  }
});

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
