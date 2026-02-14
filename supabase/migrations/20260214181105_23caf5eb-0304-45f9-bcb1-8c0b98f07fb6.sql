
-- Chat conversations
CREATE TABLE public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_account_id UUID REFERENCES public.client_accounts(id) ON DELETE CASCADE NOT NULL,
  visitor_id TEXT NOT NULL,
  visitor_name TEXT,
  visitor_email TEXT,
  visitor_phone TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','closed','qualified','unqualified')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

-- Chat messages
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('visitor','ai','system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Chat widget configs
CREATE TABLE public.chat_widget_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_account_id UUID REFERENCES public.client_accounts(id) ON DELETE CASCADE NOT NULL UNIQUE,
  primary_color TEXT DEFAULT '#3B82F6',
  logo_url TEXT,
  auto_open BOOLEAN DEFAULT false,
  greeting_message TEXT DEFAULT 'Hi! How can I help you today?',
  qualification_flow JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_widget_configs ENABLE ROW LEVEL SECURITY;

-- RLS: chat_conversations - agency users + public insert for widget visitors
CREATE POLICY "Agency users can view conversations"
  ON public.chat_conversations FOR SELECT TO authenticated
  USING (client_account_id IN (SELECT id FROM public.client_accounts WHERE agency_id = public.get_user_agency_id(auth.uid())));

CREATE POLICY "Client users can view own conversations"
  ON public.chat_conversations FOR SELECT TO authenticated
  USING (client_account_id IN (SELECT client_account_id FROM public.user_roles WHERE user_id = auth.uid()));

CREATE POLICY "Allow anon insert conversations"
  ON public.chat_conversations FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon update conversations"
  ON public.chat_conversations FOR UPDATE TO anon
  USING (true);

-- RLS: chat_messages
CREATE POLICY "Agency users can view messages"
  ON public.chat_messages FOR SELECT TO authenticated
  USING (conversation_id IN (
    SELECT id FROM public.chat_conversations WHERE client_account_id IN (
      SELECT id FROM public.client_accounts WHERE agency_id = public.get_user_agency_id(auth.uid())
    )
  ));

CREATE POLICY "Allow anon insert messages"
  ON public.chat_messages FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon select messages"
  ON public.chat_messages FOR SELECT TO anon
  USING (true);

-- RLS: chat_widget_configs
CREATE POLICY "Agency users can manage widget configs"
  ON public.chat_widget_configs FOR ALL TO authenticated
  USING (client_account_id IN (SELECT id FROM public.client_accounts WHERE agency_id = public.get_user_agency_id(auth.uid())));

CREATE POLICY "Public can read widget configs"
  ON public.chat_widget_configs FOR SELECT TO anon
  USING (true);

-- Triggers
CREATE TRIGGER update_chat_conversations_updated_at
  BEFORE UPDATE ON public.chat_conversations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chat_widget_configs_updated_at
  BEFORE UPDATE ON public.chat_widget_configs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
