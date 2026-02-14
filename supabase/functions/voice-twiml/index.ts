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

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const baseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabase = createClient(baseUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // Twilio sends form-encoded data
    const formData = await req.formData();
    const callerPhone = formData.get("From") as string || "";
    const calledNumber = formData.get("To") as string || "";

    const url = new URL(req.url);
    let clientId = url.searchParams.get("clientId") || "";

    // Resolve clientId from called number
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
        return twiml(`<Say>Sorry, this number is not configured. Goodbye.</Say><Hangup/>`);
      }
    }

    // Check if voice AI is active
    const { data: voiceConfig } = await supabase
      .from("voice_configs")
      .select("active")
      .eq("client_account_id", clientId)
      .maybeSingle();

    if (!voiceConfig?.active) {
      return twiml(`<Say>This service is currently unavailable. Please call back later. Goodbye.</Say><Hangup/>`);
    }

    // Build WebSocket URL for the voice-stream bridge
    // Convert https:// to wss:// for WebSocket connection
    const wsUrl = baseUrl.replace("https://", "wss://");
    const streamUrl = `${wsUrl}/functions/v1/voice-stream?clientId=${clientId}`;

    // Return TwiML that opens a bidirectional stream
    return twiml(
      `<Connect>` +
        `<Stream url="${streamUrl}">` +
          `<Parameter name="callerPhone" value="${callerPhone}" />` +
        `</Stream>` +
      `</Connect>`
    );
  } catch (e) {
    console.error("voice-twiml error:", e);
    return twiml(`<Say>I'm sorry, something went wrong. Please try again later. Goodbye.</Say><Hangup/>`);
  }
});
