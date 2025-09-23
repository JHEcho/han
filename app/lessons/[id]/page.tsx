'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { getLessonById } from '@/lib/lessonData'
import { ArrowLeft, Play, Pause, Volume2, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = parseInt(params.id as string)
  
  const [lesson, setLesson] = useState<any>(null)
  const [currentContentIndex, setCurrentContentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const lessonData = getLessonById(lessonId)
    if (lessonData) {
      setLesson(lessonData)
    } else {
      router.push('/learn')
    }
  }, [lessonId, router])

  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ko-KR'
      utterance.rate = 0.7
      utterance.pitch = 1.0
      
      utterance.onstart = () => setIsPlaying(true)
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)
      
      speechSynthesis.speak(utterance)
    } else {
      console.log('Speech synthesis not supported')
    }
  }

  const handleNext = () => {
    if (currentContentIndex < lesson.content.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1)
    } else {
      // Lesson completed
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1)
    }
  }

  const handleCompleteLesson = () => {
    // In a real app, you would save progress to database
    console.log('Lesson completed:', lessonId)
    router.push('/learn')
  }

  if (!lesson) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen">
          <Navigation />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading lesson...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  const currentContent = lesson.content[currentContentIndex]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Link
                href="/learn"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Lessons</span>
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {lesson.title}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    {lesson.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Lesson {lesson.lesson_number}</span>
                    <span>•</span>
                    <span>{lesson.estimated_time} min</span>
                    <span>•</span>
                    <span className="capitalize">{lesson.difficulty}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Progress</div>
                  <div className="text-2xl font-bold text-primary-600">
                    {currentContentIndex + 1}/{lesson.content.length}
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentContentIndex + 1) / lesson.content.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            {currentContent && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentContent.data.title}
                </h2>
                
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-6 text-lg">
                    {currentContent.data.text}
                  </p>

                  {/* Vocabulary Section */}
                  {currentContent.data.vocabulary && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Vocabulary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentContent.data.vocabulary.map((item: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-lg font-semibold text-gray-900">{item.korean}</h4>
                              <button
                                onClick={() => handlePlayAudio(item.korean)}
                                className="p-2 text-primary-600 hover:bg-primary-100 rounded-full transition-colors"
                                title="Listen to pronunciation"
                              >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                              </button>
                            </div>
                            <p className="text-gray-600 italic mb-1">{item.romanization}</p>
                            <p className="text-gray-800">{item.english}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grammar Section */}
                  {currentContent.data.grammar && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Grammar</h3>
                      {currentContent.data.grammar.pattern && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Pattern:</h4>
                          <p className="text-blue-800">{currentContent.data.grammar.pattern}</p>
                        </div>
                      )}
                      
                      {currentContent.data.grammar.examples && (
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-900">Examples:</h4>
                          {currentContent.data.grammar.examples.map((example: any, index: number) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-lg font-medium text-gray-900">{example.korean}</p>
                                <button
                                  onClick={() => handlePlayAudio(example.korean)}
                                  className="p-2 text-primary-600 hover:bg-primary-100 rounded-full transition-colors"
                                  title="Listen to pronunciation"
                                >
                                  {isPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                </button>
                              </div>
                              <p className="text-gray-600 italic mb-1">{example.romanization}</p>
                              <p className="text-gray-800">{example.english}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {currentContent.data.grammar.patterns && (
                        <div className="space-y-4">
                          {currentContent.data.grammar.patterns.map((pattern: any, index: number) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">{pattern.name}</h4>
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-lg font-medium text-gray-900">{pattern.example}</p>
                                <button
                                  onClick={() => handlePlayAudio(pattern.example)}
                                  className="p-2 text-primary-600 hover:bg-primary-100 rounded-full transition-colors"
                                  title="Listen to pronunciation"
                                >
                                  {isPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                </button>
                              </div>
                              <p className="text-gray-600 italic mb-1">{pattern.romanization}</p>
                              <p className="text-gray-800">{pattern.english}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Conversation Section */}
                  {currentContent.data.conversation && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Conversation</h3>
                      <div className="space-y-3">
                        {currentContent.data.conversation.map((line: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-primary-600">{line.speaker}:</span>
                              <button
                                onClick={() => handlePlayAudio(line.korean)}
                                className="p-1 text-primary-600 hover:bg-primary-100 rounded-full transition-colors"
                                title="Listen to pronunciation"
                              >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                              </button>
                            </div>
                            <p className="text-lg font-medium text-gray-900 mb-1">{line.korean}</p>
                            <p className="text-gray-600 italic mb-1">{line.romanization}</p>
                            <p className="text-gray-800">{line.english}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Consonants/Vowels Section */}
                  {(currentContent.data.consonants || currentContent.data.vowels) && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        {currentContent.data.consonants ? 'Consonants' : 'Vowels'}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {(currentContent.data.consonants || currentContent.data.vowels).map((item: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                            <div className="text-3xl font-bold text-gray-900 mb-2">{item.char}</div>
                            <p className="text-gray-600 font-medium mb-1">{item.sound}</p>
                            <p className="text-sm text-gray-500 mb-3">{item.example}</p>
                            <button
                              onClick={() => handlePlayAudio(item.example)}
                              className="p-2 text-primary-600 hover:bg-primary-100 rounded-full transition-colors"
                              title="Listen to pronunciation"
                            >
                              {isPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Examples Section */}
                  {currentContent.data.examples && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Examples</h3>
                      <div className="space-y-3">
                        {currentContent.data.examples.map((example: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-lg font-medium text-gray-900">{example.syllable}</p>
                              <button
                                onClick={() => handlePlayAudio(example.syllable)}
                                className="p-2 text-primary-600 hover:bg-primary-100 rounded-full transition-colors"
                                title="Listen to pronunciation"
                              >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                              </button>
                            </div>
                            <p className="text-gray-600 mb-1">{example.components}</p>
                            <p className="text-gray-800">{example.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentContentIndex === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {isCompleted ? (
              <button
                onClick={handleCompleteLesson}
                className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Complete Lesson</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
