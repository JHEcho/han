import { allLessons } from '@/lib/lessonData'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnhangul.govinfos.com'
  const siteName = 'Korean Learning Hub'
  const siteDescription = 'Learn Korean with interactive lessons, vocabulary, and quizzes'

  // Get recent lessons (last 20)
  const recentLessons = allLessons
    .sort((a, b) => b.id - a.id)
    .slice(0, 20)

  const rssItems = recentLessons.map((lesson) => {
    const lessonUrl = `${baseUrl}/lessons/${lesson.id}`
    const pubDate = new Date().toUTCString()
    
    return `
    <item>
      <title><![CDATA[${lesson.title}]]></title>
      <description><![CDATA[${lesson.description}]]></description>
      <link>${lessonUrl}</link>
      <guid isPermaLink="true">${lessonUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${lesson.difficulty}]]></category>
      <category><![CDATA[${lesson.content_type}]]></category>
    </item>`
  }).join('')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteName}]]></title>
    <description><![CDATA[${siteDescription}]]></description>
    <link>${baseUrl}</link>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml"/>
    <generator>Korean Learning Hub</generator>
    <managingEditor>noreply@learnhangul.govinfos.com (Korean Learning Hub)</managingEditor>
    <webMaster>noreply@learnhangul.govinfos.com (Korean Learning Hub)</webMaster>
    <ttl>60</ttl>
    <image>
      <url>${baseUrl}/favicon.ico</url>
      <title><![CDATA[${siteName}]]></title>
      <link>${baseUrl}</link>
      <width>32</width>
      <height>32</height>
    </image>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
