

## Sitefoundry Premium Redesign — Phased Plan

Same funnel, same sections, same offer. Elevated visual perception from "landing page template" to "boutique luxury-tech agency."

---

### Phase 1 — Design System + Typography (Foundation)

**Files: `index.css`, `tailwind.config.ts`, `index.html`**

- Replace color palette with graphite layered system:
  - Base 950: #06070A, Base 900: #0B0D12, Surface 800: #11141B, Surface 700: #171B23
  - Text: warm white #F5F3EE (primary), #A7AFBF (secondary), #768096 (muted)
  - Accent Blue: #4D7CFF (used sparingly as signal, not flood)
  - Borders: rgba(255,255,255,0.08)
- Add Manrope via Google Fonts for display headings; keep Inter for body
- New utility classes: `.premium-card` (translucent surface + soft border + deep shadow), `.text-gradient-warm` (white-to-silver heading gradient)
- Replace `.glow-text` with subtler cobalt text-shadow
- Replace `.glass` with refined `.premium-surface` (less blur, more depth)
- Tighter headline line-height (0.94-1.02), body max-width 65ch

---

### Phase 2 — Navigation + Hero

**Files: `Navigation.tsx`, `SuiteHero.tsx`, `HeroLeadForm.tsx`**

**Navigation:**
- Thinner bar, refined glass with silver bottom border (1px rgba white 0.08)
- Same links and structure, premium material treatment
- Transparent on load, soft solid on scroll

**Hero (SuiteHero):**
- Remove framer-motion entrance animations (static load)
- Left: editorial composition with more whitespace
  - Eyebrow: "Revenue-focused websites for service brands"
  - H1: "Your Website Should Feel Like Your Best Salesperson — Not a Placeholder"
  - Subcopy refined, tighter
  - Proof chips row: "Built for service brands" / "Conversion-first UX" / "Fast launch process"
  - Same dual CTAs
- Right: HeroLeadForm upgraded to "Strategy Intake Card" — premium card treatment with refined borders, warm label text, micro-annotation "Average response within one business day"
- Background: soft radial light from top, faint grid, no animation

---

### Phase 3 — Pain + Comparison Sections

**Files: `PainSection.tsx`, `AIDifferentiator.tsx`**

**Pain Section:**
- Title: "Most Websites Look Fine. They Just Don't Perform."
- 4 editorial insight cards with top rule, small icon, short label, one-line punch, muted supporting copy
- Larger section padding, staggered card heights on hover
- Remove red destructive colors, use muted steel icons

**Comparison (AIDifferentiator):**
- Title: keep concept, refine typography
- Two asymmetric panels: left = dark matte with muted red details, right = elevated cobalt-tinted premium panel
- Better list hierarchy with heading + sublabel + explanation
- Remove framer-motion slide animations

---

### Phase 4 — Growth System + Process Timeline

**Files: `CoreOfferSection.tsx`, `SuiteProcessTimeline.tsx`**

**Growth System (CoreOfferSection):**
- Modular capability architecture: 1 featured card (larger) + 3 secondary
- Category labels: Strategy, Conversion, Visibility, Scale
- Replace "learn more" links with concise micro-outcome bullets
- Premium card treatment with visual signatures per card

**Process Timeline:**
- Numbered premium process rail with large step numerals in low-contrast background
- Vertical spine with subtle line
- Add expected deliverables under each step
- Remove framer-motion, use CSS transitions only

---

### Phase 5 — Testimonials + Pricing + Guarantee + FAQ + CTA + Footer

**Files: `SuiteTestimonials.tsx`, `SuitePricingCard.tsx`, `GuaranteeSection.tsx`, `SuiteFAQ.tsx`, `CTA.tsx`, `Footer.tsx`**

**Testimonials:**
- 1 featured testimonial (larger) + 2 supporting cards
- Silver monogram circles (initials), better quote marks, role/company hierarchy
- Remove equal-grid feel

**Pricing:**
- Position as premium engagement, not checkout block
- Section intro: "who this is for"
- Main card elevated with stronger hierarchy: "Best fit for", "What's included", delivery timeline
- Add-ons as clean mini cards beneath
- Less aggressive price typography, more premium
- Same Stripe checkout logic

**Guarantee:**
- Certificate-style card with shield motif
- Title: "60-Day Performance Confidence Guarantee"
- More whitespace, shorter copy, restrained tone
- Same guarantee terms

**FAQ:**
- Cleaner accordion: increased row height, subtle dividers, better open/close states
- Remove heavy glass borders

**Final CTA:**
- Cinematic: large vertical spacing, soft background bloom
- "Ready to Replace Your Website With a Growth System?"
- Two-button action row + contact reassurance

**Footer:**
- Premium surface treatment, better column spacing
- Same links and structure

---

### Motion Spec (Applied Globally)

- Remove all framer-motion entrance animations across every section
- Motion is CSS-only: 180-320ms ease-out
- Card hover: subtle lift (6-10px max), border brighten, tiny shadow bloom
- Button: slight scale on hover
- No parallax, no counters, no sweeps
- Visible keyboard focus rings (cobalt)

---

### What Does Not Change

- Page route structure, section order on UltimateSuite.tsx
- Lead form fields and Supabase submission logic
- Stripe checkout flow and $997 offer
- AI Audit page and scanner
- All service pages, blog, about, app shell
- Testimonial data, FAQ content, pricing amounts
- Edge functions, database, auth

---

### Accessibility

- WCAG 2.2 AA contrast on all surfaces (warm white on graphite passes)
- Visible focus rings on all interactive elements
- Semantic heading hierarchy (h1-h6)
- Form labels, hints, inline error text
- Accordion ARIA states
- `prefers-reduced-motion` respected
- Touch targets 44x44 minimum

