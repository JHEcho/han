'use client'

import { useState, useEffect } from 'react'

import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Trophy, RotateCcw, CheckCircle, XCircle, Star, Clock, Volume2 } from 'lucide-react'
import { supabase, Quiz } from '@/lib/supabase'

interface QuizQuestion {
  id: number
  type: 'hangeul' | 'vocabulary' | 'pronunciation'
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
  korean?: string
  romanization?: string
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: 'hangeul',
    question: 'What is the romanization of "안녕하세요"?',
    options: ['annyeonghaseyo', 'annyeonghaseyo', 'annyeonghaseyo', 'annyeonghaseyo'],
    correctAnswer: 0,
    explanation: '안녕하세요 means "Hello" in Korean.',
    korean: '안녕하세요'
  },
  {
    id: 2,
    type: 'vocabulary',
    question: 'What does "감사합니다" mean?',
    options: ['Hello', 'Thank you', 'Sorry', 'Goodbye'],
    correctAnswer: 1,
    explanation: '감사합니다 means "Thank you" in Korean.',
    korean: '감사합니다',
    romanization: 'gamsahamnida'
  },
  {
    id: 3,
    type: 'hangeul',
    question: 'Which character represents the sound "g/k"?',
    options: ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ'],
    correctAnswer: 0,
    explanation: 'ㄱ represents the "g/k" sound in Korean.',
    korean: 'ㄱ'
  },
  {
    id: 4,
    type: 'vocabulary',
    question: 'What does "물" mean?',
    options: ['Food', 'Water', 'House', 'Friend'],
    correctAnswer: 1,
    explanation: '물 means "Water" in Korean.',
    korean: '물',
    romanization: 'mul'
  },
  {
    id: 5,
    type: 'pronunciation',
    question: 'How do you pronounce "학교"?',
    options: ['hak-gyo', 'hak-gyo', 'hak-gyo', 'hak-gyo'],
    correctAnswer: 0,
    explanation: '학교 means "School" and is pronounced "hak-gyo".',
    korean: '학교',
    romanization: 'hakgyo'
  }
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([])
  const [quizData, setQuizData] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuizData()
  }, [])

  const fetchQuizData = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz')
        .select('*')
        .order('id')

      if (error) {
        console.error('Error fetching quiz data:', error)
        setQuizData([])
      } else {
        setQuizData(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
      setQuizData([])
    } finally {
      setLoading(false)
    }
  }

  // Use database data if available, otherwise fallback to static data
  const questions = quizData.length > 0 
    ? quizData.map(quiz => ({
        id: quiz.id,
        type: 'vocabulary' as const,
        question: quiz.question,
        options: quiz.options as string[],
        correctAnswer: quiz.options.indexOf(quiz.correct_answer),
        explanation: quiz.explanation || '',
        korean: undefined,
        romanization: undefined
      }))
    : quizQuestions

  useEffect(() => {
    setUserAnswers(new Array(questions.length).fill(null))
  }, [questions.length])

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult) {
      handleAnswerSubmit()
    }
  }, [timeLeft, showResult, quizCompleted])

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex)
    }
  }

  const handleAnswerSubmit = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...userAnswers]
      newAnswers[currentQuestion] = selectedAnswer
      setUserAnswers(newAnswers)

      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1)
      }
    }
    setShowResult(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setTimeLeft(30)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setTimeLeft(30)
    setQuizCompleted(false)
    setUserAnswers(new Array(questions.length).fill(null))
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return { message: 'Excellent!', color: 'text-green-600' }
    if (percentage >= 60) return { message: 'Good job!', color: 'text-blue-600' }
    if (percentage >= 40) return { message: 'Not bad!', color: 'text-yellow-600' }
    return { message: 'Keep practicing!', color: 'text-red-600' }
  }

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ko-KR'
      utterance.rate = 0.7
      utterance.pitch = 1.2 // Higher pitch for female voice
      
      // Try to select a Korean female voice
      const voices = speechSynthesis.getVoices()
      const koreanFemaleVoice = voices.find(voice => 
        voice.lang === 'ko-KR' && 
        (voice.name.includes('Female') || voice.name.includes('여성') || voice.name.includes('Yuna'))
      )
      
      if (koreanFemaleVoice) {
        utterance.voice = koreanFemaleVoice
      }
      
      speechSynthesis.speak(utterance)
    }
  }

  if (quizCompleted) {
    const scoreMessage = getScoreMessage()
    return (
      <ProtectedRoute>
        <div className="min-h-screen">
          <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="mb-8">
              <Trophy className="mx-auto text-yellow-500 mb-4" size={80} />
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz Completed!</h1>
              <div className={`text-2xl font-bold ${scoreMessage.color} mb-2`}>
                {scoreMessage.message}
              </div>
              <div className="text-xl text-gray-600">
                You scored {score} out of {questions.length} questions
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quiz Review</h2>
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const userAnswer = userAnswers[index]
                  const isCorrect = userAnswer === question.correctAnswer
                  
                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Question {index + 1}</span>
                        {isCorrect ? (
                          <CheckCircle className="text-green-500" size={20} />
                        ) : (
                          <XCircle className="text-red-500" size={20} />
                        )}
                      </div>
                      <div className="text-gray-700 mb-2">{question.question}</div>
                      {question.korean && (
                        <div className="text-lg font-bold text-korean-red mb-1">
                          {question.korean}
                        </div>
                      )}
                      {question.romanization && (
                        <div className="text-gray-600 mb-2">
                          {question.romanization}
                        </div>
                      )}
                      <div className="text-sm text-gray-500">
                        Correct answer: {question.options[question.correctAnswer]}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={handleRestartQuiz} className="btn-primary inline-flex items-center">
                <RotateCcw className="mr-2" size={20} />
                Try Again
              </button>
            </div>
          </div>
        </div>
        </div>
      </ProtectedRoute>
    )
  }

  const currentQ = quizQuestions[currentQuestion]

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Korean Quiz</h1>
          <p className="text-xl text-gray-600">
            Test your Korean knowledge with interactive quizzes
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="flex items-center text-lg font-medium text-gray-700">
              <Clock className="mr-2" size={20} />
              {timeLeft}s
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-primary-600 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4">
              {currentQ.type.charAt(0).toUpperCase() + currentQ.type.slice(1)}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentQ.question}</h2>
            
            {currentQ.korean && (
              <div className="mb-4">
                <div className="text-4xl font-bold text-korean-red mb-2">{currentQ.korean}</div>
                {currentQ.romanization && (
                  <div className="text-lg text-gray-600 mb-4">{currentQ.romanization}</div>
                )}
                <button
                  onClick={() => playAudio(currentQ.korean!)}
                  className="btn-secondary inline-flex items-center"
                >
                  <Volume2 className="mr-2" size={16} />
                  Listen
                </button>
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 "
              
              if (showResult) {
                if (index === currentQ.correctAnswer) {
                  buttonClass += "border-green-500 bg-green-50 text-green-800"
                } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                  buttonClass += "border-red-500 bg-red-50 text-red-800"
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-600"
                }
              } else {
                if (selectedAnswer === index) {
                  buttonClass += "border-primary-500 bg-primary-50 text-primary-800"
                } else {
                  buttonClass += "border-gray-200 hover:border-primary-300 hover:bg-primary-50"
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-4 text-sm font-bold">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg">{option}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Result and Next Button */}
          {showResult && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-4">
                {selectedAnswer === currentQ.correctAnswer ? (
                  <CheckCircle className="text-green-500 mr-3" size={24} />
                ) : (
                  <XCircle className="text-red-500 mr-3" size={24} />
                )}
                <span className={`text-lg font-medium ${
                  selectedAnswer === currentQ.correctAnswer ? 'text-green-800' : 'text-red-800'
                }`}>
                  {selectedAnswer === currentQ.correctAnswer ? 'Correct!' : 'Incorrect!'}
                </span>
              </div>
              
              {currentQ.explanation && (
                <p className="text-gray-700 mb-4">{currentQ.explanation}</p>
              )}
              
              <button
                onClick={handleNextQuestion}
                className="btn-primary w-full"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          )}

          {/* Submit Button */}
          {!showResult && selectedAnswer !== null && (
            <div className="mt-8">
              <button
                onClick={handleAnswerSubmit}
                className="btn-primary w-full"
              >
                Submit Answer
              </button>
            </div>
          )}
        </div>

        {/* Score Display */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium text-gray-700">
              Current Score: {score} / {currentQuestion + (showResult ? 1 : 0)}
            </div>
            <div className="flex items-center text-yellow-600">
              <Star className="mr-1" size={20} />
              <span className="font-medium">
                {Math.round((score / (currentQuestion + (showResult ? 1 : 0))) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </ProtectedRoute>
  )
}
