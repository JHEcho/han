// Lesson data for Korean learning app
export interface LessonContent {
  id: number
  lesson_number: number
  title: string
  description: string
  content_type: 'hangeul' | 'vocabulary' | 'grammar' | 'conversation' | 'quiz'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimated_time: number
  level_id: number
  content: {
    type: 'text' | 'image' | 'audio' | 'interactive' | 'quiz'
    data: any
  }[]
}

// Basic Level (Hangeul) Lessons
export const basicLessons: LessonContent[] = [
  {
    id: 1,
    lesson_number: 1,
    title: "Korean Alphabet - Basic Consonants",
    description: "Learn the basic Korean consonants: ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ",
    content_type: 'hangeul',
    difficulty: 'beginner',
    estimated_time: 15,
    level_id: 6,
    content: [
      {
        type: 'text',
        data: {
          title: "Basic Consonants",
          text: "Korean has 14 basic consonants. Let's learn them one by one:",
          consonants: [
            { char: 'ㄱ', sound: 'g/k', example: '가방' },
            { char: 'ㄴ', sound: 'n', example: '나무' },
            { char: 'ㄷ', sound: 'd/t', example: '다리' },
            { char: 'ㄹ', sound: 'r/l', example: '라면' },
            { char: 'ㅁ', sound: 'm', example: '마음' },
            { char: 'ㅂ', sound: 'b/p', example: '바다' },
            { char: 'ㅅ', sound: 's', example: '사과' },
            { char: 'ㅇ', sound: 'ng', example: '아이' },
            { char: 'ㅈ', sound: 'j', example: '자동차' },
            { char: 'ㅊ', sound: 'ch', example: '차' },
            { char: 'ㅋ', sound: 'k', example: '코' },
            { char: 'ㅌ', sound: 't', example: '토끼' },
            { char: 'ㅍ', sound: 'p', example: '파' },
            { char: 'ㅎ', sound: 'h', example: '하늘' }
          ]
        }
      }
    ]
  },
  {
    id: 2,
    lesson_number: 2,
    title: "Korean Alphabet - Basic Vowels",
    description: "Learn the basic Korean vowels: ㅏ, ㅓ, ㅗ, ㅜ, ㅡ, ㅣ",
    content_type: 'hangeul',
    difficulty: 'beginner',
    estimated_time: 15,
    level_id: 6,
    content: [
      {
        type: 'text',
        data: {
          title: "Basic Vowels",
          text: "Korean has 6 basic vowels. Let's learn them:",
          vowels: [
            { char: 'ㅏ', sound: 'a', example: '아버지' },
            { char: 'ㅓ', sound: 'eo', example: '어머니' },
            { char: 'ㅗ', sound: 'o', example: '오늘' },
            { char: 'ㅜ', sound: 'u', example: '우유' },
            { char: 'ㅡ', sound: 'eu', example: '으름' },
            { char: 'ㅣ', sound: 'i', example: '이름' }
          ]
        }
      }
    ]
  },
  {
    id: 3,
    lesson_number: 3,
    title: "Combining Consonants and Vowels",
    description: "Learn how to combine consonants and vowels to form Korean syllables",
    content_type: 'hangeul',
    difficulty: 'beginner',
    estimated_time: 20,
    level_id: 6,
    content: [
      {
        type: 'text',
        data: {
          title: "Forming Syllables",
          text: "Korean syllables are formed by combining consonants and vowels. Let's practice:",
          examples: [
            { syllable: '가', components: 'ㄱ + ㅏ', meaning: 'go' },
            { syllable: '나', components: 'ㄴ + ㅏ', meaning: 'I/me' },
            { syllable: '다', components: 'ㄷ + ㅏ', meaning: 'all' },
            { syllable: '라', components: 'ㄹ + ㅏ', meaning: 'la (musical note)' },
            { syllable: '마', components: 'ㅁ + ㅏ', meaning: 'horse' },
            { syllable: '바', components: 'ㅂ + ㅏ', meaning: 'bar' },
            { syllable: '사', components: 'ㅅ + ㅏ', meaning: 'four' },
            { syllable: '아', components: 'ㅇ + ㅏ', meaning: 'ah' },
            { syllable: '자', components: 'ㅈ + ㅏ', meaning: 'sleep' },
            { syllable: '차', components: 'ㅊ + ㅏ', meaning: 'car' }
          ]
        }
      }
    ]
  }
]

// Beginner Level Lessons
export const beginnerLessons: LessonContent[] = [
  {
    id: 4,
    lesson_number: 1,
    title: "Greetings and Basic Expressions",
    description: "Learn essential Korean greetings and polite expressions",
    content_type: 'vocabulary',
    difficulty: 'beginner',
    estimated_time: 20,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "Basic Greetings",
          text: "Here are the most important Korean greetings:",
          vocabulary: [
            { korean: '안녕하세요', romanization: 'annyeonghaseyo', english: 'Hello (formal)', audio: 'annyeonghaseyo.mp3' },
            { korean: '안녕', romanization: 'annyeong', english: 'Hello (informal)', audio: 'annyeong.mp3' },
            { korean: '감사합니다', romanization: 'gamsahamnida', english: 'Thank you (formal)', audio: 'gamsahamnida.mp3' },
            { korean: '고마워요', romanization: 'gomawoyo', english: 'Thank you (informal)', audio: 'gomawoyo.mp3' },
            { korean: '죄송합니다', romanization: 'joesonghamnida', english: 'Sorry (formal)', audio: 'joesonghamnida.mp3' },
            { korean: '미안해요', romanization: 'mianhaeyo', english: 'Sorry (informal)', audio: 'mianhaeyo.mp3' },
            { korean: '네', romanization: 'ne', english: 'Yes', audio: 'ne.mp3' },
            { korean: '아니요', romanization: 'aniyo', english: 'No', audio: 'aniyo.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    lesson_number: 2,
    title: "Numbers 1-10",
    description: "Learn Korean numbers from 1 to 10",
    content_type: 'vocabulary',
    difficulty: 'beginner',
    estimated_time: 15,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "Korean Numbers 1-10",
          text: "Learn the native Korean numbers:",
          vocabulary: [
            { korean: '하나', romanization: 'hana', english: 'one', audio: 'hana.mp3' },
            { korean: '둘', romanization: 'dul', english: 'two', audio: 'dul.mp3' },
            { korean: '셋', romanization: 'set', english: 'three', audio: 'set.mp3' },
            { korean: '넷', romanization: 'net', english: 'four', audio: 'net.mp3' },
            { korean: '다섯', romanization: 'daseot', english: 'five', audio: 'daseot.mp3' },
            { korean: '여섯', romanization: 'yeoseot', english: 'six', audio: 'yeoseot.mp3' },
            { korean: '일곱', romanization: 'ilgop', english: 'seven', audio: 'ilgop.mp3' },
            { korean: '여덟', romanization: 'yeodeol', english: 'eight', audio: 'yeodeol.mp3' },
            { korean: '아홉', romanization: 'ahop', english: 'nine', audio: 'ahop.mp3' },
            { korean: '열', romanization: 'yeol', english: 'ten', audio: 'yeol.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 6,
    lesson_number: 3,
    title: "Family Members",
    description: "Learn vocabulary for family members in Korean",
    content_type: 'vocabulary',
    difficulty: 'beginner',
    estimated_time: 20,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "Family Vocabulary",
          text: "Here are the Korean words for family members:",
          vocabulary: [
            { korean: '가족', romanization: 'gajok', english: 'family', audio: 'gajok.mp3' },
            { korean: '아버지', romanization: 'abeoji', english: 'father', audio: 'abeoji.mp3' },
            { korean: '어머니', romanization: 'eomeoni', english: 'mother', audio: 'eomeoni.mp3' },
            { korean: '형', romanization: 'hyeong', english: 'older brother (male speaking)', audio: 'hyeong.mp3' },
            { korean: '누나', romanization: 'nuna', english: 'older sister (male speaking)', audio: 'nuna.mp3' },
            { korean: '오빠', romanization: 'oppa', english: 'older brother (female speaking)', audio: 'oppa.mp3' },
            { korean: '언니', romanization: 'eonni', english: 'older sister (female speaking)', audio: 'eonni.mp3' },
            { korean: '동생', romanization: 'dongsaeng', english: 'younger sibling', audio: 'dongsaeng.mp3' }
          ]
        }
      }
    ]
  }
]

// Intermediate Level Lessons
export const intermediateLessons: LessonContent[] = [
  {
    id: 7,
    lesson_number: 1,
    title: "Present Tense - 이다/아니다",
    description: "Learn how to use the Korean copula 이다 and its negative form 아니다",
    content_type: 'grammar',
    difficulty: 'intermediate',
    estimated_time: 25,
    level_id: 2,
    content: [
      {
        type: 'text',
        data: {
          title: "이다 (to be) and 아니다 (to not be)",
          text: "이다 is the Korean copula meaning 'to be'. Here's how to use it:",
          grammar: {
            pattern: "Noun + 이다/아니다",
            examples: [
              { korean: '저는 학생입니다', romanization: 'jeoneun haksaengimnida', english: 'I am a student' },
              { korean: '이것은 책입니다', romanization: 'igeoseun chaegimnida', english: 'This is a book' },
              { korean: '저는 선생님이 아닙니다', romanization: 'jeoneun seonsaengnimi animnida', english: 'I am not a teacher' },
              { korean: '그것은 자동차가 아닙니다', romanization: 'geugeoseun jadongchaga animnida', english: 'That is not a car' }
            ],
            conjugation: {
              formal: '입니다/아닙니다',
              informal: '이에요/아니에요',
              casual: '야/아니야'
            }
          }
        }
      }
    ]
  },
  {
    id: 8,
    lesson_number: 2,
    title: "Daily Conversation - Ordering Food",
    description: "Learn how to order food in Korean restaurants",
    content_type: 'conversation',
    difficulty: 'intermediate',
    estimated_time: 30,
    level_id: 2,
    content: [
      {
        type: 'text',
        data: {
          title: "Ordering Food at a Restaurant",
          text: "Here's a typical conversation when ordering food:",
          conversation: [
            { speaker: 'Waiter', korean: '어서 오세요. 몇 분이세요?', romanization: 'eoseo oseyo. myeot buniseyo?', english: 'Welcome. How many people?' },
            { speaker: 'Customer', korean: '두 명이에요.', romanization: 'du myeongieyo.', english: 'Two people.' },
            { speaker: 'Waiter', korean: '이쪽으로 오세요.', romanization: 'ijjogeuro oseyo.', english: 'Please come this way.' },
            { speaker: 'Waiter', korean: '주문하시겠어요?', romanization: 'jumunhasigesseoyo?', english: 'Are you ready to order?' },
            { speaker: 'Customer', korean: '김치찌개 하나 주세요.', romanization: 'gimchijjigae hana juseyo.', english: 'One kimchi stew, please.' },
            { speaker: 'Waiter', korean: '네, 알겠습니다.', romanization: 'ne, algetseumnida.', english: 'Yes, I understand.' }
          ]
        }
      }
    ]
  }
]

// Advanced Level Lessons
export const advancedLessons: LessonContent[] = [
  {
    id: 9,
    lesson_number: 1,
    title: "Complex Sentence Structures",
    description: "Learn advanced Korean sentence patterns and conjunctions",
    content_type: 'grammar',
    difficulty: 'advanced',
    estimated_time: 35,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Complex Sentence Patterns",
          text: "Learn how to create complex sentences in Korean:",
          grammar: {
            patterns: [
              {
                name: "~면서 (while doing)",
                example: "음악을 들으면서 공부해요.",
                romanization: "eumageul deureumyeonseo gongbuhaeyo.",
                english: "I study while listening to music."
              },
              {
                name: "~기 때문에 (because)",
                example: "비가 오기 때문에 집에 있어요.",
                romanization: "biga ogi ttaemune jibe isseoyo.",
                english: "I'm staying home because it's raining."
              },
              {
                name: "~ㄴ/은 후에 (after doing)",
                example: "밥을 먹은 후에 산책해요.",
                romanization: "babeul meogeun hue sanchaekhaeyo.",
                english: "I take a walk after eating."
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 10,
    lesson_number: 2,
    title: "Business Korean",
    description: "Learn formal business expressions and email writing",
    content_type: 'conversation',
    difficulty: 'advanced',
    estimated_time: 40,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Business Korean Expressions",
          text: "Essential expressions for business situations:",
          vocabulary: [
            { korean: '회의', romanization: 'hoeui', english: 'meeting', audio: 'hoeui.mp3' },
            { korean: '프레젠테이션', romanization: 'peurejenteisyeon', english: 'presentation', audio: 'presentation.mp3' },
            { korean: '계약서', romanization: 'gyeyakseo', english: 'contract', audio: 'gyeyakseo.mp3' },
            { korean: '협상', romanization: 'hyeopsang', english: 'negotiation', audio: 'hyeopsang.mp3' },
            { korean: '제안서', romanization: 'jeanseo', english: 'proposal', audio: 'jeanseo.mp3' }
          ],
          expressions: [
            { korean: '안녕하세요. 저는 [회사명]의 [이름]입니다.', romanization: 'annyeonghaseyo. jeoneun [hoesaname]ui [ireum]imnida.', english: 'Hello. I am [Name] from [Company].' },
            { korean: '회의 시간을 조정해 주시겠어요?', romanization: 'hoeui siganeul jojeonghae jusigesseoyo?', english: 'Could you please adjust the meeting time?' },
            { korean: '제안서를 검토해 보겠습니다.', romanization: 'jeanseoreul geomtohae bogetseumnida.', english: 'I will review the proposal.' }
          ]
        }
      }
    ]
  }
]

// Combine all lessons
export const allLessons: LessonContent[] = [
  ...basicLessons,
  ...beginnerLessons,
  ...intermediateLessons,
  ...advancedLessons
]

// Get lessons by level
export const getLessonsByLevel = (levelId: number): LessonContent[] => {
  return allLessons.filter(lesson => lesson.level_id === levelId)
}

// Get lesson by ID
export const getLessonById = (id: number): LessonContent | undefined => {
  return allLessons.find(lesson => lesson.id === id)
}
