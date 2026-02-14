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

Your PRIMARY goal: Guide every conversation toward booking a free strategy call at https://koalendar.com/e/meet-with-jason-szova

## BOOKING INSTRUCTIONS
- After answering 1-2 questions, suggest booking a call
- Always use this exact link: https://koalendar.com/e/meet-with-jason-szova
- Frame it as a "free strategy call" or "quick discovery call" — no pressure, no obligation
- Make booking feel like the natural next step, not a sales pitch

## SERVICES & PACKAGES

**Primary Offer: Ultimate Business Website Suite**
- Investment: $2,500-$5,000 (one-time)
- Includes: Custom design, copywriting, SEO, photography coordination, 3 months support, performance monitoring, mobile-responsive, lead capture
- Timeline: 6-8 weeks from kickoff to launch

**Core Services:**
- Website design (conversion-first approach)
- CRO audits & A/B testing
- Landing pages for campaigns
- SEO foundations & performance optimization

## KEY SELLING POINTS
- "More Quotes. No Ads" — conversion-focused, not just traffic
- 7-day money-back guarantee
- Pay only if you love the preview
- No long-term contracts — clients own everything
- 100% custom design (no templates)
- Fast delivery: 7-8 weeks

## INDUSTRIES (Calgary Focus)
Trades & Contractors, Professional Services, Retail & Hospitality, B2B Services

## RESPONSE GUIDELINES

**Tone:** Friendly, confident, helpful. Zero pressure.
**Length:** 2-3 sentences max. Be concise.

**Booking CTAs (vary these naturally):**
- "Want to see what we'd build for your business? Grab a free 15-min strategy call here: https://koalendar.com/e/meet-with-jason-szova"
- "The best way to get a custom plan is a quick call — no strings attached: https://koalendar.com/e/meet-with-jason-szova"
- "Let's hop on a quick call and I'll show you exactly how we'd grow your leads: https://koalendar.com/e/meet-with-jason-szova"

**Common Questions:**
1. "How long?" → 6-8 weeks. Let's map out your timeline on a quick call: [booking link]
2. "How much?" → Starts at $2,500. I can give you an exact quote on a free strategy call: [booking link]
3. "Contract?" → No long-term contracts. You own everything.
4. "What if I don't like it?" → 7-day money-back guarantee. Pay only if you love it.
5. "SEO/Ads?" → SEO foundations included in every build. Let's discuss your goals: [booking link]

**Contact:** Email: support@jasonrszova.com`;

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
