# Vercel 배포 가이드

## 🚀 Vercel 배포 설정

### 1. Vercel 프로젝트 생성
1. [Vercel](https://vercel.com)에 로그인
2. "New Project" 클릭
3. GitHub 저장소 `JHEcho/han` 선택
4. "Import" 클릭

### 2. 환경 변수 설정
Vercel 대시보드에서 다음 환경 변수를 설정하세요:

#### **Environment Variables**
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: `https://mhagshobzzmhejpfyact.supabase.co`

- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oYWdzaG9ienptaGVqcGZ5YWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5ODY1ODEsImV4cCI6MjA3MzU2MjU4MX0.HaeZKJL4ADSqibrLosRC7TA1FVZGJYiHjTP_xLKUc1w`

### 3. 환경 변수 설정 방법
1. Vercel 프로젝트 대시보드에서 "Settings" 탭 클릭
2. "Environment Variables" 섹션으로 이동
3. 위의 두 환경 변수를 추가
4. "Save" 클릭

### 4. 배포
환경 변수 설정 후:
1. "Deployments" 탭으로 이동
2. "Redeploy" 버튼 클릭
3. 또는 새로운 커밋을 푸시하면 자동으로 재배포됩니다

## 🔧 문제 해결

### 환경 변수 오류
만약 "Missing Supabase environment variables" 오류가 발생하면:
1. Vercel 대시보드에서 환경 변수가 올바르게 설정되었는지 확인
2. 환경 변수 이름이 정확한지 확인 (대소문자 구분)
3. 프로젝트를 재배포

### 빌드 실패
빌드가 실패하는 경우:
1. Vercel 로그를 확인하여 구체적인 오류 메시지 확인
2. 로컬에서 `npm run build` 실행하여 오류 확인
3. 필요시 코드 수정 후 재커밋

## 📝 참고사항

- 환경 변수는 프로덕션, 프리뷰, 개발 환경에 각각 설정할 수 있습니다
- Supabase URL과 Anon Key는 공개되어도 안전합니다 (클라이언트 사이드에서 사용)
- 환경 변수 변경 후에는 반드시 재배포가 필요합니다

## 🌐 배포 완료 후

배포가 완료되면:
1. Vercel에서 제공하는 도메인으로 앱에 접속 가능
2. 커스텀 도메인 설정 가능
3. 자동 HTTPS 적용
4. CDN을 통한 빠른 로딩

---

**배포 완료 후 앱이 정상적으로 작동하는지 확인해보세요!** 🎉
