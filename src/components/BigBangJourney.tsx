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
 * NFLOW COSMIC JOURNEY — V7 (Cinematic Three.js + Post-Processing)
 * 
 * Inspired by hatom.com's approach: 
 *   Bloom post-processing, custom shader materials, rich particle
 *   systems, dramatic camera moves, scroll-driven narrative.
 *
 * SEQUENCE:
 *   LOAD → Dark space. Twinkling stars. "Click to begin" CTA.
 *   CLICK → Color energy bleeds from center. Cosmic egg forms with glow.
 *   SCROLL 0.00–0.15 → Egg pulses with internal energy. Bloom intensifies.
 *   SCROLL 0.15–0.30 → Cracks appear as shell fragments. Light escapes.
 *   SCROLL 0.30–0.45 → THE BANG. Massive particle explosion + bloom flash.
 *   SCROLL 0.45–0.60 → Nebula settles. Star 1 ignites (PPC — cyan).
 *   SCROLL 0.60–0.75 → Star 2 born (Social — magenta). Binary system.
 *   SCROLL 0.75–0.90 → Star 3 emerges (Organic — green). Triple system.
 *   SCROLL 0.90–1.00 → Full universe. Stats. Camera pulls wide.
 * ═══════════════════════════════════════════════════════════════ */

// ─── Color Palette ─────────────────────────────────
const COLORS = {
  bg: 0x020208,
  cyan: 0x00D4FF,
  magenta: 0xFF2D87,
  green: 0x00E676,
  gold: 0xFFD700,
  warm: 0xffc06f,
  eggShell: 0xc8dce8,
  white: 0xffffff,
}

// ─── Shader: Cosmic Egg (fresnel + inner glow + displacement) ───
const eggVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uDisplacement;
  
  // Simplex noise approximation
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    float noise = snoise(position * 3.0 + uTime * 0.5) * uDisplacement;
    vec3 newPosition = position + normal * noise;
    
    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const eggFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uEnergy;
  uniform vec3 uGlowColor;
  uniform vec3 uShellColor;
  
  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);
    
    // Animated inner glow
    float pulse = 0.5 + 0.5 * sin(uTime * 2.0 + vUv.y * 6.0);
    vec3 innerGlow = uGlowColor * fresnel * (1.0 + uEnergy * 2.0) * (0.5 + pulse * 0.5);
    
    // Shell surface
    vec3 shell = uShellColor * (0.15 + fresnel * 0.3);
    
    // Mix based on energy
    vec3 color = mix(shell, innerGlow, uEnergy * 0.7 + fresnel * 0.3);
    
    // Add bright rim
    float rim = pow(fresnel, 1.5);
    color += vec3(1.0, 0.95, 0.8) * rim * uEnergy * 1.5;
    
    float alpha = 0.3 + fresnel * 0.7;
    gl_FragColor = vec4(color, alpha);
  }
`

// ─── Shader: Star glow (volumetric-style) ──────────
const starGlowVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const starGlowFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  uniform vec3 uColor;
  uniform float uIntensity;
  
  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 3.0);
    vec3 glow = uColor * fresnel * uIntensity;
    float alpha = fresnel * 0.8;
    gl_FragColor = vec4(glow, alpha);
  }
`

// ─── Shader: Nebula particles ──────────────────────
const nebulaVertexShader = `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aAlpha;
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    vColor = aColor;
    vAlpha = aAlpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (200.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const nebulaFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
    gl_FragColor = vec4(vColor, alpha);
  }
`

// ═══════════════════════════════════════════════════
// Scene Builder
// ═══════════════════════════════════════════════════
function buildScene(canvas: HTMLCanvasElement) {
  const W = window.innerWidth
  const H = window.innerHeight
  const DPR = Math.min(window.devicePixelRatio, 2)

  // ── Renderer ──
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(DPR)
  renderer.setSize(W, H)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0

  // ── Scene ──
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(COLORS.bg)

  // ── Camera ──
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 500)
  camera.position.set(0, 0, 8)

  // ── Post-Processing (like hatom: bloom + output) ──
  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(W, H),
    1.3,   // strength (hatom uses 1.3)
    0.5,   // radius (hatom uses 0.5)
    0.15   // threshold (hatom uses 0.15)
  )
  composer.addPass(bloomPass)

  const outputPass = new OutputPass()
  composer.addPass(outputPass)

  // ── Ambient light ──
  scene.add(new THREE.AmbientLight(0xffffff, 0.08))

  // ══════════════════════════════════════════════════
  // STAR FIELD (2500 twinkling points)
  // ══════════════════════════════════════════════════
  const STAR_COUNT = 2000
  const starPositions = new Float32Array(STAR_COUNT * 3)
  const starSizes = new Float32Array(STAR_COUNT)
  const starAlphas = new Float32Array(STAR_COUNT)
  const starColors = new Float32Array(STAR_COUNT * 3)
  const starPhases = new Float32Array(STAR_COUNT)

  for (let i = 0; i < STAR_COUNT; i++) {
    // Push stars far back so they're small and subtle
    starPositions[i * 3] = (Math.random() - 0.5) * 400
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 400
    starPositions[i * 3 + 2] = -30 - Math.random() * 200
    starSizes[i] = 0.2 + Math.random() * 0.6  // Much smaller — subtle pinpoints
    starAlphas[i] = 0.2 + Math.random() * 0.4  // Dimmer
    const temp = 0.8 + Math.random() * 0.2
    starColors[i * 3] = temp
    starColors[i * 3 + 1] = temp
    starColors[i * 3 + 2] = 0.9 + Math.random() * 0.1
    starPhases[i] = Math.random() * Math.PI * 2
  }

  const starGeo = new THREE.BufferGeometry()
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  starGeo.setAttribute('aSize', new THREE.BufferAttribute(starSizes, 1))
  starGeo.setAttribute('aColor', new THREE.BufferAttribute(starColors, 3))
  starGeo.setAttribute('aAlpha', new THREE.BufferAttribute(starAlphas, 1))

  const starMaterial = new THREE.ShaderMaterial({
    vertexShader: nebulaVertexShader,
    fragmentShader: nebulaFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const starField = new THREE.Points(starGeo, starMaterial)
  scene.add(starField)

  // ══════════════════════════════════════════════════
  // COSMIC EGG (custom shader material)
  // ══════════════════════════════════════════════════
  const eggGeo = new THREE.SphereGeometry(3.5, 128, 128)  // Much larger egg
  const eggMat = new THREE.ShaderMaterial({
    vertexShader: eggVertexShader,
    fragmentShader: eggFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uEnergy: { value: 0 },
      uDisplacement: { value: 0 },
      uGlowColor: { value: new THREE.Color(COLORS.cyan) },
      uShellColor: { value: new THREE.Color(COLORS.eggShell) },
    },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  })
  const eggMesh = new THREE.Mesh(eggGeo, eggMat)
  eggMesh.visible = false
  scene.add(eggMesh)

  // Egg inner core (solid bright glow)
  const coreGeo = new THREE.SphereGeometry(1.8, 32, 32)
  const coreMat = new THREE.MeshBasicMaterial({
    color: COLORS.cyan,
    transparent: true,
    opacity: 0,
  })
  const coreMesh = new THREE.Mesh(coreGeo, coreMat)
  scene.add(coreMesh)

  // Egg outer glow halo
  const haloGeo = new THREE.SphereGeometry(6.0, 32, 32)
  const haloMat = new THREE.ShaderMaterial({
    vertexShader: starGlowVertexShader,
    fragmentShader: starGlowFragmentShader,
    uniforms: {
      uColor: { value: new THREE.Color(COLORS.cyan) },
      uIntensity: { value: 0 },
    },
    transparent: true,
    side: THREE.BackSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const haloMesh = new THREE.Mesh(haloGeo, haloMat)
  scene.add(haloMesh)

  // Egg point light
  const eggLight = new THREE.PointLight(COLORS.cyan, 0, 30)
  scene.add(eggLight)

  // ══════════════════════════════════════════════════
  // SHELL FRAGMENTS (shaped shards, not boxes)
  // ══════════════════════════════════════════════════
  const FRAG_COUNT = 40
  const fragGroup = new THREE.Group()
  const fragData: { dir: THREE.Vector3; rotAxis: THREE.Vector3; speed: number }[] = []

  for (let i = 0; i < FRAG_COUNT; i++) {
    // Create shard-like geometry — big enough to see
    const w = 0.4 + Math.random() * 0.8
    const h = 0.3 + Math.random() * 0.6
    const d = 0.05 + Math.random() * 0.1
    const geo = new THREE.BoxGeometry(w, h, d)
    // Skew vertices to make shard-like shapes
    const posAttr = geo.attributes.position
    for (let j = 0; j < posAttr.count; j++) {
      const x = posAttr.getX(j)
      const y = posAttr.getY(j)
      posAttr.setX(j, x + y * (Math.random() - 0.5) * 0.3)
    }
    posAttr.needsUpdate = true

    const mat = new THREE.MeshStandardMaterial({
      color: COLORS.eggShell,
      emissive: COLORS.cyan,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0,
      roughness: 0.4,
      metalness: 0.1,
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
      rotAxis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
      speed: 0.5 + Math.random() * 2,
    })
  }
  fragGroup.visible = false
  scene.add(fragGroup)

  // ══════════════════════════════════════════════════
  // EXPLOSION PARTICLES (5000 for dramatic impact)
  // ══════════════════════════════════════════════════
  const PARTICLE_COUNT = 5000
  const pPositions = new Float32Array(PARTICLE_COUNT * 3)
  const pSizes = new Float32Array(PARTICLE_COUNT)
  const pColors = new Float32Array(PARTICLE_COUNT * 3)
  const pAlphas = new Float32Array(PARTICLE_COUNT)
  const pVelocities: THREE.Vector3[] = []
  const pOrbitData: { radius: number; angle: number; speed: number; tilt: number; yOff: number }[] = []

  const palette = [
    new THREE.Color(COLORS.cyan),
    new THREE.Color(COLORS.magenta),
    new THREE.Color(COLORS.green),
    new THREE.Color(COLORS.gold),
    new THREE.Color(COLORS.warm),
    new THREE.Color(COLORS.white),
  ]

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    pPositions[i * 3] = 0
    pPositions[i * 3 + 1] = 0
    pPositions[i * 3 + 2] = 0
    pSizes[i] = 0.8 + Math.random() * 4.0  // Much larger particles
    pAlphas[i] = 0

    const c = palette[Math.floor(Math.random() * palette.length)]
    const brightness = 0.7 + Math.random() * 0.3
    pColors[i * 3] = c.r * brightness
    pColors[i * 3 + 1] = c.g * brightness
    pColors[i * 3 + 2] = c.b * brightness

    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const speed = 0.5 + Math.random() * 3.0
    pVelocities.push(new THREE.Vector3(
      Math.sin(phi) * Math.cos(theta) * speed,
      Math.sin(phi) * Math.sin(theta) * speed,
      Math.cos(phi) * speed,
    ))
    pOrbitData.push({
      radius: 2 + Math.random() * 10,
      angle: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.08,
      tilt: (Math.random() - 0.5) * 0.6,
      yOff: (Math.random() - 0.5) * 2,
    })
  }

  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
  pGeo.setAttribute('aSize', new THREE.BufferAttribute(pSizes, 1))
  pGeo.setAttribute('aColor', new THREE.BufferAttribute(pColors, 3))
  pGeo.setAttribute('aAlpha', new THREE.BufferAttribute(pAlphas, 1))

  const pMat = new THREE.ShaderMaterial({
    vertexShader: nebulaVertexShader,
    fragmentShader: nebulaFragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const particleSystem = new THREE.Points(pGeo, pMat)
  particleSystem.visible = false
  scene.add(particleSystem)

  // ══════════════════════════════════════════════════
  // STAR SYSTEMS (3 evolving stars with glow + orbits)
  // ══════════════════════════════════════════════════
  interface StarSystem {
    core: THREE.Mesh
    glow: THREE.Mesh
    light: THREE.PointLight
    orbitRings: THREE.Line[]
    planets: THREE.Mesh[]
    planetData: { orbitR: number; speed: number; angle: number; tilt: number }[]
    position: THREE.Vector3
    color: THREE.Color
    activateAt: number
    label: string
  }

  const STAR_CONFIGS = [
    { pos: [0, 0, 0], color: COLORS.cyan, size: 1.5, activate: 0.45, label: 'Precision Performance',
      orbits: [{ r: 6, speed: 0.15, count: 3, tilt: 0.1, planetColor: COLORS.cyan }] },
    { pos: [-8, 3, -3], color: COLORS.magenta, size: 1.2, activate: 0.60, label: 'Social Engine',
      orbits: [{ r: 5, speed: 0.12, count: 3, tilt: -0.15, planetColor: COLORS.magenta }] },
    { pos: [7, -2, -4], color: COLORS.green, size: 1.0, activate: 0.75, label: 'Organic & Design',
      orbits: [
        { r: 4.5, speed: 0.10, count: 2, tilt: 0.2, planetColor: COLORS.green },
        { r: 7, speed: 0.07, count: 3, tilt: -0.1, planetColor: COLORS.gold },
      ] },
  ]

  const starSystems: StarSystem[] = STAR_CONFIGS.map((cfg) => {
    const pos = new THREE.Vector3(cfg.pos[0], cfg.pos[1], cfg.pos[2])
    const color = new THREE.Color(cfg.color)

    // Core sphere with emissive
    const coreGeoS = new THREE.SphereGeometry(cfg.size, 32, 32)
    const coreMatS = new THREE.MeshBasicMaterial({
      color: cfg.color,
      transparent: true,
      opacity: 0,
    })
    const coreMeshS = new THREE.Mesh(coreGeoS, coreMatS)
    coreMeshS.position.copy(pos)
    scene.add(coreMeshS)

    // Glow sphere (larger, additive)
    const glowGeoS = new THREE.SphereGeometry(cfg.size * 6, 32, 32)
    const glowMatS = new THREE.ShaderMaterial({
      vertexShader: starGlowVertexShader,
      fragmentShader: starGlowFragmentShader,
      uniforms: {
        uColor: { value: color.clone() },
        uIntensity: { value: 0 },
      },
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const glowMeshS = new THREE.Mesh(glowGeoS, glowMatS)
    glowMeshS.position.copy(pos)
    scene.add(glowMeshS)

    // Point light
    const lightS = new THREE.PointLight(cfg.color, 0, 30)
    lightS.position.copy(pos)
    scene.add(lightS)

    // Orbit rings + planets
    const orbitRings: THREE.Line[] = []
    const planets: THREE.Mesh[] = []
    const planetData: { orbitR: number; speed: number; angle: number; tilt: number }[] = []

    cfg.orbits.forEach((orbit) => {
      // Orbit ring (circle)
      const ringPts: THREE.Vector3[] = []
      for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2
        ringPts.push(new THREE.Vector3(Math.cos(a) * orbit.r, 0, Math.sin(a) * orbit.r))
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts)
      const ringMat = new THREE.LineBasicMaterial({
        color: orbit.planetColor,
        transparent: true,
        opacity: 0,
      })
      const ring = new THREE.Line(ringGeo, ringMat)
      ring.position.copy(pos)
      ring.rotation.x = Math.PI / 2 + orbit.tilt
      scene.add(ring)
      orbitRings.push(ring)

      // Planets
      for (let pi = 0; pi < orbit.count; pi++) {
        const plGeo = new THREE.SphereGeometry(0.35, 16, 16)
        const plMat = new THREE.MeshBasicMaterial({
          color: orbit.planetColor,
          transparent: true,
          opacity: 0,
        })
        const pl = new THREE.Mesh(plGeo, plMat)
        scene.add(pl)
        planets.push(pl)
        planetData.push({
          orbitR: orbit.r,
          speed: orbit.speed * (0.8 + Math.random() * 0.4),
          angle: (pi / orbit.count) * Math.PI * 2,
          tilt: orbit.tilt,
        })

        // Planet glow
        const plGlowGeo = new THREE.SphereGeometry(0.8, 8, 8)
        const plGlowMat = new THREE.ShaderMaterial({
          vertexShader: starGlowVertexShader,
          fragmentShader: starGlowFragmentShader,
          uniforms: {
            uColor: { value: new THREE.Color(orbit.planetColor) },
            uIntensity: { value: 0 },
          },
          transparent: true,
          side: THREE.BackSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
        const plGlow = new THREE.Mesh(plGlowGeo, plGlowMat)
        scene.add(plGlow)
        // Store reference on planet for updates
        ;(pl as any)._glow = plGlow
        ;(pl as any)._glowMat = plGlowMat
      }
    })

    return { core: coreMeshS, glow: glowMeshS, light: lightS, orbitRings, planets, planetData, position: pos, color, activateAt: cfg.activate, label: cfg.label }
  })

  // ── Connection lines between stars ──
  const connGeo = new THREE.BufferGeometry()
  const connMat = new THREE.LineBasicMaterial({
    color: COLORS.cyan,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
  })
  const connLines = new THREE.LineSegments(connGeo, connMat)
  scene.add(connLines)

  // ══════════════════════════════════════════════════
  // STATE
  // ══════════════════════════════════════════════════
  let progress = 0
  let activated = false
  let activationProgress = 0
  const clock = new THREE.Clock()

  // ══════════════════════════════════════════════════
  // ANIMATION LOOP
  // ══════════════════════════════════════════════════
  function animate() {
    requestAnimationFrame(animate)
    const t = clock.getElapsedTime()
    const dt = Math.min(clock.getDelta(), 0.05)
    const p = progress

    // ── Activation ──
    if (activated && activationProgress < 1) {
      activationProgress = Math.min(1, activationProgress + dt * 0.5) // ~2s
    }
    const ap = activationProgress
    const easeAp = 1 - Math.pow(1 - ap, 3)

    // ── Star field twinkling ──
    const sAlphas = starGeo.attributes.aAlpha as THREE.BufferAttribute
    for (let i = 0; i < STAR_COUNT; i++) {
      const twinkle = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * (1 + starPhases[i]) + starPhases[i] * 10))
      sAlphas.setX(i, twinkle * (activated && ap >= 1 && p > 0.3 ? Math.max(0.15, 1 - (p - 0.3) * 0.5) : 1))
    }
    sAlphas.needsUpdate = true

    // ── Color bleed (bloom flash on activation) ──
    if (activated && ap < 1) {
      bloomPass.strength = 1.3 + easeAp * 4.0 // massive bloom surge
      renderer.toneMappingExposure = 1.0 + easeAp * 1.0
      coreMat.opacity = easeAp * 0.9
      coreMesh.scale.setScalar(easeAp * 5)
      coreMat.color.setHSL(0.5, 0.8, 0.5 + easeAp * 0.3)
      eggLight.intensity = easeAp * 15
    }

    // ── Egg (appears during activation, driven by scroll after) ──
    if (activated && ap > 0.3) {
      eggMesh.visible = true
      const eggVis = Math.min(1, (ap - 0.3) / 0.7)

      if (ap >= 1 && p < 0.15) {
        // Idle egg with building energy
        const energy = p / 0.15
        eggMat.uniforms.uTime.value = t
        eggMat.uniforms.uEnergy.value = 0.2 + energy * 0.8
        eggMat.uniforms.uDisplacement.value = 0.02 + energy * 0.06
        eggMesh.scale.setScalar(1.0 + Math.sin(t * (2 + energy * 3)) * 0.03)

        haloMat.uniforms.uIntensity.value = (0.3 + energy * 1.2) * eggVis
        haloMesh.scale.setScalar(1 + energy * 0.5)

        coreMat.opacity = (0.3 + energy * 0.4) * eggVis
        coreMesh.scale.setScalar(0.8 + energy * 0.4)
        eggLight.intensity = (3 + energy * 6) * eggVis

        bloomPass.strength = 1.3 + energy * 1.0
      } else if (ap >= 1 && p >= 0.15 && p < 0.30) {
        // CRACKING
        const crackP = (p - 0.15) / 0.15
        eggMat.uniforms.uTime.value = t
        eggMat.uniforms.uEnergy.value = 1.0
        eggMat.uniforms.uDisplacement.value = 0.08 + crackP * 0.15
        eggMesh.scale.setScalar(1.0 + Math.sin(t * 20) * 0.02 * crackP)
        eggMat.uniforms.uGlowColor.value.setHSL(0.5 + crackP * 0.1, 0.9, 0.5 + crackP * 0.3)

        // Shell opacity decreases, core brightens
        haloMat.uniforms.uIntensity.value = 1.5 + crackP * 2.0
        haloMesh.scale.setScalar(1.5 + crackP * 1.5)
        coreMat.opacity = 0.7 + crackP * 0.3
        coreMesh.scale.setScalar(1.2 + crackP * 1.5)
        eggLight.intensity = 9 + crackP * 15

        // Fragments emerge
        fragGroup.visible = true
        for (let i = 0; i < FRAG_COUNT; i++) {
          const mesh = fragGroup.children[i] as THREE.Mesh
          const fd = fragData[i]
          const dist = 3.5 + crackP * 5.0
          mesh.position.copy(fd.dir).multiplyScalar(dist)
          mesh.quaternion.setFromAxisAngle(fd.rotAxis, t * fd.speed * crackP)
          mesh.scale.setScalar(crackP)
          ;(mesh.material as THREE.MeshStandardMaterial).opacity = crackP * 0.9
          ;(mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.3 + crackP * 1.0
        }

        bloomPass.strength = 2.3 + crackP * 2.0
        renderer.toneMappingExposure = 1.5 + crackP * 1.0
      } else if (ap >= 1 && p >= 0.30 && p < 0.45) {
        // THE BANG
        const bangP = (p - 0.30) / 0.15
        const easeBang = 1 - Math.pow(1 - bangP, 2)

        // Egg dissolves
        eggMesh.visible = bangP < 0.3
        eggMesh.scale.setScalar(1 + bangP * 5)
        coreMat.opacity = Math.max(0, 1 - bangP * 3)
        coreMesh.scale.setScalar(2.7 + bangP * 10)

        // Massive halo flash then fade
        haloMat.uniforms.uIntensity.value = Math.max(0, 3.5 * (1 - bangP * 1.5))
        haloMesh.scale.setScalar(3 + bangP * 20)
        eggLight.intensity = Math.max(0, 24 * (1 - bangP))

        // Bloom flash
        bloomPass.strength = Math.max(1.3, 4.3 - bangP * 3.0)
        renderer.toneMappingExposure = Math.max(1.0, 2.5 - bangP * 1.5)

        // Fragments fly out
        fragGroup.visible = bangP < 0.7
        for (let i = 0; i < FRAG_COUNT; i++) {
          const mesh = fragGroup.children[i] as THREE.Mesh
          const fd = fragData[i]
          const dist = 8.5 + easeBang * 40
          mesh.position.copy(fd.dir).multiplyScalar(dist)
          mesh.quaternion.setFromAxisAngle(fd.rotAxis, t * fd.speed)
          mesh.scale.setScalar(Math.max(0, 1 - bangP * 1.5))
          ;(mesh.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 0.9 - bangP * 1.5)
        }

        // PARTICLES EXPLODE
        particleSystem.visible = true
        const posArr = pGeo.attributes.position as THREE.BufferAttribute
        const alphaArr = pGeo.attributes.aAlpha as THREE.BufferAttribute
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const v = pVelocities[i]
          posArr.setXYZ(i, v.x * easeBang * 30, v.y * easeBang * 30, v.z * easeBang * 30)
          alphaArr.setX(i, Math.min(1, bangP * 4) * (0.3 + Math.random() * 0.7))
        }
        posArr.needsUpdate = true
        alphaArr.needsUpdate = true
      } else if (ap >= 1 && p >= 0.45) {
        // POST-BANG: particles settle into orbits, stars emerge
        eggMesh.visible = false
        fragGroup.visible = false
        coreMat.opacity = 0
        haloMat.uniforms.uIntensity.value = 0

        // Bloom settles
        bloomPass.strength = 1.3
        renderer.toneMappingExposure = 1.0

        // Particles transition from explosion to orbiting
        particleSystem.visible = true
        const posArr = pGeo.attributes.position as THREE.BufferAttribute
        const alphaArr = pGeo.attributes.aAlpha as THREE.BufferAttribute
        const settleP = Math.min(1, (p - 0.45) / 0.15) // 0→1 as particles settle

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const v = pVelocities[i]
          const o = pOrbitData[i]

          // Exploded position
          const expX = v.x * 30, expY = v.y * 30, expZ = v.z * 30

          // Orbit position
          const angle = o.angle + t * o.speed
          const orbX = Math.cos(angle) * o.radius
          const orbY = o.yOff + Math.sin(angle) * o.radius * o.tilt
          const orbZ = Math.sin(angle) * o.radius

          // Lerp
          const lx = expX + (orbX - expX) * settleP
          const ly = expY + (orbY - expY) * settleP
          const lz = expZ + (orbZ - expZ) * settleP
          posArr.setXYZ(i, lx, ly, lz)

          // Fade as stars take over
          const fade = p > 0.8 ? Math.max(0.05, 1 - (p - 0.8) / 0.2) : 1
          alphaArr.setX(i, 0.15 + Math.random() * 0.25 * fade)
        }
        posArr.needsUpdate = true
        alphaArr.needsUpdate = true

        // STAR SYSTEMS
        const activePositions: THREE.Vector3[] = []

        starSystems.forEach((sys) => {
          const vis = Math.max(0, Math.min(1, (p - sys.activateAt) / 0.04))

          if (vis > 0) {
            // Star core
            const breathe = 1 + Math.sin(t * 2.5) * 0.08
            ;(sys.core.material as THREE.MeshBasicMaterial).opacity = vis
            sys.core.scale.setScalar(breathe * vis)

            // Star glow
            ;(sys.glow.material as THREE.ShaderMaterial).uniforms.uIntensity.value = vis * 3.0
            sys.glow.scale.setScalar(1 + vis * 0.5)

            // Light
            sys.light.intensity = vis * 15

            activePositions.push(sys.position)

            // Orbits + planets
            sys.orbitRings.forEach((ring) => {
              ;(ring.material as THREE.LineBasicMaterial).opacity = vis * 0.25
            })

            sys.planets.forEach((pl, pi) => {
              const pd = sys.planetData[pi]
              const pVis = Math.max(0, Math.min(1, (p - sys.activateAt - 0.03 - pi * 0.01) / 0.04))
              ;(pl.material as THREE.MeshBasicMaterial).opacity = pVis

              const angle = pd.angle + t * pd.speed
              const cos_tilt = Math.cos(pd.tilt)
              const sin_tilt = Math.sin(pd.tilt)
              const localX = Math.cos(angle) * pd.orbitR
              const localZ = Math.sin(angle) * pd.orbitR
              pl.position.set(
                sys.position.x + localX,
                sys.position.y + localZ * sin_tilt,
                sys.position.z + localZ * cos_tilt,
              )

              // Update planet glow
              const glow = (pl as any)._glow as THREE.Mesh
              const glowMat = (pl as any)._glowMat as THREE.ShaderMaterial
              if (glow && glowMat) {
                glow.position.copy(pl.position)
                glowMat.uniforms.uIntensity.value = pVis * 1.5
              }
            })
          } else {
            ;(sys.core.material as THREE.MeshBasicMaterial).opacity = 0
            ;(sys.glow.material as THREE.ShaderMaterial).uniforms.uIntensity.value = 0
            sys.light.intensity = 0
            sys.orbitRings.forEach((ring) => { (ring.material as THREE.LineBasicMaterial).opacity = 0 })
            sys.planets.forEach((pl) => {
              ;(pl.material as THREE.MeshBasicMaterial).opacity = 0
              const glowMat = (pl as any)._glowMat as THREE.ShaderMaterial
              if (glowMat) glowMat.uniforms.uIntensity.value = 0
            })
          }
        })

        // Connection lines
        if (activePositions.length >= 2) {
          const pts: number[] = []
          for (let i = 0; i < activePositions.length; i++) {
            for (let j = i + 1; j < activePositions.length; j++) {
              pts.push(activePositions[i].x, activePositions[i].y, activePositions[i].z)
              pts.push(activePositions[j].x, activePositions[j].y, activePositions[j].z)
            }
          }
          connGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3))
          connMat.opacity = 0.06
        } else {
          connMat.opacity = 0
        }
      } else if (ap < 1) {
        // During activation — egg fading in
        const eggVis2 = Math.min(1, (ap - 0.3) / 0.7)
        eggMat.uniforms.uTime.value = t
        eggMat.uniforms.uEnergy.value = eggVis2 * 0.2
        eggMat.uniforms.uDisplacement.value = eggVis2 * 0.02
        eggMesh.scale.setScalar(eggVis2)
        haloMat.uniforms.uIntensity.value = eggVis2 * 0.3
      }
    }

    // ── Camera ──
    let camTarget: THREE.Vector3
    if (!activated || ap < 1) {
      camTarget = new THREE.Vector3(0, 0, 12)
    } else if (p < 0.15) {
      // Close on egg — fills screen
      camTarget = new THREE.Vector3(0, 0, 9)
    } else if (p < 0.30) {
      // Slight pullback, camera shake during cracks
      const crackP2 = (p - 0.15) / 0.15
      const shake = Math.sin(t * 25) * crackP2 * 0.15
      camTarget = new THREE.Vector3(shake, shake * 0.7, 9 + crackP2 * 4)
    } else if (p < 0.45) {
      // Bang — dramatic pullback through particle field
      const bangP2 = (p - 0.30) / 0.15
      camTarget = new THREE.Vector3(0, bangP2 * 3, 13 + bangP2 * 18)
    } else if (p < 0.60) {
      // 1-star — looking at first star system
      const sp = (p - 0.45) / 0.15
      camTarget = new THREE.Vector3(sp * 1, 3 + sp * 2, 18 + sp * 5)
    } else if (p < 0.75) {
      // 2-star — wider to include both
      const sp = (p - 0.60) / 0.15
      camTarget = new THREE.Vector3(-sp * 2, 5 + sp * 2, 23 + sp * 5)
    } else if (p < 0.90) {
      // 3-star — full system view
      const sp = (p - 0.75) / 0.15
      camTarget = new THREE.Vector3(sp * 1, 7 + sp * 2, 28 + sp * 7)
    } else {
      // Final panoramic
      camTarget = new THREE.Vector3(0, 10, 40)
    }
    camera.position.lerp(camTarget, 0.12)  // Faster camera response
    camera.lookAt(0, 0, 0)

    // ── Render via composer (bloom) ──
    composer.render()
  }

  animate()

  function onResize() {
    const w = window.innerWidth
    const h = window.innerHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
    composer.setSize(w, h)
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
    setTimeout(() => setPhase('journey'), 2500)
  }, [phase])

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

        for (let i = STAGES.length - 1; i >= 0; i--) {
          if (self.progress >= STAGES[i].range[0]) {
            setActiveStage((prev) => {
              if (prev !== i) {
                setStageOpacity(0)
                setTimeout(() => setStageOpacity(1), 200)
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
      style={{ height: phase === 'journey' ? '1000vh' : '100vh' }}
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
            style={{ opacity: stageOpacity, transition: 'opacity 0.4s ease' }}
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
            {STAGES.filter((s) => s.title).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  i + 1 <= activeStage ? 'bg-cyan-400 shadow-[0_0_6px_rgba(0,212,255,0.5)]' : 'bg-white/15'
                }`}
              />
            ))}
          </div>
        )}

        {/* SCROLL HINT */}
        {phase === 'journey' && activeStage === 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 pointer-events-none">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/20 font-mono">
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
