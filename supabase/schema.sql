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
drop policy if exists "events are publicly readable" on public.events;
create policy "events are publicly readable"
  on public.events
  for select
  to anon
  using (true);

-- Admin app writes events using the service role (bypasses RLS).
drop policy if exists "events are manageable by service role" on public.events;
create policy "events are manageable by service role"
  on public.events
  for all
  to service_role
  using (true)
  with check (true);

-- Projects (public portfolio + admin CRUD via manage-brevan)
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  description text,
  image_url text,
  project_url text,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

-- Public site reads projects (anon key) for the /projects page.
drop policy if exists "projects are publicly readable" on public.projects;
create policy "projects are publicly readable"
  on public.projects
  for select
  to anon
  using (true);

-- Admin app writes projects using the service role (bypasses RLS).
drop policy if exists "projects are manageable by service role" on public.projects;
create policy "projects are manageable by service role"
  on public.projects
  for all
  to service_role
  using (true)
  with check (true);

-- Performance indexes for the common read/write paths.
-- Events are listed ordered by date on both the public site and the admin app.
create index if not exists idx_events_event_date
  on public.events (event_date);

-- Projects are listed ordered by most recently added.
create index if not exists idx_projects_created_at
  on public.projects (created_at desc);

-- Leads and emails are growing write logs; index their common sort/filter columns.
create index if not exists idx_leads_created_at
  on public.leads (created_at desc);

create index if not exists idx_leads_email
  on public.leads (email);

create index if not exists idx_emails_created_at
  on public.emails (created_at desc);

create index if not exists idx_emails_type
  on public.emails (type);
