-- Brevan Softwares lead and email storage
-- Run this in the Supabase SQL Editor (once per project). Safe to re-run.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('quote', 'contact')),
  name text not null,
  email text not null,
  phone text,
  subject text,
  service text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.emails (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  from_address text,
  to_address text not null,
  subject text,
  body text,
  delivered boolean not null default false,
  created_at timestamptz not null default now()
);

-- Server uses the service role (bypasses RLS), so inserts always work.
alter table public.leads enable row level security;
alter table public.emails enable row level security;

-- Events (public listing + admin CRUD via manage-brevan)
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  event_time text,
  venue text,
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

-- Public site reads events (anon key) for the /events page.
create policy "events are publicly readable"
  on public.events
  for select
  to anon
  using (true);

-- Admin app writes events using the service role (bypasses RLS).
create policy "events are manageable by service role"
  on public.events
  for all
  to service_role
  using (true)
  with check (true);
