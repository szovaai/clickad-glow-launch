import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const now = new Date();
    const in1h = new Date(now.getTime() + 65 * 60 * 1000); // 1h5m from now
    const in24h = new Date(now.getTime() + 24.1 * 60 * 60 * 1000); // ~24h from now
    const in23h = new Date(now.getTime() + 23 * 60 * 60 * 1000); // ~23h from now

    // Find appointments needing 24h reminder (between 23-24h from now)
    const { data: remind24h } = await supabase
      .from("appointments")
      .select("*, client_accounts(business_name)")
      .eq("status", "confirmed")
      .eq("reminder_24h_sent", false)
      .gte("scheduled_at", in23h.toISOString())
      .lte("scheduled_at", in24h.toISOString());

    // Find appointments needing 1h reminder (within next 65 min)
    const { data: remind1h } = await supabase
      .from("appointments")
      .select("*, client_accounts(business_name)")
      .eq("status", "confirmed")
      .eq("reminder_1h_sent", false)
      .gte("scheduled_at", now.toISOString())
      .lte("scheduled_at", in1h.toISOString());

    const twilioSid = Deno.env.get("TWILIO_ACCOUNT_SID");
    const twilioAuth = Deno.env.get("TWILIO_AUTH_TOKEN");
    const twilioFrom = Deno.env.get("TWILIO_FROM_NUMBER");
    const hasTwilio = twilioSid && twilioAuth && twilioFrom;

    let sent24h = 0;
    let sent1h = 0;

    const sendSMS = async (to: string, body: string) => {
      if (!hasTwilio) return false;
      const url = `https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`;
      const form = new URLSearchParams();
      form.append("To", to);
      form.append("From", twilioFrom!);
      form.append("Body", body);
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(`${twilioSid}:${twilioAuth}`)}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
      });
      return resp.ok;
    };

    const formatTime = (iso: string) => {
      const d = new Date(iso);
      return d.toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", hour12: true });
    };

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const baseUrl = supabaseUrl.replace("/rest/v1", "").replace("https://", "https://");

    // Send 24h reminders
    for (const appt of remind24h || []) {
      const bizName = (appt as any).client_accounts?.business_name || "us";
      const rescheduleLink = `${baseUrl.replace(".supabase.co", ".supabase.co")}/functions/v1/appointment-reminder?action=reschedule&token=${appt.reschedule_token}`;
      const body = `Reminder: Your appointment with ${bizName} is tomorrow at ${formatTime(appt.scheduled_at)}. Need to reschedule? Reply RESCHEDULE or tap: ${rescheduleLink}`;
      
      const ok = await sendSMS(appt.customer_phone, body);
      if (ok || !hasTwilio) {
        await supabase.from("appointments").update({ reminder_24h_sent: true }).eq("id", appt.id);
        sent24h++;
      }
    }

    // Send 1h reminders
    for (const appt of remind1h || []) {
      const bizName = (appt as any).client_accounts?.business_name || "us";
      const body = `Hi ${appt.customer_name}! Just a heads up — your appointment with ${bizName} is in about 1 hour (${formatTime(appt.scheduled_at)}). See you soon! Reply CANCEL if you can't make it.`;
      
      const ok = await sendSMS(appt.customer_phone, body);
      if (ok || !hasTwilio) {
        await supabase.from("appointments").update({ reminder_1h_sent: true }).eq("id", appt.id);
        sent1h++;
      }
    }

    console.log(`[appointment-reminder] Sent ${sent24h} 24h reminders, ${sent1h} 1h reminders`);

    return new Response(JSON.stringify({ sent24h, sent1h }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("appointment-reminder error:", e);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
