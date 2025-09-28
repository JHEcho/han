import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'Korean Learning Hub - Learn Korean with Fun!',
  description: 'A comprehensive Korean language learning platform for foreigners. Learn Hangeul, vocabulary, grammar, and conversation with interactive lessons and quizzes.',
  keywords: ['Korean language', 'Korean learning', 'Hangeul', 'Korean grammar', 'Korean vocabulary', 'Korean conversation', 'Korean lessons'],
  authors: [{ name: 'Korean Learning Hub' }],
  creator: 'Korean Learning Hub',
  publisher: 'Korean Learning Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://learnhangul.govinfos.com'),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    title: 'Korean Learning Hub - Learn Korean with Fun!',
    description: 'A comprehensive Korean language learning platform for foreigners. Learn Hangeul, vocabulary, grammar, and conversation with interactive lessons and quizzes.',
    url: '/',
    siteName: 'Korean Learning Hub',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Korean Learning Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korean Learning Hub - Learn Korean with Fun!',
    description: 'A comprehensive Korean language learning platform for foreigners.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
