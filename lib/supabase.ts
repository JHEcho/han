import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mhagshobzzmhejpfyact.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oYWdzaG9ienptaGVqcGZ5YWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5ODY1ODEsImV4cCI6MjA3MzU2MjU4MX0.HaeZKJL4ADSqibrLosRC7TA1FVZGJYiHjTP_xLKUc1w'

// 환경 변수가 없어도 기본값으로 작동하도록 설정
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Key exists:', !!supabaseAnonKey)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for Korean learning app
export interface Hangeul {
  id: number
  character: string
  pronunciation: string
  category: 'consonant' | 'vowel' | 'final'
  created_at: string
}

export interface Vocabulary {
  id: number
  korean: string
  english: string
  pronunciation: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  created_at: string
}

export interface Quiz {
  id: number
  question: string
  options: string[]
  correct_answer: string
  explanation: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  created_at: string
}

export interface UserProgress {
  id: number
  user_id: string
  category: string
  completed_lessons: number[]
  total_score: number
  last_updated: string
}
