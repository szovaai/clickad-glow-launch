

# Voice AI Receptionist with Gemini + Twilio

Build a real-time AI phone receptionist that answers calls with a natural female voice, qualifies callers using your scripts, and logs transcripts -- all powered by Gemini via Lovable AI and Twilio's built-in speech capabilities.

---

## How It Works

When someone calls your Twilio number:

1. **Twilio answers** and plays the greeting script using a female voice (Amazon Polly "Joanna" or Google "en-US-Standard-F")
2. **Caller speaks** -- Twilio transcribes their speech in real-time
3. **Gemini processes** the caller's words using your scripts and knowledge base as context
4. **Twilio speaks** the AI's response back to the caller in the same female voice
5. **Loop continues** until the call ends, is transferred, or a booking is made
6. **Transcript is saved** to the database for review

---

## What Gets Built

### 1. New Edge Function: `voice-twiml`
The main Twilio webhook that handles the call flow using TwiML (Twilio's XML format):

- **Initial answer**: Returns TwiML with `<Say>` (greeting script) + `<Gather>` (listen for speech)
- **Conversation loop**: Receives transcribed speech from Twilio, sends it to Gemini with the client's scripts/knowledge as system prompt, returns the AI response via `<Say>` + another `<Gather>`
- **Call end handling**: When the conversation concludes, saves the full transcript via the existing `voice-webhook` function
- **Voice**: Uses Twilio's `voice="Polly.Joanna"` for a natural-sounding female voice

### 2. Update Existing `voice-webhook`
Keep as-is -- it already handles transcript storage. The new `voice-twiml` function will call it at the end of a conversation.

### 3. Update Voice Module UI
- Add a "Test Call" info card showing the webhook URL to configure in Twilio
- Add voice selection dropdown (Polly.Joanna, Polly.Salli, Polly.Kendra) stored in `voice_configs.transfer_rules`
- Show webhook URL clearly so users can copy it into their Twilio console

---

## Technical Details

### New Edge Function: `supabase/functions/voice-twiml/index.ts`

**Endpoint**: `https://rfydswsdjwfgmzdqwhhb.supabase.co/functions/v1/voice-twiml`

**Flow**:
- Twilio POSTs form-encoded data (not JSON) with `CallSid`, `SpeechResult`, `From`, etc.
- On first request (no `SpeechResult`): look up client by Twilio phone number from `client_configs.phone_config`, load scripts from `voice_configs`, return greeting TwiML
- On subsequent requests (has `SpeechResult`): build conversation history from in-memory or query param state, send to Gemini via Lovable AI gateway, return AI response as TwiML
- Uses `<Gather input="speech" action="/functions/v1/voice-twiml?clientId=X&turn=N" speechTimeout="auto">` for continuous conversation
- Conversation context passed via query parameters (clientId, turn count) and a temporary conversation cache

**Gemini System Prompt** (built dynamically per client):
```
You are a friendly female AI receptionist for {business_name}.
Your greeting: {greeting_script}
Qualification questions: {qualification_script}
Booking script: {booking_script}
Knowledge base: {knowledge_base_content}

Keep responses conversational and under 3 sentences.
If the caller needs emergency service, say you'll transfer them.
If qualified, offer to book an appointment.
```

**TwiML Response Format**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather input="speech" action="...?clientId=X&turn=2" speechTimeout="auto" language="en-US">
    <Say voice="Polly.Joanna">AI response here</Say>
  </Gather>
  <Say voice="Polly.Joanna">I didn't catch that. Goodbye!</Say>
</Response>
```

### Conversation State Management
- Each call gets a `CallSid` from Twilio (unique per call)
- Store conversation turns in a simple in-memory Map keyed by CallSid (edge functions are short-lived, so we'll pass essential context via query params and re-fetch scripts each turn -- this is fast)
- Pass accumulated transcript summary in a compact query param or POST the conversation history to the function

### Config Changes
- Add `voice-twiml` to `supabase/config.toml` with `verify_jwt = false` (Twilio doesn't send JWT)

### Client Lookup
- When a call comes in, Twilio sends the called number (`To` field)
- Look up which client owns that number by querying `client_configs` where `phone_config->>'twilioPhoneNumber'` matches
- Load that client's voice scripts and knowledge base

### Modified Files
- `supabase/functions/voice-twiml/index.ts` -- New edge function (main call handler)
- `supabase/config.toml` -- Add voice-twiml function config
- `src/pages/app/VoiceModule.tsx` -- Add webhook URL display card and voice selector

### No New Secrets Needed
- `LOVABLE_API_KEY` is already configured for Gemini access
- Twilio credentials are stored per-client in `client_configs.phone_config`
- Twilio authenticates via webhook URL configuration, not API keys on our side

### Build Order
1. Create the `voice-twiml` edge function with greeting + conversation loop
2. Update `config.toml` to register the new function
3. Update the Voice Module UI with webhook URL display and voice picker
4. Test end-to-end with a real call

