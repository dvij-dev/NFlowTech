// Visual theme definitions for each case study
// Each theme includes: animated background, decorative elements, typography mood

export interface CaseStudyTheme {
  slug: string
  // Background
  bgGradient: string
  bgPattern: 'waves' | 'circuits' | 'dots' | 'grid' | 'bubbles' | 'diagonal' | 'hexagons' | 'organic' | 'sparkles' | 'blueprint' | 'confetti' | 'petals' | 'geometric'
  // Hero animation CSS
  heroAnimation: string
  // Decorative SVG elements
  decorativeElements: string[] // SVG path data for floating decorations
  // Typography
  headingStyle: string // tailwind classes
  // Mood
  mood: 'ocean' | 'playful' | 'corporate' | 'luxury' | 'tech' | 'organic' | 'bold' | 'elegant' | 'warm' | 'minimal'
  // Floating shapes
  shapes: Array<{
    type: 'circle' | 'square' | 'triangle' | 'diamond' | 'star' | 'hexagon' | 'wave' | 'ring'
    size: number
    x: string
    y: string
    color: string
    animation: string
    delay: string
  }>
  // Hero overlay gradient direction
  overlayDirection: string
  // Tagline for the animated hero
  tagline: string
}

export const caseStudyThemes: Record<string, CaseStudyTheme> = {
  'seaside-marine-construction': {
    slug: 'seaside-marine-construction',
    bgGradient: 'linear-gradient(135deg, #0a2540 0%, #1B4D6E 40%, #5CB8D6 100%)',
    bgPattern: 'waves',
    heroAnimation: 'wave-float',
    decorativeElements: [],
    headingStyle: 'font-bold tracking-tight',
    mood: 'ocean',
    shapes: [
      { type: 'wave', size: 200, x: '10%', y: '80%', color: '#5CB8D620', animation: 'float-slow', delay: '0s' },
      { type: 'circle', size: 80, x: '85%', y: '20%', color: '#5CB8D615', animation: 'pulse-gentle', delay: '1s' },
      { type: 'wave', size: 300, x: '60%', y: '90%', color: '#1B4D6E30', animation: 'float-reverse', delay: '0.5s' },
    ],
    overlayDirection: '180deg',
    tagline: 'Protecting Waterfront Properties',
  },
  'kinddesigns': {
    slug: 'kinddesigns',
    bgGradient: 'linear-gradient(135deg, #042a1a 0%, #0C4A37 40%, #2ECC71 100%)',
    bgPattern: 'organic',
    heroAnimation: 'grow-up',
    decorativeElements: [],
    headingStyle: 'font-bold',
    mood: 'organic',
    shapes: [
      { type: 'circle', size: 120, x: '15%', y: '30%', color: '#2ECC7120', animation: 'float-slow', delay: '0s' },
      { type: 'hexagon', size: 60, x: '80%', y: '60%', color: '#0C4A3730', animation: 'spin-slow', delay: '2s' },
      { type: 'circle', size: 40, x: '70%', y: '20%', color: '#2ECC7110', animation: 'pulse-gentle', delay: '1s' },
    ],
    overlayDirection: '160deg',
    tagline: 'Restoring Marine Ecosystems',
  },
  'breezy-permits': {
    slug: 'breezy-permits',
    bgGradient: 'linear-gradient(135deg, #0d2137 0%, #1A3A5C 40%, #4ECDC4 100%)',
    bgPattern: 'blueprint',
    heroAnimation: 'slide-in',
    decorativeElements: [],
    headingStyle: 'font-bold tracking-tight',
    mood: 'corporate',
    shapes: [
      { type: 'square', size: 100, x: '80%', y: '15%', color: '#4ECDC415', animation: 'float-slow', delay: '0s' },
      { type: 'square', size: 60, x: '10%', y: '70%', color: '#1A3A5C30', animation: 'float-reverse', delay: '1.5s' },
      { type: 'diamond', size: 40, x: '90%', y: '80%', color: '#4ECDC420', animation: 'spin-slow', delay: '0.5s' },
    ],
    overlayDirection: '135deg',
    tagline: 'Streamlining Construction Permits',
  },
  'ocean-consulting-llc': {
    slug: 'ocean-consulting-llc',
    bgGradient: 'linear-gradient(160deg, #071a30 0%, #0F3460 40%, #16A085 100%)',
    bgPattern: 'waves',
    heroAnimation: 'wave-float',
    decorativeElements: [],
    headingStyle: 'font-bold',
    mood: 'ocean',
    shapes: [
      { type: 'wave', size: 250, x: '20%', y: '85%', color: '#16A08520', animation: 'float-slow', delay: '0s' },
      { type: 'circle', size: 100, x: '75%', y: '25%', color: '#0F346020', animation: 'pulse-gentle', delay: '1s' },
    ],
    overlayDirection: '180deg',
    tagline: 'Engineering Coastal Solutions',
  },
  'parsemus-foundation': {
    slug: 'parsemus-foundation',
    bgGradient: 'linear-gradient(135deg, #1a1a2e 0%, #2C3E50 40%, #E74C3C 100%)',
    bgPattern: 'dots',
    heroAnimation: 'pulse-in',
    decorativeElements: [],
    headingStyle: 'font-bold',
    mood: 'corporate',
    shapes: [
      { type: 'circle', size: 90, x: '85%', y: '30%', color: '#E74C3C15', animation: 'pulse-gentle', delay: '0s' },
      { type: 'circle', size: 50, x: '10%', y: '60%', color: '#2C3E5020', animation: 'float-slow', delay: '2s' },
      { type: 'ring', size: 120, x: '50%', y: '80%', color: '#E74C3C10', animation: 'spin-slow', delay: '1s' },
    ],
    overlayDirection: '150deg',
    tagline: 'Advancing Medical Research',
  },
  'orbis-environmental': {
    slug: 'orbis-environmental',
    bgGradient: 'linear-gradient(135deg, #0d1f2b 0%, #1B3A4B 40%, #F39C12 100%)',
    bgPattern: 'hexagons',
    heroAnimation: 'fade-scale',
    decorativeElements: [],
    headingStyle: 'font-bold tracking-tight',
    mood: 'corporate',
    shapes: [
      { type: 'hexagon', size: 80, x: '80%', y: '20%', color: '#F39C1220', animation: 'spin-slow', delay: '0s' },
      { type: 'hexagon', size: 50, x: '15%', y: '75%', color: '#1B3A4B30', animation: 'float-slow', delay: '1s' },
      { type: 'circle', size: 30, x: '60%', y: '85%', color: '#F39C1215', animation: 'pulse-gentle', delay: '2s' },
    ],
    overlayDirection: '135deg',
    tagline: 'Safety & Environmental Solutions',
  },
  'kindtokidz': {
    slug: 'kindtokidz',
    bgGradient: 'linear-gradient(135deg, #FF6B35 0%, #FFD700 50%, #FF8C42 100%)',
    bgPattern: 'confetti',
    heroAnimation: 'bounce-in',
    decorativeElements: [],
    headingStyle: 'font-extrabold',
    mood: 'playful',
    shapes: [
      { type: 'star', size: 40, x: '10%', y: '20%', color: '#FFD70060', animation: 'spin-slow', delay: '0s' },
      { type: 'circle', size: 60, x: '85%', y: '30%', color: '#FF6B3540', animation: 'bounce-gentle', delay: '0.5s' },
      { type: 'triangle', size: 35, x: '20%', y: '80%', color: '#FFD70050', animation: 'float-slow', delay: '1s' },
      { type: 'star', size: 25, x: '75%', y: '70%', color: '#FF8C4240', animation: 'spin-slow', delay: '1.5s' },
      { type: 'circle', size: 20, x: '50%', y: '15%', color: '#FF6B3530', animation: 'bounce-gentle', delay: '2s' },
      { type: 'diamond', size: 30, x: '90%', y: '85%', color: '#FFD70040', animation: 'float-reverse', delay: '0.8s' },
    ],
    overlayDirection: '135deg',
    tagline: 'Where Kids Learn & Play',
  },
  'evelaniq': {
    slug: 'evelaniq',
    bgGradient: 'linear-gradient(135deg, #1a0d3a 0%, #2D1B69 40%, #A78BFA 100%)',
    bgPattern: 'bubbles',
    heroAnimation: 'fade-scale',
    decorativeElements: [],
    headingStyle: 'font-light tracking-wide',
    mood: 'elegant',
    shapes: [
      { type: 'circle', size: 100, x: '80%', y: '25%', color: '#A78BFA15', animation: 'float-slow', delay: '0s' },
      { type: 'circle', size: 60, x: '15%', y: '65%', color: '#2D1B6920', animation: 'pulse-gentle', delay: '1.5s' },
      { type: 'ring', size: 80, x: '60%', y: '80%', color: '#A78BFA10', animation: 'float-reverse', delay: '0.5s' },
    ],
    overlayDirection: '160deg',
    tagline: 'Redefining Personal Wellness',
  },
  'dianas-closet': {
    slug: 'dianas-closet',
    bgGradient: 'linear-gradient(135deg, #3d0a22 0%, #8B1A4A 40%, #E91E8C 100%)',
    bgPattern: 'diagonal',
    heroAnimation: 'slide-in',
    decorativeElements: [],
    headingStyle: 'font-light tracking-widest uppercase',
    mood: 'bold',
    shapes: [
      { type: 'diamond', size: 60, x: '85%', y: '20%', color: '#E91E8C20', animation: 'spin-slow', delay: '0s' },
      { type: 'circle', size: 40, x: '10%', y: '40%', color: '#8B1A4A30', animation: 'float-slow', delay: '1s' },
      { type: 'diamond', size: 30, x: '70%', y: '80%', color: '#E91E8C15', animation: 'float-reverse', delay: '2s' },
    ],
    overlayDirection: '45deg',
    tagline: 'Fashion Forward, Always',
  },
  'indian-grocery-store': {
    slug: 'indian-grocery-store',
    bgGradient: 'linear-gradient(135deg, #5c2800 0%, #B45309 40%, #FB923C 100%)',
    bgPattern: 'geometric',
    heroAnimation: 'fade-scale',
    decorativeElements: [],
    headingStyle: 'font-bold',
    mood: 'warm',
    shapes: [
      { type: 'circle', size: 80, x: '80%', y: '30%', color: '#FB923C20', animation: 'float-slow', delay: '0s' },
      { type: 'diamond', size: 50, x: '15%', y: '70%', color: '#B4530920', animation: 'spin-slow', delay: '1s' },
      { type: 'circle', size: 30, x: '50%', y: '20%', color: '#FB923C15', animation: 'pulse-gentle', delay: '1.5s' },
    ],
    overlayDirection: '135deg',
    tagline: 'Authentic Flavors, Online',
  },
  'royal-plaza': {
    slug: 'royal-plaza',
    bgGradient: 'linear-gradient(135deg, #0d1a2f 0%, #1E3A5F 40%, #C9A84C 100%)',
    bgPattern: 'diagonal',
    heroAnimation: 'fade-scale',
    decorativeElements: [],
    headingStyle: 'font-light tracking-widest',
    mood: 'luxury',
    shapes: [
      { type: 'diamond', size: 80, x: '80%', y: '20%', color: '#C9A84C15', animation: 'spin-slow', delay: '0s' },
      { type: 'square', size: 50, x: '10%', y: '60%', color: '#1E3A5F20', animation: 'float-slow', delay: '1s' },
      { type: 'diamond', size: 30, x: '60%', y: '85%', color: '#C9A84C10', animation: 'float-reverse', delay: '2s' },
    ],
    overlayDirection: '135deg',
    tagline: 'Hospitality Redefined',
  },
  'avita-jewellery': {
    slug: 'avita-jewellery',
    bgGradient: 'linear-gradient(135deg, #250d20 0%, #4A1942 40%, #D4AF37 100%)',
    bgPattern: 'sparkles',
    heroAnimation: 'shimmer',
    decorativeElements: [],
    headingStyle: 'font-light tracking-widest',
    mood: 'luxury',
    shapes: [
      { type: 'star', size: 20, x: '80%', y: '20%', color: '#D4AF3740', animation: 'sparkle', delay: '0s' },
      { type: 'star', size: 15, x: '15%', y: '40%', color: '#D4AF3730', animation: 'sparkle', delay: '0.5s' },
      { type: 'star', size: 25, x: '60%', y: '75%', color: '#D4AF3735', animation: 'sparkle', delay: '1s' },
      { type: 'diamond', size: 40, x: '90%', y: '60%', color: '#D4AF3720', animation: 'spin-slow', delay: '1.5s' },
      { type: 'star', size: 12, x: '30%', y: '15%', color: '#D4AF3725', animation: 'sparkle', delay: '2s' },
    ],
    overlayDirection: '160deg',
    tagline: 'Where Elegance Meets Craft',
  },
  'tonic-studios': {
    slug: 'tonic-studios',
    bgGradient: 'linear-gradient(135deg, #0d0d1a 0%, #1A1A2E 40%, #E94560 100%)',
    bgPattern: 'dots',
    heroAnimation: 'fade-scale',
    decorativeElements: [],
    headingStyle: 'font-bold',
    mood: 'bold',
    shapes: [
      { type: 'circle', size: 70, x: '85%', y: '25%', color: '#E9456020', animation: 'pulse-gentle', delay: '0s' },
      { type: 'star', size: 40, x: '10%', y: '60%', color: '#E9456015', animation: 'spin-slow', delay: '1s' },
      { type: 'circle', size: 25, x: '50%', y: '80%', color: '#1A1A2E30', animation: 'float-slow', delay: '2s' },
    ],
    overlayDirection: '135deg',
    tagline: 'Crafting Creative Possibilities',
  },
  'saitech-inc': {
    slug: 'saitech-inc',
    bgGradient: 'linear-gradient(135deg, #050d16 0%, #0D1B2A 40%, #00B4D8 100%)',
    bgPattern: 'circuits',
    heroAnimation: 'data-flow',
    decorativeElements: [],
    headingStyle: 'font-bold tracking-tight',
    mood: 'tech',
    shapes: [
      { type: 'hexagon', size: 70, x: '85%', y: '20%', color: '#00B4D815', animation: 'spin-slow', delay: '0s' },
      { type: 'square', size: 40, x: '10%', y: '70%', color: '#0D1B2A30', animation: 'float-slow', delay: '1s' },
      { type: 'hexagon', size: 30, x: '60%', y: '85%', color: '#00B4D810', animation: 'spin-slow', delay: '2s' },
    ],
    overlayDirection: '135deg',
    tagline: 'Technology That Transforms',
  },
  'la-vie-md': {
    slug: 'la-vie-md',
    bgGradient: 'linear-gradient(135deg, #1a2a2a 0%, #2B4141 40%, #9DC88D 100%)',
    bgPattern: 'organic',
    heroAnimation: 'grow-up',
    decorativeElements: [],
    headingStyle: 'font-light tracking-wide',
    mood: 'organic',
    shapes: [
      { type: 'circle', size: 100, x: '80%', y: '25%', color: '#9DC88D15', animation: 'float-slow', delay: '0s' },
      { type: 'circle', size: 50, x: '15%', y: '65%', color: '#2B414120', animation: 'pulse-gentle', delay: '1s' },
      { type: 'circle', size: 30, x: '60%', y: '85%', color: '#9DC88D10', animation: 'float-reverse', delay: '2s' },
    ],
    overlayDirection: '160deg',
    tagline: 'Healthcare & Wellness Excellence',
  },
  'boomerang-accessories': {
    slug: 'boomerang-accessories',
    bgGradient: 'linear-gradient(135deg, #0d2216 0%, #1B4332 40%, #52B788 100%)',
    bgPattern: 'diagonal',
    heroAnimation: 'slide-in',
    decorativeElements: [],
    headingStyle: 'font-bold',
    mood: 'bold',
    shapes: [
      { type: 'circle', size: 80, x: '80%', y: '30%', color: '#52B78820', animation: 'float-slow', delay: '0s' },
      { type: 'diamond', size: 40, x: '15%', y: '70%', color: '#1B433220', animation: 'spin-slow', delay: '1s' },
    ],
    overlayDirection: '135deg',
    tagline: 'Accessorize Your World',
  },
  'zikhara-ai': {
    slug: 'zikhara-ai',
    bgGradient: 'linear-gradient(135deg, #0a0a1a 0%, #0F0F2D 30%, #6366F1 70%, #00D4FF 100%)',
    bgPattern: 'circuits',
    heroAnimation: 'data-flow',
    decorativeElements: [],
    headingStyle: 'font-bold tracking-tight',
    mood: 'tech',
    shapes: [
      { type: 'hexagon', size: 90, x: '85%', y: '15%', color: '#6366F115', animation: 'spin-slow', delay: '0s' },
      { type: 'hexagon', size: 50, x: '10%', y: '50%', color: '#00D4FF10', animation: 'float-slow', delay: '1s' },
      { type: 'circle', size: 30, x: '70%', y: '80%', color: '#6366F110', animation: 'pulse-gentle', delay: '2s' },
      { type: 'hexagon', size: 20, x: '40%', y: '20%', color: '#00D4FF08', animation: 'spin-slow', delay: '3s' },
    ],
    overlayDirection: '135deg',
    tagline: 'AI-Powered Intelligence',
  },
  'open-concept-financial': {
    slug: 'open-concept-financial',
    bgGradient: 'linear-gradient(135deg, #0a1628 0%, #1A2F4B 40%, #3B82F6 100%)',
    bgPattern: 'grid',
    heroAnimation: 'fade-scale',
    decorativeElements: [],
    headingStyle: 'font-semibold',
    mood: 'corporate',
    shapes: [
      { type: 'square', size: 80, x: '85%', y: '20%', color: '#3B82F615', animation: 'float-slow', delay: '0s' },
      { type: 'circle', size: 40, x: '10%', y: '60%', color: '#1A2F4B20', animation: 'pulse-gentle', delay: '1s' },
    ],
    overlayDirection: '135deg',
    tagline: 'Financial Growth, Simplified',
  },
  'podcastcola': {
    slug: 'podcastcola',
    bgGradient: 'linear-gradient(135deg, #1a0a2e 0%, #2D1B4E 40%, #F472B6 70%, #FB923C 100%)',
    bgPattern: 'dots',
    heroAnimation: 'pulse-in',
    decorativeElements: [],
    headingStyle: 'font-extrabold',
    mood: 'bold',
    shapes: [
      { type: 'circle', size: 80, x: '80%', y: '25%', color: '#F472B620', animation: 'pulse-gentle', delay: '0s' },
      { type: 'circle', size: 50, x: '15%', y: '70%', color: '#FB923C15', animation: 'float-slow', delay: '1s' },
      { type: 'circle', size: 30, x: '60%', y: '85%', color: '#F472B610', animation: 'bounce-gentle', delay: '2s' },
    ],
    overlayDirection: '135deg',
    tagline: 'Your Voice, Amplified',
  },
  'klove-beauty': {
    slug: 'klove-beauty',
    bgGradient: 'linear-gradient(135deg, #2d0a1a 0%, #6B1E3B 30%, #EC4899 70%, #F9A8D4 100%)',
    bgPattern: 'petals',
    heroAnimation: 'fade-scale',
    decorativeElements: [],
    headingStyle: 'font-light tracking-wide',
    mood: 'elegant',
    shapes: [
      { type: 'circle', size: 100, x: '80%', y: '20%', color: '#EC489915', animation: 'float-slow', delay: '0s' },
      { type: 'circle', size: 60, x: '15%', y: '60%', color: '#F9A8D410', animation: 'pulse-gentle', delay: '1s' },
      { type: 'circle', size: 40, x: '50%', y: '80%', color: '#EC489910', animation: 'float-reverse', delay: '2s' },
    ],
    overlayDirection: '160deg',
    tagline: 'Beauty That Speaks',
  },
  'gallant': {
    slug: 'gallant',
    bgGradient: 'linear-gradient(135deg, #1a2810 0%, #2D4A0E 40%, #84CC16 100%)',
    bgPattern: 'organic',
    heroAnimation: 'grow-up',
    decorativeElements: [],
    headingStyle: 'font-bold',
    mood: 'warm',
    shapes: [
      { type: 'circle', size: 90, x: '85%', y: '25%', color: '#84CC1620', animation: 'float-slow', delay: '0s' },
      { type: 'circle', size: 50, x: '10%', y: '60%', color: '#2D4A0E20', animation: 'pulse-gentle', delay: '1s' },
      { type: 'circle', size: 30, x: '60%', y: '80%', color: '#84CC1610', animation: 'float-reverse', delay: '2s' },
    ],
    overlayDirection: '135deg',
    tagline: 'Premium Pet Care',
  },
}

// Fallback theme for any case study without a specific theme
export const defaultTheme: CaseStudyTheme = {
  slug: 'default',
  bgGradient: 'linear-gradient(135deg, #0a1628 0%, #1a2d4a 40%, #00D4FF 100%)',
  bgPattern: 'dots',
  heroAnimation: 'fade-scale',
  decorativeElements: [],
  headingStyle: 'font-bold',
  mood: 'minimal',
  shapes: [
    { type: 'circle', size: 80, x: '80%', y: '25%', color: '#00D4FF15', animation: 'float-slow', delay: '0s' },
    { type: 'circle', size: 40, x: '15%', y: '65%', color: '#1a2d4a20', animation: 'pulse-gentle', delay: '1s' },
  ],
  overlayDirection: '135deg',
  tagline: 'Growth Delivered',
}

export function getTheme(slug: string): CaseStudyTheme {
  return caseStudyThemes[slug] || defaultTheme
}
