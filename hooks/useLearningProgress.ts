'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, LearningLevel, Lesson, UserLearningProgress } from '@/lib/supabase'

export function useLearningProgress() {
  const { user } = useAuth()
  const [levels, setLevels] = useState<LearningLevel[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [userProgress, setUserProgress] = useState<UserLearningProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all learning levels
  const fetchLevels = async () => {
    try {
      const { data, error } = await supabase
        .from('learning_levels')
        .select('*')
        .order('level_order')

      if (error) throw error
      setLevels(data || [])
    } catch (err) {
      console.error('Error fetching levels:', err)
      setError('Failed to fetch learning levels')
    }
  }

  // Fetch lessons for a specific level
  const fetchLessons = async (levelId?: number) => {
    try {
      let query = supabase
        .from('lessons')
        .select('*')
        .order('lesson_number')

      if (levelId) {
        query = query.eq('level_id', levelId)
      }

      const { data, error } = await query

      if (error) throw error
      setLessons(data || [])
    } catch (err) {
      console.error('Error fetching lessons:', err)
      setError('Failed to fetch lessons')
    }
  }

  // Fetch user's learning progress
  const fetchUserProgress = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('user_learning_progress')
        .select('*')
        .eq('user_id', user.id)

      if (error) throw error
      setUserProgress(data || [])
    } catch (err) {
      console.error('Error fetching user progress:', err)
      setError('Failed to fetch user progress')
    }
  }

  // Initialize user progress for a level
  const initializeUserProgress = async (levelId: number) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('user_learning_progress')
        .insert({
          user_id: user.id,
          level_id: levelId,
          current_lesson_id: null,
          completed_lessons: [],
          total_score: 0
        })

      if (error) throw error
      await fetchUserProgress()
    } catch (err) {
      console.error('Error initializing user progress:', err)
      setError('Failed to initialize user progress')
    }
  }

  // Complete a lesson
  const completeLesson = async (lessonId: number, score: number = 100) => {
    if (!user) return

    try {
      // Get the lesson to find its level
      const { data: lesson, error: lessonError } = await supabase
        .from('lessons')
        .select('level_id')
        .eq('id', lessonId)
        .single()

      if (lessonError) throw lessonError

      // Get or create user progress for this level
      let { data: progress, error: progressError } = await supabase
        .from('user_learning_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('level_id', lesson.level_id)
        .single()

      if (progressError && progressError.code === 'PGRST116') {
        // No progress found, create new one
        await initializeUserProgress(lesson.level_id)
        progress = {
          id: 0,
          user_id: user.id,
          level_id: lesson.level_id,
          current_lesson_id: null,
          completed_lessons: [],
          total_score: 0,
          level_completed_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      } else if (progressError) {
        throw progressError
      }

      // Update progress
      const updatedCompletedLessons = [...(progress?.completed_lessons || []), lessonId]
      const updatedTotalScore = (progress?.total_score || 0) + score

      // Find next lesson
      const { data: nextLesson } = await supabase
        .from('lessons')
        .select('id')
        .eq('level_id', lesson.level_id)
        .gt('lesson_number', lessonId)
        .order('lesson_number')
        .limit(1)
        .single()

      const { error: updateError } = await supabase
        .from('user_learning_progress')
        .update({
          completed_lessons: updatedCompletedLessons,
          total_score: updatedTotalScore,
          current_lesson_id: nextLesson?.id || null,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('level_id', lesson.level_id)

      if (updateError) throw updateError

      await fetchUserProgress()
    } catch (err) {
      console.error('Error completing lesson:', err)
      setError('Failed to complete lesson')
    }
  }

  // Get user's current level and lesson
  const getCurrentLevelAndLesson = () => {
    if (!user || userProgress.length === 0) {
      return { currentLevel: levels[0], currentLesson: null }
    }

    // Find the first level that's not completed
    const incompleteLevel = userProgress.find(progress => !progress.level_completed_at)
    if (!incompleteLevel) {
      return { currentLevel: levels[levels.length - 1], currentLesson: null }
    }

    const currentLevel = levels.find(level => level.id === incompleteLevel.level_id)
    const currentLesson = lessons.find(lesson => lesson.id === incompleteLevel.current_lesson_id)

    return { currentLevel, currentLesson }
  }

  // Get progress for a specific level
  const getLevelProgress = (levelId: number) => {
    return userProgress.find(progress => progress.level_id === levelId)
  }

  // Check if a lesson is completed
  const isLessonCompleted = (lessonId: number) => {
    return userProgress.some(progress => 
      progress.completed_lessons.includes(lessonId)
    )
  }

  // Get lessons for a specific level with progress info
  const getLessonsForLevel = (levelId: number) => {
    const levelLessons = lessons.filter(lesson => lesson.level_id === levelId)
    const progress = getLevelProgress(levelId)
    
    return levelLessons.map(lesson => ({
      ...lesson,
      isCompleted: isLessonCompleted(lesson.id),
      isUnlocked: lesson.is_unlocked || (progress && progress.completed_lessons.includes(lesson.id - 1))
    }))
  }

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true)
      await Promise.all([
        fetchLevels(),
        fetchLessons(),
        fetchUserProgress()
      ])
      setLoading(false)
    }

    initializeData()
  }, [user])

  return {
    levels,
    lessons,
    userProgress,
    loading,
    error,
    fetchLevels,
    fetchLessons,
    fetchUserProgress,
    completeLesson,
    getCurrentLevelAndLesson,
    getLevelProgress,
    isLessonCompleted,
    getLessonsForLevel,
    initializeUserProgress
  }
}
