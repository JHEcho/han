import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://learnhangul.govinfos.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/dev-tools/',
        '/auth/reset-password/',
        '/_next/',
        '/admin/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
