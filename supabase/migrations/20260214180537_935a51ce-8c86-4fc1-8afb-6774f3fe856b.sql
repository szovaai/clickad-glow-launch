
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('agency_admin', 'agency_support', 'client_owner', 'client_staff');

-- Agencies table
CREATE TABLE public.agencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.agencies ENABLE ROW LEVEL SECURITY;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  agency_id UUID REFERENCES public.agencies(id) ON DELETE SET NULL,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- User roles table (separate from profiles per security requirements)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  agency_id UUID REFERENCES public.agencies(id) ON DELETE CASCADE,
  client_account_id UUID, -- FK added after client_accounts created
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Client accounts table
CREATE TABLE public.client_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_id UUID REFERENCES public.agencies(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  industry TEXT,
  services TEXT[],
  service_area TEXT,
  hours JSONB DEFAULT '{}',
  emergency_hours BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.client_accounts ENABLE ROW LEVEL SECURITY;

-- Add FK from user_roles to client_accounts
ALTER TABLE public.user_roles
  ADD CONSTRAINT user_roles_client_account_id_fkey
  FOREIGN KEY (client_account_id) REFERENCES public.client_accounts(id) ON DELETE SET NULL;

-- Security definer function to check roles (avoids infinite recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Helper: get agency_id for a user
CREATE OR REPLACE FUNCTION public.get_user_agency_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT agency_id FROM public.profiles WHERE user_id = _user_id LIMIT 1
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS: agencies
CREATE POLICY "Users can view own agency"
  ON public.agencies FOR SELECT TO authenticated
  USING (id = public.get_user_agency_id(auth.uid()));

CREATE POLICY "Agency admins can update own agency"
  ON public.agencies FOR UPDATE TO authenticated
  USING (id = public.get_user_agency_id(auth.uid()) AND public.has_role(auth.uid(), 'agency_admin'));

-- RLS: profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Agency admins can view agency profiles"
  ON public.profiles FOR SELECT TO authenticated
  USING (agency_id = public.get_user_agency_id(auth.uid()));

-- RLS: user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Agency admins can manage roles"
  ON public.user_roles FOR ALL TO authenticated
  USING (agency_id = public.get_user_agency_id(auth.uid()) AND public.has_role(auth.uid(), 'agency_admin'));

-- RLS: client_accounts
CREATE POLICY "Agency users can view own clients"
  ON public.client_accounts FOR SELECT TO authenticated
  USING (agency_id = public.get_user_agency_id(auth.uid()));

CREATE POLICY "Agency admins can insert clients"
  ON public.client_accounts FOR INSERT TO authenticated
  WITH CHECK (agency_id = public.get_user_agency_id(auth.uid()) AND public.has_role(auth.uid(), 'agency_admin'));

CREATE POLICY "Agency admins can update clients"
  ON public.client_accounts FOR UPDATE TO authenticated
  USING (agency_id = public.get_user_agency_id(auth.uid()) AND public.has_role(auth.uid(), 'agency_admin'));

CREATE POLICY "Agency admins can delete clients"
  ON public.client_accounts FOR DELETE TO authenticated
  USING (agency_id = public.get_user_agency_id(auth.uid()) AND public.has_role(auth.uid(), 'agency_admin'));

-- Client users can view their own client account
CREATE POLICY "Client users can view own account"
  ON public.client_accounts FOR SELECT TO authenticated
  USING (
    id IN (
      SELECT client_account_id FROM public.user_roles WHERE user_id = auth.uid()
    )
  );

-- Updated_at trigger for client_accounts
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_client_accounts_updated_at
  BEFORE UPDATE ON public.client_accounts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
