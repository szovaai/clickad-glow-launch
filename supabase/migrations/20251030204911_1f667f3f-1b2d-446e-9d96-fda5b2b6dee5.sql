-- Create companies table
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  city text default 'Calgary',
  province text default 'AB',
  industry text,
  created_at timestamptz default now()
);

-- Create contacts table
create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  first_name text not null,
  last_name text,
  email text not null,
  phone text,
  role text,
  created_at timestamptz default now()
);

-- Create audits/leads table
create table public.audits (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete cascade,
  url text,
  notes text,
  status text check (status in ('new', 'contacted', 'sent', 'booked', 'won', 'lost')) default 'new',
  loom_url text,
  improvements jsonb,
  -- UTM tracking fields
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.companies enable row level security;
alter table public.contacts enable row level security;
alter table public.audits enable row level security;

-- Allow public inserts for lead capture (no auth required)
create policy "Allow public insert" on public.companies for insert with check (true);
create policy "Allow public insert" on public.contacts for insert with check (true);
create policy "Allow public insert" on public.audits for insert with check (true);

-- Create indexes for performance
create index idx_audits_company on public.audits(company_id);
create index idx_audits_status on public.audits(status);
create index idx_audits_created on public.audits(created_at desc);
create index idx_contacts_company on public.contacts(company_id);
create index idx_contacts_email on public.contacts(email);