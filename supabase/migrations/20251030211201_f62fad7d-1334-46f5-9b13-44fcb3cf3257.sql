-- Create loom_videos table for storing audit video content
CREATE TABLE public.loom_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  loom_url text NOT NULL,
  loom_embed_id text NOT NULL,
  industry text,
  company_type text,
  quick_wins text[] DEFAULT '{}',
  thumbnail_url text,
  view_count integer DEFAULT 0,
  featured boolean DEFAULT false,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.loom_videos ENABLE ROW LEVEL SECURITY;

-- Allow public read access (videos are public content)
CREATE POLICY "Allow public read access to loom_videos"
  ON public.loom_videos
  FOR SELECT
  TO public
  USING (true);

-- Create indexes for filtering
CREATE INDEX idx_loom_videos_industry ON public.loom_videos(industry);
CREATE INDEX idx_loom_videos_featured ON public.loom_videos(featured);

-- Insert sample data (replace with real Loom URLs later)
INSERT INTO public.loom_videos (title, loom_url, loom_embed_id, industry, company_type, quick_wins, featured) VALUES
(
  'Calgary Electrician Website Audit - 3 Quick Wins',
  'https://www.loom.com/share/sample-electrician',
  'sample-electrician',
  'Electrician',
  'Residential & Commercial Electrical',
  ARRAY['Emergency call button missing from header', 'Services page buried 3 clicks deep', 'No trust badges or certifications visible'],
  true
),
(
  'Renovation Contractor Website Audit',
  'https://www.loom.com/share/sample-renovation',
  'sample-renovation',
  'Renovation',
  'Kitchen & Bathroom Remodeling',
  ARRAY['Quote form requires 8 fields (losing 60% of leads)', 'Mobile menu broken on iPhone', 'Before/after gallery not optimized - slow load times'],
  false
),
(
  'Industrial Manufacturing Website Audit',
  'https://www.loom.com/share/sample-industrial',
  'sample-industrial',
  'Industrial',
  'Precision Manufacturing',
  ARRAY['Capabilities unclear on homepage - what do you actually make?', 'No case studies linked from services page', 'Contact page not mobile-friendly'],
  false
),
(
  'HVAC Contractor Website Audit',
  'https://www.loom.com/share/sample-hvac',
  'sample-hvac',
  'HVAC',
  'Heating & Cooling Services',
  ARRAY['24/7 emergency number hidden in footer', 'Service area not mentioned anywhere', 'No online booking option for service calls'],
  false
),
(
  'Plumbing Company Website Audit',
  'https://www.loom.com/share/sample-plumbing',
  'sample-plumbing',
  'Plumbing',
  'Residential Plumbing',
  ARRAY['Homepage has no clear CTA', 'Pricing information missing (causing phone call overload)', 'Google My Business not linked'],
  false
);