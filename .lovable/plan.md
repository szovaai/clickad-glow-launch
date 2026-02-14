

## Fix: Enable Voice AI Receptionist

**Problem**: The voice configuration has `active` set to `false`, causing the AI to respond with "This service is currently unavailable. Please call back later."

**Solution**: Set `active = true` in the `voice_configs` table for your client account.

### Technical Details

A single database update is needed:

```sql
UPDATE voice_configs
SET active = true
WHERE client_account_id = '346cb7b2-248a-41c1-b6bc-0e42c99e877e';
```

No code changes are required. After this update, the next call to your Twilio number will be answered by the AI receptionist using your saved greeting, qualification, and booking scripts.

