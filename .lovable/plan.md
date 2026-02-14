

# ClickAd AI Sales System -- Full SaaS Build Plan

## Overview

Build a multi-tenant SaaS platform at app.clickadmedia.co with agency/client dashboards, AI chat qualifier, missed-call text-back, follow-up automation, voice AI readiness, and GoHighLevel integration.

This will be built across **6 sequential implementation rounds**, each one building on the last.

---

## Round 1: Auth + Database Schema + Roles

### Database Tables (via migrations)

**Core multi-tenant tables:**

```text
profiles          - user_id (FK auth.users), agency_id, display_name, avatar_url
agencies          - id, name, logo_url, created_at
client_accounts   - id, agency_id (FK), business_name, industry, services, service_area, hours, emergency_hours, status, created_at
user_roles        - id, user_id (FK auth.users), role (enum: agency_admin, agency_support, client_owner, client_staff)
```

**Enums:**
- `app_role`: agency_admin, agency_support, client_owner, client_staff

**Security definer function** `has_role()` for RLS policies (avoids infinite recursion).

**RLS policies** on all tables scoped by agency_id/user_id.

### Auth System
- Email/password signup + login pages
- Role-based route protection (agency vs client views)
- Agency admin can invite/create client users
- Auth context provider with role checking

### App Shell
- Dark theme SaaS layout with sidebar navigation
- Route structure: `/app/dashboard`, `/app/clients`, `/app/chat`, `/app/automations`, `/app/voice`, `/app/analytics`, `/app/integrations`, `/app/settings`
- Role-based nav (agency sees all clients, client sees own dashboard)

---

## Round 2: Client Onboarding Wizard + Config Tables

### Additional Database Tables

```text
client_configs         - id, client_account_id (FK), qualification_rules (jsonb), calendar_settings (jsonb), phone_config (jsonb), knowledge_base (jsonb)
ghl_integrations       - id, client_account_id (FK), api_key (encrypted), location_id, pipeline_id, stage_mapping (jsonb), custom_field_mapping (jsonb)
```

### 6-Step Wizard UI
1. Business Info (name, industry, services, area, hours)
2. Qualification Logic (budget min, job filters, location filters, custom questions)
3. Calendar Setup (Google Calendar connect, availability, buffer, duration)
4. GoHighLevel Integration (API key, location, pipeline, stage mapping)
5. Phone Configuration (Twilio/GHL number, missed-call text-back toggle, auto-reply message)
6. Knowledge Base (FAQs, service descriptions, pricing ranges, policies, objection responses)

All saved to `client_configs` and `ghl_integrations` tables.

### Edge Functions
- `ghl-proxy` -- proxy calls to GoHighLevel API (create contact, create opportunity, apply tags, trigger workflow)

---

## Round 3: AI Chat Qualifier Module

### Database Tables

```text
chat_conversations  - id, client_account_id, visitor_id, status (active/closed/qualified/unqualified), created_at
chat_messages       - id, conversation_id (FK), role (visitor/ai/system), content, metadata (jsonb), created_at
chat_widget_configs - id, client_account_id (FK), primary_color, logo_url, auto_open, greeting_message, qualification_flow (jsonb)
```

### Embeddable Widget
- Floating chat bubble component (can be extracted as standalone script tag later)
- Qualification flow engine driven by `qualification_flow` jsonb config
- Collects: name, phone, email, service requested, notes
- Logic: qualified -> show calendar booking; unqualified -> capture info + follow-up; after hours -> book next slot

### AI Backend
- Edge function `chat-qualifier` using Lovable AI (Gemini 3 Flash) with client's knowledge base as context
- Creates GHL contact + opportunity via `ghl-proxy` edge function
- Applies tags and triggers workflows

### Widget Embed Page
- Settings page for color, logo, greeting customization
- Generates script tag / iframe embed code for client websites

---

## Round 4: Missed-Call Text-Back + Follow-Up Automation

### Database Tables

```text
call_logs           - id, client_account_id, caller_phone, direction (inbound/outbound), status (answered/missed/recovered), duration, created_at
sms_messages        - id, client_account_id, call_log_id (FK nullable), to_phone, from_phone, body, status, sent_at
follow_up_sequences - id, client_account_id, name, trigger_event, steps (jsonb), active, created_at
sequence_enrollments - id, sequence_id (FK), contact_phone, current_step, status (active/completed/stopped), enrolled_at
```

### Missed-Call Text-Back Engine
- Edge function `missed-call-webhook` receives Twilio/GHL webhook on missed call
- Sends SMS within 30 seconds with booking link
- Creates GHL contact tagged "Missed Call"
- Triggers follow-up workflow
- Dashboard: missed calls, text replies, booked from recovery

### Follow-Up Automation Builder
- Pre-built templates: New lead (Day 0,1,3), No-show, Quote follow-up, 30-day reactivation
- SMS + Email editor per step
- Delay logic + conditional logic (if booked, stop sequence)
- Enable/disable per sequence, edit templates, duplicate

### Edge Functions
- `send-followup-sms` -- sends SMS via Twilio
- `sequence-processor` -- processes active enrollments and sends next step

---

## Round 5: Voice AI Architecture (Gemini 3 Ready)

### Database Tables

```text
voice_configs       - id, client_account_id, greeting_script, qualification_script, booking_script, transfer_rules (jsonb), active
call_transcripts    - id, client_account_id, call_log_id (FK), transcript (jsonb), summary, intent_detected, outcome, created_at
voice_function_defs - id, name (createContact/bookAppointment/applyTag/transferCall), parameters (jsonb), description
```

### UI (Placeholder + Architecture)
- Voice Module section with "Enable AI Receptionist (Beta)" toggle (disabled for now)
- Script builder interface for greeting, qualification, booking, transfer
- Call flow builder (visual steps)
- Save all config to database

### Webhook Endpoint
- Edge function `voice-webhook` -- receives incoming call events, stores transcript, summary, outcome
- Prepared function signatures: `createContact()`, `createOpportunity()`, `bookAppointment()`, `applyTag()`, `transferCall()`
- Architecture designed so Gemini 3 voice handler plugs in later via streaming API

---

## Round 6: Analytics Dashboards (Client + Agency)

### Client Dashboard
- KPIs: Total Calls, Answered, Missed, Booked, Qualified, Conversion Rate, Response Time, Recovered
- Charts (recharts): Calls/day, Bookings/day, Missed call recovery rate, Pipeline conversion
- Revenue Estimator: enter avg job value, show "Estimated Revenue Captured"
- Weekly Summary Card: trends + static suggestions

### Agency Dashboard
- All clients list with status indicators
- Aggregate metrics across all clients
- Sort by performance
- Flagged issues view
- "Impersonate" button to view as client
- Edit client config inline

---

## Technical Details

### Design System
- Dark theme with blue accent glow (matches existing glassmorphism style)
- High-tech, futuristic AI SaaS feel
- shadcn/ui components throughout
- Framer Motion animations

### New Files Created (Approximate)

**Round 1 (~15 files):**
- `src/pages/app/Login.tsx`, `src/pages/app/Signup.tsx`
- `src/pages/app/Dashboard.tsx`
- `src/components/app/AppLayout.tsx`, `src/components/app/AppSidebar.tsx`
- `src/contexts/AuthContext.tsx`
- `src/hooks/useAuth.ts`, `src/hooks/useRole.ts`
- Migration files for all tables + RLS

**Round 2 (~10 files):**
- `src/pages/app/onboarding/OnboardingWizard.tsx`
- `src/components/app/onboarding/Step1-6.tsx` (6 step components)
- `src/pages/app/Clients.tsx`
- Edge function: `supabase/functions/ghl-proxy/index.ts`

**Round 3 (~8 files):**
- `src/components/app/chat/ChatWidget.tsx`, `ChatQualifier.tsx`, `WidgetSettings.tsx`
- `src/pages/app/ChatModule.tsx`
- Edge function: `supabase/functions/chat-qualifier/index.ts`

**Round 4 (~8 files):**
- `src/pages/app/Automations.tsx`
- `src/components/app/automations/SequenceBuilder.tsx`, `SequenceTemplates.tsx`
- `src/components/app/calls/MissedCallDashboard.tsx`
- Edge functions: `missed-call-webhook`, `send-followup-sms`, `sequence-processor`

**Round 5 (~6 files):**
- `src/pages/app/VoiceModule.tsx`
- `src/components/app/voice/ScriptBuilder.tsx`, `CallFlowBuilder.tsx`
- Edge function: `voice-webhook`

**Round 6 (~6 files):**
- `src/pages/app/Analytics.tsx`
- `src/components/app/analytics/KPICards.tsx`, `Charts.tsx`, `RevenueEstimator.tsx`
- `src/pages/app/AgencyDashboard.tsx`

### Secrets Needed
- GoHighLevel API credentials (will request when building Round 2)
- Twilio credentials already exist
- Google Calendar API (will request when building Round 2)
- Gemini 3 API key (future, not needed for MVP)

### What Gets Preserved
- Entire existing marketing site (homepage, blog, pricing, etc.)
- Existing edge functions, DB tables, chatbot
- The `/app/*` routes are completely new and separate

---

## Implementation Order

We will build **Round 1 first** (Auth + DB Schema + Roles + App Shell), then proceed through each round sequentially. Each round will be a separate implementation message.

