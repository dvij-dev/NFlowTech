'use client'

import { useEffect, useRef } from 'react'
import { type CaseStudyTheme } from '@/data/case-study-themes'
import Image from 'next/image'

// SVG pattern backgrounds
function PatternSVG({ pattern, color }: { pattern: string; color: string }) {
  const c = color.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)

  switch (pattern) {
    case 'waves':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <defs>
            <pattern id="waves" x="0" y="0" width="200" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q50 20 100 50 T200 50" fill="none" stroke={`rgba(${r},${g},${b},0.3)`} strokeWidth="1.5" />
              <path d="M0 70 Q50 40 100 70 T200 70" fill="none" stroke={`rgba(${r},${g},${b},0.2)`} strokeWidth="1" />
              <path d="M0 30 Q50 0 100 30 T200 30" fill="none" stroke={`rgba(${r},${g},${b},0.15)`} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves)" />
        </svg>
      )
    case 'circuits':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-15" preserveAspectRatio="none">
          <defs>
            <pattern id="circuits" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10 L40 10 L40 40" fill="none" stroke={`rgba(${r},${g},${b},0.4)`} strokeWidth="1" />
              <path d="M60 60 L90 60 L90 90" fill="none" stroke={`rgba(${r},${g},${b},0.3)`} strokeWidth="1" />
              <path d="M60 10 L60 40 L90 40" fill="none" stroke={`rgba(${r},${g},${b},0.25)`} strokeWidth="1" />
              <circle cx="40" cy="40" r="3" fill={`rgba(${r},${g},${b},0.4)`} />
              <circle cx="60" cy="60" r="3" fill={`rgba(${r},${g},${b},0.3)`} />
              <circle cx="10" cy="10" r="2" fill={`rgba(${r},${g},${b},0.3)`} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuits)" />
        </svg>
      )
    case 'dots':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <defs>
            <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1.5" fill={`rgba(${r},${g},${b},0.4)`} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      )
    case 'grid':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0 L0 0 0 60" fill="none" stroke={`rgba(${r},${g},${b},0.3)`} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      )
    case 'hexagons':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-15" preserveAspectRatio="none">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <path d="M30 0 L60 15 L60 37 L30 52 L0 37 L0 15 Z" fill="none" stroke={`rgba(${r},${g},${b},0.3)`} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      )
    case 'diagonal':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          <defs>
            <pattern id="diagonal" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="20" stroke={`rgba(${r},${g},${b},0.3)`} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonal)" />
        </svg>
      )
    case 'confetti':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-25" preserveAspectRatio="none">
          <defs>
            <pattern id="confetti" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="10" y="15" width="6" height="3" rx="1" fill={`rgba(${r},${g},${b},0.5)`} transform="rotate(30 13 16.5)" />
              <rect x="50" y="40" width="5" height="3" rx="1" fill={`rgba(${r},${g},${b},0.4)`} transform="rotate(-20 52.5 41.5)" />
              <circle cx="35" cy="65" r="2.5" fill={`rgba(${r},${g},${b},0.3)`} />
              <rect x="65" y="10" width="4" height="8" rx="1" fill={`rgba(${r},${g},${b},0.35)`} transform="rotate(60 67 14)" />
              <circle cx="20" cy="50" r="1.5" fill={`rgba(${r},${g},${b},0.4)`} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#confetti)" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <defs>
            <pattern id="sparkles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 40 L52 48 L50 56 L48 48 Z" fill={`rgba(${r},${g},${b},0.5)`} />
              <path d="M20 70 L21 74 L20 78 L19 74 Z" fill={`rgba(${r},${g},${b},0.3)`} />
              <path d="M80 20 L81.5 26 L80 32 L78.5 26 Z" fill={`rgba(${r},${g},${b},0.4)`} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sparkles)" />
        </svg>
      )
    default: // organic, bubbles, petals, blueprint, geometric
      return (
        <svg className="absolute inset-0 w-full h-full opacity-15" preserveAspectRatio="none">
          <defs>
            <pattern id="default-pat" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill={`rgba(${r},${g},${b},0.3)`} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#default-pat)" />
        </svg>
      )
  }
}

// Floating shape components
function FloatingShape({ shape }: { shape: CaseStudyTheme['shapes'][0] }) {
  const style: React.CSSProperties = {
    position: 'absolute',
    left: shape.x,
    top: shape.y,
    width: shape.size,
    height: shape.size,
    animationDelay: shape.delay,
  }

  const animClass = {
    'float-slow': 'animate-float-slow',
    'float-reverse': 'animate-float-reverse',
    'pulse-gentle': 'animate-pulse-gentle',
    'spin-slow': 'animate-spin-slow',
    'bounce-gentle': 'animate-bounce-gentle',
    'sparkle': 'animate-sparkle',
  }[shape.animation] || 'animate-float-slow'

  switch (shape.type) {
    case 'circle':
      return <div className={animClass} style={{ ...style, borderRadius: '50%', background: shape.color }} />
    case 'square':
      return <div className={animClass} style={{ ...style, borderRadius: '8px', background: shape.color }} />
    case 'diamond':
      return <div className={animClass} style={{ ...style, background: shape.color, transform: 'rotate(45deg)', borderRadius: '4px' }} />
    case 'triangle':
      return (
        <div className={animClass} style={{ ...style, background: 'transparent' }}>
          <svg viewBox="0 0 100 100" fill={shape.color}>
            <polygon points="50,10 90,90 10,90" />
          </svg>
        </div>
      )
    case 'star':
      return (
        <div className={animClass} style={{ ...style, background: 'transparent' }}>
          <svg viewBox="0 0 100 100" fill={shape.color}>
            <path d="M50 5 L61 38 L95 38 L68 58 L79 91 L50 71 L21 91 L32 58 L5 38 L39 38 Z" />
          </svg>
        </div>
      )
    case 'hexagon':
      return (
        <div className={animClass} style={{ ...style, background: 'transparent' }}>
          <svg viewBox="0 0 100 100" fill={shape.color}>
            <path d="M50 5 L93 27.5 L93 72.5 L50 95 L7 72.5 L7 27.5 Z" />
          </svg>
        </div>
      )
    case 'ring':
      return (
        <div className={animClass} style={{ ...style, border: `2px solid ${shape.color}`, borderRadius: '50%', background: 'transparent' }} />
      )
    case 'wave':
      return (
        <div className={animClass} style={{ ...style, background: 'transparent', overflow: 'hidden' }}>
          <svg viewBox="0 0 200 60" fill="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0 30 Q50 10 100 30 T200 30" stroke={shape.color} strokeWidth="2" fill="none" />
            <path d="M0 45 Q50 25 100 45 T200 45" stroke={shape.color} strokeWidth="1.5" fill="none" opacity="0.5" />
          </svg>
        </div>
      )
    default:
      return <div className={animClass} style={{ ...style, borderRadius: '50%', background: shape.color }} />
  }
}

interface CaseStudyHeroProps {
  theme: CaseStudyTheme
  name: string
  industry: string
  services: string
  image: string
  brandColor: string
}

export default function CaseStudyHero({ theme, name, industry, services, image, brandColor }: CaseStudyHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Optional: add intersection observer for entry animation
  }, [])

  return (
    <div ref={heroRef} className="relative w-full min-h-[80vh] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: theme.bgGradient }} />

      {/* Pattern overlay */}
      <PatternSVG pattern={theme.bgPattern} color={brandColor} />

      {/* Floating shapes */}
      {theme.shapes.map((shape, i) => (
        <FloatingShape key={i} shape={shape} />
      ))}

      {/* Featured image with mask */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 hidden lg:block">
        <div className="relative w-full h-full" style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)',
        }}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            style={{ filter: 'saturate(0.5) contrast(1.1)' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full min-h-[80vh] px-8 md:px-16 lg:px-24 pb-16 pt-32">
        {/* Industry + Services tags */}
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs tracking-widest uppercase text-white/80 border border-white/10">
            {industry}
          </span>
          <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs tracking-widest uppercase text-white/80 border border-white/10">
            {services}
          </span>
        </div>

        {/* Name */}
        <h1 className={`text-5xl md:text-7xl lg:text-8xl text-white mb-4 ${theme.headingStyle}`}>
          {name}
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white/60 max-w-xl">
          {theme.tagline}
        </p>

        {/* Decorative line */}
        <div className="mt-8 h-[2px] w-24" style={{ background: `linear-gradient(90deg, ${brandColor}, transparent)` }} />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030b15] to-transparent z-10" />
    </div>
  )
}
