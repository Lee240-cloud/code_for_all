# 학교 파트너십 가게 공유 지도 웹앱

학교 주변 파트너십 가게 정보를 지도에서 확인할 수 있는 웹 애플리케이션입니다.

## 주요 기능

- 🔐 **회원가입/로그인**: Firebase Authentication을 통한 사용자 인증
- 🗺️ **카카오맵 연동**: 카카오맵 API를 사용한 지도 표시
- 🏪 **가게 정보**: 이름, 카테고리, 쿠폰 정보, 리뷰, 평점 등
- 📍 **위치 기반**: 지도상에서 파트너십 가게 위치 확인
- 👑 **관리자 기능**: 가게 정보 추가 및 관리

## 기술 스택

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **지도 서비스**: 카카오맵 API
- **배포**: Vercel (예정)

## 시작하기

### 1. 환경 설정

`.env` 파일에 다음 환경변수를 설정하세요:

```bash
# 카카오맵 API 키
NEXT_PUBLIC_KAKAO_MAP_KEY=your_kakao_map_api_key

# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 사용 방법

### 일반 사용자
1. 메인 페이지에서 지도를 확인
2. 마커를 클릭하여 가게 정보 확인
3. 회원가입/로그인을 통한 추가 기능 이용

### 관리자 (가게 정보 추가)
1. `/admin` 페이지 접속
2. 가게 정보 입력 폼 작성
   - 가게명, 카테고리, 주소
   - 위도/경도 좌표
   - 쿠폰 정보, 평점, 리뷰 수
   - 전화번호, 설명 등
3. 가게 추가 버튼 클릭

## Firebase 설정

### Firestore 보안 규칙
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /stores/{storeId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Authentication 설정
- 이메일/비밀번호 로그인 활성화
- 필요시 소셜 로그인 추가 가능

## 프로젝트 구조

```
├── app/
│   ├── page.js          # 메인 페이지
│   ├── layout.js        # 레이아웃
│   └── admin/
│       └── page.js      # 관리자 페이지
├── components/
│   ├── Header.js        # 헤더 컴포넌트
│   ├── KakaoMap.js      # 카카오맵 컴포넌트
│   └── AuthModal.js     # 인증 모달
├── contexts/
│   └── AuthContext.js   # 인증 컨텍스트
├── lib/
│   ├── firebase.js      # Firebase 설정
│   └── storeService.js  # 가게 데이터 서비스
└── .env                 # 환경변수
```

## 라이센스

MIT License
