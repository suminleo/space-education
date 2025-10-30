# 배포 가이드

이 문서는 소프트 디벨로퍼 클럽 웹사이트를 프로덕션 환경에 배포하는 방법을 안내합니다.

## 사전 준비

### 1. Supabase 설정 완료
먼저 `SUPABASE_SETUP.md` 가이드를 따라 Supabase 백엔드를 설정하세요.

### 2. 환경 변수 확인
`.env` 파일에 올바른 Supabase 키가 설정되어 있는지 확인:
```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. 로컬 빌드 테스트
```bash
npm run build
npm run preview
```

브라우저에서 `http://localhost:4173`로 접속하여 모든 기능이 정상 작동하는지 확인하세요.

## Vercel로 배포하기 (추천)

Vercel은 무료이며 자동 배포, SSL, CDN을 제공합니다.

### 방법 1: GitHub 연동 (추천)

#### Step 1: GitHub 저장소 생성
```bash
# Git 초기화 (아직 안했다면)
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: Soft Developer Club website"

# GitHub에 저장소 생성 후 연결
git remote add origin https://github.com/your-username/space-education.git
git branch -M main
git push -u origin main
```

#### Step 2: Vercel에 배포
1. https://vercel.com 접속
2. **Continue with GitHub** 클릭
3. **Import Project** 선택
4. 방금 push한 저장소 선택
5. **Configure Project** 화면에서:
   - **Framework Preset**: Vite 자동 선택
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. **Environment Variables** 추가:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

7. **Deploy** 클릭!

배포 완료 후 `https://your-project.vercel.app` 같은 URL을 받게 됩니다.

### 방법 2: Vercel CLI

```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

환경 변수는 대화형 프롬프트에서 입력하거나, Vercel Dashboard에서 추가하세요.

## 커스텀 도메인 설정

### Vercel에서 도메인 연결
1. Vercel Dashboard > 프로젝트 선택
2. **Settings** > **Domains**
3. **Add** 클릭 후 도메인 입력 (예: `softdeveloper.club`)
4. DNS 설정 안내에 따라 도메인 제공업체에서 설정:
   ```
   A Record: 76.76.21.21
   또는
   CNAME: cname.vercel-dns.com
   ```

5. 전파 대기 (최대 48시간, 보통 몇 분)

## 배포 후 체크리스트

### ✅ 기능 테스트
- [ ] 홈페이지 로딩
- [ ] 언어 전환 (KR/EN/JP)
- [ ] 회원가입
- [ ] 로그인
- [ ] 문의하기
- [ ] 블로그 (회원 전용)
- [ ] 이미지 로딩
- [ ] 모바일 반응형

### ✅ SEO 확인
```bash
# 사이트맵 생성 (향후 추가 예정)
# Google Search Console 등록
# robots.txt 확인
```

### ✅ 성능 확인
- Lighthouse 점수 확인: https://pagespeed.web.dev/
- 목표:
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 95+

## 자동 배포 설정

GitHub에 push하면 자동으로 배포됩니다:

```bash
# 코드 수정 후
git add .
git commit -m "Update: 기능 추가"
git push origin main

# Vercel이 자동으로 빌드 & 배포
# 배포 상태는 Vercel Dashboard에서 확인
```

### Preview 배포
Pull Request를 생성하면 자동으로 preview URL이 생성됩니다:
```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
# GitHub에서 PR 생성
# Vercel이 자동으로 preview 배포 생성
```

## 다른 배포 옵션

### Netlify
1. https://netlify.com 접속
2. **Add new site** > **Import from Git**
3. 저장소 연결
4. 빌드 설정:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. 환경 변수 추가
6. **Deploy site**

### Cloudflare Pages
1. https://pages.cloudflare.com 접속
2. **Create a project**
3. GitHub 저장소 연결
4. 프레임워크 preset: `Vite`
5. 환경 변수 추가
6. **Save and Deploy**

### GitHub Pages (정적 사이트만, Auth 불가)
주의: Supabase Auth는 작동하지 않습니다. 단순 정적 사이트만 가능합니다.

```bash
# vite.config.js에 base 경로 추가
export default defineConfig({
  base: '/space-education/',
  plugins: [react()],
})

# 빌드 및 배포
npm run build
npx gh-pages -d dist
```

## 환경별 설정

### 개발 환경
```bash
npm run dev
# http://localhost:5173
```

### 스테이징 환경 (Vercel Preview)
```bash
git push origin feature-branch
# Vercel이 자동으로 preview URL 생성
```

### 프로덕션 환경
```bash
git push origin main
# https://softdeveloper.club
```

## 모니터링 & 분석

### Vercel Analytics
1. Vercel Dashboard > 프로젝트
2. **Analytics** 탭
3. 무료로 페이지뷰, 속도 등 확인 가능

### Google Analytics (선택사항)
```javascript
// public/index.html에 추가
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Sentry (에러 트래킹, 선택사항)
```bash
npm install --save @sentry/react @sentry/vite-plugin
```

## 백업 & 롤백

### 이전 버전으로 롤백
Vercel Dashboard에서:
1. **Deployments** 탭
2. 이전 배포 선택
3. **Promote to Production** 클릭

또는 CLI:
```bash
vercel rollback
```

### 데이터베이스 백업
Supabase Dashboard > **Database** > **Backups**에서 자동 백업 설정

## 문제 해결

### 배포는 성공했는데 사이트가 안 열려요
- **확인**: Vercel Dashboard > Deployment Logs 확인
- **해결**: 빌드 에러가 있는지 확인

### 환경 변수가 안 먹혀요
- **확인**: Vercel Dashboard > Settings > Environment Variables
- **해결**: 변수 이름이 `VITE_`로 시작하는지 확인
- **재배포**: 환경 변수 변경 후 Redeploy 필요

### 이미지가 안 보여요
- **확인**: `public/images/` 폴더가 Git에 포함되어 있는지
- **해결**: `.gitignore`에서 이미지 폴더 제외 확인

### 로그인이 안 돼요
- **확인**: Supabase Dashboard > Authentication > URL Configuration
- **해결**: Site URL을 프로덕션 도메인으로 설정
  ```
  Site URL: https://softdeveloper.club
  Redirect URLs: https://softdeveloper.club/**
  ```

## 성능 최적화

### 이미지 최적화
```bash
# 이미지 압축 (ImageOptim 또는 온라인 도구 사용)
# WebP 형식으로 변환 권장
```

### 코드 스플리팅
```javascript
// React.lazy를 사용한 lazy loading
const Blog = React.lazy(() => import('./pages/Blog'));
```

### CDN 캐싱
Vercel은 자동으로 CDN 캐싱을 제공합니다.

## 보안 체크리스트

- [ ] `.env` 파일이 `.gitignore`에 포함되어 있음
- [ ] Supabase RLS가 모든 테이블에 활성화됨
- [ ] API 키가 GitHub에 노출되지 않음
- [ ] HTTPS가 활성화됨 (Vercel 자동 제공)
- [ ] CORS 정책 확인

## 추가 자료

- 📖 [Vercel 문서](https://vercel.com/docs)
- 🎥 [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
- 💬 [Vercel Discord](https://discord.gg/vercel)

---

**배포 완료!** 🎉

이제 전 세계 어디서나 소프트 디벨로퍼 클럽 웹사이트에 접속할 수 있습니다.
