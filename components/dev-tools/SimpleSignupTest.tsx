'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SimpleSignupTest() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testBasicSignup = async () => {
    if (!email || !password) {
      setResult('❌ 이메일과 비밀번호를 입력해주세요.')
      return
    }

    setLoading(true)
    setResult('')
    
    try {
      console.log('=== 기본 회원가입 테스트 시작 ===')
      console.log('이메일:', email)
      console.log('비밀번호:', password)
      
      // 1. Supabase 클라이언트 확인
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      
      // 2. 기본 회원가입 시도
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      
      console.log('회원가입 결과:', { data, error })
      
      if (error) {
        setResult(`❌ 회원가입 실패:\n오류: ${error.message}\n코드: ${error.status || 'N/A'}`)
        console.error('회원가입 오류:', error)
      } else {
        setResult(`✅ 회원가입 성공!\n사용자: ${data.user?.email}\n이메일 확인됨: ${data.user?.email_confirmed_at ? 'Yes' : 'No'}\n세션: ${data.session ? '있음' : '없음'}`)
        console.log('회원가입 성공:', data)
      }
      
    } catch (err) {
      setResult(`❌ 예외 발생:\n${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error('회원가입 예외:', err)
    } finally {
      setLoading(false)
    }
  }

  const testSignupWithoutEmailConfirmation = async () => {
    if (!email || !password) {
      setResult('❌ 이메일과 비밀번호를 입력해주세요.')
      return
    }

    setLoading(true)
    setResult('')
    
    try {
      console.log('=== 이메일 확인 없이 회원가입 테스트 ===')
      
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: undefined,
        }
      })
      
      console.log('회원가입 결과 (이메일 확인 없음):', { data, error })
      
      if (error) {
        if (error.message.includes('already registered')) {
          setResult(`⚠️ 이미 등록된 사용자입니다!\n이메일: ${email}\n\n💡 해결 방법:\n1. "테스트 이메일 자동 생성" 버튼으로 새로운 이메일 생성\n2. 또는 "기존 사용자 로그인 테스트" 버튼으로 로그인 시도`)
        } else {
          setResult(`❌ 회원가입 실패 (이메일 확인 없음):\n오류: ${error.message}\n코드: ${error.status || 'N/A'}`)
        }
        console.error('회원가입 오류 (이메일 확인 없음):', error)
      } else {
        setResult(`✅ 회원가입 성공 (이메일 확인 없음)!\n사용자: ${data.user?.email}\n이메일 확인됨: ${data.user?.email_confirmed_at ? 'Yes' : 'No'}\n세션: ${data.session ? '있음' : '없음'}`)
        console.log('회원가입 성공 (이메일 확인 없음):', data)
      }
      
    } catch (err) {
      setResult(`❌ 예외 발생 (이메일 확인 없음):\n${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error('회원가입 예외 (이메일 확인 없음):', err)
    } finally {
      setLoading(false)
    }
  }

  const testLoginExistingUser = async () => {
    if (!email || !password) {
      setResult('❌ 이메일과 비밀번호를 입력해주세요.')
      return
    }

    setLoading(true)
    setResult('')
    
    try {
      console.log('=== 기존 사용자 로그인 테스트 ===')
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      
      console.log('로그인 결과:', { data, error })
      
      if (error) {
        setResult(`❌ 로그인 실패:\n오류: ${error.message}\n코드: ${error.status || 'N/A'}`)
        console.error('로그인 오류:', error)
      } else {
        setResult(`✅ 로그인 성공!\n사용자: ${data.user?.email}\n이메일 확인됨: ${data.user?.email_confirmed_at ? 'Yes' : 'No'}\n세션: ${data.session ? '있음' : '없음'}`)
        console.log('로그인 성공:', data)
      }
      
    } catch (err) {
      setResult(`❌ 로그인 예외:\n${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error('로그인 예외:', err)
    } finally {
      setLoading(false)
    }
  }

  const testConnection = async () => {
    setLoading(true)
    setResult('')
    
    try {
      console.log('=== Supabase 연결 테스트 ===')
      
      // 1. 기본 데이터베이스 연결 테스트
      const { data: hangeulData, error: hangeulError } = await supabase
        .from('hangeul')
        .select('*')
        .limit(1)
      
      if (hangeulError) {
        setResult(`❌ 데이터베이스 연결 실패:\n오류: ${hangeulError.message}\n코드: ${hangeulError.code || 'N/A'}`)
        console.error('데이터베이스 연결 오류:', hangeulError)
        return
      }
      
      // 2. 인증 서비스 연결 테스트
      const { data: authData, error: authError } = await supabase.auth.getSession()
      
      if (authError) {
        setResult(`✅ 데이터베이스 연결 성공!\n❌ 인증 서비스 연결 실패:\n오류: ${authError.message}`)
        console.error('인증 서비스 연결 오류:', authError)
      } else {
        setResult(`✅ Supabase 연결 성공!\n데이터베이스: 연결됨\n인증 서비스: 연결됨\n현재 세션: ${authData.session ? '있음' : '없음'}`)
        console.log('Supabase 연결 성공:', { hangeulData, authData })
      }
      
    } catch (err) {
      setResult(`❌ 연결 테스트 예외:\n${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error('연결 테스트 예외:', err)
    } finally {
      setLoading(false)
    }
  }

  const generateTestEmail = () => {
    const timestamp = Date.now()
    const randomNum = Math.floor(Math.random() * 10000)
    const randomString = Math.random().toString(36).substring(2, 8)
    const testEmail = `test${timestamp}${randomNum}${randomString}@example.com`
    setEmail(testEmail)
    setPassword('test123456')
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto mt-4">
      <h3 className="text-xl font-bold mb-4">간단한 회원가입 테스트</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="이메일 주소 입력"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호 입력 (최소 6자)"
          />
        </div>
        
        <button
          onClick={generateTestEmail}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          테스트 이메일 자동 생성
        </button>
      </div>
      
      <div className="space-y-2 mb-4">
        <button
          onClick={testConnection}
          disabled={loading}
          className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
        >
          {loading ? '테스트 중...' : '1. Supabase 연결 테스트'}
        </button>
        
        <button
          onClick={testBasicSignup}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '테스트 중...' : '2. 기본 회원가입 테스트'}
        </button>
        
        <button
          onClick={testSignupWithoutEmailConfirmation}
          disabled={loading}
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? '테스트 중...' : '3. 이메일 확인 없이 회원가입'}
        </button>
        
        <button
          onClick={testLoginExistingUser}
          disabled={loading}
          className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          {loading ? '테스트 중...' : '4. 기존 사용자 로그인 테스트'}
        </button>
      </div>
      
      <div className="p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded mb-4">
        <strong>📋 테스트 순서:</strong>
        <ol className="mt-2 text-sm space-y-1 list-decimal list-inside">
          <li>먼저 "Supabase 연결 테스트"를 실행하여 기본 연결을 확인하세요</li>
          <li>"테스트 이메일 자동 생성" 버튼으로 고유한 이메일을 생성하세요</li>
          <li>"기본 회원가입 테스트"를 실행하여 일반적인 회원가입을 테스트하세요</li>
          <li>문제가 있다면 "이메일 확인 없이 회원가입"을 시도해보세요</li>
          <li>"User already registered" 오류가 나면 "기존 사용자 로그인 테스트"를 시도하세요</li>
        </ol>
      </div>
      
      <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded mb-4">
        <strong>⚠️ "User already registered" 오류 해결법:</strong>
        <ul className="mt-2 text-sm space-y-1 list-disc list-inside">
          <li>이미 등록된 이메일 주소로 회원가입을 시도했을 때 발생합니다</li>
          <li>"테스트 이메일 자동 생성" 버튼으로 새로운 고유 이메일을 생성하세요</li>
          <li>또는 "기존 사용자 로그인 테스트"로 해당 계정에 로그인해보세요</li>
        </ul>
      </div>
      
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
        <strong>🔧 "Could not find table 'public.auth.users'" 오류 해결:</strong>
        <ul className="mt-2 text-sm space-y-1 list-disc list-inside">
          <li>auth.users는 Supabase의 내부 테이블이라 직접 쿼리할 수 없습니다</li>
          <li>사용자 확인은 supabase.auth.getUser() 또는 로그인 시도로만 가능합니다</li>
          <li>이제 수정되어 정상적으로 작동합니다</li>
        </ul>
      </div>
      
      {result && (
        <div className="p-4 bg-gray-100 rounded text-sm">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  )
}
