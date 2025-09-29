'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
  signInWithGoogle: () => Promise<{ error: AuthError | null }>
  signInWithKakao: () => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Handle OAuth callback URL parameters
    const handleOAuthCallback = async () => {
      if (typeof window === 'undefined') return

      const urlParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = urlParams.get('access_token')
      const refreshToken = urlParams.get('refresh_token')
      const expiresAt = urlParams.get('expires_at')
      const tokenType = urlParams.get('token_type')

      if (accessToken && refreshToken) {
        console.log('OAuth callback detected, processing tokens...')
        
        try {
          // Set the session with the tokens from URL
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })

          if (error) {
            console.error('Error setting session from OAuth callback:', error)
          } else {
            console.log('Session set successfully from OAuth callback')
            // Clear the URL parameters after successful authentication
            window.history.replaceState({}, document.title, window.location.pathname)
          }
        } catch (error) {
          console.error('Exception during OAuth callback processing:', error)
        }
      }
    }

    // Process OAuth callback first
    handleOAuthCallback()

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    // 입력 검증
    if (!email || !password) {
      return { error: { message: 'Email and password are required', status: 400, name: 'ValidationError' } as any }
    }
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { error: { message: 'Invalid email format', status: 400, name: 'ValidationError' } as any }
    }
    
    // 비밀번호 강도 검증
    if (password.length < 6) {
      return { error: { message: 'Password must be at least 6 characters', status: 400, name: 'ValidationError' } as any }
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          emailRedirectTo: undefined, // 이메일 확인 비활성화
        }
      })
      return { error }
    } catch (err) {
      console.error('Sign up error:', err)
      return { error: { message: 'An unexpected error occurred', status: 500, name: 'SignUpError' } as any }
    }
  }

  const signIn = async (email: string, password: string) => {
    // 입력 검증
    if (!email || !password) {
      return { error: { message: 'Email and password are required', status: 400, name: 'ValidationError' } as any }
    }
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { error: { message: 'Invalid email format', status: 400, name: 'ValidationError' } as any }
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      })
      return { error }
    } catch (err) {
      console.error('Sign in error:', err)
      return { error: { message: 'An unexpected error occurred', status: 500, name: 'SignInError' } as any }
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const resetPassword = async (email: string) => {
    // 입력 검증
    if (!email) {
      return { error: { message: 'Email is required', status: 400, name: 'ValidationError' } as any }
    }
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { error: { message: 'Invalid email format', status: 400, name: 'ValidationError' } as any }
    }

    try {
      // 환경에 따른 리다이렉트 URL 설정
      const getRedirectUrl = () => {
        if (typeof window === 'undefined') return '/auth/reset-password'
        
        const origin = window.location.origin
        
        // Vercel 배포 환경인지 확인
        if (origin.includes('vercel.app') || origin.includes('your-domain.com')) {
          return origin + '/auth/reset-password'
        }
        
        // 로컬 개발 환경
        return origin + '/auth/reset-password'
      }
      
      const redirectUrl = getRedirectUrl()
      console.log('Password reset redirect URL:', redirectUrl)
      
      const { error } = await supabase.auth.resetPasswordForEmail(email.toLowerCase().trim(), {
        redirectTo: redirectUrl,
      })
      return { error }
    } catch (err) {
      console.error('Password reset error:', err)
      return { error: { message: 'An unexpected error occurred', status: 500, name: 'ResetPasswordError' } as any }
    }
  }

  const signInWithGoogle = async () => {
    console.log('AuthContext: Initiating Google OAuth...')
    
    try {
      // 환경에 따른 리다이렉트 URL 설정 및 검증
      const getRedirectUrl = () => {
        if (typeof window === 'undefined') return '/'
        
        const origin = window.location.origin
        console.log('Current origin:', origin)
        
        // 허용된 도메인만 사용
        const allowedDomains = ['localhost', 'vercel.app', 'learnhangul.govinfos.com']
        const isAllowedDomain = allowedDomains.some(domain => origin.includes(domain))
        
        if (!isAllowedDomain) {
          throw new Error('Unauthorized domain for OAuth redirect')
        }
        
        return origin + '/'
      }
      
      const redirectUrl = getRedirectUrl()
      console.log('Redirect URL:', redirectUrl)
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })
      
      if (error) {
        console.error('AuthContext: Google OAuth error:', error)
        return { error }
      } else {
        console.log('AuthContext: Google OAuth initiated successfully')
      }
      
      return { error }
    } catch (err) {
      console.error('AuthContext: Google OAuth exception:', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      return { 
        error: {
          message: errorMessage,
          status: 500,
          name: 'OAuthException'
        } as any
      }
    }
  }

  const signInWithKakao = async () => {
    console.log('AuthContext: Initiating Kakao OAuth...')
    
    try {
      // 환경에 따른 리다이렉트 URL 설정 및 검증
      const getRedirectUrl = () => {
        if (typeof window === 'undefined') return '/'
        
        const origin = window.location.origin
        console.log('Current origin:', origin)
        
        // 허용된 도메인만 사용
        const allowedDomains = ['localhost', 'vercel.app', 'learnhangul.govinfos.com']
        const isAllowedDomain = allowedDomains.some(domain => origin.includes(domain))
        
        if (!isAllowedDomain) {
          throw new Error('Unauthorized domain for OAuth redirect')
        }
        
        return origin + '/'
      }
      
      const redirectUrl = getRedirectUrl()
      console.log('Redirect URL:', redirectUrl)
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: redirectUrl,
        }
      })
      
      if (error) {
        console.error('AuthContext: Kakao OAuth error:', error)
      } else {
        console.log('AuthContext: Kakao OAuth initiated successfully')
      }
      
      return { error }
    } catch (err) {
      console.error('AuthContext: Kakao OAuth exception:', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      return { 
        error: {
          message: errorMessage,
          status: 500,
          name: 'OAuthException'
        } as any
      }
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    signInWithGoogle,
    signInWithKakao,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
