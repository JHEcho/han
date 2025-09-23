# 소셜 로그인 설정 가이드

이 문서는 Supabase에서 구글과 카카오 소셜 로그인을 설정하는 방법을 안내합니다.

## 1. 구글 OAuth 설정

### 1.1 Google Cloud Console 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. **APIs & Services** > **Credentials**로 이동
4. **Create Credentials** > **OAuth client ID** 선택
5. **Application type**: Web application 선택
6. **Authorized redirect URIs**에 다음 URL 추가:
   ```
   https://mhagshobzzmhejpfyact.supabase.co/auth/v1/callback
   ```
7. **Client ID**와 **Client Secret** 복사

### 1.2 Supabase 설정

1. [Supabase Dashboard](https://supabase.com/dashboard)에 접속
2. 프로젝트 선택
3. **Authentication** > **Providers**로 이동
4. **Google** 프로바이더 활성화
5. **Client ID**와 **Client Secret** 입력
6. **Save** 클릭

## 2. 카카오 OAuth 설정

### 2.1 Kakao Developers 설정

1. [Kakao Developers](https://developers.kakao.com/)에 접속
2. **내 애플리케이션** > **애플리케이션 추가하기** 클릭
3. 앱 이름, 사업자명 입력 후 생성
4. **앱 설정** > **플랫폼**에서 **Web 플랫폼 등록**
5. **사이트 도메인**에 다음 추가:
   ```
   https://mhagshobzzmhejpfyact.supabase.co
   ```
6. **제품 설정** > **카카오 로그인** 활성화
7. **Redirect URI**에 다음 추가:
   ```
   https://mhagshobzzmhejpfyact.supabase.co/auth/v1/callback
   ```
8. **앱 키**에서 **REST API 키** 복사

### 2.2 Supabase 설정

1. Supabase Dashboard에서 **Authentication** > **Providers**로 이동
2. **Kakao** 프로바이더 활성화
3. **Client ID**에 REST API 키 입력
4. **Client Secret**은 비워둠 (카카오는 secret이 필요 없음)
5. **Save** 클릭

## 3. 환경 변수 설정

### 3.1 로컬 개발 환경

`.env.local` 파일에 다음 추가:
```env
NEXT_PUBLIC_SUPABASE_URL=https://mhagshobzzmhejpfyact.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3.2 Vercel 배포 환경

Vercel Dashboard에서 환경 변수 설정:
1. 프로젝트 선택
2. **Settings** > **Environment Variables**
3. 다음 변수들 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4. 테스트 방법

### 4.1 로컬 테스트

1. 개발 서버 실행:
   ```bash
   npm run dev
   ```

2. 브라우저에서 `http://localhost:3000/auth` 접속

3. 구글/카카오 로그인 버튼 클릭하여 테스트

### 4.2 프로덕션 테스트

1. Vercel에 배포 후 실제 도메인에서 테스트

2. 소셜 로그인 버튼이 정상 작동하는지 확인

## 5. 문제 해결

### 5.1 일반적인 오류

- **"Invalid redirect URI"**: Redirect URI가 정확히 설정되었는지 확인
- **"Client ID not found"**: Client ID가 올바르게 입력되었는지 확인
- **"Access denied"**: 도메인이 승인된 도메인 목록에 있는지 확인

### 5.2 디버깅

1. 브라우저 개발자 도구의 Network 탭에서 요청 확인
2. Supabase Dashboard의 **Authentication** > **Users**에서 사용자 생성 확인
3. 콘솔 로그에서 오류 메시지 확인

## 6. 보안 고려사항

1. **Client Secret**은 절대 클라이언트 사이드에 노출하지 않음
2. **Redirect URI**는 정확한 도메인만 허용
3. **HTTPS** 사용 필수 (프로덕션 환경)
4. 정기적으로 OAuth 설정 검토

## 7. 추가 기능

### 7.1 사용자 정보 매핑

소셜 로그인 후 사용자 정보를 커스터마이징하려면:

```typescript
// AuthContext에서 사용자 정보 처리
const handleAuthStateChange = (event: string, session: Session | null) => {
  if (event === 'SIGNED_IN' && session?.user) {
    // 사용자 정보 처리 로직
    console.log('User signed in:', session.user)
  }
}
```

### 7.2 추가 프로바이더

다른 소셜 로그인 프로바이더 추가:
- GitHub
- Facebook
- Twitter
- Apple

각 프로바이더별로 동일한 방식으로 설정 가능합니다.
