'use client'

import Image from 'next/image'
import Link from 'next/link'
import { siteConfig, services, caseStudies, certifications, teamMembers, founder } from '@/data/site-data'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionLabel } from '@/components/SectionLabel'
import { useCounter, useScrollProgress } from '@/lib/hooks'
import { useEffect, useRef, useState } from 'react'

/* ─── Progress Bar ──────────────────────────────────── */
function ScrollProgress() {
  const progress = useScrollProgress()
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60]">
      <div
        className="h-full bg-gradient-to-r from-sky-500 via-sky-400 to-amber-400"
        style={{ width: `${progress * 100}%`, transition: 'width 0.1s' }}
      />
    </div>
  )
}

/* ─── Stat Counter ──────────────────────────────────── */
function StatCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const { count, ref } = useCounter(value, 2200)
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white font-display">
        {count}<span className="text-sky-400">{suffix}</span>
      </div>
      <div className="text-sm text-slate-400 mt-2 font-medium">{label}</div>
    </div>
  )
}

/* ─── Marquee ───────────────────────────────────────── */
function TrustMarquee() {
  return (
    <div className="py-12 border-y border-white/[0.06] overflow-hidden">
      <p className="text-center text-xs font-mono uppercase tracking-[0.2em] text-slate-500 mb-8">
        Trusted by Leading Brands &amp; Certified by Industry Leaders
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-navy-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-navy-950 to-transparent z-10" />
        <div className="flex animate-marquee">
          {[...certifications, ...certifications, ...certifications].map((cert, i) => (
            <div key={i} className="flex-shrink-0 mx-8 md:mx-12">
              <Image
                src={cert.image}
                alt={cert.name}
                width={100}
                height={50}
                className="h-8 md:h-10 w-auto brightness-0 invert opacity-50 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Featured Case Studies ──────────────────────────── */
const featuredCS = caseStudies.slice(0, 6)

function CaseStudyCard({ cs, index }: { cs: typeof caseStudies[0]; index: number }) {
  return (
    <AnimatedSection delay={index * 100}>
      <Link
        href={`/case-studies/${cs.slug}`}
        className="group block relative rounded-2xl overflow-hidden aspect-[4/3]"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={cs.image}
            alt={cs.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `linear-gradient(180deg, ${cs.brandColor}40 0%, ${cs.brandColor}E6 70%, ${cs.brandColor}F2 100%)`,
            }}
          />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider bg-white/10 backdrop-blur-sm rounded-full text-white/80 border border-white/10">
              {cs.industry}
            </span>
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider bg-white/10 backdrop-blur-sm rounded-full text-white/80 border border-white/10">
              {cs.services}
            </span>
          </div>

          {/* Name */}
          <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
            {cs.name}
          </h3>

          {/* Stats row */}
          <div className="flex gap-6 mt-3">
            {cs.stats.slice(0, 2).map((stat, i) => (
              <div key={i}>
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-[11px] text-white/60 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  )
}

/* ─── Service Card ───────────────────────────────────── */
function ServiceBlock({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <AnimatedSection delay={index * 120}>
      <div className="glass-card-hover p-8 md:p-10 h-full group">
        {/* Number */}
        <div className="flex items-center gap-4 mb-6">
          <span
            className="text-4xl font-display font-bold opacity-20"
            style={{ color: service.color }}
          >
            {service.number}
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
        <p className="text-sm text-slate-500 font-mono uppercase tracking-wider mb-4">{service.subtitle}</p>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.description}</p>

        {/* Capabilities */}
        <div className="flex flex-wrap gap-2">
          {service.capabilities.map((cap) => (
            <span
              key={cap}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300"
            >
              {cap}
            </span>
          ))}
        </div>

        {/* Accent line */}
        <div
          className="mt-8 h-0.5 w-0 group-hover:w-full transition-all duration-700 rounded-full"
          style={{ backgroundColor: service.color }}
        />
      </div>
    </AnimatedSection>
  )
}

/* ═══════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <ScrollProgress />

      {/* ─── CHAPTER 1: Hero ───────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0">
          {/* Dark gradient base */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/95 to-navy-950" />
          {/* Radial glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-sky-500/[0.07] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[100px]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 section-pad w-full pt-32 pb-20">
          <div className="max-w-5xl">
            {/* Eyebrow */}
            <div className="animate-fade-up flex items-center gap-3 mb-8" style={{ animationDelay: '200ms' }}>
              <span className="w-12 h-px bg-sky-500" />
              <span className="text-sm font-mono text-sky-400 uppercase tracking-[0.2em]">
                Digital Marketing Agency
              </span>
            </div>

            {/* Main headline */}
            <h1 className="animate-fade-up text-hero font-display font-bold text-white mb-6" style={{ animationDelay: '400ms' }}>
              Excellence In{' '}
              <span className="gradient-text">Digital</span>{' '}
              Strategy
            </h1>

            {/* Sub */}
            <p className="animate-fade-up text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10" style={{ animationDelay: '600ms' }}>
              {siteConfig.subheadline}
            </p>

            {/* CTAs */}
            <div className="animate-fade-up flex flex-wrap gap-4" style={{ animationDelay: '800ms' }}>
              <Link href="/contact" className="btn-primary">
                Get Free Consultation
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/case-studies" className="btn-outline">
                View Success Stories
              </Link>
            </div>
          </div>

          {/* Stats row at bottom */}
          <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl">
            <StatCounter value={27} suffix="+" label="Business Niches" />
            <StatCounter value={138} suffix="+" label="Brands Across Globe" />
            <StatCounter value={80} suffix="%" label="Referral Business" />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white font-display">
                7.5<span className="text-sky-400">X</span>
              </div>
              <div className="text-sm text-slate-400 mt-2 font-medium">Avg ROAS</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: '1200ms' }}>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Scroll down</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 bg-sky-400 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── Trust Marquee ─────────────────────────────── */}
      <TrustMarquee />

      {/* ─── CHAPTER 2: Social Proof Intro ─────────────── */}
      <section className="section-pad section-y relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/[0.04] rounded-full blur-[150px]" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <SectionLabel>Creating Social-Proof for Businesses</SectionLabel>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h2 className="text-display font-display font-bold text-white mb-6">
              Effective Digital Marketing{' '}
              <span className="gradient-text">Solutions</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-lg text-slate-400 leading-relaxed mb-4">
              <span className="text-white font-semibold">Unique + User-focused + Unwavering</span>
            </p>
            <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
              We deliver customer-focused marketing solutions that help your brand gain visibility and lasting impact.
              Great marketing feels natural, not forced. We help strengthen your brand presence through smart digital marketing strategies.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CHAPTER 3: What We Do ─────────────────────── */}
      <section className="section-pad pb-32 relative">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[120px]" />

        <div className="relative z-10">
          <AnimatedSection className="mb-16">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-heading font-display font-bold text-white">
              Digital Marketing Services<br />
              <span className="gradient-text">That Grow Your Business</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-2xl">
              We offer end-to-end digital marketing services, including PPC, SEO, and SEM,
              focused on driving qualified traffic, generating leads, and maximizing ROAS.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <ServiceBlock key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CHAPTER 4: Featured Case Studies ─────────── */}
      <section className="section-pad section-y relative overflow-hidden bg-gradient-to-b from-navy-950 via-sky-500/[0.02] to-navy-950">
        <AnimatedSection className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <SectionLabel>Case Studies</SectionLabel>
            <h2 className="text-heading font-display font-bold text-white">
              Success Stories That{' '}
              <span className="gradient-text">Speak</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl">
              Real projects. Real impact. Data-backed success stories showing how we solved complex growth challenges.
            </p>
          </div>
          <Link href="/case-studies" className="btn-outline shrink-0">
            View All Stories
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCS.map((cs, i) => (
            <CaseStudyCard key={cs.slug} cs={cs} index={i} />
          ))}
        </div>
      </section>

      {/* ─── CHAPTER 5: Founder / About Preview ────────── */}
      <section className="section-pad section-y relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[150px]" />
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimatedSection direction="right" className="relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-6 glass-card p-5 max-w-[200px]">
                <p className="text-2xl font-display font-bold text-white mb-1">2.8B+</p>
                <p className="text-xs text-slate-400">Revenue Generated</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <AnimatedSection direction="left">
            <SectionLabel>Meet Our Founder</SectionLabel>
            <h2 className="text-heading font-display font-bold text-white mb-2">
              {founder.name}
            </h2>
            <p className="text-sky-400 font-medium mb-6">{founder.role} · {founder.title}</p>
            <p className="text-slate-400 leading-relaxed mb-6">{founder.bio}</p>
            <p className="text-slate-400 leading-relaxed mb-8">{founder.longBio}</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary">
                Our Story
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CHAPTER 6: CTA / Strengthen Your Presence ── */}
      <section className="section-pad section-y relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/[0.06] via-transparent to-amber-500/[0.06]" />
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <AnimatedSection>
            <SectionLabel>Strengthen Your Online Presence With Us</SectionLabel>
            <h2 className="text-display font-display font-bold text-white mt-6 mb-4">
              Because We Make a{' '}
              <span className="gradient-text-warm">Big Difference!</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-10">
              Great marketing feels natural, not forced. We help strengthen your brand presence through smart digital marketing strategies that truly connect.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { value: '100%', label: 'Transparency' },
                { value: '24/7', label: 'Support' },
                { value: '138+', label: 'Happy Clients' },
                { value: '7.5X', label: 'Avg ROAS' },
              ].map((item, i) => (
                <div key={i} className="glass-card p-6">
                  <div className="text-2xl font-display font-bold text-white mb-1">{item.value}</div>
                  <div className="text-xs text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <Link href="/contact" className="btn-gold">
              Start Your Project
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CHAPTER 7: Team Preview ───────────────────── */}
      <section className="section-pad py-20 relative overflow-hidden">
        <AnimatedSection className="text-center mb-12">
          <SectionLabel>Our People</SectionLabel>
          <h2 className="text-heading font-display font-bold text-white">
            Meet the Minds Behind{' '}
            <span className="gradient-text">NFlow</span>
          </h2>
        </AnimatedSection>

        {/* Team grid - show first 8 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {teamMembers.slice(0, 8).map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 60}>
              <div className="glass-card-hover p-4 text-center group">
                <div className="relative w-20 h-20 mx-auto mb-3 rounded-xl overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h4 className="text-sm font-semibold text-white">{member.name}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{member.role}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-10" delay={500}>
          <Link href="/about" className="btn-outline text-sm">
            Meet the Full Team ({teamMembers.length} Members)
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </AnimatedSection>
      </section>
    </>
  )
}
