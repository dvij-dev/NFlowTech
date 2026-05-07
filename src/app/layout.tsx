import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
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
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}
