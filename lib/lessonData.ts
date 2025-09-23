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
  },
  {
    id: 11,
    lesson_number: 4,
    title: "Colors and Shapes",
    description: "Learn Korean words for colors and basic shapes",
    content_type: 'vocabulary',
    difficulty: 'beginner',
    estimated_time: 18,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "Colors and Shapes",
          text: "Learn basic colors and shapes in Korean:",
          vocabulary: [
            { korean: '빨간색', romanization: 'ppalgansaek', english: 'red', audio: 'ppalgansaek.mp3' },
            { korean: '파란색', romanization: 'paransaek', english: 'blue', audio: 'paransaek.mp3' },
            { korean: '노란색', romanization: 'noransaek', english: 'yellow', audio: 'noransaek.mp3' },
            { korean: '초록색', romanization: 'choroksaek', english: 'green', audio: 'choroksaek.mp3' },
            { korean: '검은색', romanization: 'geomeunsaek', english: 'black', audio: 'geomeunsaek.mp3' },
            { korean: '흰색', romanization: 'huinsaek', english: 'white', audio: 'huinsaek.mp3' },
            { korean: '원', romanization: 'won', english: 'circle', audio: 'won.mp3' },
            { korean: '사각형', romanization: 'sagakhyeong', english: 'rectangle', audio: 'sagakhyeong.mp3' },
            { korean: '삼각형', romanization: 'samgakhyeong', english: 'triangle', audio: 'samgakhyeong.mp3' },
            { korean: '별', romanization: 'byeol', english: 'star', audio: 'byeol.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 12,
    lesson_number: 5,
    title: "Food and Drinks",
    description: "Learn vocabulary for common Korean foods and beverages",
    content_type: 'vocabulary',
    difficulty: 'beginner',
    estimated_time: 22,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "Food and Drinks",
          text: "Essential Korean food vocabulary:",
          vocabulary: [
            { korean: '밥', romanization: 'bap', english: 'rice/meal', audio: 'bap.mp3' },
            { korean: '김치', romanization: 'gimchi', english: 'kimchi', audio: 'gimchi.mp3' },
            { korean: '불고기', romanization: 'bulgogi', english: 'bulgogi (marinated beef)', audio: 'bulgogi.mp3' },
            { korean: '비빔밥', romanization: 'bibimbap', english: 'bibimbap (mixed rice)', audio: 'bibimbap.mp3' },
            { korean: '라면', romanization: 'ramyeon', english: 'ramen noodles', audio: 'ramyeon.mp3' },
            { korean: '물', romanization: 'mul', english: 'water', audio: 'mul.mp3' },
            { korean: '우유', romanization: 'uyu', english: 'milk', audio: 'uyu.mp3' },
            { korean: '커피', romanization: 'keopi', english: 'coffee', audio: 'keopi.mp3' },
            { korean: '차', romanization: 'cha', english: 'tea', audio: 'cha.mp3' },
            { korean: '맥주', romanization: 'maekju', english: 'beer', audio: 'maekju.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 13,
    lesson_number: 6,
    title: "Basic Grammar - 이/가",
    description: "Learn how to use the Korean subject particles 이/가",
    content_type: 'grammar',
    difficulty: 'beginner',
    estimated_time: 25,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "Subject Particles 이/가",
          text: "이/가 are subject particles that mark the subject of a sentence:",
          grammar: {
            pattern: "Noun + 이/가",
            explanation: "Use 이 after consonants, 가 after vowels",
            examples: [
              { korean: '학생이 공부해요', romanization: 'haksaengi gongbuhaeyo', english: 'The student studies' },
              { korean: '고양이가 자요', romanization: 'goyangiga jayo', english: 'The cat sleeps' },
              { korean: '친구가 와요', romanization: 'chinguga wayo', english: 'A friend comes' },
              { korean: '책이 있어요', romanization: 'chaegi isseoyo', english: 'There is a book' }
            ],
            patterns: [
              {
                name: "이 (after consonants)",
                example: "학생이 공부해요",
                romanization: "haksaengi gongbuhaeyo",
                english: "The student studies"
              },
              {
                name: "가 (after vowels)",
                example: "친구가 와요",
                romanization: "chinguga wayo",
                english: "A friend comes"
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 14,
    lesson_number: 7,
    title: "Time and Days",
    description: "Learn how to tell time and days of the week in Korean",
    content_type: 'vocabulary',
    difficulty: 'beginner',
    estimated_time: 20,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "Time and Days",
          text: "Learn time-related vocabulary:",
          vocabulary: [
            { korean: '오늘', romanization: 'oneul', english: 'today', audio: 'oneul.mp3' },
            { korean: '어제', romanization: 'eoje', english: 'yesterday', audio: 'eoje.mp3' },
            { korean: '내일', romanization: 'naeil', english: 'tomorrow', audio: 'naeil.mp3' },
            { korean: '월요일', romanization: 'woryoil', english: 'Monday', audio: 'woryoil.mp3' },
            { korean: '화요일', romanization: 'hwayoil', english: 'Tuesday', audio: 'hwayoil.mp3' },
            { korean: '수요일', romanization: 'suyoil', english: 'Wednesday', audio: 'suyoil.mp3' },
            { korean: '목요일', romanization: 'mogyoil', english: 'Thursday', audio: 'mogyoil.mp3' },
            { korean: '금요일', romanization: 'geumyoil', english: 'Friday', audio: 'geumyoil.mp3' },
            { korean: '토요일', romanization: 'toyoil', english: 'Saturday', audio: 'toyoil.mp3' },
            { korean: '일요일', romanization: 'iryoil', english: 'Sunday', audio: 'iryoil.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 15,
    lesson_number: 8,
    title: "Basic Conversation - Introductions",
    description: "Learn how to introduce yourself and ask basic questions",
    content_type: 'conversation',
    difficulty: 'beginner',
    estimated_time: 25,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "Self Introduction",
          text: "Learn how to introduce yourself in Korean:",
          conversation: [
            { speaker: 'A', korean: '안녕하세요. 저는 김민수입니다.', romanization: 'annyeonghaseyo. jeoneun gim minsuimnida.', english: 'Hello. I am Kim Minsu.' },
            { speaker: 'B', korean: '안녕하세요. 저는 박지영이에요.', romanization: 'annyeonghaseyo. jeoneun bak jiyoungeieyo.', english: 'Hello. I am Park Jiyoung.' },
            { speaker: 'A', korean: '만나서 반가워요.', romanization: 'mannaseo bangawoyo.', english: 'Nice to meet you.' },
            { speaker: 'B', korean: '저도 반가워요.', romanization: 'jeodo bangawoyo.', english: 'Nice to meet you too.' },
            { speaker: 'A', korean: '어느 나라에서 오셨어요?', romanization: 'eoneu naraeseo osyeosseoyo?', english: 'Which country are you from?' },
            { speaker: 'B', korean: '미국에서 왔어요.', romanization: 'migugeseo wasseoyo.', english: 'I am from America.' }
          ]
        }
      }
    ]
  },
  {
    id: 16,
    lesson_number: 9,
    title: "Animals and Nature",
    description: "Learn vocabulary for animals and natural elements",
    content_type: 'vocabulary',
    difficulty: 'beginner',
    estimated_time: 18,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "Animals and Nature",
          text: "Learn Korean words for animals and nature:",
          vocabulary: [
            { korean: '개', romanization: 'gae', english: 'dog', audio: 'gae.mp3' },
            { korean: '고양이', romanization: 'goyangi', english: 'cat', audio: 'goyangi.mp3' },
            { korean: '새', romanization: 'sae', english: 'bird', audio: 'sae.mp3' },
            { korean: '물고기', romanization: 'mulgogi', english: 'fish', audio: 'mulgogi.mp3' },
            { korean: '나무', romanization: 'namu', english: 'tree', audio: 'namu.mp3' },
            { korean: '꽃', romanization: 'kkot', english: 'flower', audio: 'kkot.mp3' },
            { korean: '하늘', romanization: 'haneul', english: 'sky', audio: 'haneul.mp3' },
            { korean: '바다', romanization: 'bada', english: 'sea', audio: 'bada.mp3' },
            { korean: '산', romanization: 'san', english: 'mountain', audio: 'san.mp3' },
            { korean: '강', romanization: 'gang', english: 'river', audio: 'gang.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 17,
    lesson_number: 10,
    title: "Basic Grammar - 을/를",
    description: "Learn how to use the Korean object particles 을/를",
    content_type: 'grammar',
    difficulty: 'beginner',
    estimated_time: 25,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "Object Particles 을/를",
          text: "을/를 are object particles that mark the direct object of a sentence:",
          grammar: {
            pattern: "Noun + 을/를",
            explanation: "Use 을 after consonants, 를 after vowels",
            examples: [
              { korean: '책을 읽어요', romanization: 'chaegul ilgeoyo', english: 'I read a book' },
              { korean: '음식을 먹어요', romanization: 'eumsigeul meogeoyo', english: 'I eat food' },
              { korean: '물을 마셔요', romanization: 'mureul masyeoyo', english: 'I drink water' },
              { korean: '친구를 만나요', romanization: 'chingureul mannayo', english: 'I meet a friend' }
            ],
            patterns: [
              {
                name: "을 (after consonants)",
                example: "책을 읽어요",
                romanization: "chaegul ilgeoyo",
                english: "I read a book"
              },
              {
                name: "를 (after vowels)",
                example: "친구를 만나요",
                romanization: "chingureul mannayo",
                english: "I meet a friend"
              }
            ]
          }
        }
      }
    ]
  }
]

// Intermediate Level Lessons
export const intermediateLessons: LessonContent[] = [
  {
    id: 18,
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
    id: 19,
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
  },
  {
    id: 22,
    lesson_number: 3,
    title: "Past Tense - 았/었/했",
    description: "Learn how to conjugate Korean verbs in the past tense",
    content_type: 'grammar',
    difficulty: 'intermediate',
    estimated_time: 28,
    level_id: 2,
    content: [
      {
        type: 'text',
        data: {
          title: "Past Tense Conjugation",
          text: "Korean past tense is formed by adding 았/었/했 to verb stems:",
          grammar: {
            pattern: "Verb stem + 았/었/했",
            explanation: "Use 았 after ㅏ/ㅗ vowels, 었 after other vowels, 했 for 하다 verbs",
            examples: [
              { korean: '먹었어요', romanization: 'meogeosseoyo', english: 'I ate' },
              { korean: '갔어요', romanization: 'gasseoyo', english: 'I went' },
              { korean: '공부했어요', romanization: 'gongbuhaesseoyo', english: 'I studied' },
              { korean: '만났어요', romanization: 'mannasseoyo', english: 'I met' }
            ],
            patterns: [
              {
                name: "았 (after ㅏ/ㅗ vowels)",
                example: "가다 → 갔어요",
                romanization: "gada → gasseoyo",
                english: "go → went"
              },
              {
                name: "었 (after other vowels)",
                example: "먹다 → 먹었어요",
                romanization: "meokda → meogeosseoyo",
                english: "eat → ate"
              },
              {
                name: "했 (for 하다 verbs)",
                example: "공부하다 → 공부했어요",
                romanization: "gongbuhada → gongbuhaesseoyo",
                english: "study → studied"
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 23,
    lesson_number: 4,
    title: "Future Tense - (으)ㄹ 거예요",
    description: "Learn how to express future plans and intentions in Korean",
    content_type: 'grammar',
    difficulty: 'intermediate',
    estimated_time: 25,
    level_id: 2,
    content: [
      {
        type: 'text',
        data: {
          title: "Future Tense - (으)ㄹ 거예요",
          text: "Use (으)ㄹ 거예요 to express future plans, intentions, or predictions:",
          grammar: {
            pattern: "Verb stem + (으)ㄹ 거예요",
            explanation: "Use 을 거예요 after consonants, ㄹ 거예요 after vowels",
            examples: [
              { korean: '내일 학교에 갈 거예요', romanization: 'naeil hakgyoe gal geoyeyo', english: 'I will go to school tomorrow' },
              { korean: '책을 읽을 거예요', romanization: 'chaegul ilgeul geoyeyo', english: 'I will read a book' },
              { korean: '친구를 만날 거예요', romanization: 'chingureul mannal geoyeyo', english: 'I will meet a friend' },
              { korean: '밥을 먹을 거예요', romanization: 'babeul meogeul geoyeyo', english: 'I will eat rice' }
            ],
            patterns: [
              {
                name: "을 거예요 (after consonants)",
                example: "읽다 → 읽을 거예요",
                romanization: "ikda → ilgeul geoyeyo",
                english: "read → will read"
              },
              {
                name: "ㄹ 거예요 (after vowels)",
                example: "가다 → 갈 거예요",
                romanization: "gada → gal geoyeyo",
                english: "go → will go"
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 24,
    lesson_number: 5,
    title: "Shopping Vocabulary",
    description: "Learn essential vocabulary for shopping in Korea",
    content_type: 'vocabulary',
    difficulty: 'intermediate',
    estimated_time: 22,
    level_id: 2,
    content: [
      {
        type: 'text',
        data: {
          title: "Shopping Vocabulary",
          text: "Essential words for shopping in Korea:",
          vocabulary: [
            { korean: '쇼핑', romanization: 'syoping', english: 'shopping', audio: 'syoping.mp3' },
            { korean: '가게', romanization: 'gage', english: 'store/shop', audio: 'gage.mp3' },
            { korean: '백화점', romanization: 'baekhwajeom', english: 'department store', audio: 'baekhwajeom.mp3' },
            { korean: '시장', romanization: 'sijang', english: 'market', audio: 'sijang.mp3' },
            { korean: '가격', romanization: 'gagyeok', english: 'price', audio: 'gagyeok.mp3' },
            { korean: '할인', romanization: 'harin', english: 'discount', audio: 'harin.mp3' },
            { korean: '계산', romanization: 'gyesan', english: 'calculation/payment', audio: 'gyesan.mp3' },
            { korean: '영수증', romanization: 'yeongsujeung', english: 'receipt', audio: 'yeongsujeung.mp3' },
            { korean: '카드', romanization: 'kadeu', english: 'card', audio: 'kadeu.mp3' },
            { korean: '현금', romanization: 'hyeongeum', english: 'cash', audio: 'hyeongeum.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 25,
    lesson_number: 6,
    title: "Shopping Conversation",
    description: "Learn how to shop and bargain in Korean stores",
    content_type: 'conversation',
    difficulty: 'intermediate',
    estimated_time: 30,
    level_id: 2,
    content: [
      {
        type: 'text',
        data: {
          title: "Shopping at a Store",
          text: "Here's a typical shopping conversation:",
          conversation: [
            { speaker: 'Customer', korean: '이 옷 얼마예요?', romanization: 'i ot eolmayeyo?', english: 'How much is this clothing?' },
            { speaker: 'Seller', korean: '3만원이에요.', romanization: 'sammawonieyo.', english: 'It\'s 30,000 won.' },
            { speaker: 'Customer', korean: '좀 깎아 주실 수 있어요?', romanization: 'jom kkakka jusil su isseoyo?', english: 'Can you give me a discount?' },
            { speaker: 'Seller', korean: '2만5천원에 드릴게요.', romanization: 'imaneocheonwone deurilgeyo.', english: 'I\'ll give it to you for 25,000 won.' },
            { speaker: 'Customer', korean: '네, 좋아요. 카드로 계산할게요.', romanization: 'ne, joayo. kadeuro gyesanhalgeyo.', english: 'Yes, good. I\'ll pay by card.' },
            { speaker: 'Seller', korean: '영수증 드릴게요.', romanization: 'yeongsujeung deurilgeyo.', english: 'I\'ll give you the receipt.' }
          ]
        }
      }
    ]
  },
  {
    id: 26,
    lesson_number: 7,
    title: "Transportation Vocabulary",
    description: "Learn vocabulary for using public transportation in Korea",
    content_type: 'vocabulary',
    difficulty: 'intermediate',
    estimated_time: 20,
    level_id: 2,
    content: [
      {
        type: 'text',
        data: {
          title: "Transportation Vocabulary",
          text: "Essential transportation vocabulary:",
          vocabulary: [
            { korean: '지하철', romanization: 'jihacheol', english: 'subway', audio: 'jihacheol.mp3' },
            { korean: '버스', romanization: 'beoseu', english: 'bus', audio: 'beoseu.mp3' },
            { korean: '택시', romanization: 'taeksi', english: 'taxi', audio: 'taeksi.mp3' },
            { korean: '기차', romanization: 'gicha', english: 'train', audio: 'gicha.mp3' },
            { korean: '비행기', romanization: 'bihaenggi', english: 'airplane', audio: 'bihaenggi.mp3' },
            { korean: '표', romanization: 'pyo', english: 'ticket', audio: 'pyo.mp3' },
            { korean: '역', romanization: 'yeok', english: 'station', audio: 'yeok.mp3' },
            { korean: '정류장', romanization: 'jeongnyujang', english: 'bus stop', audio: 'jeongnyujang.mp3' },
            { korean: '출발', romanization: 'chulbal', english: 'departure', audio: 'chulbal.mp3' },
            { korean: '도착', romanization: 'dochak', english: 'arrival', audio: 'dochak.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 27,
    lesson_number: 8,
    title: "Asking for Directions",
    description: "Learn how to ask for and give directions in Korean",
    content_type: 'conversation',
    difficulty: 'intermediate',
    estimated_time: 28,
    level_id: 2,
    content: [
      {
        type: 'text',
        data: {
          title: "Asking for Directions",
          text: "Learn how to ask for and give directions:",
          conversation: [
            { speaker: 'A', korean: '실례합니다. 지하철역이 어디에 있어요?', romanization: 'sillyehamnida. jihacheolyeogi eodie isseoyo?', english: 'Excuse me. Where is the subway station?' },
            { speaker: 'B', korean: '저기 건너편에 있어요.', romanization: 'jeogi geonneopyeone isseoyo.', english: 'It\'s across the street over there.' },
            { speaker: 'A', korean: '얼마나 걸려요?', romanization: 'eolmana geollyeoyo?', english: 'How long does it take?' },
            { speaker: 'B', korean: '도보로 5분 정도 걸려요.', romanization: 'doboro obun jeongdo geollyeoyo.', english: 'It takes about 5 minutes on foot.' },
            { speaker: 'A', korean: '감사합니다.', romanization: 'gamsahamnida.', english: 'Thank you.' },
            { speaker: 'B', korean: '천만에요.', romanization: 'cheonmaneyo.', english: 'You\'re welcome.' }
          ]
        }
      }
    ]
  },
  {
    id: 28,
    lesson_number: 9,
    title: "Weather and Seasons",
    description: "Learn vocabulary related to weather and seasons",
    content_type: 'vocabulary',
    difficulty: 'intermediate',
    estimated_time: 18,
    level_id: 2,
    content: [
      {
        type: 'text',
        data: {
          title: "Weather and Seasons",
          text: "Learn weather and seasonal vocabulary:",
          vocabulary: [
            { korean: '날씨', romanization: 'nalssi', english: 'weather', audio: 'nalssi.mp3' },
            { korean: '봄', romanization: 'bom', english: 'spring', audio: 'bom.mp3' },
            { korean: '여름', romanization: 'yeoreum', english: 'summer', audio: 'yeoreum.mp3' },
            { korean: '가을', romanization: 'ga-eul', english: 'autumn', audio: 'ga-eul.mp3' },
            { korean: '겨울', romanization: 'gyeoul', english: 'winter', audio: 'gyeoul.mp3' },
            { korean: '맑음', romanization: 'malgeum', english: 'sunny', audio: 'malgeum.mp3' },
            { korean: '흐림', romanization: 'heurim', english: 'cloudy', audio: 'heurim.mp3' },
            { korean: '비', romanization: 'bi', english: 'rain', audio: 'bi.mp3' },
            { korean: '눈', romanization: 'nun', english: 'snow', audio: 'nun.mp3' },
            { korean: '바람', romanization: 'baram', english: 'wind', audio: 'baram.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 29,
    lesson_number: 10,
    title: "Talking About Weather",
    description: "Learn how to discuss weather conditions in Korean",
    content_type: 'conversation',
    difficulty: 'intermediate',
    estimated_time: 25,
    level_id: 2,
    content: [
      {
        type: 'text',
        data: {
          title: "Weather Conversation",
          text: "Learn how to talk about weather:",
          conversation: [
            { speaker: 'A', korean: '오늘 날씨가 어때요?', romanization: 'oneul nalssiga eottaeyo?', english: 'How is the weather today?' },
            { speaker: 'B', korean: '맑고 따뜻해요.', romanization: 'malgo ttatteushaeyo.', english: 'It\'s sunny and warm.' },
            { speaker: 'A', korean: '내일은 비가 올 것 같아요.', romanization: 'naeireun biga ol geot gatayo.', english: 'It looks like it will rain tomorrow.' },
            { speaker: 'B', korean: '우산을 가져가세요.', romanization: 'usaneul gajyeogaseyo.', english: 'Take an umbrella.' },
            { speaker: 'A', korean: '네, 알겠습니다.', romanization: 'ne, algetseumnida.', english: 'Yes, I understand.' }
          ]
        }
      }
    ]
  }
]

// Advanced Level Lessons
export const advancedLessons: LessonContent[] = [
  {
    id: 30,
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
    id: 31,
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
