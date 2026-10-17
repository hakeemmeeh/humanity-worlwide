-- =====================================================================
-- Humanity Worldwide (HWW) — Admin + CMS schema (Supabase / Postgres)
-- Paste into Supabase -> SQL Editor -> Run. Idempotent (safe to re-run).
--
-- Security model: RLS is ENABLED on every table. Public (anon) may read
-- ONLY published content rows. Inbox tables (inquiries, volunteers) have
-- NO public policies at all. The app talks to the DB through the
-- service-role key, used only in server code.
-- =====================================================================

create extension if not exists pgcrypto;

create or replace function public.set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

do $$ begin create type content_status as enum ('draft','published');
exception when duplicate_object then null; end $$;
do $$ begin create type inbox_status as enum ('new','contacted','closed');
exception when duplicate_object then null; end $$;
do $$ begin create type volunteer_status as enum ('new','reviewing','accepted','declined');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------
-- INBOX: contact form submissions
-- ---------------------------------------------------------------------
create table if not exists public.inquiries (
  id          uuid primary key default gen_random_uuid(),
  first_name  text not null,
  last_name   text not null,
  email       text not null,
  subject     text not null,
  message     text not null,
  status      inbox_status not null default 'new',
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists inquiries_status_idx  on public.inquiries (status);
create index if not exists inquiries_created_idx on public.inquiries (created_at desc);
drop trigger if exists inquiries_updated on public.inquiries;
create trigger inquiries_updated before update on public.inquiries
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- INBOX: volunteer applications
-- ---------------------------------------------------------------------
create table if not exists public.volunteers (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  skills        text not null,
  availability  text not null,   -- remote | local | international
  status        volunteer_status not null default 'new',
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists volunteers_status_idx  on public.volunteers (status);
create index if not exists volunteers_created_idx on public.volunteers (created_at desc);
drop trigger if exists volunteers_updated on public.volunteers;
create trigger volunteers_updated before update on public.volunteers
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- CMS: news articles (maps to Article)
-- ---------------------------------------------------------------------
create table if not exists public.articles (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  excerpt     text not null,
  author      text not null default 'Humanity Worldwide',
  date        date not null default current_date,
  image       text not null,
  category    text,
  body        text[] not null default '{}',
  status      content_status not null default 'published',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists articles_status_idx on public.articles (status);
create index if not exists articles_date_idx   on public.articles (date desc);
drop trigger if exists articles_updated on public.articles;
create trigger articles_updated before update on public.articles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- CMS: success stories (maps to Story)
-- ---------------------------------------------------------------------
create table if not exists public.stories (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  quote         text not null,
  name          text not null,
  role          text not null,
  image         text not null,
  program       text,            -- e.g. Education
  program_slug  text,            -- e.g. education
  body          text[] not null default '{}',
  sort_order    int not null default 0,   -- lower first; new items default to the top
  status        content_status not null default 'published',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists stories_status_idx on public.stories (status);
drop trigger if exists stories_updated on public.stories;
create trigger stories_updated before update on public.stories
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- CMS: emergency case stories (maps to Campaign). Informational only —
-- per client requirements there is no fundraising goal/progress here.
-- ---------------------------------------------------------------------
create table if not exists public.campaigns (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  title           text not null,
  description     text not null,
  image           text not null,
  location        text not null,
  country         text,
  crisis_type     text,          -- Floods | Displacement | Drought | Conflict | Multi-hazard
  families_reached int,
  body            text[] not null default '{}',
  needs           text[] not null default '{}',
  sort_order      int not null default 0,
  status          content_status not null default 'published',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists campaigns_status_idx on public.campaigns (status);
drop trigger if exists campaigns_updated on public.campaigns;
create trigger campaigns_updated before update on public.campaigns
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- CMS: field documentaries (/media)
-- ---------------------------------------------------------------------
create table if not exists public.videos (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  category      text not null,
  location      text not null,
  description   text not null,
  image         text not null,   -- poster/cover
  youtube_id    text,            -- null = "Coming soon"
  featured      boolean not null default false,
  sort_order    int not null default 0,
  status        content_status not null default 'published',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists videos_status_idx on public.videos (status);
drop trigger if exists videos_updated on public.videos;
create trigger videos_updated before update on public.videos
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------
alter table public.inquiries  enable row level security;   -- no policies = sealed
alter table public.volunteers enable row level security;   -- no policies = sealed
alter table public.articles   enable row level security;
alter table public.stories    enable row level security;
alter table public.campaigns  enable row level security;
alter table public.videos     enable row level security;

do $$
declare t text;
begin
  foreach t in array array['articles','stories','campaigns','videos'] loop
    execute format('drop policy if exists "anon reads published %1$s" on public.%1$I', t);
    execute format(
      'create policy "anon reads published %1$s" on public.%1$I for select to anon using (status = ''published'')', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------
-- STORAGE: public "media" bucket (uploads go through the server)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');

-- ---------------------------------------------------------------------
-- SETTINGS: tiny key/value store (e.g. cms_imported flag). Sealed by RLS.
-- ---------------------------------------------------------------------
create table if not exists public.site_settings (
  key         text primary key,
  value       jsonb not null default 'null'::jsonb,
  updated_at  timestamptz not null default now()
);
alter table public.site_settings enable row level security;  -- no policies = sealed
