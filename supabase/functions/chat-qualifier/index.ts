import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().max(4000),
    })
  ).max(50),
  clientAccountId: z.string().uuid().optional(),
  visitorId: z.string().max(200).optional(),
  conversationId: z.string().uuid().optional(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const raw = await req.json();
    const { messages, clientAccountId, visitorId, conversationId } = RequestSchema.parse(raw);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch client knowledge base for context
    let knowledgeContext = "";
    if (clientAccountId) {
      const { data: config } = await supabase
        .from("client_configs")
        .select("knowledge_base, qualification_rules")
        .eq("client_account_id", clientAccountId)
        .single();

      if (config) {
        const kb = config.knowledge_base as any;
        const qr = config.qualification_rules as any;
        const parts: string[] = [];
        if (kb?.serviceDescriptions) parts.push(`Services: ${kb.serviceDescriptions}`);
        if (kb?.pricingRanges) parts.push(`Pricing: ${kb.pricingRanges}`);
        if (kb?.policies) parts.push(`Policies: ${kb.policies}`);
        if (kb?.faqs?.length) parts.push(`FAQs:\n${kb.faqs.map((f: any) => `Q: ${f.question}\nA: ${f.answer}`).join("\n")}`);
        if (qr?.budgetMin) parts.push(`Minimum budget: $${qr.budgetMin}`);
        if (qr?.jobTypeFilters?.length) parts.push(`Job types served: ${qr.jobTypeFilters.join(", ")}`);
        if (qr?.locationFilters?.length) parts.push(`Service areas: ${qr.locationFilters.join(", ")}`);
        knowledgeContext = parts.join("\n\n");
      }
    }

    let businessName = "our company";
    if (clientAccountId) {
      const { data: account } = await supabase
        .from("client_accounts")
        .select("business_name, industry")
        .eq("id", clientAccountId)
        .single();
      if (account) businessName = account.business_name;
    }

    const systemPrompt = `You are an AI sales assistant for ${businessName}. Your goal is to qualify leads and help visitors book appointments.

QUALIFICATION PROCESS:
1. Greet warmly and ask what service they need
2. Collect their name, phone number, and email naturally through conversation
3. Ask qualifying questions about their project scope, budget range, timeline, and location
4. If qualified (meets budget minimum, in service area, valid job type): encourage them to book an appointment
5. If not qualified: politely capture their info and let them know someone will follow up
6. If after business hours: suggest booking the next available time slot

Be conversational, helpful, and professional. Don't ask all questions at once — have a natural dialogue.
When you have enough info to qualify, respond with a JSON block at the end of your message like:
\`\`\`qualification
{"qualified": true/false, "name": "...", "phone": "...", "email": "...", "service": "...", "notes": "..."}
\`\`\`

${knowledgeContext ? `\nBUSINESS KNOWLEDGE BASE:\n${knowledgeContext}` : ""}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: "Invalid input", details: e.errors }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    console.error("chat-qualifier error:", e);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
