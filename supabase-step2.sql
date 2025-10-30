-- ==========================================
-- STEP 2: RLS Policies (접근 권한 설정)
-- ==========================================

-- Profiles policies
DROP POLICY IF EXISTS "Public profiles viewable" ON public.profiles;
DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;

CREATE POLICY "Public profiles viewable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Contacts policies (누구나 문의 가능)
DROP POLICY IF EXISTS "Anyone can insert contact" ON public.contacts;
CREATE POLICY "Anyone can insert contact" ON public.contacts FOR INSERT WITH CHECK (true);

-- Articles policies (로그인한 사람만)
DROP POLICY IF EXISTS "Auth users view articles" ON public.articles;
DROP POLICY IF EXISTS "Auth users insert articles" ON public.articles;

CREATE POLICY "Auth users view articles" ON public.articles FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users insert articles" ON public.articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Write tokens policies
DROP POLICY IF EXISTS "Tokens viewable" ON public.write_tokens;
DROP POLICY IF EXISTS "Tokens updatable" ON public.write_tokens;

CREATE POLICY "Tokens viewable" ON public.write_tokens FOR SELECT USING (true);
CREATE POLICY "Tokens updatable" ON public.write_tokens FOR UPDATE USING (true);
