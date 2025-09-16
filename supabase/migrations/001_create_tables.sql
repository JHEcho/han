-- Create hangeul table for Korean characters
CREATE TABLE IF NOT EXISTS hangeul (
  id SERIAL PRIMARY KEY,
  character VARCHAR(10) NOT NULL UNIQUE,
  pronunciation VARCHAR(50) NOT NULL,
  category VARCHAR(20) NOT NULL CHECK (category IN ('consonant', 'vowel', 'final')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create vocabulary table
CREATE TABLE IF NOT EXISTS vocabulary (
  id SERIAL PRIMARY KEY,
  korean VARCHAR(100) NOT NULL,
  english VARCHAR(200) NOT NULL,
  pronunciation VARCHAR(100),
  category VARCHAR(50),
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz table
CREATE TABLE IF NOT EXISTS quiz (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer VARCHAR(200) NOT NULL,
  explanation TEXT,
  category VARCHAR(50),
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  completed_lessons INTEGER[] DEFAULT '{}',
  total_score INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, category)
);

-- Insert basic Korean consonants
INSERT INTO hangeul (character, pronunciation, category) VALUES
('ㄱ', 'g/k', 'consonant'),
('ㄴ', 'n', 'consonant'),
('ㄷ', 'd/t', 'consonant'),
('ㄹ', 'r/l', 'consonant'),
('ㅁ', 'm', 'consonant'),
('ㅂ', 'b/p', 'consonant'),
('ㅅ', 's', 'consonant'),
('ㅇ', 'ng', 'consonant'),
('ㅈ', 'j', 'consonant'),
('ㅊ', 'ch', 'consonant'),
('ㅋ', 'k', 'consonant'),
('ㅌ', 't', 'consonant'),
('ㅍ', 'p', 'consonant'),
('ㅎ', 'h', 'consonant')
ON CONFLICT (character) DO NOTHING;

-- Insert basic Korean vowels
INSERT INTO hangeul (character, pronunciation, category) VALUES
('ㅏ', 'a', 'vowel'),
('ㅓ', 'eo', 'vowel'),
('ㅗ', 'o', 'vowel'),
('ㅜ', 'u', 'vowel'),
('ㅡ', 'eu', 'vowel'),
('ㅣ', 'i', 'vowel'),
('ㅑ', 'ya', 'vowel'),
('ㅕ', 'yeo', 'vowel'),
('ㅛ', 'yo', 'vowel'),
('ㅠ', 'yu', 'vowel')
ON CONFLICT (character) DO NOTHING;

-- Insert sample vocabulary
INSERT INTO vocabulary (korean, english, pronunciation, category, difficulty) VALUES
('안녕하세요', 'Hello', 'annyeonghaseyo', 'Greetings', 'beginner'),
('감사합니다', 'Thank you', 'gamsahamnida', 'Greetings', 'beginner'),
('죄송합니다', 'Sorry', 'joesonghamnida', 'Greetings', 'beginner'),
('사과', 'Apple', 'sagwa', 'Food & Drink', 'beginner'),
('물', 'Water', 'mul', 'Food & Drink', 'beginner'),
('책', 'Book', 'chaek', 'Objects', 'beginner'),
('학교', 'School', 'hakgyo', 'Places', 'beginner'),
('집', 'House', 'jip', 'Places', 'beginner')
ON CONFLICT (korean) DO NOTHING;

-- Insert sample quiz questions
INSERT INTO quiz (question, options, correct_answer, explanation, category, difficulty) VALUES
(
  '다음 중 "안녕하세요"의 올바른 의미는?',
  '["Hello", "Thank you", "Sorry", "Goodbye"]',
  'Hello',
  '"안녕하세요"는 한국어로 "Hello" 또는 "Good day"를 의미합니다.',
  'greeting',
  'beginner'
),
(
  '한국어 "감사합니다"의 의미는?',
  '["Thank you", "Hello", "Sorry", "Goodbye"]',
  'Thank you',
  '"감사합니다"는 한국어로 "Thank you"를 의미합니다.',
  'greeting',
  'beginner'
);

-- Enable Row Level Security
ALTER TABLE hangeul ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to hangeul" ON hangeul FOR SELECT USING (true);
CREATE POLICY "Allow public read access to vocabulary" ON vocabulary FOR SELECT USING (true);
CREATE POLICY "Allow public read access to quiz" ON quiz FOR SELECT USING (true);

-- Create policies for user progress
CREATE POLICY "Users can view their own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);
