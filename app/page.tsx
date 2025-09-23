'use client'

// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import Link from 'next/link'
import { BookOpen, Brain, Trophy, Users, Star, ArrowRight, Target, Award, Clock, CheckCircle } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

export default function Home() {
  const { user, loading } = useAuth()
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)

  // Handle OAuth callback and show success message
  useEffect(() => {
    if (typeof window === 'undefined') return

    const urlParams = new URLSearchParams(window.location.hash.substring(1))
    const accessToken = urlParams.get('access_token')
    
    if (accessToken && user) {
      // Show success message for OAuth login
      console.log('OAuth login successful!')
      setShowWelcomeMessage(true)
      
      // Hide message after 5 seconds
      setTimeout(() => {
        setShowWelcomeMessage(false)
      }, 5000)
    }
  }, [user])

  const features = [
    {
      icon: BookOpen,
      title: '한글 기초',
      description: '한글의 자음과 모음을 체계적으로 학습하세요',
      href: '/learn?level=basic',
      color: 'from-blue-500 to-blue-600',
      level: '기초'
    },
    {
      icon: Brain,
      title: '초급 과정',
      description: '기본 어휘와 간단한 문장을 배워보세요',
      href: '/learn?level=beginner',
      color: 'from-green-500 to-green-600',
      level: '초급'
    },
    {
      icon: Target,
      title: '중급 과정',
      description: '문법과 일상 대화를 마스터하세요',
      href: '/learn?level=intermediate',
      color: 'from-yellow-500 to-yellow-600',
      level: '중급'
    },
    {
      icon: Trophy,
      title: '고급 과정',
      description: '고급 문법과 복잡한 표현을 학습하세요',
      href: '/learn?level=advanced',
      color: 'from-red-500 to-red-600',
      level: '고급'
    }
  ]

  const quickAccess = [
    {
      icon: BookOpen,
      title: '한글 연습',
      description: '자음과 모음 연습',
      href: '/hangeul',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Brain,
      title: '어휘 학습',
      description: '단어와 표현 학습',
      href: '/vocabulary',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Trophy,
      title: '퀴즈 도전',
      description: '실력 테스트',
      href: '/quiz',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const stats = [
    { label: '학습 레슨', value: '30+' },
    { label: '어휘 단어', value: '500+' },
    { label: '퀴즈 문제', value: '100+' },
    { label: '성공률', value: '95%' }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
        <Navigation />
        
        {/* Welcome Message for OAuth Login */}
        {showWelcomeMessage && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in">
            <CheckCircle className="w-5 h-5" />
            <span>구글 로그인에 성공했습니다! 환영합니다!</span>
            <button
              onClick={() => setShowWelcomeMessage(false)}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        )}
        
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                한국어 학습 허브
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                체계적인 단계별 학습으로 한국어를 마스터하세요.<br />
                기초부터 고급까지, 당신의 수준에 맞는 맞춤형 학습을 제공합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/learn"
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
                >
                  <BookOpen className="mr-2" size={24} />
                  학습 시작하기
                </Link>
                <Link
                  href="/learn?level=basic"
                  className="btn-secondary text-lg px-8 py-4 inline-flex items-center justify-center"
                >
                  <Target className="mr-2" size={24} />
                  기초부터 시작
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Levels Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                단계별 학습 과정
              </h2>
              <p className="text-xl text-gray-600">
                당신의 수준에 맞는 학습 과정을 선택하세요
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Link
                    key={index}
                    href={feature.href}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Level Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {feature.level}
                      </span>
                    </div>

                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                    <div className="relative p-8">
                      {/* Icon */}
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {feature.description}
                      </p>

                      {/* Arrow */}
                      <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                        <span>시작하기</span>
                        <ArrowRight className="ml-2" size={20} />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                학습 통계
              </h2>
              <p className="text-xl text-gray-600">
                수많은 학습자들이 함께하고 있습니다
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                빠른 접근
              </h2>
              <p className="text-xl text-gray-600">
                특정 영역을 집중적으로 학습하고 싶다면
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {quickAccess.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-8"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {item.description}
                    </p>
                    <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span>바로가기</span>
                      <ArrowRight className="ml-2" size={20} />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              지금 바로 시작하세요!
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              체계적인 한국어 학습으로 당신의 목표를 달성하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/learn"
                className="bg-white text-primary-600 hover:bg-gray-50 text-lg px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center transition-colors duration-200"
              >
                <BookOpen className="mr-2" size={24} />
                전체 과정 보기
              </Link>
              <Link
                href="/learn?level=basic"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 rounded-lg font-semibold inline-flex items-center justify-center transition-colors duration-200"
              >
                <Target className="mr-2" size={24} />
                기초부터 시작
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-korean-red to-korean-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">한</span>
              </div>
              <span className="text-xl font-bold">Korean Learning Hub</span>
            </div>
            <p className="text-gray-400 mb-4">
              체계적인 한국어 학습을 위한 최고의 플랫폼
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Korean Learning Hub. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  )
}