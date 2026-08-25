CREATE TABLE public.franchise_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT,
  state TEXT,
  capital_range TEXT,
  timeline TEXT,
  message TEXT,
  source TEXT DEFAULT 'homepage',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.franchise_leads TO anon;
GRANT INSERT ON public.franchise_leads TO authenticated;
GRANT ALL ON public.franchise_leads TO service_role;

ALTER TABLE public.franchise_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a franchise lead"
ON public.franchise_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(full_name) BETWEEN 2 AND 120
  AND length(email) BETWEEN 5 AND 200
  AND length(phone) BETWEEN 8 AND 30
  AND coalesce(length(message), 0) <= 2000
);