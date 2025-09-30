/** @type {import('next').NextConfig} */
const nextConfig = {
  // 이미지 도메인 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'developers.google.com',
        port: '',
        pathname: '/identity/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // 보안 헤더 추가
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://pagead2.googlesyndication.com https://www.googletagservices.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https: https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://developers.google.com https://lh3.googleusercontent.com; connect-src 'self' https://*.supabase.co https://*.supabase.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://*.adtrafficquality.google; frame-src 'self' https://accounts.google.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com;",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig