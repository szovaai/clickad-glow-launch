
-- Track reactivation campaigns and which leads have been contacted
CREATE TABLE public.reactivation_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_account_id UUID NOT NULL REFERENCES public.client_accounts(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Default Reactivation',
  inactive_days_min INTEGER NOT NULL DEFAULT 30,
  inactive_days_max INTEGER NOT NULL DEFAULT 90,
  sms_template TEXT NOT NULL DEFAULT 'Hi {{name}}, it''s been a while since we last connected! We have some availability coming up — interested in getting your project started? Reply YES to chat.',
  email_subject TEXT DEFAULT 'We missed you!',
  email_template TEXT DEFAULT 'Hi {{name}},\n\nIt''s been a while since your inquiry about {{service}}. We''d love to help you get started.\n\nReply to this email or give us a call to book a time.\n\nBest regards',
  channel TEXT NOT NULL DEFAULT 'sms',
  active BOOLEAN NOT NULL DEFAULT true,
  last_run_at TIMESTAMPTZ,
  total_contacted INTEGER NOT NULL DEFAULT 0,
  total_replied INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Track individual lead reactivation attempts to avoid duplicates
CREATE TABLE public.reactivation_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES public.reactivation_campaigns(id) ON DELETE CASCADE,
  client_account_id UUID NOT NULL REFERENCES public.client_accounts(id) ON DELETE CASCADE,
  contact_phone TEXT,
  contact_email TEXT,
  contact_name TEXT,
  original_inquiry TEXT,
  source_type TEXT NOT NULL DEFAULT 'chat',
  source_id UUID,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'sent',
  replied BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reactivation_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactivation_log ENABLE ROW LEVEL SECURITY;

-- RLS policies for campaigns
CREATE POLICY "Agency users can manage reactivation campaigns"
ON public.reactivation_campaigns FOR ALL
USING (client_account_id IN (
  SELECT id FROM client_accounts WHERE agency_id = get_user_agency_id(auth.uid())
));

CREATE POLICY "Client users can view own campaigns"
ON public.reactivation_campaigns FOR SELECT
USING (client_account_id IN (
  SELECT client_account_id FROM user_roles WHERE user_id = auth.uid()
));

-- RLS policies for log
CREATE POLICY "Agency users can manage reactivation log"
ON public.reactivation_log FOR ALL
USING (client_account_id IN (
  SELECT id FROM client_accounts WHERE agency_id = get_user_agency_id(auth.uid())
));

CREATE POLICY "Client users can view own reactivation log"
ON public.reactivation_log FOR SELECT
USING (client_account_id IN (
  SELECT client_account_id FROM user_roles WHERE user_id = auth.uid()
));

-- Allow service role insert (for edge function)
CREATE POLICY "Service role can insert reactivation log"
ON public.reactivation_log FOR INSERT
WITH CHECK (true);

-- Trigger for updated_at
CREATE TRIGGER update_reactivation_campaigns_updated_at
BEFORE UPDATE ON public.reactivation_campaigns
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
