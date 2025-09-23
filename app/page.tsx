'use client'

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic'

import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useLearningProgress } from '@/hooks/useLearningProgress'
import Link from 'next/link'
import { BookOpen, Brain, Trophy, Users, Star, ArrowRight, Clock, CheckCircle, Lock, Play, Target, Award } from 'lucide-react'

export default function Home() {
  const { 
    levels, 
    lessons, 
    userProgress, 
    loading, 
    getCurrentLevelAndLesson, 
    getLessonsForLevel,
    isLessonCompleted 
  } = useLearningProgress()

  const { currentLevel, currentLesson } = getCurrentLevelAndLesson()

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen">
          <Navigation />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">학습 데이터를 불러오는 중...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  const getLevelProgress = (levelId: number) => {
    const progress = userProgress.find(p => p.level_id === levelId)
    const levelLessons = lessons.filter(l => l.level_id === levelId)
    const completedCount = progress?.completed_lessons.length || 0
    const totalCount = levelLessons.length
    return { completedCount, totalCount, percentage: totalCount > 0 ? (completedCount / totalCount) * 100 : 0 }
  }

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType) {
      case 'hangeul': return BookOpen
      case 'vocabulary': return Brain
      case 'grammar': return Target
      case 'conversation': return Users
      case 'quiz': return Trophy
      default: return BookOpen
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              한국어 학습 대시보드
            </h1>
            <p className="text-xl text-gray-600">
              체계적인 단계별 학습으로 한국어를 마스터해보세요
            </p>
          </div>

          {/* Current Progress Overview */}
          {currentLevel && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">현재 학습 단계</h2>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: currentLevel.color }}
                  ></div>
                  <span className="font-medium text-gray-700">{currentLevel.level_name}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{currentLevel.description}</p>
              
              {currentLesson && (
                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-primary-900">다음 학습</h3>
                      <p className="text-primary-700">{currentLesson.title}</p>
                    </div>
                    <Link
                      href={`/lessons/${currentLesson.id}`}
                      className="btn-primary inline-flex items-center space-x-2"
                    >
                      <Play size={16} />
                      <span>시작하기</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Learning Levels */}
          <div className="grid gap-6">
            {levels.map((level) => {
              const progress = getLevelProgress(level.id)
              const levelLessons = getLessonsForLevel(level.id)
              
              return (
                <div key={level.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Level Header */}
                  <div 
                    className="p-6 text-white"
                    style={{ backgroundColor: level.color }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{level.level_name}</h3>
                        <p className="text-white/90">{level.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{progress.completedCount}/{progress.totalCount}</div>
                        <div className="text-white/80">완료된 레슨</div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>진도율</span>
                        <span>{Math.round(progress.percentage)}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-white rounded-full h-2 transition-all duration-300"
                          style={{ width: `${progress.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Lessons Grid */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {levelLessons.map((lesson) => {
                        const Icon = getContentTypeIcon(lesson.content_type)
                        const isCompleted = lesson.isCompleted
                        const isUnlocked = lesson.isUnlocked
                        
                        return (
                          <div
                            key={lesson.id}
                            className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                              isCompleted 
                                ? 'border-green-200 bg-green-50' 
                                : isUnlocked 
                                  ? 'border-primary-200 bg-white hover:border-primary-300 hover:shadow-md cursor-pointer' 
                                  : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                            }`}
                          >
                            {/* Lesson Status Icon */}
                            <div className="absolute top-3 right-3">
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : !isUnlocked ? (
                                <Lock className="w-5 h-5 text-gray-400" />
                              ) : (
                                <Play className="w-5 h-5 text-primary-600" />
                              )}
                            </div>

                            {/* Content Type Icon */}
                            <div className="flex items-center space-x-3 mb-3">
                              <div className={`p-2 rounded-lg ${
                                isCompleted ? 'bg-green-100' : 'bg-primary-100'
                              }`}>
                                <Icon className={`w-5 h-5 ${
                                  isCompleted ? 'text-green-600' : 'text-primary-600'
                                }`} />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  레슨 {lesson.lesson_number}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {lesson.content_type}
                                </div>
                              </div>
                            </div>

                            {/* Lesson Title */}
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {lesson.title}
                            </h4>

                            {/* Lesson Description */}
                            <p className="text-sm text-gray-600 mb-3">
                              {lesson.description}
                            </p>

                            {/* Lesson Meta */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {lesson.estimated_time}분
                                </span>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                                {lesson.difficulty}
                              </span>
                            </div>

                            {/* Action Button */}
                            {isUnlocked && (
                              <div className="mt-3">
                                <Link
                                  href={`/lessons/${lesson.id}`}
                                  className={`w-full inline-flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isCompleted
                                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                      : 'bg-primary-600 text-white hover:bg-primary-700'
                                  }`}
                                >
                                  {isCompleted ? (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      완료됨
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-4 h-4 mr-2" />
                                      시작하기
                                    </>
                                  )}
                                </Link>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Access Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">빠른 접근</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/hangeul"
                className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200"
              >
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">한글 연습</h3>
                  <p className="text-sm text-gray-600">자음과 모음 연습</p>
                </div>
              </Link>

              <Link
                href="/vocabulary"
                className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200"
              >
                <div className="p-3 bg-green-100 rounded-lg">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">어휘 학습</h3>
                  <p className="text-sm text-gray-600">단어와 표현 학습</p>
                </div>
              </Link>

              <Link
                href="/quiz"
                className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200"
              >
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">퀴즈 도전</h3>
                  <p className="text-sm text-gray-600">실력 테스트</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}