import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
const ELEVENLABS_AGENT_ID = Deno.env.get("ELEVENLABS_AGENT_ID");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

serve(async (req) => {
  // WebSocket upgrade
  const { socket: twilioWs, response } = Deno.upgradeWebSocket(req);

  const url = new URL(req.url);
  const clientId = url.searchParams.get("clientId") || "";

  let streamSid = "";
  let callSid = "";
  let callerPhone = "";
  let elevenLabsWs: WebSocket | null = null;
  const transcriptLog: { role: string; content: string; timestamp: number }[] = [];

  async function getSignedUrl(): Promise<string> {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${ELEVENLABS_AGENT_ID}`,
      {
        headers: { "xi-api-key": ELEVENLABS_API_KEY! },
      }
    );
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`ElevenLabs signed URL failed [${res.status}]: ${err}`);
    }
    const data = await res.json();
    return data.signed_url;
  }

  function connectToElevenLabs(signedUrl: string) {
    elevenLabsWs = new WebSocket(signedUrl);

    elevenLabsWs.onopen = () => {
      console.log(`[voice-stream] Connected to ElevenLabs for call ${callSid}`);
    };

    elevenLabsWs.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        switch (msg.type) {
          case "audio": {
            // Forward ElevenLabs audio back to Twilio
            if (streamSid && twilioWs.readyState === WebSocket.OPEN) {
              const twilioMsg = JSON.stringify({
                event: "media",
                streamSid,
                media: {
                  payload: msg.audio?.chunk || msg.audio_event?.audio_base_64 || "",
                },
              });
              twilioWs.send(twilioMsg);
            }
            break;
          }

          case "agent_response": {
            const text = msg.agent_response_event?.agent_response || msg.agent_response || "";
            if (text) {
              console.log(`[voice-stream] Agent: ${text}`);
              transcriptLog.push({ role: "assistant", content: text, timestamp: Date.now() });
            }
            break;
          }

          case "user_transcript": {
            const text = msg.user_transcription_event?.user_transcript || msg.user_transcript || "";
            if (text) {
              console.log(`[voice-stream] User: ${text}`);
              transcriptLog.push({ role: "user", content: text, timestamp: Date.now() });
            }
            break;
          }

          case "conversation_initiation_metadata": {
            console.log(`[voice-stream] Conversation initiated, ID: ${msg.conversation_initiation_metadata_event?.conversation_id || "unknown"}`);
            break;
          }

          case "ping": {
            // Respond to keep-alive pings
            if (elevenLabsWs?.readyState === WebSocket.OPEN) {
              elevenLabsWs.send(JSON.stringify({ type: "pong", event_id: msg.ping_event?.event_id }));
            }
            break;
          }

          default:
            // Log unknown events for debugging
            if (msg.type) {
              console.log(`[voice-stream] ElevenLabs event: ${msg.type}`);
            }
        }
      } catch (e) {
        console.error("[voice-stream] Error processing ElevenLabs message:", e);
      }
    };

    elevenLabsWs.onerror = (e) => {
      console.error("[voice-stream] ElevenLabs WebSocket error:", e);
    };

    elevenLabsWs.onclose = (e) => {
      console.log(`[voice-stream] ElevenLabs disconnected: code=${e.code} reason=${e.reason}`);
      // If ElevenLabs disconnects, end the Twilio stream gracefully
      if (twilioWs.readyState === WebSocket.OPEN) {
        twilioWs.close();
      }
    };
  }

  async function saveTranscript() {
    if (transcriptLog.length === 0) return;

    try {
      const webhookUrl = `${SUPABASE_URL}/functions/v1/voice-webhook`;
      const lastAssistant = transcriptLog.filter(t => t.role === "assistant").pop()?.content || "";
      const outcome = /transfer/i.test(lastAssistant) ? "transferred"
        : /book|appointment|schedule/i.test(lastAssistant) ? "booked"
        : transcriptLog.length > 2 ? "qualified" : "unknown";

      const durationSeconds = transcriptLog.length > 1
        ? Math.round((transcriptLog[transcriptLog.length - 1].timestamp - transcriptLog[0].timestamp) / 1000)
        : 0;

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientAccountId: clientId,
          callerPhone: callerPhone || "unknown",
          transcript: transcriptLog,
          summary: `ElevenLabs AI call. ${transcriptLog.length} messages.`,
          outcome,
          durationSeconds,
        }),
      });
      console.log(`[voice-stream] Transcript saved for call ${callSid}`);
    } catch (e) {
      console.error("[voice-stream] Failed to save transcript:", e);
    }
  }

  // Handle Twilio WebSocket messages
  twilioWs.onmessage = async (event) => {
    try {
      const msg = JSON.parse(event.data);

      switch (msg.event) {
        case "connected":
          console.log(`[voice-stream] Twilio connected`);
          break;

        case "start": {
          streamSid = msg.start?.streamSid || "";
          callSid = msg.start?.callSid || "";
          callerPhone = msg.start?.customParameters?.callerPhone || "";
          console.log(`[voice-stream] Stream started: sid=${streamSid} call=${callSid} from=${callerPhone}`);

          // Connect to ElevenLabs
          try {
            const signedUrl = await getSignedUrl();
            connectToElevenLabs(signedUrl);
          } catch (e) {
            console.error("[voice-stream] Failed to connect to ElevenLabs:", e);
            twilioWs.close();
          }
          break;
        }

        case "media": {
          // Forward Twilio audio to ElevenLabs
          if (elevenLabsWs?.readyState === WebSocket.OPEN) {
            const audioData = msg.media?.payload || "";
            elevenLabsWs.send(JSON.stringify({
              user_audio_chunk: audioData,
            }));
          }
          break;
        }

        case "stop": {
          console.log(`[voice-stream] Stream stopped for call ${callSid}`);
          await saveTranscript();

          // Clean up conversation record
          try {
            const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
            await supabase.from("voice_conversations").delete().eq("call_sid", callSid);
          } catch (e) {
            console.error("[voice-stream] Cleanup error:", e);
          }

          if (elevenLabsWs?.readyState === WebSocket.OPEN) {
            elevenLabsWs.close();
          }
          break;
        }
      }
    } catch (e) {
      console.error("[voice-stream] Error processing Twilio message:", e);
    }
  };

  twilioWs.onerror = (e) => {
    console.error("[voice-stream] Twilio WebSocket error:", e);
  };

  twilioWs.onclose = async () => {
    console.log(`[voice-stream] Twilio WebSocket closed for call ${callSid}`);
    if (elevenLabsWs?.readyState === WebSocket.OPEN) {
      elevenLabsWs.close();
    }
  };

  return response;
});
