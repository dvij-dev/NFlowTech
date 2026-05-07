'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
 * NARRATIVE PHASES (scroll 0→1):
 * 0.00–0.06  Clean white calm. Subtle glow at center.
 * 0.06–0.14  Color bleeds outward. Energy manifesting.
 * 0.14–0.22  Cosmic egg/sphere forms. Pulsing.
 * 0.22–0.30  Cracks appear. Fragments drift. Tension.
 * 0.30–0.42  THE BANG. Explosion. White → dark transition.
 * 0.42–0.52  Nebula settling. Star ignites.
 * 0.52–0.62  Orbit 1: PPC
 * 0.62–0.72  Orbit 2: Social
 * 0.72–0.80  Orbit 3: SEO + Orbit 4: Design
 * 0.80–1.00  Full universe. Stats.
 */

// ─── Particle data ─────────────────────────────────────
interface Particle {
  dx: number; dy: number; dz: number
  orbitRadius: number; orbitAngle: number; orbitTilt: number; orbitSpeed: number
  scale: number; colorIdx: number
}

function createParticles(count: number): Particle[] {
  const arr: Particle[] = []
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
}

// ─── Shell fragment data ───────────────────────────────
interface Fragment {
  dir: THREE.Vector3
  rotAxis: THREE.Vector3
  rotSpeed: number
  scale: number
}

function createFragments(count: number): Fragment[] {
  const frags: Fragment[] = []
  for (let i = 0; i < count; i++) {
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
      scale: 0.15 + Math.random() * 0.25,
    })
  }
  return frags
}

// ─── Service orbit config ──────────────────────────────
const SERVICE_ORBITS = [
  { radius: 3, color: 0x00D4FF, speed: 0.18, tilt: 0.1, activateAt: 0.52, services: ['Google Ads', 'Amazon Ads', 'Bing Ads'] },
  { radius: 4.5, color: 0xFF2D87, speed: 0.14, tilt: -0.15, activateAt: 0.62, services: ['Meta Ads', 'Pinterest', 'TikTok'] },
  { radius: 6, color: 0x00E676, speed: 0.11, tilt: 0.18, activateAt: 0.70, services: ['E-com SEO', 'Local SEO', 'AI-SEO'] },
  { radius: 7.5, color: 0xFFD700, speed: 0.09, tilt: -0.1, activateAt: 0.76, services: ['Landing Pages', 'Ad Creative', 'Video'] },
]

const COLORS = [
  new THREE.Color(0x00D4FF),
  new THREE.Color(0xFF2D87),
  new THREE.Color(0x00E676),
  new THREE.Color(0xFFD700),
]

// ─── Text stages ───────────────────────────────────────
const STAGES = [
  { title: '', subtitle: '', range: [0, 0.06] },
  { title: 'Something stirs.', subtitle: '', range: [0.06, 0.14] },
  { title: 'Pure potential.', subtitle: 'Waiting to be unleashed.', range: [0.14, 0.22] },
  { title: 'The old limits shatter.', subtitle: 'Everything you thought you knew — breaking apart.', range: [0.22, 0.30] },
  { title: 'The Bang.', subtitle: 'Your universe is born.', range: [0.30, 0.42] },
  { title: 'From chaos, form.', subtitle: 'Strategy emerges. The right forces attract.', range: [0.42, 0.52] },
  { title: 'Precision ignites.', subtitle: 'Google Ads · Amazon Ads · Bing Ads', range: [0.52, 0.62] },
  { title: 'Social amplifies.', subtitle: 'Meta · Pinterest · TikTok — your gravity pulls audiences in.', range: [0.62, 0.72] },
  { title: 'Organic compounds.', subtitle: 'SEO builds mass. Authority. Momentum.', range: [0.72, 0.80] },
  { title: 'Your universe, built.', subtitle: '138+ brands built theirs. This is how empires grow.', range: [0.80, 1.0] },
]

// ─── The Three.js scene builder ────────────────────────
function buildScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf5f5f5)

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(0, 0, 4)

  // ── Lighting ──
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
  dirLight.position.set(5, 5, 5)
  scene.add(dirLight)

  // ── Center glow (always present, changes color) ──
  const glowGeo = new THREE.SphereGeometry(1, 32, 32)
  const glowMat = new THREE.MeshBasicMaterial({ color: 0x00D4FF, transparent: true, opacity: 0 })
  const glowMesh = new THREE.Mesh(glowGeo, glowMat)
  scene.add(glowMesh)

  // ── Cosmic egg shell ──
  const eggGeo = new THREE.SphereGeometry(1, 32, 32)
  const eggMat = new THREE.MeshStandardMaterial({
    color: 0xd0dce8, transparent: true, opacity: 0,
    roughness: 0.25, metalness: 0.15, side: THREE.FrontSide,
  })
  const eggMesh = new THREE.Mesh(eggGeo, eggMat)
  scene.add(eggMesh)

  // ── Star core (post-bang) ──
  const starGeo = new THREE.SphereGeometry(1, 32, 32)
  const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const starMesh = new THREE.Mesh(starGeo, starMat)
  starMesh.scale.setScalar(0)
  scene.add(starMesh)
  const starLight = new THREE.PointLight(0x00D4FF, 0, 30)
  scene.add(starLight)

  // ── Shell fragments ──
  const fragments = createFragments(24)
  const fragMeshes: THREE.Mesh[] = []
  const fragGroup = new THREE.Group()
  fragments.forEach((f) => {
    const geo = new THREE.BoxGeometry(0.3, 0.2, 0.06)
    const mat = new THREE.MeshStandardMaterial({ color: 0xc0d0e0, transparent: true, opacity: 0, roughness: 0.4, metalness: 0.2 })
    const m = new THREE.Mesh(geo, mat)
    fragGroup.add(m)
    fragMeshes.push(m)
  })
  scene.add(fragGroup)

  // ── Explosion particles (instanced) ──
  const PARTICLE_COUNT = 1200
  const particles = createParticles(PARTICLE_COUNT)
  const particleGeo = new THREE.SphereGeometry(1, 4, 4)
  const particleMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.85 })
  const instancedMesh = new THREE.InstancedMesh(particleGeo, particleMat, PARTICLE_COUNT)
  instancedMesh.visible = false
  
  // Set instance colors
  const colorArr = new Float32Array(PARTICLE_COUNT * 3)
  particles.forEach((pt, i) => {
    const c = COLORS[pt.colorIdx]
    colorArr[i * 3] = c.r
    colorArr[i * 3 + 1] = c.g
    colorArr[i * 3 + 2] = c.b
  })
  instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(colorArr, 3)
  scene.add(instancedMesh)
  const dummy = new THREE.Object3D()

  // ── Stars (background, for post-bang) ──
  const starFieldGeo = new THREE.BufferGeometry()
  const starPositions = new Float32Array(3000 * 3)
  for (let i = 0; i < 3000; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 200
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200
    starPositions[i * 3 + 2] = -20 - Math.random() * 80
  }
  starFieldGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  const starFieldMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.15, transparent: true, opacity: 0 })
  const starField = new THREE.Points(starFieldGeo, starFieldMat)
  scene.add(starField)

  // ── Orbit rings ──
  const orbitRings: THREE.Mesh[] = []
  SERVICE_ORBITS.forEach((orbit) => {
    const ringGeo = new THREE.TorusGeometry(orbit.radius, 0.012, 16, 120)
    const ringMat = new THREE.MeshBasicMaterial({ color: orbit.color, transparent: true, opacity: 0 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2 + orbit.tilt
    scene.add(ring)
    orbitRings.push(ring)
  })

  // ── Service planet spheres ──
  const planetMeshes: THREE.Mesh[] = []
  const planetLights: THREE.PointLight[] = []
  const planetData: { orbitIdx: number; startAngle: number }[] = []
  SERVICE_ORBITS.forEach((orbit, oi) => {
    orbit.services.forEach((_, si) => {
      const pGeo = new THREE.SphereGeometry(1, 12, 12)
      const pMat = new THREE.MeshStandardMaterial({ color: orbit.color, emissive: orbit.color, emissiveIntensity: 0.5 })
      const pMesh = new THREE.Mesh(pGeo, pMat)
      pMesh.visible = false
      scene.add(pMesh)
      planetMeshes.push(pMesh)

      const pLight = new THREE.PointLight(orbit.color, 0.6, 4)
      pMesh.add(pLight)
      planetLights.push(pLight)

      planetData.push({ orbitIdx: oi, startAngle: (si / orbit.services.length) * Math.PI * 2 })
    })
  })

  // ── Fog ──
  scene.fog = new THREE.Fog(0x000005, 25, 60)

  // ── Scroll state ──
  let progress = 0

  // ── Animation loop ──
  const whiteColor = new THREE.Color(0xf5f5f5)
  const darkColor = new THREE.Color(0x000005)
  const clock = new THREE.Clock()

  function animate() {
    requestAnimationFrame(animate)
    const t = clock.getElapsedTime()
    const p = progress

    // ─ Background transition ─
    if (p < 0.28) {
      scene.background = whiteColor.clone()
      scene.fog!.color.copy(whiteColor)
    } else if (p < 0.38) {
      const blend = (p - 0.28) / 0.10
      scene.background = whiteColor.clone().lerp(darkColor, blend)
      scene.fog!.color.copy(scene.background as THREE.Color)
    } else {
      scene.background = darkColor.clone()
      scene.fog!.color.copy(darkColor)
    }

    // ─ Lighting adaptation ─
    if (p < 0.30) {
      ambientLight.intensity = 0.8
      dirLight.intensity = 1.2
    } else if (p < 0.40) {
      const blend = (p - 0.30) / 0.10
      ambientLight.intensity = 0.8 - blend * 0.7
      dirLight.intensity = 1.2 - blend * 1.0
    } else {
      ambientLight.intensity = 0.1
      dirLight.intensity = 0.2
    }

    // ─ Center glow ─
    if (p < 0.06) {
      // Faint glow appears
      const appear = p / 0.06
      glowMesh.scale.setScalar(0.3 + appear * 0.5)
      glowMat.opacity = appear * 0.08
      glowMat.color.set(0x88bbdd)
    } else if (p < 0.14) {
      // Color bleeds outward
      const bleed = (p - 0.06) / 0.08
      glowMesh.scale.setScalar(0.8 + bleed * 1.5)
      glowMat.opacity = 0.08 + bleed * 0.15
      glowMat.color.lerpColors(new THREE.Color(0x88bbdd), new THREE.Color(0x00D4FF), bleed)
    } else if (p < 0.30) {
      // Intensify inside egg
      const energyP = (p - 0.14) / 0.16
      const pulse = 1 + Math.sin(t * 3) * 0.08
      glowMesh.scale.setScalar((1.5 + energyP * 1) * pulse)
      glowMat.opacity = 0.23 + energyP * 0.3
    } else if (p < 0.36) {
      // Flash during bang
      const flashP = (p - 0.30) / 0.06
      glowMesh.scale.setScalar(2.5 + flashP * 8)
      glowMat.opacity = Math.max(0, 0.6 * (1 - flashP))
    } else {
      glowMat.opacity = 0
    }

    // ─ Cosmic egg ─
    if (p < 0.06) {
      eggMesh.scale.setScalar(0)
      eggMat.opacity = 0
    } else if (p < 0.14) {
      const eggAppear = (p - 0.06) / 0.08
      eggMesh.scale.setScalar(eggAppear * 1.2)
      eggMat.opacity = eggAppear * 0.75
    } else if (p < 0.22) {
      const pulse = 1 + Math.sin(t * 2.5) * 0.04
      eggMesh.scale.setScalar(1.2 * pulse)
      eggMat.opacity = 0.75
    } else if (p < 0.30) {
      // Cracking — egg fades, fragments appear
      const crackP = (p - 0.22) / 0.08
      eggMesh.scale.setScalar(1.2 * (1 - crackP * 0.4))
      eggMat.opacity = 0.75 * (1 - crackP)
    } else {
      eggMat.opacity = 0
    }

    // ─ Shell fragments ─
    if (p >= 0.22 && p < 0.38) {
      fragGroup.visible = true
      const crackP = Math.min(1, (p - 0.22) / 0.08)
      const driftP = p >= 0.30 ? Math.min(1, (p - 0.30) / 0.08) : 0
      
      fragments.forEach((frag, i) => {
        const mesh = fragMeshes[i]
        const dist = 1.2 + crackP * 2.5 + driftP * 6
        mesh.position.copy(frag.dir).multiplyScalar(dist)
        mesh.rotation.x = t * frag.rotSpeed * (crackP + driftP * 2)
        mesh.rotation.y = t * frag.rotSpeed * 0.7 * (crackP + driftP * 2)
        mesh.scale.setScalar(frag.scale * Math.max(0, 1 - driftP * 1.2))
        ;(mesh.material as THREE.MeshStandardMaterial).opacity = Math.max(0, crackP * (1 - driftP))
      })
    } else {
      fragGroup.visible = false
    }

    // ─ Explosion particles ─
    if (p >= 0.30) {
      instancedMesh.visible = true
      particles.forEach((pt, i) => {
        if (p < 0.42) {
          // Fly outward
          const ep = (p - 0.30) / 0.12
          const ease = 1 - Math.pow(1 - ep, 3)
          const dist = ease * 10
          dummy.position.set(pt.dx * dist, pt.dy * dist, pt.dz * dist)
          dummy.scale.setScalar(pt.scale * Math.min(1, ep * 4))
        } else if (p < 0.55) {
          // Coalesce into orbits
          const np = (p - 0.42) / 0.13
          const maxDist = 10
          const expX = pt.dx * maxDist, expY = pt.dy * maxDist, expZ = pt.dz * maxDist
          const angle = pt.orbitAngle + t * pt.orbitSpeed * np
          const curDist = maxDist - (maxDist - pt.orbitRadius) * np
          const orbX = Math.cos(angle) * curDist
          const orbY = Math.sin(angle) * curDist * 0.3 + pt.orbitTilt * curDist
          const orbZ = Math.sin(angle + pt.orbitTilt) * curDist * 0.5
          
          dummy.position.set(
            THREE.MathUtils.lerp(expX, orbX, np),
            THREE.MathUtils.lerp(expY, orbY, np),
            THREE.MathUtils.lerp(expZ, orbZ, np)
          )
          dummy.scale.setScalar(pt.scale)
        } else {
          // Stable orbits
          const angle = pt.orbitAngle + t * pt.orbitSpeed
          const r = pt.orbitRadius
          dummy.position.set(
            Math.cos(angle) * r,
            Math.sin(angle) * r * 0.3 + pt.orbitTilt * r * 0.2,
            Math.sin(angle + pt.orbitTilt) * r * 0.5
          )
          const fadeOut = p > 0.88 ? Math.max(0.2, 1 - (p - 0.88) / 0.12) : 1
          dummy.scale.setScalar(pt.scale * fadeOut)
        }
        dummy.updateMatrix()
        instancedMesh.setMatrixAt(i, dummy.matrix)
      })
      instancedMesh.instanceMatrix.needsUpdate = true
    } else {
      instancedMesh.visible = false
    }

    // ─ Star field ─
    const starVis = Math.max(0, Math.min(1, (p - 0.35) / 0.10))
    starFieldMat.opacity = starVis * 0.7

    // ─ Central star ─
    if (p >= 0.38) {
      const formP = Math.min(1, (p - 0.38) / 0.14)
      const pulse = 1 + Math.sin(t * 2.5) * 0.06
      starMesh.scale.setScalar(formP * 0.5 * pulse)
      starLight.intensity = formP * 5
    } else {
      starMesh.scale.setScalar(0)
      starLight.intensity = 0
    }

    // ─ Orbit rings ─
    orbitRings.forEach((ring, i) => {
      const vis = Math.max(0, Math.min(1, (p - SERVICE_ORBITS[i].activateAt) / 0.06))
      ;(ring.material as THREE.MeshBasicMaterial).opacity = vis * 0.25
      ring.scale.setScalar(Math.max(0.01, vis))
    })

    // ─ Service planets ─
    let pi2 = 0
    SERVICE_ORBITS.forEach((orbit, oi) => {
      orbit.services.forEach((_, si) => {
        const mesh = planetMeshes[pi2]
        const data = planetData[pi2]
        const vis = Math.max(0, Math.min(1, (p - (orbit.activateAt + si * 0.02)) / 0.06))
        
        if (vis <= 0) {
          mesh.visible = false
        } else {
          mesh.visible = true
          const angle = data.startAngle + t * orbit.speed
          mesh.position.set(
            Math.cos(angle) * orbit.radius,
            Math.sin(angle) * orbit.tilt * orbit.radius * 0.3,
            Math.sin(angle) * orbit.radius
          )
          mesh.scale.setScalar(vis * (0.1 + Math.sin(t * 2 + data.startAngle) * 0.01))
        }
        pi2++
      })
    })

    // ─ Camera ─
    let camTarget: THREE.Vector3
    if (p < 0.14) {
      camTarget = new THREE.Vector3(0, 0, 4)
    } else if (p < 0.22) {
      camTarget = new THREE.Vector3(0, 0.2, 4.5)
    } else if (p < 0.30) {
      const shake = (p - 0.22) / 0.08
      camTarget = new THREE.Vector3(
        Math.sin(t * 15) * shake * 0.08,
        0.2 + shake * 0.2,
        4.5 + shake * 1
      )
    } else if (p < 0.42) {
      const ep = (p - 0.30) / 0.12
      camTarget = new THREE.Vector3(0, 1 + ep * 1.5, 5.5 + ep * 8)
    } else if (p < 0.55) {
      const np = (p - 0.42) / 0.13
      camTarget = new THREE.Vector3(Math.sin(np * 0.8) * 2, 2.5 + np * 2, 13 + np * 2)
    } else if (p < 0.80) {
      const sp = (p - 0.55) / 0.25
      camTarget = new THREE.Vector3(Math.sin(sp * 0.5) * 2, 4.5 + sp * 2, 15 + sp * 5)
    } else {
      camTarget = new THREE.Vector3(0, 7, 22)
    }
    camera.position.lerp(camTarget, 0.04)
    camera.lookAt(0, 0, 0)

    renderer.render(scene, camera)
  }

  animate()

  // ── Resize handler ──
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize)

  return {
    setProgress(p: number) { progress = p },
    dispose() {
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }
}

// ─── Main Component ────────────────────────────────────
export default function BigBangJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<ReturnType<typeof buildScene> | null>(null)
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

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return
    sceneRef.current = buildScene(canvasRef.current)
    return () => { sceneRef.current?.dispose() }
  }, [])

  // ScrollTrigger
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        sceneRef.current?.setProgress(self.progress)
        setBgPhase(self.progress < 0.30 ? 'light' : 'dark')

        for (let i = STAGES.length - 1; i >= 0; i--) {
          if (self.progress >= STAGES[i].range[0]) {
            setActiveStage((prev) => {
              if (prev !== i) {
                setStageOpacity(0)
                setTimeout(() => setStageOpacity(1), 180)
              }
              return i
            })
            break
          }
        }

        if (self.progress > 0.84) {
          setShowStats(true)
          animateStats()
        }
      },
    })

    return () => st.kill()
  }, [animateStats])

  const textColor = bgPhase === 'light' ? 'text-gray-900' : 'text-white'
  const subColor = bgPhase === 'light' ? 'text-gray-500' : 'text-white/50'
  const accentColor = bgPhase === 'light' ? 'text-sky-600' : 'text-cyan-400/70'

  return (
    <div ref={containerRef} className="relative" style={{ height: '800vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Three.js canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Stage text overlay */}
        {STAGES[activeStage]?.title && (
          <div
            className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-20 max-w-lg pointer-events-none"
            style={{ opacity: stageOpacity, transition: 'opacity 0.4s ease' }}
          >
            <div className="space-y-4">
              {activeStage >= 6 && activeStage <= 8 && (
                <p className={`text-[10px] tracking-[0.4em] uppercase font-mono ${accentColor}`}>
                  Phase {activeStage - 5} of 3
                </p>
              )}
              <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold leading-tight ${textColor}`}>
                {STAGES[activeStage].title}
              </h2>
              {STAGES[activeStage].subtitle && (
                <p className={`text-base md:text-lg leading-relaxed ${subColor}`}>
                  {STAGES[activeStage].subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        {showStats && (
          <div
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-10 md:gap-16 pointer-events-none"
            style={{ animation: 'fadeInUp 1s ease forwards' }}
          >
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
          {STAGES.filter((s) => s.title).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                i + 1 <= activeStage
                  ? bgPhase === 'light' ? 'bg-sky-600' : 'bg-cyan-400'
                  : bgPhase === 'light' ? 'bg-gray-300' : 'bg-white/15'
              }`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        {activeStage < STAGES.length - 1 && (
          <div
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[10px] tracking-[0.3em] uppercase font-mono pointer-events-none ${
              bgPhase === 'light' ? 'text-gray-400' : 'text-white/20'
            }`}
          >
            Scroll to explore
          </div>
        )}
      </div>
    </div>
  )
}
