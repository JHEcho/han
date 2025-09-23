'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, LearningLevel, Lesson, UserLearningProgress } from '@/lib/supabase'
import { allLessons, getLessonsByLevel } from '@/lib/lessonData'

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
      // Use local lesson data instead of database
      const localLessons = levelId ? getLessonsByLevel(levelId) : allLessons
      
      // Convert to database format
      const formattedLessons: Lesson[] = localLessons.map(lesson => ({
        id: lesson.id,
        level_id: lesson.level_id,
        lesson_number: lesson.lesson_number,
        title: lesson.title,
        description: lesson.description,
        content_type: lesson.content_type,
        difficulty: lesson.difficulty,
        estimated_time: lesson.estimated_time,
        is_unlocked: true, // All lessons are unlocked for demo
        created_at: new Date().toISOString()
      }))
      
      setLessons(formattedLessons)
    } catch (err) {
      console.error('Error fetching lessons:', err)
      setError('Failed to fetch lessons')
    }
  }

  // Fetch user's learning progress
  const fetchUserProgress = useCallback(async () => {
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
  }, [user])

  // Initialize user progress for a level
  const initializeUserProgress = useCallback(async (levelId: number) => {
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
  }, [user, fetchUserProgress])

  // Complete a lesson
  const completeLesson = useCallback(async (lessonId: number, score: number = 100) => {
    if (!user) return

    try {
      // Get the lesson from local data to find its level
      const lesson = allLessons.find(l => l.id === lessonId)
      if (!lesson) {
        console.error('Lesson not found:', lessonId)
        return
      }

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

      // Find next lesson from local data
      const levelLessons = getLessonsByLevel(lesson.level_id)
      const nextLesson = levelLessons.find(l => l.lesson_number > lesson.lesson_number)

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
  }, [user, fetchUserProgress, initializeUserProgress])

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
  const isLessonCompleted = useCallback((lessonId: number) => {
    if (!userProgress || userProgress.length === 0) return false
    return userProgress.some(progress => 
      progress.completed_lessons && progress.completed_lessons.includes(lessonId)
    )
  }, [userProgress])

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

    if (user) {
      initializeData()
    } else {
      setLoading(false)
    }
  }, [user?.id]) // Only depend on user.id to avoid unnecessary re-renders

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
