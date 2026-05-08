import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Success Stories — Real Results, Real Impact | NFlow',
  description: 'See how NFlow Technologies delivered 7.5X average ROAS across 138+ brands in 27+ industries with real case studies and data.',
}

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
