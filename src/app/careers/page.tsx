'use client'

import Link from 'next/link'
import { siteConfig } from '@/data/site-data'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionLabel } from '@/components/SectionLabel'

export default function CareersPage() {
  return (
    <section className="section-pad pt-40 pb-32 relative overflow-hidden min-h-screen">
      <div className="absolute top-0 right-1/3 w-[600px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[140px]" />
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <SectionLabel>Careers at NFlow</SectionLabel>
          <h1 className="text-display font-display font-bold text-white mb-6">
            Are you ready to share{' '}
            <span className="gradient-text">your expertise?</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-4">
            If you&apos;re ready to be part of something meaningful where your work truly matters — we&apos;d love to meet you.
          </p>
          <p className="text-slate-400 leading-relaxed mb-8">
            We&apos;re always looking for passionate experts driven by creativity, innovation, and a commitment to excellence.
            Currently we are a team of {siteConfig.stats.team} serving {siteConfig.stats.brands}+ brands worldwide.
          </p>
          <a href={`mailto:${siteConfig.email}`} className="btn-gold">
            Send Your Resume
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </AnimatedSection>
      </div>
    </section>
  )
}
