'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

export default function AuthDebug() {
  const [debugInfo, setDebugInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, session } = useAuth()

  const checkAuthSettings = async () => {
    setLoading(true)
    setDebugInfo('')
    
    try {
      let info = '=== 인증 디버그 정보 ===\n\n'
      
      // 1. 현재 사용자 상태
      info += '1. AuthContext 사용자:\n'
      if (user) {
        info += `   - 이메일: ${user.email}\n`
        info += `   - ID: ${user.id}\n`
        info += `   - 이메일 확인됨: ${user.email_confirmed_at ? 'Yes' : 'No'}\n`
        info += `   - 생성일: ${user.created_at}\n`
        info += `   - 마지막 로그인: ${user.last_sign_in_at}\n`
      } else {
        info += '   - 로그인된 사용자 없음\n'
      }
      
      info += '\n2. 현재 세션:\n'
      if (session) {
        info += `   - 액세스 토큰: ${session.access_token ? '있음' : '없음'}\n`
        info += `   - 만료일: ${new Date(session.expires_at! * 1000).toLocaleString()}\n`
      } else {
        info += '   - 활성 세션 없음\n'
      }
      
      // 2. Supabase 직접 확인
      info += '\n3. Supabase 직접 확인:\n'
      const { data: { user: directUser }, error: userError } = await supabase.auth.getUser()
      if (userError) {
        info += `   - 오류: ${userError.message}\n`
      } else if (directUser) {
        info += `   - 직접 확인된 사용자: ${directUser.email}\n`
        info += `   - 이메일 확인됨: ${directUser.email_confirmed_at ? 'Yes' : 'No'}\n`
        info += `   - 사용자 ID: ${directUser.id}\n`
        info += `   - 생성일: ${directUser.created_at}\n`
      } else {
        info += '   - 직접 확인된 사용자 없음\n'
      }
      
      // 3. 세션 확인
      const { data: { session: directSession }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        info += `   - 세션 오류: ${sessionError.message}\n`
      } else if (directSession) {
        info += `   - 직접 확인된 세션: 있음\n`
      } else {
        info += '   - 직접 확인된 세션: 없음\n'
      }
      
      setDebugInfo(info)
      
    } catch (err) {
      setDebugInfo(`오류 발생: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const testSignupWithoutEmailConfirmation = async () => {
    setLoading(true)
    setDebugInfo('')
    
    try {
      const testEmail = `test${Date.now()}@example.com`
      const testPassword = 'test123456'
      
      console.log('Testing signup without email confirmation...')
      
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          emailRedirectTo: undefined, // 이메일 확인 비활성화
        }
      })
      
      if (error) {
        setDebugInfo(`❌ 회원가입 실패: ${error.message}`)
      } else {
        setDebugInfo(`✅ 회원가입 성공!\n사용자: ${data.user?.email}\n이메일 확인됨: ${data.user?.email_confirmed_at ? 'Yes' : 'No'}`)
      }
      
    } catch (err) {
      setDebugInfo(`❌ 오류: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const clearAuth = async () => {
    try {
      await supabase.auth.signOut()
      setDebugInfo('인증 정보가 초기화되었습니다.')
    } catch (err) {
      setDebugInfo(`초기화 오류: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const testGoogleLogin = async () => {
    setLoading(true)
    setDebugInfo('')
    
    try {
      console.log('Testing Google login...')
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })
      
      if (error) {
        setDebugInfo(`❌ 구글 로그인 실패: ${error.message}\n상태: ${error.status}\n이름: ${error.name}`)
      } else {
        setDebugInfo(`✅ 구글 로그인 시작됨!\nOAuth URL: ${data?.url || 'N/A'}`)
      }
      
    } catch (err) {
      setDebugInfo(`❌ 구글 로그인 예외: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuthSettings()
  }, [user, session])

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-4">
      <h3 className="text-xl font-bold mb-4">인증 디버그 정보</h3>
      
      <div className="space-x-2 mb-4">
        <button
          onClick={checkAuthSettings}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '확인 중...' : '인증 상태 확인'}
        </button>
        
        <button
          onClick={testSignupWithoutEmailConfirmation}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? '테스트 중...' : '이메일 확인 없이 회원가입 테스트'}
        </button>
        
        <button
          onClick={testGoogleLogin}
          disabled={loading}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? '테스트 중...' : '구글 로그인 테스트'}
        </button>
        
        <button
          onClick={clearAuth}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          인증 초기화
        </button>
      </div>
      
      {debugInfo && (
        <div className="p-4 bg-gray-100 rounded text-sm">
          <pre className="whitespace-pre-wrap">{debugInfo}</pre>
        </div>
      )}
    </div>
  )
}
