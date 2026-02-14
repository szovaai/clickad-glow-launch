
-- Remove overly permissive insert policy (edge function uses service role which bypasses RLS)
DROP POLICY IF EXISTS "Allow service insert reviews" ON public.reviews;
