import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FloatingCTA } from '@/components/FloatingCTA'
import SmoothScroll from '@/components/SmoothScroll'
import GradientOrbs from '@/components/GradientOrbs'
import CustomCursor from '@/components/CustomCursor'
import PageLoader from '@/components/PageLoader'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NFlow Technologies — Excellence In Digital Strategy',
  description: 'We combine creativity, AI, data, and tech to help you scale smarter, rank faster, and connect deeper to target audiences with exceptional digital strategies.',
  openGraph: {
    title: 'NFlow Technologies — Excellence In Digital Strategy',
    description: 'Result-driven digital marketing for 138+ brands across 27+ industries.',
    url: 'https://nflowtech.com',
    siteName: 'NFlow Technologies',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "NFlow Technologies",
              "alternateName": "NFlow",
              "url": "https://nflowtech.com",
              "logo": "https://nflowtech.com/logo.png",
              "description": "Full-spectrum digital marketing agency delivering 7.5X average ROAS across 138+ brands in 27+ industries.",
              "telephone": "+91-905-433-1400",
              "email": "hello@nflowtech.com",
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "A-906, Siddhi Vinayak Tower, nr. Kataria House, Makarba",
                  "addressLocality": "Ahmedabad",
                  "addressRegion": "Gujarat",
                  "addressCountry": "IN"
                },
                {
                  "@type": "PostalAddress",
                  "addressLocality": "Jersey City",
                  "addressRegion": "NJ",
                  "addressCountry": "US"
                }
              ],
              "founder": {
                "@type": "Person",
                "name": "Nevil Bhatt",
                "jobTitle": "Founder & CEO"
              },
              "numberOfEmployees": { "@type": "QuantitativeValue", "value": 18 },
              "knowsAbout": ["PPC", "SEO", "Google Ads", "Meta Ads", "Digital Marketing", "CRO"],
              "sameAs": [
                "https://www.linkedin.com/company/nflowtech/",
                "https://www.instagram.com/nflowtech/"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans bg-navy-950 text-white overflow-x-hidden">
        <PageLoader />
        <CustomCursor />
        <GradientOrbs />
        <SmoothScroll>
          <div className="relative z-10 noise-overlay">
            <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-sky-500 focus:text-white focus:rounded-lg">
              Skip to content
            </a>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <FloatingCTA />
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}
