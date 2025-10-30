# Supabase 설정 가이드

이 가이드는 Soft Developer Club 웹사이트를 위한 Supabase 백엔드를 설정하는 방법을 안내합니다.

## 1. Supabase 프로젝트 생성

### 1.1 계정 생성
1. https://supabase.com 접속
2. **Start your project** 클릭
3. GitHub 계정으로 로그인

### 1.2 새 프로젝트 생성
1. **New Project** 클릭
2. 프로젝트 정보 입력:
   - **Name**: `space-education` (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 생성 (잘 저장해두세요!)
   - **Region**: `Northeast Asia (Seoul)` 선택 (한국 사용자용)
   - **Pricing Plan**: Free 선택

3. **Create new project** 클릭 (약 2분 소요)

## 2. 데이터베이스 스키마 생성

### 2.1 SQL Editor 접속
1. 좌측 메뉴에서 **SQL Editor** 클릭
2. **+ New query** 클릭

### 2.2 스키마 실행
1. `supabase-schema.sql` 파일의 전체 내용 복사
2. SQL Editor에 붙여넣기
3. **Run** 버튼 클릭 (또는 Cmd/Ctrl + Enter)
4. 성공 메시지 확인

### 2.3 테이블 확인
좌측 메뉴에서 **Table Editor**를 클릭하여 다음 테이블들이 생성되었는지 확인:
- `profiles` - 회원 프로필
- `articles` - 블로그 글
- `write_tokens` - 전문가 글쓰기 토큰
- `contacts` - 문의 내용

## 3. Authentication 설정

### 3.1 이메일 인증 활성화
1. 좌측 메뉴에서 **Authentication** 클릭
2. **Providers** 탭 선택
3. **Email** 제공자가 활성화되어 있는지 확인
4. **Enable email confirmations** 옵션 체크 (선택사항)

### 3.2 이메일 템플릿 설정 (선택사항)
1. **Authentication** > **Email Templates** 이동
2. 회원가입 환영 이메일 등을 커스터마이즈

## 4. 환경 변수 설정

### 4.1 API Keys 확인
1. 좌측 메뉉에서 **Project Settings** (톱니바퀴 아이콘) 클릭
2. **API** 탭 선택
3. 다음 정보를 복사:
   - **Project URL** (`https://xxxxx.supabase.co`)
   - **anon public key** (길고 복잡한 키)

### 4.2 로컬 환경 변수 설정
프로젝트 루트의 `.env` 파일 열기:

```bash
# .env 파일
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**중요**: `.env` 파일은 절대 GitHub에 커밋하지 마세요! (`.gitignore`에 이미 포함됨)

## 5. 로컬에서 테스트

### 5.1 개발 서버 실행
```bash
npm run dev
```

### 5.2 테스트 항목
1. **회원가입** (`/signup`)
   - 새 계정 생성
   - Supabase Dashboard > Authentication > Users에서 확인

2. **로그인** (`/login`)
   - 방금 만든 계정으로 로그인
   - 성공 시 홈페이지로 리다이렉트

3. **문의하기** (`/contact`)
   - 문의 폼 작성 및 제출
   - Supabase Dashboard > Table Editor > contacts에서 확인

4. **블로그** (`/blog`)
   - 로그인 상태에서만 접근 가능 확인
   - 로그아웃 시 로그인 페이지로 리다이렉트

## 6. Row Level Security (RLS) 확인

Supabase는 기본적으로 Row Level Security를 사용합니다. 스키마 파일에 이미 다음 정책들이 설정되어 있습니다:

- ✅ **profiles**: 본인 프로필만 수정 가능
- ✅ **articles**: 인증된 사용자만 조회/작성 가능
- ✅ **write_tokens**: 관리자만 생성 가능
- ✅ **contacts**: 누구나 작성 가능, 관리자만 조회 가능

확인 방법:
1. **Authentication** > **Policies** 이동
2. 각 테이블의 정책들이 활성화되어 있는지 확인

## 7. 관리자 계정 설정

### 7.1 첫 회원을 멘토로 설정
```sql
-- SQL Editor에서 실행
UPDATE profiles
SET member_type = 'mentor'
WHERE id = 'your-user-id-here';
```

**your-user-id-here** 찾는 방법:
1. **Authentication** > **Users** 이동
2. 회원 목록에서 UID 복사

### 7.2 관리자 페이지 접속
- URL: `/admin`
- 비밀번호: `admin1234` (코드에 하드코딩됨, 나중에 변경 권장)

## 8. 배포 환경 설정 (Vercel)

### 8.1 Vercel 프로젝트 생성
1. https://vercel.com 접속
2. GitHub 저장소 연동
3. **Environment Variables** 설정:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 8.2 배포
```bash
# Vercel CLI 사용
npm install -g vercel
vercel

# 또는 GitHub push 시 자동 배포
git push origin main
```

## 9. 추가 설정 (선택사항)

### 9.1 이메일 알림 설정
문의가 접수되면 관리자에게 이메일 알림을 보내려면:

1. **Database** > **Functions** 이동
2. 새 Function 생성:

```sql
CREATE OR REPLACE FUNCTION notify_contact()
RETURNS TRIGGER AS $$
BEGIN
  -- 여기에 이메일 발송 로직 추가
  -- 예: Supabase Edge Functions 또는 외부 서비스 연동
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_contact_created
  AFTER INSERT ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION notify_contact();
```

### 9.2 Storage 설정 (이미지 업로드용)
1. **Storage** 메뉴 클릭
2. **New bucket** 생성
3. 공개/비공개 설정

### 9.3 데이터베이스 백업
1. **Database** > **Backups** 이동
2. 자동 백업 주기 설정

## 10. 문제 해결

### 회원가입이 안 돼요
- **에러**: "Email not confirmed"
  - **해결**: Authentication > Providers에서 "Enable email confirmations" 끄기
- **에러**: "Invalid API key"
  - **해결**: `.env` 파일의 키를 다시 확인

### 데이터가 안 보여요
- **확인 사항**:
  1. Supabase Dashboard에서 데이터가 실제로 저장되었는지 확인
  2. RLS 정책이 올바른지 확인
  3. 브라우저 콘솔에서 에러 메시지 확인

### 로그인 후에도 블로그가 안 보여요
- **해결**: 브라우저 새로고침 (F5)
- **확인**: 개발자 도구 > Application > Local Storage에 Supabase 세션이 있는지 확인

## 11. 다음 단계

✅ Supabase 설정 완료!

이제 다음 작업들을 진행할 수 있습니다:
- [ ] WriteArticle 및 Admin 페이지를 Supabase로 마이그레이션
- [ ] 뉴스레터 발송 기능 구현 (Supabase Edge Functions 또는 외부 서비스)
- [ ] 이미지 업로드 기능 추가 (Supabase Storage)
- [ ] 소셜 로그인 추가 (Google, GitHub 등)

## 12. 유용한 링크

- 📖 [Supabase 공식 문서](https://supabase.com/docs)
- 🎥 [Supabase YouTube 채널](https://www.youtube.com/@Supabase)
- 💬 [Supabase Discord](https://discord.supabase.com/)
- 🐛 [Supabase GitHub Issues](https://github.com/supabase/supabase/issues)

---

**도움이 필요하신가요?**
- 프로젝트 Issues 탭에 질문 남겨주세요
- 또는 contact@softdeveloper.club으로 이메일 주세요
