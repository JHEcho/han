'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { getLessonById } from '@/lib/lessonData'
import { ArrowLeft, Play, Pause, Volume2, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLearningProgress } from '@/hooks/useLearningProgress'

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = parseInt(params.id as string)
  
  const [lesson, setLesson] = useState<any>(null)
  const [currentContentIndex, setCurrentContentIndex] = useState(0)
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  
  // Initialize learning progress hook
  const learningProgress = useLearningProgress()
  const { completeLesson, isLessonCompleted } = learningProgress || {}

  useEffect(() => {
    console.log('Loading lesson with ID:', lessonId)
    const lessonData = getLessonById(lessonId)
    console.log('Lesson data:', lessonData)
    
    if (lessonData) {
      setLesson(lessonData)
      console.log('Lesson loaded:', { title: lessonData.title, contentLength: lessonData.content.length })
    } else {
      console.log('Lesson not found, redirecting to learn page')
      router.push('/learn')
    }
  }, [lessonId, router])

  // Check if lesson is completed separately
  useEffect(() => {
    if (lesson && isLessonCompleted) {
      try {
        const completed = isLessonCompleted(lessonId)
        setIsCompleted(completed)
        console.log('Lesson completion status:', completed)
      } catch (error) {
        console.error('Error checking lesson completion:', error)
        setIsCompleted(false)
      }
    }
  }, [lesson, lessonId, isLessonCompleted])

  // Cleanup speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel()
      }
    }
  }, [])

  const handlePlayAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      // If the same audio is already playing, stop it
      if (playingAudio === text) {
        speechSynthesis.cancel()
        setPlayingAudio(null)
        return
      }
      
      // Stop any current speech
      speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ko-KR'
      utterance.rate = 0.6 // Slower rate for clearer pronunciation
      utterance.pitch = 1.3 // Higher pitch for female voice
      utterance.volume = 0.9 // Slightly lower volume for comfort
      
      // Try to select a Korean female voice
      const voices = speechSynthesis.getVoices()
      console.log('Available voices:', voices.map(v => ({ name: v.name, lang: v.lang })))
      
      const koreanFemaleVoice = voices.find(voice => 
        voice.lang === 'ko-KR' && 
        (voice.name.includes('Female') || voice.name.includes('여성') || 
         voice.name.includes('Yuna') || voice.name.includes('Sora') ||
         voice.name.includes('Nara') || voice.name.includes('Hana') ||
         voice.name.includes('Minji') || voice.name.includes('Jiyoung') ||
         voice.name.includes('Microsoft Heami') || voice.name.includes('Microsoft Sunhi'))
      )
      
      // If no specific female voice found, try any Korean voice
      const koreanVoice = koreanFemaleVoice || voices.find(voice => voice.lang === 'ko-KR')
      
      if (koreanVoice) {
        utterance.voice = koreanVoice
        console.log('🎤 Using Korean voice:', koreanVoice.name)
        console.log('🔊 Voice details:', {
          name: koreanVoice.name,
          lang: koreanVoice.lang,
          gender: koreanVoice.name.includes('Female') ? 'Female' : 'Unknown',
          default: koreanVoice.default
        })
      } else {
        console.log('❌ No Korean voice found, using default')
        console.log('💡 Available voices:', voices.map(v => `${v.name} (${v.lang})`))
      }
      
      utterance.onstart = () => setPlayingAudio(text)
      utterance.onend = () => setPlayingAudio(null)
      utterance.onerror = () => setPlayingAudio(null)
      
      speechSynthesis.speak(utterance)
    } else {
      console.log('Speech synthesis not supported')
    }
  }

  const handleNext = () => {
    if (!lesson) {
      console.log('Lesson not loaded yet')
      return
    }
    
    console.log('Next clicked:', { currentContentIndex, totalContent: lesson.content.length })
    
    if (currentContentIndex < lesson.content.length - 1) {
      setCurrentContentIndex(currentContentIndex + 1)
      console.log('Moving to next content:', currentContentIndex + 1)
    } else {
      // All content viewed, ready to complete lesson
      console.log('All content viewed, ready to complete lesson')
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(currentContentIndex - 1)
    }
  }

  const handleCompleteLesson = async () => {
    if (!completeLesson) {
      console.error('completeLesson function not available')
      return
    }
    
    // Check if lesson is already completed in database
    if (isLessonCompleted && isLessonCompleted(lessonId)) {
      console.log('Lesson already completed in database, redirecting to learn page')
      router.push('/learn')
      return
    }
    
    try {
      setIsCompleting(true)
      console.log('Completing lesson:', lessonId)
      await completeLesson(lessonId)
      setIsCompleted(true)
      setShowSuccessMessage(true)
      console.log('Lesson completed successfully')
      
      // Show success message for a moment before redirecting
      setTimeout(() => {
        router.push('/learn')
      }, 2000)
    } catch (error) {
      console.error('Error completing lesson:', error)
      alert('레슨 완료 중 오류가 발생했습니다.')
    } finally {
      setIsCompleting(false)
    }
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

  const currentContent = lesson?.content[currentContentIndex]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in">
            <CheckCircle className="w-5 h-5" />
            <span>Lesson completed successfully!</span>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        )}
        
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
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {lesson.title}
                    </h1>
                    {isCompleted && (
                      <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completed</span>
                      </div>
                    )}
                  </div>
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

          {/* Google AdSense - Horizontal Ad */}
          <div className="mb-8">
            <ins 
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-4011742299641178"
              data-ad-slot="3491557099"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            <script dangerouslySetInnerHTML={{
              __html: '(adsbygoogle = window.adsbygoogle || []).push({});'
            }} />
          </div>

          {/* Lesson Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            {/* Main Content */}
            <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-8">
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
                                {playingAudio === item.korean ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                              </button>
                            </div>
                            <p className="text-gray-600 italic mb-1">{item.romanization}</p>
                            <p className="text-gray-800">{item.english}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Syllables Section */}
                  {currentContent.data.syllables && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Syllables</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {currentContent.data.syllables.map((syllable: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                            <div className="text-4xl font-bold text-gray-900 mb-2 font-korean">{syllable.korean}</div>
                            <p className="text-gray-600 italic mb-1">{syllable.romanization}</p>
                            <p className="text-gray-800 text-sm mb-3">{syllable.english}</p>
                            <button
                              onClick={() => handlePlayAudio(syllable.korean)}
                              className="p-2 text-primary-600 hover:bg-primary-100 rounded-full transition-colors"
                              title="Listen to pronunciation"
                            >
                              {playingAudio === syllable.korean ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                            </button>
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
                                  {playingAudio === example.korean ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
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
                                  {playingAudio === pattern.example ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
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
                                {playingAudio === line.korean ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
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
                              {playingAudio === item.example ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
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
                                {playingAudio === example.syllable ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
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
            
            {/* Google AdSense - Vertical Ad */}
            <div className="lg:col-span-1 flex justify-center">
              <div className="w-full max-w-[300px]">
                <ins 
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-4011742299641178"
                  data-ad-slot="3832863093"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
                <script dangerouslySetInnerHTML={{
                  __html: '(adsbygoogle = window.adsbygoogle || []).push({});'
                }} />
              </div>
            </div>
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
                disabled={isCompleting}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                  isCompleting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {isCompleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Completing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete Lesson</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!lesson}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                  !lesson 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary-600 hover:bg-primary-700'
                } text-white`}
              >
                <span>
                  {lesson && currentContentIndex < lesson.content.length - 1 
                    ? 'Next' 
                    : 'Complete Lesson'
                  }
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
