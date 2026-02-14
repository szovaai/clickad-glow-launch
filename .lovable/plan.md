

# Round 7: Knowledge Base, Integrations, and Final Wiring

This round completes the MVP by adding a standalone Knowledge Base page, a full Integrations page, and wiring everything together so AI Chat and Voice pull from the same knowledge source.

---

## What Gets Built

### 1. Knowledge Base Page (`/app/knowledge-base`)
A dedicated page to manage the knowledge that powers both AI Chat and Voice agents, organized by category.

- **Tabs**: Business Info, Services, FAQs, Policies, Qualification Rules, Objections, Links & Assets
- Each tab shows a list of items (title, content, active toggle) with Add/Edit/Delete
- Data is stored in the existing `client_configs.knowledge_base` JSONB field (no new table needed -- the onboarding wizard already writes to this field)
- Loads and saves per selected client
- "Knowledge Preview" card showing counts per category

### 2. Integrations Page (`/app/integrations`)
Replaces the current placeholder with 4 integration cards:

- **GoHighLevel**: API Key (masked after save), Location ID, Pipeline ID, Stage Mapping, Test Connection button. Reads/writes to existing `ghl_integrations` table.
- **Twilio**: Account SID, Auth Token (masked), Phone Number, missed-call text-back toggle. Reads/writes to existing `client_configs.phone_config` JSONB.
- **Google Calendar**: Calendar ID, appointment duration, buffer time, working hours. Reads/writes to existing `client_configs.calendar_settings` JSONB.
- **Gemini / AI**: Status display showing Lovable AI is pre-connected (no user key needed). Model selector for chat-qualifier. Test Prompt button that calls `chat-qualifier` edge function.

Each card shows a status badge (Connected/Disconnected/Error) and Save/Disconnect buttons. Secrets are masked in the UI after initial entry.

### 3. Wire AI Chat to Knowledge Base
The `chat-qualifier` edge function already pulls from `client_configs.knowledge_base`. This round adds:
- A "Knowledge Preview" panel on the Chat Module page showing how many FAQs, services, policies etc. are configured
- A link to open Knowledge Base page from Chat settings

### 4. Wire Voice (Beta) to Knowledge Base
Add a "Knowledge Source" card to the Voice Module:
- Toggle "Use Knowledge Base" (stored in `voice_configs.transfer_rules` JSON)
- Preview counts of configured knowledge items
- Link to Knowledge Base page

### 5. Update Dashboard
- Replace static "Coming in Round X" placeholders with live counts from `call_logs`, `chat_conversations`, and `sequence_enrollments`
- Show active client name when applicable
- Update system status card to reflect completed build

### 6. Sidebar Navigation Update
- Add "Knowledge Base" nav item (with BookOpen icon) between Analytics and Integrations

---

## Technical Details

### Database Changes
No new tables needed. All existing tables (`client_configs`, `ghl_integrations`, `voice_configs`) already have the required columns and JSONB fields.

### New Files
- `src/pages/app/KnowledgeBase.tsx` -- Main knowledge base page
- `src/pages/app/Integrations.tsx` -- Full integrations page with 4 cards
- `src/components/app/shared/ClientSelector.tsx` -- Reusable client selector component (extracted from repeated pattern)
- `src/components/app/shared/KnowledgePreview.tsx` -- Reusable knowledge counts card

### Modified Files
- `src/App.tsx` -- Add `/app/knowledge-base` route, replace integrations placeholder
- `src/components/app/AppSidebar.tsx` -- Add Knowledge Base nav item
- `src/pages/app/ChatModule.tsx` -- Add Knowledge Preview panel
- `src/pages/app/VoiceModule.tsx` -- Add Knowledge Source card
- `src/pages/app/Dashboard.tsx` -- Live stats from database

### Key Design Decisions
- **No Gemini API key needed**: The system uses Lovable AI (pre-configured `LOVABLE_API_KEY`), so the Gemini integration card simply shows "Connected via Lovable AI" with a test button
- **No new secrets needed**: GHL API keys are stored in the existing `ghl_integrations` table. Twilio secrets (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`) are already configured as backend secrets
- **Masked secrets in UI**: After saving, API keys display as `••••••••XXXX` (last 4 chars visible)
- **Reuse existing data model**: The `client_configs` JSONB columns already store knowledge base, calendar, phone, and qualification data from the onboarding wizard -- the new pages simply provide a way to edit them post-onboarding

### Build Order
1. Create `ClientSelector` and `KnowledgePreview` shared components
2. Build Knowledge Base page
3. Build Integrations page
4. Update sidebar and routes
5. Wire Knowledge Preview into Chat and Voice modules
6. Update Dashboard with live stats

