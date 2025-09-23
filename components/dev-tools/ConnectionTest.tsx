'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ConnectionTest() {
  const [status, setStatus] = useState<'testing' | 'connected' | 'error'>('testing')
  const [error, setError] = useState('')
  const [userCount, setUserCount] = useState(0)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setStatus('testing')
      setError('')
      
      console.log('Testing Supabase connection...')
      console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      
      // First test: Check if API key is valid by making a simple request
      try {
        const { data: testData, error: testError } = await supabase
          .from('hangeul')
          .select('count')
          .limit(1)

        if (testError) {
          console.error('API Key test error:', testError)
          
          // Check for specific API key errors
          if (testError.message.includes('Invalid API key')) {
            setError(`API 키 오류: ${testError.message}\n\n해결 방법:\n1. Supabase 대시보드에서 새로운 API 키 확인\n2. .env.local 파일에 올바른 키 설정\n3. 개발 서버 재시작`)
          } else if (testError.message.includes('JWT')) {
            setError(`JWT 토큰 오류: ${testError.message}\n\nAPI 키가 만료되었거나 형식이 잘못되었습니다.`)
          } else {
            setError(`데이터베이스 오류: ${testError.message}`)
          }
          setStatus('error')
          return
        }

        console.log('API Key is valid!')
      } catch (apiErr) {
        console.error('API Key validation failed:', apiErr)
        setError(`API 키 검증 실패: ${apiErr instanceof Error ? apiErr.message : 'Unknown error'}`)
        setStatus('error')
        return
      }
      
      // Second test: Try to access hangeul table
      const { data, error } = await supabase
        .from('hangeul')
        .select('*')
        .limit(1)

      if (error) {
        console.error('Table access error:', error)
        setError(`테이블 접근 오류: ${error.message}\n\n테이블이 존재하지 않거나 권한이 없습니다.`)
        setStatus('error')
        return
      }

      console.log('Supabase connected successfully')
      setStatus('connected')
      
      // Try to get user count (this might fail due to RLS)
      try {
        const { data: authData, error: authError } = await supabase.auth.getSession()
        if (authError) {
          console.log('Auth check failed (expected):', authError.message)
        } else {
          console.log('Auth session:', authData.session ? 'Logged in' : 'Not logged in')
        }
      } catch (authErr) {
        console.log('Auth check error (expected):', authErr)
      }
      
    } catch (err) {
      console.error('Connection error:', err)
      setError(`연결 오류: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setStatus('error')
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Supabase 연결 테스트</h2>
      
      <div className="mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            status === 'testing' ? 'bg-yellow-500' :
            status === 'connected' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className="font-medium">
            {status === 'testing' && '연결 테스트 중...'}
            {status === 'connected' && '연결 성공!'}
            {status === 'error' && '연결 실패'}
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>오류:</strong> {error}
        </div>
      )}

      {status === 'connected' && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <strong>성공:</strong> Supabase에 연결되었습니다!
          <br />
          <strong>등록된 사용자:</strong> {userCount}명
        </div>
      )}

      <button
        onClick={testConnection}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        다시 테스트
      </button>
    </div>
  )
}
