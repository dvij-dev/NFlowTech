'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { caseStudies } from '@/data/site-data'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionLabel } from '@/components/SectionLabel'
import { Breadcrumb } from '@/components/Breadcrumb'

const filters = ['All', 'SEO', 'PPC', 'Google Ads', 'Social Ads', '360° Marketing']

export default function CaseStudiesPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? caseStudies
    : caseStudies.filter(cs =>
        cs.services.toLowerCase().includes(active.toLowerCase()) ||
        (active === 'PPC' && (cs.services.includes('Google Ads') || cs.services.includes('PPC')))
      )

  return (
    <>
      {/* Hero */}
      <section className="section-pad pt-40 pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-sky-500/[0.05] rounded-full blur-[140px]" />
        <div className="relative z-10 max-w-3xl">
          <AnimatedSection>
            <SectionLabel>Success Stories</SectionLabel>
            <h1 className="text-display font-display font-bold text-white mb-6">
              Success Stories That{' '}
              <span className="gradient-text">Speak</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Real projects. Real impact. Browse data-backed success stories showing how we solved complex growth challenges and turned underperforming campaigns into revenue engines.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="section-pad pb-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
                active === f
                  ? 'bg-sky-500 border-sky-500 text-white'
                  : 'border-white/10 text-slate-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="section-pad pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cs, i) => (
            <AnimatedSection key={cs.slug} delay={i * 60}>
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group block relative rounded-2xl overflow-hidden aspect-[4/3]"
              >
                {/* BG image */}
                <div className="absolute inset-0">
                  <Image src={cs.image} alt={cs.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(180deg, ${cs.brandColor}30 0%, ${cs.brandColor}E0 60%, ${cs.brandColor}F5 100%)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider bg-white/10 backdrop-blur-sm rounded-full text-white/80 border border-white/10">
                      {cs.industry}
                    </span>
                    <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider bg-white/10 backdrop-blur-sm rounded-full text-white/80 border border-white/10">
                      {cs.services}
                    </span>
                    <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider bg-white/10 backdrop-blur-sm rounded-full text-white/80 border border-white/10">
                      {cs.businessModel}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {cs.name}
                  </h3>

                  <p className="text-sm text-white/60 line-clamp-2 mb-4">{cs.description}</p>

                  <div className="flex gap-6">
                    {cs.stats.slice(0, 3).map((stat, si) => (
                      <div key={si}>
                        <div className="text-lg font-bold text-white">{stat.value}</div>
                        <div className="text-[10px] text-white/50 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  )
}
