import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { callerPhone, clientAccountId, direction, callStatus } = await req.json();

    if (!callerPhone || !clientAccountId) {
      return new Response(JSON.stringify({ error: "Missing callerPhone or clientAccountId" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Log the call
    const { data: callLog, error: callErr } = await supabase
      .from("call_logs")
      .insert({
        client_account_id: clientAccountId,
        caller_phone: callerPhone,
        direction: direction || "inbound",
        status: callStatus || "missed",
      })
      .select()
      .single();

    if (callErr) throw callErr;

    // If missed, send text-back
    if (callStatus === "missed" || !callStatus) {
      // Get phone config
      const { data: config } = await supabase
        .from("client_configs")
        .select("phone_config")
        .eq("client_account_id", clientAccountId)
        .single();

      const phoneConfig = config?.phone_config as any;
      if (phoneConfig?.missedCallTextBack && phoneConfig?.phoneNumber) {
        const message = phoneConfig.autoReplyMessage || "Sorry we missed your call! Want to book a time? Reply YES.";

        // Send SMS via Twilio
        const twilioSid = Deno.env.get("TWILIO_ACCOUNT_SID");
        const twilioAuth = Deno.env.get("TWILIO_AUTH_TOKEN");
        const twilioFrom = phoneConfig.phoneNumber;

        if (twilioSid && twilioAuth) {
          const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
          const formData = new URLSearchParams();
          formData.append("To", callerPhone);
          formData.append("From", twilioFrom);
          formData.append("Body", message);

          const twilioResp = await fetch(twilioUrl, {
            method: "POST",
            headers: {
              Authorization: `Basic ${btoa(`${twilioSid}:${twilioAuth}`)}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
          });

          const smsStatus = twilioResp.ok ? "sent" : "failed";

          // Log SMS
          await supabase.from("sms_messages").insert({
            client_account_id: clientAccountId,
            call_log_id: callLog.id,
            to_phone: callerPhone,
            from_phone: twilioFrom,
            body: message,
            status: smsStatus,
            sent_at: smsStatus === "sent" ? new Date().toISOString() : null,
          });
        }

        // Enroll in missed-call follow-up sequence
        const { data: sequences } = await supabase
          .from("follow_up_sequences")
          .select("id")
          .eq("client_account_id", clientAccountId)
          .eq("trigger_event", "missed_call")
          .eq("active", true)
          .limit(1);

        if (sequences?.length) {
          await supabase.from("sequence_enrollments").insert({
            sequence_id: sequences[0].id,
            client_account_id: clientAccountId,
            contact_phone: callerPhone,
            next_action_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // first follow-up in 24h
          });
        }
      }
    }

    return new Response(JSON.stringify({ success: true, callLogId: callLog.id }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("missed-call-webhook error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
