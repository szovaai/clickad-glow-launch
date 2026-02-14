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

    // Get all active reactivation campaigns
    const { data: campaigns, error: campError } = await supabase
      .from("reactivation_campaigns")
      .select("*, client_accounts(business_name, services)")
      .eq("active", true);

    if (campError) throw campError;
    if (!campaigns?.length) {
      return new Response(JSON.stringify({ processed: 0, message: "No active campaigns" }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let totalProcessed = 0;

    for (const campaign of campaigns) {
      const minDate = new Date(Date.now() - campaign.inactive_days_max * 86400000).toISOString();
      const maxDate = new Date(Date.now() - campaign.inactive_days_min * 86400000).toISOString();

      // Find cold leads from chat conversations
      const { data: coldChats } = await supabase
        .from("chat_conversations")
        .select("id, visitor_name, visitor_phone, visitor_email, updated_at")
        .eq("client_account_id", campaign.client_account_id)
        .gte("updated_at", minDate)
        .lte("updated_at", maxDate)
        .not("visitor_phone", "is", null);

      // Find cold leads from call logs
      const { data: coldCalls } = await supabase
        .from("call_logs")
        .select("id, caller_phone, created_at")
        .eq("client_account_id", campaign.client_account_id)
        .gte("created_at", minDate)
        .lte("created_at", maxDate);

      // Get already-contacted phones to avoid duplicates
      const { data: alreadyContacted } = await supabase
        .from("reactivation_log")
        .select("contact_phone, contact_email")
        .eq("campaign_id", campaign.id);

      const contactedSet = new Set(
        (alreadyContacted || []).map(c => c.contact_phone || c.contact_email)
      );

      const leadsToContact: Array<{
        phone?: string; email?: string; name?: string;
        inquiry?: string; sourceType: string; sourceId: string;
      }> = [];

      // Collect chat leads
      for (const chat of (coldChats || [])) {
        const key = chat.visitor_phone || chat.visitor_email;
        if (key && !contactedSet.has(key)) {
          contactedSet.add(key);
          leadsToContact.push({
            phone: chat.visitor_phone || undefined,
            email: chat.visitor_email || undefined,
            name: chat.visitor_name || undefined,
            inquiry: "website inquiry",
            sourceType: "chat",
            sourceId: chat.id,
          });
        }
      }

      // Collect call leads
      for (const call of (coldCalls || [])) {
        if (!contactedSet.has(call.caller_phone)) {
          contactedSet.add(call.caller_phone);
          leadsToContact.push({
            phone: call.caller_phone,
            name: undefined,
            inquiry: "phone inquiry",
            sourceType: "call",
            sourceId: call.id,
          });
        }
      }

      // Send messages to cold leads
      for (const lead of leadsToContact) {
        const name = lead.name || "there";
        const service = (campaign.client_accounts as any)?.services?.[0] || "your project";

        if (campaign.channel === "sms" && lead.phone) {
          // Get client phone config
          const { data: config } = await supabase
            .from("client_configs")
            .select("phone_config")
            .eq("client_account_id", campaign.client_account_id)
            .single();

          const fromPhone = (config?.phone_config as any)?.phoneNumber || Deno.env.get("TWILIO_FROM_NUMBER");
          const messageBody = campaign.sms_template
            .replace(/\{\{name\}\}/g, name)
            .replace(/\{\{service\}\}/g, service);

          const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
          const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

          await fetch(`${supabaseUrl}/functions/v1/send-followup-sms`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${anonKey}`,
            },
            body: JSON.stringify({
              to: lead.phone,
              from: fromPhone,
              body: messageBody,
              clientAccountId: campaign.client_account_id,
            }),
          });
        }

        // Log the reactivation attempt
        await supabase.from("reactivation_log").insert({
          campaign_id: campaign.id,
          client_account_id: campaign.client_account_id,
          contact_phone: lead.phone || null,
          contact_email: lead.email || null,
          contact_name: lead.name || null,
          original_inquiry: lead.inquiry || null,
          source_type: lead.sourceType,
          source_id: lead.sourceId,
          status: "sent",
        });

        totalProcessed++;
      }

      // Update campaign stats
      await supabase.from("reactivation_campaigns").update({
        last_run_at: new Date().toISOString(),
        total_contacted: (campaign.total_contacted || 0) + leadsToContact.length,
      }).eq("id", campaign.id);
    }

    return new Response(JSON.stringify({ processed: totalProcessed }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("lead-reactivation error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
