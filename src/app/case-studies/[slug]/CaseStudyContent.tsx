'use client'

import Image from 'next/image'
import Link from 'next/link'
import RevealOnScroll from '@/components/RevealOnScroll'
import MagneticButton from '@/components/MagneticButton'
import CaseStudyHero from '@/components/CaseStudyHero'
import { getTheme } from '@/data/case-study-themes'
import type { CaseStudy } from '@/data/site-data'

interface Props {
  cs: CaseStudy
  nextCs: CaseStudy
  prevCs: CaseStudy
}

export function CaseStudyContent({ cs, nextCs, prevCs }: Props) {
  const theme = getTheme(cs.slug)

  return (
    <>
      {/* Themed Hero */}
      <CaseStudyHero
        theme={theme}
        name={cs.name}
        industry={cs.industry}
        services={cs.services}
        image={cs.image}
        brandColor={cs.brandAccent}
      />

      {/* Stats bar with brand color */}
      <section
        className="relative border-t border-white/10"
        style={{
          background: `linear-gradient(135deg, ${cs.brandColor} 0%, ${cs.brandColor}dd 100%)`,
        }}
      >
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, ${cs.brandAccent}40 0%, transparent 50%), 
                             radial-gradient(circle at 80% 50%, ${cs.brandAccent}30 0%, transparent 50%)`,
          }}
        />
        <div className="relative px-8 md:px-16 lg:px-24 py-12">
          <div className="flex flex-wrap gap-12 md:gap-16">
            {cs.stats.map((stat, i) => (
              <RevealOnScroll key={i} direction="up" delay={i * 0.15}>
                <div>
                  <div className="text-3xl md:text-5xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60 mt-2 tracking-wider uppercase">{stat.label}</div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Story section with brand-influenced design */}
      <section className="px-8 md:px-16 lg:px-24 py-24">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 max-w-6xl mx-auto">
          {/* Left: Meta info */}
          <div>
            <RevealOnScroll direction="left">
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-white/30 font-mono mb-3">Industry</h3>
                  <p className="text-white text-lg">{cs.industry}</p>
                </div>
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-white/30 font-mono mb-3">Services</h3>
                  <p className="text-lg" style={{ color: cs.brandAccent }}>{cs.services}</p>
                </div>
                <div>
                  <h3 className="text-xs tracking-widest uppercase text-white/30 font-mono mb-3">Market</h3>
                  <p className="text-white text-lg">{cs.businessModel}</p>
                </div>

                {/* Brand color indicator */}
                <div className="flex gap-3 items-center">
                  <div className="w-6 h-6 rounded-full" style={{ background: cs.brandColor }} />
                  <div className="w-6 h-6 rounded-full" style={{ background: cs.brandAccent }} />
                  <span className="text-xs text-white/20 font-mono ml-2">Brand Identity</span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: Story */}
          <div className="space-y-16">
            <RevealOnScroll direction="right">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-mono font-bold"
                    style={{ backgroundColor: `${cs.brandAccent}15`, color: cs.brandAccent }}>
                    01
                  </span>
                  <h3 className="text-2xl font-bold text-white">The Challenge</h3>
                </div>
                <p className="text-white/50 leading-relaxed text-lg">
                  {cs.description} Operating in the competitive {cs.industry.toLowerCase()} space,
                  they needed a strategic digital partner who could cut through the noise and deliver
                  measurable results in the {cs.businessModel} market.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" delay={0.15}>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-mono font-bold"
                    style={{ backgroundColor: `${cs.brandAccent}15`, color: cs.brandAccent }}>
                    02
                  </span>
                  <h3 className="text-2xl font-bold text-white">Our Approach</h3>
                </div>
                <p className="text-white/50 leading-relaxed text-lg">
                  We deployed a comprehensive {cs.services} strategy tailored specifically to {cs.name}&apos;s
                  market position and growth objectives. Through rigorous A/B testing, audience segmentation,
                  and continuous optimization, we identified the highest-impact levers for sustainable growth.
                </p>
              </div>
            </RevealOnScroll>

            {/* Featured image with brand overlay */}
            <RevealOnScroll direction="up" delay={0.2}>
              <div className="relative aspect-video rounded-2xl overflow-hidden group">
                <Image src={cs.image} alt={cs.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-2xl border-2 opacity-30 group-hover:opacity-60 transition-opacity"
                  style={{ borderColor: cs.brandAccent }}
                />
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" delay={0.15}>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-mono font-bold"
                    style={{ backgroundColor: `${cs.brandAccent}15`, color: cs.brandAccent }}>
                    03
                  </span>
                  <h3 className="text-2xl font-bold text-white">The Results</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {cs.stats.map((stat, i) => (
                    <div key={i} className="rounded-xl p-5 text-center border"
                      style={{
                        backgroundColor: `${cs.brandColor}15`,
                        borderColor: `${cs.brandAccent}20`,
                      }}>
                      <div className="text-2xl font-bold" style={{ color: cs.brandAccent }}>{stat.value}</div>
                      <div className="text-xs text-white/40 mt-1 tracking-wider uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 lg:px-24 py-24 text-center">
        <RevealOnScroll direction="up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for results like these?
          </h2>
          <p className="text-white/40 max-w-xl mx-auto mb-8">
            Let&apos;s build a growth strategy tailored to your business.
          </p>
          <MagneticButton>
            <Link href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-semibold text-lg transition-all hover:shadow-xl"
              style={{
                background: `linear-gradient(135deg, ${cs.brandColor}, ${cs.brandAccent})`,
                boxShadow: `0 8px 30px ${cs.brandAccent}30`,
              }}>
              Start Your Growth Journey
              <span>→</span>
            </Link>
          </MagneticButton>
        </RevealOnScroll>
      </section>

      {/* Navigation */}
      <section className="px-8 md:px-16 lg:px-24 py-16 border-t border-white/[0.06]">
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <Link href={`/case-studies/${prevCs.slug}`} className="group relative rounded-2xl overflow-hidden p-8 border border-white/[0.06] hover:border-white/[0.12] transition-all">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${prevCs.brandColor}10, transparent)` }}
            />
            <span className="text-xs text-white/30 font-mono uppercase tracking-wider">← Previous</span>
            <h4 className="text-xl font-bold text-white mt-3 group-hover:text-sky-400 transition-colors">{prevCs.name}</h4>
            <p className="text-sm text-white/30 mt-1">{prevCs.industry}</p>
          </Link>
          <Link href={`/case-studies/${nextCs.slug}`} className="group relative rounded-2xl overflow-hidden p-8 border border-white/[0.06] hover:border-white/[0.12] transition-all text-right">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(135deg, transparent, ${nextCs.brandColor}10)` }}
            />
            <span className="text-xs text-white/30 font-mono uppercase tracking-wider">Next →</span>
            <h4 className="text-xl font-bold text-white mt-3 group-hover:text-sky-400 transition-colors">{nextCs.name}</h4>
            <p className="text-sm text-white/30 mt-1">{nextCs.industry}</p>
          </Link>
        </div>
      </section>
    </>
  )
}
