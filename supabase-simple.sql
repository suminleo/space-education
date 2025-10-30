-- ====================================
-- STEP 1: Enable Extensions
-- ====================================
create extension if not exists "uuid-ossp";

-- ====================================
-- STEP 2: Create Profiles Table
-- ====================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  member_type text check (member_type in ('student', 'free', 'mentor')),
  subscribe_newsletter boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable" on public.profiles for select using (true);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- ====================================
-- STEP 3: Create Articles Table
-- ====================================
create table if not exists public.articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  author text not null,
  author_id uuid references auth.users on delete set null,
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.articles enable row level security;

-- Policies for articles
create policy "Articles viewable by authenticated" on public.articles for select using (auth.role() = 'authenticated');
create policy "Authenticated can insert articles" on public.articles for insert with check (auth.role() = 'authenticated');

-- ====================================
-- STEP 4: Create Write Tokens Table
-- ====================================
create table if not exists public.write_tokens (
  id uuid default uuid_generate_v4() primary key,
  token text not null unique,
  expert_id text not null,
  expert_name text not null,
  used boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.write_tokens enable row level security;

-- Policies for write_tokens
create policy "Tokens viewable for validation" on public.write_tokens for select using (true);
create policy "Tokens can be marked as used" on public.write_tokens for update using (true) with check (used = true);

-- ====================================
-- STEP 5: Create Contacts Table
-- ====================================
create table if not exists public.contacts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.contacts enable row level security;

-- Policies for contacts
create policy "Anyone can submit contact" on public.contacts for insert with check (true);

-- ====================================
-- STEP 6: Create Trigger Function
-- ====================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $function$
begin
  insert into public.profiles (id, full_name, phone, member_type, subscribe_newsletter)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'member_type',
    coalesce((new.raw_user_meta_data->>'subscribe_newsletter')::boolean, true)
  );
  return new;
end;
$function$;

-- ====================================
-- STEP 7: Create Trigger
-- ====================================
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
