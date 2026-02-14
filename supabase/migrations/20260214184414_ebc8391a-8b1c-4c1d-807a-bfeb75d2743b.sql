
-- Voice configuration per client
CREATE TABLE public.voice_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_account_id UUID NOT NULL REFERENCES public.client_accounts(id) ON DELETE CASCADE,
  greeting_script TEXT DEFAULT '',
  qualification_script TEXT DEFAULT '',
  booking_script TEXT DEFAULT '',
  transfer_rules JSONB DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(client_account_id)
);

-- Call transcripts
CREATE TABLE public.call_transcripts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_account_id UUID NOT NULL REFERENCES public.client_accounts(id) ON DELETE CASCADE,
  call_log_id UUID REFERENCES public.call_logs(id) ON DELETE SET NULL,
  transcript JSONB DEFAULT '[]',
  summary TEXT,
  intent_detected TEXT,
  outcome TEXT DEFAULT 'unknown',
  caller_phone TEXT,
  duration_seconds INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Voice function definitions
CREATE TABLE public.voice_function_defs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  parameters JSONB DEFAULT '{}',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.voice_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_function_defs ENABLE ROW LEVEL SECURITY;

-- Voice configs policies
CREATE POLICY "Agency users can view voice configs" ON public.voice_configs
  FOR SELECT USING (client_account_id IN (
    SELECT id FROM client_accounts WHERE agency_id = get_user_agency_id(auth.uid())
  ));

CREATE POLICY "Agency admins can manage voice configs" ON public.voice_configs
  FOR ALL USING (
    client_account_id IN (SELECT id FROM client_accounts WHERE agency_id = get_user_agency_id(auth.uid()))
    AND has_role(auth.uid(), 'agency_admin')
  );

CREATE POLICY "Client users can view own voice config" ON public.voice_configs
  FOR SELECT USING (client_account_id IN (
    SELECT client_account_id FROM user_roles WHERE user_id = auth.uid()
  ));

-- Call transcripts policies
CREATE POLICY "Agency users can view transcripts" ON public.call_transcripts
  FOR SELECT USING (client_account_id IN (
    SELECT id FROM client_accounts WHERE agency_id = get_user_agency_id(auth.uid())
  ));

CREATE POLICY "Client users can view own transcripts" ON public.call_transcripts
  FOR SELECT USING (client_account_id IN (
    SELECT client_account_id FROM user_roles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Allow webhook insert transcripts" ON public.call_transcripts
  FOR INSERT WITH CHECK (true);

-- Voice function defs - public read
CREATE POLICY "Anyone can view function defs" ON public.voice_function_defs
  FOR SELECT USING (true);

-- Triggers
CREATE TRIGGER update_voice_configs_updated_at
  BEFORE UPDATE ON public.voice_configs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed voice function definitions
INSERT INTO public.voice_function_defs (name, description, parameters) VALUES
  ('createContact', 'Create a new contact in the CRM', '{"type":"object","properties":{"name":{"type":"string"},"phone":{"type":"string"},"email":{"type":"string"}}}'),
  ('createOpportunity', 'Create a sales opportunity', '{"type":"object","properties":{"contact_id":{"type":"string"},"service":{"type":"string"},"value":{"type":"number"}}}'),
  ('bookAppointment', 'Book an appointment on the calendar', '{"type":"object","properties":{"contact_id":{"type":"string"},"datetime":{"type":"string"},"duration":{"type":"number"}}}'),
  ('applyTag', 'Apply a tag to a contact', '{"type":"object","properties":{"contact_id":{"type":"string"},"tag":{"type":"string"}}}'),
  ('transferCall', 'Transfer the call to a human agent', '{"type":"object","properties":{"department":{"type":"string"},"reason":{"type":"string"}}}');
