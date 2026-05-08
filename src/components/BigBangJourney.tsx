'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════════════════════════════
 * NFLOW COSMIC JOURNEY V8 — Guaranteed-Visible Materials
 * 
 * Key difference: ALL objects use MeshBasicMaterial (no custom 
 * shaders for meshes) ensuring they render on every GPU.
 * Custom shaders ONLY for particle Points (proven working).
 * 
 * SEQUENCE:
 *   IDLE   → Dark space, subtle stars, "Click to begin" CTA
 *   CLICK  → Color energy bleeds from center, cosmic egg forms
 *   0.00–0.15 → Egg pulses, energy builds, bloom intensifies
 *   0.15–0.30 → Cracks: shell fragments emerge, light escapes
 *   0.30–0.45 → THE BANG: explosion, particles fly, bloom flash
 *   0.45–0.60 → Nebula settles, Star 1 (PPC/cyan) ignites
 *   0.60–0.75 → Star 2 (Social/magenta) born, binary orbit
 *   0.75–0.90 → Star 3 (Organic/green) emerges, triple system
 *   0.90–1.00 → Full universe, stats, camera pulls wide
 * ═══════════════════════════════════════════════════════════════ */

const COLORS = {
  bg: 0x020208,
  cyan: 0x00D4FF,
  magenta: 0xFF2D87,
  green: 0x00E676,
  gold: 0xFFD700,
  warm: 0xffc06f,
  white: 0xffffff,
}

// ─── Particle shader (proven working from V7 starfield) ───
const particleVert = `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aAlpha;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vColor = aColor;
    vAlpha = aAlpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`
const particleFrag = `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, dist) * vAlpha;
    gl_FragColor = vec4(vColor * 1.5, alpha);
  }
`

// ═══════════════════════════════════════════════════
// Helper: create a glow sprite (bright billboard quad)
// ═══════════════════════════════════════════════════
function createGlowSprite(color: number, size: number): THREE.Sprite {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!
  const c = new THREE.Color(color)
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
  gradient.addColorStop(0, `rgba(${Math.floor(c.r*255)},${Math.floor(c.g*255)},${Math.floor(c.b*255)},1)`)
  gradient.addColorStop(0.3, `rgba(${Math.floor(c.r*255)},${Math.floor(c.g*255)},${Math.floor(c.b*255)},0.6)`)
  gradient.addColorStop(0.7, `rgba(${Math.floor(c.r*255)},${Math.floor(c.g*255)},${Math.floor(c.b*255)},0.15)`)
  gradient.addColorStop(1, `rgba(0,0,0,0)`)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 256, 256)
  const tex = new THREE.CanvasTexture(canvas)
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(size, size, 1)
  return sprite
}

// ═══════════════════════════════════════════════════
// Scene Builder
// ═══════════════════════════════════════════════════
function buildScene(canvas: HTMLCanvasElement) {
  const W = window.innerWidth
  const H = window.innerHeight

  // ── Renderer ──
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(W, H)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  renderer.setClearColor(COLORS.bg, 1)

  // ── Scene + Camera ──
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
  camera.position.set(0, 0, 12)

  // ── Post-Processing ──
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(W, H), 1.0, 0.4, 0.2)
  composer.addPass(bloomPass)
  composer.addPass(new OutputPass())

  // ══════════════════════════════════════════════════
  // STARFIELD — 1500 points (proven working)
  // ══════════════════════════════════════════════════
  const STAR_N = 1500
  const sPos = new Float32Array(STAR_N * 3)
  const sSize = new Float32Array(STAR_N)
  const sColor = new Float32Array(STAR_N * 3)
  const sAlpha = new Float32Array(STAR_N)
  const sPhase = new Float32Array(STAR_N) // for twinkling

  for (let i = 0; i < STAR_N; i++) {
    sPos[i*3]   = (Math.random() - 0.5) * 200
    sPos[i*3+1] = (Math.random() - 0.5) * 200
    sPos[i*3+2] = -10 - Math.random() * 100
    sSize[i] = 0.3 + Math.random() * 1.2
    sAlpha[i] = 0.3 + Math.random() * 0.5
    const t = 0.8 + Math.random() * 0.2
    sColor[i*3] = t; sColor[i*3+1] = t; sColor[i*3+2] = 0.9 + Math.random() * 0.1
    sPhase[i] = Math.random() * Math.PI * 2
  }

  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3))
  starGeo.setAttribute('aSize', new THREE.BufferAttribute(sSize, 1))
  starGeo.setAttribute('aColor', new THREE.BufferAttribute(sColor, 3))
  starGeo.setAttribute('aAlpha', new THREE.BufferAttribute(sAlpha, 1))

  const starMat = new THREE.ShaderMaterial({
    vertexShader: particleVert, fragmentShader: particleFrag,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  })
  const starField = new THREE.Points(starGeo, starMat)
  scene.add(starField)

  // ══════════════════════════════════════════════════
  // COSMIC EGG — MeshBasicMaterial (guaranteed visible)
  // ══════════════════════════════════════════════════
  // Outer shell: translucent sphere
  const eggShellGeo = new THREE.SphereGeometry(2.5, 64, 64)
  const eggShellMat = new THREE.MeshBasicMaterial({
    color: 0x88ccdd,
    transparent: true,
    opacity: 0,
    side: THREE.FrontSide,
  })
  const eggShell = new THREE.Mesh(eggShellGeo, eggShellMat)
  scene.add(eggShell)

  // Inner core: bright glowing sphere
  const eggCoreGeo = new THREE.SphereGeometry(1.2, 32, 32)
  const eggCoreMat = new THREE.MeshBasicMaterial({
    color: COLORS.cyan,
    transparent: true,
    opacity: 0,
  })
  const eggCore = new THREE.Mesh(eggCoreGeo, eggCoreMat)
  scene.add(eggCore)

  // Glow sprite behind egg
  const eggGlow = createGlowSprite(COLORS.cyan, 12)
  eggGlow.material.opacity = 0
  scene.add(eggGlow)

  // Point light from egg
  const eggLight = new THREE.PointLight(COLORS.cyan, 0, 40)
  scene.add(eggLight)

  // ══════════════════════════════════════════════════
  // SHELL FRAGMENTS — visible shards
  // ══════════════════════════════════════════════════
  const FRAG_N = 30
  const fragGroup = new THREE.Group()
  fragGroup.visible = false
  const fragData: { dir: THREE.Vector3; rot: THREE.Vector3; speed: number }[] = []

  for (let i = 0; i < FRAG_N; i++) {
    const w = 0.3 + Math.random() * 0.6
    const h = 0.2 + Math.random() * 0.5
    const geo = new THREE.PlaneGeometry(w, h)
    const mat = new THREE.MeshBasicMaterial({
      color: 0xaaddee,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(geo, mat)
    fragGroup.add(mesh)

    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    fragData.push({
      dir: new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      ),
      rot: new THREE.Vector3(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2),
      speed: 1 + Math.random() * 3,
    })
  }
  scene.add(fragGroup)

  // ══════════════════════════════════════════════════
  // EXPLOSION PARTICLES — 4000 bright points
  // ══════════════════════════════════════════════════
  const PART_N = 4000
  const pPos = new Float32Array(PART_N * 3)
  const pSize = new Float32Array(PART_N)
  const pColor = new Float32Array(PART_N * 3)
  const pAlpha = new Float32Array(PART_N)
  const pVel: THREE.Vector3[] = []
  const pOrbit: { r: number; a: number; sp: number; tilt: number; y: number }[] = []

  const palette = [
    new THREE.Color(COLORS.cyan),
    new THREE.Color(COLORS.magenta),
    new THREE.Color(COLORS.green),
    new THREE.Color(COLORS.gold),
    new THREE.Color(COLORS.white),
  ]

  for (let i = 0; i < PART_N; i++) {
    pPos[i*3] = pPos[i*3+1] = pPos[i*3+2] = 0
    pSize[i] = 0.5 + Math.random() * 3.0
    pAlpha[i] = 0
    const c = palette[Math.floor(Math.random() * palette.length)]
    pColor[i*3] = c.r; pColor[i*3+1] = c.g; pColor[i*3+2] = c.b

    const th = Math.random() * Math.PI * 2
    const ph = Math.acos(2 * Math.random() - 1)
    const sp = 0.5 + Math.random() * 4
    pVel.push(new THREE.Vector3(
      Math.sin(ph) * Math.cos(th) * sp,
      Math.sin(ph) * Math.sin(th) * sp,
      Math.cos(ph) * sp
    ))
    pOrbit.push({
      r: 3 + Math.random() * 12,
      a: Math.random() * Math.PI * 2,
      sp: 0.01 + Math.random() * 0.06,
      tilt: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 3,
    })
  }

  const partGeo = new THREE.BufferGeometry()
  partGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
  partGeo.setAttribute('aSize', new THREE.BufferAttribute(pSize, 1))
  partGeo.setAttribute('aColor', new THREE.BufferAttribute(pColor, 3))
  partGeo.setAttribute('aAlpha', new THREE.BufferAttribute(pAlpha, 1))

  const partMat = new THREE.ShaderMaterial({
    vertexShader: particleVert, fragmentShader: particleFrag,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  })
  const particles = new THREE.Points(partGeo, partMat)
  particles.visible = false
  scene.add(particles)

  // ══════════════════════════════════════════════════
  // STAR SYSTEMS (3 stars with glow + orbiting planets)
  // ══════════════════════════════════════════════════
  interface StarSys {
    core: THREE.Mesh
    glow: THREE.Sprite
    light: THREE.PointLight
    rings: THREE.Line[]
    planets: THREE.Mesh[]
    planetGlows: THREE.Sprite[]
    planetOrbits: { r: number; sp: number; a: number; tilt: number }[]
    pos: THREE.Vector3
    color: number
    activateAt: number
    label: string
  }

  const STAR_CFG = [
    { pos: [0, 0, 0], color: COLORS.cyan, coreSize: 0.8, glowSize: 8, activate: 0.45, label: 'Precision Performance',
      orbits: [{ r: 5, count: 3, speed: 0.12, tilt: 0.1, pColor: COLORS.cyan }] },
    { pos: [-7, 2.5, -3], color: COLORS.magenta, coreSize: 0.65, glowSize: 7, activate: 0.60, label: 'Social Engine',
      orbits: [{ r: 4.5, count: 3, speed: 0.10, tilt: -0.15, pColor: COLORS.magenta }] },
    { pos: [6, -2, -4], color: COLORS.green, coreSize: 0.55, glowSize: 6, activate: 0.75, label: 'Organic & Design',
      orbits: [
        { r: 3.5, count: 2, speed: 0.08, tilt: 0.2, pColor: COLORS.green },
        { r: 6, count: 3, speed: 0.06, tilt: -0.1, pColor: COLORS.gold },
      ] },
  ]

  const starSystems: StarSys[] = STAR_CFG.map(cfg => {
    const pos = new THREE.Vector3(cfg.pos[0], cfg.pos[1], cfg.pos[2])

    // Core: bright solid sphere
    const coreGeo = new THREE.SphereGeometry(cfg.coreSize, 32, 32)
    const coreMat = new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0 })
    const core = new THREE.Mesh(coreGeo, coreMat)
    core.position.copy(pos)
    scene.add(core)

    // Glow sprite
    const glow = createGlowSprite(cfg.color, cfg.glowSize)
    glow.position.copy(pos)
    glow.material.opacity = 0
    scene.add(glow)

    // Light
    const light = new THREE.PointLight(cfg.color, 0, 30)
    light.position.copy(pos)
    scene.add(light)

    // Orbit rings + planets
    const rings: THREE.Line[] = []
    const planets: THREE.Mesh[] = []
    const planetGlows: THREE.Sprite[] = []
    const planetOrbits: { r: number; sp: number; a: number; tilt: number }[] = []

    cfg.orbits.forEach(orb => {
      // Ring
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 96; i++) {
        const a = (i / 96) * Math.PI * 2
        pts.push(new THREE.Vector3(Math.cos(a) * orb.r, 0, Math.sin(a) * orb.r))
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(pts)
      const ringMat = new THREE.LineBasicMaterial({ color: orb.pColor, transparent: true, opacity: 0 })
      const ring = new THREE.Line(ringGeo, ringMat)
      ring.position.copy(pos)
      ring.rotation.x = Math.PI / 2 + orb.tilt
      scene.add(ring)
      rings.push(ring)

      // Planets
      for (let pi = 0; pi < orb.count; pi++) {
        const plGeo = new THREE.SphereGeometry(0.2, 16, 16)
        const plMat = new THREE.MeshBasicMaterial({ color: orb.pColor, transparent: true, opacity: 0 })
        const pl = new THREE.Mesh(plGeo, plMat)
        scene.add(pl)
        planets.push(pl)

        const plGlow = createGlowSprite(orb.pColor, 1.2)
        plGlow.material.opacity = 0
        scene.add(plGlow)
        planetGlows.push(plGlow)

        planetOrbits.push({
          r: orb.r,
          sp: orb.speed * (0.8 + Math.random() * 0.4),
          a: (pi / orb.count) * Math.PI * 2 + Math.random() * 0.5,
          tilt: orb.tilt,
        })
      }
    })

    return { core, glow, light, rings, planets, planetGlows, planetOrbits, pos, color: cfg.color, activateAt: cfg.activate, label: cfg.label }
  })

  // ── Connection energy beams between stars ──
  const beamMat = new THREE.LineBasicMaterial({ color: COLORS.cyan, transparent: true, opacity: 0, blending: THREE.AdditiveBlending })
  const beamGeo = new THREE.BufferGeometry()
  const beams = new THREE.LineSegments(beamGeo, beamMat)
  scene.add(beams)

  // ══════════════════════════════════════════════════
  // ANIMATION STATE
  // ══════════════════════════════════════════════════
  let progress = 0
  let activated = false
  let activationT = 0  // 0 to 1, driven by time
  let elapsedTime = 0
  let lastTime = performance.now()

  // ══════════════════════════════════════════════════
  // RENDER LOOP
  // ══════════════════════════════════════════════════
  let animId = 0
  function animate() {
    animId = requestAnimationFrame(animate)
    const now = performance.now()
    const dt = Math.min((now - lastTime) / 1000, 0.05)
    lastTime = now
    elapsedTime += dt
    const t = elapsedTime
    const p = progress

    // ── Activation animation ──
    if (activated && activationT < 1) {
      activationT = Math.min(1, activationT + dt * 0.4) // ~2.5s
    }
    const ap = activationT
    const eAp = 1 - Math.pow(1 - ap, 3) // ease out cubic

    // ── Twinkling stars ──
    const sAlphaAttr = starGeo.attributes.aAlpha as THREE.BufferAttribute
    for (let i = 0; i < STAR_N; i++) {
      const twinkle = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(t * (1.5 + sPhase[i] * 0.5) + sPhase[i] * 10))
      sAlphaAttr.setX(i, twinkle * sAlpha[i])
    }
    sAlphaAttr.needsUpdate = true

    // ══════════════════════════════════
    // PHASE: ACTIVATION (click → egg forms)
    // ══════════════════════════════════
    if (activated && ap < 1) {
      // Bloom flash
      bloomPass.strength = 1.0 + eAp * 3.0
      renderer.toneMappingExposure = 1.2 + eAp * 1.0

      // Egg shell fades in
      eggShellMat.opacity = eAp * 0.35
      eggShell.scale.setScalar(eAp * 1.0)

      // Core brightens
      eggCoreMat.opacity = eAp * 0.9
      eggCore.scale.setScalar(eAp * 1.0)

      // Glow expands
      eggGlow.material.opacity = eAp * 0.8
      eggGlow.scale.setScalar(eAp * 12)

      // Light
      eggLight.intensity = eAp * 10
    }

    // ══════════════════════════════════
    // PHASE: SCROLL JOURNEY
    // ══════════════════════════════════
    if (activated && ap >= 1) {
      if (p < 0.15) {
        // ── EGG ENERGY BUILDING ──
        const ep = p / 0.15 // 0→1
        const pulse = 0.8 + 0.2 * Math.sin(t * (3 + ep * 5))

        eggShellMat.opacity = 0.25 + ep * 0.15
        eggShellMat.color.setHSL(0.52 - ep * 0.02, 0.4 + ep * 0.3, 0.6 + ep * 0.2)
        eggShell.scale.setScalar(pulse)

        eggCoreMat.opacity = 0.8 + ep * 0.2
        eggCoreMat.color.lerpColors(new THREE.Color(COLORS.cyan), new THREE.Color(COLORS.white), ep * 0.5)
        eggCore.scale.setScalar(0.8 + ep * 0.5 + Math.sin(t * 4) * 0.05 * ep)

        eggGlow.material.opacity = 0.6 + ep * 0.4
        eggGlow.scale.setScalar(10 + ep * 6)

        eggLight.intensity = 8 + ep * 12

        bloomPass.strength = 1.5 + ep * 1.5
        renderer.toneMappingExposure = 1.5 + ep * 0.5

      } else if (p < 0.30) {
        // ── CRACKING ──
        const cp = (p - 0.15) / 0.15 // 0→1
        const shake = Math.sin(t * 30) * cp * 0.06

        // Egg distorts and cracks
        eggShellMat.opacity = 0.4 * (1 - cp * 0.5)
        eggShellMat.color.setHSL(0.5, 0.7, 0.7 + cp * 0.3) // brightens
        eggShell.scale.setScalar(1 + cp * 0.3 + shake)

        // Core gets VERY bright
        eggCoreMat.opacity = 1.0
        eggCoreMat.color.set(0xffffff)
        eggCore.scale.setScalar(1.3 + cp * 1.5)

        eggGlow.material.opacity = 1.0
        eggGlow.scale.setScalar(16 + cp * 10)

        eggLight.intensity = 20 + cp * 30

        // Shell fragments fly out
        fragGroup.visible = true
        for (let i = 0; i < FRAG_N; i++) {
          const mesh = fragGroup.children[i] as THREE.Mesh
          const fd = fragData[i]
          const dist = 2.5 + cp * 6
          mesh.position.copy(fd.dir).multiplyScalar(dist)
          mesh.rotation.set(fd.rot.x * t, fd.rot.y * t, fd.rot.z * t)
          ;(mesh.material as THREE.MeshBasicMaterial).opacity = cp * 0.8
          ;(mesh.material as THREE.MeshBasicMaterial).color.setHSL(0.5, 0.5, 0.7 + cp * 0.3)
        }

        bloomPass.strength = 3.0 + cp * 3.0
        renderer.toneMappingExposure = 2.0 + cp * 1.5

        // Camera shake
        camera.position.x = shake
        camera.position.y = shake * 0.7

      } else if (p < 0.45) {
        // ── THE BANG ──
        const bp = (p - 0.30) / 0.15 // 0→1
        const eBp = 1 - Math.pow(1 - bp, 2)

        // Egg dissolves in flash
        const eggFade = Math.max(0, 1 - bp * 4)
        eggShellMat.opacity = 0.2 * eggFade
        eggShell.scale.setScalar(1.3 + bp * 8)
        eggCoreMat.opacity = eggFade
        eggCore.scale.setScalar(2.8 + bp * 15)
        eggGlow.material.opacity = Math.max(0, 1 - bp * 2)
        eggGlow.scale.setScalar(26 + bp * 40)
        eggLight.intensity = Math.max(0, 50 * (1 - bp * 1.5))

        // Fragments fly far
        fragGroup.visible = bp < 0.6
        for (let i = 0; i < FRAG_N; i++) {
          const mesh = fragGroup.children[i] as THREE.Mesh
          const fd = fragData[i]
          mesh.position.copy(fd.dir).multiplyScalar(8.5 + eBp * 40)
          mesh.rotation.set(fd.rot.x * t, fd.rot.y * t, fd.rot.z * t)
          ;(mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.8 - bp * 1.5)
        }

        // EXPLOSION PARTICLES
        particles.visible = true
        const posAttr = partGeo.attributes.position as THREE.BufferAttribute
        const alphaAttr = partGeo.attributes.aAlpha as THREE.BufferAttribute
        for (let i = 0; i < PART_N; i++) {
          const v = pVel[i]
          posAttr.setXYZ(i, v.x * eBp * 25, v.y * eBp * 25, v.z * eBp * 25)
          alphaAttr.setX(i, Math.min(1, bp * 5) * (0.3 + Math.random() * 0.7))
        }
        posAttr.needsUpdate = true
        alphaAttr.needsUpdate = true

        // Massive bloom flash then settle
        bloomPass.strength = Math.max(1.5, 6.0 - bp * 4.5)
        renderer.toneMappingExposure = Math.max(1.2, 3.5 - bp * 2.3)

        camera.position.x = 0
        camera.position.y = 0

      } else {
        // ── POST-BANG: nebula settles, stars emerge ──
        eggShellMat.opacity = 0
        eggCoreMat.opacity = 0
        eggGlow.material.opacity = 0
        eggLight.intensity = 0
        fragGroup.visible = false

        bloomPass.strength = 1.5
        renderer.toneMappingExposure = 1.2

        // Particles transition from explosion to orbiting nebula
        particles.visible = true
        const posAttr = partGeo.attributes.position as THREE.BufferAttribute
        const alphaAttr = partGeo.attributes.aAlpha as THREE.BufferAttribute
        const settleP = Math.min(1, (p - 0.45) / 0.12)

        for (let i = 0; i < PART_N; i++) {
          const v = pVel[i]
          const o = pOrbit[i]
          // Exploded position
          const ex = v.x * 25, ey = v.y * 25, ez = v.z * 25
          // Orbit position
          const angle = o.a + t * o.sp
          const ox = Math.cos(angle) * o.r
          const oy = o.y + Math.sin(angle) * o.r * o.tilt
          const oz = Math.sin(angle) * o.r
          // Lerp
          posAttr.setXYZ(i,
            ex + (ox - ex) * settleP,
            ey + (oy - ey) * settleP,
            ez + (oz - ez) * settleP
          )
          const fade = p > 0.85 ? Math.max(0.03, 1 - (p - 0.85) / 0.15) : 1
          alphaAttr.setX(i, (0.1 + Math.random() * 0.2) * fade)
        }
        posAttr.needsUpdate = true
        alphaAttr.needsUpdate = true

        // ── Star systems ──
        const activePos: THREE.Vector3[] = []

        starSystems.forEach(sys => {
          const vis = Math.max(0, Math.min(1, (p - sys.activateAt) / 0.05))

          if (vis > 0) {
            const breathe = 1 + Math.sin(t * 2.5) * 0.1
            ;(sys.core.material as THREE.MeshBasicMaterial).opacity = vis
            sys.core.scale.setScalar(breathe * vis)
            sys.glow.material.opacity = vis * 0.9
            sys.glow.scale.setScalar(vis * (sys.glow.scale.x > 0 ? 1 : 0.01))
            sys.light.intensity = vis * 12

            activePos.push(sys.pos)

            // Rings
            sys.rings.forEach(ring => {
              ;(ring.material as THREE.LineBasicMaterial).opacity = vis * 0.3
            })

            // Planets orbit
            sys.planets.forEach((pl, pi) => {
              const po = sys.planetOrbits[pi]
              const pVis = Math.max(0, Math.min(1, (p - sys.activateAt - 0.02 - pi * 0.008) / 0.03))
              ;(pl.material as THREE.MeshBasicMaterial).opacity = pVis

              const angle = po.a + t * po.sp
              const cTilt = Math.cos(po.tilt), sTilt = Math.sin(po.tilt)
              const lx = Math.cos(angle) * po.r
              const lz = Math.sin(angle) * po.r
              pl.position.set(
                sys.pos.x + lx,
                sys.pos.y + lz * sTilt,
                sys.pos.z + lz * cTilt
              )

              // Planet glow follows
              const pg = sys.planetGlows[pi]
              pg.position.copy(pl.position)
              pg.material.opacity = pVis * 0.7
            })
          } else {
            ;(sys.core.material as THREE.MeshBasicMaterial).opacity = 0
            sys.glow.material.opacity = 0
            sys.light.intensity = 0
            sys.rings.forEach(r => { (r.material as THREE.LineBasicMaterial).opacity = 0 })
            sys.planets.forEach(pl => { (pl.material as THREE.MeshBasicMaterial).opacity = 0 })
            sys.planetGlows.forEach(pg => { pg.material.opacity = 0 })
          }
        })

        // Energy beams between active stars
        if (activePos.length >= 2) {
          const pts: number[] = []
          for (let i = 0; i < activePos.length; i++) {
            for (let j = i + 1; j < activePos.length; j++) {
              pts.push(activePos[i].x, activePos[i].y, activePos[i].z)
              pts.push(activePos[j].x, activePos[j].y, activePos[j].z)
            }
          }
          beamGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3))
          beamMat.opacity = 0.08
        } else {
          beamMat.opacity = 0
        }
      }
    }

    // ── Camera ──
    let cx = 0, cy = 0, cz = 12
    if (!activated || ap < 1) {
      cx = 0; cy = 0; cz = 12
    } else if (p < 0.15) {
      cz = 10 // close on egg
    } else if (p < 0.30) {
      cz = 10 + ((p - 0.15) / 0.15) * 4 // pull back during crack
    } else if (p < 0.45) {
      const bp = (p - 0.30) / 0.15
      cy = bp * 3
      cz = 14 + bp * 16 // dramatic pullback
    } else if (p < 0.60) {
      const sp = (p - 0.45) / 0.15
      cx = sp * 1; cy = 3 + sp * 2; cz = 22 + sp * 4
    } else if (p < 0.75) {
      const sp = (p - 0.60) / 0.15
      cx = 1 - sp * 3; cy = 5 + sp * 2; cz = 26 + sp * 5
    } else if (p < 0.90) {
      const sp = (p - 0.75) / 0.15
      cx = -2 + sp * 3; cy = 7 + sp * 2; cz = 31 + sp * 6
    } else {
      cx = 1; cy = 10; cz = 40
    }
    camera.position.lerp(new THREE.Vector3(cx, cy, cz), 0.08)
    camera.lookAt(0, 0, 0)

    // ── Render ──
    composer.render()
  }
  animate()

  // ── Resize ──
  function onResize() {
    const w = window.innerWidth, h = window.innerHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
    composer.setSize(w, h)
  }
  window.addEventListener('resize', onResize)

  return {
    setProgress(p: number) { progress = p },
    activate() { activated = true },
    isActivated() { return activated && activationT >= 1 },
    dispose() {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animId)
      renderer.dispose()
    },
  }
}

// ═══════════════════════════════════════════════════
// TEXT STAGES
// ═══════════════════════════════════════════════════
const STAGES = [
  { title: '', subtitle: '', range: [0, 0.05] },
  { title: 'Energy builds.', subtitle: 'Something immense is taking shape.', range: [0.05, 0.15] },
  { title: 'The limits shatter.', subtitle: '', range: [0.15, 0.30] },
  { title: 'The Bang.', subtitle: 'Your universe is born.', range: [0.30, 0.45] },
  { title: 'Precision ignites.', subtitle: 'Google Ads · Amazon Ads · Bing Ads', range: [0.45, 0.60], evo: 1 },
  { title: 'Social amplifies.', subtitle: 'Meta · Pinterest · TikTok — gravity pulls audiences in.', range: [0.60, 0.75], evo: 2 },
  { title: 'Organic compounds.', subtitle: 'SEO + Design build lasting mass and authority.', range: [0.75, 0.90], evo: 3 },
  { title: 'Your universe, built.', subtitle: '138+ brands built theirs. This is how empires grow.', range: [0.90, 1.0] },
]

// ═══════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════
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
    const duration = 2000, start = Date.now()
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

  useEffect(() => {
    if (!canvasRef.current) return
    sceneRef.current = buildScene(canvasRef.current)
    document.documentElement.setAttribute('data-bg-phase', 'dark')
    return () => { sceneRef.current?.dispose() }
  }, [])

  const handleActivate = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('activating')
    sceneRef.current?.activate()
    setTimeout(() => setPhase('journey'), 3000)
  }, [phase])

  useEffect(() => {
    if (phase !== 'journey') return
    const container = containerRef.current
    if (!container) return

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        sceneRef.current?.setProgress(self.progress)

        for (let i = STAGES.length - 1; i >= 0; i--) {
          if (self.progress >= STAGES[i].range[0]) {
            setActiveStage(prev => {
              if (prev !== i) {
                setStageOpacity(0)
                setTimeout(() => setStageOpacity(1), 150)
              }
              return i
            })
            break
          }
        }

        if (self.progress > 0.92) {
          setShowStats(true)
          animateStats()
        }
      },
    })

    return () => st.kill()
  }, [phase, animateStats])

  const stageData = STAGES[activeStage] as typeof STAGES[number] & { evo?: number }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: phase === 'journey' ? '800vh' : '100vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* IDLE STATE */}
        {phase === 'idle' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
            <button
              onClick={handleActivate}
              className="group flex flex-col items-center gap-6 cursor-pointer focus:outline-none"
            >
              <div className="relative">
                <div className="w-28 h-28 rounded-full border border-white/10 flex items-center justify-center
                  group-hover:border-cyan-400/40 transition-all duration-700">
                  <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center
                    group-hover:border-cyan-400/25 transition-all duration-700">
                    <div className="w-4 h-4 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 
                      transition-all duration-500 animate-pulse shadow-[0_0_20px_rgba(0,212,255,0.4)]" />
                  </div>
                </div>
                <div className="absolute inset-0 w-28 h-28 rounded-full border border-cyan-400/10 animate-ping" 
                  style={{ animationDuration: '3s' }} />
              </div>
              <span className="text-[11px] tracking-[0.35em] uppercase text-white/25 font-mono
                group-hover:text-white/50 transition-colors duration-500">
                Click to begin your journey
              </span>
            </button>
          </div>
        )}

        {/* ACTIVATING */}
        {phase === 'activating' && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-mono animate-pulse">
              Awakening...
            </span>
          </div>
        )}

        {/* JOURNEY TEXT */}
        {phase === 'journey' && stageData?.title && (
          <div
            className="absolute left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 z-20 max-w-lg pointer-events-none"
            style={{ opacity: stageOpacity, transition: 'opacity 0.3s ease' }}
          >
            <div className="space-y-4">
              {stageData.evo && (
                <p className="text-[10px] tracking-[0.4em] uppercase font-mono text-cyan-400/60">
                  Evolution {stageData.evo} of 3
                </p>
              )}
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white
                drop-shadow-[0_0_40px_rgba(0,212,255,0.15)]">
                {stageData.title}
              </h2>
              {stageData.subtitle && (
                <p className="text-base md:text-lg leading-relaxed text-white/40">
                  {stageData.subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* STATS */}
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
                <div className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_0_20px_rgba(0,212,255,0.2)]">
                  {stat.value}
                </div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* PROGRESS DOTS */}
        {phase === 'journey' && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-none">
            {STAGES.filter(s => s.title).map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                i + 1 <= activeStage ? 'bg-cyan-400 shadow-[0_0_6px_rgba(0,212,255,0.5)]' : 'bg-white/15'
              }`} />
            ))}
          </div>
        )}

        {/* SCROLL HINT */}
        {phase === 'journey' && activeStage === 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/20 font-mono">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-cyan-400/60 animate-bounce" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
