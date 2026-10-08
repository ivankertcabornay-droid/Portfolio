create extension if not exists "pgcrypto";

create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  template text not null default 'simple',
  full_name text,
  profile_picture_url text,
  email text,
  contact_number text,
  address text,
  about_me text,
  education jsonb not null default '[]'::jsonb,
  skills jsonb not null default '[]'::jsonb,
  projects jsonb not null default '[]'::jsonb,
  work_experience jsonb not null default '[]'::jsonb,
  social_links jsonb not null default '[]'::jsonb,
  github_link text,
  linkedin_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.portfolios enable row level security;

create policy "Public can view portfolios"
on public.portfolios for select
using (true);

create policy "Public can insert portfolios"
on public.portfolios for insert
with check (true);

create policy "Public can update portfolios"
on public.portfolios for update
using (true)
with check (true);

create policy "Public can delete portfolios"
on public.portfolios for delete
using (true);

create index if not exists portfolios_created_at_idx
on public.portfolios (created_at desc);
