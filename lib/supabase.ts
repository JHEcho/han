import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-ref.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here'

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
