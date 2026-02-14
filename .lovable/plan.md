
## Fix Voice AI Static Issue

The static you're hearing is caused by a few issues in how audio is being relayed between Twilio and ElevenLabs. Here's what needs to change:

### Root Causes

1. **Wrong audio field name**: The code tries to read `msg.audio?.chunk` first, which doesn't exist in ElevenLabs' API. The correct field is `msg.audio_event?.audio_base_64`. This means empty/corrupted payloads may be sent to Twilio.

2. **Missing interruption handling**: When ElevenLabs detects the caller is speaking (interrupting the AI), it sends an `interruption` event. The code doesn't handle this, so it should send a `clear` event to Twilio to flush stale audio from the buffer. Without this, old and new audio overlap, causing static/garbled sound.

3. **ElevenLabs dashboard config**: The agent must be set to u-law 8000 Hz for both input and output audio in the ElevenLabs dashboard settings (Voice section for output, Advanced section for input).

### Changes to `supabase/functions/voice-stream/index.ts`

1. **Fix the audio field extraction** - Change from `msg.audio?.chunk || msg.audio_event?.audio_base_64` to just `msg.audio_event?.audio_base_64`

2. **Add interruption handler** - When receiving an `interruption` event from ElevenLabs, send `{ event: "clear", streamSid }` to Twilio to flush the audio buffer

3. **Skip empty audio payloads** - Add a guard to only send media to Twilio if the payload is non-empty

### Manual Step (you need to do this)

In the ElevenLabs dashboard for your agent:
- Go to **Voice section** and set output to **u-law 8000 Hz**
- Go to **Advanced section** and set input format to **u-law 8000 Hz**

This ensures the audio encoding matches what Twilio expects.
