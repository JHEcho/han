'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function LoginTest() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, user } = useAuth()
  const router = useRouter()

  const testLogin = async () => {
    if (!email || !password) {
      setResult('❌ 이메일과 비밀번호를 입력해주세요.')
      return
    }

    setLoading(true)
    setResult('')
    
    try {
      console.log('Testing login with:', { email })
      
      const { error } = await signIn(email, password)
      
      if (error) {
        setResult(`❌ 로그인 실패: ${error.message}`)
        console.error('Login error:', error)
      } else {
        setResult(`✅ 로그인 성공! 메인 페이지로 이동합니다...`)
        console.log('Login success')
        
        // 수동으로 리다이렉트
        setTimeout(() => {
          router.push('/')
        }, 1000)
      }
      
    } catch (err) {
      setResult(`❌ 오류: ${err instanceof Error ? err.message : 'Unknown error'}`)
      console.error('Login test error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">로그인 테스트</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="로그인할 이메일 입력"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호 입력"
          />
        </div>
      </div>
      
      <button
        onClick={testLogin}
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? '로그인 중...' : '로그인 테스트'}
      </button>
      
      {user && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <strong>현재 로그인된 사용자:</strong> {user.email}
        </div>
      )}
      
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  )
}
