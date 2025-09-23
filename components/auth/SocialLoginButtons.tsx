'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'

interface SocialLoginButtonsProps {
  mode: 'login' | 'signup'
}

export default function SocialLoginButtons({ mode }: SocialLoginButtonsProps) {
  const [loading, setLoading] = useState<'google' | 'kakao' | null>(null)
  const { signInWithGoogle, signInWithKakao } = useAuth()

  const handleGoogleLogin = async () => {
    setLoading('google')
    try {
      console.log('Starting Google login...')
      const { error } = await signInWithGoogle()
      if (error) {
        console.error('Google login error:', error)
        console.error('Error details:', {
          message: error.message,
          status: error.status,
          name: error.name
        })
        
        // 더 자세한 에러 메시지 제공
        let errorMessage = error.message
        if (error.message.includes('redirect_uri_mismatch')) {
          errorMessage = '리다이렉트 URI가 일치하지 않습니다. Supabase 설정을 확인해주세요.'
        } else if (error.message.includes('invalid_client')) {
          errorMessage = 'Google OAuth 클라이언트 설정이 잘못되었습니다.'
        } else if (error.message.includes('access_denied')) {
          errorMessage = 'Google 로그인이 취소되었습니다.'
        }
        
        alert(`구글 로그인에 실패했습니다: ${errorMessage}`)
      } else {
        console.log('Google login initiated successfully')
        // OAuth는 리다이렉트되므로 여기서는 성공 메시지를 표시하지 않음
      }
    } catch (error) {
      console.error('Google login exception:', error)
      alert('구글 로그인 중 오류가 발생했습니다: ' + (error as Error).message)
    } finally {
      setLoading(null)
    }
  }

  const handleKakaoLogin = async () => {
    setLoading('kakao')
    try {
      const { error } = await signInWithKakao()
      if (error) {
        console.error('Kakao login error:', error.message)
        alert('카카오 로그인에 실패했습니다: ' + error.message)
      }
    } catch (error) {
      console.error('Kakao login error:', error)
      alert('카카오 로그인 중 오류가 발생했습니다.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">또는</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading !== null}
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading === 'google' ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-primary-600 rounded-full animate-spin" />
          ) : (
            <Image
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          )}
          <span className="ml-3 font-medium">
            {loading === 'google' ? '로그인 중...' : 'Google로 계속하기'}
          </span>
        </button>

        {/* Kakao Login */}
        <button
          onClick={handleKakaoLogin}
          disabled={loading !== null}
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-yellow-400 text-gray-800 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading === 'kakao' ? (
            <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin" />
          ) : (
            <MessageCircle className="w-5 h-5 text-gray-800" />
          )}
          <span className="ml-3 font-medium">
            {loading === 'kakao' ? '로그인 중...' : '카카오로 계속하기'}
          </span>
        </button>
      </div>

      {/* Info Text */}
      <div className="text-center">
        <p className="text-xs text-gray-500">
          {mode === 'login' 
            ? '소셜 로그인으로 빠르게 시작하세요' 
            : '소셜 계정으로 간편하게 가입하세요'
          }
        </p>
      </div>
    </div>
  )
}
