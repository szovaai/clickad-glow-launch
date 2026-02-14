
-- Client configs table (stores all onboarding wizard data)
CREATE TABLE public.client_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_account_id UUID REFERENCES public.client_accounts(id) ON DELETE CASCADE NOT NULL UNIQUE,
  qualification_rules JSONB DEFAULT '{}',
  calendar_settings JSONB DEFAULT '{}',
  phone_config JSONB DEFAULT '{}',
  knowledge_base JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.client_configs ENABLE ROW LEVEL SECURITY;

-- GHL integrations table
CREATE TABLE public.ghl_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_account_id UUID REFERENCES public.client_accounts(id) ON DELETE CASCADE NOT NULL UNIQUE,
  api_key TEXT,
  location_id TEXT,
  pipeline_id TEXT,
  stage_mapping JSONB DEFAULT '{}',
  custom_field_mapping JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.ghl_integrations ENABLE ROW LEVEL SECURITY;

-- RLS: client_configs - agency users can manage configs for their clients
CREATE POLICY "Agency users can view client configs"
  ON public.client_configs FOR SELECT TO authenticated
  USING (
    client_account_id IN (
      SELECT id FROM public.client_accounts WHERE agency_id = public.get_user_agency_id(auth.uid())
    )
  );

CREATE POLICY "Agency admins can insert client configs"
  ON public.client_configs FOR INSERT TO authenticated
  WITH CHECK (
    client_account_id IN (
      SELECT id FROM public.client_accounts WHERE agency_id = public.get_user_agency_id(auth.uid())
    )
    AND public.has_role(auth.uid(), 'agency_admin')
  );

CREATE POLICY "Agency admins can update client configs"
  ON public.client_configs FOR UPDATE TO authenticated
  USING (
    client_account_id IN (
      SELECT id FROM public.client_accounts WHERE agency_id = public.get_user_agency_id(auth.uid())
    )
    AND public.has_role(auth.uid(), 'agency_admin')
  );

-- Client users can view their own config
CREATE POLICY "Client users can view own config"
  ON public.client_configs FOR SELECT TO authenticated
  USING (
    client_account_id IN (
      SELECT client_account_id FROM public.user_roles WHERE user_id = auth.uid()
    )
  );

-- RLS: ghl_integrations
CREATE POLICY "Agency users can view GHL integrations"
  ON public.ghl_integrations FOR SELECT TO authenticated
  USING (
    client_account_id IN (
      SELECT id FROM public.client_accounts WHERE agency_id = public.get_user_agency_id(auth.uid())
    )
  );

CREATE POLICY "Agency admins can insert GHL integrations"
  ON public.ghl_integrations FOR INSERT TO authenticated
  WITH CHECK (
    client_account_id IN (
      SELECT id FROM public.client_accounts WHERE agency_id = public.get_user_agency_id(auth.uid())
    )
    AND public.has_role(auth.uid(), 'agency_admin')
  );

CREATE POLICY "Agency admins can update GHL integrations"
  ON public.ghl_integrations FOR UPDATE TO authenticated
  USING (
    client_account_id IN (
      SELECT id FROM public.client_accounts WHERE agency_id = public.get_user_agency_id(auth.uid())
    )
    AND public.has_role(auth.uid(), 'agency_admin')
  );

-- Triggers for updated_at
CREATE TRIGGER update_client_configs_updated_at
  BEFORE UPDATE ON public.client_configs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ghl_integrations_updated_at
  BEFORE UPDATE ON public.ghl_integrations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
