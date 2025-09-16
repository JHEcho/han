'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function EmailTest() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const resendConfirmationEmail = async () => {
    if (!email) {
      setResult('❌ 이메일을 입력해주세요.')
      return
    }

    setLoading(true)
    setResult('')
    
    try {
      console.log('Resending confirmation email to:', email)
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })
      
      if (error) {
        setResult(`❌ 이메일 재전송 실패: ${error.message}`)
        console.error('Resend error:', error)
      } else {
        setResult(`✅ 확인 이메일이 재전송되었습니다: ${email}`)
        console.log('Email resent successfully')
      }
      
    } catch (err) {
      setResult(`❌ 오류: ${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error('Resend test error:', err)
    } finally {
      setLoading(false)
    }
  }

  const createTestAccount = async () => {
    setLoading(true)
    setResult('')
    
    try {
      const timestamp = Date.now()
      const testEmail = `test${timestamp}@example.com`
      const testPassword = 'test123456'
      
      console.log('Creating test account:', testEmail)
      
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          emailRedirectTo: undefined, // 이메일 확인 비활성화
        }
      })
      
      if (error) {
        setResult(`❌ 테스트 계정 생성 실패: ${error.message}`)
        console.error('Test account creation error:', error)
      } else {
        setResult(`✅ 테스트 계정 생성 성공!\n이메일: ${testEmail}\n비밀번호: ${testPassword}\n이메일 확인됨: ${data.user?.email_confirmed_at ? 'Yes' : 'No'}`)
        console.log('Test account created:', data)
      }
      
    } catch (err) {
      setResult(`❌ 오류: ${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error('Test account creation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const createUniqueTestAccount = async () => {
    setLoading(true)
    setResult('')
    
    try {
      const timestamp = Date.now()
      const randomNum = Math.floor(Math.random() * 1000)
      const testEmail = `test${timestamp}${randomNum}@example.com`
      const testPassword = 'test123456'
      
      console.log('Creating unique test account:', testEmail)
      
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          emailRedirectTo: undefined, // 이메일 확인 비활성화
        }
      })
      
      if (error) {
        setResult(`❌ 고유 테스트 계정 생성 실패: ${error.message}`)
        console.error('Unique test account creation error:', error)
      } else {
        setResult(`✅ 고유 테스트 계정 생성 성공!\n이메일: ${testEmail}\n비밀번호: ${testPassword}\n이메일 확인됨: ${data.user?.email_confirmed_at ? 'Yes' : 'No'}`)
        console.log('Unique test account created:', data)
      }
      
    } catch (err) {
      setResult(`❌ 오류: ${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error('Unique test account creation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const testLoginWithTestAccount = async () => {
    if (!email) {
      setResult('❌ 이메일을 입력해주세요.')
      return
    }

    setLoading(true)
    setResult('')
    
    try {
      console.log('Testing login with test account:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: 'test123456', // 기본 테스트 비밀번호
      })
      
      if (error) {
        setResult(`❌ 테스트 계정 로그인 실패: ${error.message}`)
        console.error('Test login error:', error)
      } else {
        setResult(`✅ 테스트 계정 로그인 성공!\n사용자: ${data.user?.email}`)
        console.log('Test login success:', data)
      }
      
    } catch (err) {
      setResult(`❌ 오류: ${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error('Test login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto mt-4">
      <h3 className="text-xl font-bold mb-4">이메일 테스트 도구</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일 주소</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="이메일 주소 입력"
          />
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button
            onClick={resendConfirmationEmail}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? '전송 중...' : '확인 이메일 재전송'}
          </button>
          
          <button
            onClick={testLoginWithTestAccount}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? '테스트 중...' : '테스트 계정 로그인'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button
            onClick={createTestAccount}
            disabled={loading}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            {loading ? '생성 중...' : '테스트 계정 생성'}
          </button>
          
          <button
            onClick={createUniqueTestAccount}
            disabled={loading}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? '생성 중...' : '고유 테스트 계정 생성'}
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded mb-4">
        <strong>💡 팁:</strong>
        <ul className="mt-2 text-sm space-y-1">
          <li>• Supabase는 같은 계정으로 이메일을 한 번만 보냅니다</li>
          <li>• 테스트하려면 새로운 이메일 주소를 사용하세요</li>
          <li>• "테스트 계정 생성" 버튼으로 자동으로 고유한 이메일을 만들 수 있습니다</li>
          <li>• 생성된 계정은 이메일 확인 없이 바로 로그인 가능합니다</li>
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
