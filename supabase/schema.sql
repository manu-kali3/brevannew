-- Brevan Softwares lead storage
-- Run this in the Supabase SQL Editor (once per project).

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

-- Allow inserts from the server (service role bypasses RLS by default).
-- Optional: add row level security for reads through the API if needed later.
alter table public.leads enable row level security;
