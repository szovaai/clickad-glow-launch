import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.78.0';
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const str200 = z.string().max(200).optional();

const RequestSchema = z.object({
  type: z.string().min(1).max(50),
  url: z.string().url().max(2000),
  ref: z.string().max(2000).optional(),
  vid: z.string().uuid(),
  sid: z.string().uuid(),
  utm_source: str200,
  utm_medium: str200,
  utm_campaign: str200,
  utm_term: str200,
  utm_content: str200,
  ad_id: str200,
  creative_id: str200,
  placement: str200,
  ttclid: str200,
  tt_content: str200,
  campaign_id: str200,
  adgroup_id: str200,
}).passthrough();

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const payload = await req.json();
    const validated = RequestSchema.parse(payload);

    const {
      type, url, ref, vid, sid,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      ad_id, creative_id, placement, ttclid, tt_content,
      campaign_id, adgroup_id,
      ...extra
    } = validated;

    const { error } = await supabase.from('pixel_events').insert({
      event_type: type,
      visitor_id: vid,
      session_id: sid,
      url,
      referrer: ref || null,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_term: utm_term || null,
      utm_content: utm_content || null,
      ad_id: ad_id || null,
      creative_id: creative_id || null,
      placement: placement || null,
      ttclid: ttclid || null,
      tt_content: tt_content || null,
      campaign_id: campaign_id || null,
      adgroup_id: adgroup_id || null,
      extra: Object.keys(extra).length > 0 ? extra : null,
    });

    if (error) {
      console.error('Database insert error:', error);
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: 'Invalid input' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
    console.error('Error processing pixel event:', error);
    return new Response(
      JSON.stringify({ error: 'Processing error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
