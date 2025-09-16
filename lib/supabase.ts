import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key exists:', !!supabaseAnonKey)

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
