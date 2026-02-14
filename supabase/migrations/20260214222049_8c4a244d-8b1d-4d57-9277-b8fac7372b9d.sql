
-- Add Google review URL to client_accounts for the redirect agent
ALTER TABLE public.client_accounts
ADD COLUMN google_review_url TEXT;
