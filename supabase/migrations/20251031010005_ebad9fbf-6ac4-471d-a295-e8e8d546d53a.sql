-- Create pixel_events table for Trakrly custom pixel tracking
CREATE TABLE public.pixel_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  visitor_id uuid NOT NULL,
  session_id uuid NOT NULL,
  url text NOT NULL,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  ad_id text,
  creative_id text,
  placement text,
  ttclid text,
  tt_content text,
  campaign_id text,
  adgroup_id text,
  extra jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pixel_events ENABLE ROW LEVEL SECURITY;

-- Public insert policy (pixel can write)
CREATE POLICY "Allow public insert on pixel_events"
  ON public.pixel_events
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Indexes for analytics queries
CREATE INDEX idx_pixel_events_visitor ON pixel_events(visitor_id);
CREATE INDEX idx_pixel_events_session ON pixel_events(session_id);
CREATE INDEX idx_pixel_events_type ON pixel_events(event_type);
CREATE INDEX idx_pixel_events_created ON pixel_events(created_at DESC);
CREATE INDEX idx_pixel_events_utm_source ON pixel_events(utm_source);