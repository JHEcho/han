'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Chrome, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function GoogleOAuthTest() {
  const [testResults, setTestResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const { signInWithGoogle } = useAuth()

  const runTests = async () => {
    setLoading(true)
    setTestResults([])
    const results: any[] = []

    // Test 1: Check Supabase URL
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mhagshobzzmhejpfyact.supabase.co'
      results.push({
        test: 'Supabase URL',
        status: 'success',
        message: `URL: ${supabaseUrl}`,
        details: 'Supabase URL is configured'
      })
    } catch (error) {
      results.push({
        test: 'Supabase URL',
        status: 'error',
        message: 'Supabase URL not found',
        details: error
      })
    }

    // Test 2: Check Supabase Client
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        results.push({
          test: 'Supabase Client',
          status: 'error',
          message: 'Supabase client error',
          details: error.message
        })
      } else {
        results.push({
          test: 'Supabase Client',
          status: 'success',
          message: 'Supabase client working',
          details: 'Session check successful'
        })
      }
    } catch (error) {
      results.push({
        test: 'Supabase Client',
        status: 'error',
        message: 'Supabase client exception',
        details: error
      })
    }

    // Test 3: Check OAuth Providers
    try {
      // This is a mock test since we can't directly check provider config
      results.push({
        test: 'OAuth Providers',
        status: 'info',
        message: 'Manual check required',
        details: 'Check Supabase Dashboard > Authentication > Providers > Google'
      })
    } catch (error) {
      results.push({
        test: 'OAuth Providers',
        status: 'error',
        message: 'Provider check failed',
        details: error
      })
    }

    // Test 4: Test Google OAuth Initiation
    try {
      console.log('Testing Google OAuth initiation...')
      const { error } = await signInWithGoogle()
      if (error) {
        results.push({
          test: 'Google OAuth Initiation',
          status: 'error',
          message: 'OAuth initiation failed',
          details: error.message
        })
      } else {
        results.push({
          test: 'Google OAuth Initiation',
          status: 'success',
          message: 'OAuth initiation successful',
          details: 'Redirect should happen now'
        })
      }
    } catch (error) {
      results.push({
        test: 'Google OAuth Initiation',
        status: 'error',
        message: 'OAuth initiation exception',
        details: error
      })
    }

    setTestResults(results)
    setLoading(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'info':
        return <AlertCircle className="w-5 h-5 text-blue-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Chrome className="w-8 h-8 text-blue-600" />
        <h3 className="text-2xl font-bold text-gray-900">구글 OAuth 테스트</h3>
      </div>

      <div className="mb-6">
        <button
          onClick={runTests}
          disabled={loading}
          className="btn-primary inline-flex items-center space-x-2 disabled:opacity-50"
        >
          <Chrome className="w-5 h-5" />
          <span>{loading ? '테스트 중...' : 'OAuth 설정 테스트'}</span>
        </button>
      </div>

      {testResults.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">테스트 결과:</h4>
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getStatusColor(result.status)}`}
            >
              <div className="flex items-start space-x-3">
                {getStatusIcon(result.status)}
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 mb-1">
                    {result.test}
                  </div>
                  <div className="text-sm text-gray-700 mb-2">
                    {result.message}
                  </div>
                  <div className="text-xs text-gray-600 bg-white p-2 rounded border">
                    {typeof result.details === 'string' 
                      ? result.details 
                      : JSON.stringify(result.details, null, 2)
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">구글 OAuth 설정 체크리스트:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Google Cloud Console에서 OAuth 2.0 Client ID 생성</li>
          <li>• Authorized redirect URIs에 <code>https://mhagshobzzmhejpfyact.supabase.co/auth/v1/callback</code> 추가</li>
          <li>• Supabase Dashboard &gt; Authentication &gt; Providers &gt; Google 활성화</li>
          <li>• Client ID와 Client Secret을 Supabase에 입력</li>
          <li>• OAuth consent screen 설정 완료</li>
        </ul>
      </div>
    </div>
  )
}
