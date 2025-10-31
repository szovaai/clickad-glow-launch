import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an AI assistant for ClickAd Media, a Calgary-based web design agency specializing in conversion optimization for trades & service businesses.

Your goal: Answer common questions about services, pricing, and process. When appropriate, guide visitors to fill out the free quote form at /audit.

Key information to reference:
- Services: Website design, CRO audits, A/B testing, landing pages
- Pricing: Starter ($197/mo), Growth ($297/mo), Enterprise ($497/mo)
- Process: 7-day website launch, 14-day CRO sprint
- Guarantee: 7-day money-back guarantee
- No long-term contracts, clients own everything
- Contact: szovajason@gmail.com

Common questions:
1. "How long does it take?" → 7 days for website, 14 days for CRO
2. "How much does it cost?" → Share pricing tiers, mention free preview
3. "Do I need to sign a contract?" → No long-term contracts
4. "What if I don't like it?" → 7-day guarantee, pay only if you love the preview
5. "Can you help with SEO/Google Ads?" → Focus on conversion optimization first

When to suggest the quote form:
- After answering 2-3 questions
- When user asks about pricing or timeline
- If user expresses interest in getting started
- Use: "Ready to see how we can help? Fill out our quick quote form and we'll create a custom plan for your business."

Tone: Friendly, helpful, confident. No pressure sales tactics. Keep responses concise (2-3 sentences max).`;

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
          JSON.stringify({ 
            error: 'Too many requests. Please try again in a moment.' 
          }),
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: 'Service temporarily unavailable. Please contact szovajason@gmail.com' 
          }),
          { 
            status: 402, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
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
    console.error('Chatbot function error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        response: "I'm sorry, I'm having trouble right now. Please email szovajason@gmail.com or fill out our quote form."
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
