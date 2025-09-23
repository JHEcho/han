import { createClient } from '@supabase/supabase-js'

// Supabase 설정 - 환경 변수가 없어도 기본값으로 작동
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mhagshobzzmhejpfyact.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oYWdzaG9ienptaGVqcGZ5YWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5ODY1ODEsImV4cCI6MjA3MzU2MjU4MX0.HaeZKJL4ADSqibrLosRC7TA1FVZGJYiHjTP_xLKUc1w'

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 개발 환경에서만 로그 출력
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase URL:', supabaseUrl)
  console.log('Supabase Key exists:', !!supabaseAnonKey)
}

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

export interface LearningLevel {
  id: number
  level_name: string
  level_order: number
  description: string
  color: string
  created_at: string
}

export interface Lesson {
  id: number
  level_id: number
  lesson_number: number
  title: string
  description: string
  content_type: 'hangeul' | 'vocabulary' | 'grammar' | 'conversation' | 'quiz'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimated_time: number
  is_unlocked: boolean
  created_at: string
}

export interface UserLearningProgress {
  id: number
  user_id: string
  level_id: number
  current_lesson_id: number | null
  completed_lessons: number[]
  total_score: number
  level_completed_at: string | null
  created_at: string
  updated_at: string
}

export interface LessonContent {
  id: number
  lesson_id: number
  content_type: 'text' | 'image' | 'audio' | 'video' | 'interactive'
  content_data: Record<string, any>
  order_index: number
  created_at: string
}
