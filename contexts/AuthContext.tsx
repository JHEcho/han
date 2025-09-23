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
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: undefined, // 이메일 확인 비활성화
      }
    })
    return { error }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const resetPassword = async (email: string) => {
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
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl,
    })
    return { error }
  }

  const signInWithGoogle = async () => {
    console.log('AuthContext: Initiating Google OAuth...')
    
    // 환경에 따른 리다이렉트 URL 설정
    const getRedirectUrl = () => {
      if (typeof window === 'undefined') return '/'
      
      const origin = window.location.origin
      console.log('Current origin:', origin)
      
      // Vercel 배포 환경인지 확인
      if (origin.includes('vercel.app') || origin.includes('your-domain.com')) {
        return origin + '/'
      }
      
      // 로컬 개발 환경
      return origin + '/'
    }
    
    const redirectUrl = getRedirectUrl()
    console.log('Redirect URL:', redirectUrl)
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      }
    })
    
    if (error) {
      console.error('AuthContext: Google OAuth error:', error)
    } else {
      console.log('AuthContext: Google OAuth initiated successfully')
    }
    
    return { error }
  }

  const signInWithKakao = async () => {
    console.log('AuthContext: Initiating Kakao OAuth...')
    
    // 환경에 따른 리다이렉트 URL 설정
    const getRedirectUrl = () => {
      if (typeof window === 'undefined') return '/'
      
      const origin = window.location.origin
      console.log('Current origin:', origin)
      
      // Vercel 배포 환경인지 확인
      if (origin.includes('vercel.app') || origin.includes('your-domain.com')) {
        return origin + '/'
      }
      
      // 로컬 개발 환경
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
