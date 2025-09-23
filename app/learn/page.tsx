'use client'

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useLearningProgress } from '@/hooks/useLearningProgress'
import Link from 'next/link'
import { BookOpen, Brain, Target, Trophy, Clock, CheckCircle, Lock, Play, ArrowRight, Star, Users } from 'lucide-react'

export default function LearnPage() {
  const searchParams = useSearchParams()
  const initialLevel = searchParams.get('level') || 'basic'
  
  const { 
    levels, 
    lessons, 
    userProgress, 
    loading, 
    getLessonsForLevel,
    isLessonCompleted 
  } = useLearningProgress()

  const [activeTab, setActiveTab] = useState(initialLevel)

  // Tab configuration
  const tabs = [
    { id: 'basic', name: '기초', level: 6, color: 'bg-blue-500', description: '한글 기초 학습' },
    { id: 'beginner', name: '초급', level: 1, color: 'bg-green-500', description: '기본 어휘와 문장' },
    { id: 'intermediate', name: '중급', level: 2, color: 'bg-yellow-500', description: '문법과 일상 대화' },
    { id: 'advanced', name: '고급', level: 3, color: 'bg-red-500', description: '고급 문법과 표현' }
  ]

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

  const getLevelProgress = (levelId: number) => {
    const progress = userProgress.find(p => p.level_id === levelId)
    const levelLessons = lessons.filter(l => l.level_id === levelId)
    const completedCount = progress?.completed_lessons.length || 0
    const totalCount = levelLessons.length
    return { completedCount, totalCount, percentage: totalCount > 0 ? (completedCount / totalCount) * 100 : 0 }
  }

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

  const currentTab = tabs.find(tab => tab.id === activeTab)
  const currentLevel = levels.find(level => level.id === currentTab?.level)
  const levelLessons = currentLevel ? getLessonsForLevel(currentLevel.id) : []
  const progress = currentLevel ? getLevelProgress(currentLevel.id) : { completedCount: 0, totalCount: 0, percentage: 0 }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              단계별 학습
            </h1>
            <p className="text-xl text-gray-600">
              체계적인 단계별 학습으로 한국어를 마스터하세요
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-0 px-6 py-4 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? `${tab.color} text-white shadow-lg transform scale-105`
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg">{tab.name}</span>
                    {tab.level > 0 && (
                      <span className="text-sm opacity-75">({tab.level})</span>
                    )}
                  </div>
                  <div className="text-sm opacity-75 mt-1">
                    {tab.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Level Info */}
          {currentLevel && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: currentLevel.color }}
                  >
                    {currentTab?.name}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {currentLevel.level_name}
                    </h2>
                    <p className="text-gray-600">{currentLevel.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    {progress.completedCount}/{progress.totalCount}
                  </div>
                  <div className="text-gray-600">완료된 레슨</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">진도율</span>
                  <span className="font-semibold">{Math.round(progress.percentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="rounded-full h-3 transition-all duration-500"
                    style={{ 
                      width: `${progress.percentage}%`,
                      backgroundColor: currentLevel.color 
                    }}
                  ></div>
                </div>
              </div>

              {/* Level Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{progress.totalCount}</div>
                  <div className="text-sm text-gray-600">총 레슨</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{progress.completedCount}</div>
                  <div className="text-sm text-gray-600">완료된 레슨</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{progress.totalCount - progress.completedCount}</div>
                  <div className="text-sm text-gray-600">남은 레슨</div>
                </div>
              </div>
            </div>
          )}

          {/* Lessons Grid */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {currentTab?.name} 레슨 목록
            </h3>
            
            {levelLessons.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-600 mb-2">
                  레슨이 없습니다
                </h4>
                <p className="text-gray-500">
                  이 단계의 레슨이 아직 준비되지 않았습니다.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {levelLessons.map((lesson) => {
                  const Icon = getContentTypeIcon(lesson.content_type)
                  const isCompleted = lesson.isCompleted
                  const isUnlocked = lesson.isUnlocked
                  
                  return (
                    <div
                      key={lesson.id}
                      className={`relative p-6 rounded-xl border-2 transition-all duration-200 ${
                        isCompleted 
                          ? 'border-green-200 bg-green-50' 
                          : isUnlocked 
                            ? 'border-primary-200 bg-white hover:border-primary-300 hover:shadow-lg cursor-pointer transform hover:-translate-y-1' 
                            : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                      }`}
                    >
                      {/* Lesson Status Icon */}
                      <div className="absolute top-4 right-4">
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : !isUnlocked ? (
                          <Lock className="w-6 h-6 text-gray-400" />
                        ) : (
                          <Play className="w-6 h-6 text-primary-600" />
                        )}
                      </div>

                      {/* Content Type Icon */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-3 rounded-xl ${
                          isCompleted ? 'bg-green-100' : 'bg-primary-100'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            isCompleted ? 'text-green-600' : 'text-primary-600'
                          }`} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            레슨 {lesson.lesson_number}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">
                            {lesson.content_type}
                          </div>
                        </div>
                      </div>

                      {/* Lesson Title */}
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">
                        {lesson.title}
                      </h4>

                      {/* Lesson Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {lesson.description}
                      </p>

                      {/* Lesson Meta */}
                      <div className="flex items-center justify-between mb-4">
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
                        <Link
                          href={`/lessons/${lesson.id}`}
                          className={`w-full inline-flex items-center justify-center px-4 py-3 rounded-lg font-semibold transition-colors ${
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
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Navigation Help */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Star className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  학습 팁
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 레슨은 순서대로 완료하는 것을 권장합니다</li>
                  <li>• 각 레슨을 완료하면 다음 레슨이 자동으로 잠금 해제됩니다</li>
                  <li>• 퀴즈 레슨에서 높은 점수를 받으면 추가 점수를 획득할 수 있습니다</li>
                  <li>• 궁금한 점이 있으면 언제든지 이전 레슨을 다시 학습할 수 있습니다</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
