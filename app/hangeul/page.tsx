'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import { ArrowLeft, Volume2, CheckCircle } from 'lucide-react'
import { supabase, Hangeul } from '@/lib/supabase'

interface HangeulChar {
  char: string
  romanization: string
  pronunciation: string
  example?: string
  exampleMeaning?: string
}

const consonants: HangeulChar[] = [
  { char: 'ㄱ', romanization: 'g/k', pronunciation: 'g as in "go"', example: '가', exampleMeaning: 'go' },
  { char: 'ㄴ', romanization: 'n', pronunciation: 'n as in "no"', example: '나', exampleMeaning: 'I/me' },
  { char: 'ㄷ', romanization: 'd/t', pronunciation: 'd as in "do"', example: '다', exampleMeaning: 'all' },
  { char: 'ㄹ', romanization: 'r/l', pronunciation: 'r as in "run"', example: '라', exampleMeaning: 'la' },
  { char: 'ㅁ', romanization: 'm', pronunciation: 'm as in "me"', example: '마', exampleMeaning: 'horse' },
  { char: 'ㅂ', romanization: 'b/p', pronunciation: 'b as in "be"', example: '바', exampleMeaning: 'bar' },
  { char: 'ㅅ', romanization: 's', pronunciation: 's as in "see"', example: '사', exampleMeaning: 'four' },
  { char: 'ㅇ', romanization: 'ng', pronunciation: 'ng as in "sing"', example: '아', exampleMeaning: 'ah' },
  { char: 'ㅈ', romanization: 'j', pronunciation: 'j as in "jeep"', example: '자', exampleMeaning: 'sleep' },
  { char: 'ㅊ', romanization: 'ch', pronunciation: 'ch as in "cheese"', example: '차', exampleMeaning: 'car' },
  { char: 'ㅋ', romanization: 'k', pronunciation: 'k as in "key"', example: '카', exampleMeaning: 'card' },
  { char: 'ㅌ', romanization: 't', pronunciation: 't as in "tea"', example: '타', exampleMeaning: 'ride' },
  { char: 'ㅍ', romanization: 'p', pronunciation: 'p as in "pie"', example: '파', exampleMeaning: 'green onion' },
  { char: 'ㅎ', romanization: 'h', pronunciation: 'h as in "hello"', example: '하', exampleMeaning: 'do' }
]

const vowels: HangeulChar[] = [
  { char: 'ㅏ', romanization: 'a', pronunciation: 'a as in "father"', example: '아', exampleMeaning: 'ah' },
  { char: 'ㅓ', romanization: 'eo', pronunciation: 'eo as in "up"', example: '어', exampleMeaning: 'where' },
  { char: 'ㅗ', romanization: 'o', pronunciation: 'o as in "go"', example: '오', exampleMeaning: 'five' },
  { char: 'ㅜ', romanization: 'u', pronunciation: 'u as in "moon"', example: '우', exampleMeaning: 'cry' },
  { char: 'ㅡ', romanization: 'eu', pronunciation: 'eu as in "good"', example: '으', exampleMeaning: 'eu' },
  { char: 'ㅣ', romanization: 'i', pronunciation: 'i as in "see"', example: '이', exampleMeaning: 'this' },
  { char: 'ㅑ', romanization: 'ya', pronunciation: 'ya as in "yard"', example: '야', exampleMeaning: 'hey' },
  { char: 'ㅕ', romanization: 'yeo', pronunciation: 'yeo as in "young"', example: '여', exampleMeaning: 'woman' },
  { char: 'ㅛ', romanization: 'yo', pronunciation: 'yo as in "yoga"', example: '요', exampleMeaning: 'yes' },
  { char: 'ㅠ', romanization: 'yu', pronunciation: 'yu as in "you"', example: '유', exampleMeaning: 'milk' },
  { char: 'ㅐ', romanization: 'ae', pronunciation: 'ae as in "cat"', example: '애', exampleMeaning: 'love' },
  { char: 'ㅔ', romanization: 'e', pronunciation: 'e as in "bed"', example: '에', exampleMeaning: 'at' },
  { char: 'ㅚ', romanization: 'oe', pronunciation: 'oe as in "way"', example: '외', exampleMeaning: 'outside' },
  { char: 'ㅟ', romanization: 'wi', pronunciation: 'wi as in "we"', example: '위', exampleMeaning: 'above' }
]

export default function HangeulPage() {
  const [activeTab, setActiveTab] = useState<'consonants' | 'vowels'>('consonants')
  const [selectedChar, setSelectedChar] = useState<HangeulChar | null>(null)
  const [hangeulData, setHangeulData] = useState<Hangeul[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHangeulData()
  }, [])

  const fetchHangeulData = async () => {
    try {
      const { data, error } = await supabase
        .from('hangeul')
        .select('*')
        .order('id')

      if (error) {
        console.error('Error fetching hangeul data:', error)
        // Fallback to static data if database fails
        setHangeulData([])
      } else {
        setHangeulData(data || [])
      }
    } catch (error) {
      console.error('Error:', error)
      setHangeulData([])
    } finally {
      setLoading(false)
    }
  }

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ko-KR'
      utterance.rate = 0.7
      speechSynthesis.speak(utterance)
    }
  }

  const renderCharCard = (char: HangeulChar, index: number) => (
    <div
      key={index}
      className="lesson-card p-6 text-center cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={() => setSelectedChar(char)}
    >
      <div className="hangeul-display text-5xl mb-3">{char.char}</div>
      <div className="text-lg font-medium text-gray-700 mb-2">{char.romanization}</div>
      <div className="text-sm text-gray-500 mb-3">{char.pronunciation}</div>
      {char.example && (
        <div className="border-t pt-3">
          <div className="text-lg font-medium text-korean-blue mb-1">{char.example}</div>
          <div className="text-sm text-gray-600">{char.exampleMeaning}</div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learn Hangeul</h1>
          <p className="text-xl text-gray-600">
            Master the Korean alphabet with interactive lessons
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('consonants')}
            className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'consonants'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Consonants (자음)
          </button>
          <button
            onClick={() => setActiveTab('vowels')}
            className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'vowels'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Vowels (모음)
          </button>
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <div className="text-gray-500">Loading Korean characters...</div>
            </div>
          ) : (
            (() => {
              const dbChars = hangeulData.filter(char => 
                activeTab === 'consonants' ? char.category === 'consonant' : char.category === 'vowel'
              )
              
              // Use database data if available, otherwise fallback to static data
              const charsToShow = dbChars.length > 0 ? dbChars.map(char => ({
                char: char.character,
                romanization: char.pronunciation,
                pronunciation: char.pronunciation,
                example: undefined,
                exampleMeaning: undefined
              })) : (activeTab === 'consonants' ? consonants : vowels)
              
              return charsToShow.map((char, index) => renderCharCard(char, index))
            })()
          )}
        </div>

        {/* Selected Character Detail */}
        {selectedChar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full">
              <div className="text-center">
                <div className="hangeul-display text-8xl mb-6">{selectedChar.char}</div>
                <div className="text-2xl font-medium text-gray-700 mb-4">
                  {selectedChar.romanization}
                </div>
                <div className="text-lg text-gray-600 mb-6">
                  {selectedChar.pronunciation}
                </div>
                
                {selectedChar.example && (
                  <div className="border-t pt-6 mb-6">
                    <div className="text-3xl font-bold text-korean-blue mb-2">
                      {selectedChar.example}
                    </div>
                    <div className="text-lg text-gray-600 mb-4">
                      {selectedChar.exampleMeaning}
                    </div>
                    <button
                      onClick={() => playAudio(selectedChar.example!)}
                      className="btn-primary inline-flex items-center"
                    >
                      <Volume2 className="mr-2" size={20} />
                      Listen
                    </button>
                  </div>
                )}
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedChar(null)}
                    className="btn-secondary flex-1"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => playAudio(selectedChar.char)}
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

        {/* Progress Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Consonants</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Basic Consonants</span>
                  <CheckCircle className="text-green-500" size={20} />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Vowels</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Basic Vowels</span>
                  <CheckCircle className="text-green-500" size={20} />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
