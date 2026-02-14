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

    // Find completed appointments that haven't had follow-up sent
    // Look for appointments whose scheduled time + duration has passed + delay_hours
    const { data: configs } = await supabase
      .from("post_job_configs")
      .select("*, client_accounts(business_name, google_review_url)")
      .eq("active", true);

    if (!configs?.length) {
      return new Response(JSON.stringify({ processed: 0 }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let totalProcessed = 0;
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    for (const config of configs) {
      const delayMs = (config.delay_hours || 2) * 60 * 60 * 1000;
      const cutoff = new Date(Date.now() - delayMs).toISOString();

      // Get completed appointments that ended before the cutoff and haven't been followed up
      const { data: appointments } = await supabase
        .from("appointments")
        .select("*")
        .eq("client_account_id", config.client_account_id)
        .eq("followup_sent", false)
        .in("status", ["completed", "confirmed"])
        .lte("scheduled_at", cutoff)
        .limit(20);

      if (!appointments?.length) continue;

      const businessName = (config.client_accounts as any)?.business_name || "us";
      const googleUrl = (config.client_accounts as any)?.google_review_url;

      // Get client phone config
      const { data: clientConfig } = await supabase
        .from("client_configs")
        .select("phone_config")
        .eq("client_account_id", config.client_account_id)
        .single();

      const fromPhone = (clientConfig?.phone_config as any)?.phoneNumber || Deno.env.get("TWILIO_FROM_NUMBER");

      for (const appt of appointments) {
        // Send satisfaction check SMS
        const smsBody = config.satisfaction_sms
          .replace(/\{\{name\}\}/g, appt.customer_name || "there")
          .replace(/\{\{business\}\}/g, businessName);

        await fetch(`${supabaseUrl}/functions/v1/send-followup-sms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${anonKey}`,
          },
          body: JSON.stringify({
            to: appt.customer_phone,
            from: fromPhone,
            body: smsBody,
            clientAccountId: config.client_account_id,
          }),
        });

        // If review redirect is enabled, also trigger a review request
        let reviewSent = false;
        if (config.review_redirect_enabled) {
          // Create a review entry and send the link
          const { data: review } = await supabase
            .from("reviews")
            .insert({
              client_account_id: config.client_account_id,
              customer_name: appt.customer_name,
              customer_phone: appt.customer_phone,
              customer_email: appt.customer_email || null,
            })
            .select("token")
            .single();

          if (review?.token) {
            // Determine the base URL for the review link
            const siteUrl = Deno.env.get("SITE_URL") || `${supabaseUrl.replace('.supabase.co', '.lovable.app')}`;
            const reviewLink = `${siteUrl}/review/${review.token}`;

            await fetch(`${supabaseUrl}/functions/v1/send-followup-sms`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${anonKey}`,
              },
              body: JSON.stringify({
                to: appt.customer_phone,
                from: fromPhone,
                body: `We'd love to hear your feedback, ${appt.customer_name}! Please take a moment to share your experience: ${reviewLink}`,
                clientAccountId: config.client_account_id,
              }),
            });
            reviewSent = true;
          }
        }

        // Log the follow-up
        await supabase.from("post_job_log").insert({
          client_account_id: config.client_account_id,
          appointment_id: appt.id,
          customer_name: appt.customer_name,
          customer_phone: appt.customer_phone,
          step: "satisfaction",
          review_sent: reviewSent,
        });

        // Mark appointment as followed up
        await supabase.from("appointments")
          .update({ followup_sent: true })
          .eq("id", appt.id);

        totalProcessed++;
      }
    }

    return new Response(JSON.stringify({ processed: totalProcessed }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("post-job-followup error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
