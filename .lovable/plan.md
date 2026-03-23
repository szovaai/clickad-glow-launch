

## Update to Single $997 Offer — "AI Website in 48 Hours"

Replace the 3-tier pricing with one focused offer across all pricing surfaces. Keep everything else (audit form, testimonials, pain section, etc.) unchanged.

---

### Files to Modify (4 files)

#### 1. `src/components/packages/SuitePricingCard.tsx` (Homepage pricing)
- Replace 3-tier grid with single centered card
- Headline: "AI Website in 48 Hours"
- Price: $997 (one-time, no monthly)
- Feature list: custom AI website (up to 5 pages), mobile-responsive, basic SEO, contact form + click-to-call, 1 round of revisions, you own everything
- "What Makes This Different" section: 48-hour delivery, agency quality at fraction of cost, built to convert
- Optional Add-Ons section below: AI Chatbot ($297), SEO Growth Package ($497/mo), Full Automation Stack ($197/mo)
- Single CTA: "Get Your New Site in 48 Hours"
- Keep Stripe checkout flow (use starter price ID)

#### 2. `src/components/Pricing.tsx` (`/pricing` page component)
- Same transformation: single offer instead of 3 tiers
- Match the homepage pricing card content exactly
- Keep the guarantee section, update copy to match 48-hour positioning

#### 3. `src/pages/Pricing.tsx` (SEO meta)
- Update title/description to reference "$997 AI Website in 48 Hours" instead of 3-tier range

#### 4. `src/components/CTA.tsx`
- Update CTA badge from "Live in 7 Days" to "Live in 48 Hours"
- Keep everything else the same

---

### What Stays the Same
- Audit form, testimonials, pain section, AI differentiator, FAQ, navigation, footer
- All other pages and components unchanged

