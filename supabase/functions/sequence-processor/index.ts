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

    // Find enrollments due for next action
    const now = new Date().toISOString();
    const { data: dueEnrollments, error } = await supabase
      .from("sequence_enrollments")
      .select("*, follow_up_sequences(*)")
      .eq("status", "active")
      .lte("next_action_at", now)
      .limit(50);

    if (error) throw error;
    if (!dueEnrollments?.length) {
      return new Response(JSON.stringify({ processed: 0 }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let processed = 0;

    for (const enrollment of dueEnrollments) {
      const sequence = enrollment.follow_up_sequences;
      if (!sequence) continue;

      const steps = sequence.steps as any[];
      if (!steps?.length || enrollment.current_step >= steps.length) {
        // Sequence complete
        await supabase.from("sequence_enrollments")
          .update({ status: "completed" })
          .eq("id", enrollment.id);
        continue;
      }

      const step = steps[enrollment.current_step];

      // Send SMS for this step
      if (step.type === "sms" && step.body) {
        const { data: config } = await supabase
          .from("client_configs")
          .select("phone_config")
          .eq("client_account_id", enrollment.client_account_id)
          .single();

        const fromPhone = (config?.phone_config as any)?.phoneNumber || Deno.env.get("TWILIO_FROM_NUMBER");

        // Call send-followup-sms function
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

        await fetch(`${supabaseUrl}/functions/v1/send-followup-sms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${anonKey}`,
          },
          body: JSON.stringify({
            to: enrollment.contact_phone,
            from: fromPhone,
            body: step.body.replace("{{name}}", enrollment.contact_name || "there"),
            clientAccountId: enrollment.client_account_id,
          }),
        });
      }

      // Calculate next step timing
      const nextStep = enrollment.current_step + 1;
      const nextStepData = steps[nextStep];
      let nextActionAt: string | null = null;

      if (nextStepData) {
        const delayHours = nextStepData.delayHours || 24;
        nextActionAt = new Date(Date.now() + delayHours * 60 * 60 * 1000).toISOString();
      }

      await supabase.from("sequence_enrollments")
        .update({
          current_step: nextStep,
          status: nextStep >= steps.length ? "completed" : "active",
          next_action_at: nextActionAt,
        })
        .eq("id", enrollment.id);

      processed++;
    }

    return new Response(JSON.stringify({ processed }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("sequence-processor error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
