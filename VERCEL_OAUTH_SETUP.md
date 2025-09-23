# Vercel 배포 환경 OAuth 설정 가이드

Vercel에 배포된 앱에서 구글/카카오 로그인이 정상 작동하도록 설정하는 방법입니다.

## 1. Google Cloud Console 설정

### 1.1 Authorized redirect URIs 업데이트

Google Cloud Console에서 다음 URL들을 모두 추가해야 합니다:

**개발 환경:**
```
http://localhost:3000/auth/callback
```

**Vercel 배포 환경:**
```
https://your-app-name.vercel.app/auth/callback
```

**Supabase OAuth 콜백:**
```
https://mhagshobzzmhejpfyact.supabase.co/auth/v1/callback
```

### 1.2 설정 방법

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. **APIs & Services** > **Credentials** 이동
3. OAuth 2.0 Client ID 클릭
4. **Authorized redirect URIs** 섹션에서 **+ ADD URI** 클릭
5. 위의 모든 URL들을 하나씩 추가
6. **SAVE** 클릭

## 2. Kakao Developers 설정

### 2.1 Redirect URI 업데이트

Kakao Developers에서 다음 URL들을 모두 추가해야 합니다:

**개발 환경:**
```
http://localhost:3000/auth/callback
```

**Vercel 배포 환경:**
```
https://your-app-name.vercel.app/auth/callback
```

**Supabase OAuth 콜백:**
```
https://mhagshobzzmhejpfyact.supabase.co/auth/v1/callback
```

### 2.2 설정 방법

1. [Kakao Developers](https://developers.kakao.com/) 접속
2. **내 애플리케이션** > 해당 앱 선택
3. **제품 설정** > **카카오 로그인** 이동
4. **Redirect URI** 섹션에서 **+ URI 추가** 클릭
5. 위의 모든 URL들을 하나씩 추가
6. **저장** 클릭

## 3. Supabase 설정

### 3.1 Site URL 업데이트

Supabase Dashboard에서 Site URL을 업데이트합니다:

1. [Supabase Dashboard](https://supabase.com/dashboard) 접속
2. 프로젝트 선택
3. **Authentication** > **URL Configuration** 이동
4. **Site URL**을 Vercel 배포 URL로 변경:
   ```
   https://your-app-name.vercel.app
   ```

### 3.2 Redirect URLs 업데이트

**Redirect URLs**에 다음 패턴들을 추가:

```
https://your-app-name.vercel.app/**
https://mhagshobzzmhejpfyact.supabase.co/auth/v1/callback
```

## 4. Vercel 환경 변수 설정

Vercel Dashboard에서 환경 변수를 설정합니다:

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 선택
3. **Settings** > **Environment Variables** 이동
4. 다음 변수들 추가:

```
NEXT_PUBLIC_SUPABASE_URL=https://mhagshobzzmhejpfyact.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 5. 테스트 방법

### 5.1 로컬 테스트

```bash
npm run dev
```

브라우저에서 `http://localhost:3000/auth` 접속하여 소셜 로그인 테스트

### 5.2 Vercel 배포 테스트

1. Vercel에 배포 후 실제 도메인에서 테스트
2. 구글/카카오 로그인 버튼 클릭
3. 정상적으로 Vercel 도메인으로 리다이렉트되는지 확인

## 6. 문제 해결

### 6.1 여전히 localhost로 리다이렉트되는 경우

1. **브라우저 캐시 삭제**: Ctrl+Shift+R (하드 리프레시)
2. **Supabase 설정 확인**: Site URL이 올바른지 확인
3. **Google/Kakao 설정 확인**: Redirect URI가 올바른지 확인

### 6.2 "Invalid redirect URI" 오류

- Google Cloud Console과 Kakao Developers에서 Redirect URI 설정 재확인
- 정확한 URL이 입력되었는지 확인 (http vs https, 도메인명 등)

### 6.3 "Access denied" 오류

- OAuth consent screen 설정 확인
- 테스트 사용자 목록에 이메일 추가 (Google)
- 앱 상태가 "Testing" 또는 "Production"인지 확인

## 7. 현재 앱의 동적 리다이렉트

앱에서는 `window.location.origin`을 사용하여 현재 도메인을 자동으로 감지하고 적절한 리다이렉트 URL을 설정합니다:

- **로컬 개발**: `http://localhost:3000/`
- **Vercel 배포**: `https://your-app-name.vercel.app/`

이를 통해 환경에 관계없이 올바른 리다이렉트가 이루어집니다.
