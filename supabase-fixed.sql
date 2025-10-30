-- ==========================================
-- 확실하게 작동하는 버전 (에러 최소화)
-- ==========================================

-- 1. Extension 먼저 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. 기존 테이블이 있으면 삭제 (처음부터 깨끗하게)
DROP TABLE IF EXISTS public.write_tokens CASCADE;
DROP TABLE IF EXISTS public.contacts CASCADE;
DROP TABLE IF EXISTS public.articles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 3. Profiles 테이블 생성
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  phone text,
  member_type text,
  subscribe_newsletter boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_policy" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert_policy" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_policy" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 4. Articles 테이블 생성
CREATE TABLE public.articles (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "articles_select_policy" ON public.articles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "articles_insert_policy" ON public.articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 5. Contacts 테이블 생성
CREATE TABLE public.contacts (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contacts_insert_policy" ON public.contacts FOR INSERT WITH CHECK (true);

-- 6. Write Tokens 테이블 생성
CREATE TABLE public.write_tokens (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  token text NOT NULL UNIQUE,
  expert_id text NOT NULL,
  expert_name text NOT NULL,
  used boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.write_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tokens_select_policy" ON public.write_tokens FOR SELECT USING (true);
CREATE POLICY "tokens_update_policy" ON public.write_tokens FOR UPDATE USING (true);

-- 7. Trigger Function (회원가입 시 프로필 자동 생성)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, member_type, subscribe_newsletter)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    COALESCE(new.raw_user_meta_data->>'member_type', 'free'),
    COALESCE((new.raw_user_meta_data->>'subscribe_newsletter')::boolean, true)
  );
  RETURN new;
EXCEPTION
  WHEN others THEN
    RETURN new;
END;
$$;

-- 8. Trigger 생성
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
