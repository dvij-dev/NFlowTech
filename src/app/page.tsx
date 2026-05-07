'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from '@/components/TextReveal';
import MagneticButton from '@/components/MagneticButton';
import RevealOnScroll from '@/components/RevealOnScroll';
import ParallaxSection from '@/components/ParallaxSection';
import { siteConfig, services, caseStudies, teamMembers } from '@/data/site-data';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────── HERO ─────────────── */
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.2 });

      // Split headline into words
      if (headlineRef.current) {
        const text = headlineRef.current.textContent || '';
        headlineRef.current.innerHTML = text.split(' ').map(word =>
          `<span class="inline-block overflow-hidden mr-[0.25em]"><span class="hero-word inline-block" style="transform:translateY(120%);opacity:0">${word}</span></span>`
        ).join('');

        tl.to('.hero-word', {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'power4.out',
        });
      }

      tl.from(subRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4');

      tl.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3');

      tl.from(statsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.2');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-32 pb-20 overflow-hidden">
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Floating accent shapes */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 left-1/6 w-[400px] h-[400px] rounded-full bg-cyan-400/5 blur-[100px] animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10 max-w-6xl">
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 text-[10px] tracking-[0.35em] uppercase font-mono text-sky-400 border border-sky-400/20 rounded-full bg-sky-400/5">
            Digital Marketing Agency
          </span>
        </div>

        <h1 ref={headlineRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-playfair font-bold text-white leading-[0.95] mb-8">
          Excellence In Digital Strategy
        </h1>

        <p ref={subRef} className="text-base md:text-lg text-white/50 max-w-2xl leading-relaxed mb-10 font-light">
          We combine creativity, AI, data, and tech to help you scale smarter, rank faster, and connect deeper to target audiences with our exceptional digital strategies.
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4 mb-16">
          <MagneticButton
            href="/contact"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-sky-500 text-white font-semibold rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(56,189,248,0.3)]"
          >
            <span className="relative z-10">Get Free Consultation</span>
            <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </MagneticButton>

          <MagneticButton
            href="/case-studies"
            className="group inline-flex items-center gap-2 px-8 py-4 text-white/80 font-medium rounded-full border border-white/10 hover:border-white/30 transition-all hover:bg-white/5"
          >
            View Success Stories
          </MagneticButton>
        </div>

        <div ref={statsRef} className="flex flex-wrap gap-12 md:gap-16">
          {[
            { value: '27', suffix: '+', label: 'Business Niches' },
            { value: '138', suffix: '+', label: 'Brands Across Globe' },
            { value: '80', suffix: '%', label: 'Referral Business' },
            { value: '7.5', suffix: 'X', label: 'Avg ROAS' },
          ].map((stat, i) => (
            <StatCounter key={i} value={stat.value} suffix={stat.suffix} label={stat.label} delay={i * 0.15} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-mono">Scroll Down</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-sky-400 rounded-full animate-scroll-dot" />
        </div>
      </div>
    </section>
  );
}

/* ─────── STAT COUNTER ─────── */
function StatCounter({ value, suffix, label, delay = 0 }: { value: string; suffix: string; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const num = parseFloat(value);

    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => {
        if (hasAnimated) return;
        setHasAnimated(true);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: num,
          duration: 2,
          delay,
          ease: 'power2.out',
          onUpdate: () => {
            if (numRef.current) {
              numRef.current.textContent = num % 1 !== 0
                ? obj.val.toFixed(1)
                : Math.round(obj.val).toString();
            }
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [value, delay, hasAnimated]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="flex items-baseline">
        <span ref={numRef} className="text-3xl md:text-4xl font-playfair font-bold text-white tabular-nums">0</span>
        <span className="text-xl md:text-2xl font-playfair text-sky-400 ml-0.5">{suffix}</span>
      </div>
      <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 font-mono mt-1 block">{label}</span>
    </div>
  );
}

/* ─────── TRUST MARQUEE ─────── */
function TrustMarquee() {
  const partners = ['Google Partner 2025', 'Meta Business Partner', 'HubSpot Certified', 'Shopify Partner', 'Clutch Top Agency', 'Bing Ads Accredited'];

  return (
    <section className="relative py-12 border-y border-white/5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...partners, ...partners, ...partners].map((p, i) => (
          <div key={i} className="flex items-center mx-12">
            <div className="w-2 h-2 rounded-full bg-sky-400/40 mr-4" />
            <span className="text-sm text-white/30 font-mono tracking-wider uppercase">{p}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────── SERVICES ─────── */
function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const icons = ['⚡', '🎯', '🔍', '🎨'];

  return (
    <section ref={sectionRef} className="relative py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="inline-block px-4 py-1.5 text-[10px] tracking-[0.35em] uppercase font-mono text-sky-400 border border-sky-400/20 rounded-full bg-sky-400/5 mb-6">
            What We Do
          </span>
          <TextReveal as="h2" className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
            Four Engines of Growth
          </TextReveal>
          <p className="text-white/40 max-w-xl text-lg">
            Each service pillar is built to compound on the others — precision performance fuels organic reach, which feeds conversion design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.id}
              className="service-card group relative p-8 md:p-10 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-sky-400/20 transition-all duration-500 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-3xl">{icons[i]}</span>
                  <span className="text-xs font-mono text-white/20">0{i + 1}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-playfair font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.capabilities.slice(0, 4).map((cap, j) => (
                    <span key={j} className="text-[10px] tracking-wider uppercase font-mono text-sky-400/60 px-3 py-1 rounded-full border border-sky-400/10 bg-sky-400/5">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────── CASE STUDIES HORIZONTAL SCROLL ─────── */
function CaseStudiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const featured = caseStudies.slice(0, 8);

  useEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;
    if (!container || !scroll) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scroll.scrollWidth - window.innerWidth + 100;

      gsap.to(scroll, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      <div ref={scrollRef} className="flex items-center h-full gap-8 pl-6 md:pl-24 will-change-transform">
        {/* Header card */}
        <div ref={headerRef} className="flex-shrink-0 w-[400px] md:w-[500px] pr-8">
          <span className="inline-block px-4 py-1.5 text-[10px] tracking-[0.35em] uppercase font-mono text-sky-400 border border-sky-400/20 rounded-full bg-sky-400/5 mb-6">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4">
            Real Results,<br />
            <span className="text-sky-400">Real Impact.</span>
          </h2>
          <p className="text-white/40 mb-8">
            Browse data-backed case studies showing how we turned underperforming campaigns into revenue engines.
          </p>
          <MagneticButton
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sky-400 font-medium hover:text-sky-300 transition-colors"
          >
            View All Stories →
          </MagneticButton>
        </div>

        {/* Case study cards */}
        {featured.map((cs, i) => (
          <Link
            key={cs.slug}
            href={`/case-studies/${cs.slug}`}
            className="flex-shrink-0 group relative w-[350px] md:w-[400px] h-[500px] rounded-2xl overflow-hidden border border-white/5 hover:border-sky-400/20 transition-all duration-500"
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={cs.image}
                alt={cs.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{
                background: `linear-gradient(to top, ${cs.brandColor}ee 0%, ${cs.brandColor}88 40%, transparent 100%)`,
              }} />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-[9px] tracking-wider uppercase font-mono text-white/70 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">
                  {cs.industry}
                </span>
                <span className="text-[9px] tracking-wider uppercase font-mono text-white/70 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm">
                  {cs.services}
                </span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                {cs.name}
              </h3>
              <p className="text-white/60 text-sm line-clamp-2 mb-4">
                {cs.description}
              </p>
              <div className="flex gap-6">
                {cs.stats.slice(0, 2).map((stat, j) => (
                  <div key={j}>
                    <span className="text-lg font-bold text-white">{stat.value}</span>
                    <span className="text-[9px] tracking-wider uppercase text-white/50 block font-mono">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hover arrow */}
            <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─────── FOUNDER SECTION ─────── */
function FounderSection() {
  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full bg-sky-500/5 blur-[150px]" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <RevealOnScroll direction="left">
          <div className="relative">
            <div className="relative w-full aspect-[3/4] max-w-md rounded-2xl overflow-hidden">
              <Image
                src="/images/team/nevil-bhatt-2.png"
                alt="Nevil Bhatt"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-sky-400/20 rounded-2xl" />
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-sky-400/10 rounded-xl blur-sm" />
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="right" delay={0.2}>
          <div>
            <span className="inline-block px-4 py-1.5 text-[10px] tracking-[0.35em] uppercase font-mono text-sky-400 border border-sky-400/20 rounded-full bg-sky-400/5 mb-6">
              Meet Our Founder
            </span>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-2">
              Nevil Bhatt
            </h2>
            <p className="text-sky-400 font-medium mb-6">Founder & CEO · Growth Marketing Expert</p>
            <blockquote className="text-white/50 text-lg leading-relaxed border-l-2 border-sky-400/30 pl-6 mb-6 italic">
              &ldquo;I&apos;d been heads-down in digital marketing for a few years, then it hit me—I was advising clients to grow their business just to build someone else&apos;s. In 2018 I walked away, pooled my savings, and started NFlow. We were two people and a shared desk.&rdquo;
            </blockquote>
            <p className="text-white/40 leading-relaxed">
              Today NFlow is 18+ specialists across SEO, PPC, social, and conversion design — serving 138+ brands in 27+ niches with an 80% referral rate.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ─────── TEAM PREVIEW ─────── */
function TeamPreview() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.team-card').forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          delay: i * 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-[10px] tracking-[0.35em] uppercase font-mono text-sky-400 border border-sky-400/20 rounded-full bg-sky-400/5 mb-6">
            The Team
          </span>
          <TextReveal as="h2" className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
            The People Behind The Results
          </TextReveal>
          <p className="text-white/40 max-w-xl mx-auto">
            18+ specialists dedicated to scaling your business through data-driven marketing.
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {teamMembers.slice(0, 12).map((member, i) => (
            <div key={member.name} className="team-card group relative aspect-square rounded-xl overflow-hidden border border-white/5 hover:border-sky-400/20 transition-all duration-300">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 transition-transform">
                <p className="text-white text-xs font-semibold leading-tight">{member.name}</p>
                <p className="text-sky-400/70 text-[9px] font-mono tracking-wider uppercase">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <MagneticButton
            href="/about"
            className="inline-flex items-center gap-2 text-sky-400 font-medium hover:text-sky-300 transition-colors text-sm"
          >
            Meet the full team →
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

/* ─────── CTA SECTION ─────── */
function CTASection() {
  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-500/5 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-sky-400/5 blur-[150px]" />

      <RevealOnScroll className="relative z-10 max-w-4xl mx-auto text-center">
        <div>
          <TextReveal as="h2" className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6">
            Ready to Scale Smarter?
          </TextReveal>
          <p className="text-white/40 text-lg max-w-xl mx-auto mb-10">
            Join 138+ brands who trust NFlow to deliver measurable growth. No pitches — just real conversations about your business goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-10 py-5 bg-sky-500 text-white font-semibold rounded-full overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(56,189,248,0.3)]"
              strength={0.4}
            >
              <span className="relative z-10">Schedule Free Call</span>
              <svg className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}

/* ─────── MAIN PAGE ─────── */
export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <TrustMarquee />
      <Services />
      <CaseStudiesSection />
      <FounderSection />
      <TeamPreview />
      <CTASection />
    </main>
  );
}
