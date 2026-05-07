'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionLabel } from '@/components/SectionLabel'
import type { CaseStudy } from '@/data/site-data'

interface Props {
  cs: CaseStudy
  nextCs: CaseStudy
  prevCs: CaseStudy
}

export function CaseStudyContent({ cs, nextCs, prevCs }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src={cs.image} alt={cs.name} fill className="object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${cs.brandColor}40 0%, ${cs.brandColor}CC 40%, ${cs.brandColor}F5 100%)`,
            }}
          />
        </div>

        <div className="relative z-10 section-pad pb-16 pt-40 w-full">
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-4 py-1.5 text-xs font-mono uppercase tracking-wider bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20">
                {cs.industry}
              </span>
              <span className="px-4 py-1.5 text-xs font-mono uppercase tracking-wider bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20">
                {cs.services}
              </span>
              <span className="px-4 py-1.5 text-xs font-mono uppercase tracking-wider bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20">
                {cs.businessModel}
              </span>
            </div>

            <h1 className="text-display font-display font-bold text-white mb-4">{cs.name}</h1>
            <p className="text-lg text-white/70 max-w-2xl">{cs.description}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ backgroundColor: cs.brandColor }} className="border-t border-white/10">
        <div className="section-pad py-10">
          <div className="grid grid-cols-3 gap-8 max-w-2xl">
            {cs.stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Body content */}
      <section className="section-pad section-y max-w-3xl mx-auto">
        <AnimatedSection>
          <SectionLabel>About the Brand</SectionLabel>
          <p className="text-slate-300 leading-relaxed text-lg mb-12">
            {cs.description}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200} className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono" style={{ backgroundColor: `${cs.brandAccent}20`, color: cs.brandAccent }}>01</span>
            Industry Context
          </h3>
          <p className="text-slate-400 leading-relaxed">
            Operating in the {cs.industry.toLowerCase()} space ({cs.businessModel}), this brand needed a strategic partner who understood the nuances of their market. The competitive landscape demanded a data-driven approach to customer acquisition and growth.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300} className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono" style={{ backgroundColor: `${cs.brandAccent}20`, color: cs.brandAccent }}>02</span>
            Our Approach
          </h3>
          <p className="text-slate-400 leading-relaxed">
            We implemented a comprehensive {cs.services} strategy tailored to {cs.name}&apos;s unique market position. Through rigorous testing, data analysis, and iterative optimization, we identified the highest-impact channels and tactics for sustainable growth.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono" style={{ backgroundColor: `${cs.brandAccent}20`, color: cs.brandAccent }}>03</span>
            Results
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {cs.stats.map((stat, i) => (
              <div key={i} className="glass-card p-5 text-center">
                <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Navigation */}
      <section className="section-pad py-16 border-t border-white/[0.06]">
        <div className="grid md:grid-cols-2 gap-6">
          <Link href={`/case-studies/${prevCs.slug}`} className="glass-card-hover p-6 group">
            <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">← Previous</span>
            <h4 className="text-lg font-bold text-white mt-2 group-hover:text-sky-400 transition-colors">{prevCs.name}</h4>
            <p className="text-sm text-slate-500 mt-1">{prevCs.industry}</p>
          </Link>
          <Link href={`/case-studies/${nextCs.slug}`} className="glass-card-hover p-6 text-right group">
            <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">Next →</span>
            <h4 className="text-lg font-bold text-white mt-2 group-hover:text-sky-400 transition-colors">{nextCs.name}</h4>
            <p className="text-sm text-slate-500 mt-1">{nextCs.industry}</p>
          </Link>
        </div>
      </section>
    </>
  )
}
