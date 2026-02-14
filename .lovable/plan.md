

## Fix: Escape ampersand in TwiML action URL

### Root Cause
The `<Gather action="...?clientId=xxx&voice=yyy">` attribute contains a raw `&` character. In XML, `&` must be written as `&amp;` inside attribute values. Twilio's XML parser sees `&voice` as an unrecognized entity reference and rejects the entire document.

### Solution
Escape the `actionUrl` before inserting it into TwiML attributes.

### Technical Details

**File**: `supabase/functions/voice-twiml/index.ts`

On line 81, after building `actionUrl`, escape it for XML:

```typescript
const actionUrl = `${baseUrl}/functions/v1/voice-twiml?clientId=${clientId}&voice=${encodeURIComponent(selectedVoice)}`;
const safeActionUrl = actionUrl.replace(/&/g, "&amp;");
```

Then replace all usages of `actionUrl` in TwiML strings (lines 98, 198, 202) with `safeActionUrl`.

No other changes needed. The edge function will auto-deploy.
