'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home } from 'lucide-react'

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic'
import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'

type AuthMode = 'login' | 'signup' | 'forgot-password'

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const router = useRouter()

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      // If user is in a sub-mode (signup, forgot-password), go back to login
      if (mode !== 'login') {
        setMode('login')
      } else {
        // If user is in login mode, go back to previous page
        router.back()
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [mode, router])

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
  }

  const handleForgotPassword = () => {
    setMode('forgot-password')
  }

  const handleBackToLogin = () => {
    setMode('login')
  }

  const handleGoBack = () => {
    if (mode !== 'login') {
      setMode('login')
    } else {
      router.back()
    }
  }

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Navigation Header */}
      <div className="absolute top-4 left-4 flex space-x-2 z-10">
        <button
          onClick={handleGoBack}
          className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-700 hover:text-primary-600"
          title="Go back to previous page"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Back</span>
        </button>
        <button
          onClick={handleGoHome}
          className="flex items-center space-x-2 px-3 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-700 hover:text-primary-600"
          title="Go to home page"
        >
          <Home size={18} />
          <span className="hidden sm:inline">Home</span>
        </button>
      </div>

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
