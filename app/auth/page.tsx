'use client'

import { useState } from 'react'

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic'
import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

type AuthMode = 'login' | 'signup' | 'forgot-password'

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
  }

  const handleForgotPassword = () => {
    setMode('forgot-password')
  }

  const handleBackToLogin = () => {
    setMode('login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {mode === 'login' && (
            <LoginForm 
              onToggleMode={handleToggleMode}
              onForgotPassword={handleForgotPassword}
            />
          )}
          {mode === 'signup' && (
            <SignupForm onToggleMode={handleToggleMode} />
          )}
          {mode === 'forgot-password' && (
            <ForgotPasswordForm onBack={handleBackToLogin} />
          )}
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-korean-red to-korean-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">한</span>
            </div>
            <span className="text-xl font-bold text-gray-700">Korean Learning Hub</span>
          </div>
          <p className="text-sm text-gray-500">
            Master Korean with our interactive learning platform
          </p>
        </div>
      </div>
    </div>
  )
}
