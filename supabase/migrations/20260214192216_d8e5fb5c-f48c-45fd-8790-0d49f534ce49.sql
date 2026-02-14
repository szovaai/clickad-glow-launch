-- Fix: Restrict GHL API key SELECT to agency_admin only
DROP POLICY IF EXISTS "Agency users can view GHL integrations" ON public.ghl_integrations;

CREATE POLICY "Agency admins can view GHL integrations"
  ON public.ghl_integrations FOR SELECT TO authenticated
  USING (
    client_account_id IN (
      SELECT id FROM public.client_accounts 
      WHERE agency_id = public.get_user_agency_id(auth.uid())
    )
    AND public.has_role(auth.uid(), 'agency_admin')
  );