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

// Basic lessons removed - Hangeul learning is available in /hangeul page

// Beginner Level Lessons - Korean Syllable Practice
export const beginnerLessons: LessonContent[] = [
  {
    id: 4,
    lesson_number: 1,
    title: "가~하",
    description: "Learn Korean syllables from 가 to 하",
    content_type: 'hangeul',
    difficulty: 'beginner',
    estimated_time: 15,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "가~하 Syllables",
          text: "Practice reading Korean syllables from 가 to 하. These are basic Korean syllables combining consonants with the vowel 'ㅏ' (a):",
          syllables: [
            { korean: '가', romanization: 'ga', english: 'go', audio: 'ga.mp3' },
            { korean: '나', romanization: 'na', english: 'I/me', audio: 'na.mp3' },
            { korean: '다', romanization: 'da', english: 'all', audio: 'da.mp3' },
            { korean: '라', romanization: 'ra', english: 'la (musical note)', audio: 'ra.mp3' },
            { korean: '마', romanization: 'ma', english: 'horse', audio: 'ma.mp3' },
            { korean: '바', romanization: 'ba', english: 'bar', audio: 'ba.mp3' },
            { korean: '사', romanization: 'sa', english: 'four', audio: 'sa.mp3' },
            { korean: '아', romanization: 'a', english: 'ah', audio: 'a.mp3' },
            { korean: '자', romanization: 'ja', english: 'sleep', audio: 'ja.mp3' },
            { korean: '차', romanization: 'cha', english: 'car', audio: 'cha.mp3' },
            { korean: '카', romanization: 'ka', english: 'card', audio: 'ka.mp3' },
            { korean: '타', romanization: 'ta', english: 'ride', audio: 'ta.mp3' },
            { korean: '파', romanization: 'pa', english: 'wave', audio: 'pa.mp3' },
            { korean: '하', romanization: 'ha', english: 'do', audio: 'ha.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 5,
    lesson_number: 2,
    title: "갸~햐",
    description: "Learn Korean syllables from 갸 to 햐",
    content_type: 'hangeul',
    difficulty: 'beginner',
    estimated_time: 15,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "갸~햐 Syllables",
          text: "Practice reading Korean syllables from 갸 to 햐:",
          syllables: [
            { korean: '갸', romanization: 'gya', english: 'gya', audio: 'gya.mp3' },
            { korean: '냐', romanization: 'nya', english: 'nya', audio: 'nya.mp3' },
            { korean: '댜', romanization: 'dya', english: 'dya', audio: 'dya.mp3' },
            { korean: '랴', romanization: 'rya', english: 'rya', audio: 'rya.mp3' },
            { korean: '먀', romanization: 'mya', english: 'mya', audio: 'mya.mp3' },
            { korean: '뱌', romanization: 'bya', english: 'bya', audio: 'bya.mp3' },
            { korean: '샤', romanization: 'sya', english: 'sya', audio: 'sya.mp3' },
            { korean: '야', romanization: 'ya', english: 'ya', audio: 'ya.mp3' },
            { korean: '쟈', romanization: 'jya', english: 'jya', audio: 'jya.mp3' },
            { korean: '챠', romanization: 'chya', english: 'chya', audio: 'chya.mp3' },
            { korean: '캬', romanization: 'kya', english: 'kya', audio: 'kya.mp3' },
            { korean: '탸', romanization: 'tya', english: 'tya', audio: 'tya.mp3' },
            { korean: '퍄', romanization: 'pya', english: 'pya', audio: 'pya.mp3' },
            { korean: '햐', romanization: 'hya', english: 'hya', audio: 'hya.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 6,
    lesson_number: 3,
    title: "거~허",
    description: "Learn Korean syllables from 거 to 허",
    content_type: 'hangeul',
    difficulty: 'beginner',
    estimated_time: 15,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "거~허 Syllables",
          text: "Practice reading Korean syllables from 거 to 허:",
          syllables: [
            { korean: '거', romanization: 'geo', english: 'thing', audio: 'geo.mp3' },
            { korean: '너', romanization: 'neo', english: 'you', audio: 'neo.mp3' },
            { korean: '더', romanization: 'deo', english: 'more', audio: 'deo.mp3' },
            { korean: '러', romanization: 'reo', english: 'reo', audio: 'reo.mp3' },
            { korean: '머', romanization: 'meo', english: 'meo', audio: 'meo.mp3' },
            { korean: '버', romanization: 'beo', english: 'beo', audio: 'beo.mp3' },
            { korean: '서', romanization: 'seo', english: 'seo', audio: 'seo.mp3' },
            { korean: '어', romanization: 'eo', english: 'eo', audio: 'eo.mp3' },
            { korean: '저', romanization: 'jeo', english: 'I/me (humble)', audio: 'jeo.mp3' },
            { korean: '처', romanization: 'cheo', english: 'cheo', audio: 'cheo.mp3' },
            { korean: '커', romanization: 'keo', english: 'keo', audio: 'keo.mp3' },
            { korean: '터', romanization: 'teo', english: 'teo', audio: 'teo.mp3' },
            { korean: '퍼', romanization: 'peo', english: 'peo', audio: 'peo.mp3' },
            { korean: '허', romanization: 'heo', english: 'heo', audio: 'heo.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 11,
    lesson_number: 4,
    title: "겨~혀",
    description: "Learn Korean syllables from 겨 to 혀",
    content_type: 'hangeul',
    difficulty: 'beginner',
    estimated_time: 15,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "겨~혀 Syllables",
          text: "Practice reading Korean syllables from 겨 to 혀:",
          syllables: [
            { korean: '겨', romanization: 'gyeo', english: 'gyeo', audio: 'gyeo.mp3' },
            { korean: '녀', romanization: 'nyeo', english: 'nyeo', audio: 'nyeo.mp3' },
            { korean: '뎌', romanization: 'dyeo', english: 'dyeo', audio: 'dyeo.mp3' },
            { korean: '려', romanization: 'ryeo', english: 'ryeo', audio: 'ryeo.mp3' },
            { korean: '며', romanization: 'myeo', english: 'myeo', audio: 'myeo.mp3' },
            { korean: '벼', romanization: 'byeo', english: 'byeo', audio: 'byeo.mp3' },
            { korean: '셔', romanization: 'syeo', english: 'syeo', audio: 'syeo.mp3' },
            { korean: '여', romanization: 'yeo', english: 'yeo', audio: 'yeo.mp3' },
            { korean: '져', romanization: 'jyeo', english: 'jyeo', audio: 'jyeo.mp3' },
            { korean: '쳐', romanization: 'chyeo', english: 'chyeo', audio: 'chyeo.mp3' },
            { korean: '켜', romanization: 'kyeo', english: 'kyeo', audio: 'kyeo.mp3' },
            { korean: '텨', romanization: 'tyeo', english: 'tyeo', audio: 'tyeo.mp3' },
            { korean: '펴', romanization: 'pyeo', english: 'pyeo', audio: 'pyeo.mp3' },
            { korean: '혀', romanization: 'hyeo', english: 'hyeo', audio: 'hyeo.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 12,
    lesson_number: 5,
    title: "고~호",
    description: "Learn Korean syllables from 고 to 호",
    content_type: 'hangeul',
    difficulty: 'beginner',
    estimated_time: 15,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "고~호 Syllables",
          text: "Practice reading Korean syllables from 고 to 호:",
          syllables: [
            { korean: '고', romanization: 'go', english: 'go', audio: 'go.mp3' },
            { korean: '노', romanization: 'no', english: 'no', audio: 'no.mp3' },
            { korean: '도', romanization: 'do', english: 'do', audio: 'do.mp3' },
            { korean: '로', romanization: 'ro', english: 'ro', audio: 'ro.mp3' },
            { korean: '모', romanization: 'mo', english: 'mo', audio: 'mo.mp3' },
            { korean: '보', romanization: 'bo', english: 'bo', audio: 'bo.mp3' },
            { korean: '소', romanization: 'so', english: 'so', audio: 'so.mp3' },
            { korean: '오', romanization: 'o', english: 'o', audio: 'o.mp3' },
            { korean: '조', romanization: 'jo', english: 'jo', audio: 'jo.mp3' },
            { korean: '초', romanization: 'cho', english: 'cho', audio: 'cho.mp3' },
            { korean: '코', romanization: 'ko', english: 'ko', audio: 'ko.mp3' },
            { korean: '토', romanization: 'to', english: 'to', audio: 'to.mp3' },
            { korean: '포', romanization: 'po', english: 'po', audio: 'po.mp3' },
            { korean: '호', romanization: 'ho', english: 'ho', audio: 'ho.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 13,
    lesson_number: 6,
    title: "교~효",
    description: "Learn Korean syllables from 교 to 효",
    content_type: 'hangeul',
    difficulty: 'beginner',
    estimated_time: 15,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "교~효 Syllables",
          text: "Practice reading Korean syllables from 교 to 효:",
          syllables: [
            { korean: '교', romanization: 'gyo', english: 'gyo', audio: 'gyo.mp3' },
            { korean: '뇨', romanization: 'nyo', english: 'nyo', audio: 'nyo.mp3' },
            { korean: '됴', romanization: 'dyo', english: 'dyo', audio: 'dyo.mp3' },
            { korean: '료', romanization: 'ryo', english: 'ryo', audio: 'ryo.mp3' },
            { korean: '묘', romanization: 'myo', english: 'myo', audio: 'myo.mp3' },
            { korean: '뵤', romanization: 'byo', english: 'byo', audio: 'byo.mp3' },
            { korean: '쇼', romanization: 'syo', english: 'syo', audio: 'syo.mp3' },
            { korean: '요', romanization: 'yo', english: 'yo', audio: 'yo.mp3' },
            { korean: '죠', romanization: 'jyo', english: 'jyo', audio: 'jyo.mp3' },
            { korean: '쵸', romanization: 'chyo', english: 'chyo', audio: 'chyo.mp3' },
            { korean: '쿄', romanization: 'kyo', english: 'kyo', audio: 'kyo.mp3' },
            { korean: '툐', romanization: 'tyo', english: 'tyo', audio: 'tyo.mp3' },
            { korean: '표', romanization: 'pyo', english: 'pyo', audio: 'pyo.mp3' },
            { korean: '효', romanization: 'hyo', english: 'hyo', audio: 'hyo.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 14,
    lesson_number: 7,
    title: "구~후",
    description: "Learn Korean syllables from 구 to 후",
    content_type: 'hangeul',
    difficulty: 'beginner',
    estimated_time: 15,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "구~후 Syllables",
          text: "Practice reading Korean syllables from 구 to 후:",
          syllables: [
            { korean: '구', romanization: 'gu', english: 'gu', audio: 'gu.mp3' },
            { korean: '누', romanization: 'nu', english: 'nu', audio: 'nu.mp3' },
            { korean: '두', romanization: 'du', english: 'du', audio: 'du.mp3' },
            { korean: '루', romanization: 'ru', english: 'ru', audio: 'ru.mp3' },
            { korean: '무', romanization: 'mu', english: 'mu', audio: 'mu.mp3' },
            { korean: '부', romanization: 'bu', english: 'bu', audio: 'bu.mp3' },
            { korean: '수', romanization: 'su', english: 'su', audio: 'su.mp3' },
            { korean: '우', romanization: 'u', english: 'u', audio: 'u.mp3' },
            { korean: '주', romanization: 'ju', english: 'ju', audio: 'ju.mp3' },
            { korean: '추', romanization: 'chu', english: 'chu', audio: 'chu.mp3' },
            { korean: '쿠', romanization: 'ku', english: 'ku', audio: 'ku.mp3' },
            { korean: '투', romanization: 'tu', english: 'tu', audio: 'tu.mp3' },
            { korean: '푸', romanization: 'pu', english: 'pu', audio: 'pu.mp3' },
            { korean: '후', romanization: 'hu', english: 'hu', audio: 'hu.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 15,
    lesson_number: 8,
    title: "규~휴",
    description: "Learn Korean syllables from 규 to 휴",
    content_type: 'hangeul',
    difficulty: 'beginner',
    estimated_time: 15,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "규~휴 Syllables",
          text: "Practice reading Korean syllables from 규 to 휴:",
          syllables: [
            { korean: '규', romanization: 'gyu', english: 'gyu', audio: 'gyu.mp3' },
            { korean: '뉴', romanization: 'nyu', english: 'nyu', audio: 'nyu.mp3' },
            { korean: '듀', romanization: 'dyu', english: 'dyu', audio: 'dyu.mp3' },
            { korean: '류', romanization: 'ryu', english: 'ryu', audio: 'ryu.mp3' },
            { korean: '뮤', romanization: 'myu', english: 'myu', audio: 'myu.mp3' },
            { korean: '뷰', romanization: 'byu', english: 'byu', audio: 'byu.mp3' },
            { korean: '슈', romanization: 'syu', english: 'syu', audio: 'syu.mp3' },
            { korean: '유', romanization: 'yu', english: 'yu', audio: 'yu.mp3' },
            { korean: '쥬', romanization: 'jyu', english: 'jyu', audio: 'jyu.mp3' },
            { korean: '츄', romanization: 'chyu', english: 'chyu', audio: 'chyu.mp3' },
            { korean: '큐', romanization: 'kyu', english: 'kyu', audio: 'kyu.mp3' },
            { korean: '튜', romanization: 'tyu', english: 'tyu', audio: 'tyu.mp3' },
            { korean: '퓨', romanization: 'pyu', english: 'pyu', audio: 'pyu.mp3' },
            { korean: '휴', romanization: 'hyu', english: 'hyu', audio: 'hyu.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 16,
    lesson_number: 9,
    title: "그~흐",
    description: "Learn Korean syllables from 그 to 흐",
    content_type: 'hangeul',
    difficulty: 'beginner',
    estimated_time: 15,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "그~흐 Syllables",
          text: "Practice reading Korean syllables from 그 to 흐:",
          syllables: [
            { korean: '그', romanization: 'geu', english: 'geu', audio: 'geu.mp3' },
            { korean: '느', romanization: 'neu', english: 'neu', audio: 'neu.mp3' },
            { korean: '드', romanization: 'deu', english: 'deu', audio: 'deu.mp3' },
            { korean: '르', romanization: 'reu', english: 'reu', audio: 'reu.mp3' },
            { korean: '므', romanization: 'meu', english: 'meu', audio: 'meu.mp3' },
            { korean: '브', romanization: 'beu', english: 'beu', audio: 'beu.mp3' },
            { korean: '스', romanization: 'seu', english: 'seu', audio: 'seu.mp3' },
            { korean: '으', romanization: 'eu', english: 'eu', audio: 'eu.mp3' },
            { korean: '즈', romanization: 'jeu', english: 'jeu', audio: 'jeu.mp3' },
            { korean: '츠', romanization: 'cheu', english: 'cheu', audio: 'cheu.mp3' },
            { korean: '크', romanization: 'keu', english: 'keu', audio: 'keu.mp3' },
            { korean: '트', romanization: 'teu', english: 'teu', audio: 'teu.mp3' },
            { korean: '프', romanization: 'peu', english: 'peu', audio: 'peu.mp3' },
            { korean: '흐', romanization: 'heu', english: 'heu', audio: 'heu.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 17,
    lesson_number: 10,
    title: "기~히",
    description: "Learn Korean syllables from 기 to 히",
    content_type: 'hangeul',
    difficulty: 'beginner',
    estimated_time: 15,
    level_id: 1,
    content: [
      {
        type: 'text',
        data: {
          title: "기~히 Syllables",
          text: "Practice reading Korean syllables from 기 to 히:",
          syllables: [
            { korean: '기', romanization: 'gi', english: 'gi', audio: 'gi.mp3' },
            { korean: '니', romanization: 'ni', english: 'ni', audio: 'ni.mp3' },
            { korean: '디', romanization: 'di', english: 'di', audio: 'di.mp3' },
            { korean: '리', romanization: 'ri', english: 'ri', audio: 'ri.mp3' },
            { korean: '미', romanization: 'mi', english: 'mi', audio: 'mi.mp3' },
            { korean: '비', romanization: 'bi', english: 'bi', audio: 'bi.mp3' },
            { korean: '시', romanization: 'si', english: 'si', audio: 'si.mp3' },
            { korean: '이', romanization: 'i', english: 'i', audio: 'i.mp3' },
            { korean: '지', romanization: 'ji', english: 'ji', audio: 'ji.mp3' },
            { korean: '치', romanization: 'chi', english: 'chi', audio: 'chi.mp3' },
            { korean: '키', romanization: 'ki', english: 'ki', audio: 'ki.mp3' },
            { korean: '티', romanization: 'ti', english: 'ti', audio: 'ti.mp3' },
            { korean: '피', romanization: 'pi', english: 'pi', audio: 'pi.mp3' },
            { korean: '히', romanization: 'hi', english: 'hi', audio: 'hi.mp3' }
          ]
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
    title: "Numbers 1-10",
    description: "Learn Korean numbers from 1 to 10",
    content_type: 'vocabulary',
    difficulty: 'intermediate',
    estimated_time: 15,
    level_id: 2,
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
    id: 19,
    lesson_number: 2,
    title: "10,20,30,40,50,60,70,80,90,100",
    description: "Learn Korean numbers in tens",
    content_type: 'vocabulary',
    difficulty: 'intermediate',
    estimated_time: 15,
    level_id: 2,
    content: [
      {
        type: 'text',
        data: {
          title: "Korean Numbers in Tens",
          text: "Learn Korean numbers in tens (십 단위):",
          vocabulary: [
            { korean: '10', romanization: 'sip', english: 'ten', audio: 'sip.mp3' },
            { korean: '20', romanization: 'isip', english: 'twenty', audio: 'isip.mp3' },
            { korean: '30', romanization: 'samsip', english: 'thirty', audio: 'samsip.mp3' },
            { korean: '40', romanization: 'sasip', english: 'forty', audio: 'sasip.mp3' },
            { korean: '50', romanization: 'osip', english: 'fifty', audio: 'osip.mp3' },
            { korean: '60', romanization: 'yuksip', english: 'sixty', audio: 'yuksip.mp3' },
            { korean: '70', romanization: 'chilsip', english: 'seventy', audio: 'chilsip.mp3' },
            { korean: '80', romanization: 'palsip', english: 'eighty', audio: 'palsip.mp3' },
            { korean: '90', romanization: 'gusip', english: 'ninety', audio: 'gusip.mp3' },
            { korean: '100', romanization: 'baek', english: 'hundred', audio: 'baek.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 22,
    lesson_number: 3,
    title: "Colors and Shapes",
    description: "Learn Korean words for colors and basic shapes",
    content_type: 'vocabulary',
    difficulty: 'intermediate',
    estimated_time: 18,
    level_id: 2,
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
    id: 23,
    lesson_number: 4,
    title: "Time and Days",
    description: "Learn how to tell time and days of the week in Korean",
    content_type: 'vocabulary',
    difficulty: 'intermediate',
    estimated_time: 20,
    level_id: 2,
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
    id: 24,
    lesson_number: 5,
    title: "Animals and Nature",
    description: "Learn vocabulary for animals and natural elements",
    content_type: 'vocabulary',
    difficulty: 'intermediate',
    estimated_time: 18,
    level_id: 2,
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
    id: 25,
    lesson_number: 6,
    title: "Food and Drinks",
    description: "Learn vocabulary for common Korean foods and beverages",
    content_type: 'vocabulary',
    difficulty: 'intermediate',
    estimated_time: 22,
    level_id: 2,
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
    title: "Family Members",
    description: "Learn vocabulary for family members in Korean",
    content_type: 'vocabulary',
    difficulty: 'intermediate',
    estimated_time: 20,
    level_id: 2,
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
    id: 28,
    lesson_number: 9,
    title: "Greetings and Basic Expressions",
    description: "Learn essential Korean greetings and polite expressions",
    content_type: 'vocabulary',
    difficulty: 'intermediate',
    estimated_time: 20,
    level_id: 2,
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
    id: 29,
    lesson_number: 10,
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
  }
]

// Advanced Level Lessons - Grammar Usage, Real-life Conversations, and Social Topics
export const advancedLessons: LessonContent[] = [
  // 1. 기본 문법 활용 Lessons (5개)
  {
    id: 30,
    lesson_number: 1,
    title: "다양한 시제 표현",
    description: "Learn various tenses in Korean: past, present, and future",
    content_type: 'grammar',
    difficulty: 'advanced',
    estimated_time: 25,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Korean Tenses - Past, Present, Future",
          text: "Master different tenses to express time accurately in Korean:",
          grammar: {
            patterns: [
              {
                name: "Past Tense (~았/었어요)",
                example: "어제 영화를 봤어요.",
                romanization: "eoje yeonghwareul bwasseoyo.",
                english: "I watched a movie yesterday."
              },
              {
                name: "Present Tense (~어요/아요)",
                example: "지금 공부해요.",
                romanization: "jigeum gongbuhaeyo.",
                english: "I am studying now."
              },
              {
                name: "Present Progressive (~고 있어요)",
                example: "지금 밥을 먹고 있어요.",
                romanization: "jigeum babeul meokgo isseoyo.",
                english: "I am eating rice now."
              },
              {
                name: "Future Tense (~(으)ㄹ 거예요)",
                example: "내일 친구를 만날 거예요.",
                romanization: "naeil chingureul mannal geoyeyo.",
                english: "I will meet my friend tomorrow."
              },
              {
                name: "Future Intent (~(으)려고 해요)",
                example: "한국어를 배우려고 해요.",
                romanization: "hangukeoreul baeuryeogo haeyo.",
                english: "I intend to learn Korean."
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
    title: "자주 쓰는 동사와 형용사",
    description: "Essential verbs and adjectives for daily communication",
    content_type: 'vocabulary',
    difficulty: 'advanced',
    estimated_time: 22,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Essential Verbs and Adjectives",
          text: "Master the most commonly used verbs and adjectives in Korean:",
          vocabulary: [
            { korean: '하다', romanization: 'hada', english: 'to do', audio: 'hada.mp3' },
            { korean: '가다', romanization: 'gada', english: 'to go', audio: 'gada.mp3' },
            { korean: '오다', romanization: 'oda', english: 'to come', audio: 'oda.mp3' },
            { korean: '보다', romanization: 'boda', english: 'to see/watch', audio: 'boda.mp3' },
            { korean: '듣다', romanization: 'deutda', english: 'to listen/hear', audio: 'deutda.mp3' },
            { korean: '말하다', romanization: 'malhada', english: 'to speak', audio: 'malhada.mp3' },
            { korean: '생각하다', romanization: 'saenggakhada', english: 'to think', audio: 'saenggakhada.mp3' },
            { korean: '좋다', romanization: 'jota', english: 'to be good', audio: 'jota.mp3' },
            { korean: '나쁘다', romanization: 'nappeuda', english: 'to be bad', audio: 'nappeuda.mp3' },
            { korean: '크다', romanization: 'keuda', english: 'to be big', audio: 'keuda.mp3' },
            { korean: '작다', romanization: 'jakda', english: 'to be small', audio: 'jakda.mp3' },
            { korean: '예쁘다', romanization: 'yeppeuda', english: 'to be pretty', audio: 'yeppeuda.mp3' }
          ]
        }
      }
    ]
  },
  {
    id: 32,
    lesson_number: 3,
    title: "과거 시제 ~았/었어요",
    description: "Master the past tense conjugation patterns",
    content_type: 'grammar',
    difficulty: 'advanced',
    estimated_time: 20,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Past Tense ~았/었어요",
          text: "Learn how to conjugate verbs and adjectives in the past tense:",
          grammar: {
            pattern: "Verb/Adjective stem + ~았어요 (if stem ends with ㅏ, ㅗ) / ~었어요 (if stem ends with other vowels)",
            examples: [
              {
                korean: "어제 친구를 만났어요.",
                romanization: "eoje chingureul mannasseoyo.",
                english: "I met my friend yesterday."
              },
              {
                korean: "지난 주에 영화를 봤어요.",
                romanization: "jinan jue yeonghwareul bwasseoyo.",
                english: "I watched a movie last week."
              },
              {
                korean: "어제 날씨가 좋았어요.",
                romanization: "eoje nalssiga joasseoyo.",
                english: "The weather was good yesterday."
              },
              {
                korean: "그 영화가 재미있었어요.",
                romanization: "geu yeonghwaga jaemiisseosseoyo.",
                english: "That movie was interesting."
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 33,
    lesson_number: 4,
    title: "진행형 ~고 있어요",
    description: "Learn to express ongoing actions with progressive tense",
    content_type: 'grammar',
    difficulty: 'advanced',
    estimated_time: 18,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Progressive Tense ~고 있어요",
          text: "Express actions that are currently happening:",
          grammar: {
            pattern: "Verb stem + ~고 있어요",
            examples: [
              {
                korean: "지금 공부하고 있어요.",
                romanization: "jigeum gongbuhago isseoyo.",
                english: "I am studying now."
              },
              {
                korean: "친구가 기다리고 있어요.",
                romanization: "chinguga gidarigo isseoyo.",
                english: "My friend is waiting."
              },
              {
                korean: "엄마가 요리하고 있어요.",
                romanization: "eommaga yorihago isseoyo.",
                english: "Mom is cooking."
              },
              {
                korean: "비가 오고 있어요.",
                romanization: "biga ogo isseoyo.",
                english: "It is raining."
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 34,
    lesson_number: 5,
    title: "장소와 교통 표현",
    description: "Learn location and transportation expressions",
    content_type: 'vocabulary',
    difficulty: 'advanced',
    estimated_time: 25,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Location and Transportation Expressions",
          text: "Essential vocabulary for describing places and using transportation:",
          vocabulary: [
            { korean: '위에', romanization: 'wie', english: 'on top of', audio: 'wie.mp3' },
            { korean: '아래에', romanization: 'araee', english: 'under/below', audio: 'araee.mp3' },
            { korean: '앞에', romanization: 'ape', english: 'in front of', audio: 'ape.mp3' },
            { korean: '뒤에', romanization: 'dwie', english: 'behind', audio: 'dwie.mp3' },
            { korean: '옆에', romanization: 'yeope', english: 'next to', audio: 'yeope.mp3' },
            { korean: '안에', romanization: 'ane', english: 'inside', audio: 'ane.mp3' },
            { korean: '밖에', romanization: 'bakke', english: 'outside', audio: 'bakke.mp3' },
            { korean: '지하철', romanization: 'jihacheol', english: 'subway', audio: 'jihacheol.mp3' },
            { korean: '버스', romanization: 'beoseu', english: 'bus', audio: 'beoseu.mp3' },
            { korean: '택시', romanization: 'taeksi', english: 'taxi', audio: 'taeksi.mp3' },
            { korean: '도보로', romanization: 'doboro', english: 'on foot', audio: 'doboro.mp3' },
            { korean: '자전거로', romanization: 'jajeongeoro', english: 'by bicycle', audio: 'jajeongeoro.mp3' }
          ]
        }
      }
    ]
  },

  // 2. 실생활 대화 Lessons (5개)
  {
    id: 35,
    lesson_number: 6,
    title: "복잡한 문장 연결하기",
    description: "Learn to connect complex sentences using conjunctions",
    content_type: 'conversation',
    difficulty: 'advanced',
    estimated_time: 28,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Connecting Complex Sentences",
          text: "Master the art of connecting sentences for fluent conversation:",
          conversation: [
            {
              speaker: "A",
              korean: "한국어를 배우고 있는데, 아직 어려워요.",
              romanization: "hangukeoreul baeugo inneunde, ajik eoryeowoyo.",
              english: "I'm learning Korean, but it's still difficult."
            },
            {
              speaker: "B",
              korean: "그래도 열심히 공부하시니까, 곧 잘하게 될 거예요.",
              romanization: "geuraedo yeolsimhi gongbuhasinikka, got jalhage doel geoyeyo.",
              english: "Even so, since you're studying hard, you'll get good at it soon."
            },
            {
              speaker: "A",
              korean: "한국 친구들과 대화하고 싶어서, 더 열심히 해야겠어요.",
              romanization: "hanguk chingudeulgwa daehwahago sipeoseo, deo yeolsimhi haeyagesseoyo.",
              english: "I want to have conversations with Korean friends, so I need to study harder."
            },
            {
              speaker: "B",
              korean: "맞아요. 실생활에서 사용해보면 더 빨리 늘어요.",
              romanization: "majayo. silsaenghwareseo sayonghaebomyeon deo ppalli neureoyo.",
              english: "That's right. If you use it in real life, you'll improve faster."
            }
          ]
        }
      }
    ]
  },
  {
    id: 36,
    lesson_number: 7,
    title: "존댓말과 반말 사용법",
    description: "Learn formal and informal speech levels",
    content_type: 'conversation',
    difficulty: 'advanced',
    estimated_time: 25,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Formal and Informal Speech Levels",
          text: "Understand when to use formal (존댓말) and informal (반말) speech:",
          conversation: [
            {
              speaker: "Formal (존댓말)",
              korean: "안녕하세요. 오늘 날씨가 좋네요.",
              romanization: "annyeonghaseyo. oneul nalssiga joneyo.",
              english: "Hello. The weather is nice today."
            },
            {
              speaker: "Informal (반말)",
              korean: "안녕. 오늘 날씨 좋네.",
              romanization: "annyeong. oneul nalssi jone.",
              english: "Hi. The weather is nice today."
            },
            {
              speaker: "Formal (존댓말)",
              korean: "어디 가세요?",
              romanization: "eodi gaseyo?",
              english: "Where are you going?"
            },
            {
              speaker: "Informal (반말)",
              korean: "어디 가?",
              romanization: "eodi ga?",
              english: "Where are you going?"
            },
            {
              speaker: "Formal (존댓말)",
              korean: "감사합니다.",
              romanization: "gamsahamnida.",
              english: "Thank you."
            },
            {
              speaker: "Informal (반말)",
              korean: "고마워.",
              romanization: "gomawo.",
              english: "Thanks."
            }
          ]
        }
      }
    ]
  },
  {
    id: 37,
    lesson_number: 8,
    title: "이유와 원인 표현 ~아서/어서",
    description: "Learn to express reasons and causes",
    content_type: 'grammar',
    difficulty: 'advanced',
    estimated_time: 22,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Expressing Reasons and Causes ~아서/어서",
          text: "Master expressing reasons and causes in Korean:",
          grammar: {
            pattern: "Verb/Adjective stem + ~아서 (if stem ends with ㅏ, ㅗ) / ~어서 (if stem ends with other vowels)",
            examples: [
              {
                korean: "비가 와서 집에 있었어요.",
                romanization: "biga waseo jibe isseosseoyo.",
                english: "I stayed home because it was raining."
              },
              {
                korean: "배가 고파서 밥을 먹었어요.",
                romanization: "baega gopaseo babeul meogeosseoyo.",
                english: "I ate because I was hungry."
              },
              {
                korean: "시간이 없어서 택시를 탔어요.",
                romanization: "sigani eopseoseo taeksireul tasseoyo.",
                english: "I took a taxi because I didn't have time."
              },
              {
                korean: "한국어가 어려워서 매일 공부해요.",
                romanization: "hangukeoga eoryeowoseo maeil gongbuhaeyo.",
                english: "I study every day because Korean is difficult."
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 38,
    lesson_number: 9,
    title: "청유 표현 ~읍시다",
    description: "Learn to make suggestions and invitations",
    content_type: 'conversation',
    difficulty: 'advanced',
    estimated_time: 20,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Making Suggestions ~읍시다",
          text: "Learn to make polite suggestions and invitations:",
          conversation: [
            {
              speaker: "A",
              korean: "오늘 날씨가 좋으니까 산책하러 갑시다.",
              romanization: "oneul nalssiga joeunikka sanchaekareo gapsida.",
              english: "Since the weather is nice today, let's go for a walk."
            },
            {
              speaker: "B",
              korean: "좋은 아이디어네요. 어디로 갈까요?",
              romanization: "joeun aideoneyo. eodiro galkkayo?",
              english: "That's a good idea. Where should we go?"
            },
            {
              speaker: "A",
              korean: "공원에 가서 앉아서 이야기합시다.",
              romanization: "gongwone gaseo anjaseo iyagihapsida.",
              english: "Let's go to the park and sit down to talk."
            },
            {
              speaker: "B",
              korean: "그리고 커피도 마시면서 휴식을 취합시다.",
              romanization: "geurigo keopido masimyeonseo hyusigeul chwihapsida.",
              english: "And let's rest while drinking coffee."
            }
          ]
        }
      }
    ]
  },
  {
    id: 39,
    lesson_number: 10,
    title: "변화 표현 ~게 되다",
    description: "Learn to express changes and becoming",
    content_type: 'grammar',
    difficulty: 'advanced',
    estimated_time: 23,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Expressing Changes ~게 되다",
          text: "Master expressing changes, becoming, and transitions:",
          grammar: {
            pattern: "Verb stem + ~게 되다",
            examples: [
              {
                korean: "한국에 오게 되었어요.",
                romanization: "hanguge oge doeeosseoyo.",
                english: "I came to Korea (it happened that I came)."
              },
              {
                korean: "한국어를 배우게 되었어요.",
                romanization: "hangukeoreul baeuge doeeosseoyo.",
                english: "I started learning Korean (it happened that I learned)."
              },
              {
                korean: "친구를 사귀게 되었어요.",
                romanization: "chingureul sagwige doeeosseoyo.",
                english: "I made friends (it happened that I made friends)."
              },
              {
                korean: "한국 음식을 좋아하게 되었어요.",
                romanization: "hanguk eumsigeul joahage doeeosseoyo.",
                english: "I came to like Korean food (it happened that I like it)."
              }
            ]
          }
        }
      }
    ]
  },

  // 3. 사회적/추상적 주제 대화 Lessons (5개)
  {
    id: 40,
    lesson_number: 11,
    title: "뉴스와 기사 읽기",
    description: "Learn to read and discuss news articles",
    content_type: 'conversation',
    difficulty: 'advanced',
    estimated_time: 30,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Reading News and Articles",
          text: "Practice reading and discussing news articles in Korean:",
          conversation: [
            {
              speaker: "A",
              korean: "오늘 뉴스에서 뭐가 나왔어요?",
              romanization: "oneul nyuseueseo mwoga nawasseoyo?",
              english: "What was on the news today?"
            },
            {
              speaker: "B",
              korean: "날씨가 갑자기 추워졌다는 기사가 나왔어요.",
              romanization: "nalssiga gapjagi chuwojeotdaneun gisaga nawasseoyo.",
              english: "There was an article saying the weather suddenly got cold."
            },
            {
              speaker: "A",
              korean: "정말요? 그럼 옷을 따뜻하게 입어야겠네요.",
              romanization: "jeongmallyo? geureom oseul ttatteushage ibeoyagessneyo.",
              english: "Really? Then I should dress warmly."
            },
            {
              speaker: "B",
              korean: "네, 감기에 걸리지 않도록 조심하세요.",
              romanization: "ne, gamgie geolliji anhdorok josimhaseyo.",
              english: "Yes, be careful not to catch a cold."
            }
          ]
        }
      }
    ]
  },
  {
    id: 41,
    lesson_number: 12,
    title: "의견 표현하기",
    description: "Learn to express opinions and viewpoints",
    content_type: 'conversation',
    difficulty: 'advanced',
    estimated_time: 25,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Expressing Opinions",
          text: "Master expressing your opinions and viewpoints:",
          conversation: [
            {
              speaker: "A",
              korean: "한국의 교육 시스템에 대해 어떻게 생각하세요?",
              romanization: "hangugui gyoyuk siseuteme daehae eotteoke saenggakhaseyo?",
              english: "What do you think about Korea's education system?"
            },
            {
              speaker: "B",
              korean: "저는 경쟁이 너무 치열하다고 생각해요.",
              romanization: "jeoneun gyeongjaengi neomu chiyeolhadago saenggakaeyo.",
              english: "I think the competition is too fierce."
            },
            {
              speaker: "A",
              korean: "그렇지만 학생들이 열심히 공부하는 것은 좋은 것 같아요.",
              romanization: "geureochiman haksaengdeuri yeolsimhi gongbuhaneun geoseun joeun geot gatayo.",
              english: "But I think it's good that students study hard."
            },
            {
              speaker: "B",
              korean: "맞아요. 하지만 스트레스도 많을 것 같아요.",
              romanization: "majayo. hajiman seuteureseudo maneul geot gatayo.",
              english: "That's true. But I think there's also a lot of stress."
            }
          ]
        }
      }
    ]
  },
  {
    id: 42,
    lesson_number: 13,
    title: "반대 의견 표현 ~기는 하지만",
    description: "Learn to express contrasting opinions",
    content_type: 'grammar',
    difficulty: 'advanced',
    estimated_time: 22,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Expressing Contrasting Opinions ~기는 하지만",
          text: "Master expressing contrasting or opposing viewpoints:",
          grammar: {
            pattern: "Verb/Adjective stem + ~기는 하지만",
            examples: [
              {
                korean: "한국어가 어렵기는 하지만 재미있어요.",
                romanization: "hangukeoga eoryeopgina hajiman jaemiisseoyo.",
                english: "Korean is difficult, but it's interesting."
              },
              {
                korean: "비싸기는 하지만 품질이 좋아요.",
                romanization: "bissagina hajiman pumjiri joayo.",
                english: "It's expensive, but the quality is good."
              },
              {
                korean: "시간이 오래 걸리기는 하지만 배울 가치가 있어요.",
                romanization: "sigani orae geolligina hajiman baeul gachiga isseoyo.",
                english: "It takes a long time, but it's worth learning."
              },
              {
                korean: "힘들기는 하지만 포기하고 싶지 않아요.",
                romanization: "himdeulgina hajiman pogihago sipji anayo.",
                english: "It's hard, but I don't want to give up."
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 43,
    lesson_number: 14,
    title: "가정 표현 ~(으)ㄴ/는 척하다",
    description: "Learn to express pretending or acting",
    content_type: 'grammar',
    difficulty: 'advanced',
    estimated_time: 20,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Expressing Pretending ~(으)ㄴ/는 척하다",
          text: "Learn to express pretending or acting as if:",
          grammar: {
            pattern: "Verb stem + ~(으)ㄴ/는 척하다",
            examples: [
              {
                korean: "모르는 척했어요.",
                romanization: "moreuneun cheokaesseoyo.",
                english: "I pretended not to know."
              },
              {
                korean: "잠자는 척했어요.",
                romanization: "jamjaneun cheokaesseoyo.",
                english: "I pretended to be sleeping."
              },
              {
                korean: "아픈 척했어요.",
                romanization: "apeun cheokaesseoyo.",
                english: "I pretended to be sick."
              },
              {
                korean: "재미있는 척했어요.",
                romanization: "jaemiinneun cheokaesseoyo.",
                english: "I pretended it was interesting."
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 44,
    lesson_number: 15,
    title: "격식체 표현",
    description: "Learn formal written and spoken expressions",
    content_type: 'conversation',
    difficulty: 'advanced',
    estimated_time: 28,
    level_id: 3,
    content: [
      {
        type: 'text',
        data: {
          title: "Formal Expressions (격식체)",
          text: "Master formal expressions for business and academic contexts:",
          conversation: [
            {
              speaker: "Formal",
              korean: "안녕하십니까. 저는 김민수입니다.",
              romanization: "annyeonghasimnikka. jeoneun gim minsuimnida.",
              english: "Hello. I am Kim Minsu."
            },
            {
              speaker: "Formal",
              korean: "오늘 회의에 참석해 주셔서 감사합니다.",
              romanization: "oneul hoeuie chamseokhae jusyeoseo gamsahamnida.",
              english: "Thank you for attending today's meeting."
            },
            {
              speaker: "Formal",
              korean: "제안서를 검토해 보시겠습니까?",
              romanization: "jeanseoreul geomtohae bosigesseumnikka?",
              english: "Would you please review the proposal?"
            },
            {
              speaker: "Formal",
              korean: "내일까지 답변을 드리겠습니다.",
              romanization: "naeilkkaji dapbeoneul deurigesseumnida.",
              english: "I will give you an answer by tomorrow."
            }
          ]
        }
      }
    ]
  }
]

// Combine all lessons
export const allLessons: LessonContent[] = [
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
