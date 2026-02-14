

## Fix Voice AI TwiML Parse Error

### Problem
Two issues are causing the Twilio "Document parse failure" (Error 12100):

1. **Unresolved template placeholders** -- Your greeting script contains `{{business_name}}` as literal text. The code uses the script as-is without replacing placeholders, so Twilio receives `{{business_name}}` verbatim.

2. **No template replacement logic** -- The fallback greeting uses JavaScript template literals (`${client?.business_name}`), but when a custom `greeting_script` exists, no substitution happens.

### Solution

Update `supabase/functions/voice-twiml/index.ts` to replace `{{business_name}}` (and any other placeholders) in the greeting, qualification, and booking scripts before they are used.

### Technical Details

**File**: `supabase/functions/voice-twiml/index.ts`

1. Add a helper function to replace template placeholders:
```typescript
function resolveTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] || "");
}
```

2. After loading client data (~line 87), apply the replacement to the greeting:
```typescript
const templateVars = {
  business_name: client?.business_name || "us",
};

const greeting = resolveTemplate(
  voiceConfig.greeting_script || 
    "Hello, thank you for calling {{business_name}}. How can I help you today?",
  templateVars
);
```

3. Also apply the replacement in the system prompt where `qualification_script` and `booking_script` are used (~line 110), so the AI context also has proper names instead of raw placeholders.

No database changes needed. The edge function will auto-deploy after the code update.

