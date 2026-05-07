'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
  life: number
  maxLife: number
}

interface OrbitNode {
  angle: number
  radius: number
  size: number
  label: string
  color: string
  alpha: number
  pulsePhase: number
}

const STAGES = [
  {
    title: 'Your brand deserves more.',
    subtitle: 'Lost in the noise of a crowded digital landscape.',
    description: 'Millions spent. Minimal returns. Your competitors are outranking you, outbidding you, and stealing your customers.',
    progress: [0, 0.15],
  },
  {
    title: 'Precision ignites.',
    subtitle: 'Targeted advertising that finds your exact customer.',
    description: 'Google Ads · Amazon Ads · Bing Ads — every click engineered for conversion, every dollar tracked to revenue.',
    progress: [0.15, 0.32],
  },
  {
    title: 'Social amplifies.',
    subtitle: 'Your brand story, everywhere your audience lives.',
    description: 'Meta Ads · Pinterest Ads · TikTok Ads — scroll-stopping creative that turns attention into action.',
    progress: [0.32, 0.49],
  },
  {
    title: 'Organic compounds.',
    subtitle: 'Sustainable growth that compounds month over month.',
    description: 'Ecommerce SEO · Local SEO · Shopify SEO · AI-SEO — owning page one isn\'t luck, it\'s architecture.',
    progress: [0.49, 0.66],
  },
  {
    title: 'Design converts.',
    subtitle: 'Every pixel engineered for a single purpose: revenue.',
    description: 'Landing Pages · Ad Creative · Conversion Video — your brand, reimagined for performance.',
    progress: [0.66, 0.82],
  },
  {
    title: 'Your growth empire.',
    subtitle: '138+ brands transformed. Yours could be next.',
    description: '',
    progress: [0.82, 1.0],
  },
]

const ORBIT_COLORS = ['#00D4FF', '#FF2D87', '#00E676', '#FFD700']
const ORBIT_LABELS = [
  ['Google Ads', 'Amazon Ads', 'Bing Ads'],
  ['Meta Ads', 'Pinterest', 'TikTok'],
  ['E-com SEO', 'Local SEO', 'AI-SEO'],
  ['Landing Pages', 'Ad Creative', 'Video'],
]

export default function GrowthOrbit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)
  const particlesRef = useRef<Particle[]>([])
  const nodesRef = useRef<OrbitNode[]>([])
  const frameRef = useRef<number>(0)
  const [activeStage, setActiveStage] = useState(0)
  const [stageOpacity, setStageOpacity] = useState(1)
  const statsRef = useRef<HTMLDivElement>(null)
  const [showStats, setShowStats] = useState(false)
  const [statValues, setStatValues] = useState({ brands: 0, roas: 0, revenue: 0, referral: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize nodes for all 4 orbits
    const allNodes: OrbitNode[] = []
    ORBIT_LABELS.forEach((labels, orbitIdx) => {
      const baseRadius = 120 + orbitIdx * 85
      labels.forEach((label, nodeIdx) => {
        const angle = (nodeIdx / labels.length) * Math.PI * 2 + orbitIdx * 0.5
        allNodes.push({
          angle,
          radius: baseRadius,
          size: 6,
          label,
          color: ORBIT_COLORS[orbitIdx],
          alpha: 0,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      })
    })
    nodesRef.current = allNodes

    // ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        progressRef.current = self.progress

        // Determine active stage
        const p = self.progress
        for (let i = 0; i < STAGES.length; i++) {
          const [start, end] = STAGES[i].progress
          if (p >= start && p < end) {
            if (i !== activeStage) {
              setActiveStage(i)
              setStageOpacity(0)
              setTimeout(() => setStageOpacity(1), 100)
            }
            break
          }
        }

        // Show stats in final stage
        if (p > 0.85 && !showStats) {
          setShowStats(true)
          animateStats()
        }
      },
    })

    function animateStats() {
      const duration = 2000
      const start = Date.now()
      const targets = { brands: 138, roas: 7.5, revenue: 2.8, referral: 80 }
      const tick = () => {
        const elapsed = Date.now() - start
        const t = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - t, 3)
        setStatValues({
          brands: Math.floor(targets.brands * ease),
          roas: Math.round(targets.roas * ease * 10) / 10,
          revenue: Math.round(targets.revenue * ease * 10) / 10,
          referral: Math.floor(targets.referral * ease),
        })
        if (t < 1) requestAnimationFrame(tick)
      }
      tick()
    }

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      if (!ctx) return

      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2
      const progress = progressRef.current
      const time = Date.now() / 1000

      // Clear
      ctx.clearRect(0, 0, w, h)

      // Central orb
      const orbSize = 20 + progress * 30
      const orbGlow = 40 + progress * 100
      const orbAlpha = 0.3 + progress * 0.7

      // Glow
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbGlow)
      gradient.addColorStop(0, `rgba(0, 212, 255, ${orbAlpha * 0.6})`)
      gradient.addColorStop(0.4, `rgba(0, 212, 255, ${orbAlpha * 0.2})`)
      gradient.addColorStop(1, 'rgba(0, 212, 255, 0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(cx, cy, orbGlow, 0, Math.PI * 2)
      ctx.fill()

      // Core orb
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, orbSize)
      coreGrad.addColorStop(0, `rgba(255, 255, 255, ${orbAlpha})`)
      coreGrad.addColorStop(0.5, `rgba(0, 212, 255, ${orbAlpha * 0.8})`)
      coreGrad.addColorStop(1, `rgba(0, 100, 200, ${orbAlpha * 0.3})`)
      ctx.fillStyle = coreGrad
      ctx.beginPath()
      ctx.arc(cx, cy, orbSize, 0, Math.PI * 2)
      ctx.fill()

      // Orbital rings
      const activeOrbits = Math.min(4, Math.floor(progress / 0.17))
      const partialOrbit = (progress % 0.17) / 0.17

      for (let i = 0; i < 4; i++) {
        const radius = (120 + i * 85) * (w < 768 ? 0.6 : 1)
        let ringAlpha = 0

        if (i < activeOrbits) {
          ringAlpha = 1
        } else if (i === activeOrbits) {
          ringAlpha = partialOrbit
        }

        if (ringAlpha <= 0) continue

        // Ring line
        ctx.strokeStyle = `${ORBIT_COLORS[i]}${Math.floor(ringAlpha * 40).toString(16).padStart(2, '0')}`
        ctx.lineWidth = 1
        ctx.setLineDash([4, 8])
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.setLineDash([])

        // Rotating glow on ring
        const glowAngle = time * (0.3 + i * 0.1) + i * 1.5
        const glowX = cx + Math.cos(glowAngle) * radius
        const glowY = cy + Math.sin(glowAngle) * radius
        const trailGrad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 20)
        trailGrad.addColorStop(0, `${ORBIT_COLORS[i]}${Math.floor(ringAlpha * 200).toString(16).padStart(2, '0')}`)
        trailGrad.addColorStop(1, `${ORBIT_COLORS[i]}00`)
        ctx.fillStyle = trailGrad
        ctx.beginPath()
        ctx.arc(glowX, glowY, 20, 0, Math.PI * 2)
        ctx.fill()
      }

      // Nodes
      nodesRef.current.forEach((node) => {
        const orbitIdx = Math.floor((node.radius - 120) / 85)
        const scaledRadius = node.radius * (w < 768 ? 0.6 : 1)
        let nodeAlpha = 0

        if (orbitIdx < activeOrbits) {
          nodeAlpha = 1
        } else if (orbitIdx === activeOrbits) {
          nodeAlpha = partialOrbit
        }

        if (nodeAlpha <= 0) return

        // Rotate nodes
        const angle = node.angle + time * (0.2 + orbitIdx * 0.05)
        const x = cx + Math.cos(angle) * scaledRadius
        const y = cy + Math.sin(angle) * scaledRadius

        // Pulse
        const pulse = 1 + Math.sin(time * 2 + node.pulsePhase) * 0.2
        const size = node.size * pulse

        // Node glow
        const nodeGlow = ctx.createRadialGradient(x, y, 0, x, y, size * 3)
        nodeGlow.addColorStop(0, `${node.color}${Math.floor(nodeAlpha * 150).toString(16).padStart(2, '0')}`)
        nodeGlow.addColorStop(1, `${node.color}00`)
        ctx.fillStyle = nodeGlow
        ctx.beginPath()
        ctx.arc(x, y, size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Node core
        ctx.fillStyle = `${node.color}${Math.floor(nodeAlpha * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        // Label
        if (nodeAlpha > 0.5) {
          ctx.font = '11px Inter, system-ui, sans-serif'
          ctx.fillStyle = `rgba(255,255,255,${nodeAlpha * 0.8})`
          ctx.textAlign = 'center'
          ctx.fillText(node.label, x, y + size + 16)
        }
      })

      // Ambient particles
      const targetParticles = Math.floor(progress * 80)
      while (particlesRef.current.length < targetParticles) {
        const angle = Math.random() * Math.PI * 2
        const dist = 50 + Math.random() * 300
        particlesRef.current.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: 1 + Math.random() * 2,
          alpha: Math.random() * 0.5,
          color: ORBIT_COLORS[Math.floor(Math.random() * ORBIT_COLORS.length)],
          life: 0,
          maxLife: 200 + Math.random() * 300,
        })
      }

      // Update & draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++
        if (p.life > p.maxLife) return false

        p.x += p.vx
        p.y += p.vy

        // Gentle pull toward center
        const dx = cx - p.x
        const dy = cy - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        p.vx += (dx / dist) * 0.01
        p.vy += (dy / dist) * 0.01

        const lifeRatio = p.life / p.maxLife
        const fadeAlpha = lifeRatio < 0.2 ? lifeRatio / 0.2 : lifeRatio > 0.8 ? (1 - lifeRatio) / 0.2 : 1

        ctx.fillStyle = `${p.color}${Math.floor(fadeAlpha * p.alpha * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        return true
      })

      // Connection lines between nearby nodes (in final stages)
      if (progress > 0.7) {
        const connectionAlpha = (progress - 0.7) / 0.3
        const visibleNodes = nodesRef.current.filter((_, idx) => {
          const orbitIdx = Math.floor(idx / 3)
          return orbitIdx < activeOrbits
        })

        for (let i = 0; i < visibleNodes.length; i++) {
          for (let j = i + 1; j < visibleNodes.length; j++) {
            const ni = visibleNodes[i]
            const nj = visibleNodes[j]
            const orbitI = Math.floor((ni.radius - 120) / 85)
            const orbitJ = Math.floor((nj.radius - 120) / 85)
            if (Math.abs(orbitI - orbitJ) !== 1) continue

            const rI = ni.radius * (w < 768 ? 0.6 : 1)
            const rJ = nj.radius * (w < 768 ? 0.6 : 1)
            const aI = ni.angle + time * (0.2 + orbitI * 0.05)
            const aJ = nj.angle + time * (0.2 + orbitJ * 0.05)

            const x1 = cx + Math.cos(aI) * rI
            const y1 = cy + Math.sin(aI) * rI
            const x2 = cx + Math.cos(aJ) * rJ
            const y2 = cy + Math.sin(aJ) * rJ

            ctx.strokeStyle = `rgba(255,255,255,${connectionAlpha * 0.1})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(frameRef.current)
      st.kill()
      window.removeEventListener('resize', resize)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef} className="relative" style={{ height: '600vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10"
          style={{ background: 'transparent' }}
        />

        {/* Background gradient that evolves */}
        <div
          className="absolute inset-0 z-0 transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse at center, 
              rgba(0, 20, 40, ${0.3 + progressRef.current * 0.3}) 0%, 
              rgba(0, 5, 15, 0.95) 70%, 
              rgba(0, 0, 5, 1) 100%)`,
          }}
        />

        {/* Stage text - left side */}
        <div
          className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-20 max-w-md"
          style={{
            opacity: stageOpacity,
            transition: 'opacity 0.5s ease',
          }}
        >
          <div className="space-y-4">
            {activeStage < 5 && (
              <p className="text-xs tracking-[0.3em] uppercase text-cyan-400 font-mono">
                Phase {activeStage + 1} of 5
              </p>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {STAGES[activeStage].title}
            </h2>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              {STAGES[activeStage].subtitle}
            </p>
            {STAGES[activeStage].description && (
              <p className="text-sm text-white/40 leading-relaxed font-mono">
                {STAGES[activeStage].description}
              </p>
            )}
          </div>
        </div>

        {/* Stats overlay - final stage */}
        {showStats && (
          <div
            ref={statsRef}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-8 md:gap-16"
            style={{
              animation: 'fadeInUp 1s ease forwards',
            }}
          >
            {[
              { value: `${statValues.brands}+`, label: 'Brands Transformed' },
              { value: `${statValues.roas}X`, label: 'Avg ROAS' },
              { value: `₹${statValues.revenue}B+`, label: 'Revenue Generated' },
              { value: `${statValues.referral}%`, label: 'Referral Business' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-xs tracking-widest uppercase text-white/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/30 text-xs tracking-widest uppercase">
          {activeStage < 5 ? 'Scroll to explore' : ''}
        </div>

        {/* Progress bar */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-48 w-[2px] bg-white/10 rounded-full">
          <div
            className="w-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full transition-all duration-300"
            style={{ height: `${progressRef.current * 100}%` }}
          />
          {STAGES.map((stage, i) => (
            <div
              key={i}
              className={`absolute right-2 w-2 h-2 rounded-full transition-all duration-300 ${
                i <= activeStage ? 'bg-cyan-400 scale-100' : 'bg-white/20 scale-75'
              }`}
              style={{ top: `${(stage.progress[0] + stage.progress[1]) / 2 * 100}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
