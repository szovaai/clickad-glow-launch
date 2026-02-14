import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { to, from, body, clientAccountId, callLogId } = await req.json();

    if (!to || !body) {
      return new Response(JSON.stringify({ error: "Missing to or body" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const twilioSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioAuth = Deno.env.get("TWILIO_AUTH_TOKEN");

    if (!twilioSid || !twilioAuth) {
      return new Response(JSON.stringify({ error: "Twilio credentials not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fromNumber = from || Deno.env.get("TWILIO_FROM_NUMBER");
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
    const formData = new URLSearchParams();
    formData.append("To", to);
    formData.append("From", fromNumber);
    formData.append("Body", body);

    const twilioResp = await fetch(twilioUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${twilioSid}:${twilioAuth}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const smsStatus = twilioResp.ok ? "sent" : "failed";

    // Log to DB
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    await supabase.from("sms_messages").insert({
      client_account_id: clientAccountId,
      call_log_id: callLogId || null,
      to_phone: to,
      from_phone: fromNumber,
      body,
      status: smsStatus,
      sent_at: smsStatus === "sent" ? new Date().toISOString() : null,
    });

    return new Response(JSON.stringify({ success: true, status: smsStatus }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-followup-sms error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
