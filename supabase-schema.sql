-- Supabase Database Schema for Soft Developer Club
-- Run this SQL in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- USERS TABLE (Extended from auth.users)
-- ============================================
-- User metadata is stored in auth.users.raw_user_meta_data
-- Additional profile info can be stored here if needed

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  member_type text check (member_type in ('student', 'free', 'mentor')),
  subscribe_newsletter boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Profiles are viewable by everyone, but only updatable by the user themselves
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on public.profiles for update
  using ( auth.uid() = id );

-- Function to automatically create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone, member_type, subscribe_newsletter)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'member_type',
    (new.raw_user_meta_data->>'subscribe_newsletter')::boolean
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- ARTICLES TABLE
-- ============================================
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

-- Enable Row Level Security
alter table public.articles enable row level security;

-- Articles are viewable by authenticated users only (members only)
create policy "Articles are viewable by authenticated users"
  on public.articles for select
  using ( auth.role() = 'authenticated' );

-- Only admins or the author can insert articles
create policy "Authenticated users can insert articles"
  on public.articles for insert
  with check ( auth.role() = 'authenticated' );

-- Only admins can delete articles
create policy "Only admins can delete articles"
  on public.articles for delete
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.member_type = 'mentor'
    )
  );

-- Indexes for performance
create index if not exists articles_created_at_idx on public.articles (created_at desc);
create index if not exists articles_author_idx on public.articles (author);

-- ============================================
-- WRITE TOKENS TABLE
-- ============================================
create table if not exists public.write_tokens (
  id uuid default uuid_generate_v4() primary key,
  token text not null unique,
  expert_id text not null,
  expert_name text not null,
  used boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.write_tokens enable row level security;

-- Only authenticated users can view tokens (for validation)
create policy "Tokens are viewable for validation"
  on public.write_tokens for select
  using ( true );

-- Only admins can insert tokens
create policy "Only admins can create tokens"
  on public.write_tokens for insert
  with check (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.member_type = 'mentor'
    )
  );

-- Tokens can be updated to mark as used
create policy "Tokens can be marked as used"
  on public.write_tokens for update
  using ( true )
  with check ( used = true );

-- Indexes
create index if not exists write_tokens_token_idx on public.write_tokens (token);
create index if not exists write_tokens_used_idx on public.write_tokens (used);

-- ============================================
-- CONTACTS TABLE
-- ============================================
create table if not exists public.contacts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.contacts enable row level security;

-- Anyone can insert a contact (public form)
create policy "Anyone can submit contact form"
  on public.contacts for insert
  with check ( true );

-- Only admins can view contacts
create policy "Only admins can view contacts"
  on public.contacts for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.member_type = 'mentor'
    )
  );

-- Indexes
create index if not exists contacts_created_at_idx on public.contacts (created_at desc);
create index if not exists contacts_email_idx on public.contacts (email);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger for profiles
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row
  execute procedure public.handle_updated_at();

-- Trigger for articles
create trigger set_articles_updated_at
  before update on public.articles
  for each row
  execute procedure public.handle_updated_at();

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================

-- You can add test data here if needed
-- INSERT INTO public.articles (title, content, author) VALUES (...);
