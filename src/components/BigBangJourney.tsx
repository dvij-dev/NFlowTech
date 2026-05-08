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
 * NFLOW COSMIC JOURNEY — V10.1 "Visible Surface Detail"
 *
 * ROOT CAUSE FIX: Bloom was washing out all surface texture.
 * Now bloom is near-zero; all glow comes from manual sprite layers.
 * Star colors are deeply saturated with high-contrast noise.
 *
 * SEQUENCE (unchanged):
 *   1. LOAD   → Dark space, twinkling stars, "Click to begin"
 *   2. CLICK  → Colors bleed from center, cosmic egg forms
 *   3. SCROLL → Egg cracks → Big Bang → particles explode
 *   4. STAR 1 → PPC star ignites (cyan)
 *   5. STAR 2 → Social star born (magenta/pink)
 *   6. STAR 3 → SEO+Design star emerges (green/gold)
 *   7. REVEAL → Full universe, stats, rest of site
 * ═══════════════════════════════════════════════════════════════ */

const COLORS = {
  bg: 0x020208,
  cyan: 0x00D4FF,
  magenta: 0xFF2D87,
  green: 0x00E676,
  gold: 0xFFD700,
  white: 0xffffff,
}

/* ─── GLSL: 3D Gradient Noise ─── */
const glslNoise3D = `
vec3 hash33(vec3 p){
  p=vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6)));
  return -1.0+2.0*fract(sin(p)*43758.5453123);
}
float noise3d(vec3 p){
  vec3 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);
  return mix(mix(mix(dot(hash33(i),f),
    dot(hash33(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
    mix(dot(hash33(i+vec3(0,1,0)),f-vec3(0,1,0)),
    dot(hash33(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
    mix(mix(dot(hash33(i+vec3(0,0,1)),f-vec3(0,0,1)),
    dot(hash33(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
    mix(dot(hash33(i+vec3(0,1,1)),f-vec3(0,1,1)),
    dot(hash33(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);
}
float fbm(vec3 p){
  float v=0.0,a=0.5;
  for(int i=0;i<5;i++){v+=a*noise3d(p);p*=2.0;a*=0.5;}
  return v;
}
`

/* ─── Star surface shader — HIGH CONTRAST with granulation ─── */
const starVertShader = `
${glslNoise3D}
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vFresnel;
void main(){
  vPosition = position;
  // Surface displacement for bumpy look
  float disp = fbm(position * 3.5 + uTime * 0.1) * 0.08;
  vec3 displaced = position + normal * disp;
  vNormal = normalMatrix * normal;
  vec4 mvPos = modelViewMatrix * vec4(displaced, 1.0);
  vFresnel = abs(dot(normalize(normalMatrix * normal), vec3(0.0, 0.0, 1.0)));
  gl_Position = projectionMatrix * mvPos;
}
`

const starFragShader = `
${glslNoise3D}
uniform float uTime;
uniform vec3 uBaseColor;
uniform vec3 uHotColor;
uniform vec3 uCoolColor;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vFresnel;
void main(){
  float f = vFresnel;
  // === Large-scale convection currents ===
  float turb1 = fbm(vPosition * 3.0 + uTime * 0.12);
  float turb2 = fbm(vPosition * 6.0 - uTime * 0.08);
  float convection = turb1 * 0.55 + turb2 * 0.45;
  // === Fine granulation (cell-like surface pattern) ===
  float grain = fbm(vPosition * 14.0 + uTime * 0.04);
  // === Temperature map: combines fresnel + noise ===
  float temp = convection * 0.5 + f * 0.5;
  temp = clamp(temp, 0.0, 1.0);
  // === Color ramp: cool valleys → warm surface → hot center ===
  vec3 col;
  if(temp < 0.35){
    col = mix(uCoolColor, uBaseColor, temp / 0.35);
  } else if(temp < 0.7){
    col = mix(uBaseColor, uHotColor, (temp - 0.35) / 0.35);
  } else {
    col = mix(uHotColor, uHotColor * 1.3, (temp - 0.7) / 0.3);
  }
  // === Granulation: bright convection cells with dark lanes ===
  float cellBrightness = 0.75 + grain * 0.5;
  col *= cellBrightness;
  // === Bright spots (sunspots in reverse — extra-hot regions) ===
  float hotSpot = max(0.0, fbm(vPosition * 5.0 + uTime * 0.15) - 0.2);
  col += hotSpot * uHotColor * 0.4;
  // === Limb darkening (subtle — keep edges visible) ===
  col *= (0.55 + f * 0.55);
  // === Emissive boost (star is a light source) ===
  col *= 1.4;
  gl_FragColor = vec4(col, 1.0);
}
`

/* ─── Basic particle shader ─── */
const particleVert = `
attribute float aSize;
attribute vec3 aColor;
attribute float aAlpha;
varying vec3 vColor;
varying float vAlpha;
void main(){
  vColor=aColor; vAlpha=aAlpha;
  vec4 mv=modelViewMatrix*vec4(position,1.0);
  gl_PointSize=aSize*(300.0/-mv.z);
  gl_Position=projectionMatrix*mv;
}
`
const particleFrag = `
varying vec3 vColor;
varying float vAlpha;
void main(){
  float d=length(gl_PointCoord-vec2(0.5));
  if(d>0.5)discard;
  float a=smoothstep(0.5,0.05,d)*vAlpha;
  gl_FragColor=vec4(vColor*1.5,a);
}
`

/* ═══════════════════════════════════════════════════
 * Glow texture — soft radial gradient (for inner glow)
 * ═══════════════════════════════════════════════════ */
function createGlowTexture(color: THREE.Color): THREE.CanvasTexture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size; canvas.height = size
  const ctx = canvas.getContext('2d')!
  const cx = size / 2
  const r = Math.floor(color.r * 255), g = Math.floor(color.g * 255), b = Math.floor(color.b * 255)
  const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx)
  grad.addColorStop(0, `rgba(${r},${g},${b},0.6)`)
  grad.addColorStop(0.3, `rgba(${r},${g},${b},0.2)`)
  grad.addColorStop(0.6, `rgba(${r},${g},${b},0.05)`)
  grad.addColorStop(1, `rgba(0,0,0,0)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

/* ═══════════════════════════════════════════════════
 * Corona texture — radial gradient WITH ray streaks
 * ═══════════════════════════════════════════════════ */
function createCoronaTexture(color: THREE.Color, rays: number = 24): THREE.CanvasTexture {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size; canvas.height = size
  const ctx = canvas.getContext('2d')!
  const cx = size / 2

  const r = Math.floor(color.r * 255), g = Math.floor(color.g * 255), b = Math.floor(color.b * 255)

  // Soft base glow
  const grad = ctx.createRadialGradient(cx, cx, size * 0.06, cx, cx, cx)
  grad.addColorStop(0, `rgba(${r},${g},${b},0.35)`)
  grad.addColorStop(0.15, `rgba(${r},${g},${b},0.15)`)
  grad.addColorStop(0.4, `rgba(${r},${g},${b},0.04)`)
  grad.addColorStop(1, `rgba(0,0,0,0)`)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)

  // Ray streaks emanating from center
  ctx.globalCompositeOperation = 'lighter'
  for (let i = 0; i < rays; i++) {
    const angle = (i / rays) * Math.PI * 2 + Math.random() * 0.4
    const length = cx * (0.4 + Math.random() * 0.55)
    const width = 1.0 + Math.random() * 2.5
    const alpha = 0.06 + Math.random() * 0.12
    ctx.save()
    ctx.translate(cx, cx)
    ctx.rotate(angle)
    const rayGrad = ctx.createLinearGradient(size * 0.05, 0, length, 0)
    rayGrad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`)
    rayGrad.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.4})`)
    rayGrad.addColorStop(1, `rgba(${r},${g},${b},0)`)
    ctx.fillStyle = rayGrad
    ctx.fillRect(size * 0.05, -width / 2, length, width)
    ctx.restore()
  }
  return new THREE.CanvasTexture(canvas)
}

/* ═══════════════════════════════════════════════════
 * Solar flare arc generator (particle arcs from surface)
 * ═══════════════════════════════════════════════════ */
function createFlareArcs(
  coreRadius: number,
  color: number,
  parent: THREE.Object3D
): { update: (t: number, opacity: number) => void } {
  const FLARE_COUNT = 5
  const arcs: { line: THREE.Line; phase: number; height: number; baseAngle: number; span: number }[] = []

  for (let f = 0; f < FLARE_COUNT; f++) {
    const baseAngle = Math.random() * Math.PI * 2
    const phase = Math.random() * Math.PI * 2
    const height = coreRadius * (0.25 + Math.random() * 0.5)
    const span = 0.25 + Math.random() * 0.35

    const SEGS = 16
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= SEGS; i++) pts.push(new THREE.Vector3())

    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    const mat = new THREE.LineBasicMaterial({
      color, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, linewidth: 1,
    })
    const line = new THREE.Line(geo, mat)
    parent.add(line)
    arcs.push({ line, phase, height, baseAngle, span })
  }

  return {
    update: (t: number, opacity: number) => {
      arcs.forEach(arc => {
        const pulse = Math.sin(t * 0.4 + arc.phase) * 0.5 + 0.5
        ;(arc.line.material as THREE.LineBasicMaterial).opacity = opacity * pulse * 0.35
        const positions = arc.line.geometry.attributes.position as THREE.BufferAttribute
        const SEGS = positions.count - 1
        const angle = arc.baseAngle + t * 0.015
        for (let i = 0; i <= SEGS; i++) {
          const frac = i / SEGS
          const a = angle - arc.span / 2 + frac * arc.span
          const h = arc.height * 4 * frac * (1 - frac) * (0.7 + pulse * 0.5)
          const r = coreRadius * 1.02 + h
          positions.setXYZ(i,
            Math.cos(a) * r,
            h * 0.8 + Math.sin(a) * r * 0.15,
            Math.sin(a) * r * 0.4
          )
        }
        positions.needsUpdate = true
      })
    },
  }
}

/* ═══════════════════════════════════════════════════
 * STAR SYSTEM — realistic multi-layer sun
 * Layer 1: Core sphere with noise shader (VISIBLE surface detail)
 * Layer 2: Inner glow sprite (soft, colored, replaces bloom)
 * Layer 3: Outer corona sprite with ray streaks
 * Layer 4: Solar flare arcs
 * Layer 5: PointLight
 * ═══════════════════════════════════════════════════ */
interface StarSystem {
  group: THREE.Group
  update: (time: number, visibility: number) => void
}

function createStarSystem(
  pos: THREE.Vector3,
  color: number,
  coreRadius: number,
  glowSize: number,
  coronaSize: number,
  scene: THREE.Scene,
): StarSystem {
  const group = new THREE.Group()
  group.position.copy(pos)

  const baseColor = new THREE.Color(color)
  // Hot color: brighter version but STILL colored (not white)
  const hotColor = new THREE.Color(color).lerp(new THREE.Color(0xffffff), 0.45)
  // Cool color: darker, more saturated
  const coolColor = new THREE.Color(color).multiplyScalar(0.3)

  // === Layer 1: Core sphere with noise shader ===
  const coreGeo = new THREE.SphereGeometry(coreRadius, 64, 64)
  const coreMat = new THREE.ShaderMaterial({
    vertexShader: starVertShader,
    fragmentShader: starFragShader,
    uniforms: {
      uTime: { value: 0 },
      uBaseColor: { value: baseColor },
      uHotColor: { value: hotColor },
      uCoolColor: { value: coolColor },
    },
  })
  const coreMesh = new THREE.Mesh(coreGeo, coreMat)
  coreMesh.visible = false
  group.add(coreMesh)

  // === Layer 2: Inner glow sprite (replaces bloom for the glow effect) ===
  const glowTex = createGlowTexture(hotColor)
  const glowMat = new THREE.SpriteMaterial({
    map: glowTex, transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0,
  })
  const glowSprite = new THREE.Sprite(glowMat)
  glowSprite.scale.set(glowSize, glowSize, 1)
  group.add(glowSprite)

  // === Layer 3: Outer corona with ray streaks ===
  const coronaTex = createCoronaTexture(baseColor, 20 + Math.floor(Math.random() * 12))
  const coronaMat = new THREE.SpriteMaterial({
    map: coronaTex, transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0,
  })
  const coronaSprite = new THREE.Sprite(coronaMat)
  coronaSprite.scale.set(coronaSize, coronaSize, 1)
  group.add(coronaSprite)

  // === Layer 4: Solar flare arcs ===
  const flares = createFlareArcs(coreRadius, color, group)

  // === Layer 5: Point light ===
  const light = new THREE.PointLight(color, 0, 35)
  group.add(light)

  scene.add(group)

  const update = (time: number, visibility: number) => {
    coreMesh.visible = visibility > 0.01

    if (visibility <= 0.01) {
      glowMat.opacity = 0; coronaMat.opacity = 0; light.intensity = 0
      return
    }

    // Shader time
    coreMat.uniforms.uTime.value = time

    // Scale in
    const scale = visibility
    coreMesh.scale.setScalar(scale)

    // Breathing
    const breathe = 1.0 + Math.sin(time * 1.5) * 0.025
    coreMesh.scale.multiplyScalar(breathe)

    // Glow sprite
    glowMat.opacity = visibility * 0.5
    glowSprite.scale.setScalar(glowSize * scale * breathe)

    // Corona with slow rotation
    coronaMat.opacity = visibility * 0.55
    coronaSprite.scale.setScalar(coronaSize * scale)
    coronaSprite.material.rotation = time * 0.012

    // Light
    light.intensity = visibility * 5

    // Flares
    flares.update(time, visibility)
  }

  return { group, update }
}

/* ═══════════════════════════════════════════════════
 * Scene Builder
 * ═══════════════════════════════════════════════════ */
function buildScene(canvas: HTMLCanvasElement) {
  const W = window.innerWidth
  const H = window.innerHeight

  // ── Renderer ──
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setSize(W, H)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0  // FIXED
  renderer.setClearColor(COLORS.bg, 1)

  // ── Scene + Camera ──
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 500)
  camera.position.set(0, 0, 12)

  // ── Bloom: NEAR ZERO — glow comes from sprite layers, not bloom ──
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(W, H), 0.12, 0.3, 0.5)
  composer.addPass(bloomPass)
  composer.addPass(new OutputPass())

  // Ambient light for slight fill
  scene.add(new THREE.AmbientLight(0x111122, 0.3))

  // ══════════════════════════════════════════════════
  // STARFIELD — 2000 twinkling background stars
  // ══════════════════════════════════════════════════
  const STAR_N = 2000
  const sPos = new Float32Array(STAR_N * 3)
  const sSize = new Float32Array(STAR_N)
  const sColor = new Float32Array(STAR_N * 3)
  const sAlpha = new Float32Array(STAR_N)
  const sPhase = new Float32Array(STAR_N)

  for (let i = 0; i < STAR_N; i++) {
    sPos[i * 3] = (Math.random() - 0.5) * 250
    sPos[i * 3 + 1] = (Math.random() - 0.5) * 250
    sPos[i * 3 + 2] = -5 - Math.random() * 120
    sSize[i] = 0.3 + Math.random() * 1.5
    sAlpha[i] = 0.2 + Math.random() * 0.6
    const temp = 0.7 + Math.random() * 0.3
    sColor[i * 3] = temp
    sColor[i * 3 + 1] = temp
    sColor[i * 3 + 2] = 0.85 + Math.random() * 0.15
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
  // COSMIC EGG — energy sphere
  // ══════════════════════════════════════════════════
  const eggBaseColor = new THREE.Color(0x0066aa)
  const eggHotColor = new THREE.Color(0x55ccff)
  const eggCoolColor = new THREE.Color(0x002244)

  const eggCoreGeo = new THREE.SphereGeometry(1.8, 64, 64)
  const eggCoreMat = new THREE.ShaderMaterial({
    vertexShader: starVertShader,
    fragmentShader: starFragShader,
    uniforms: {
      uTime: { value: 0 },
      uBaseColor: { value: eggBaseColor },
      uHotColor: { value: eggHotColor },
      uCoolColor: { value: eggCoolColor },
    },
  })
  const eggCore = new THREE.Mesh(eggCoreGeo, eggCoreMat)
  eggCore.visible = false
  scene.add(eggCore)

  // Egg glow sprite
  const eggGlowTex = createGlowTexture(eggHotColor)
  const eggGlowMat = new THREE.SpriteMaterial({
    map: eggGlowTex, transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0,
  })
  const eggGlow = new THREE.Sprite(eggGlowMat)
  eggGlow.scale.set(8, 8, 1)
  scene.add(eggGlow)

  // Egg corona sprite
  const eggCoronaTex = createCoronaTexture(new THREE.Color(COLORS.cyan), 18)
  const eggCoronaMat = new THREE.SpriteMaterial({
    map: eggCoronaTex, transparent: true,
    blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0,
  })
  const eggCorona = new THREE.Sprite(eggCoronaMat)
  eggCorona.scale.set(12, 12, 1)
  scene.add(eggCorona)

  // Egg point light
  const eggLight = new THREE.PointLight(COLORS.cyan, 0, 25)
  scene.add(eggLight)

  // ══════════════════════════════════════════════════
  // SHELL FRAGMENTS — visible crack shards
  // ══════════════════════════════════════════════════
  const FRAG_N = 50
  const fragGroup = new THREE.Group()
  fragGroup.visible = false
  const fragData: { dir: THREE.Vector3; rot: THREE.Vector3; speed: number }[] = []

  for (let i = 0; i < FRAG_N; i++) {
    const w = 0.2 + Math.random() * 0.5
    const h = 0.15 + Math.random() * 0.35
    const shape = new THREE.Shape()
    // Irregular shard shape
    shape.moveTo(0, 0)
    shape.lineTo(w * (0.3 + Math.random() * 0.7), h * 0.2)
    shape.lineTo(w, h * (0.5 + Math.random() * 0.5))
    shape.lineTo(w * 0.6, h)
    shape.lineTo(0, h * 0.7)
    const geo = new THREE.ShapeGeometry(shape)
    const brightness = 0.5 + Math.random() * 0.5
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0.3 * brightness, 0.7 * brightness, 1.0 * brightness),
      transparent: true, opacity: 0, side: THREE.DoubleSide,
    })
    fragGroup.add(new THREE.Mesh(geo, mat))
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    fragData.push({
      dir: new THREE.Vector3(Math.sin(phi) * Math.cos(theta), Math.sin(phi) * Math.sin(theta), Math.cos(phi)),
      rot: new THREE.Vector3(Math.random() * 5 - 2.5, Math.random() * 5 - 2.5, Math.random() * 5 - 2.5),
      speed: 1.5 + Math.random() * 4,
    })
  }
  scene.add(fragGroup)

  // ══════════════════════════════════════════════════
  // EXPLOSION PARTICLES
  // ══════════════════════════════════════════════════
  const PART_N = 3000
  const pPos = new Float32Array(PART_N * 3)
  const pSize = new Float32Array(PART_N)
  const pColor = new Float32Array(PART_N * 3)
  const pAlpha = new Float32Array(PART_N)
  const pVel: THREE.Vector3[] = []

  const palette = [
    new THREE.Color(COLORS.cyan), new THREE.Color(COLORS.magenta),
    new THREE.Color(COLORS.green), new THREE.Color(COLORS.gold),
    new THREE.Color(0x88aaff),
  ]

  for (let i = 0; i < PART_N; i++) {
    pPos[i * 3] = pPos[i * 3 + 1] = pPos[i * 3 + 2] = 0
    pSize[i] = 0.5 + Math.random() * 2.5
    pAlpha[i] = 0
    const c = palette[Math.floor(Math.random() * palette.length)]
    pColor[i * 3] = c.r; pColor[i * 3 + 1] = c.g; pColor[i * 3 + 2] = c.b
    const th = Math.random() * Math.PI * 2
    const ph = Math.acos(2 * Math.random() - 1)
    const sp = 0.3 + Math.random() * 3
    pVel.push(new THREE.Vector3(Math.sin(ph) * Math.cos(th) * sp, Math.sin(ph) * Math.sin(th) * sp, Math.cos(ph) * sp))
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
  // THREE STAR SYSTEMS — realistic suns with surface detail
  // ══════════════════════════════════════════════════
  const starSystems = [
    { sys: createStarSystem(new THREE.Vector3(0, 0, 0), COLORS.cyan, 1.3, 5, 10, scene), activateAt: 0.45 },
    { sys: createStarSystem(new THREE.Vector3(-9, 3.5, -4), COLORS.magenta, 1.1, 4.5, 8.5, scene), activateAt: 0.60 },
    { sys: createStarSystem(new THREE.Vector3(8, -2, -5), COLORS.green, 1.0, 4, 8, scene), activateAt: 0.75 },
  ]

  // ══════════════════════════════════════════════════
  // NEBULA DUST — subtle orbiting particles
  // ══════════════════════════════════════════════════
  const DUST_N = 800
  const dustPos = new Float32Array(DUST_N * 3)
  const dustSize = new Float32Array(DUST_N)
  const dustColor = new Float32Array(DUST_N * 3)
  const dustAlpha = new Float32Array(DUST_N)
  const dustOrbit: { r: number; a: number; sp: number; y: number }[] = []

  for (let i = 0; i < DUST_N; i++) {
    const r = 4 + Math.random() * 22
    const a = Math.random() * Math.PI * 2
    dustPos[i * 3] = Math.cos(a) * r
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 10
    dustPos[i * 3 + 2] = Math.sin(a) * r - 5
    dustSize[i] = 0.3 + Math.random() * 1.0
    dustAlpha[i] = 0
    const dc = palette[Math.floor(Math.random() * palette.length)]
    dustColor[i * 3] = dc.r; dustColor[i * 3 + 1] = dc.g; dustColor[i * 3 + 2] = dc.b
    dustOrbit.push({ r, a, sp: 0.003 + Math.random() * 0.01, y: (Math.random() - 0.5) * 10 })
  }

  const dustGeo = new THREE.BufferGeometry()
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
  dustGeo.setAttribute('aSize', new THREE.BufferAttribute(dustSize, 1))
  dustGeo.setAttribute('aColor', new THREE.BufferAttribute(dustColor, 3))
  dustGeo.setAttribute('aAlpha', new THREE.BufferAttribute(dustAlpha, 1))
  const dustMat = new THREE.ShaderMaterial({
    vertexShader: particleVert, fragmentShader: particleFrag,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  })
  const dustCloud = new THREE.Points(dustGeo, dustMat)
  dustCloud.visible = false
  scene.add(dustCloud)

  // ══════════════════════════════════════════════════
  // ANIMATION STATE
  // ══════════════════════════════════════════════════
  let progress = 0
  let activated = false
  let activationT = 0
  let elapsedTime = 0
  let lastTime = performance.now()
  let targetCamX = 0, targetCamY = 0, targetCamZ = 12

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

    // ── Twinkling stars ──
    const sAlphaAttr = starGeo.attributes.aAlpha as THREE.BufferAttribute
    for (let i = 0; i < STAR_N; i++) {
      const tw = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * (1.2 + sPhase[i] * 0.4) + sPhase[i] * 8))
      sAlphaAttr.setX(i, tw * sAlpha[i])
    }
    sAlphaAttr.needsUpdate = true

    // ── Activation: egg forms (color bleeds) ──
    if (activated && activationT < 1) {
      activationT = Math.min(1, activationT + dt * 0.35)
      const ap = 1 - Math.pow(1 - activationT, 3)

      eggCore.visible = true
      eggCore.scale.setScalar(ap)
      eggCoreMat.uniforms.uTime.value = t

      eggGlowMat.opacity = ap * 0.4
      eggGlow.scale.setScalar(8 * ap)

      eggCoronaMat.opacity = ap * 0.35
      eggCorona.scale.setScalar(12 * ap)
      eggCorona.material.rotation = t * 0.015

      eggLight.intensity = ap * 3
    }

    // ── Scroll Journey ──
    if (activated && activationT >= 1) {
      eggCoreMat.uniforms.uTime.value = t

      if (p < 0.15) {
        // ── Egg energy building ──
        const ep = p / 0.15
        eggCore.visible = true
        const pulse = 1.0 + Math.sin(t * (2 + ep * 3)) * 0.02
        eggCore.scale.setScalar(pulse * (1.0 + ep * 0.2))
        eggGlowMat.opacity = 0.4 + ep * 0.1
        eggGlow.scale.setScalar(8 * (1.0 + ep * 0.2))
        eggCoronaMat.opacity = 0.35 + ep * 0.15
        eggCorona.scale.setScalar(12 * (1.0 + ep * 0.15))
        eggCorona.material.rotation = t * 0.015
        eggLight.intensity = 3 + ep * 2
        eggCore.position.set(0, 0, 0)

        targetCamX = 0; targetCamY = 0; targetCamZ = 9

      } else if (p < 0.30) {
        // ── Egg cracks, shell breaks ──
        const cp = (p - 0.15) / 0.15
        eggCore.visible = true

        // Vibrate
        const shake = Math.sin(t * 30) * cp * 0.06
        eggCore.position.x = shake
        eggCore.position.y = shake * 0.5

        eggCore.scale.setScalar(1.2 + cp * 0.4)
        eggGlowMat.opacity = (0.5 - cp * 0.3)
        eggCoronaMat.opacity = (0.5 - cp * 0.25)
        eggLight.intensity = 5 + cp * 4

        // Shell fragments burst outward
        fragGroup.visible = true
        for (let i = 0; i < FRAG_N; i++) {
          const mesh = fragGroup.children[i] as THREE.Mesh
          const fd = fragData[i]
          const dist = 1.8 + cp * cp * 10
          mesh.position.copy(fd.dir).multiplyScalar(dist)
          mesh.rotation.set(fd.rot.x * t, fd.rot.y * t, fd.rot.z * t)
          const fragOpacity = cp < 0.2 ? cp * 5 : Math.max(0, 1 - (cp - 0.2) * 1.5)
          ;(mesh.material as THREE.MeshBasicMaterial).opacity = Math.min(0.8, fragOpacity)
        }

        targetCamX = 0; targetCamY = 0; targetCamZ = 9 + cp * 4

      } else if (p < 0.45) {
        // ── THE BANG — explosion ──
        const bp = (p - 0.30) / 0.15
        const eBp = 1 - Math.pow(1 - bp, 2)

        // Egg dissolves
        if (bp > 0.2) {
          eggCore.visible = false
          eggGlowMat.opacity = 0; eggCoronaMat.opacity = 0; eggLight.intensity = 0
          eggCore.position.set(0, 0, 0)
        } else {
          eggCore.visible = true
          const fade = 1 - bp / 0.2
          eggCore.scale.setScalar(1.6 + bp * 8)
          eggGlowMat.opacity = 0.2 * fade; eggCoronaMat.opacity = 0.25 * fade
          eggLight.intensity = 8 * fade
          eggCore.position.set(0, 0, 0)
        }

        // Fragments fly away and fade
        fragGroup.visible = bp < 0.5
        for (let i = 0; i < FRAG_N; i++) {
          const mesh = fragGroup.children[i] as THREE.Mesh
          const fd = fragData[i]
          mesh.position.copy(fd.dir).multiplyScalar(12 + eBp * 30)
          ;(mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.6 - bp * 1.5)
        }

        // EXPLOSION particles
        particles.visible = true
        const posAttr = partGeo.attributes.position as THREE.BufferAttribute
        const alphaAttr = partGeo.attributes.aAlpha as THREE.BufferAttribute
        for (let i = 0; i < PART_N; i++) {
          const v = pVel[i]
          posAttr.setXYZ(i, v.x * eBp * 20, v.y * eBp * 20, v.z * eBp * 20)
          const fadeIn = Math.min(1, bp * 4)
          alphaAttr.setX(i, fadeIn * 0.35 * (0.3 + Math.random() * 0.4))
        }
        posAttr.needsUpdate = true
        alphaAttr.needsUpdate = true

        targetCamX = 0; targetCamY = bp * 2; targetCamZ = 13 + bp * 16

      } else {
        // ── POST-BANG: Stars emerge ──
        eggCore.visible = false
        eggGlowMat.opacity = 0; eggCoronaMat.opacity = 0; eggLight.intensity = 0
        fragGroup.visible = false

        // Explosion fades into nebula dust
        const dustFadeIn = Math.min(1, (p - 0.45) / 0.08)
        const dustFadeOut = p > 0.88 ? Math.max(0, 1 - (p - 0.88) / 0.12) : 1

        particles.visible = dustFadeIn < 1
        if (particles.visible) {
          const alphaAttr = partGeo.attributes.aAlpha as THREE.BufferAttribute
          for (let i = 0; i < PART_N; i++) {
            alphaAttr.setX(i, 0.3 * (1 - dustFadeIn) * 0.25)
          }
          alphaAttr.needsUpdate = true
        }

        // Nebula dust orbits
        dustCloud.visible = true
        const dPosAttr = dustGeo.attributes.position as THREE.BufferAttribute
        const dAlphaAttr = dustGeo.attributes.aAlpha as THREE.BufferAttribute
        for (let i = 0; i < DUST_N; i++) {
          const orb = dustOrbit[i]
          const angle = orb.a + t * orb.sp
          dPosAttr.setXYZ(i, Math.cos(angle) * orb.r, orb.y, Math.sin(angle) * orb.r - 5)
          dAlphaAttr.setX(i, dustFadeIn * dustFadeOut * 0.07)
        }
        dPosAttr.needsUpdate = true
        dAlphaAttr.needsUpdate = true

        // ── Star systems emerge ──
        starSystems.forEach(({ sys, activateAt }) => {
          const vis = Math.max(0, Math.min(1, (p - activateAt) / 0.08))
          sys.update(t, vis)
        })

        // Camera widens as stars appear
        if (p < 0.60) {
          const sp = (p - 0.45) / 0.15
          targetCamX = sp * 1; targetCamY = 2 + sp * 4; targetCamZ = 29 + sp * 8
        } else if (p < 0.75) {
          const sp = (p - 0.60) / 0.15
          targetCamX = 1 - sp * 4; targetCamY = 6 + sp * 3; targetCamZ = 37 + sp * 8
        } else if (p < 0.90) {
          const sp = (p - 0.75) / 0.15
          targetCamX = -3 + sp * 4; targetCamY = 9 + sp * 3; targetCamZ = 45 + sp * 10
        } else {
          targetCamX = 1; targetCamY = 12; targetCamZ = 57
        }
      }
    }

    // ── Smooth camera lerp ──
    camera.position.x += (targetCamX - camera.position.x) * 0.04
    camera.position.y += (targetCamY - camera.position.y) * 0.04
    camera.position.z += (targetCamZ - camera.position.z) * 0.04
    camera.lookAt(0, 0, 0)

    composer.render()
  }
  animate()

  function onResize() {
    const w = window.innerWidth, h = window.innerHeight
    camera.aspect = w / h; camera.updateProjectionMatrix()
    renderer.setSize(w, h); composer.setSize(w, h)
  }
  window.addEventListener('resize', onResize)

  return {
    setProgress(p: number) { progress = p },
    activate() { activated = true },
    isActivated() { return activated && activationT >= 1 },
    dispose() { window.removeEventListener('resize', onResize); cancelAnimationFrame(animId); renderer.dispose() },
  }
}

/* ═══════════════════════════════════════════════════
 * TEXT STAGES — real nflowtech.com content
 * ═══════════════════════════════════════════════════ */
const STAGES: {
  title: string; subtitle: string; detail?: string; range: [number, number]; evo?: number
}[] = [
  { title: '', subtitle: '', range: [0, 0.05] },
  { title: 'Energy builds.', subtitle: 'Creativity, AI, data, and tech converging into something powerful.', range: [0.05, 0.15] },
  { title: 'The shell shatters.', subtitle: 'Old limits break apart.', range: [0.15, 0.30] },
  { title: 'The Big Bang.', subtitle: 'Your digital universe is born.', range: [0.30, 0.45] },
  { title: 'Precision Performance', subtitle: 'Performance-driven ad strategies that generate real leads.', detail: 'Google Ads · Amazon Ads · Bing Ads', range: [0.45, 0.60], evo: 1 },
  { title: 'Social Conversion Engine', subtitle: 'Converting ad spend into real actions across major social platforms.', detail: 'Meta Ads · Pinterest Ads · TikTok Ads', range: [0.60, 0.75], evo: 2 },
  { title: 'Organic Opportunity Lab', subtitle: 'Search visibility, relevant traffic, and consistent organic growth.', detail: 'SEO · Branding · Conversion-Led Design', range: [0.75, 0.90], evo: 3 },
  { title: 'Your Universe, Built.', subtitle: '138+ brands across 27+ industries. Result-driven digital strategy.', range: [0.90, 1.0] },
]

/* ═══════════════════════════════════════════════════
 * COMPONENT
 * ═══════════════════════════════════════════════════ */
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
    const dur = 2000, start = Date.now()
    const targets = { brands: 138, roas: 7.5, revenue: 2.8, referral: 80 }
    const tick = () => {
      const elapsed = Date.now() - start
      const t = Math.min(elapsed / dur, 1)
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
    if (!canvasRef.current) return
    sceneRef.current = buildScene(canvasRef.current)
    return () => { sceneRef.current?.dispose() }
  }, [])

  const handleActivate = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('activating')
    sceneRef.current?.activate()
    setTimeout(() => setPhase('journey'), 3000)
  }, [phase])

  // Auto-start after 5s
  useEffect(() => {
    const timer = setTimeout(() => { if (phase === 'idle') handleActivate() }, 5000)
    return () => clearTimeout(timer)
  }, [phase, handleActivate])

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

        if (self.progress > 0.92) { setShowStats(true); animateStats() }
      },
    })
    return () => st.kill()
  }, [phase, animateStats])

  const stageData = STAGES[activeStage]

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: phase === 'journey' ? '800vh' : '100vh' }}
      role="region"
      aria-label="Interactive 3D brand journey — scroll to explore NFlow's universe"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

        {/* IDLE: Dark space + CTA */}
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
                <p className="text-base md:text-lg leading-relaxed text-white/40">{stageData.subtitle}</p>
              )}
              {stageData.detail && (
                <p className="text-xs md:text-sm font-mono tracking-wider text-cyan-400/40 mt-2">{stageData.detail}</p>
              )}
            </div>
          </div>
        )}

        {/* STATS */}
        {showStats && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-10 md:gap-16 pointer-events-none"
            style={{ animation: 'fadeInUp 1s ease forwards' }}>
            {[
              { value: `${statValues.brands}+`, label: 'Brands Scaled' },
              { value: `${statValues.roas}X`, label: 'Avg ROAS' },
              { value: `₹${statValues.revenue}B+`, label: 'Revenue Driven' },
              { value: `${statValues.referral}%`, label: 'Referral Rate' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_0_20px_rgba(0,212,255,0.2)]">{stat.value}</div>
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
