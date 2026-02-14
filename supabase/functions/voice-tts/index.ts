import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ElevenLabs voice ID for Sarah - natural female voice
const DEFAULT_VOICE_ID = "EXAVITQu4vr4xnSDxMaL";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const text = url.searchParams.get("text") || "";
    const voiceId = url.searchParams.get("voiceId") || DEFAULT_VOICE_ID;

    if (!text) {
      return new Response("Missing text parameter", { status: 400, headers: corsHeaders });
    }

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVENLABS_API_KEY) {
      console.error("ELEVENLABS_API_KEY not configured");
      return new Response("TTS not configured", { status: 500, headers: corsHeaders });
    }

    // Generate audio via ElevenLabs TTS
    // Using ulaw_8000 format for Twilio phone compatibility
    const ttsResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=ulaw_8000`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_turbo_v2_5",
          voice_settings: {
            stability: 0.4,
            similarity_boost: 0.75,
            style: 0.3,
            use_speaker_boost: true,
            speed: 1.0,
          },
        }),
      }
    );

    if (!ttsResponse.ok) {
      const errText = await ttsResponse.text();
      console.error("ElevenLabs TTS error:", ttsResponse.status, errText);
      return new Response("TTS generation failed", { status: 500, headers: corsHeaders });
    }

    const audioBuffer = await ttsResponse.arrayBuffer();

    // Return audio directly as μ-law for Twilio
    return new Response(audioBuffer, {
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/basic",
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    console.error("voice-tts error:", e);
    return new Response("Internal error", { status: 500, headers: corsHeaders });
  }
});
