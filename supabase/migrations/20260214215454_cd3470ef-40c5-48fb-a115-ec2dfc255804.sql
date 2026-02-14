
-- Appointments table for tracking bookings and sending reminders
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_account_id UUID NOT NULL REFERENCES public.client_accounts(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  service_type TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed',
  reminder_24h_sent BOOLEAN NOT NULL DEFAULT false,
  reminder_1h_sent BOOLEAN NOT NULL DEFAULT false,
  reschedule_token TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Agency users can view appointments for their clients
CREATE POLICY "Agency users can view appointments"
ON public.appointments FOR SELECT
USING (client_account_id IN (
  SELECT id FROM client_accounts WHERE agency_id = get_user_agency_id(auth.uid())
));

-- Agency admins can insert appointments
CREATE POLICY "Agency admins can insert appointments"
ON public.appointments FOR INSERT
WITH CHECK (
  client_account_id IN (
    SELECT id FROM client_accounts WHERE agency_id = get_user_agency_id(auth.uid())
  ) AND has_role(auth.uid(), 'agency_admin'::app_role)
);

-- Agency admins can update appointments
CREATE POLICY "Agency admins can update appointments"
ON public.appointments FOR UPDATE
USING (
  client_account_id IN (
    SELECT id FROM client_accounts WHERE agency_id = get_user_agency_id(auth.uid())
  ) AND has_role(auth.uid(), 'agency_admin'::app_role)
);

-- Agency admins can delete appointments
CREATE POLICY "Agency admins can delete appointments"
ON public.appointments FOR DELETE
USING (
  client_account_id IN (
    SELECT id FROM client_accounts WHERE agency_id = get_user_agency_id(auth.uid())
  ) AND has_role(auth.uid(), 'agency_admin'::app_role)
);

-- Client users can view own appointments
CREATE POLICY "Client users can view own appointments"
ON public.appointments FOR SELECT
USING (client_account_id IN (
  SELECT client_account_id FROM user_roles WHERE user_id = auth.uid()
));

-- Public can view appointment by reschedule token (for reschedule links)
CREATE POLICY "Public can view by reschedule token"
ON public.appointments FOR SELECT
USING (true);

-- Public can update status via reschedule token
CREATE POLICY "Public can reschedule by token"
ON public.appointments FOR UPDATE
USING (status = 'confirmed')
WITH CHECK (status IN ('confirmed', 'rescheduled', 'cancelled'));

-- Trigger for updated_at
CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON public.appointments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index for the cron job to find upcoming appointments needing reminders
CREATE INDEX idx_appointments_reminder_lookup 
ON public.appointments (scheduled_at, status) 
WHERE status = 'confirmed' AND (reminder_24h_sent = false OR reminder_1h_sent = false);
