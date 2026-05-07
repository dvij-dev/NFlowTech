/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'www.nflowtech.com',
      },
      {
        protocol: 'https',
        hostname: 'nflowtech.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/pay-per-click',
        destination: '/services/ppc',
        permanent: true,
      },
      {
        source: '/social-conversion-engine',
        destination: '/services/social-media',
        permanent: true,
      },
      {
        source: '/organic-seo-services',
        destination: '/services/seo',
        permanent: true,
      },
      {
        source: '/conversion-led-design-studio',
        destination: '/services/web-design',
        permanent: true,
      },
      {
        source: '/subscription',
        destination: '/pricing',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
