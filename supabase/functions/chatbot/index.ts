import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().max(4000),
    })
  ).max(50),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const raw = await req.json();
    const { messages } = RequestSchema.parse(raw);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an AI assistant for ClickAd Media, a Calgary-based web design agency specializing in conversion-focused websites for service businesses.

Your goal: Answer questions naturally and guide qualified visitors toward the quote form at /audit or the homepage lead form.

## SERVICES & PACKAGES

**Primary Offer: Ultimate Business Website Suite**
- Investment: $2,500-$5,000 (one-time)
- What's included:
  • Bespoke custom design (no templates)
  • Full copywriting & brand messaging
  • SEO optimization & technical setup
  • Professional photography coordination
  • 3 months post-launch support
  • Performance monitoring & optimization
  • Mobile-responsive, fast-loading
  • Lead capture forms & tracking
- Timeline: 6-8 weeks from kickoff to launch

**Service Tiers (Monthly - Legacy Plans)**
- Starter ($197/mo): Basic website design, 3-page site
- Growth ($297/mo): Advanced features, CRO audits, A/B testing
- Enterprise ($497/mo): Full-scale optimization, priority support

**Core Services:**
- Website design (conversion-first approach)
- CRO audits (identify what's blocking conversions)
- A/B testing (data-driven optimization)
- Landing pages (high-converting pages for campaigns)
- SEO foundations (technical setup, on-page optimization)
- Performance optimization (speed, mobile experience)

## PROCESS & TIMELINE

**Standard Website Launch (Ultimate Suite):**
1. Strategy Call (Week 1) - Understand business, goals, target audience
2. Research & Planning (Week 1-2) - Competitor analysis, keyword research
3. Design & Copy (Week 2-4) - Mockups, brand messaging, content creation
4. Development (Week 4-6) - Build, test, optimize
5. Launch Prep (Week 6-7) - Final reviews, training, setup
6. Go Live (Week 7-8) - Deploy, monitor, support

**Quick Launch Option:**
- 7-day website launch available for simpler projects
- 14-day CRO sprint for optimization projects

**Post-Launch:**
- 3 months included support & optimization
- Monthly performance reports
- Ongoing adjustments based on data

## INDUSTRIES & CLIENTS

**Who We Serve (Calgary Focus):**
1. Trades & Contractors - electricians, plumbers, HVAC, renovations
2. Professional Services - law firms, accounting, consulting
3. Retail & Hospitality - local shops, restaurants, cafes
4. B2B Services - industrial, manufacturing, specialized services

**Local Calgary Expertise:**
- Understand Calgary market & competition
- Local SEO optimization (Google Business Profile, local keywords)
- Know what works for Calgary service businesses
- Familiar with seasonal trends & local events

## GUARANTEES & SUPPORT

**Our Guarantees:**
- 7-day money-back guarantee (full refund if not satisfied)
- Pay only if you love the preview (no payment upfront for Ultimate Suite)
- Guaranteed timeline delivery
- No long-term contracts (clients own everything)
- 100% custom design (no templates)

**What Sets Us Apart:**
- "More Quotes. No Ads" - focus on conversion, not just traffic
- ROI-focused approach (every element designed to convert)
- White glove support (dedicated account manager)
- Proven strategies (track record with Calgary businesses)
- Fast delivery (7-8 weeks, not months)
- AI-powered optimization (leverage latest technology)

**Support Included:**
- 3 months post-launch support with Ultimate Suite
- Unlimited revisions during design phase
- Training on managing your website
- Performance monitoring & reporting
- Technical troubleshooting

**Contact:**
- Email: support@jasonrszova.com
- Quote Form: /audit
- Quick Lead Form: Homepage (top right)

## RESPONSE GUIDELINES

**Tone:** Friendly, helpful, confident. No pressure sales tactics.

**Length:** 2-3 sentences max. Be concise and actionable.

**When to suggest quote form:**
- After answering 2-3 questions
- When user asks about pricing or timeline
- If user expresses interest in getting started
- When they ask about their specific business/industry

**Example prompt:** "Sounds like the Ultimate Suite might be perfect for you! Want to hop on a quick strategy call? Fill out the form at /audit and we'll create a custom plan for your business."

**Common Questions:**
1. "How long?" → Ultimate Suite: 6-8 weeks. Quick launch: 7 days available.
2. "How much?" → Ultimate Suite starts at $2,500. Perfect for businesses serious about growth.
3. "Contract?" → No long-term contracts. You own everything.
4. "What if I don't like it?" → 7-day money-back guarantee. Pay only if you love it.
5. "SEO/Ads?" → We focus on conversion optimization first. SEO foundations included in every build.
6. "Support?" → 3 months included with Ultimate Suite. We're here to help you succeed.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Too many requests. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable. Please contact szovajason@gmail.com' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from AI');
    }

    return new Response(
      JSON.stringify({ response: assistantMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: error.errors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    console.error('Chatbot function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal error',
        response: "I'm sorry, I'm having trouble right now. Please email szovajason@gmail.com or fill out our quote form."
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
