# Korean Learning Hub 🇰🇷

A comprehensive Korean language learning platform designed specifically for foreigners who want to learn Korean effectively and enjoyably. Built with Next.js 14, TypeScript, and Supabase.

## 🌟 Live Demo

**🔗 [https://learnhangul.govinfos.com](https://learnhangul.govinfos.com)**

## ✨ Features

### 🎯 Core Learning Modules
- **Step-by-Step Learning**: Structured lessons from beginner to advanced levels
- **Hangeul Learning**: Interactive Korean alphabet lessons with pronunciation
- **Vocabulary Builder**: Essential Korean words and phrases with audio
- **Quiz System**: Timed quizzes with progress tracking and analytics
- **Lesson System**: Comprehensive lessons with grammar, conversation, and vocabulary

### 🔐 Authentication & User Management
- **Google OAuth**: One-click login with Google account
- **Kakao OAuth**: Social login with Kakao (Korean users)
- **Email/Password**: Traditional authentication with password reset
- **User Progress**: Individual learning progress and completion tracking
- **Favorites System**: Save and manage favorite vocabulary words

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Modern UI**: Beautiful interface with Tailwind CSS and smooth animations
- **Audio Support**: Text-to-speech for Korean pronunciation practice
- **Progress Tracking**: Detailed statistics and learning analytics
- **Dark/Light Mode**: Adaptive design for different preferences

### 📚 Learning Content
- **3 Difficulty Levels**: Beginner, Intermediate, and Advanced
- **15+ Lesson Categories**: Grammar, conversation, vocabulary, and more
- **500+ Vocabulary Words**: Categorized by topics and difficulty
- **100+ Quiz Questions**: Multiple choice with explanations
- **Cultural Context**: Learn Korean with cultural insights

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom Korean theme
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Audio**: Web Speech API

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with OAuth providers
- **Real-time**: Supabase Realtime for live updates
- **Storage**: Supabase Storage for media files

### Deployment & SEO
- **Hosting**: Vercel
- **SEO**: Next.js built-in SEO optimization
- **Analytics**: Google Analytics integration
- **Monetization**: Google AdSense integration
- **RSS Feed**: Automatic content syndication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/JHEcho/han.git
cd han
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dev-tools/         # Development utilities
│   ├── hangeul/           # Korean alphabet learning
│   ├── learn/             # Main learning interface
│   ├── lessons/           # Individual lesson pages
│   ├── quiz/              # Quiz system
│   ├── vocabulary/        # Vocabulary learning
│   ├── api/               # API routes (RSS feed)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with SEO
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── auth/              # Authentication components
│   ├── dev-tools/         # Development components
│   ├── Navigation.tsx     # Main navigation
│   └── ProtectedRoute.tsx # Route protection
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication state
├── hooks/                 # Custom React hooks
│   ├── useLearningProgress.ts # Learning progress tracking
│   └── useUserProgress.ts     # User progress management
├── lib/                   # Utility libraries
│   ├── lessonData.ts      # Lesson content data
│   └── supabase.ts        # Supabase client & types
├── supabase/              # Database migrations
│   └── migrations/        # SQL migration files
└── public/               # Static assets
```

## 🎓 Learning Features

### 📖 Step-by-Step Learning
- **Beginner Level**: Basic vocabulary and simple sentences
- **Intermediate Level**: Everyday vocabulary and grammar
- **Advanced Level**: Complex grammar and conversation skills
- **Progress Tracking**: Visual progress bars and completion status
- **Unlock System**: Sequential lesson unlocking based on completion

### 🔤 Hangeul Learning
- **Interactive Cards**: Consonants and vowels with pronunciation
- **Audio Support**: Text-to-speech for each character
- **Example Words**: Practical usage examples
- **Progress Tracking**: Track completed characters and syllables

### 📚 Vocabulary System
- **Categorized Words**: Organized by topics (greetings, food, places, etc.)
- **Difficulty Filtering**: Beginner, intermediate, and advanced levels
- **Favorites**: Save and manage favorite words
- **Audio Pronunciation**: Listen to correct pronunciation
- **Search & Filter**: Find words quickly

### 🧠 Quiz System
- **Multiple Choice**: Timed quizzes with immediate feedback
- **Score Tracking**: Performance analytics and progress
- **Explanations**: Detailed explanations for correct answers
- **Review Mode**: Review completed quizzes
- **Difficulty Levels**: Quizzes matched to learning level

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Development Tools
Access development utilities at `/dev-tools` (development mode only):
- Authentication testing
- Database connection testing
- OAuth provider testing
- Network diagnostics

## 🗄️ Database Schema

### Core Tables
- `learning_levels`: Difficulty levels and descriptions
- `lessons`: Individual lesson content and metadata
- `user_progress`: User learning progress and completion
- `user_favorites`: User's favorite vocabulary words

### Authentication
- Supabase Auth handles user authentication
- Row Level Security (RLS) for data protection
- OAuth integration with Google and Kakao

## 🚀 Deployment

### Vercel Deployment
1. **Connect GitHub repository to Vercel**
2. **Set environment variables in Vercel dashboard:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`
3. **Deploy automatically on git push**

### Environment Variables
```env
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
KAKAO_CLIENT_ID=your_kakao_client_id
KAKAO_CLIENT_SECRET=your_kakao_client_secret
```

## 🔒 Security Features

- **Input Validation**: Comprehensive form validation and sanitization
- **Authentication Security**: Secure OAuth flows with domain validation
- **Environment Variables**: Secure API key management
- **Security Headers**: CSP, HSTS, XSS protection, and more
- **Row Level Security**: Database-level access control
- **Error Handling**: Secure error messages without sensitive data

## 📊 Analytics & Monetization

- **Google Analytics**: User behavior tracking
- **Google AdSense**: Strategic ad placement for revenue
- **RSS Feed**: Content syndication at `/api/rss`
- **SEO Optimization**: Meta tags, sitemap, and structured data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use Tailwind CSS for styling
- Maintain responsive design
- Add proper error handling
- Include Korean language content validation

## 📈 Future Enhancements

- [ ] **AI-Powered Features**: Conversation practice with AI
- [ ] **Mobile App**: React Native version
- [ ] **Offline Support**: PWA with offline learning
- [ ] **Social Features**: User profiles and leaderboards
- [ ] **Advanced Analytics**: Detailed learning insights
- [ ] **Multi-language Support**: Interface in multiple languages
- [ ] **Voice Recognition**: Speaking practice with AI feedback
- [ ] **Gamification**: Points, badges, and achievements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Korean Language Content**: Curated for international learners
- **Design Inspiration**: Modern educational platforms
- **Community**: Built with love for Korean language learners worldwide
- **Open Source**: Thanks to all contributors and the open source community

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/JHEcho/han/issues)
- **Discussions**: [GitHub Discussions](https://github.com/JHEcho/han/discussions)
- **Email**: Contact through GitHub profile

---

**Happy Learning! 화이팅! 💪**

*Start your Korean learning journey today at [https://learnhangul.govinfos.com](https://learnhangul.govinfos.com)*