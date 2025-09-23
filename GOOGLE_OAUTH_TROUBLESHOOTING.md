# 구글 OAuth 로그인 문제 해결 가이드

## 현재 구현된 개선사항

✅ **향상된 에러 로깅**
- AuthContext에 상세한 OAuth 에러 로깅 추가
- 구글 로그인 버튼에 구체적인 에러 메시지 제공
- 디버그 컴포넌트에 구글 로그인 테스트 기능 추가

✅ **OAuth 콜백 처리**
- URL 파라미터에서 토큰 추출 및 세션 복원
- 성공 시 환영 메시지 표시
- URL 정리 기능

## 문제 진단 단계

### 1. 브라우저 콘솔 확인
구글 로그인 버튼을 클릭한 후 브라우저 개발자 도구(F12)의 콘솔 탭에서 다음 로그들을 확인하세요:

```
AuthContext: Initiating Google OAuth...
Current origin: http://localhost:3000 (또는 배포 URL)
Redirect URL: http://localhost:3000/
Supabase client: [object]
Supabase auth: [object]
OAuth response data: [object]
```

### 2. 일반적인 오류와 해결방법

#### `redirect_uri_mismatch` 오류
- **원인**: Supabase 대시보드의 Site URL과 Google OAuth 설정의 리다이렉트 URI가 일치하지 않음
- **해결**: 
  1. Supabase 대시보드 → Authentication → URL Configuration
  2. Site URL을 현재 도메인으로 설정
  3. Google Cloud Console → OAuth 2.0 클라이언트 ID → 승인된 리디렉션 URI에 추가

#### `invalid_client` 오류
- **원인**: Google OAuth 클라이언트 ID가 잘못 설정됨
- **해결**: Supabase 대시보드에서 Google OAuth 설정 확인

#### `access_denied` 오류
- **원인**: 사용자가 Google 로그인을 취소함
- **해결**: 정상적인 동작, 재시도하면 됨

### 3. Supabase 설정 확인

1. **Supabase 대시보드 접속**
   - https://supabase.com/dashboard
   - 프로젝트 선택

2. **Authentication 설정 확인**
   - Authentication → Providers → Google
   - Enable sign in with Google: ✅
   - Client ID와 Client Secret이 올바르게 설정되어 있는지 확인

3. **URL Configuration 확인**
   - Authentication → URL Configuration
   - Site URL: `http://localhost:3000` (개발) 또는 배포 URL
   - Redirect URLs에 현재 도메인 추가

### 4. Google Cloud Console 설정 확인

1. **Google Cloud Console 접속**
   - https://console.cloud.google.com/
   - 프로젝트 선택

2. **OAuth 2.0 클라이언트 ID 확인**
   - APIs & Services → Credentials
   - OAuth 2.0 클라이언트 ID 클릭

3. **승인된 리디렉션 URI 확인**
   ```
   https://mhagshobzzmhejpfyact.supabase.co/auth/v1/callback
   http://localhost:3000/auth/callback (개발용)
   ```

### 5. 디버그 도구 사용

`/dev-tools` 페이지에서 다음 기능들을 사용하여 문제를 진단할 수 있습니다:

- **인증 상태 확인**: 현재 로그인 상태와 세션 정보 확인
- **구글 로그인 테스트**: 직접 구글 OAuth 호출 테스트
- **이메일 확인 없이 회원가입 테스트**: 기본 인증 기능 테스트

## 테스트 방법

1. **개발 환경에서 테스트**
   ```bash
   npm run dev
   ```
   - http://localhost:3000 접속
   - 로그인 페이지에서 구글 로그인 시도

2. **콘솔 로그 확인**
   - F12 → Console 탭
   - 구글 로그인 버튼 클릭
   - 에러 메시지나 로그 확인

3. **디버그 도구 사용**
   - http://localhost:3000/dev-tools 접속
   - "구글 로그인 테스트" 버튼 클릭
   - 결과 확인

## 추가 도움이 필요한 경우

문제가 지속되면 다음 정보를 제공해주세요:

1. 브라우저 콘솔의 에러 메시지
2. Supabase 대시보드의 OAuth 설정 스크린샷
3. Google Cloud Console의 OAuth 설정 스크린샷
4. 사용 중인 브라우저와 버전

## 현재 구현된 기능

- ✅ 구글 공식 이미지 사용
- ✅ 상세한 에러 로깅
- ✅ OAuth 콜백 처리
- ✅ 사용자 친화적 에러 메시지
- ✅ 디버그 도구
- ✅ 자동 URL 정리
- ✅ 환영 메시지 표시
