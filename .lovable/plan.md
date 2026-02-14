

# ClickAdMedia Full Refactor: AI Sales Infrastructure

## Overview

This is a complete repositioning of the site from "website design agency" to "AI Sales Infrastructure provider." The core message shifts from "We build websites" to "We install an AI Sales System that answers, qualifies, and books customers 24/7."

This plan is broken into 3 phases to keep changes manageable and testable.

---

## Phase 1 -- Homepage + Navigation + Pricing (Core Pivot)

### 1. Navigation Refactor (`src/components/Navigation.tsx`)
- Update nav links to: Home, AI Sales System, Pricing, Results, Industries, FAQ
- Change "Get a Quote" button to "Book a Demo"
- Add sticky CTA behavior
- Update mobile nav to match

### 2. Homepage Hero Rewrite (`src/components/packages/SuiteHero.tsx`)
- New headline: "Turn Missed Calls Into Booked Jobs -- Automatically."
- New subheadline about AI receptionist + chat qualifier + automated follow-up
- CTA buttons: "Book a Demo" (primary) + "See What's Included" (secondary)
- Update the right-side lead form heading to "Get a 60-Second AI Sales System Plan"
- Update form fields: Name, Business, Phone, Website, Industry dropdown
- Add 3 mini proof bullets: "Instant call answering", "Missed-call text back", "Auto booking + reminders"

### 3. Pain Section (New Component)
- Create `src/components/ai-sales/PainSection.tsx`
- Headline: "Most leads are lost in the first 5 minutes."
- 4 pain bullets about missed calls, slow replies, no follow-up, admin costs

### 4. Core Offer -- AI Sales Infrastructure (Rewrite `CoreOfferSection.tsx`)
- Replace "Bespoke Website Design" with a 4-card grid:
  1. AI Receptionist (Voice) -- answers, qualifies, books, transfers
  2. Smart Website Chat Qualifier -- captures, filters, books
  3. Follow-Up Automation -- missed-call text back, SMS/email sequences, reminders
  4. CRM + Pipeline -- lead storage, tags, status tracking

### 5. How It Works (Rewrite `SuiteProcessTimeline.tsx`)
- Simplify to 3 steps: Install, Train, Optimize
- Update icons, titles, descriptions, durations

### 6. Value Adds Grid (Rewrite `ValueAddsGrid.tsx`)
- Replace SEO/copywriting/branding cards with AI sales system supporting features
- Options: Speed-to-Lead metrics, Custom Call Scripts, Calendar Integration, Lead Reactivation

### 7. Pricing Rewrite (`SuitePricingCard.tsx`)
- New tier names and features:
  - **Lead Capture System** ($1,497) -- AI website/landing funnel, chat capture, missed-call text back, CRM basics
  - **AI Receptionist System** ($2,997) -- Everything above + AI voice receptionist, scripts, follow-up automation, calendar
  - **AI Sales Team + Optimization** ($5,000+) -- Everything above + multi-step qualification, review generation, lead reactivation, monthly optimization
- Add monthly management note: $297-$997/mo depending on tier
- Update Stripe price IDs (new products will need to be created in Stripe)

### 8. Guarantee Rewrite (`GuaranteeSection.tsx`)
- Change from "satisfaction guarantee" to: "We don't launch until you approve the call flow" + "If it doesn't book at least X appointments in 30 days, we keep optimizing free for 30 more days"

### 9. FAQ Rewrite (`SuiteFAQ.tsx`)
- Replace all questions with AI sales system FAQs:
  - How does the AI receptionist work?
  - Does it sound human?
  - What happens if AI can't answer?
  - Can it transfer calls to me?
  - Can it collect deposits?
  - What CRM do you use?
  - How long does setup take?
  - What industries does this work best for?
  - Can you use my existing number/site?

### 10. Final CTA Rewrite (`CTA.tsx`)
- Headline: "Want your business to answer and book leads 24/7?"
- Buttons: "Book Demo" + "Get a Plan"

### 11. SEO Updates (`UltimateSuite.tsx`)
- Update all SEO meta tags, schema markup, and page titles to reflect AI Sales System positioning

---

## Phase 2 -- New Pages

### 1. Offer Page (`/ai-sales-system`)
- Deep explanation of the AI Sales Infrastructure
- What's included breakdown
- Demo clips placeholder section

### 2. Pricing Page (`/pricing`)
- Standalone clean pricing comparison page with the 3 new tiers

### 3. Results Page (`/results`)
- Before/after lead response workflows
- Demo call transcript examples
- Pipeline screenshots

### 4. Book Demo Page
- Short, frictionless scheduler integration
- "What to expect" section

### 5. Industries Section
- Create industry pages for: Contractors/Trades, Clinics/Med Spas, Home Services, Local Pros, High-Ticket Service Providers
- Each with tailored messaging

---

## Phase 3 -- Backend + Tracking

### 1. Stripe Product Updates
- Create 3 new Stripe products with updated pricing ($1,497 / $2,997 / $5,000)
- Update price IDs in the codebase

### 2. Lead Form Updates
- Update HeroLeadForm fields and validation schema
- Update form submission to capture new fields (industry, website URL)

### 3. Conversion Tracking
- Update all tracking events to reflect new funnel
- Add "Book Demo" conversion event

---

## Technical Details

### Files to Create (Phase 1)
- `src/components/ai-sales/PainSection.tsx`

### Files to Heavily Modify (Phase 1)
- `src/components/Navigation.tsx` -- new nav links
- `src/components/packages/SuiteHero.tsx` -- complete hero rewrite
- `src/components/packages/CoreOfferSection.tsx` -- 4-card AI offer grid
- `src/components/packages/SuiteProcessTimeline.tsx` -- 3-step process
- `src/components/packages/ValueAddsGrid.tsx` -- new supporting features
- `src/components/packages/SuitePricingCard.tsx` -- new tiers + pricing
- `src/components/packages/GuaranteeSection.tsx` -- new guarantee copy
- `src/components/packages/SuiteFAQ.tsx` -- all new FAQs
- `src/components/CTA.tsx` -- new final CTA
- `src/pages/packages/UltimateSuite.tsx` -- updated page composition + SEO
- `src/components/PremiumHeader.tsx` -- update hero form heading/fields (used on /home)
- `src/lib/validation.ts` -- update form validation schema

### Files to Create (Phase 2)
- `src/pages/AISalesSystem.tsx`
- `src/pages/Results.tsx` (standalone page)
- `src/pages/BookDemo.tsx`
- `src/pages/industries/Contractors.tsx` (and similar)

### Stripe Changes Needed
- 3 new products + prices must be created before updating checkout

### What Gets Preserved
- Existing design system (glassmorphism, glow effects, Electric Blue accent)
- Framer Motion animations
- shadcn/ui component library
- All backend infrastructure (Supabase, edge functions, CRM tables)
- Blog, About, Privacy, Terms pages (untouched)
- Old homepage preserved at `/home`

---

## Recommended Approach

Due to the scope, I recommend implementing **Phase 1 only** first (homepage + nav + pricing rewrite). This gets the core repositioning live. Phases 2 and 3 can follow in subsequent sessions.

Shall I proceed with Phase 1?

