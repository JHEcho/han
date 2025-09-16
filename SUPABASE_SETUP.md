# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase.com](https://supabase.com)에 가입/로그인
2. "New Project" 클릭
3. 프로젝트 이름 입력 (예: "korean-learning-app")
4. 데이터베이스 비밀번호 설정
5. 지역 선택 (가장 가까운 지역)
6. "Create new project" 클릭

## 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase URL과 API Key 찾기:

1. Supabase 대시보드에서 프로젝트 선택
2. 좌측 메뉴에서 "Settings" → "API" 클릭
3. "Project URL"과 "anon public" 키를 복사하여 `.env.local`에 붙여넣기

## 3. 데이터베이스 테이블 생성

Supabase 대시보드에서:

1. 좌측 메뉴에서 "SQL Editor" 클릭
2. "New query" 클릭
3. `supabase/migrations/001_create_tables.sql` 파일의 내용을 복사하여 붙여넣기
4. "Run" 버튼 클릭하여 테이블 생성

## 4. Row Level Security (RLS) 설정

테이블 생성 후 RLS가 자동으로 활성화됩니다. 필요에 따라 추가 정책을 설정할 수 있습니다.

## 5. 앱 실행

```bash
npm run dev
```

이제 앱이 Supabase 데이터베이스와 연동되어 실행됩니다!

## 문제 해결

### 데이터가 표시되지 않는 경우:
1. 환경 변수가 올바르게 설정되었는지 확인
2. Supabase 프로젝트가 활성화되어 있는지 확인
3. 브라우저 개발자 도구의 콘솔에서 오류 메시지 확인

### 인증 오류가 발생하는 경우:
1. API 키가 올바른지 확인
2. Supabase 프로젝트 URL이 올바른지 확인
3. 프로젝트가 일시정지되지 않았는지 확인
