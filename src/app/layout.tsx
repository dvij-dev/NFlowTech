import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "NFlow Technologies",
              "url": "https://nflowtech.com",
              "description": "Full-spectrum digital marketing agency delivering 7.5X average ROAS across 138+ brands in 27+ industries.",
              "telephone": "+91-905-433-1400",
              "email": "hello@nflowtech.com",
              "founder": {
                "@type": "Person",
                "name": "Nevil Bhatt",
                "jobTitle": "Founder & CEO"
              },
            })
          }}
        />
      </head>
      <body className="bg-[#0a0612] text-white antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
