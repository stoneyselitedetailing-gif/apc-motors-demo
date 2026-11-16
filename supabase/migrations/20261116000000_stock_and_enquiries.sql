-- APC Motor Group / Performance Vehicle Warehouse: stock, enquiries, admins.
-- Run this once in Supabase → SQL Editor.

create table if not exists public.admin_users (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_users a
    where a.email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null default 'available'
    check (status in ('available', 'under_offer', 'sold', 'hidden')),
  featured boolean not null default false,
  year int check (year between 1900 and 2100),
  make text not null,
  model text not null,
  variant text,
  price int check (price >= 0),
  km int check (km >= 0),
  body text,
  transmission text,
  fuel text,
  engine text,
  colour text,
  interior text,
  description text,
  features text[] not null default '{}',
  photos text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists cars_status_idx on public.cars (status, created_at desc);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('find', 'sell', 'finance', 'car')),
  car_id uuid references public.cars (id) on delete set null,
  name text not null,
  phone text not null,
  email text,
  details jsonb not null default '{}',
  message text,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists enquiries_created_idx on public.enquiries (created_at desc);

-- Row level security: the public site reads and writes through the server
-- (service key). Signed-in admins can read and change everything.
alter table public.admin_users enable row level security;
alter table public.cars enable row level security;
alter table public.enquiries enable row level security;

drop policy if exists "admins read admins" on public.admin_users;
create policy "admins read admins" on public.admin_users
  for select to authenticated using (public.is_admin());

drop policy if exists "public reads listed cars" on public.cars;
create policy "public reads listed cars" on public.cars
  for select to anon, authenticated using (status <> 'hidden');

drop policy if exists "admins manage cars" on public.cars;
create policy "admins manage cars" on public.cars
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins manage enquiries" on public.enquiries;
create policy "admins manage enquiries" on public.enquiries
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Public photo bucket. Uploads go through the server after an admin check.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('stock-photos', 'stock-photos', true, 5242880, array['image/webp', 'image/jpeg', 'image/png'])
on conflict (id) do nothing;

-- The first car, using the photos that ship with the site.
insert into public.cars (slug, status, featured, make, model, body, transmission, colour, interior, description, features, photos)
values (
  'hsv-coupe', 'available', true, 'HSV', 'Coupe', '2-door coupe', 'Automatic', 'Black', 'Tan leather sports seats',
  'A gloss black HSV Coupe with tan leather sports seats, presented in excellent condition. Call for kilometres, full history and an inspection time.',
  array['Tan leather sports seats', 'Rear spoiler', 'Twin exhaust', 'Multi-spoke alloy wheels'],
  array['/images/hsv-coupe-front.webp', '/images/hsv-coupe-side.webp', '/images/hsv-coupe-rear.webp',
        '/images/hsv-coupe-seats.webp', '/images/hsv-coupe-interior.webp', '/images/hsv-coupe-door.webp']
)
on conflict (slug) do nothing;

-- Then add the owner's sign-in email (lower case), after creating the user
-- in Supabase → Authentication → Users:
-- insert into public.admin_users (email) values ('owner@example.com');
