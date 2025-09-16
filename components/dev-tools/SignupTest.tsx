'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

export default function SignupTest() {
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('test123456')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp, user } = useAuth()

  const testSignup = async () => {
    setLoading(true)
    setResult('')
    
    try {
      console.log('Testing signup with:', { email, password })
      
      // Test signup
      const { error } = await signUp(email, password)
      
      if (error) {
        setResult(`❌ 회원가입 실패: ${error.message}`)
        console.error('Signup error:', error)
      } else {
        setResult(`✅ 회원가입 성공! 이메일 확인 필요: ${email}`)
        console.log('Signup success')
        
        // Check current user
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        console.log('Current user after signup:', currentUser)
      }
      
    } catch (err) {
      setResult(`❌ 오류: ${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error('Signup test error:', err)
    } finally {
      setLoading(false)
    }
  }

  const checkCurrentUser = async () => {
    try {
      const { data: { user: currentUser }, error } = await supabase.auth.getUser()
      
      if (error) {
        setResult(`❌ 사용자 확인 실패: ${error.message}`)
      } else if (currentUser) {
        setResult(`✅ 현재 사용자: ${currentUser.email} (확인됨: ${currentUser.email_confirmed_at ? 'Yes' : 'No'})`)
      } else {
        setResult('❌ 로그인된 사용자 없음')
      }
    } catch (err) {
      setResult(`❌ 오류: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  const testDirectSignup = async () => {
    setLoading(true)
    setResult('')
    
    try {
      console.log('Testing direct Supabase signup...')
      
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })
      
      if (error) {
        setResult(`❌ 직접 회원가입 실패: ${error.message}`)
        console.error('Direct signup error:', error)
      } else {
        setResult(`✅ 직접 회원가입 성공! 사용자: ${data.user?.email}`)
        console.log('Direct signup success:', data)
      }
      
    } catch (err) {
      setResult(`❌ 오류: ${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error('Direct signup test error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto mt-4">
      <h3 className="text-xl font-bold mb-4">회원가입 테스트</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="space-x-2 mb-4">
        <button
          onClick={testSignup}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '테스트 중...' : 'AuthContext로 회원가입'}
        </button>
        
        <button
          onClick={testDirectSignup}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? '테스트 중...' : '직접 Supabase 회원가입'}
        </button>
        
        <button
          onClick={checkCurrentUser}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          현재 사용자 확인
        </button>
      </div>
      
      {user && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <strong>AuthContext 사용자:</strong> {user.email} (확인됨: {user.email_confirmed_at ? 'Yes' : 'No'})
        </div>
      )}
      
      {result && (
        <div className="p-4 bg-gray-100 rounded text-sm">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  )
}
