# Korean Learning Hub 🇰🇷

A comprehensive Korean language learning platform designed specifically for foreigners who want to learn Korean effectively and enjoyably.

## Features

### 🎯 Core Learning Modules
- **Hangeul Learning**: Interactive lessons for Korean alphabet (consonants and vowels)
- **Vocabulary Builder**: Essential Korean words and phrases with pronunciation
- **Quiz System**: Test your knowledge with timed quizzes and progress tracking

### 🎨 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive UI**: Beautiful, modern interface with smooth animations
- **Audio Support**: Text-to-speech for pronunciation practice
- **Progress Tracking**: Monitor your learning journey with detailed statistics

### 📚 Learning Content
- **Beginner to Advanced**: Content organized by difficulty levels
- **Categorized Vocabulary**: Words grouped by topics (greetings, food, places, etc.)
- **Real Examples**: Practical usage examples for better understanding
- **Cultural Context**: Learn Korean in cultural context

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Audio**: Web Speech API

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd korean-learning-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── hangeul/           # Hangeul learning page
│   ├── vocabulary/        # Vocabulary learning page
│   └── quiz/              # Quiz page
├── components/            # Reusable components
│   └── Navigation.tsx     # Navigation component
├── public/               # Static assets
└── ...config files
```

## Features in Detail

### 🏠 Home Page
- Welcome section with learning statistics
- Quick access to all learning modules
- Progress overview and achievements

### 📖 Hangeul Learning
- Interactive character cards for consonants and vowels
- Pronunciation guides with audio support
- Example words for each character
- Progress tracking for completed lessons

### 📚 Vocabulary Section
- Categorized word lists (greetings, food, places, etc.)
- Difficulty-based filtering (beginner, intermediate, advanced)
- Favorites system for personalized learning
- Audio pronunciation for each word

### 🧠 Quiz System
- Multiple choice questions
- Timed quizzes with countdown timer
- Immediate feedback and explanations
- Score tracking and performance analytics
- Quiz review with correct answers

## Customization

### Adding New Vocabulary
Edit `app/vocabulary/page.tsx` and add new words to the `vocabularyData` array:

```typescript
{
  korean: '새로운 단어',
  romanization: 'saeroun danoe',
  english: 'New Word',
  category: 'Category',
  difficulty: 'beginner'
}
```

### Adding New Quiz Questions
Edit `app/quiz/page.tsx` and add new questions to the `quizQuestions` array:

```typescript
{
  id: 6,
  type: 'vocabulary',
  question: 'Your question here?',
  options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
  correctAnswer: 0,
  explanation: 'Explanation here',
  korean: '한국어',
  romanization: 'hangukeo'
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔧 Development Tools

For development and testing, you can access the dev tools at:
- Development tools: [http://localhost:3000/dev-tools](http://localhost:3000/dev-tools)

**Note**: Dev tools are only available in development mode.

## 🗄️ Database & Authentication

The app now includes:
- ✅ **Supabase Integration**: Database and authentication
- ✅ **User Authentication**: Email/password signup, login, logout, password reset
- ✅ **User Progress Tracking**: Individual learning progress and scores
- ✅ **Favorites System**: Save favorite vocabulary words
- ✅ **Row Level Security**: Secure user data access

## 🚀 Deployment

The app is ready for deployment on platforms like Vercel or Netlify:

```bash
npm run build
```

## Future Enhancements

- [ ] Advanced grammar lessons
- [ ] Conversation practice with AI
- [ ] Mobile app version
- [ ] Offline learning support
- [ ] Social features and leaderboards
- [ ] More language support for instructions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Korean language content curated for international learners
- Design inspired by modern educational platforms
- Built with love for Korean language learners worldwide

---

**Happy Learning! 화이팅! 💪**
