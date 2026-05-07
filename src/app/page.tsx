'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { siteConfig, caseStudies, services, founder } from '@/data/site-data'
import GrowthOrbit from '@/components/GrowthOrbit'
import MagneticButton from '@/components/MagneticButton'
import TextReveal from '@/components/TextReveal'
import RevealOnScroll from '@/components/RevealOnScroll'

gsap.registerPlugin(ScrollTrigger)

/* ── Trust Marquee ────────────────────────────────── */
function TrustMarquee() {
  const partners = [
    'Google Partner 2025', 'HubSpot Certified', 'Bing Ads Partner',
    'Shopify Partner', 'Clutch Top Agency', 'Meta Business Partner',
  ]
  const tripled = [...partners, ...partners, ...partners]

  return (
    <div className="relative overflow-hidden py-8 border-y border-white/5">
      <div className="animate-marquee flex whitespace-nowrap">
        {tripled.map((p, i) => (
          <span key={i} className="mx-12 text-sm tracking-widest uppercase text-white/20 font-mono">
            {p}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Services Section ─────────────────────────────── */
function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.service-card')
    if (!cards) return

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
        }
      )
    })
  }, [])

  const icons = ['⚡', '🎯', '🔍', '🎨']

  return (
    <section ref={sectionRef} className="relative py-32 px-8 md:px-16 lg:px-24">
      <RevealOnScroll direction="up">
        <p className="label mb-4">What We Do</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Four Pillars of Growth</h2>
        <p className="text-white/40 max-w-2xl mb-16">
          Each service pillar is built to compound on the others — precision
          performance fuels organic reach, which feeds conversion design.
        </p>
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 gap-6">
        {services.map((svc, i) => (
          <div key={i} className="service-card glass-card-hover p-8 relative group">
            <div className="text-3xl mb-4">{icons[i]}</div>
            <span className="absolute top-6 right-8 text-white/10 font-mono text-sm">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">{svc.description}</p>
            <div className="flex flex-wrap gap-2">
              {svc.capabilities.map((item: string) => (
                <span key={item} className="px-3 py-1 text-[10px] tracking-widest uppercase font-mono
                  border border-sky-400/20 rounded-full text-sky-400/70">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Featured Case Studies ────────────────────────── */
function CaseStudiesSection() {
  const featured = caseStudies.slice(0, 6)

  return (
    <section className="relative py-32 px-8 md:px-16 lg:px-24">
      <RevealOnScroll direction="up">
        <p className="label mb-4">Success Stories</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Real Results,{' '}
          <span className="gradient-text">Real Impact.</span>
        </h2>
        <p className="text-white/40 max-w-2xl mb-16">
          Case studies showing how we turned campaigns into revenue engines.
        </p>
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((cs, i) => (
          <RevealOnScroll key={cs.slug} direction="up" delay={i * 0.1}>
            <Link href={`/case-studies/${cs.slug}`} className="group block">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                {/* Animated gradient overlay matching brand */}
                <div
                  className="absolute inset-0 z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${cs.brandColor}cc 0%, ${cs.brandAccent}66 100%)`,
                  }}
                />
                <Image
                  src={cs.image}
                  alt={cs.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Brand color accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 z-20"
                  style={{ background: `linear-gradient(90deg, ${cs.brandColor}, ${cs.brandAccent})` }}
                />
              </div>

              {/* Tags */}
              <div className="flex gap-2 mb-2">
                <span className="text-[10px] tracking-widest uppercase font-mono text-white/40">
                  {cs.industry}
                </span>
                <span className="text-white/20">·</span>
                <span className="text-[10px] tracking-widest uppercase font-mono" style={{ color: cs.brandAccent }}>
                  {cs.services}
                </span>
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-white group-hover:text-sky-400 transition-colors">
                {cs.name}
              </h3>

              {/* Stats */}
              <div className="flex gap-6 mt-3">
                {cs.stats.slice(0, 2).map((stat, si) => (
                  <div key={si}>
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-[10px] tracking-widest uppercase text-white/30">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Link>
          </RevealOnScroll>
        ))}
      </div>

      <div className="text-center mt-16">
        <MagneticButton>
          <Link href="/case-studies"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10
              text-white hover:bg-white/5 transition-all font-medium">
            View All Case Studies
            <span className="text-sky-400">→</span>
          </Link>
        </MagneticButton>
      </div>
    </section>
  )
}

/* ── Founder Section ──────────────────────────────── */
function FounderSection() {
  return (
    <section className="relative py-32 px-8 md:px-16 lg:px-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <RevealOnScroll direction="left">
          <div className="relative">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
            </div>
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-6 glass-card p-6 animate-float">
              <div className="text-3xl font-bold text-white">7.5X</div>
              <div className="text-xs tracking-widest uppercase text-white/40">Avg Client ROAS</div>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="right">
          <p className="label mb-4">The Visionary</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {founder.name}
          </h2>
          <p className="text-lg text-white/50 mb-4">{founder.role}</p>
          <div className="space-y-4 text-white/40 leading-relaxed">
            <p>
              Started NFlow in 2018 with two people and a belief: data-driven marketing
              can transform businesses of every size. Seven years and 138+ brands later,
              that belief is proven every single day.
            </p>
            <p>
              Under Nevil&apos;s leadership, NFlow has grown into a powerhouse team of 18+
              specialists spanning two continents, with an 80% referral rate that speaks
              louder than any award.
            </p>
          </div>
          <div className="mt-8">
            <MagneticButton>
              <Link href="/about"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full
                  bg-gradient-to-r from-sky-500 to-sky-600 text-white font-medium
                  hover:shadow-lg hover:shadow-sky-500/25 transition-all">
                About Our Story
                <span>→</span>
              </Link>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ── CTA Section ──────────────────────────────────── */
function CTASection() {
  return (
    <section className="relative py-32 px-8 md:px-16 lg:px-24 text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <TextReveal className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 max-w-4xl mx-auto leading-tight">
          Ready to become the next success story?
        </TextReveal>
        <RevealOnScroll direction="up" delay={0.3}>
          <p className="text-white/40 text-lg max-w-xl mx-auto mb-10">
            Join 138+ brands that chose data-driven growth over guesswork.
            Your transformation starts with a conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton>
              <Link href="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full
                  bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold text-lg
                  hover:shadow-xl hover:shadow-sky-500/25 transition-all">
                Get Free Consultation
                <span>→</span>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/case-studies"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full
                  border border-white/10 text-white font-medium text-lg
                  hover:bg-white/5 transition-all">
                View Success Stories
              </Link>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ── Main Page ────────────────────────────────────── */
export default function Home() {
  return (
    <main>
      {/* Hero - minimal, just logo + tagline before the journey */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-8">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-[100px]" />
        </div>

        <div className="relative z-10 space-y-6">
          <p className="label animate-fade-in" style={{ animationDelay: '0.5s' }}>Digital Marketing Agency</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white animate-fade-up" style={{ animationDelay: '0.7s' }}>
            Excellence In<br />
            <span className="gradient-text">Digital Strategy</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.9s' }}>
            We combine creativity, AI, data, and tech to help you scale smarter,
            rank faster, and connect deeper to target audiences.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 animate-fade-in" style={{ animationDelay: '1.5s' }}>
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-mono">Begin Your Journey</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-sky-400 animate-scroll-dot" />
          </div>
        </div>
      </section>

      {/* The Growth Orbit — scroll-driven storytelling journey */}
      <GrowthOrbit />

      {/* Trust Marquee */}
      <TrustMarquee />

      {/* Services */}
      <ServicesSection />

      {/* Case Studies */}
      <CaseStudiesSection />

      {/* Founder */}
      <FounderSection />

      {/* CTA */}
      <CTASection />
    </main>
  )
}
