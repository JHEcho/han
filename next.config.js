/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is now stable in Next.js 14, no need for experimental flag
  // Force all pages to be dynamically rendered
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'developers.google.com',
        port: '',
        pathname: '/identity/images/**',
      },
    ],
  },
}

module.exports = nextConfig
