'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface UserProgress {
  id: number
  user_id: string
  category: string
  completed_lessons: number[]
  total_score: number
  last_updated: string
}

interface UserFavorite {
  id: number
  user_id: string
  vocabulary_id: number
  created_at: string
}

interface UserQuizAttempt {
  id: number
  user_id: string
  quiz_id: number
  score: number
  total_questions: number
  answers: any[]
  completed_at: string
}

export function useUserProgress() {
  const { user } = useAuth()
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [favorites, setFavorites] = useState<UserFavorite[]>([])
  const [quizAttempts, setQuizAttempts] = useState<UserQuizAttempt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserData()
    } else {
      setLoading(false)
    }
  }, [user])

  const fetchUserData = async () => {
    if (!user) return

    try {
      // Fetch user progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)

      // Fetch user favorites
      const { data: favoritesData } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', user.id)

      // Fetch user quiz attempts
      const { data: quizAttemptsData } = await supabase
        .from('user_quiz_attempts')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })

      setProgress(progressData || [])
      setFavorites(favoritesData || [])
      setQuizAttempts(quizAttemptsData || [])
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (category: string, lessonId: number, score: number = 0) => {
    if (!user) return

    try {
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('category', category)
        .single()

      if (existingProgress) {
        // Update existing progress
        const updatedLessons = [...existingProgress.completed_lessons]
        if (!updatedLessons.includes(lessonId)) {
          updatedLessons.push(lessonId)
        }

        const { data } = await supabase
          .from('user_progress')
          .update({
            completed_lessons: updatedLessons,
            total_score: existingProgress.total_score + score,
            last_updated: new Date().toISOString()
          })
          .eq('id', existingProgress.id)
          .select()
          .single()

        if (data) {
          setProgress(prev => prev.map(p => p.id === data.id ? data : p))
        }
      } else {
        // Create new progress
        const { data } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            category,
            completed_lessons: [lessonId],
            total_score: score
          })
          .select()
          .single()

        if (data) {
          setProgress(prev => [...prev, data])
        }
      }
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  const toggleFavorite = async (vocabularyId: number) => {
    if (!user) return

    try {
      const existingFavorite = favorites.find(f => f.vocabulary_id === vocabularyId)

      if (existingFavorite) {
        // Remove favorite
        await supabase
          .from('user_favorites')
          .delete()
          .eq('id', existingFavorite.id)

        setFavorites(prev => prev.filter(f => f.id !== existingFavorite.id))
      } else {
        // Add favorite
        const { data } = await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            vocabulary_id: vocabularyId
          })
          .select()
          .single()

        if (data) {
          setFavorites(prev => [...prev, data])
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const saveQuizAttempt = async (quizId: number, score: number, totalQuestions: number, answers: any[]) => {
    if (!user) return

    try {
      const { data } = await supabase
        .from('user_quiz_attempts')
        .insert({
          user_id: user.id,
          quiz_id: quizId,
          score,
          total_questions: totalQuestions,
          answers
        })
        .select()
        .single()

      if (data) {
        setQuizAttempts(prev => [data, ...prev])
      }
    } catch (error) {
      console.error('Error saving quiz attempt:', error)
    }
  }

  const getProgressByCategory = (category: string) => {
    return progress.find(p => p.category === category)
  }

  const isFavorite = (vocabularyId: number) => {
    return favorites.some(f => f.vocabulary_id === vocabularyId)
  }

  const getQuizHistory = () => {
    return quizAttempts
  }

  return {
    progress,
    favorites,
    quizAttempts,
    loading,
    updateProgress,
    toggleFavorite,
    saveQuizAttempt,
    getProgressByCategory,
    isFavorite,
    getQuizHistory,
    refresh: fetchUserData
  }
}
