'use client'

import { useEffect, useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Float, Trail, Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Shared scroll progress ────────────────────────────
const scrollState = { progress: 0 }

// ─── Particle System (Instanced for performance) ───────
function ExplosionParticles({ count = 2000 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const particles = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const speed = 0.5 + Math.random() * 2.5
      arr.push({
        // Direction from center
        dx: Math.sin(phi) * Math.cos(theta) * speed,
        dy: Math.sin(phi) * Math.sin(theta) * speed,
        dz: Math.cos(phi) * speed,
        // Final orbit position (pulled back toward center)
        orbitRadius: 2 + Math.random() * 6,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitTilt: (Math.random() - 0.5) * 0.8,
        orbitSpeed: 0.1 + Math.random() * 0.3,
        // Size variation
        scale: 0.01 + Math.random() * 0.03,
        // Color variation
        colorIdx: Math.floor(Math.random() * 4),
      })
    }
    return arr
  }, [count])

  const colors = useMemo(() => [
    new THREE.Color('#00D4FF'),
    new THREE.Color('#FF2D87'),
    new THREE.Color('#00E676'),
    new THREE.Color('#FFD700'),
  ], [])

  // Set instance colors once
  useEffect(() => {
    if (!meshRef.current) return
    const colorArray = new Float32Array(count * 3)
    particles.forEach((p, i) => {
      const c = colors[p.colorIdx]
      colorArray[i * 3] = c.r
      colorArray[i * 3 + 1] = c.g
      colorArray[i * 3 + 2] = c.b
    })
    meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(colorArray, 3)
  }, [count, particles, colors])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const p = scrollState.progress

    particles.forEach((particle, i) => {
      if (p < 0.05) {
        // Pre-bang: everything at center, invisible
        dummy.position.set(0, 0, 0)
        dummy.scale.setScalar(0)
      } else if (p < 0.2) {
        // Explosion phase: particles fly outward
        const explosionProgress = (p - 0.05) / 0.15
        const ease = 1 - Math.pow(1 - explosionProgress, 3) // ease out
        const dist = ease * 12
        dummy.position.set(
          particle.dx * dist,
          particle.dy * dist,
          particle.dz * dist
        )
        dummy.scale.setScalar(particle.scale * Math.min(1, explosionProgress * 3))
      } else if (p < 0.35) {
        // Nebula formation: particles slow and start swirling
        const nebulaProgress = (p - 0.2) / 0.15
        const maxDist = 12
        const targetOrbit = particle.orbitRadius
        const currentDist = maxDist - (maxDist - targetOrbit) * nebulaProgress
        
        // Blend from explosion direction to orbital motion
        const explodeX = particle.dx * maxDist
        const explodeY = particle.dy * maxDist
        const explodeZ = particle.dz * maxDist
        
        const angle = particle.orbitAngle + t * particle.orbitSpeed * nebulaProgress
        const orbitX = Math.cos(angle) * currentDist
        const orbitY = Math.sin(angle) * currentDist * 0.4 + particle.orbitTilt * currentDist
        const orbitZ = Math.sin(angle + particle.orbitTilt) * currentDist * 0.6
        
        dummy.position.set(
          THREE.MathUtils.lerp(explodeX, orbitX, nebulaProgress),
          THREE.MathUtils.lerp(explodeY, orbitY, nebulaProgress),
          THREE.MathUtils.lerp(explodeZ, orbitZ, nebulaProgress)
        )
        dummy.scale.setScalar(particle.scale)
      } else {
        // Orbiting phase: organized solar system
        const orbitProgress = Math.min(1, (p - 0.35) / 0.3)
        const angle = particle.orbitAngle + t * particle.orbitSpeed
        const r = particle.orbitRadius * (1 - orbitProgress * 0.3) // tighten slightly
        
        dummy.position.set(
          Math.cos(angle) * r,
          Math.sin(angle) * r * 0.3 + particle.orbitTilt * r * 0.3,
          Math.sin(angle + particle.orbitTilt) * r * 0.5
        )
        
        // Fade out some particles as system forms
        const fadeOut = p > 0.8 ? Math.max(0, 1 - (p - 0.8) / 0.2) : 1
        dummy.scale.setScalar(particle.scale * fadeOut)
      }
      
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial transparent opacity={0.8} toneMapped={false} />
    </instancedMesh>
  )
}

// ─── Central Star (the viewer's brand) ─────────────────
function CentralStar() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  const lightRef = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const p = scrollState.progress

    if (p < 0.05) {
      // Pre-bang: tiny intense point
      const preScale = 0.1 + Math.sin(t * 2) * 0.02
      meshRef.current.scale.setScalar(preScale)
      glowRef.current.scale.setScalar(preScale * 3)
      lightRef.current.intensity = 0.5
    } else if (p < 0.2) {
      // Explosion: flash then grow
      const ep = (p - 0.05) / 0.15
      const flash = ep < 0.3 ? (ep / 0.3) * 3 : 1
      meshRef.current.scale.setScalar(0.3 * flash)
      glowRef.current.scale.setScalar(2 + ep * 4)
      lightRef.current.intensity = 2 + flash * 5
    } else if (p < 0.4) {
      // Star forming
      const formProgress = (p - 0.2) / 0.2
      const pulse = 1 + Math.sin(t * 3) * 0.1
      meshRef.current.scale.setScalar((0.3 + formProgress * 0.4) * pulse)
      glowRef.current.scale.setScalar(3 + formProgress * 2)
      lightRef.current.intensity = 3 + formProgress * 2
    } else {
      // Stable star
      const pulse = 1 + Math.sin(t * 2) * 0.05
      meshRef.current.scale.setScalar(0.7 * pulse)
      glowRef.current.scale.setScalar(5 + Math.sin(t) * 0.5)
      lightRef.current.intensity = 5
    }
  })

  return (
    <group>
      {/* Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      {/* Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.15} toneMapped={false} />
      </mesh>
      {/* Light */}
      <pointLight ref={lightRef} color="#00D4FF" intensity={3} distance={30} />
    </group>
  )
}

// ─── Orbit Ring ────────────────────────────────────────
function OrbitRing({ radius, color, tilt, activateAt }: {
  radius: number; color: string; tilt: number; activateAt: number
}) {
  const ref = useRef<THREE.Mesh>(null!)
  
  useFrame(() => {
    const p = scrollState.progress
    const visibility = Math.max(0, Math.min(1, (p - activateAt) / 0.08))
    ref.current.material = ref.current.material as THREE.MeshBasicMaterial
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = visibility * 0.3
    ref.current.scale.setScalar(visibility)
  })

  return (
    <mesh ref={ref} rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0} toneMapped={false} />
    </mesh>
  )
}

// ─── Service Planet ────────────────────────────────────
function ServicePlanet({ radius, color, speed, label, activateAt, startAngle, tilt }: {
  radius: number; color: string; speed: number; label: string;
  activateAt: number; startAngle: number; tilt: number
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const p = scrollState.progress
    const visibility = Math.max(0, Math.min(1, (p - activateAt) / 0.1))
    
    if (visibility <= 0) {
      groupRef.current.visible = false
      return
    }
    
    groupRef.current.visible = true
    const angle = startAngle + t * speed
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    const y = Math.sin(angle) * tilt * radius * 0.3
    
    groupRef.current.position.set(x, y, z)
    
    // Scale in
    const scale = visibility * (0.15 + Math.sin(t * 2 + startAngle) * 0.02)
    meshRef.current.scale.setScalar(scale)
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>
      <pointLight color={color} intensity={1} distance={5} />
      <Billboard>
        <Text
          fontSize={0.15}
          color="white"
          anchorY="bottom"
          position={[0, 0.3, 0]}
          fillOpacity={0.7}
          font="/fonts/inter.woff"
        >
          {label}
        </Text>
      </Billboard>
    </group>
  )
}

// ─── Camera Controller ─────────────────────────────────
function CameraController() {
  const { camera } = useThree()
  
  useFrame(() => {
    const p = scrollState.progress
    
    if (p < 0.05) {
      // Close up on the singularity
      camera.position.lerp(new THREE.Vector3(0, 0, 5), 0.05)
    } else if (p < 0.2) {
      // Pull back during explosion
      const ep = (p - 0.05) / 0.15
      camera.position.lerp(new THREE.Vector3(0, 2 * ep, 5 + ep * 10), 0.05)
    } else if (p < 0.5) {
      // Orbit around the forming system
      const orbitP = (p - 0.2) / 0.3
      camera.position.lerp(new THREE.Vector3(
        Math.sin(orbitP * 0.5) * 3,
        3 + orbitP * 2,
        12 + orbitP * 3
      ), 0.05)
    } else if (p < 0.8) {
      // Pull further back to see full system
      const viewP = (p - 0.5) / 0.3
      camera.position.lerp(new THREE.Vector3(
        Math.sin(viewP * 0.3) * 2,
        5 + viewP * 3,
        15 + viewP * 5
      ), 0.03)
    } else {
      // Final: epic wide shot
      camera.position.lerp(new THREE.Vector3(0, 8, 22), 0.03)
    }
    
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// ─── Scene ─────────────────────────────────────────────
function Scene() {
  const serviceGroups = [
    // Orbit 1: Precision Performance (PPC)
    { radius: 3, color: '#00D4FF', speed: 0.2, tilt: 0.1, activateAt: 0.3, services: ['Google Ads', 'Amazon Ads', 'Bing Ads'] },
    // Orbit 2: Social Conversion Engine
    { radius: 4.5, color: '#FF2D87', speed: 0.15, tilt: -0.15, activateAt: 0.4, services: ['Meta Ads', 'Pinterest', 'TikTok'] },
    // Orbit 3: Organic Opportunity Lab
    { radius: 6, color: '#00E676', speed: 0.12, tilt: 0.2, activateAt: 0.5, services: ['E-com SEO', 'Local SEO', 'AI-SEO'] },
    // Orbit 4: Conversion-Led Design
    { radius: 7.5, color: '#FFD700', speed: 0.1, tilt: -0.1, activateAt: 0.6, services: ['Landing Pages', 'Ad Creative', 'Video'] },
  ]

  return (
    <>
      {/* Ambient environment */}
      <ambientLight intensity={0.1} />
      <Stars radius={100} depth={50} count={3000} factor={3} saturation={0.5} fade speed={0.5} />
      
      {/* Camera */}
      <CameraController />
      
      {/* Central star */}
      <CentralStar />
      
      {/* Explosion particles */}
      <ExplosionParticles count={1500} />
      
      {/* Orbital rings */}
      {serviceGroups.map((group, gi) => (
        <OrbitRing
          key={`ring-${gi}`}
          radius={group.radius}
          color={group.color}
          tilt={group.tilt}
          activateAt={group.activateAt}
        />
      ))}
      
      {/* Service planets */}
      {serviceGroups.map((group, gi) =>
        group.services.map((svc, si) => (
          <ServicePlanet
            key={`planet-${gi}-${si}`}
            radius={group.radius}
            color={group.color}
            speed={group.speed}
            label={svc}
            activateAt={group.activateAt + si * 0.03}
            startAngle={(si / group.services.length) * Math.PI * 2}
            tilt={group.tilt}
          />
        ))
      )}
      
      {/* Fog for depth */}
      <fog attach="fog" args={['#000005', 20, 60]} />
    </>
  )
}

// ─── Stage text overlays ───────────────────────────────
const STAGES = [
  { title: 'Every empire starts the same way.', subtitle: 'A single point of potential. Infinite energy. Waiting.', progress: [0, 0.08] },
  { title: 'The Big Bang.', subtitle: 'Your ambition meets the digital universe. Everything begins.', progress: [0.08, 0.22] },
  { title: 'Chaos finds form.', subtitle: 'From scattered energy, strategy emerges. The right forces attract.', progress: [0.22, 0.35] },
  { title: 'Precision ignites.', subtitle: 'Google Ads · Amazon Ads · Bing Ads — the first orbit locks in.', progress: [0.35, 0.45] },
  { title: 'Social amplifies.', subtitle: 'Meta · Pinterest · TikTok — your gravity pulls audiences in.', progress: [0.45, 0.55] },
  { title: 'Organic compounds.', subtitle: 'SEO builds mass. Authority. Unstoppable momentum.', progress: [0.55, 0.65] },
  { title: 'Design converts.', subtitle: 'Every touchpoint, a conversion event. Beauty with purpose.', progress: [0.65, 0.78] },
  { title: 'Your universe, built.', subtitle: '138+ brands have built theirs. This is how empires grow.', progress: [0.78, 1.0] },
]

// ─── Main Component ────────────────────────────────────
export default function BigBangJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStage, setActiveStage] = useState(0)
  const [stageOpacity, setStageOpacity] = useState(1)
  const [showStats, setShowStats] = useState(false)
  const [statValues, setStatValues] = useState({ brands: 0, roas: 0, revenue: 0, referral: 0 })
  const statsAnimated = useRef(false)

  const animateStats = useCallback(() => {
    if (statsAnimated.current) return
    statsAnimated.current = true
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
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        scrollState.progress = self.progress

        // Determine active stage
        for (let i = 0; i < STAGES.length; i++) {
          const [start, end] = STAGES[i].progress
          if (self.progress >= start && self.progress < end) {
            setActiveStage((prev) => {
              if (prev !== i) {
                setStageOpacity(0)
                setTimeout(() => setStageOpacity(1), 150)
              }
              return i
            })
            break
          }
        }

        // Show stats at end
        if (self.progress > 0.82) {
          setShowStats(true)
          animateStats()
        }
      },
    })

    return () => st.kill()
  }, [animateStats])

  return (
    <div ref={containerRef} className="relative" style={{ height: '700vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Three.js Canvas */}
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 200 }}
          className="absolute inset-0"
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>

        {/* Stage text overlay */}
        <div
          className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-20 max-w-lg pointer-events-none"
          style={{ opacity: stageOpacity, transition: 'opacity 0.4s ease' }}
        >
          <div className="space-y-4">
            <p className="text-[10px] tracking-[0.4em] uppercase text-cyan-400/70 font-mono">
              {activeStage < 3 ? 'The Origin' : activeStage < 7 ? `Phase ${activeStage - 2} of 4` : 'The Result'}
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {STAGES[activeStage].title}
            </h2>
            <p className="text-base md:text-lg text-white/50 leading-relaxed">
              {STAGES[activeStage].subtitle}
            </p>
          </div>
        </div>

        {/* Stats overlay - final stage */}
        {showStats && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-10 md:gap-16 pointer-events-none"
            style={{ animation: 'fadeInUp 1s ease forwards' }}>
            {[
              { value: `${statValues.brands}+`, label: 'Brands' },
              { value: `${statValues.roas}X`, label: 'Avg ROAS' },
              { value: `₹${statValues.revenue}B+`, label: 'Revenue' },
              { value: `${statValues.referral}%`, label: 'Referral' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Progress indicator */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-40 w-[2px] bg-white/5 rounded-full pointer-events-none">
          {STAGES.map((_, i) => (
            <div
              key={i}
              className={`absolute w-1.5 h-1.5 rounded-full -left-[2px] transition-all duration-500 ${
                i <= activeStage ? 'bg-cyan-400' : 'bg-white/15'
              }`}
              style={{ top: `${(i / (STAGES.length - 1)) * 100}%` }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        {activeStage < STAGES.length - 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/20 text-[10px] tracking-[0.3em] uppercase font-mono pointer-events-none">
            Scroll to explore
          </div>
        )}
      </div>
    </div>
  )
}
