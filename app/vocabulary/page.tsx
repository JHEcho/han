'use client'

import { useState, useEffect } from 'react'

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic'
import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Volume2, Star, ArrowRight, BookOpen, Users, Clock } from 'lucide-react'
import { supabase, Vocabulary } from '@/lib/supabase'

interface VocabularyWord {
  korean: string
  romanization: string
  english: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  example?: string
  exampleTranslation?: string
}

const vocabularyData: VocabularyWord[] = [
  // Beginner
  { korean: '안녕하세요', romanization: 'annyeonghaseyo', english: 'Hello', category: 'Greetings', difficulty: 'beginner' },
  { korean: '감사합니다', romanization: 'gamsahamnida', english: 'Thank you', category: 'Greetings', difficulty: 'beginner' },
  { korean: '죄송합니다', romanization: 'joesonghamnida', english: 'Sorry', category: 'Greetings', difficulty: 'beginner' },
  { korean: '네', romanization: 'ne', english: 'Yes', category: 'Basic', difficulty: 'beginner' },
  { korean: '아니요', romanization: 'aniyo', english: 'No', category: 'Basic', difficulty: 'beginner' },
  { korean: '물', romanization: 'mul', english: 'Water', category: 'Food & Drink', difficulty: 'beginner' },
  { korean: '밥', romanization: 'bap', english: 'Rice/Food', category: 'Food & Drink', difficulty: 'beginner' },
  { korean: '집', romanization: 'jip', english: 'House', category: 'Places', difficulty: 'beginner' },
  { korean: '학교', romanization: 'hakgyo', english: 'School', category: 'Places', difficulty: 'beginner' },
  { korean: '친구', romanization: 'chingu', english: 'Friend', category: 'People', difficulty: 'beginner' },
  
  // Intermediate
  { korean: '맛있다', romanization: 'masitda', english: 'Delicious', category: 'Food & Drink', difficulty: 'intermediate' },
  { korean: '재미있다', romanization: 'jaemiitda', english: 'Fun/Interesting', category: 'Feelings', difficulty: 'intermediate' },
  { korean: '어렵다', romanization: 'eoryeopda', english: 'Difficult', category: 'Feelings', difficulty: 'intermediate' },
  { korean: '쉽다', romanization: 'swipda', english: 'Easy', category: 'Feelings', difficulty: 'intermediate' },
  { korean: '비싸다', romanization: 'bissada', english: 'Expensive', category: 'Shopping', difficulty: 'intermediate' },
  { korean: '싸다', romanization: 'ssada', english: 'Cheap', category: 'Shopping', difficulty: 'intermediate' },
  { korean: '예쁘다', romanization: 'yeppeuda', english: 'Pretty', category: 'Appearance', difficulty: 'intermediate' },
  { korean: '크다', romanization: 'keuda', english: 'Big', category: 'Size', difficulty: 'intermediate' },
  { korean: '작다', romanization: 'jakda', english: 'Small', category: 'Size', difficulty: 'intermediate' },
  { korean: '빠르다', romanization: 'ppareuda', english: 'Fast', category: 'Speed', difficulty: 'intermediate' },
]

const categories = ['All', 'Greetings', 'Basic', 'Food & Drink', 'Places', 'People', 'Feelings', 'Shopping', 'Appearance', 'Size', 'Speed']
const difficulties = ['All', 'beginner', 'intermediate', 'advanced']

export default function VocabularyPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedWord, setSelectedWord] = useState<VocabularyWord | null>(null)
  const [vocabularyData, setVocabularyData] = useState<Vocabulary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVocabularyData()
  }, [])

  const fetchVocabularyData = async () => {
    try {
      const { data, error } = await supabase
        .from('vocabulary')
        .select('*')
        .order('id')

      if (error) {
        console.error('Error fetching vocabulary data:', error)
        setVocabularyData([])
      } else {
        setVocabularyData(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
      setVocabularyData([])
    } finally {
      setLoading(false)
    }
  }

  const filteredWords = (() => {
    // Use database data if available, otherwise fallback to static data
    const wordsToFilter = vocabularyData.length > 0 
      ? vocabularyData.map(vocab => ({
          korean: vocab.korean,
          romanization: vocab.pronunciation || '',
          english: vocab.english,
          category: vocab.category || 'Basic',
          difficulty: vocab.difficulty,
          example: undefined,
          exampleTranslation: undefined
        }))
      : vocabularyData

    return wordsToFilter.filter(word => {
      const categoryMatch = selectedCategory === 'All' || word.category === selectedCategory
      const difficultyMatch = selectedDifficulty === 'All' || word.difficulty === selectedDifficulty
      return categoryMatch && difficultyMatch
    })
  })()

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ko-KR'
      utterance.rate = 0.7
      speechSynthesis.speak(utterance)
    }
  }

  const toggleFavorite = (korean: string) => {
    setFavorites(prev => 
      prev.includes(korean) 
        ? prev.filter(word => word !== korean)
        : [...prev, korean]
    )
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
      <div className="min-h-screen">
        <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Korean Vocabulary</h1>
          <p className="text-xl text-gray-600">
            Build your Korean vocabulary with essential words and phrases
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <BookOpen className="text-primary-600 mr-4" size={32} />
              <div>
                <div className="text-2xl font-bold text-gray-900">{vocabularyData.length}</div>
                <div className="text-gray-600">Total Words</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <Star className="text-yellow-500 mr-4" size={32} />
              <div>
                <div className="text-2xl font-bold text-gray-900">{favorites.length}</div>
                <div className="text-gray-600">Favorites</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <Users className="text-green-500 mr-4" size={32} />
              <div>
                <div className="text-2xl font-bold text-gray-900">15</div>
                <div className="text-gray-600">Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Vocabulary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWords.map((word, index) => (
            <div
              key={index}
              className="lesson-card p-6 cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => setSelectedWord({
                korean: word.korean,
                romanization: 'pronunciation' in word ? word.pronunciation || '' : '',
                english: word.english,
                category: word.category,
                difficulty: word.difficulty,
                example: undefined,
                exampleTranslation: undefined
              })}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-korean-red mb-2">{word.korean}</div>
                  <div className="text-lg text-gray-600 mb-1">
                    {'pronunciation' in word ? word.pronunciation : 'romanization' in word ? word.romanization : ''}
                  </div>
                  <div className="text-xl font-medium text-gray-900">{word.english}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(word.korean)
                  }}
                  className="ml-4"
                >
                  <Star
                    size={24}
                    className={favorites.includes(word.korean) ? 'text-yellow-500 fill-current' : 'text-gray-400'}
                  />
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(word.difficulty)}`}>
                  {word.difficulty}
                </span>
                <span className="text-sm text-gray-500">{word.category}</span>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  playAudio(word.korean)
                }}
                className="mt-4 w-full btn-secondary inline-flex items-center justify-center"
              >
                <Volume2 className="mr-2" size={16} />
                Listen
              </button>
            </div>
          ))}
        </div>

        {/* Selected Word Detail Modal */}
        {selectedWord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="text-center">
                <div className="text-6xl font-bold text-korean-red mb-4">{selectedWord.korean}</div>
                <div className="text-2xl text-gray-600 mb-2">{selectedWord.romanization}</div>
                <div className="text-3xl font-bold text-gray-900 mb-6">{selectedWord.english}</div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{selectedWord.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedWord.difficulty)}`}>
                      {selectedWord.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedWord(null)}
                    className="btn-secondary flex-1"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => playAudio(selectedWord.korean)}
                    className="btn-primary flex-1 inline-flex items-center justify-center"
                  >
                    <Volume2 className="mr-2" size={20} />
                    Practice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Learning Tips */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Learning Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Practice Daily</h3>
              <p className="text-primary-100">
                Spend at least 15 minutes daily reviewing vocabulary. Consistency is key to retention.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Use Context</h3>
              <p className="text-primary-100">
                Learn words in sentences and situations. This helps you remember them better.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </ProtectedRoute>
  )
}
