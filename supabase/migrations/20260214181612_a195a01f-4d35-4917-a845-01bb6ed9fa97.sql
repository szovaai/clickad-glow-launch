
-- Call logs
CREATE TABLE public.call_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_account_id UUID REFERENCES public.client_accounts(id) ON DELETE CASCADE NOT NULL,
  caller_phone TEXT NOT NULL,
  direction TEXT NOT NULL DEFAULT 'inbound' CHECK (direction IN ('inbound','outbound')),
  status TEXT NOT NULL DEFAULT 'missed' CHECK (status IN ('answered','missed','recovered')),
  duration INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.call_logs ENABLE ROW LEVEL SECURITY;

-- SMS messages
CREATE TABLE public.sms_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_account_id UUID REFERENCES public.client_accounts(id) ON DELETE CASCADE NOT NULL,
  call_log_id UUID REFERENCES public.call_logs(id) ON DELETE SET NULL,
  to_phone TEXT NOT NULL,
  from_phone TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','sent','delivered','failed')),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.sms_messages ENABLE ROW LEVEL SECURITY;

-- Follow-up sequences
CREATE TABLE public.follow_up_sequences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_account_id UUID REFERENCES public.client_accounts(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  trigger_event TEXT NOT NULL DEFAULT 'new_lead' CHECK (trigger_event IN ('new_lead','missed_call','no_show','quote_sent','reactivation')),
  steps JSONB NOT NULL DEFAULT '[]',
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.follow_up_sequences ENABLE ROW LEVEL SECURITY;

-- Sequence enrollments
CREATE TABLE public.sequence_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sequence_id UUID REFERENCES public.follow_up_sequences(id) ON DELETE CASCADE NOT NULL,
  client_account_id UUID REFERENCES public.client_accounts(id) ON DELETE CASCADE NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_name TEXT,
  contact_email TEXT,
  current_step INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','completed','stopped','paused')),
  next_action_at TIMESTAMPTZ,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.sequence_enrollments ENABLE ROW LEVEL SECURITY;

-- RLS: call_logs
CREATE POLICY "Agency users can view call logs"
  ON public.call_logs FOR SELECT TO authenticated
  USING (client_account_id IN (SELECT id FROM public.client_accounts WHERE agency_id = public.get_user_agency_id(auth.uid())));

CREATE POLICY "Client users can view own call logs"
  ON public.call_logs FOR SELECT TO authenticated
  USING (client_account_id IN (SELECT client_account_id FROM public.user_roles WHERE user_id = auth.uid()));

CREATE POLICY "Allow anon insert call logs"
  ON public.call_logs FOR INSERT TO anon WITH CHECK (true);

-- RLS: sms_messages
CREATE POLICY "Agency users can view sms"
  ON public.sms_messages FOR SELECT TO authenticated
  USING (client_account_id IN (SELECT id FROM public.client_accounts WHERE agency_id = public.get_user_agency_id(auth.uid())));

CREATE POLICY "Client users can view own sms"
  ON public.sms_messages FOR SELECT TO authenticated
  USING (client_account_id IN (SELECT client_account_id FROM public.user_roles WHERE user_id = auth.uid()));

-- RLS: follow_up_sequences
CREATE POLICY "Agency users can manage sequences"
  ON public.follow_up_sequences FOR ALL TO authenticated
  USING (client_account_id IN (SELECT id FROM public.client_accounts WHERE agency_id = public.get_user_agency_id(auth.uid())));

CREATE POLICY "Client users can view own sequences"
  ON public.follow_up_sequences FOR SELECT TO authenticated
  USING (client_account_id IN (SELECT client_account_id FROM public.user_roles WHERE user_id = auth.uid()));

-- RLS: sequence_enrollments
CREATE POLICY "Agency users can manage enrollments"
  ON public.sequence_enrollments FOR ALL TO authenticated
  USING (client_account_id IN (SELECT id FROM public.client_accounts WHERE agency_id = public.get_user_agency_id(auth.uid())));

CREATE POLICY "Client users can view own enrollments"
  ON public.sequence_enrollments FOR SELECT TO authenticated
  USING (client_account_id IN (SELECT client_account_id FROM public.user_roles WHERE user_id = auth.uid()));

-- Triggers
CREATE TRIGGER update_follow_up_sequences_updated_at
  BEFORE UPDATE ON public.follow_up_sequences FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sequence_enrollments_updated_at
  BEFORE UPDATE ON public.sequence_enrollments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
