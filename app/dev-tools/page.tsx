'use client'

import { useState } from 'react'

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic'
import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'

// 개발 도구 컴포넌트들 import
import ConnectionTest from '@/components/dev-tools/ConnectionTest'
import NetworkTest from '@/components/dev-tools/NetworkTest'
import SignupTest from '@/components/dev-tools/SignupTest'
import LoginTest from '@/components/dev-tools/LoginTest'
import EmailTest from '@/components/dev-tools/EmailTest'
import SimpleSignupTest from '@/components/dev-tools/SimpleSignupTest'
import AuthDebug from '@/components/dev-tools/AuthDebug'
import GoogleOAuthTest from '@/components/dev-tools/GoogleOAuthTest'

export default function DevToolsPage() {
  const [activeTab, setActiveTab] = useState('connection')

  const tabs = [
    { id: 'connection', name: '연결 테스트', component: <ConnectionTest /> },
    { id: 'network', name: '네트워크 테스트', component: <NetworkTest /> },
    { id: 'signup', name: '회원가입 테스트', component: <SignupTest /> },
    { id: 'login', name: '로그인 테스트', component: <LoginTest /> },
    { id: 'email', name: '이메일 테스트', component: <EmailTest /> },
    { id: 'simple', name: '간단 테스트', component: <SimpleSignupTest /> },
    { id: 'debug', name: '인증 디버그', component: <AuthDebug /> },
    { id: 'google-oauth', name: '구글 OAuth 테스트', component: <GoogleOAuthTest /> },
  ]

  // 개발 환경에서만 접근 가능
  if (process.env.NODE_ENV !== 'development') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">접근 불가</h1>
            <p className="text-gray-600">개발 도구는 개발 환경에서만 사용할 수 있습니다.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">🔧 개발 도구</h1>
            <p className="text-gray-600">Supabase 연결 및 인증 시스템 테스트 도구</p>
          </div>

          {/* 탭 네비게이션 */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* 활성 탭 컨텐츠 */}
          <div className="bg-white rounded-lg shadow">
            {tabs.find(tab => tab.id === activeTab)?.component}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
