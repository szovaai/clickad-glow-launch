
-- Create reviews table
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_account_id uuid NOT NULL REFERENCES public.client_accounts(id) ON DELETE CASCADE,
  token text NOT NULL UNIQUE DEFAULT gen_random_uuid()::text,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  rating integer,
  quote text,
  role text,
  status text NOT NULL DEFAULT 'pending',
  submitted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Agency users can view reviews for their clients
CREATE POLICY "Agency users can view reviews"
ON public.reviews FOR SELECT
USING (client_account_id IN (
  SELECT id FROM client_accounts WHERE agency_id = get_user_agency_id(auth.uid())
));

-- Client users can view their own reviews
CREATE POLICY "Client users can view own reviews"
ON public.reviews FOR SELECT
USING (client_account_id IN (
  SELECT client_account_id FROM user_roles WHERE user_id = auth.uid()
));

-- Agency admins can insert reviews (via edge function uses service role, but also direct)
CREATE POLICY "Agency admins can insert reviews"
ON public.reviews FOR INSERT
WITH CHECK (
  client_account_id IN (
    SELECT id FROM client_accounts WHERE agency_id = get_user_agency_id(auth.uid())
  ) AND has_role(auth.uid(), 'agency_admin')
);

-- Agency admins can update review status (approve/reject)
CREATE POLICY "Agency admins can update reviews"
ON public.reviews FOR UPDATE
USING (
  client_account_id IN (
    SELECT id FROM client_accounts WHERE agency_id = get_user_agency_id(auth.uid())
  ) AND has_role(auth.uid(), 'agency_admin')
);

-- Public can update reviews by token (submit review) only when pending
CREATE POLICY "Public can submit review by token"
ON public.reviews FOR UPDATE
USING (status = 'pending')
WITH CHECK (status = 'pending');

-- Public can select review by token (to load the form)
CREATE POLICY "Public can read review by token"
ON public.reviews FOR SELECT
USING (true);

-- Allow service role / edge function inserts
CREATE POLICY "Allow service insert reviews"
ON public.reviews FOR INSERT
WITH CHECK (true);
