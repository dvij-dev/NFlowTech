import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services — PPC, Social Ads, SEO & Conversion Design | NFlow',
  description: 'Four pillars of growth: Precision Performance (Google/Amazon/Bing Ads), Social Conversion Engine (Meta/TikTok), Organic Opportunity Lab (SEO), and Conversion-Led Design.',
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
