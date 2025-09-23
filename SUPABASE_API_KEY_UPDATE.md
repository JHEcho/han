# Supabase API 키 업데이트 가이드

## 현재 상황
- "Invalid API key" 오류가 발생하고 있습니다
- 하드코딩된 API 키가 만료되었거나 유효하지 않을 수 있습니다

## 해결 방법

### 1. Supabase 대시보드에서 새로운 API 키 확인

1. [Supabase 대시보드](https://supabase.com/dashboard)에 로그인
2. 프로젝트 선택 (mhagshobzzmhejpfyact)
3. 좌측 메뉴에서 **Settings** → **API** 클릭
4. **Project URL**과 **anon public** 키를 복사

### 2. 환경 변수 파일 생성

프로젝트 루트에 `.env.local` 파일을 수동으로 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
```

### 3. lib/supabase.ts 파일 업데이트

환경 변수를 우선적으로 사용하도록 설정이 이미 되어 있습니다:

```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'fallback_url'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'fallback_key'
```

### 4. 개발 서버 재시작

환경 변수 파일을 생성한 후:

```bash
npm run dev
```

### 5. API 키 테스트

브라우저 개발자 도구 콘솔에서 다음을 실행하여 API 키가 유효한지 확인:

```javascript
// 브라우저 콘솔에서 실행
fetch('https://your-supabase-url.supabase.co/rest/v1/', {
  headers: {
    'apikey': 'your-anon-key',
    'Authorization': 'Bearer your-anon-key'
  }
})
.then(response => response.json())
.then(data => console.log('API Key valid:', data))
.catch(error => console.error('API Key invalid:', error))
```

## 보안 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 마세요
- API 키를 코드에 하드코딩하지 마세요
- 프로덕션 환경에서는 환경 변수를 사용하세요

## 문제가 지속되는 경우

1. Supabase 프로젝트가 일시정지되지 않았는지 확인
2. 프로젝트 URL이 올바른지 확인
3. API 키가 올바르게 복사되었는지 확인
4. 브라우저 캐시를 지우고 다시 시도

## 현재 하드코딩된 값 (참고용)

- URL: `https://mhagshobzzmhejpfyact.supabase.co`
- Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oYWdzaG9ienptaGVqcGZ5YWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5ODY1ODEsImV4cCI6MjA3MzU2MjU4MX0.HaeZKJL4ADSqibrLosRC7TA1FVZGJYiHjTP_xLKUc1w`

이 값들이 만료되었을 가능성이 높습니다. Supabase 대시보드에서 새로운 값을 확인하세요.
