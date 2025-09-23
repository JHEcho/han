-- Learning Levels and Progress System
-- This migration adds structured learning levels and progress tracking

-- Create learning levels table
CREATE TABLE IF NOT EXISTS learning_levels (
  id SERIAL PRIMARY KEY,
  level_name VARCHAR(20) NOT NULL UNIQUE,
  level_order INTEGER NOT NULL UNIQUE,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lessons table for structured learning
CREATE TABLE IF NOT EXISTS lessons (
  id SERIAL PRIMARY KEY,
  level_id INTEGER REFERENCES learning_levels(id) ON DELETE CASCADE,
  lesson_number INTEGER NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('hangeul', 'vocabulary', 'grammar', 'conversation', 'quiz')),
  difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_time INTEGER DEFAULT 15, -- minutes
  is_unlocked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(level_id, lesson_number)
);

-- Create user learning progress table
CREATE TABLE IF NOT EXISTS user_learning_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  level_id INTEGER REFERENCES learning_levels(id) ON DELETE CASCADE,
  current_lesson_id INTEGER REFERENCES lessons(id) ON DELETE SET NULL,
  completed_lessons INTEGER[] DEFAULT '{}',
  total_score INTEGER DEFAULT 0,
  level_completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, level_id)
);

-- Create lesson content table for detailed lesson materials
CREATE TABLE IF NOT EXISTS lesson_content (
  id SERIAL PRIMARY KEY,
  lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('text', 'image', 'audio', 'video', 'interactive')),
  content_data JSONB NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert learning levels
INSERT INTO learning_levels (level_name, level_order, description, color) VALUES
('초급 (Beginner)', 1, '한글 기초와 기본 어휘 학습', '#10B981'),
('중급 (Intermediate)', 2, '문법과 일상 대화 학습', '#F59E0B'),
('고급 (Advanced)', 3, '고급 문법과 복잡한 표현 학습', '#EF4444')
ON CONFLICT (level_name) DO NOTHING;

-- Insert beginner lessons
INSERT INTO lessons (level_id, lesson_number, title, description, content_type, difficulty, estimated_time, is_unlocked) VALUES
-- Beginner Level (Level 1)
(1, 1, '한글 기초 - 자음', '한글의 기본 자음들을 배워보세요', 'hangeul', 'beginner', 20, true),
(1, 2, '한글 기초 - 모음', '한글의 기본 모음들을 배워보세요', 'hangeul', 'beginner', 20, true),
(1, 3, '한글 조합 연습', '자음과 모음을 조합하여 글자 만들기', 'hangeul', 'beginner', 25, false),
(1, 4, '기본 인사말', '안녕하세요, 감사합니다 등 기본 인사', 'vocabulary', 'beginner', 15, false),
(1, 5, '자기소개', '이름, 나이, 직업 등 자기소개 표현', 'conversation', 'beginner', 20, false),
(1, 6, '숫자와 시간', '1-100 숫자와 시간 표현', 'vocabulary', 'beginner', 25, false),
(1, 7, '가족 호칭', '아버지, 어머니 등 가족 관계 표현', 'vocabulary', 'beginner', 20, false),
(1, 8, '기본 동사', '하다, 가다, 오다 등 기본 동사', 'vocabulary', 'beginner', 25, false),
(1, 9, '기본 형용사', '크다, 작다, 예쁘다 등 기본 형용사', 'vocabulary', 'beginner', 20, false),
(1, 10, '초급 퀴즈 1', '1-9강 내용 종합 퀴즈', 'quiz', 'beginner', 30, false),

-- Intermediate Level (Level 2)
(2, 1, '존댓말과 반말', '상황에 맞는 존댓말과 반말 사용법', 'grammar', 'intermediate', 30, false),
(2, 2, '과거/현재/미래 시제', '한국어 시제 표현법', 'grammar', 'intermediate', 35, false),
(2, 3, '조사 사용법', '은/는, 이/가, 을/를 등 조사', 'grammar', 'intermediate', 40, false),
(2, 4, '일상 대화 - 쇼핑', '쇼핑할 때 사용하는 표현들', 'conversation', 'intermediate', 25, false),
(2, 5, '일상 대화 - 음식 주문', '식당에서 음식 주문하는 방법', 'conversation', 'intermediate', 25, false),
(2, 6, '감정 표현', '기쁘다, 슬프다 등 감정 관련 어휘', 'vocabulary', 'intermediate', 20, false),
(2, 7, '날씨와 계절', '날씨와 계절 관련 표현', 'vocabulary', 'intermediate', 20, false),
(2, 8, '교통수단', '버스, 지하철 등 교통 관련 어휘', 'vocabulary', 'intermediate', 20, false),
(2, 9, '중급 문법 - 연결어미', '그리고, 하지만 등 연결 표현', 'grammar', 'intermediate', 35, false),
(2, 10, '중급 퀴즈 1', '중급 과정 종합 퀴즈', 'quiz', 'intermediate', 40, false),

-- Advanced Level (Level 3)
(3, 1, '고급 문법 - 관용표현', '한국어 관용구와 속담', 'grammar', 'advanced', 45, false),
(3, 2, '비즈니스 한국어', '업무 상황에서 사용하는 표현', 'conversation', 'advanced', 50, false),
(3, 3, '뉴스와 시사', '뉴스에서 자주 나오는 어휘', 'vocabulary', 'advanced', 40, false),
(3, 4, '문학과 예술', '문학 작품과 예술 관련 어휘', 'vocabulary', 'advanced', 35, false),
(3, 5, '고급 대화 - 토론', '의견을 나누고 토론하는 방법', 'conversation', 'advanced', 45, false),
(3, 6, '한국 문화 이해', '한국 문화와 관련된 표현', 'conversation', 'advanced', 40, false),
(3, 7, '고급 문법 - 복합문', '복잡한 문장 구조 이해', 'grammar', 'advanced', 50, false),
(3, 8, '전문 용어', '학문과 직업 관련 전문 용어', 'vocabulary', 'advanced', 35, false),
(3, 9, '고급 퀴즈 1', '고급 과정 종합 퀴즈', 'quiz', 'advanced', 60, false),
(3, 10, '최종 평가', '전체 과정 종합 평가', 'quiz', 'advanced', 90, false);

-- Insert lesson content for first few lessons
INSERT INTO lesson_content (lesson_id, content_type, content_data, order_index) VALUES
-- Lesson 1: 한글 기초 - 자음
(1, 'text', '{"title": "한글 자음 배우기", "content": "한글의 기본 자음 14개를 배워보겠습니다."}', 1),
(1, 'interactive', '{"type": "hangeul_practice", "consonants": ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"]}', 2),
(1, 'text', '{"title": "자음 발음 연습", "content": "각 자음의 정확한 발음을 연습해보세요."}', 3),

-- Lesson 2: 한글 기초 - 모음
(2, 'text', '{"title": "한글 모음 배우기", "content": "한글의 기본 모음 10개를 배워보겠습니다."}', 1),
(2, 'interactive', '{"type": "hangeul_practice", "vowels": ["ㅏ", "ㅓ", "ㅗ", "ㅜ", "ㅡ", "ㅣ", "ㅑ", "ㅕ", "ㅛ", "ㅠ"]}', 2),
(2, 'text', '{"title": "모음 발음 연습", "content": "각 모음의 정확한 발음을 연습해보세요."}', 3);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_lessons_level_id ON lessons(level_id);
CREATE INDEX IF NOT EXISTS idx_lessons_level_lesson ON lessons(level_id, lesson_number);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_learning_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_content_lesson_id ON lesson_content(lesson_id);

-- Enable RLS
ALTER TABLE learning_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_content ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Learning levels are viewable by everyone" ON learning_levels FOR SELECT USING (true);
CREATE POLICY "Lessons are viewable by everyone" ON lessons FOR SELECT USING (true);
CREATE POLICY "Lesson content is viewable by everyone" ON lesson_content FOR SELECT USING (true);

CREATE POLICY "Users can view their own progress" ON user_learning_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON user_learning_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON user_learning_progress FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for user_learning_progress
CREATE TRIGGER update_user_learning_progress_updated_at 
    BEFORE UPDATE ON user_learning_progress 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
