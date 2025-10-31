import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.78.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const payload = await req.json();
    console.log('Received pixel event:', payload);

    // Extract and validate required fields
    const {
      type,
      url,
      ref,
      vid,
      sid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      ad_id,
      creative_id,
      placement,
      ttclid,
      tt_content,
      campaign_id,
      adgroup_id,
      ...extra
    } = payload;

    // Validate required fields
    if (!type || !url || !vid || !sid) {
      throw new Error('Missing required fields: type, url, vid, sid');
    }

    // Insert pixel event into database
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

    console.log('Pixel event stored successfully:', type, vid);

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error processing pixel event:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
