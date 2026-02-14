
-- Post-job follow-up configurations per client
CREATE TABLE public.post_job_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_account_id UUID NOT NULL REFERENCES public.client_accounts(id) ON DELETE CASCADE,
  active BOOLEAN NOT NULL DEFAULT true,
  delay_hours INTEGER NOT NULL DEFAULT 2,
  satisfaction_sms TEXT NOT NULL DEFAULT 'Hi {{name}}, thanks for choosing {{business}}! How was your experience? Reply 1-5 (5 = amazing).',
  upsell_sms TEXT NOT NULL DEFAULT 'Glad you had a great experience, {{name}}! Did you know we also offer maintenance plans? Reply INFO to learn more.',
  upsell_enabled BOOLEAN NOT NULL DEFAULT true,
  review_redirect_enabled BOOLEAN NOT NULL DEFAULT true,
  review_threshold INTEGER NOT NULL DEFAULT 4,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(client_account_id)
);

-- Log each follow-up sent
CREATE TABLE public.post_job_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_account_id UUID NOT NULL REFERENCES public.client_accounts(id) ON DELETE CASCADE,
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  customer_name TEXT,
  customer_phone TEXT NOT NULL,
  step TEXT NOT NULL DEFAULT 'satisfaction',
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  reply_rating INTEGER,
  review_sent BOOLEAN NOT NULL DEFAULT false,
  upsell_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.post_job_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_job_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agency users can manage post_job_configs"
ON public.post_job_configs FOR ALL
USING (client_account_id IN (
  SELECT id FROM client_accounts WHERE agency_id = get_user_agency_id(auth.uid())
));

CREATE POLICY "Client users can view own post_job_configs"
ON public.post_job_configs FOR SELECT
USING (client_account_id IN (
  SELECT client_account_id FROM user_roles WHERE user_id = auth.uid()
));

CREATE POLICY "Agency users can manage post_job_log"
ON public.post_job_log FOR ALL
USING (client_account_id IN (
  SELECT id FROM client_accounts WHERE agency_id = get_user_agency_id(auth.uid())
));

CREATE POLICY "Client users can view own post_job_log"
ON public.post_job_log FOR SELECT
USING (client_account_id IN (
  SELECT client_account_id FROM user_roles WHERE user_id = auth.uid()
));

-- Service role insert for edge function
CREATE POLICY "Service role can insert post_job_log"
ON public.post_job_log FOR INSERT
WITH CHECK (true);

CREATE TRIGGER update_post_job_configs_updated_at
BEFORE UPDATE ON public.post_job_configs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add followup_sent flag to appointments to prevent duplicates
ALTER TABLE public.appointments ADD COLUMN followup_sent BOOLEAN NOT NULL DEFAULT false;
