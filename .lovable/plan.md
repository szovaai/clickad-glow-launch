

## Full ElevenLabs Conversational AI + Twilio Bidirectional Streaming

### What's Changing

The current setup uses a request-response loop: Twilio calls your edge function on every speech turn, which generates TTS audio and plays it back. This causes the "looping" behavior because each turn is a separate HTTP request with latency for AI + TTS generation.

The new architecture uses **Twilio's bidirectional `<Stream>` verb** to open a persistent WebSocket connection. Your edge function bridges audio in real-time between Twilio and ElevenLabs Conversational AI -- no more loops, just a natural flowing conversation.

```text
Caller <--phone--> Twilio <--WebSocket--> Edge Function <--WebSocket--> ElevenLabs Agent
                                         (audio bridge)
```

### Prerequisites (You Need to Do This First)

Before I can implement this, you need to **create an ElevenLabs Conversational AI Agent**:

1. Go to [ElevenLabs Agent Dashboard](https://elevenlabs.io/app/conversational-ai)
2. Click "Create Agent"
3. Configure it:
   - **System prompt**: Your receptionist persona (business name, services, qualification questions, etc.)
   - **Voice**: Pick a natural female voice (e.g., Sarah)
   - **LLM**: Choose a fast model for low latency
   - **CRITICAL Audio Settings**:
     - User Input Audio Format: **u-law 8000 Hz** (under Advanced Settings)
     - TTS Output Format: **u-law 8000 Hz (Telephony)** (under Voice Settings gear icon)
4. Copy the **Agent ID** (starts with `agent_...`)
5. Give me the Agent ID so I can store it as a secret

### Implementation Steps

**Step 1: Store ElevenLabs Agent ID**
- Add a new secret `ELEVENLABS_AGENT_ID` with the agent ID from the ElevenLabs dashboard.

**Step 2: Rewrite `voice-twiml` edge function**
- Instead of the current Gather/Play/AI loop, return simple TwiML that opens a bidirectional stream:
```text
<Response>
  <Connect>
    <Stream url="wss://{supabase-url}/functions/v1/voice-stream?clientId={id}" />
  </Connect>
</Response>
```
- Keep the client lookup logic (matching called number to client config).

**Step 3: Create new `voice-stream` edge function (WebSocket)**
- This is the core bridge function that:
  1. Accepts the incoming WebSocket from Twilio
  2. Gets a signed URL from ElevenLabs for the Conversational AI agent
  3. Opens a second WebSocket to ElevenLabs
  4. Bridges audio bidirectionally:
     - Twilio audio (u-law base64) --> forward to ElevenLabs `user_audio_chunk` messages
     - ElevenLabs audio responses --> forward back to Twilio as `media` messages
  5. Handles ElevenLabs events (transcripts, agent responses) and logs them
  6. On call end, saves the transcript to the `call_transcripts` table via the existing `voice-webhook` function

**Step 4: Update `supabase/config.toml`**
- Add `[functions.voice-stream]` with `verify_jwt = false`

**Step 5: Update Voice Module UI**
- Remove the Polly voice selector (no longer relevant)
- Update description to reference ElevenLabs Conversational AI
- The webhook URL stays the same (`voice-twiml`)

**Step 6: Clean up `voice-tts`**
- The `voice-tts` edge function is no longer needed for live calls (ElevenLabs agent handles TTS internally). It can be kept for other uses or removed.

### Technical Details

**WebSocket Message Flow (voice-stream):**

Twilio sends `connected`, `start`, `media`, and `stop` events. The edge function:
- On `start`: extracts `streamSid` and `callSid`, gets ElevenLabs signed URL, opens WebSocket to ElevenLabs
- On `media`: base64 audio payload forwarded to ElevenLabs as `{ "user_audio_chunk": "<base64>" }`
- From ElevenLabs `audio` event: forward audio back to Twilio as `{ "event": "media", "streamSid": "...", "media": { "payload": "<base64>" } }`
- From ElevenLabs `agent_response` / `user_transcript` events: collect for transcript logging
- On `stop` or ElevenLabs disconnect: save transcript, close connections

**Edge Function Timeout Consideration:**
- Edge functions support WebSocket upgrades and can maintain connections for the duration of a call (up to the platform timeout limit)
- Most business calls are under 5 minutes, well within limits
- A graceful timeout handler will be included as a safety net

### What You Need to Provide
- Your **ElevenLabs Agent ID** after creating the agent in the ElevenLabs dashboard

