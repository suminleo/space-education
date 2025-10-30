-- ==========================================
-- STEP 3: Trigger Function (회원가입 시 프로필 자동 생성)
-- ==========================================

-- 기존 trigger 삭제
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Function 생성
CREATE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
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
END;
$$;

-- Trigger 생성
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
