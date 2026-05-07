'use client'

import Link from 'next/link'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionLabel } from '@/components/SectionLabel'

export default function InsightsPage() {
  return (
    <section className="section-pad pt-40 pb-32 relative overflow-hidden min-h-screen">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sky-500/[0.05] rounded-full blur-[140px]" />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <SectionLabel>Insights</SectionLabel>
          <h1 className="text-display font-display font-bold text-white mb-6">
            Stay Ahead with{' '}
            <span className="gradient-text">Expert Insights</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            Stay ahead with the latest updates, insights, and events from NFlow Technologies.
            Our blog is coming soon with in-depth articles on digital marketing strategy,
            PPC optimization, SEO trends, and more.
          </p>
          <Link href="/contact" className="btn-primary">
            Subscribe for Updates
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
