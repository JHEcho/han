'use client'

import Navigation from '@/components/Navigation'
import Link from 'next/link'
import { BookOpen, Brain, Trophy, Users, Star, ArrowRight } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Learn Hangeul',
      description: 'Master Korean alphabet with interactive lessons',
      href: '/hangeul',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Brain,
      title: 'Build Vocabulary',
      description: 'Learn essential Korean words and phrases',
      href: '/vocabulary',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Trophy,
      title: 'Practice Quiz',
      description: 'Test your knowledge with fun quizzes',
      href: '/quiz',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const stats = [
    { label: 'Students', value: '10,000+' },
    { label: 'Lessons', value: '50+' },
    { label: 'Languages', value: '15+' },
    { label: 'Success Rate', value: '95%' }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn Korean
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-korean-red to-korean-blue">
                한글
              </span>
              with Confidence
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Start your Korean language journey today! Our interactive platform makes learning 
              Korean fun, easy, and effective for learners of all levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/hangeul" className="btn-primary inline-flex items-center">
                Start Learning
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link href="/quiz" className="btn-secondary inline-flex items-center">
                Take Quiz
                <Trophy className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive Korean learning tools designed for international students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link key={index} href={feature.href} className="group">
                  <div className="lesson-card p-8 text-center h-full">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {feature.description}
                    </p>
                    <div className="flex items-center justify-center text-primary-600 font-medium group-hover:text-primary-700">
                      Learn More
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" size={16} />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-100 text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Korean Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students who are already mastering Korean with our platform.
          </p>
          <Link href="/hangeul" className="btn-primary text-lg px-8 py-4 inline-flex items-center">
            Begin Learning Now
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-korean-red to-korean-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">한</span>
              </div>
              <span className="text-xl font-bold">Korean Learning Hub</span>
            </div>
            <p className="text-gray-400">
              © 2024 Korean Learning Hub. Making Korean language learning accessible to everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
