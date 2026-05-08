'use client';

import { useEffect, useRef, useState, useMemo } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   ScrollSections V15 — Immersive Case Studies + Meaningful Journey
   
   Each case study is a full-screen brand immersion:
   - Looping background video reflecting the client's industry
   - Brand color palette applied to overlays, text accents, glow
   - Industry micro-graphics (floating SVG elements)
   - Stats with brand-colored accents
   
   The orb's color adapts to each case study's brand palette,
   making the 3D scene feel like it belongs to each client's world.
   ═══════════════════════════════════════════════════════════════════════════ */

const SECTIONS_COUNT = 16;

/* ── Featured Case Studies ─────────────────────────────────────────────── */

interface FeaturedCase {
  id: string;
  name: string;
  industry: string;
  tagline: string;
  description: string;
  stats: { value: string; label: string }[];
  services: string;
  brandColor: string;
  brandAccent: string;
  videoSrc: string;
  microGraphics: string[]; // SVG path data for floating industry icons
}

const FEATURED_CASES: FeaturedCase[] = [
  {
    id: 'kinddesigns',
    name: 'KindDesigns',
    industry: 'Marine Technology',
    tagline: '3D-Printed Living Seawalls',
    description: 'Advanced 3D printing meets environmental science — building biologically active seawalls that protect coastlines and restore marine ecosystems across South Florida.',
    stats: [
      { value: '9.8K+', label: 'Sessions' },
      { value: '200K+', label: 'Impressions' },
      { value: '52.5%', label: 'Engagement' },
    ],
    services: 'SEO',
    brandColor: '#0C4A37',
    brandAccent: '#2ECC71',
    videoSrc: '/videos/kinddesigns-bg.mp4',
    microGraphics: [
      // Wave
      'M2 12c1.5-2 3-3 5-3s3.5 1 5 3 3 3 5 3 3.5-1 5-3',
      // Coral/reef
      'M12 22V12m-4 4l4-4 4 4m-8-4l4-4 4 4',
      // Drop
      'M12 2C8 7 6 10 6 13a6 6 0 0012 0c0-3-2-6-6-11z',
    ],
  },
  {
    id: 'kindtokidz',
    name: 'KindtoKidz',
    industry: 'E-Commerce · Toys & Education',
    tagline: 'Montessori-Inspired Growth',
    description: 'Proudly Australian, KindtoKidz offers curated Montessori toys and educational resources. Precision Google Ads management scaled revenue 312% while hitting 8.2X ROAS.',
    stats: [
      { value: '312%', label: 'Revenue Growth' },
      { value: '8.2X', label: 'ROAS' },
      { value: '₹41L+', label: 'Revenue' },
    ],
    services: 'Google Ads',
    brandColor: '#FF6B35',
    brandAccent: '#FFB547',
    videoSrc: '/videos/kindtokidz-bg.mp4',
    microGraphics: [
      // Star
      'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z',
      // Block/cube
      'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
      // Heart
      'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z',
    ],
  },
  {
    id: 'parsemus',
    name: 'Parsemus Foundation',
    industry: 'Healthcare & Medical Research',
    tagline: 'Advancing Overlooked Research',
    description: 'A non-profit advancing innovative medical research — from Alzheimer\'s prevention to male contraceptives. Pro bono Google Ads management driving awareness for breakthrough treatments.',
    stats: [
      { value: '6,529+', label: 'Impressions' },
      { value: '588+', label: 'Clicks' },
      { value: '9.01%', label: 'CTR' },
    ],
    services: 'Google Ads',
    brandColor: '#2C3E50',
    brandAccent: '#E74C3C',
    videoSrc: '/videos/parsemus-bg.mp4',
    microGraphics: [
      // DNA/helix
      'M12 2v20M8 4c2 2 6 2 8 0M8 10c2 2 6 2 8 0M8 16c2 2 6 2 8 0',
      // Plus/medical
      'M12 5v14M5 12h14',
      // Molecule
      'M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0M12 2v7M12 15v7M5 12h4M15 12h4',
    ],
  },
  {
    id: 'evelaniq',
    name: 'Evelaniq',
    industry: 'Personal Hygiene & Wellness',
    tagline: 'Premium Wellness at Scale',
    description: 'Scaling a personal hygiene and wellness brand through data-driven social advertising — building brand awareness and conversion funnels that resonate with health-conscious consumers.',
    stats: [
      { value: '4.8X', label: 'ROAS' },
      { value: '156%', label: 'Traffic ↑' },
      { value: '38%', label: 'CPA ↓' },
    ],
    services: 'Social Ads',
    brandColor: '#2D1B69',
    brandAccent: '#A78BFA',
    videoSrc: '/videos/evelaniq-bg.mp4',
    microGraphics: [
      // Leaf/organic
      'M12 22c4-4 8-8 8-12S14 2 12 2 4 6 4 10s4 8 8 12z',
      // Droplet
      'M12 2C8 7 6 10 6 13a6 6 0 0012 0c0-3-2-6-6-11z',
      // Sparkle
      'M12 3v3m0 12v3m-7.5-7.5h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1',
    ],
  },
];

/* ── Floating Micro-Graphics Component ─────────────────────────────────── */

function MicroGraphics({ 
  paths, 
  color, 
  opacity = 0.15 
}: { 
  paths: string[]; 
  color: string; 
  opacity?: number;
}) {
  // Deterministic positions for floating micro-graphics
  const elements = useMemo(() => {
    const positions = [
      { x: '8%', y: '15%', size: 32, delay: 0, duration: 12 },
      { x: '88%', y: '25%', size: 24, delay: 2, duration: 15 },
      { x: '15%', y: '75%', size: 28, delay: 4, duration: 10 },
      { x: '82%', y: '70%', size: 20, delay: 1, duration: 14 },
      { x: '50%', y: '85%', size: 22, delay: 3, duration: 11 },
      { x: '25%', y: '40%', size: 18, delay: 5, duration: 13 },
      { x: '75%', y: '45%', size: 26, delay: 2.5, duration: 16 },
      { x: '92%', y: '55%', size: 16, delay: 1.5, duration: 12 },
    ];
    return positions.map((pos, i) => ({
      ...pos,
      pathIndex: i % paths.length,
    }));
  }, [paths.length]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: el.x,
            top: el.y,
            opacity,
            animation: `float-micro ${el.duration}s ease-in-out ${el.delay}s infinite alternate`,
          }}
        >
          <svg
            width={el.size}
            height={el.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={paths[el.pathIndex]} />
          </svg>
        </div>
      ))}
      <style jsx>{`
        @keyframes float-micro {
          0% { transform: translateY(0) rotate(0deg) scale(1); }
          100% { transform: translateY(-20px) rotate(15deg) scale(1.1); }
        }
      `}</style>
    </div>
  );
}

/* ── Video Background Component ────────────────────────────────────────── */

function VideoBackground({
  src,
  brandColor,
  opacity = 1,
}: {
  src: string;
  brandColor: string;
  opacity: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    video.play().catch(() => {
      // Autoplay might be blocked — that's fine, we have the gradient fallback
    });
  }, []);

  return (
    <div 
      className="absolute inset-0 transition-opacity duration-1000"
      style={{ opacity }}
    >
      {/* Video layer */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: videoLoaded ? 0.35 : 0 }}
      />
      
      {/* Brand color gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${brandColor}40 0%, ${brandColor}90 50%, ${brandColor}F0 100%)`,
        }}
      />
      
      {/* Darken edges for text readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.7) 100%)',
        }}
      />
    </div>
  );
}

/* ── Case Study Card Component ─────────────────────────────────────────── */

function CaseStudyBlock({
  caseStudy,
  opacity,
  yOffset,
}: {
  caseStudy: FeaturedCase;
  opacity: number;
  yOffset: number;
}) {
  return (
    <div 
      className="absolute inset-0 flex items-center"
      style={{
        opacity: Math.max(0, Math.min(1, opacity)),
        transform: `translateY(${yOffset}px)`,
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
      }}
    >
      {/* Video BG + overlays */}
      <VideoBackground 
        src={caseStudy.videoSrc} 
        brandColor={caseStudy.brandColor}
        opacity={opacity}
      />
      
      {/* Floating micro-graphics */}
      <MicroGraphics 
        paths={caseStudy.microGraphics} 
        color={caseStudy.brandAccent}
        opacity={0.12 * opacity}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text content */}
        <div>
          {/* Service tag */}
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-8 h-px"
              style={{ backgroundColor: caseStudy.brandAccent }}
            />
            <span 
              className="text-xs uppercase tracking-[0.3em] font-medium"
              style={{ color: caseStudy.brandAccent }}
            >
              {caseStudy.services}
            </span>
          </div>

          {/* Industry */}
          <div className="text-white/40 text-sm tracking-wide mb-2">
            {caseStudy.industry}
          </div>

          {/* Name */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3"
              style={{ letterSpacing: '-0.03em', textShadow: '0 0 40px rgba(0,0,0,0.5)' }}>
            {caseStudy.name}
          </h2>

          {/* Tagline */}
          <p className="text-lg md:text-xl font-light mb-6"
             style={{ color: `${caseStudy.brandAccent}CC` }}>
            {caseStudy.tagline}
          </p>

          {/* Description */}
          <p className="text-white/50 font-light leading-relaxed max-w-lg mb-8 text-sm md:text-base">
            {caseStudy.description}
          </p>

          {/* View case study link */}
          <a 
            href={`/case-studies/${caseStudy.id}`}
            className="inline-flex items-center gap-2 text-sm tracking-wide group transition-colors"
            style={{ color: caseStudy.brandAccent }}
          >
            <span className="uppercase tracking-[0.15em]">View Case Study</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* Right: Stats */}
        <div className="flex flex-col items-end">
          <div className="space-y-6">
            {caseStudy.stats.map((stat, i) => (
              <div key={i} className="text-right">
                <div 
                  className="text-5xl md:text-6xl lg:text-7xl font-extralight"
                  style={{ 
                    color: i === 0 ? caseStudy.brandAccent : 'rgba(255,255,255,0.85)',
                    letterSpacing: '-0.04em',
                    textShadow: `0 0 30px ${caseStudy.brandColor}80`,
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/30 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Content Block Types ───────────────────────────────────────────────── */

interface ContentBlock {
  id: string;
  startProgress: number;
  endProgress: number;
  content: React.ReactNode;
  position?: 'center' | 'left' | 'right';
}

/* ── Main Component ────────────────────────────────────────────────────── */

interface ScrollSectionsProps {
  activated?: boolean;
}

export default function ScrollSections({ activated = false }: ScrollSectionsProps) {
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

  // Show "Scroll to explore" after activation
  useEffect(() => {
    if (activated) {
      const timer = setTimeout(() => {
        const el = document.querySelector('.scroll-prompt') as HTMLElement;
        if (el) el.style.opacity = '1';
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [activated]);

  // Expose current brand color on window for CosmicJourney to read
  useEffect(() => {
    const caseRanges = [
      { start: 0.32, end: 0.46, color: FEATURED_CASES[0].brandAccent, brandColor: FEATURED_CASES[0].brandColor },
      { start: 0.46, end: 0.60, color: FEATURED_CASES[1].brandAccent, brandColor: FEATURED_CASES[1].brandColor },
      { start: 0.60, end: 0.74, color: FEATURED_CASES[2].brandAccent, brandColor: FEATURED_CASES[2].brandColor },
      { start: 0.74, end: 0.84, color: FEATURED_CASES[3].brandAccent, brandColor: FEATURED_CASES[3].brandColor },
    ];
    
    let activeColor = null;
    let activeBrandColor = null;
    for (const range of caseRanges) {
      if (scrollProgress >= range.start && scrollProgress <= range.end) {
        activeColor = range.color;
        activeBrandColor = range.brandColor;
        break;
      }
    }
    
    // Set on window for CosmicJourney to read
    (window as unknown as Record<string, unknown>).__nflow_brand_accent = activeColor;
    (window as unknown as Record<string, unknown>).__nflow_brand_color = activeBrandColor;
  }, [scrollProgress]);

  // Standard content blocks (non-case-study)
  const standardBlocks: ContentBlock[] = useMemo(() => [
    {
      id: 'hero-title',
      startProgress: 0.0,
      endProgress: 0.10,
      position: 'center' as const,
      content: (
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight text-white mb-6"
              style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.04em', textShadow: '0 0 40px rgba(0,0,0,0.8), 0 0 80px rgba(0,0,0,0.5)' }}>
            <span className="block opacity-90">NFlow</span>
            <span className="block text-3xl md:text-4xl font-extralight tracking-widest text-sky-300/80 mt-2">
              TECHNOLOGIES
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 font-light max-w-md mx-auto mt-8"
             style={{ textShadow: '0 0 30px rgba(0,0,0,0.8)' }}>
            Performance marketing that transforms brands
          </p>
          <div className="mt-12 flex items-center justify-center gap-2 text-white/30 text-sm scroll-prompt"
               style={{ opacity: 0, transition: 'opacity 1s ease-out 1.5s' }}>
            <span className="block w-px h-8 bg-white/20 animate-pulse" />
            <span className="uppercase tracking-[0.3em] text-xs">Scroll to explore</span>
          </div>
        </div>
      ),
    },
    {
      id: 'stats',
      startProgress: 0.10,
      endProgress: 0.20,
      position: 'center' as const,
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
      startProgress: 0.20,
      endProgress: 0.32,
      position: 'center' as const,
      content: (
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-sky-400/70 mb-4">What We Do</div>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6"
              style={{ letterSpacing: '-0.03em' }}>
            Full-Funnel Performance
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Google Ads', 'Meta Ads', 'Amazon Ads', 'TikTok Ads', 'SEO', 'Branding'].map((tag) => (
              <span key={tag} className="px-4 py-1.5 border border-white/10 rounded-full text-sm text-white/50 hover:border-white/25 transition-colors">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-white/40 font-light leading-relaxed max-w-xl mx-auto">
            From awareness to acquisition — we architect data-driven campaigns
            across every major platform, in 27+ industries worldwide.
          </p>
        </div>
      ),
    },
    {
      id: 'approach',
      startProgress: 0.84,
      endProgress: 0.92,
      position: 'center' as const,
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
      startProgress: 0.92,
      endProgress: 0.99,
      position: 'center' as const,
      content: (
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-light text-white mb-8"
              style={{ letterSpacing: '-0.04em' }}>
            {"Let's Build"}<br />Something Great
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
  ], []);

  // Case study scroll ranges (each gets ~14% of scroll)
  const caseStudyRanges = useMemo(() => [
    { start: 0.32, end: 0.46 },
    { start: 0.46, end: 0.60 },
    { start: 0.60, end: 0.74 },
    { start: 0.74, end: 0.84 },
  ], []);

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

      {/* Standard content overlays */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
        {standardBlocks.map((block) => {
          const fadeInStart = block.startProgress;
          const fadeInEnd = block.startProgress + 0.03;
          const fadeOutStart = block.endProgress - 0.03;
          const fadeOutEnd = block.endProgress;

          let opacity = 0;
          if (scrollProgress >= fadeInStart && scrollProgress <= fadeOutEnd) {
            if (block.startProgress === 0 && scrollProgress < fadeInEnd) {
              opacity = 1;
            } else if (scrollProgress < fadeInEnd) {
              opacity = (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart);
            } else if (scrollProgress > fadeOutStart) {
              opacity = 1 - (scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
            } else {
              opacity = 1;
            }
          }

          const yOffset = scrollProgress < fadeInEnd
            ? (1 - opacity) * 30
            : scrollProgress > fadeOutStart
              ? (1 - opacity) * -30
              : 0;

          if (opacity < 0.01) return null;

          const positionClasses = {
            center: 'items-start justify-center pt-[12vh] px-8',
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

      {/* Case study immersive sections */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 8 }}>
        {FEATURED_CASES.map((cs, i) => {
          const range = caseStudyRanges[i];
          if (!range) return null;

          const fadeIn = 0.04;
          const fadeOut = 0.04;
          
          let opacity = 0;
          if (scrollProgress >= range.start && scrollProgress <= range.end) {
            if (scrollProgress < range.start + fadeIn) {
              opacity = (scrollProgress - range.start) / fadeIn;
            } else if (scrollProgress > range.end - fadeOut) {
              opacity = 1 - (scrollProgress - (range.end - fadeOut)) / fadeOut;
            } else {
              opacity = 1;
            }
          }

          const yOffset = scrollProgress < range.start + fadeIn
            ? (1 - opacity) * 40
            : scrollProgress > range.end - fadeOut
              ? (1 - opacity) * -40
              : 0;

          if (opacity < 0.01) return null;

          return (
            <CaseStudyBlock
              key={cs.id}
              caseStudy={cs}
              opacity={opacity}
              yOffset={yOffset}
            />
          );
        })}
      </div>

      {/* Case study transition indicator */}
      <div className="fixed left-8 md:left-16 bottom-8 z-50 pointer-events-none">
        {FEATURED_CASES.map((cs, i) => {
          const range = caseStudyRanges[i];
          if (!range) return null;
          const isActive = scrollProgress >= range.start && scrollProgress <= range.end;
          
          return (
            <div
              key={cs.id}
              className="flex items-center gap-2 mb-2 transition-all duration-500"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(-20px)',
              }}
            >
              <div 
                className="w-6 h-0.5 rounded-full transition-all duration-500"
                style={{ backgroundColor: isActive ? cs.brandAccent : 'rgba(255,255,255,0.1)' }}
              />
              <span className="text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: isActive ? cs.brandAccent : 'rgba(255,255,255,0.2)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
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
        {[...standardBlocks.slice(0, 3), ...FEATURED_CASES.map((cs, i) => ({ id: cs.id, startProgress: caseStudyRanges[i]?.start || 0, endProgress: caseStudyRanges[i]?.end || 0 })), ...standardBlocks.slice(3)].map((block) => {
          const isActive = scrollProgress >= block.startProgress && scrollProgress <= block.endProgress;
          const isCaseStudy = FEATURED_CASES.some(cs => cs.id === block.id);
          const csColor = isCaseStudy ? FEATURED_CASES.find(cs => cs.id === block.id)?.brandAccent : undefined;
          
          return (
            <div
              key={block.id}
              className="w-0.5 transition-all duration-300 rounded-full"
              style={{
                height: isActive ? '24px' : '8px',
                backgroundColor: isActive 
                  ? (csColor || 'rgba(255,255,255,0.6)')
                  : 'rgba(255,255,255,0.15)',
              }}
            />
          );
        })}
      </div>
    </>
  );
}
