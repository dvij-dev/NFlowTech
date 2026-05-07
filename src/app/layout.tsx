import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/layout/JsonLd'
import { organizationSchema, websiteSchema } from '@/lib/schema'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nflowtech.com'),
  title: {
    default: 'NFlow Tech — AI-Driven Digital Marketing Agency',
    template: '%s | NFlow Tech',
  },
  description:
    'We combine AI with proven marketing tactics to generate qualified leads. PPC, SEO, social media advertising, and conversion-led web design for 138+ brands across 27+ industries.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.nflowtech.com',
    siteName: 'NFlow Tech',
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://www.nflowtech.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Skip to content — accessibility */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="flex-1" role="main">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
