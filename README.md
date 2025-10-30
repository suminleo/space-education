# Soft Developer Club (소프트 디벨로퍼 클럽)

공간 기획과 공간 창업을 강의하는 전문가들의 교육 사이트

> "우리는 도시를 설계하지 않는다. 우리는 도시를 운영하고, 실험하고, 함께 배운다."

## 주요 기능

### 1. 다국어 지원 (Multilingual Support)
- **한국어 (Korean)**: 기본 언어
- **영어 (English)**: 서울에서 부동산/공간/건축 컨설팅을 원하는 해외 고객 대상
- **일본어 (Japanese)**: 서울에서 부동산/공간/건축 컨설팅을 원하는 일본 고객 대상
- 언어 전환 UI 제공 (우측 상단)

### 2. SEO 최적화
- 5개 언어 지원 (한/영/일/중/불)
- Open Graph 메타 태그
- Twitter Card 지원
- hreflang 태그로 다국어 페이지 연결
- 각 페이지별 맞춤 SEO 설정

### 3. 회원 시스템
- **학생 회원 (무료)**
  - 모든 프로그램 열람
  - 커뮤니티 접근
  - 월간 뉴스레터
  - 기본 자료 다운로드

- **무료 회원**
  - 학생 회원 혜택 + 온라인 이벤트 참여

- **멘토 회원 (유료 - 월 100,000원)**
  - 무료 회원 혜택
  - 오프라인 이벤트 우선 참여
  - 1:1 네트워킹 기회
  - 프로젝트 자문 요청
  - 전문가 네트워크 접근
  - 생태계 후원자 인증
  - 대상: 건물주, 투자자, 업계 전문가, 선배

### 4. 뉴스레터 구독
- 이메일 구독 시스템
- 회원가입 시 자동 구독 옵션
- 멤버십 페이지에서도 별도 구독 가능

### 5. 전문가 소개
- 7명의 공간 기획/창업 전문가 프로필
- 각 전문가의 인터뷰 기사 및 링크 제공
- 전문가별 개별 상세 페이지

### 6. 커리큘럼
- **학생 과정**: 공간 기획의 기초부터 실전까지
- **창업가 과정**: 공간 창업 A to Z
- **B2B 교육**: 기업 맞춤형 교육 및 워크샵
- **1:1 컨설팅**: 전문가 맞춤 컨설팅 서비스

### 7. 스케줄 & 수강신청
- 단과/종합반 과정 선택
- 실시간 잔여석 확인
- 온라인 수강 신청 폼

### 8. 결제 연동 (준비 중)
- 토스페이 결제 연동
- 페이팔 결제 연동
- 멘토 멤버십 자동이체 시스템

## 전문가 강사진

1. **홍주석** (어반플레이) - 도시재생 및 공간 혁신
2. **최원석** (프로젝트 렌트) - 팝업스토어 및 임시공간 기획
3. **나훈영** (보마켓) - 라이프스타일 브랜드 및 편집샵 운영
4. **김수민** (로컬스티치) - 로컬 브랜딩 및 지역 활성화
5. **차재** (스튜디오 음머) - 공간 기획 및 전시 디자인
6. **남윤주** (에딧시티 프로젝트) - 패션 스페이스 및 편집샵 큐레이팅
7. **윤주선** (충남대 DIT Lab) - 도시계획 및 스마트시티

## 기술 스택

- **프론트엔드**: React 19 + Vite
- **스타일링**: Tailwind CSS 3
- **애니메이션**: Framer Motion
- **라우팅**: React Router
- **다국어**: react-i18next + i18next
- **SEO**: 커스텀 SEO 컴포넌트
- **결제**: Toss Payments, PayPal (연동 예정)

## 디자인 컨셉

- 미니멀하고 세련된 디자인
- 화이트, 블랙, 그레이 중심의 단색 팔레트
- 깔끔한 타이포그래피 (Libre Baskerville + Inter)
- 모바일 친화적인 반응형 디자인

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173)으로 접속

### 빌드

```bash
npm run build
```

### 프리뷰

```bash
npm run preview
```

## 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── Navbar.jsx      # 네비게이션 바 (다국어 지원)
│   ├── Footer.jsx      # 푸터 (다국어 지원)
│   ├── LanguageSwitcher.jsx  # 언어 전환기
│   └── SEO.jsx         # SEO 메타 태그 관리
├── pages/              # 페이지 컴포넌트
│   ├── Home.jsx        # 홈페이지
│   ├── Experts.jsx     # 전문가 목록
│   ├── ExpertDetail.jsx # 전문가 상세
│   ├── Curriculum.jsx  # 커리큘럼
│   ├── Membership.jsx  # 멤버십
│   ├── Schedule.jsx    # 스케줄 & 신청
│   ├── Contact.jsx     # 문의
│   ├── SignUp.jsx      # 회원가입
│   └── Login.jsx       # 로그인
├── i18n/               # 다국어 설정
│   ├── i18n.js         # i18n 초기화
│   └── locales/        # 번역 파일
│       ├── ko.json     # 한국어
│       ├── en.json     # 영어
│       └── ja.json     # 일본어
├── data/               # 데이터
│   └── experts.js      # 전문가 정보
├── App.jsx             # 메인 앱 컴포넌트
├── index.css           # 글로벌 스타일
└── main.jsx            # 진입점
```

## 다국어 사용법

### 컴포넌트에서 번역 사용

```jsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return <h1>{t('site.name')}</h1>;
};
```

### 번역 추가

`src/i18n/locales/` 폴더의 JSON 파일에 번역을 추가하세요.

## SEO 최적화 가이드

### 페이지별 SEO 설정

```jsx
import SEO from '../components/SEO';

const MyPage = () => {
  return (
    <>
      <SEO
        title="페이지 제목"
        description="페이지 설명"
        keywords="키워드1, 키워드2"
      />
      {/* 페이지 내용 */}
    </>
  );
};
```

## 다음 단계

### 구현 예정 기능
- [ ] 실제 백엔드 API 연동
- [ ] 실제 결제 시스템 연동 (토스, 페이팔)
- [ ] 멘토 멤버십 자동이체 시스템
- [ ] 관리자 페이지
- [ ] 뉴스레터 발송 시스템
- [ ] 회원 마이페이지
- [ ] 전문가 실제 사진 업로드
- [ ] 이메일 인증 시스템
- [ ] 소셜 로그인 (Google, Kakao)
- [ ] 리뷰 및 후기 시스템
- [ ] 블로그 섹션
- [ ] 중국어, 프랑스어 번역 완성

### 개선 사항
- [ ] 이미지 최적화 및 Lazy Loading
- [ ] 접근성(a11y) 개선
- [ ] 성능 최적화
- [ ] 테스트 코드 작성
- [ ] CI/CD 파이프라인 구축

## 멘토 멤버십 자동이체 연동

### 토스페이먼츠 정기결제
1. [토스페이먼츠 개발자 센터](https://developers.tosspayments.com/)에서 API 키 발급
2. 정기결제(빌링) API 연동
3. 월 100,000원 자동이체 설정

### 페이팔 구독
1. [PayPal Developer](https://developer.paypal.com/)에서 구독 플랜 생성
2. PayPal Subscriptions API 연동
3. 월 $90 구독 설정

## 배포

### Vercel 배포
```bash
npm run build
vercel --prod
```

### Netlify 배포
```bash
npm run build
netlify deploy --prod --dir=dist
```

## 환경 변수

`.env` 파일 생성:
```
VITE_TOSS_CLIENT_KEY=your_toss_client_key
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
VITE_API_URL=your_api_url
```

## 라이선스

© 2025 Soft Developer Club. All rights reserved.

## 문의

- Email: contact@softdeveloper.club
- 전화: 02-1234-5678

---

**해외 고객 대상 서비스**

For international clients seeking real estate, space planning, or architecture consulting services in Seoul, please visit our [English site](/en) or [Japanese site](/ja).

ソウルでの不動産、空間企画、建築コンサルティングサービスをお探しの方は、[日本語サイト](/ja)をご覧ください。
