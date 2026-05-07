'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/*
 * NARRATIVE SEQUENCE:
 * 
 * LOAD      → Dark space. Twinkling stars. "Click to begin" CTA.
 * CLICK     → Colors bleed from center outward (hatom-style). Cosmic egg forms.
 * SCROLL 0.00–0.15  → Egg pulses with energy. Colors intensify.
 * SCROLL 0.15–0.25  → Cracks appear. Shell fragments drift. Tension.
 * SCROLL 0.25–0.35  → THE BANG. Explosion of light and particles.
 * SCROLL 0.35–0.50  → Nebula settles. 1st star ignites. Single-star system. (PPC orbit)
 * SCROLL 0.50–0.65  → 2nd star born from gas cloud. Binary system. (Social orbit)
 * SCROLL 0.65–0.80  → 3rd star emerges. Triple system. (SEO orbit + Design ring)
 * SCROLL 0.80–1.00  → Full evolved universe. Stats. "Your universe, built."
 */

// ─── Types ─────────────────────────────────────────
interface Particle {
  dx: number; dy: number; dz: number
  orbitRadius: number; orbitAngle: number; orbitTilt: number; orbitSpeed: number
  scale: number; colorIdx: number
}

interface Fragment {
  dir: THREE.Vector3
  rotSpeed: number
  scale: number
}

// ─── Helpers ───────────────────────────────────────
function makeParticles(count: number): Particle[] {
  const arr: Particle[] = []
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const speed = 0.4 + Math.random() * 2.2
    arr.push({
      dx: Math.sin(phi) * Math.cos(theta) * speed,
      dy: Math.sin(phi) * Math.sin(theta) * speed,
      dz: Math.cos(phi) * speed,
      orbitRadius: 1.5 + Math.random() * 7,
      orbitAngle: Math.random() * Math.PI * 2,
      orbitTilt: (Math.random() - 0.5) * 0.5,
      orbitSpeed: 0.06 + Math.random() * 0.18,
      scale: 0.006 + Math.random() * 0.02,
      colorIdx: Math.floor(Math.random() * 4),
    })
  }
  return arr
}

function makeFragments(count: number): Fragment[] {
  return Array.from({ length: count }, () => {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    return {
      dir: new THREE.Vector3(Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), Math.cos(phi)),
      rotSpeed: 0.5 + Math.random() * 2,
      scale: 0.12 + Math.random() * 0.22,
    }
  })
}

// ─── Star system configs (3 evolutions) ────────────
const STAR_SYSTEMS = [
  {
    // Star 1 — Precision Performance (PPC)
    color: 0x00D4FF,
    emissive: 0x0088CC,
    position: new THREE.Vector3(0, 0, 0),
    size: 0.5,
    activateAt: 0.35,
    label: 'Precision Performance',
    orbits: [
      { radius: 2.5, speed: 0.22, tilt: 0.1, planetColor: 0x00D4FF, planets: ['Google Ads', 'Amazon Ads', 'Bing Ads'] },
    ],
  },
  {
    // Star 2 — Social Conversion Engine
    color: 0xFF2D87,
    emissive: 0xCC1166,
    position: new THREE.Vector3(-4, 1.5, -2),
    size: 0.4,
    activateAt: 0.50,
    label: 'Social Engine',
    orbits: [
      { radius: 2, speed: 0.18, tilt: -0.15, planetColor: 0xFF2D87, planets: ['Meta Ads', 'Pinterest', 'TikTok'] },
    ],
  },
  {
    // Star 3 — Organic + Design
    color: 0x00E676,
    emissive: 0x00AA55,
    position: new THREE.Vector3(3.5, -1, -3),
    size: 0.35,
    activateAt: 0.65,
    label: 'Organic & Design',
    orbits: [
      { radius: 1.8, speed: 0.15, tilt: 0.2, planetColor: 0x00E676, planets: ['SEO', 'Content'] },
      { radius: 3, speed: 0.10, tilt: -0.1, planetColor: 0xFFD700, planets: ['Landing Pages', 'Creative', 'Video'] },
    ],
  },
]

const PALETTE = [
  new THREE.Color(0x00D4FF),
  new THREE.Color(0xFF2D87),
  new THREE.Color(0x00E676),
  new THREE.Color(0xFFD700),
]

// ─── Text stages ───────────────────────────────────
const STAGES = [
  { title: '', subtitle: '', range: [0, 0.05] },
  { title: 'Energy builds.', subtitle: 'Something immense is taking shape.', range: [0.05, 0.15] },
  { title: 'The limits shatter.', subtitle: '', range: [0.15, 0.25] },
  { title: 'The Bang.', subtitle: 'Your universe is born.', range: [0.25, 0.35] },
  { title: 'Precision ignites.', subtitle: 'Google Ads · Amazon Ads · Bing Ads', range: [0.35, 0.50] },
  { title: 'Social amplifies.', subtitle: 'Meta · Pinterest · TikTok — gravity pulls audiences in.', range: [0.50, 0.65] },
  { title: 'Organic compounds.', subtitle: 'SEO + Design build lasting mass and authority.', range: [0.65, 0.80] },
  { title: 'Your universe, built.', subtitle: '138+ brands built theirs. This is how empires grow.', range: [0.80, 1.0] },
]

// ─── Three.js scene ────────────────────────────────
function buildScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x020208)

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 300)
  camera.position.set(0, 0, 5)

  // ── Ambient light ──
  const ambient = new THREE.AmbientLight(0xffffff, 0.15)
  scene.add(ambient)

  // ── Twinkling star field (always visible) ──
  const STAR_COUNT = 2500
  const starGeo = new THREE.BufferGeometry()
  const starPos = new Float32Array(STAR_COUNT * 3)
  const starSizes = new Float32Array(STAR_COUNT)
  const starPhases = new Float32Array(STAR_COUNT) // for twinkling
  for (let i = 0; i < STAR_COUNT; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 250
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 250
    starPos[i * 3 + 2] = -5 - Math.random() * 120
    starSizes[i] = 0.05 + Math.random() * 0.2
    starPhases[i] = Math.random() * Math.PI * 2
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
  // Use PointsMaterial with size attenuation
  const starMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.12,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  })
  const stars = new THREE.Points(starGeo, starMat)
  scene.add(stars)

  // ── Color bleed sphere (for click activation — grows from center) ──
  const bleedGeo = new THREE.SphereGeometry(1, 64, 64)
  const bleedMat = new THREE.MeshBasicMaterial({
    color: 0x00D4FF,
    transparent: true,
    opacity: 0,
  })
  const bleedMesh = new THREE.Mesh(bleedGeo, bleedMat)
  bleedMesh.scale.setScalar(0)
  scene.add(bleedMesh)

  // ── Cosmic egg ──
  const eggGeo = new THREE.SphereGeometry(1.1, 64, 64)
  const eggMat = new THREE.MeshStandardMaterial({
    color: 0xc8d8e8,
    transparent: true,
    opacity: 0,
    roughness: 0.2,
    metalness: 0.15,
  })
  const eggMesh = new THREE.Mesh(eggGeo, eggMat)
  scene.add(eggMesh)

  // Inner glow of egg
  const innerGlowGeo = new THREE.SphereGeometry(0.9, 32, 32)
  const innerGlowMat = new THREE.MeshBasicMaterial({ color: 0x00D4FF, transparent: true, opacity: 0 })
  const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat)
  scene.add(innerGlow)

  // ── Shell fragments ──
  const fragments = makeFragments(30)
  const fragMeshes: THREE.Mesh[] = []
  const fragGroup = new THREE.Group()
  fragments.forEach((f) => {
    const geo = new THREE.BoxGeometry(
      0.2 + Math.random() * 0.2,
      0.15 + Math.random() * 0.15,
      0.04 + Math.random() * 0.03
    )
    const mat = new THREE.MeshStandardMaterial({
      color: 0xd0dce8,
      transparent: true,
      opacity: 0,
      roughness: 0.3,
      metalness: 0.1,
    })
    const m = new THREE.Mesh(geo, mat)
    fragGroup.add(m)
    fragMeshes.push(m)
  })
  scene.add(fragGroup)

  // ── Explosion particles ──
  const PARTICLE_COUNT = 1500
  const particles = makeParticles(PARTICLE_COUNT)
  const pGeo = new THREE.SphereGeometry(1, 5, 5)
  const pMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9 })
  const instMesh = new THREE.InstancedMesh(pGeo, pMat, PARTICLE_COUNT)
  instMesh.visible = false
  const colorArr = new Float32Array(PARTICLE_COUNT * 3)
  particles.forEach((pt, i) => {
    const c = PALETTE[pt.colorIdx]
    colorArr[i * 3] = c.r
    colorArr[i * 3 + 1] = c.g
    colorArr[i * 3 + 2] = c.b
  })
  instMesh.instanceColor = new THREE.InstancedBufferAttribute(colorArr, 3)
  scene.add(instMesh)
  const dummy = new THREE.Object3D()

  // ── Star system objects ──
  interface StarObj {
    mesh: THREE.Mesh
    light: THREE.PointLight
    rings: THREE.Mesh[]
    planets: THREE.Mesh[]
    planetAngles: number[]
  }
  const starObjs: StarObj[] = []

  STAR_SYSTEMS.forEach((sys) => {
    // Star sphere
    const sGeo = new THREE.SphereGeometry(sys.size, 32, 32)
    const sMat = new THREE.MeshBasicMaterial({
      color: sys.color,
      transparent: true,
      opacity: 0,
    })
    const sMesh = new THREE.Mesh(sGeo, sMat)
    sMesh.position.copy(sys.position)
    scene.add(sMesh)

    // Point light
    const sLight = new THREE.PointLight(sys.color, 0, 20)
    sLight.position.copy(sys.position)
    scene.add(sLight)

    // Orbit rings
    const rings: THREE.Mesh[] = []
    sys.orbits.forEach((orbit) => {
      const rGeo = new THREE.TorusGeometry(orbit.radius, 0.01, 16, 100)
      const rMat = new THREE.MeshBasicMaterial({ color: orbit.planetColor, transparent: true, opacity: 0 })
      const ring = new THREE.Mesh(rGeo, rMat)
      ring.position.copy(sys.position)
      ring.rotation.x = Math.PI / 2 + orbit.tilt
      scene.add(ring)
      rings.push(ring)
    })

    // Planets
    const planets: THREE.Mesh[] = []
    const planetAngles: number[] = []
    sys.orbits.forEach((orbit) => {
      orbit.planets.forEach((_, pi) => {
        const plGeo = new THREE.SphereGeometry(0.08, 10, 10)
        const plMat = new THREE.MeshStandardMaterial({
          color: orbit.planetColor,
          emissive: orbit.planetColor,
          emissiveIntensity: 0.6,
          transparent: true,
          opacity: 0,
        })
        const plMesh = new THREE.Mesh(plGeo, plMat)
        scene.add(plMesh)
        planets.push(plMesh)
        planetAngles.push((pi / orbit.planets.length) * Math.PI * 2)
      })
    })

    starObjs.push({ mesh: sMesh, light: sLight, rings, planets, planetAngles })
  })

  // ── Gravitational connection lines (between stars when multiple exist) ──
  const connLineGeo = new THREE.BufferGeometry()
  const connLineMat = new THREE.LineBasicMaterial({ color: 0x00D4FF, transparent: true, opacity: 0 })
  const connLine = new THREE.Line(connLineGeo, connLineMat)
  scene.add(connLine)

  // ── Fog ──
  scene.fog = new THREE.FogExp2(0x020208, 0.008)

  // ── State ──
  let progress = 0
  let activated = false // becomes true on click
  let activationProgress = 0 // 0 → 1 over ~2s after click
  const clock = new THREE.Clock()

  function animate() {
    requestAnimationFrame(animate)
    const t = clock.getElapsedTime()
    const p = progress
    const dt = clock.getDelta()

    // ── Activation animation (click → color bleed) ──
    if (activated && activationProgress < 1) {
      activationProgress = Math.min(1, activationProgress + dt * 0.6) // ~1.7s
    }
    const ap = activationProgress
    const easeAp = 1 - Math.pow(1 - ap, 3) // ease out

    // ── Star twinkling ──
    // Modulate opacity with sin wave for twinkling effect
    const twinkle = 0.6 + Math.sin(t * 0.8) * 0.2
    starMat.opacity = activated ? (ap < 1 ? 0.8 * (1 - easeAp * 0.3) : 0.5) : twinkle

    // ── Color bleed from center (on activation) ──
    if (activated) {
      bleedMesh.scale.setScalar(easeAp * 25)
      bleedMat.opacity = Math.max(0, 0.3 * (1 - easeAp))
      // Cycle color
      const hue = (t * 0.15) % 1
      bleedMat.color.setHSL(hue * 0.55 + 0.5, 0.9, 0.55)
    }

    // ── Cosmic egg (appears after color bleed reaches ~60%) ──
    const eggStart = 0.5 // activation progress when egg starts appearing
    if (activated && ap > eggStart) {
      const eggP = Math.min(1, (ap - eggStart) / (1 - eggStart))
      const breath = 1 + Math.sin(t * 2) * 0.02
      eggMesh.scale.setScalar(eggP * 1.1 * breath)
      eggMat.opacity = eggP * 0.8

      innerGlow.scale.setScalar(eggP * 0.85 * breath)
      innerGlowMat.opacity = eggP * 0.2
    }

    // ── SCROLL PHASES (only matter after activation is complete) ──
    if (ap >= 1) {
      // ── Egg with scroll-driven energy ──
      if (p < 0.15) {
        const energy = p / 0.15
        const pulse = 1 + Math.sin(t * (2 + energy * 3)) * 0.03 * (1 + energy)
        eggMesh.scale.setScalar(1.1 * pulse)
        eggMat.opacity = 0.8 - energy * 0.1

        // Inner glow intensifies with scroll
        innerGlow.scale.setScalar(0.85 + energy * 0.3)
        innerGlowMat.opacity = 0.2 + energy * 0.35
        const hue = (t * 0.25 + energy * 0.3) % 1
        innerGlowMat.color.setHSL(hue * 0.6, 0.9, 0.55)
      } else if (p < 0.25) {
        // Cracking
        const crackP = (p - 0.15) / 0.10
        const tremble = 1 + Math.sin(t * 15) * 0.015 * crackP
        eggMesh.scale.setScalar(1.1 * (1 - crackP * 0.3) * tremble)
        eggMat.opacity = Math.max(0, 0.7 * (1 - crackP))

        innerGlow.scale.setScalar(1.15 + crackP * 0.8)
        innerGlowMat.opacity = Math.max(0, 0.55 * (1 - crackP * 0.5))

        // Fragments
        fragGroup.visible = true
        fragments.forEach((frag, i) => {
          const mesh = fragMeshes[i]
          const dist = 1.1 + crackP * 2.5
          mesh.position.copy(frag.dir).multiplyScalar(dist)
          mesh.rotation.x = t * frag.rotSpeed * crackP
          mesh.rotation.z = t * frag.rotSpeed * 0.6 * crackP
          mesh.scale.setScalar(frag.scale * crackP)
          ;(mesh.material as THREE.MeshStandardMaterial).opacity = crackP * 0.8
        })
      } else if (p < 0.35) {
        // THE BANG
        const bangP = (p - 0.25) / 0.10
        eggMat.opacity = 0
        innerGlowMat.opacity = Math.max(0, 0.3 * (1 - bangP))
        innerGlow.scale.setScalar(2 + bangP * 12)

        // Fragments fly outward
        fragGroup.visible = true
        fragments.forEach((frag, i) => {
          const mesh = fragMeshes[i]
          const dist = 3.5 + bangP * 15
          mesh.position.copy(frag.dir).multiplyScalar(dist)
          mesh.rotation.x += 0.03 * frag.rotSpeed
          mesh.scale.setScalar(frag.scale * Math.max(0, 1 - bangP * 1.5))
          ;(mesh.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 0.8 * (1 - bangP))
        })

        // Particles explode
        instMesh.visible = true
        particles.forEach((pt, i) => {
          const ease = 1 - Math.pow(1 - bangP, 3)
          dummy.position.set(pt.dx * ease * 14, pt.dy * ease * 14, pt.dz * ease * 14)
          dummy.scale.setScalar(pt.scale * Math.min(1, bangP * 5))
          dummy.updateMatrix()
          instMesh.setMatrixAt(i, dummy.matrix)
        })
        instMesh.instanceMatrix.needsUpdate = true
      } else {
        // Post-bang — particles orbit, fragments gone
        fragGroup.visible = false
        eggMat.opacity = 0
        innerGlowMat.opacity = 0

        instMesh.visible = true
        particles.forEach((pt, i) => {
          if (p < 0.50) {
            // Coalesce into orbits
            const np = (p - 0.35) / 0.15
            const maxD = 14
            const expX = pt.dx * maxD, expY = pt.dy * maxD, expZ = pt.dz * maxD
            const angle = pt.orbitAngle + t * pt.orbitSpeed * np
            const r = pt.orbitRadius
            const orbX = Math.cos(angle) * r
            const orbY = Math.sin(angle) * r * 0.25 + pt.orbitTilt * r * 0.15
            const orbZ = Math.sin(angle + pt.orbitTilt) * r * 0.4
            dummy.position.set(
              THREE.MathUtils.lerp(expX, orbX, np),
              THREE.MathUtils.lerp(expY, orbY, np),
              THREE.MathUtils.lerp(expZ, orbZ, np)
            )
            dummy.scale.setScalar(pt.scale)
          } else {
            // Stable orbits, slowly fade as stars take over
            const angle = pt.orbitAngle + t * pt.orbitSpeed
            const r = pt.orbitRadius
            dummy.position.set(
              Math.cos(angle) * r,
              Math.sin(angle) * r * 0.25 + pt.orbitTilt * r * 0.15,
              Math.sin(angle + pt.orbitTilt) * r * 0.4
            )
            const fade = p > 0.75 ? Math.max(0.1, 1 - (p - 0.75) / 0.25) : 1
            dummy.scale.setScalar(pt.scale * fade)
          }
          dummy.updateMatrix()
          instMesh.setMatrixAt(i, dummy.matrix)
        })
        instMesh.instanceMatrix.needsUpdate = true
      }

      // ── Star systems — progressive evolution ──
      const activePositions: THREE.Vector3[] = []

      STAR_SYSTEMS.forEach((sys, si) => {
        const obj = starObjs[si]
        const vis = Math.max(0, Math.min(1, (p - sys.activateAt) / 0.08))

        if (vis > 0) {
          // Star appears with a "birth" pulse
          const birthPulse = vis < 0.5 ? 1 + (1 - vis * 2) * 0.5 : 1
          const breathe = 1 + Math.sin(t * 2.5 + si) * 0.05
          const s = sys.size * vis * birthPulse * breathe
          obj.mesh.scale.setScalar(s)
          ;(obj.mesh.material as THREE.MeshBasicMaterial).opacity = vis

          obj.light.intensity = vis * 4
          activePositions.push(sys.position)

          // Orbit rings
          let planetIdx = 0
          sys.orbits.forEach((orbit, oi) => {
            const ringVis = Math.max(0, Math.min(1, (p - sys.activateAt - 0.04) / 0.06))
            ;(obj.rings[oi].material as THREE.MeshBasicMaterial).opacity = ringVis * 0.3

            // Planets
            orbit.planets.forEach((_, pi) => {
              const pVis = Math.max(0, Math.min(1, (p - sys.activateAt - 0.06 - pi * 0.015) / 0.05))
              const pmesh = obj.planets[planetIdx]
              const angle = obj.planetAngles[planetIdx] + t * orbit.speed
              pmesh.position.set(
                sys.position.x + Math.cos(angle) * orbit.radius,
                sys.position.y + Math.sin(angle) * orbit.tilt * orbit.radius * 0.4,
                sys.position.z + Math.sin(angle) * orbit.radius
              )
              ;(pmesh.material as THREE.MeshStandardMaterial).opacity = pVis
              pmesh.scale.setScalar(pVis * (1 + Math.sin(t * 3 + pi) * 0.1))
              planetIdx++
            })
          })
        } else {
          ;(obj.mesh.material as THREE.MeshBasicMaterial).opacity = 0
          obj.light.intensity = 0
          obj.rings.forEach(r => { (r.material as THREE.MeshBasicMaterial).opacity = 0 })
          obj.planets.forEach(pl => { (pl.material as THREE.MeshStandardMaterial).opacity = 0 })
        }
      })

      // ── Connection lines between active stars ──
      if (activePositions.length >= 2) {
        const pts: number[] = []
        for (let i = 0; i < activePositions.length; i++) {
          for (let j = i + 1; j < activePositions.length; j++) {
            pts.push(activePositions[i].x, activePositions[i].y, activePositions[i].z)
            pts.push(activePositions[j].x, activePositions[j].y, activePositions[j].z)
          }
        }
        connLineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3))
        connLineMat.opacity = 0.08
      } else {
        connLineMat.opacity = 0
      }
    }

    // ── Camera ──
    let camTarget: THREE.Vector3
    if (!activated || ap < 1) {
      // Pre-activation — static
      camTarget = new THREE.Vector3(0, 0, 5)
    } else if (p < 0.15) {
      camTarget = new THREE.Vector3(0, 0, 5)
    } else if (p < 0.25) {
      // Pull back slightly during cracks, add shake
      const shake = (p - 0.15) / 0.10
      camTarget = new THREE.Vector3(
        Math.sin(t * 18) * shake * 0.05,
        Math.cos(t * 14) * shake * 0.04,
        5 + shake * 1.5
      )
    } else if (p < 0.35) {
      // Bang — pull back dramatically
      const ep = (p - 0.25) / 0.10
      camTarget = new THREE.Vector3(0, ep * 1.5, 6.5 + ep * 8)
    } else if (p < 0.50) {
      // 1-star system — focus on center
      const sp = (p - 0.35) / 0.15
      camTarget = new THREE.Vector3(sp * 0.5, 2 + sp * 1, 14 + sp * 2)
    } else if (p < 0.65) {
      // 2-star — pan to see both
      const sp = (p - 0.50) / 0.15
      camTarget = new THREE.Vector3(-sp * 1, 3 + sp * 1, 16 + sp * 3)
    } else if (p < 0.80) {
      // 3-star — wide shot to see all
      const sp = (p - 0.65) / 0.15
      camTarget = new THREE.Vector3(sp * 0.5, 4.5 + sp * 1, 20 + sp * 4)
    } else {
      // Full universe
      camTarget = new THREE.Vector3(0, 6, 26)
    }
    camera.position.lerp(camTarget, 0.04)
    camera.lookAt(0, 0, 0)

    renderer.render(scene, camera)
  }

  animate()

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onResize)

  return {
    setProgress(p: number) { progress = p },
    activate() { activated = true },
    isActivated() { return activated && activationProgress >= 1 },
    dispose() {
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    },
  }
}

// ─── Main Component ────────────────────────────────
export default function BigBangJourney() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<ReturnType<typeof buildScene> | null>(null)
  const [phase, setPhase] = useState<'idle' | 'activating' | 'journey'>('idle')
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
      const t2 = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - t2, 3)
      setStatValues({
        brands: Math.floor(targets.brands * ease),
        roas: Math.round(targets.roas * ease * 10) / 10,
        revenue: Math.round(targets.revenue * ease * 10) / 10,
        referral: Math.floor(targets.referral * ease),
      })
      if (t2 < 1) requestAnimationFrame(tick)
    }
    tick()
  }, [])

  // Init Three.js
  useEffect(() => {
    if (!canvasRef.current) return
    sceneRef.current = buildScene(canvasRef.current)
    // Set dark phase on load
    document.documentElement.setAttribute('data-bg-phase', 'dark')
    return () => { sceneRef.current?.dispose() }
  }, [])

  // Handle click to activate
  const handleActivate = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('activating')
    sceneRef.current?.activate()

    // After activation animation completes (~2s), enable scrolling
    setTimeout(() => {
      setPhase('journey')
    }, 2200)
  }, [phase])

  // ScrollTrigger (only after journey phase)
  useEffect(() => {
    if (phase !== 'journey') return
    const container = containerRef.current
    if (!container) return

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        sceneRef.current?.setProgress(self.progress)

        // Stage text
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

        if (self.progress > 0.82) {
          setShowStats(true)
          animateStats()
        }
      },
    })

    return () => st.kill()
  }, [phase, animateStats])

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: phase === 'journey' ? '900vh' : '100vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Three.js canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* ── IDLE STATE: "Click to begin" ── */}
        {phase === 'idle' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
            <button
              onClick={handleActivate}
              className="group flex flex-col items-center gap-6 cursor-pointer focus:outline-none"
            >
              {/* Pulsing ring */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center
                  group-hover:border-cyan-400/30 transition-all duration-700">
                  <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center
                    group-hover:border-cyan-400/20 transition-all duration-700">
                    <div className="w-3 h-3 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 
                      transition-all duration-500 animate-pulse" />
                  </div>
                </div>
                {/* Outer pulse ring */}
                <div className="absolute inset-0 w-24 h-24 rounded-full border border-cyan-400/10 animate-ping" 
                  style={{ animationDuration: '3s' }} />
              </div>
              <span className="text-[11px] tracking-[0.35em] uppercase text-white/30 font-mono
                group-hover:text-white/60 transition-colors duration-500">
                Click to begin your journey
              </span>
            </button>
          </div>
        )}

        {/* ── ACTIVATING: color bleed happening ── */}
        {phase === 'activating' && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/20 font-mono animate-pulse">
              Awakening...
            </span>
          </div>
        )}

        {/* ── JOURNEY: text stages ── */}
        {phase === 'journey' && STAGES[activeStage]?.title && (
          <div
            className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-20 max-w-lg pointer-events-none"
            style={{ opacity: stageOpacity, transition: 'opacity 0.4s ease' }}
          >
            <div className="space-y-4">
              {activeStage >= 4 && activeStage <= 6 && (
                <p className="text-[10px] tracking-[0.4em] uppercase font-mono text-cyan-400/60">
                  Evolution {activeStage - 3} of 3
                </p>
              )}
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                {STAGES[activeStage].title}
              </h2>
              {STAGES[activeStage].subtitle && (
                <p className="text-base md:text-lg leading-relaxed text-white/40">
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
        {phase === 'journey' && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-none">
            {STAGES.filter((s) => s.title).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  i + 1 <= activeStage ? 'bg-cyan-400' : 'bg-white/15'
                }`}
              />
            ))}
          </div>
        )}

        {/* Scroll hint after journey starts */}
        {phase === 'journey' && activeStage === 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/25 font-mono">
              Scroll to explore
            </span>
            <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-cyan-400/60 animate-bounce" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
