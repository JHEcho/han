import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Korean Learning Hub - Learn Korean with Fun!',
  description: 'A comprehensive Korean language learning platform for foreigners',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
