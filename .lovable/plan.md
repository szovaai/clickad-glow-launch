

## ClickAdMedia 2.0 — Full Website Refactor

Repositioning from "AI Sales Infrastructure" to **"AI-Powered Website & Growth Systems Agency"** with updated pricing, messaging, services, and page structure.

---

### Pricing (User-Approved)

| Tier | Setup | Monthly |
|------|-------|---------|
| Starter AI Site | $997+ | $97/mo |
| Growth Engine | $1,997+ | $97/mo |
| Domination Package | $4,997+ | $97/mo |

---

### What Changes

**16 files modified, 2 new files created. No database changes.**

#### New Files
1. **`src/components/sections/AIDifferentiator.tsx`** — Side-by-side comparison: Traditional Website vs AI-Powered Website. Practical messaging: more booked jobs, faster response, better conversion.
2. **`src/pages/Services.tsx`** — Dedicated services page with 4 core offerings detailed out. Route: `/services`.

#### Homepage (`UltimateSuite.tsx`) — New Section Order
1. Navigation
2. **Hero** (new headline + lead form)
3. **Problem Agitation** (broader pain points)
4. **AI Differentiator** (new)
5. **Services Overview** (4 new services)
6. **How It Works** (3 new steps)
7. Testimonials (keep)
8. **Pricing** (new tiers)
9. **Guarantee** (updated)
10. **FAQ** (rewritten)
11. CTA
12. Footer

Removes: `ValueAddsGrid`, `PremiumSupportSection` (content folded into services/pricing)

#### Component Updates

| File | Changes |
|------|---------|
| `SuiteHero.tsx` | Headline: "Your Website Should Work Like a Sales Rep — Not a Brochure." Subhead about AI websites + chatbots + SEO. CTAs: "Book Strategy Call" + "Get Free AI Website Audit". Proof bullets: AI Chatbot Included, SEO Built-In, Books 24/7. |
| `PainSection.tsx` | 4 new pain points: website doesn't generate leads, invisible on Google, leads leave without contacting, paying for ads but site doesn't convert. |
| `CoreOfferSection.tsx` | 4 services: AI Website Build, SEO Growth Engine, AI Lead Automation, Paid Ads. Each with feature bullets. "Learn more" links to `/services`. |
| `SuiteProcessTimeline.tsx` | 3 steps: Audit & Strategy, Build & Optimize, Automate & Scale. |
| `SuitePricingCard.tsx` | 3 tiers with approved pricing ($997/$1,997/$4,997). Features updated per blueprint. Stripe price IDs kept but amounts updated in display. |
| `Pricing.tsx` | Aligned to same 3 tiers for `/pricing` page. |
| `SuiteFAQ.tsx` | Rewritten: "What's included in an AI website?", "How does SEO work?", "How long to see results?", "Outside Calgary?", "Already have a website?", "Contract?", "What industries?" |
| `HeroLeadForm.tsx` | New fields: Monthly revenue range (dropdown), Biggest growth challenge (textarea). CTA: "Get Your Free AI Website Audit". Remove email, keep name/business/phone/website. |
| `Navigation.tsx` | Nav links: Services (`/services`), How It Works, Pricing, Results, FAQ. Company dropdown unchanged. CTA: "Book Strategy Call". |
| `Footer.tsx` | Tagline: "AI-powered websites and growth systems for service businesses." CTA: "Get Free AI Website Audit". Year: 2025. |
| `CTA.tsx` | Headline: "Ready to Turn Your Website Into a Growth Engine?" CTAs: "Book Strategy Call" + "Get Free AI Audit". Badges: "Live in 7 Days", "Cancel Anytime", "Results Guaranteed". |
| `PreFooterCTA.tsx` | Updated headline and copy to match new positioning. Phone number updated to (825) 451-8117. |
| `GuaranteeSection.tsx` | Updated to 60-day performance guarantee aligned with website + SEO results. |
| `App.tsx` | Add `/services` route pointing to new Services page. |
| `Pricing.tsx` (page) | SEO meta updated for new positioning and price range. |
| `UltimateSuite.tsx` | SEO meta updated. Remove `ValueAddsGrid` and `PremiumSupportSection` imports. Add `AIDifferentiator`. Reorder sections. |

---

### Technical Details

- All changes are frontend-only (copy, layout, component structure)
- No database migrations needed
- No edge function changes
- Stripe checkout price IDs in `SuitePricingCard.tsx` remain unchanged (display prices updated, actual Stripe prices may need updating in Stripe dashboard separately)
- Lead form schema in `HeroLeadForm.tsx` uses inline zod validation (no changes to `validation.ts` needed since it uses its own schema)
- New `/services` route added to `App.tsx` router

