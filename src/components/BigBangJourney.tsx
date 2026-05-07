'use client'

import { useEffect, useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Billboard, Text } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Shared scroll progress ────────────────────────────
const scrollState = { progress: 0 }

/*
 * NARRATIVE PHASES (scroll 0→1):
 * 0.00–0.06  PHASE 1: Clean white calm. A gentle glow appears at center.
 * 0.06–0.14  PHASE 2: Color bleeds outward from center. Energy manifesting.
 * 0.14–0.22  PHASE 3: A sphere/seed forms. Your potential crystallizing.
 * 0.22–0.30  PHASE 4: Cracks appear. Shell fragments drift. The old way shatters.
 * 0.30–0.40  PHASE 5: THE BANG. Explosion. Particles fly. Universe born. Scene flips dark.
 * 0.40–0.50  PHASE 6: Chaos settling. Nebula forming. Central star ignites.
 * 0.50–0.60  PHASE 7: First orbit (PPC) locks in.
 * 0.60–0.70  PHASE 8: Second orbit (Social) forms.
 * 0.70–0.78  PHASE 9: Third orbit (SEO) + Fourth orbit (Design).
 * 0.78–1.00  PHASE 10: Full universe. Stats. Empire.
 */

// ─── Cosmic Egg (the seed before the bang) ─────────────
function CosmicEgg() {
  const shellRef = useRef<THREE.Mesh>(null!)
  const innerGlowRef = useRef<THREE.Mesh>(null!)
  const fragmentsRef = useRef<THREE.Group>(null!)
  
  // Generate shell fragment meshes
  const fragments = useMemo(() => {
    const frags = []
    for (let i = 0; i < 20; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      frags.push({
        dir: new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.sin(phi) * Math.sin(theta),
          Math.cos(phi)
        ),
        rotAxis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
        rotSpeed: 0.5 + Math.random() * 2,
        scale: 0.3 + Math.random() * 0.5,
      })
    }
    return frags
  }, [])

  useFrame(({ clock }) => {
    const p = scrollState.progress
    const t = clock.getElapsedTime()

    // Phase 1-2: Egg appears and grows
    if (p < 0.14) {
      shellRef.current.visible = true
      const appear = Math.max(0, (p - 0.06) / 0.08)
      const pulse = 1 + Math.sin(t * 1.5) * 0.03
      shellRef.current.scale.setScalar(appear * 1.2 * pulse)
      ;(shellRef.current.material as THREE.MeshStandardMaterial).opacity = appear * 0.8
      
      innerGlowRef.current.scale.setScalar(appear * 1.5)
      ;(innerGlowRef.current.material as THREE.MeshBasicMaterial).opacity = appear * 0.3
      
      fragmentsRef.current.visible = false
    }
    // Phase 3: Egg fully formed, pulsing with energy
    else if (p < 0.22) {
      shellRef.current.visible = true
      const pulse = 1 + Math.sin(t * 3) * 0.05
      shellRef.current.scale.setScalar(1.2 * pulse)
      ;(shellRef.current.material as THREE.MeshStandardMaterial).opacity = 0.8
      
      // Inner glow intensifies
      const energyBuild = (p - 0.14) / 0.08
      innerGlowRef.current.scale.setScalar(1.5 + energyBuild * 0.5)
      ;(innerGlowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + energyBuild * 0.4
      
      fragmentsRef.current.visible = false
    }
    // Phase 4: Cracks — shell breaks, fragments drift
    else if (p < 0.30) {
      const crackProgress = (p - 0.22) / 0.08
      shellRef.current.visible = true
      shellRef.current.scale.setScalar(1.2 * (1 - crackProgress * 0.3))
      ;(shellRef.current.material as THREE.MeshStandardMaterial).opacity = 0.8 * (1 - crackProgress)
      
      // Fragments appear and drift
      fragmentsRef.current.visible = true
      fragmentsRef.current.children.forEach((child, i) => {
        const frag = fragments[i]
        const dist = crackProgress * 3
        child.position.copy(frag.dir).multiplyScalar(1.2 + dist)
        child.rotation.x = t * frag.rotSpeed * crackProgress
        child.rotation.y = t * frag.rotSpeed * 0.7 * crackProgress
        child.scale.setScalar(frag.scale * (1 - crackProgress * 0.5))
        ;(child as THREE.Mesh).material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial
        const mat = ((child as THREE.Mesh).material as THREE.MeshStandardMaterial)
        mat.opacity = 1 - crackProgress
      })
      
      // Inner glow surges
      innerGlowRef.current.scale.setScalar(2 + crackProgress * 2)
      ;(innerGlowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.7 + crackProgress * 0.3
    }
    // Phase 5+: After bang, egg is gone
    else {
      shellRef.current.visible = false
      fragmentsRef.current.visible = false
      
      // Inner glow flash then fade
      if (p < 0.35) {
        const flash = (p - 0.30) / 0.05
        innerGlowRef.current.scale.setScalar(4 + flash * 8)
        ;(innerGlowRef.current.material as THREE.MeshBasicMaterial).opacity = 1 - flash
      } else {
        innerGlowRef.current.scale.setScalar(0)
      }
    }
  })

  return (
    <group>
      {/* The egg shell */}
      <mesh ref={shellRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#e0e8f0"
          transparent
          opacity={0}
          roughness={0.3}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Inner glow */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0} toneMapped={false} />
      </mesh>
      
      {/* Shell fragments */}
      <group ref={fragmentsRef}>
        {fragments.map((frag, i) => (
          <mesh key={i} position={frag.dir.clone().multiplyScalar(1.2)}>
            <boxGeometry args={[0.4, 0.3, 0.08]} />
            <meshStandardMaterial
              color="#c0d0e0"
              transparent
              opacity={1}
              roughness={0.4}
              metalness={0.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// ─── Explosion Particles ───────────────────────────────
function ExplosionParticles({ count = 1500 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  const particles = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const speed = 0.3 + Math.random() * 2
      arr.push({
        dx: Math.sin(phi) * Math.cos(theta) * speed,
        dy: Math.sin(phi) * Math.sin(theta) * speed,
        dz: Math.cos(phi) * speed,
        orbitRadius: 1.5 + Math.random() * 6,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitTilt: (Math.random() - 0.5) * 0.6,
        orbitSpeed: 0.08 + Math.random() * 0.2,
        scale: 0.008 + Math.random() * 0.025,
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

  useEffect(() => {
    if (!meshRef.current) return
    const colorArray = new Float32Array(count * 3)
    particles.forEach((pt, i) => {
      const c = colors[pt.colorIdx]
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

    particles.forEach((pt, i) => {
      // Before the bang: invisible
      if (p < 0.30) {
        dummy.position.set(0, 0, 0)
        dummy.scale.setScalar(0)
      }
      // Explosion: fly outward
      else if (p < 0.42) {
        const ep = (p - 0.30) / 0.12
        const ease = 1 - Math.pow(1 - ep, 3)
        const dist = ease * 10
        dummy.position.set(pt.dx * dist, pt.dy * dist, pt.dz * dist)
        dummy.scale.setScalar(pt.scale * Math.min(1, ep * 4))
      }
      // Nebula: coalesce into orbits
      else if (p < 0.55) {
        const np = (p - 0.42) / 0.13
        const maxDist = 10
        const targetR = pt.orbitRadius
        const curDist = maxDist - (maxDist - targetR) * np
        
        const expX = pt.dx * maxDist
        const expY = pt.dy * maxDist
        const expZ = pt.dz * maxDist
        
        const angle = pt.orbitAngle + t * pt.orbitSpeed * np
        const orbX = Math.cos(angle) * curDist
        const orbY = Math.sin(angle) * curDist * 0.3 + pt.orbitTilt * curDist
        const orbZ = Math.sin(angle + pt.orbitTilt) * curDist * 0.5
        
        dummy.position.set(
          THREE.MathUtils.lerp(expX, orbX, np),
          THREE.MathUtils.lerp(expY, orbY, np),
          THREE.MathUtils.lerp(expZ, orbZ, np)
        )
        dummy.scale.setScalar(pt.scale)
      }
      // Stable orbit
      else {
        const angle = pt.orbitAngle + t * pt.orbitSpeed
        const r = pt.orbitRadius
        dummy.position.set(
          Math.cos(angle) * r,
          Math.sin(angle) * r * 0.3 + pt.orbitTilt * r * 0.2,
          Math.sin(angle + pt.orbitTilt) * r * 0.5
        )
        const fadeOut = p > 0.85 ? Math.max(0.2, 1 - (p - 0.85) / 0.15) : 1
        dummy.scale.setScalar(pt.scale * fadeOut)
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

// ─── Central Star ──────────────────────────────────────
function CentralStar() {
  const coreRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)
  const lightRef = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const p = scrollState.progress

    // Only visible after the bang
    if (p < 0.35) {
      coreRef.current.scale.setScalar(0)
      glowRef.current.scale.setScalar(0)
      lightRef.current.intensity = 0
      return
    }
    
    // Star forming
    const formP = Math.min(1, (p - 0.35) / 0.15)
    const pulse = 1 + Math.sin(t * 2.5) * 0.06
    const size = formP * 0.6 * pulse
    
    coreRef.current.scale.setScalar(size)
    glowRef.current.scale.setScalar(size * 6)
    lightRef.current.intensity = formP * 5
  })

  return (
    <group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.12} toneMapped={false} />
      </mesh>
      <pointLight ref={lightRef} color="#00D4FF" intensity={0} distance={30} />
    </group>
  )
}

// ─── Orbit Rings ───────────────────────────────────────
function OrbitRing({ radius, color, tilt, activateAt }: {
  radius: number; color: string; tilt: number; activateAt: number
}) {
  const ref = useRef<THREE.Mesh>(null!)
  
  useFrame(() => {
    const p = scrollState.progress
    const vis = Math.max(0, Math.min(1, (p - activateAt) / 0.06))
    ;(ref.current.material as THREE.MeshBasicMaterial).opacity = vis * 0.25
    ref.current.scale.setScalar(vis)
  })

  return (
    <mesh ref={ref} rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 16, 120]} />
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
    const vis = Math.max(0, Math.min(1, (p - activateAt) / 0.08))
    
    if (vis <= 0) { groupRef.current.visible = false; return }
    groupRef.current.visible = true
    
    const angle = startAngle + t * speed
    groupRef.current.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * tilt * radius * 0.3,
      Math.sin(angle) * radius
    )
    meshRef.current.scale.setScalar(vis * (0.12 + Math.sin(t * 2 + startAngle) * 0.015))
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} toneMapped={false} />
      </mesh>
      <pointLight color={color} intensity={0.8} distance={4} />
    </group>
  )
}

// ─── Camera Controller ─────────────────────────────────
function CameraController() {
  const { camera } = useThree()
  
  useFrame(() => {
    const p = scrollState.progress
    let target: THREE.Vector3
    
    if (p < 0.14) {
      // Close on the egg forming
      target = new THREE.Vector3(0, 0, 4)
    } else if (p < 0.22) {
      // Slightly pull back as egg pulses
      target = new THREE.Vector3(0, 0.3, 5)
    } else if (p < 0.30) {
      // Slight shake/pull as cracks form
      const shake = (p - 0.22) / 0.08
      target = new THREE.Vector3(
        Math.sin(p * 80) * shake * 0.15,
        0.3 + shake * 0.3,
        5 + shake * 1
      )
    } else if (p < 0.42) {
      // Pull back during explosion
      const ep = (p - 0.30) / 0.12
      target = new THREE.Vector3(0, 1 + ep * 2, 6 + ep * 8)
    } else if (p < 0.55) {
      // Orbit the nebula
      const np = (p - 0.42) / 0.13
      target = new THREE.Vector3(
        Math.sin(np * 0.8) * 3,
        3 + np * 2,
        14 + np * 2
      )
    } else if (p < 0.78) {
      // Slowly pull back to see solar system form
      const sp = (p - 0.55) / 0.23
      target = new THREE.Vector3(
        Math.sin(sp * 0.5) * 2,
        5 + sp * 2,
        16 + sp * 4
      )
    } else {
      // Final wide shot
      target = new THREE.Vector3(0, 7, 22)
    }
    
    camera.position.lerp(target, 0.04)
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// ─── Background Color Controller ───────────────────────
function BackgroundController() {
  const { scene } = useThree()
  const whiteColor = useMemo(() => new THREE.Color('#f5f5f5'), [])
  const darkColor = useMemo(() => new THREE.Color('#000005'), [])
  
  useFrame(() => {
    const p = scrollState.progress
    if (p < 0.28) {
      // White/light background
      scene.background = whiteColor.clone()
    } else if (p < 0.38) {
      // Transition to dark during bang
      const t = (p - 0.28) / 0.10
      scene.background = whiteColor.clone().lerp(darkColor, t)
    } else {
      scene.background = darkColor.clone()
    }
  })
  
  return null
}

// ─── Stars (only visible in dark phase) ────────────────
function ConditionalStars() {
  const starsRef = useRef<THREE.Group>(null!)
  
  useFrame(() => {
    const p = scrollState.progress
    if (starsRef.current) {
      const vis = Math.max(0, Math.min(1, (p - 0.35) / 0.1))
      starsRef.current.children.forEach((child) => {
        ;(child as THREE.Points).material = (child as THREE.Points).material as THREE.PointsMaterial
        ;((child as THREE.Points).material as THREE.PointsMaterial).opacity = vis
      })
    }
  })
  
  return (
    <group ref={starsRef}>
      <Stars radius={100} depth={50} count={3000} factor={3} saturation={0.5} fade speed={0.5} />
    </group>
  )
}

// ─── Lighting that adapts to phase ─────────────────────
function AdaptiveLighting() {
  const ambientRef = useRef<THREE.AmbientLight>(null!)
  const dirRef = useRef<THREE.DirectionalLight>(null!)
  
  useFrame(() => {
    const p = scrollState.progress
    if (p < 0.30) {
      // Bright lighting for white phase
      ambientRef.current.intensity = 0.8
      dirRef.current.intensity = 1.2
      dirRef.current.color.set('#ffffff')
    } else if (p < 0.40) {
      const t = (p - 0.30) / 0.10
      ambientRef.current.intensity = 0.8 - t * 0.7
      dirRef.current.intensity = 1.2 - t * 1.0
    } else {
      ambientRef.current.intensity = 0.1
      dirRef.current.intensity = 0.2
    }
  })
  
  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.8} />
      <directionalLight ref={dirRef} position={[5, 5, 5]} intensity={1.2} />
    </>
  )
}

// ─── Full 3D Scene ─────────────────────────────────────
function Scene() {
  const serviceGroups = [
    { radius: 3, color: '#00D4FF', speed: 0.18, tilt: 0.1, activateAt: 0.50, services: ['Google Ads', 'Amazon Ads', 'Bing Ads'] },
    { radius: 4.5, color: '#FF2D87', speed: 0.14, tilt: -0.15, activateAt: 0.58, services: ['Meta Ads', 'Pinterest', 'TikTok'] },
    { radius: 6, color: '#00E676', speed: 0.11, tilt: 0.18, activateAt: 0.66, services: ['E-com SEO', 'Local SEO', 'AI-SEO'] },
    { radius: 7.5, color: '#FFD700', speed: 0.09, tilt: -0.1, activateAt: 0.72, services: ['Landing Pages', 'Ad Creative', 'Video'] },
  ]

  return (
    <>
      <BackgroundController />
      <AdaptiveLighting />
      <CameraController />
      <ConditionalStars />
      
      {/* The cosmic egg (pre-bang) */}
      <CosmicEgg />
      
      {/* Explosion particles (post-bang) */}
      <ExplosionParticles count={1500} />
      
      {/* Central star (post-bang) */}
      <CentralStar />
      
      {/* Orbital rings */}
      {serviceGroups.map((g, i) => (
        <OrbitRing key={`ring-${i}`} radius={g.radius} color={g.color} tilt={g.tilt} activateAt={g.activateAt} />
      ))}
      
      {/* Service planets */}
      {serviceGroups.map((g, gi) =>
        g.services.map((svc, si) => (
          <ServicePlanet
            key={`p-${gi}-${si}`}
            radius={g.radius} color={g.color} speed={g.speed} label={svc}
            activateAt={g.activateAt + si * 0.02}
            startAngle={(si / g.services.length) * Math.PI * 2}
            tilt={g.tilt}
          />
        ))
      )}
      
      <fog attach="fog" args={['#000005', 25, 60]} />
    </>
  )
}

// ─── Stage text ────────────────────────────────────────
const STAGES = [
  { title: '', subtitle: '', progress: [0, 0.06] },
  { title: 'Something is forming.', subtitle: '', progress: [0.06, 0.14] },
  { title: 'Pure potential.', subtitle: 'Waiting to be unleashed.', progress: [0.14, 0.22] },
  { title: 'The old limits shatter.', subtitle: 'Everything you thought you knew — breaking apart.', progress: [0.22, 0.30] },
  { title: 'The Bang.', subtitle: 'Your universe is born.', progress: [0.30, 0.42] },
  { title: 'From chaos, form.', subtitle: 'Strategy emerges. The right forces attract.', progress: [0.42, 0.50] },
  { title: 'Precision ignites.', subtitle: 'Google Ads · Amazon Ads · Bing Ads', progress: [0.50, 0.58] },
  { title: 'Social amplifies.', subtitle: 'Meta · Pinterest · TikTok — your gravity pulls audiences in.', progress: [0.58, 0.66] },
  { title: 'Organic compounds.', subtitle: 'SEO builds mass. Authority. Momentum.', progress: [0.66, 0.72] },
  { title: 'Design converts.', subtitle: 'Every touchpoint engineered for revenue.', progress: [0.72, 0.78] },
  { title: 'Your universe, built.', subtitle: '138+ brands built theirs. This is how empires grow.', progress: [0.78, 1.0] },
]

// ─── Main Component ────────────────────────────────────
export default function BigBangJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStage, setActiveStage] = useState(0)
  const [stageOpacity, setStageOpacity] = useState(1)
  const [showStats, setShowStats] = useState(false)
  const [statValues, setStatValues] = useState({ brands: 0, roas: 0, revenue: 0, referral: 0 })
  const [bgPhase, setBgPhase] = useState<'light' | 'dark'>('light')
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

        // Background phase
        setBgPhase(self.progress < 0.30 ? 'light' : 'dark')

        // Active stage
        for (let i = STAGES.length - 1; i >= 0; i--) {
          if (self.progress >= STAGES[i].progress[0]) {
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

        if (self.progress > 0.82) {
          setShowStats(true)
          animateStats()
        }
      },
    })

    return () => st.kill()
  }, [animateStats])

  // Text color depends on bg phase
  const textColor = bgPhase === 'light' ? 'text-gray-900' : 'text-white'
  const textSubColor = bgPhase === 'light' ? 'text-gray-500' : 'text-white/50'
  const accentColor = bgPhase === 'light' ? 'text-sky-600' : 'text-cyan-400/70'

  return (
    <div ref={containerRef} className="relative" style={{ height: '800vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Three.js Canvas */}
        <Canvas
          camera={{ position: [0, 0, 4], fov: 60, near: 0.1, far: 200 }}
          className="absolute inset-0"
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
        >
          <Scene />
        </Canvas>

        {/* Stage text overlay */}
        {STAGES[activeStage].title && (
          <div
            className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-20 max-w-lg pointer-events-none"
            style={{ opacity: stageOpacity, transition: 'opacity 0.4s ease' }}
          >
            <div className="space-y-4">
              {activeStage >= 6 && activeStage <= 9 && (
                <p className={`text-[10px] tracking-[0.4em] uppercase font-mono ${accentColor}`}>
                  Phase {activeStage - 5} of 4
                </p>
              )}
              <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold leading-tight ${textColor}`}>
                {STAGES[activeStage].title}
              </h2>
              {STAGES[activeStage].subtitle && (
                <p className={`text-base md:text-lg leading-relaxed ${textSubColor}`}>
                  {STAGES[activeStage].subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Stats overlay */}
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

        {/* Progress dots */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-none">
          {STAGES.filter(s => s.title).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                i <= activeStage ? (bgPhase === 'light' ? 'bg-sky-600' : 'bg-cyan-400') : (bgPhase === 'light' ? 'bg-gray-300' : 'bg-white/15')
              }`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        {activeStage < STAGES.length - 1 && (
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[10px] tracking-[0.3em] uppercase font-mono pointer-events-none ${
            bgPhase === 'light' ? 'text-gray-400' : 'text-white/20'
          }`}>
            Scroll to explore
          </div>
        )}
      </div>
    </div>
  )
}
