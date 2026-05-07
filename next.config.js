/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'nflowtech.com' },
      { protocol: 'https', hostname: 'www.nflowtech.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/pay-per-click', destination: '/services', permanent: true },
      { source: '/social-conversion-engine', destination: '/services', permanent: true },
      { source: '/organic-seo-services', destination: '/services', permanent: true },
      { source: '/conversion-led-design-studio', destination: '/services', permanent: true },
      { source: '/subscription', destination: '/services', permanent: true },
      { source: '/services/:slug', destination: '/services', permanent: false },
      { source: '/pricing', destination: '/services', permanent: false },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
