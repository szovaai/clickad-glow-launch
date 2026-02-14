import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RequestSchema = z.object({
  clientAccountId: z.string().uuid(),
  callerPhone: z.string().min(1).max(30),
  transcript: z.array(z.object({
    role: z.string().max(50),
    content: z.string().max(5000),
    timestamp: z.any().optional(),
  })).max(200).optional(),
  summary: z.string().max(5000).optional(),
  intentDetected: z.string().max(100).optional(),
  outcome: z.enum(["booked", "transferred", "voicemail", "qualified", "unqualified", "unknown"]).optional(),
  durationSeconds: z.number().int().min(0).max(36000).optional(),
  callLogId: z.string().uuid().optional(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const raw = await req.json();
    const body = RequestSchema.parse(raw);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: transcriptRecord, error: transcriptError } = await supabase
      .from("call_transcripts")
      .insert({
        client_account_id: body.clientAccountId,
        call_log_id: body.callLogId || null,
        caller_phone: body.callerPhone,
        transcript: body.transcript || [],
        summary: body.summary || null,
        intent_detected: body.intentDetected || null,
        outcome: body.outcome || "unknown",
        duration_seconds: body.durationSeconds || 0,
      })
      .select()
      .single();

    if (transcriptError) {
      console.error("Transcript insert error:", transcriptError);
      throw transcriptError;
    }

    if (!body.callLogId) {
      await supabase.from("call_logs").insert({
        client_account_id: body.clientAccountId,
        caller_phone: body.callerPhone,
        direction: "inbound",
        status: "answered",
        duration: body.durationSeconds || 0,
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      transcriptId: transcriptRecord.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: "Invalid input", details: e.errors }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    console.error("voice-webhook error:", e);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
