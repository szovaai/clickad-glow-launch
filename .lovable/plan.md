

## AI Website Audit Scanner — Plan

Build an automated website audit tool that scrapes a tradesman's website using Firecrawl, analyzes it with AI against trade-specific criteria, displays a visual scorecard, and generates a downloadable PDF report.

---

### Prerequisites

**Firecrawl connector** needs to be linked to this project (available in workspace but not yet connected). This powers the website scraping.

**New dependency**: `jspdf` + `html2canvas` for client-side PDF generation.

---

### Architecture

```text
User enters URL + business info
        ↓
Frontend calls edge function "run-ai-audit"
        ↓
Edge function:
  1. Firecrawl scrapes the URL (markdown + screenshot + links)
  2. Sends scraped content to Gemini 2.5 Flash (via Lovable AI)
     with a structured prompt scoring 8 audit criteria
  3. Returns JSON scores + recommendations
        ↓
Frontend renders visual scorecard
        ↓
User clicks "Download PDF" → html2canvas + jsPDF generates report
```

---

### What Gets Audited (8 Criteria, scored 0-10)

1. **Website Exists & Quality** — Has a website at all, looks professional
2. **Mobile-Friendly** — Responsive design, mobile viewport
3. **Google Maps / Local SEO** — NAP consistency, GMB signals in markup
4. **Customer Reviews** — Testimonials on site, links to Google/Yelp
5. **Chatbot / Instant Contact** — Live chat, click-to-call, contact forms above fold
6. **Site Speed** — Page load indicators from HTML size/complexity
7. **After-Hours Booking** — Online booking system, scheduling links
8. **Call-to-Action Clarity** — Clear CTAs, phone number visibility, conversion path

Each criterion gets a score (0-10), a status (pass/warning/fail), and a specific recommendation.

---

### Files to Create

1. **`supabase/functions/run-ai-audit/index.ts`** — Edge function that:
   - Accepts URL + industry + business name
   - Calls Firecrawl scrape API (markdown + links formats)
   - Sends scraped content to Gemini 2.5 Flash with structured scoring prompt
   - Returns JSON with scores, overall grade, and recommendations

2. **`src/pages/AiAudit.tsx`** — New page at `/ai-audit` with:
   - Input form (business name, website URL, industry dropdown)
   - Loading state with progress animation
   - Visual scorecard showing all 8 criteria with color-coded scores
   - Overall grade (A-F) with radial chart
   - "Download PDF Report" button
   - "Send to Business" option that pre-fills email

3. **`src/components/audit/AuditScoreCard.tsx`** — Visual scorecard component with:
   - Radial/circular overall score
   - 8 individual metric bars with pass/warning/fail colors
   - Specific recommendations per criterion
   - ClickAdMedia branding for the report

4. **`src/components/audit/AuditPdfReport.tsx`** — PDF-optimized layout component that html2canvas renders, branded with ClickAdMedia logo, date, business name

### Files to Modify

5. **`src/App.tsx`** — Add `/ai-audit` route
6. **`src/components/Navigation.tsx`** — Add "AI Audit" link (or keep it unlisted, accessible via direct URL)
7. **`supabase/config.toml`** — Register the new edge function

### Database

**No new tables needed.** The existing `audits` table can store results by adding an `ai_results` JSONB column via migration to persist the scan output.

---

### PDF Report Design

The PDF will be a branded one-pager with:
- ClickAdMedia logo + "AI Website Audit Report" header
- Business name, URL, date, industry
- Overall grade in a large circle (A/B/C/D/F with color)
- 8 horizontal score bars with labels and recommendations
- Footer with CTA: "Want us to fix these? Book a strategy call at clickadmedia.com"

Generated client-side using `html2canvas` to capture the scorecard component, then embedded into a `jsPDF` document.

---

### Technical Notes

- Uses Gemini 2.5 Flash via Lovable AI (no API key needed) for the analysis
- Firecrawl handles the scraping (connector already in workspace, needs linking)
- PDF generation is entirely client-side — no server-side PDF rendering needed
- The edge function returns structured JSON so the frontend can render both the interactive view and the PDF layout

