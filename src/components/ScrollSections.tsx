'use client';

import { useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   ScrollSections — Hatom-style scroll spacers + content overlays
   
   The WebGL canvas is fixed full-screen. These HTML sections sit on top,
   providing scroll distance for the camera path, with content that fades
   in/out at specific scroll positions.
   ═══════════════════════════════════════════════════════════════════════════ */

const SECTIONS_COUNT = 16; // viewport-height spacers (like hatom's 16-18)

interface ContentBlock {
  id: string;
  startProgress: number; // When to start showing (0-1)
  endProgress: number;   // When to finish showing
  content: React.ReactNode;
  position?: 'center' | 'left' | 'right';
}

const CONTENT_BLOCKS: ContentBlock[] = [
  {
    id: 'hero-title',
    startProgress: 0.0,
    endProgress: 0.12,
    position: 'center',
    content: (
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-light tracking-tight text-white mb-6"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.04em' }}>
          <span className="block opacity-90">NFlow</span>
          <span className="block text-3xl md:text-4xl font-extralight tracking-widest text-sky-300/80 mt-2">
            TECHNOLOGIES
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/50 font-light max-w-md mx-auto mt-8">
          Performance marketing that transforms brands
        </p>
        <div className="mt-12 flex items-center justify-center gap-2 text-white/30 text-sm">
          <span className="block w-px h-8 bg-white/20 animate-pulse" />
          <span className="uppercase tracking-[0.3em] text-xs">Scroll to explore</span>
        </div>
      </div>
    ),
  },
  {
    id: 'stats',
    startProgress: 0.12,
    endProgress: 0.22,
    position: 'center',
    content: (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 max-w-4xl mx-auto">
        {[
          { value: '138+', label: 'Brands Served' },
          { value: '7.5X', label: 'Average ROAS' },
          { value: '₹2.8B+', label: 'Revenue Generated' },
          { value: '80%', label: 'Referral Rate' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-4xl md:text-5xl font-light text-white mb-2"
                 style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em' }}>
              {stat.value}
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/40">{stat.label}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'services-intro',
    startProgress: 0.25,
    endProgress: 0.35,
    position: 'left',
    content: (
      <div className="max-w-lg">
        <div className="text-xs uppercase tracking-[0.3em] text-sky-400/70 mb-4">What We Do</div>
        <h2 className="text-4xl md:text-5xl font-light text-white mb-6"
            style={{ letterSpacing: '-0.03em' }}>
          Full-Funnel<br />Performance
        </h2>
        <p className="text-white/40 font-light leading-relaxed">
          From awareness to acquisition, we architect data-driven campaigns
          across every major platform — Google, Meta, Amazon, TikTok, and beyond.
        </p>
      </div>
    ),
  },
  {
    id: 'services-ppc',
    startProgress: 0.35,
    endProgress: 0.45,
    position: 'right',
    content: (
      <div className="max-w-lg text-right">
        <div className="text-xs uppercase tracking-[0.3em] text-purple-400/70 mb-4">PPC</div>
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}>
          Paid Search & Shopping
        </h2>
        <div className="flex flex-wrap justify-end gap-3 mb-6">
          {['Google Ads', 'Amazon Ads', 'Bing Ads'].map((tag) => (
            <span key={tag} className="px-3 py-1 border border-white/10 rounded-full text-sm text-white/50">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-white/40 font-light leading-relaxed">
          Precision bidding, feed optimization, and search term mining
          that delivers consistent ROAS at scale.
        </p>
      </div>
    ),
  },
  {
    id: 'services-social',
    startProgress: 0.45,
    endProgress: 0.55,
    position: 'left',
    content: (
      <div className="max-w-lg">
        <div className="text-xs uppercase tracking-[0.3em] text-pink-400/70 mb-4">Social</div>
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}>
          Social Advertising
        </h2>
        <div className="flex flex-wrap gap-3 mb-6">
          {['Meta Ads', 'Pinterest Ads', 'TikTok Ads'].map((tag) => (
            <span key={tag} className="px-3 py-1 border border-white/10 rounded-full text-sm text-white/50">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-white/40 font-light leading-relaxed">
          Creative-led campaigns that capture attention and convert across
          the social landscape — from Reels to Stories to For You pages.
        </p>
      </div>
    ),
  },
  {
    id: 'services-seo',
    startProgress: 0.55,
    endProgress: 0.65,
    position: 'right',
    content: (
      <div className="max-w-lg text-right">
        <div className="text-xs uppercase tracking-[0.3em] text-emerald-400/70 mb-4">Organic</div>
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4"
            style={{ letterSpacing: '-0.02em' }}>
          SEO & Branding
        </h2>
        <p className="text-white/40 font-light leading-relaxed">
          Technical SEO, content strategy, and brand identity design that
          builds lasting organic presence alongside your paid channels.
        </p>
      </div>
    ),
  },
  {
    id: 'approach',
    startProgress: 0.68,
    endProgress: 0.78,
    position: 'center',
    content: (
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs uppercase tracking-[0.3em] text-sky-400/70 mb-4">Our Approach</div>
        <h2 className="text-4xl md:text-5xl font-light text-white mb-6"
            style={{ letterSpacing: '-0.03em' }}>
          Conversion-Led Design
        </h2>
        <p className="text-white/40 font-light leading-relaxed mb-8">
          Every touchpoint is engineered for conversion. We combine performance data
          with creative intelligence to craft experiences that don't just look beautiful
          — they perform.
        </p>
        <div className="flex justify-center gap-8 text-white/30">
          {['27+ Industries', '₹2.8B+ Revenue', '80% Referrals'].map((item) => (
            <span key={item} className="text-sm tracking-wide">{item}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'cta',
    startProgress: 0.82,
    endProgress: 0.95,
    position: 'center',
    content: (
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-light text-white mb-8"
            style={{ letterSpacing: '-0.04em' }}>
          Let's Build<br />Something Great
        </h2>
        <a href="/contact"
           className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white/80 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group">
          <span className="text-sm uppercase tracking-[0.2em]">Start a Project</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    ),
  },
];

export default function ScrollSections() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollHeight > 0 ? window.scrollY / scrollHeight : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll spacer sections */}
      <div className="relative" style={{ zIndex: 1 }}>
        {Array.from({ length: SECTIONS_COUNT }, (_, i) => (
          <div
            key={i}
            ref={(el) => { if (el) sectionRefs.current[i] = el; }}
            className="h-screen w-full"
            data-lenis-section={i}
          />
        ))}
      </div>

      {/* Content overlays — fixed, fade in/out based on scroll */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        {CONTENT_BLOCKS.map((block) => {
          // Calculate visibility
          const fadeInStart = block.startProgress;
          const fadeInEnd = block.startProgress + 0.03;
          const fadeOutStart = block.endProgress - 0.03;
          const fadeOutEnd = block.endProgress;

          let opacity = 0;
          if (scrollProgress >= fadeInStart && scrollProgress <= fadeOutEnd) {
            if (scrollProgress < fadeInEnd) {
              opacity = (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart);
            } else if (scrollProgress > fadeOutStart) {
              opacity = 1 - (scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
            } else {
              opacity = 1;
            }
          }

          // Slight Y transform for entrance/exit
          const yOffset = scrollProgress < fadeInEnd
            ? (1 - opacity) * 30
            : scrollProgress > fadeOutStart
              ? (1 - opacity) * -30
              : 0;

          if (opacity < 0.01) return null;

          const positionClasses = {
            center: 'items-center justify-center px-8',
            left: 'items-center justify-start pl-8 md:pl-24',
            right: 'items-center justify-end pr-8 md:pr-24',
          }[block.position || 'center'];

          return (
            <div
              key={block.id}
              className={`absolute inset-0 flex ${positionClasses}`}
              style={{
                opacity: Math.max(0, Math.min(1, opacity)),
                transform: `translateY(${yOffset}px)`,
                transition: 'opacity 0.1s ease-out',
                pointerEvents: opacity > 0.5 ? 'auto' : 'none',
              }}
            >
              {block.content}
            </div>
          );
        })}
      </div>

      {/* Navigation overlay */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 md:p-8 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <a href="/" className="text-white/80 hover:text-white transition-colors text-lg font-light tracking-wider">
            NFLOW
          </a>
        </div>
        <div className="pointer-events-auto flex items-center gap-6">
          <a href="/services" className="text-white/40 hover:text-white/80 transition-colors text-sm tracking-wider hidden md:block">
            SERVICES
          </a>
          <a href="/case-studies" className="text-white/40 hover:text-white/80 transition-colors text-sm tracking-wider hidden md:block">
            WORK
          </a>
          <a href="/about" className="text-white/40 hover:text-white/80 transition-colors text-sm tracking-wider hidden md:block">
            ABOUT
          </a>
          <a href="/contact" className="text-white/40 hover:text-white/80 transition-colors text-sm tracking-wider">
            CONTACT
          </a>
        </div>
      </div>

      {/* Scroll progress indicator */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1">
        {CONTENT_BLOCKS.map((block, i) => {
          const isActive = scrollProgress >= block.startProgress && scrollProgress <= block.endProgress;
          return (
            <div
              key={block.id}
              className={`w-0.5 transition-all duration-300 rounded-full ${
                isActive ? 'h-6 bg-white/60' : 'h-2 bg-white/15'
              }`}
            />
          );
        })}
      </div>
    </>
  );
}
