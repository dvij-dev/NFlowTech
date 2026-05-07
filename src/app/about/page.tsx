'use client'

import Image from 'next/image'
import Link from 'next/link'
import { siteConfig, founder, teamMembers, values, timeline, certifications } from '@/data/site-data'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionLabel } from '@/components/SectionLabel'

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-sky-500/[0.05] rounded-full blur-[140px]" />
        <div className="relative z-10 max-w-3xl">
          <AnimatedSection>
            <SectionLabel>About Us</SectionLabel>
            <h1 className="text-display font-display font-bold text-white mb-6">
              Our motivation at work is{' '}
              <span className="gradient-text">trust</span>.
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              We trust you, and we expect the same. Since {siteConfig.founded}, we&apos;ve grown from 2 people to a team of {siteConfig.stats.team} experts serving {siteConfig.stats.brands}+ brands across {siteConfig.stats.niches}+ industries.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-pad section-y relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[120px]" />

        <div className="relative z-10 grid lg:grid-cols-5 gap-16 items-center">
          {/* Images */}
          <AnimatedSection direction="right" className="lg:col-span-2 relative">
            <div className="relative aspect-[3/4] max-w-sm mx-auto">
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl shadow-sky-500/10">
                <Image src={founder.image} alt={founder.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <AnimatedSection direction="left" className="lg:col-span-3">
            <SectionLabel>Meet Our Founder</SectionLabel>
            <h2 className="text-heading font-display font-bold text-white mb-1">{founder.name}</h2>
            <p className="text-sky-400 font-medium mb-6">{founder.role} · {founder.title}</p>
            <blockquote className="border-l-2 border-sky-500/50 pl-6 mb-6">
              <p className="text-slate-300 leading-relaxed italic">&ldquo;{founder.bio}&rdquo;</p>
            </blockquote>
            <p className="text-slate-400 leading-relaxed mb-6">{founder.longBio}</p>
            <p className="text-slate-400 leading-relaxed">
              Together, we&apos;ve helped over 138+ brands achieve their marketing goals and drive revenue. My core goal is helping brands scale profitably, targeting an 8x-10x ROAS by combining Google Ads expertise with psychological sales techniques to drive high-quality traffic that converts.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad section-y relative overflow-hidden bg-gradient-to-b from-transparent via-sky-500/[0.02] to-transparent">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>Our Core Values</SectionLabel>
          <h2 className="text-heading font-display font-bold text-white">
            What Drives <span className="gradient-text">Everything</span> We Do
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 80}>
              <div className="glass-card-hover p-8 h-full">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center mb-5">
                  <span className="text-sky-400 font-mono font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{v.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{v.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad section-y relative">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>Our Journey</SectionLabel>
          <h2 className="text-heading font-display font-bold text-white">
            From 2 People to{' '}
            <span className="gradient-text">{siteConfig.stats.team} Experts</span>
          </h2>
        </AnimatedSection>

        <div className="max-w-2xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-white/[0.06]" />

          {timeline.map((item, i) => (
            <AnimatedSection key={item.year} delay={i * 150} className="relative pl-20 pb-16 last:pb-0">
              {/* Dot */}
              <div className="absolute left-[26px] top-1 w-5 h-5 rounded-full border-2 border-sky-500 bg-navy-950 z-10" />

              {/* Year badge */}
              <span className="inline-block px-3 py-1 text-xs font-mono font-bold text-sky-400 bg-sky-500/10 rounded-full mb-3">
                {item.year}
              </span>
              <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
              <p className="text-sm text-sky-400/70 mb-2">{item.subtitle}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Full Team */}
      <section className="section-pad section-y relative overflow-hidden bg-gradient-to-b from-transparent via-sky-500/[0.02] to-transparent">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel>Meet Our Core Team Of Extraordinary Experts</SectionLabel>
          <h2 className="text-heading font-display font-bold text-white mb-4">
            The passionate minds shaping the{' '}
            <span className="gradient-text">future</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our team is a group of passionate experts driven by creativity, innovation, and a commitment to excellence. We bring together diverse skills and experiences to build solutions that make a real difference.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {teamMembers.map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 50}>
              <div className="glass-card-hover p-4 text-center group">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-sm font-semibold text-white leading-tight">{member.name}</h4>
                <p className="text-[11px] text-slate-500 mt-1">{member.role}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="section-pad py-20 relative">
        <AnimatedSection className="text-center mb-12">
          <SectionLabel>Proof? We&apos;ve Got Plenty</SectionLabel>
          <h2 className="text-heading font-display font-bold text-white">
            Industry-Recognized{' '}
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Anyone can claim they&apos;re experts. We prefer to prove it. Our team is stacked with industry-recognized certifications.
          </p>
        </AnimatedSection>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {certifications.map((cert, i) => (
            <AnimatedSection key={cert.name} delay={i * 80}>
              <div className="glass-card-hover p-6 flex flex-col items-center gap-3 min-w-[120px]">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  width={60}
                  height={60}
                  className="h-12 w-auto brightness-0 invert"
                />
                <span className="text-xs text-slate-400 font-medium">{cert.name}</span>
                {cert.year && <span className="text-[10px] text-sky-400 font-mono">{cert.year}</span>}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="section-pad py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/[0.04] to-purple-500/[0.04]" />
        <AnimatedSection className="relative z-10">
          <h2 className="text-heading font-display font-bold text-white mb-4">
            Are you ready to share your expertise?
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8">
            If you&apos;re ready to be part of something meaningful where your work truly matters — we&apos;d love to meet you.
          </p>
          <Link href="/careers" className="btn-primary">
            Join Our Team
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </AnimatedSection>
      </section>
    </>
  )
}
