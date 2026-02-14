import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const {
      clientAccountId,
      callerPhone,
      transcript,     // Array of { role, content, timestamp }
      summary,
      intentDetected,
      outcome,        // "booked" | "transferred" | "voicemail" | "qualified" | "unqualified" | "unknown"
      durationSeconds,
      callLogId,
    } = body;

    if (!clientAccountId || !callerPhone) {
      return new Response(JSON.stringify({ error: "clientAccountId and callerPhone are required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Store transcript
    const { data: transcriptRecord, error: transcriptError } = await supabase
      .from("call_transcripts")
      .insert({
        client_account_id: clientAccountId,
        call_log_id: callLogId || null,
        caller_phone: callerPhone,
        transcript: transcript || [],
        summary: summary || null,
        intent_detected: intentDetected || null,
        outcome: outcome || "unknown",
        duration_seconds: durationSeconds || 0,
      })
      .select()
      .single();

    if (transcriptError) {
      console.error("Transcript insert error:", transcriptError);
      throw transcriptError;
    }

    // If no call_log_id was provided, create one
    if (!callLogId) {
      await supabase.from("call_logs").insert({
        client_account_id: clientAccountId,
        caller_phone: callerPhone,
        direction: "inbound",
        status: outcome === "booked" ? "answered" : "answered",
        duration: durationSeconds || 0,
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      transcriptId: transcriptRecord.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("voice-webhook error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
