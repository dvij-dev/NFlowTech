'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════════════════
   CosmicJourney — A premium, camera-driven WebGL hero for NFlow
   
   Techniques inspired by hatom.com analysis:
   - Camera-on-rails: scroll drives camera position along a spline path
   - Mouse parallax: subtle camera rotation offset from pointer
   - Multi-pass bloom: selective glow via separate render targets
   - PBR materials: MeshPhysicalMaterial with transmission/Fresnel
   - Noise-driven displacement: organic, living surface animation
   - Rich lighting: multiple spot/point/directional lights per scene
   - Particle systems: instanced dust + nebula particles
   - LUT-style color grading: post-processing color shifts per phase
   - Lenis-compatible: syncs with external Lenis smooth scroll
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── GLSL Shaders ──────────────────────────────────────────────────────────

const noiseGLSL = `
// Simplex 3D noise
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}

float fbm(vec3 p, float freq, float amp, int octaves) {
  float val = 0.0;
  float f = freq;
  float a = amp;
  for(int i = 0; i < 6; i++) {
    if(i >= octaves) break;
    val += a * snoise(p * f);
    f *= 2.0;
    a *= 0.5;
  }
  return val;
}
`;

// Egg/Orb vertex shader — displacement + Fresnel prep
const orbVertexShader = `
${noiseGLSL}
uniform float uTime;
uniform float uDisplacementIntensity;
uniform float uNoiseSpeed;
uniform float uNoiseScale;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vViewDirection;
varying float vDisplacement;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Noise displacement for organic surface
  float noise = fbm(pos * uNoiseScale + uTime * uNoiseSpeed, 1.0, 1.0, 4);
  float displacement = noise * uDisplacementIntensity;
  pos += normal * displacement;
  vDisplacement = displacement;
  
  vec4 worldPos = modelMatrix * vec4(pos, 1.0);
  vWorldPosition = worldPos.xyz;
  vNormal = normalize(normalMatrix * normal);
  vViewDirection = normalize(cameraPosition - worldPos.xyz);
  
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

// Egg/Orb fragment shader — Fresnel + subsurface + noise color
const orbFragmentShader = `
${noiseGLSL}
uniform float uTime;
uniform vec3 uDiffuseColor;
uniform vec3 uFresnelColor;
uniform float uFresnelPower;
uniform float uFresnelIntensity;
uniform vec3 uGlowColor;
uniform vec3 uGlowColor2;
uniform float uGlowIntensity;
uniform float uPhase;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vViewDirection;
varying float vDisplacement;
varying vec2 vUv;

void main() {
  // Fresnel edge glow
  float fresnel = pow(1.0 - max(dot(vNormal, vViewDirection), 0.0), uFresnelPower);
  fresnel *= uFresnelIntensity;
  
  // Animated noise color variation
  float noiseColor = fbm(vWorldPosition * 2.0 + uTime * 0.3, 1.5, 0.8, 3);
  
  // Subsurface-like scattering
  float backlight = max(dot(vNormal, normalize(vec3(0.0, 0.0, -1.0))), 0.0);
  backlight = pow(backlight, 2.0) * 0.5;
  
  // Base color with noise variation
  vec3 baseColor = uDiffuseColor;
  baseColor = mix(baseColor, uGlowColor2, noiseColor * 0.3 + 0.1);
  
  // Displacement-based color shift
  vec3 displaceColor = mix(baseColor, uGlowColor, smoothstep(-0.1, 0.1, vDisplacement));
  
  // Combine
  vec3 color = displaceColor;
  color += uFresnelColor * fresnel;
  color += uGlowColor * backlight;
  color += uGlowColor * uGlowIntensity * (0.5 + 0.5 * sin(uTime * 1.5));
  
  // Phase-based intensity
  float alpha = smoothstep(0.0, 0.15, uPhase) * (1.0 - smoothstep(0.35, 0.5, uPhase));
  
  gl_FragColor = vec4(color, alpha);
}
`;

// Particle vertex shader
const particleVertexShader = `
attribute float aSize;
attribute float aSpeed;
attribute float aPhase;
attribute vec3 aColor;
uniform float uTime;
uniform float uScrollProgress;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vColor = aColor;
  
  vec3 pos = position;
  float t = uTime * aSpeed + aPhase;
  
  // Orbital motion
  pos.x += sin(t * 0.7 + aPhase) * 0.3;
  pos.y += cos(t * 0.5 + aPhase * 2.0) * 0.2;
  pos.z += sin(t * 0.3 + aPhase * 3.0) * 0.4;
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  
  // Size attenuation
  gl_PointSize = aSize * (80.0 / -mvPosition.z);
  gl_PointSize = clamp(gl_PointSize, 0.5, 6.0);
  
  gl_Position = projectionMatrix * mvPosition;
  
  // Distance fade
  float dist = length(mvPosition.xyz);
  vAlpha = smoothstep(20.0, 5.0, dist) * 0.8;
}
`;

const particleFragmentShader = `
varying vec3 vColor;
varying float vAlpha;

void main() {
  // Soft circle
  vec2 center = gl_PointCoord - 0.5;
  float d = length(center);
  float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
  
  gl_FragColor = vec4(vColor, alpha);
}
`;

// Nebula cloud vertex
const nebulaVertexShader = `
attribute float aOpacity;
attribute float aSize;
attribute float aRotation;
uniform float uTime;
varying float vOpacity;
varying float vRotation;

void main() {
  vOpacity = aOpacity;
  vRotation = aRotation + uTime * 0.05;
  
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * (60.0 / -mvPosition.z);
  gl_PointSize = clamp(gl_PointSize, 1.0, 30.0);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const nebulaFragmentShader = `
varying float vOpacity;
varying float vRotation;
uniform vec3 uColor1;
uniform vec3 uColor2;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  // Rotate UV
  float c = cos(vRotation);
  float s = sin(vRotation);
  uv = vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);
  
  float d = length(uv);
  float alpha = smoothstep(0.5, 0.0, d) * vOpacity;
  
  // Color gradient from center
  vec3 color = mix(uColor1, uColor2, d * 2.0);
  
  gl_FragColor = vec4(color, alpha * 0.12);
}
`;

// Bloom composite shader
const bloomCompositeVert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const bloomCompositeFragment = `
uniform sampler2D tScene;
uniform sampler2D tBloom;
uniform float uBloomStrength;
uniform vec3 uTint;
uniform float uTintStrength;
uniform float uVignetteIntensity;
varying vec2 vUv;

void main() {
  vec4 sceneColor = texture2D(tScene, vUv);
  vec4 bloomColor = texture2D(tBloom, vUv);
  
  // Additive bloom
  vec3 color = sceneColor.rgb + bloomColor.rgb * uBloomStrength;
  
  // Color grading / tint
  color = mix(color, color * uTint, uTintStrength);
  
  // Vignette
  vec2 vigUv = vUv * (1.0 - vUv);
  float vig = vigUv.x * vigUv.y * 15.0;
  vig = pow(vig, uVignetteIntensity);
  color *= vig;
  
  // Tone mapping (ACES-like, gentler)
  color = color / (color + 0.8);
  
  gl_FragColor = vec4(color, 1.0);
}
`;

// ─── Camera Path Definition ────────────────────────────────────────────────

// Define camera path as keyframes: [scrollProgress, position, lookAt, fov]
const CAMERA_KEYFRAMES = [
  // Phase 0: Looking at the cosmic egg from front
  { t: 0.00, pos: [0, 0, 6],    look: [0, 0, 0],    fov: 50 },
  // Slowly orbit around  
  { t: 0.08, pos: [2, 0.5, 5.5], look: [0, 0, 0],   fov: 50 },
  // Dolly closer
  { t: 0.15, pos: [3, 1, 4],    look: [0, 0, 0],     fov: 45 },
  // Phase 1: Egg begins to glow — orbit continues
  { t: 0.20, pos: [4, 0.5, 2],  look: [0, 0, 0],     fov: 40 },
  // Dramatic pull-back as explosion begins  
  { t: 0.30, pos: [2, 2, 5],    look: [0, 0, 0],     fov: 55 },
  // Phase 2: Fly through particle field
  { t: 0.40, pos: [0, 0, 3],    look: [0, 0, -5],    fov: 60 },
  { t: 0.50, pos: [-2, 1, -2],  look: [0, 0, -8],    fov: 55 },
  // Phase 3: Arrive at content reveal — wide establishing
  { t: 0.60, pos: [0, 3, 4],    look: [0, 0, 0],     fov: 50 },
  { t: 0.70, pos: [-3, 2, 3],   look: [0, 0.5, 0],   fov: 45 },
  // Phase 4: Services fly-by
  { t: 0.80, pos: [0, 0.5, 5],  look: [0, 0, 0],     fov: 50 },
  // Phase 5: Final wide shot
  { t: 0.90, pos: [0, -1, 7],   look: [0, 0, 0],     fov: 55 },
  { t: 1.00, pos: [0, 0, 8],    look: [0, 0, 0],     fov: 50 },
];

// ─── Scene Phase Colors / LUT-like Grading ─────────────────────────────────

const PHASE_COLORS = [
  // Phase 0: Deep purple — mysterious
  { tint: [0.6, 0.4, 1.0], bg: 0x0a0612, vignetteIntensity: 0.25 },
  // Phase 1: Cyan/teal — energy awakening
  { tint: [0.4, 0.9, 1.0], bg: 0x060d14, vignetteIntensity: 0.3 },
  // Phase 2: Gold/pink — explosion
  { tint: [1.0, 0.7, 0.5], bg: 0x100808, vignetteIntensity: 0.2 },
  // Phase 3: Clean cool — content
  { tint: [0.7, 0.8, 1.0], bg: 0x080a12, vignetteIntensity: 0.15 },
  // Phase 4: Purple/blue — services
  { tint: [0.5, 0.5, 1.0], bg: 0x08061a, vignetteIntensity: 0.2 },
];

// ─── Helper Functions ──────────────────────────────────────────────────────

function lerpValue(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstepJS(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function interpolateCameraPath(progress: number) {
  const kf = CAMERA_KEYFRAMES;
  
  // Find the two keyframes we're between
  let i = 0;
  for (; i < kf.length - 1; i++) {
    if (progress <= kf[i + 1].t) break;
  }
  if (i >= kf.length - 1) i = kf.length - 2;
  
  const a = kf[i];
  const b = kf[i + 1];
  const localT = (progress - a.t) / (b.t - a.t);
  // Smooth easing
  const t = smoothstepJS(0, 1, localT);
  
  return {
    pos: [
      lerpValue(a.pos[0], b.pos[0], t),
      lerpValue(a.pos[1], b.pos[1], t),
      lerpValue(a.pos[2], b.pos[2], t),
    ] as [number, number, number],
    look: [
      lerpValue(a.look[0], b.look[0], t),
      lerpValue(a.look[1], b.look[1], t),
      lerpValue(a.look[2], b.look[2], t),
    ] as [number, number, number],
    fov: lerpValue(a.fov, b.fov, t),
  };
}

function getPhaseColors(progress: number) {
  const phaseIndex = Math.min(Math.floor(progress * PHASE_COLORS.length), PHASE_COLORS.length - 1);
  const nextIndex = Math.min(phaseIndex + 1, PHASE_COLORS.length - 1);
  const localT = (progress * PHASE_COLORS.length) - phaseIndex;
  const t = smoothstepJS(0, 1, localT);
  
  const a = PHASE_COLORS[phaseIndex];
  const b = PHASE_COLORS[nextIndex];
  
  return {
    tint: [
      lerpValue(a.tint[0], b.tint[0], t),
      lerpValue(a.tint[1], b.tint[1], t),
      lerpValue(a.tint[2], b.tint[2], t),
    ],
    vignetteIntensity: lerpValue(a.vignetteIntensity, b.vignetteIntensity, t),
    bg: new THREE.Color(a.bg).lerp(new THREE.Color(b.bg), t),
  };
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function CosmicJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollProgressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameRef = useRef<number>(0);
  const destroyedRef = useRef(false);

  const init = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const container = containerRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // ─── Renderer ───────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // ─── Scenes ─────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0612, 0.04);

    // Bloom scene (objects that should glow)
    const bloomScene = new THREE.Scene();

    // ─── Camera ─────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    // ─── Render Targets for Multi-Pass Bloom ────────────────────────
    const sceneRT = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
    });

    const bloomRT = new THREE.WebGLRenderTarget(
      Math.floor(width / 2), Math.floor(height / 2),
      { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat }
    );

    const bloomRT2 = new THREE.WebGLRenderTarget(
      Math.floor(width / 4), Math.floor(height / 4),
      { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat }
    );

    // ─── Composite Quad ─────────────────────────────────────────────
    const compositeScene = new THREE.Scene();
    const compositeCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const compositeMaterial = new THREE.ShaderMaterial({
      vertexShader: bloomCompositeVert,
      fragmentShader: bloomCompositeFragment,
      uniforms: {
        tScene: { value: sceneRT.texture },
        tBloom: { value: bloomRT2.texture },
        uBloomStrength: { value: 0.25 },
        uTint: { value: new THREE.Vector3(0.6, 0.4, 1.0) },
        uTintStrength: { value: 0.06 },
        uVignetteIntensity: { value: 0.35 },
      },
    });
    const compositeQuad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      compositeMaterial
    );
    compositeScene.add(compositeQuad);

    // ─── Blur material for bloom passes ─────────────────────────────
    const blurMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
      `,
      fragmentShader: `
        uniform sampler2D tInput;
        uniform vec2 uDirection;
        uniform vec2 uResolution;
        varying vec2 vUv;
        
        void main() {
          vec2 texel = 1.0 / uResolution;
          vec4 color = vec4(0.0);
          float weights[5];
          weights[0] = 0.227027; weights[1] = 0.1945946;
          weights[2] = 0.1216216; weights[3] = 0.054054;
          weights[4] = 0.016216;
          
          color += texture2D(tInput, vUv) * weights[0];
          for(int i = 1; i < 5; i++) {
            vec2 offset = uDirection * texel * float(i) * 2.0;
            color += texture2D(tInput, vUv + offset) * weights[i];
            color += texture2D(tInput, vUv - offset) * weights[i];
          }
          gl_FragColor = color;
        }
      `,
      uniforms: {
        tInput: { value: null },
        uDirection: { value: new THREE.Vector2(1, 0) },
        uResolution: { value: new THREE.Vector2(width / 2, height / 2) },
      },
    });
    const blurQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), blurMaterial);
    const blurScene = new THREE.Scene();
    blurScene.add(blurQuad);

    // ─── Lighting Rig ───────────────────────────────────────────────
    
    // Ambient — soft fill
    const ambientLight = new THREE.AmbientLight(0x1a1030, 0.4);
    scene.add(ambientLight);

    // Main key light — warm from upper right
    const keyLight = new THREE.DirectionalLight(0xffeedd, 1.5);
    keyLight.position.set(5, 5, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    // Rim light — cool cyan from behind
    const rimLight = new THREE.DirectionalLight(0x00f4ff, 1.0);
    rimLight.position.set(-3, 2, -5);
    scene.add(rimLight);

    // Fill light — purple from below
    const fillLight = new THREE.PointLight(0x7b00ff, 1.0, 15);
    fillLight.position.set(-2, -3, 2);
    scene.add(fillLight);

    // Spot — dramatic top-down
    const spotLight = new THREE.SpotLight(0xffc06f, 1.5, 20, Math.PI / 6, 0.5, 1);
    spotLight.position.set(0, 8, 2);
    spotLight.target.position.set(0, 0, 0);
    scene.add(spotLight);
    scene.add(spotLight.target);

    // Moving accent lights
    const accentLight1 = new THREE.PointLight(0xe900ff, 0.6, 12);
    const accentLight2 = new THREE.PointLight(0x00f4ff, 0.6, 12);
    const accentLight3 = new THREE.PointLight(0xffc06f, 0.4, 10);
    scene.add(accentLight1, accentLight2, accentLight3);

    // Hemisphere for natural fill
    const hemiLight = new THREE.HemisphereLight(0x4100ff, 0x180819, 0.6);
    scene.add(hemiLight);

    // ─── Copy lights to bloom scene ─────────────────────────────────
    const bloomAmbient = new THREE.AmbientLight(0x1a1030, 0.1);
    bloomScene.add(bloomAmbient);
    const bloomKey = new THREE.DirectionalLight(0xffeedd, 0.3);
    bloomKey.position.copy(keyLight.position);
    bloomScene.add(bloomKey);

    // ─── Cosmic Egg / Orb ───────────────────────────────────────────
    const orbGeometry = new THREE.SphereGeometry(1.2, 128, 128);
    
    // Main orb (PBR)
    const orbMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x88ddff,
      metalness: 0.0,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 0.8,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.5,
      emissive: 0x1a4466,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.95,
    });

    const orbMesh = new THREE.Mesh(orbGeometry, orbMaterial);
    orbMesh.castShadow = true;
    orbMesh.receiveShadow = true;
    scene.add(orbMesh);

    // Orb glow shell (bloom layer — ShaderMaterial)
    const glowGeometry = new THREE.SphereGeometry(1.35, 64, 64);
    const glowMaterial = new THREE.ShaderMaterial({
      vertexShader: orbVertexShader,
      fragmentShader: orbFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uDisplacementIntensity: { value: 0.07 },
        uNoiseSpeed: { value: 0.3 },
        uNoiseScale: { value: 3.0 },
        uDiffuseColor: { value: new THREE.Color(0xb5fafa) },
        uFresnelColor: { value: new THREE.Color(0x94b9eb) },
        uFresnelPower: { value: 2.5 },
        uFresnelIntensity: { value: 1.5 },
        uGlowColor: { value: new THREE.Color(0xffc06f) },
        uGlowColor2: { value: new THREE.Color(0x4444ff) },
        uGlowIntensity: { value: 0.25 },
        uPhase: { value: 0.0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.FrontSide,
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    bloomScene.add(glowMesh);

    // Inner light orb (small bright core)
    const coreGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xaaddff,
      transparent: true,
      opacity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    bloomScene.add(coreMesh);

    // ─── Crystal Ring / Orbit Geometry ──────────────────────────────
    const ringCount = 3;
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.TorusGeometry(1.8 + i * 0.4, 0.015, 16, 100);
      const ringMat = new THREE.MeshPhysicalMaterial({
        color: 0x94b9eb,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.4,
        emissive: 0x94b9eb,
        emissiveIntensity: 0.3,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2 + (i - 1) * 0.4;
      ring.rotation.z = i * 0.8;
      scene.add(ring);
      rings.push(ring);
      
      // Bloom version
      const bloomRingMat = new THREE.MeshBasicMaterial({
        color: 0x94b9eb,
        transparent: true,
        opacity: 0.1,
      });
      const bloomRing = new THREE.Mesh(ringGeo.clone(), bloomRingMat);
      bloomRing.rotation.copy(ring.rotation);
      bloomScene.add(bloomRing);
      // Link them
      (ring as any)._bloomPair = bloomRing;
    }

    // ─── Floating Crystal Shards ────────────────────────────────────
    const shardCount = 24;
    const shards: THREE.Mesh[] = [];
    const shardGroup = new THREE.Group();
    scene.add(shardGroup);
    const bloomShardGroup = new THREE.Group();
    bloomScene.add(bloomShardGroup);

    for (let i = 0; i < shardCount; i++) {
      const scale = 0.05 + Math.random() * 0.12;
      const shardGeo = new THREE.OctahedronGeometry(scale, 0);
      const hue = 0.6 + Math.random() * 0.2; // Purple-blue range
      const shardMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL(hue, 0.8, 0.6),
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.7,
        emissive: new THREE.Color().setHSL(hue, 1.0, 0.3),
        emissiveIntensity: 0.5,
      });
      const shard = new THREE.Mesh(shardGeo, shardMat);
      
      // Random position in shell around orb
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.0 + Math.random() * 3.0;
      shard.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      
      // Store orbit data
      (shard as any)._orbit = { theta, phi, r, speed: 0.1 + Math.random() * 0.2 };
      
      shardGroup.add(shard);
      shards.push(shard);
      
      // Bloom pair
      const bloomShardMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(hue, 1.0, 0.5),
        transparent: true,
        opacity: 0.1,
      });
      const bloomShard = new THREE.Mesh(shardGeo.clone(), bloomShardMat);
      bloomShard.position.copy(shard.position);
      bloomShard.rotation.copy(shard.rotation);
      bloomShardGroup.add(bloomShard);
      (shard as any)._bloomPair = bloomShard;
    }

    // ─── Dust Particles ─────────────────────────────────────────────
    const dustCount = 3000;
    const dustPositions = new Float32Array(dustCount * 3);
    const dustSizes = new Float32Array(dustCount);
    const dustSpeeds = new Float32Array(dustCount);
    const dustPhases = new Float32Array(dustCount);
    const dustColors = new Float32Array(dustCount * 3);

    const dustPalette = [
      new THREE.Color(0x94b9eb),
      new THREE.Color(0xbfbbf8),
      new THREE.Color(0x00f4ff),
      new THREE.Color(0xffc06f),
      new THREE.Color(0xe900ff),
      new THREE.Color(0xffffff),
    ];

    for (let i = 0; i < dustCount; i++) {
      const r = 1.5 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dustPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dustPositions[i * 3 + 2] = r * Math.cos(phi);
      dustSizes[i] = 0.3 + Math.random() * 1.2;
      dustSpeeds[i] = 0.1 + Math.random() * 0.4;
      dustPhases[i] = Math.random() * Math.PI * 2;
      const c = dustPalette[Math.floor(Math.random() * dustPalette.length)];
      dustColors[i * 3] = c.r;
      dustColors[i * 3 + 1] = c.g;
      dustColors[i * 3 + 2] = c.b;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeometry.setAttribute('aSize', new THREE.BufferAttribute(dustSizes, 1));
    dustGeometry.setAttribute('aSpeed', new THREE.BufferAttribute(dustSpeeds, 1));
    dustGeometry.setAttribute('aPhase', new THREE.BufferAttribute(dustPhases, 1));
    dustGeometry.setAttribute('aColor', new THREE.BufferAttribute(dustColors, 3));

    const dustMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustPoints);
    
    // Bloom dust (subset, brighter)
    const bloomDustPoints = new THREE.Points(dustGeometry.clone(), dustMaterial.clone());
    bloomScene.add(bloomDustPoints);

    // ─── Nebula Clouds ──────────────────────────────────────────────
    const nebulaCount = 80;
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaOpacities = new Float32Array(nebulaCount);
    const nebulaSizes = new Float32Array(nebulaCount);
    const nebulaRotations = new Float32Array(nebulaCount);

    for (let i = 0; i < nebulaCount; i++) {
      const r = 3 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      nebulaPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      nebulaPositions[i * 3 + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.4; // Flatten
      nebulaPositions[i * 3 + 2] = r * Math.cos(phi);
      nebulaOpacities[i] = 0.03 + Math.random() * 0.08;
      nebulaSizes[i] = 5 + Math.random() * 15;
      nebulaRotations[i] = Math.random() * Math.PI * 2;
    }

    const nebulaGeometry = new THREE.BufferGeometry();
    nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeometry.setAttribute('aOpacity', new THREE.BufferAttribute(nebulaOpacities, 1));
    nebulaGeometry.setAttribute('aSize', new THREE.BufferAttribute(nebulaSizes, 1));
    nebulaGeometry.setAttribute('aRotation', new THREE.BufferAttribute(nebulaRotations, 1));

    const nebulaMaterial = new THREE.ShaderMaterial({
      vertexShader: nebulaVertexShader,
      fragmentShader: nebulaFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0x4100ff) },
        uColor2: { value: new THREE.Color(0x180819) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nebulaPoints = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebulaPoints);

    // ─── Starfield (distant) ────────────────────────────────────────
    const starCount = 5000;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const r = 20 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);
      starSizes[i] = 0.2 + Math.random() * 0.8;
      // Mostly white with occasional color
      if (Math.random() < 0.1) {
        const sc = dustPalette[Math.floor(Math.random() * dustPalette.length)];
        starColors[i * 3] = sc.r;
        starColors[i * 3 + 1] = sc.g;
        starColors[i * 3 + 2] = sc.b;
      } else {
        const brightness = 0.7 + Math.random() * 0.3;
        starColors[i * 3] = brightness;
        starColors[i * 3 + 1] = brightness;
        starColors[i * 3 + 2] = brightness;
      }
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('aSize', new THREE.BufferAttribute(starSizes, 1));
    starGeometry.setAttribute('aSpeed', new THREE.BufferAttribute(new Float32Array(starCount).fill(0.01), 1));
    starGeometry.setAttribute('aPhase', new THREE.BufferAttribute(new Float32Array(starCount).map(() => Math.random() * 6.28), 1));
    starGeometry.setAttribute('aColor', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: 0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);

    // ─── Environment Map (procedural) ───────────────────────────────
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    
    // Create a simple environment scene
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x0a0612);
    
    // Add some colored lights to the env scene for reflections
    const envLight1 = new THREE.PointLight(0x4100ff, 15, 20);
    envLight1.position.set(5, 5, 5);
    envScene.add(envLight1);
    const envLight2 = new THREE.PointLight(0x00f4ff, 15, 20);
    envLight2.position.set(-5, -3, -5);
    envScene.add(envLight2);
    const envLight3 = new THREE.PointLight(0xffc06f, 10, 15);
    envLight3.position.set(0, 5, -3);
    envScene.add(envLight3);
    // Small sphere for env reflection
    const envSphere = new THREE.Mesh(
      new THREE.SphereGeometry(8, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x0a0612, side: THREE.BackSide })
    );
    envScene.add(envSphere);
    
    const envTexture = pmremGenerator.fromScene(envScene, 0, 0.1, 100).texture;
    scene.environment = envTexture;
    orbMaterial.envMap = envTexture;
    orbMaterial.envMapIntensity = 2.5;
    orbMaterial.needsUpdate = true;
    
    pmremGenerator.dispose();

    // ─── Scroll Tracking ────────────────────────────────────────────
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressRef.current = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ─── Mouse Tracking ─────────────────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ─── Resize ─────────────────────────────────────────────────────
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      sceneRT.setSize(width, height);
      bloomRT.setSize(Math.floor(width / 2), Math.floor(height / 2));
      bloomRT2.setSize(Math.floor(width / 4), Math.floor(height / 4));
    };
    window.addEventListener('resize', handleResize);

    // ─── Animation Loop ─────────────────────────────────────────────
    const clock = new THREE.Clock();
    const targetCamPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();
    const currentCamPos = new THREE.Vector3(0, 0, 6);
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    function animate() {
      if (destroyedRef.current) return;
      animFrameRef.current = requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();
      const delta = Math.min(clock.getDelta(), 0.05);
      const progress = scrollProgressRef.current;

      // ── Smooth mouse ──
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // ── Camera on rails ──
      const camData = interpolateCameraPath(progress);
      targetCamPos.set(...camData.pos);
      targetLookAt.set(...camData.look);
      
      // Smooth interpolation
      currentCamPos.lerp(targetCamPos, 0.04);
      currentLookAt.lerp(targetLookAt, 0.04);
      
      // Apply mouse parallax offset
      const parallaxX = mouseRef.current.x * 0.3;
      const parallaxY = mouseRef.current.y * 0.2;
      
      camera.position.copy(currentCamPos);
      camera.position.x += parallaxX;
      camera.position.y += parallaxY;
      camera.lookAt(currentLookAt);
      
      // Smooth FOV
      camera.fov += (camData.fov - camera.fov) * 0.03;
      camera.updateProjectionMatrix();

      // ── Phase colors ──
      const colors = getPhaseColors(progress);
      compositeMaterial.uniforms.uTint.value.set(...colors.tint);
      compositeMaterial.uniforms.uVignetteIntensity.value = colors.vignetteIntensity;
      scene.fog = new THREE.FogExp2(colors.bg.getHex(), 0.04);

      // ── Orb animation ──
      const orbScale = 1.0 + Math.sin(time * 0.5) * 0.03;
      orbMesh.scale.setScalar(orbScale);
      orbMesh.rotation.y = time * 0.1;
      orbMesh.rotation.x = Math.sin(time * 0.15) * 0.1;
      
      // Glow shell
      glowMaterial.uniforms.uTime.value = time;
      glowMaterial.uniforms.uPhase.value = progress;
      glowMesh.scale.setScalar(orbScale);
      glowMesh.rotation.copy(orbMesh.rotation);
      glowMesh.position.copy(orbMesh.position);
      
      // Core pulse
      const corePulse = 0.8 + Math.sin(time * 2) * 0.2;
      coreMesh.scale.setScalar(corePulse * 0.3);
      coreMesh.position.copy(orbMesh.position);

      // Phase-dependent orb behavior
      const orbVisibility = progress < 0.5 ? 1.0 : Math.max(0, 1.0 - (progress - 0.5) * 3);
      orbMesh.scale.multiplyScalar(orbVisibility);
      glowMesh.scale.multiplyScalar(orbVisibility);
      (orbMaterial as any).opacity = 0.9 * orbVisibility;
      (coreMaterial as any).opacity = 0.9 * orbVisibility;

      // ── Ring animation ──
      rings.forEach((ring, i) => {
        ring.rotation.z += (0.003 + i * 0.002) * (i % 2 === 0 ? 1 : -1);
        ring.rotation.x += 0.001 * (i % 2 === 0 ? 1 : -1);
        const ringScale = orbVisibility;
        ring.scale.setScalar(ringScale);
        // Sync bloom pair
        const bp = (ring as any)._bloomPair;
        if (bp) {
          bp.rotation.copy(ring.rotation);
          bp.scale.copy(ring.scale);
        }
      });

      // ── Crystal shard orbits ──
      shards.forEach((shard) => {
        const orb = (shard as any)._orbit;
        orb.theta += orb.speed * 0.01;
        orb.phi += orb.speed * 0.005;
        shard.position.set(
          orb.r * Math.sin(orb.phi) * Math.cos(orb.theta),
          orb.r * Math.sin(orb.phi) * Math.sin(orb.theta),
          orb.r * Math.cos(orb.phi)
        );
        shard.rotation.x += 0.01;
        shard.rotation.y += 0.015;
        // Sync bloom pair
        const bp = (shard as any)._bloomPair;
        if (bp) {
          bp.position.copy(shard.position);
          bp.rotation.copy(shard.rotation);
        }
      });

      // ── Dust particles ──
      dustMaterial.uniforms.uTime.value = time;
      dustMaterial.uniforms.uScrollProgress.value = progress;
      dustPoints.rotation.y = time * 0.02;

      // ── Nebula ──
      nebulaMaterial.uniforms.uTime.value = time;
      nebulaPoints.rotation.y = time * 0.005;

      // ── Stars ──
      starMaterial.uniforms.uTime.value = time;
      starPoints.rotation.y = time * 0.003;

      // ── Accent light orbits ──
      accentLight1.position.set(
        Math.sin(time * 0.3) * 5,
        Math.cos(time * 0.2) * 3,
        Math.sin(time * 0.4) * 4
      );
      accentLight2.position.set(
        Math.cos(time * 0.25) * 6,
        Math.sin(time * 0.35) * 2,
        Math.cos(time * 0.3) * 5
      );
      accentLight3.position.set(
        Math.sin(time * 0.15) * 4,
        Math.cos(time * 0.25) * 4,
        Math.sin(time * 0.2) * 3
      );

      // ─── Multi-Pass Render Pipeline ───────────────────────────────

      // Pass 1: Render main scene to texture
      renderer.setRenderTarget(sceneRT);
      renderer.setClearColor(colors.bg, 1);
      renderer.clear();
      renderer.render(scene, camera);

      // Pass 2: Render bloom objects
      renderer.setRenderTarget(bloomRT);
      renderer.setClearColor(0x000000, 1);
      renderer.clear();
      renderer.render(bloomScene, camera);

      // Pass 3: Blur bloom horizontally
      blurMaterial.uniforms.tInput.value = bloomRT.texture;
      blurMaterial.uniforms.uDirection.value.set(1, 0);
      blurMaterial.uniforms.uResolution.value.set(bloomRT.width, bloomRT.height);
      renderer.setRenderTarget(bloomRT2);
      renderer.clear();
      renderer.render(blurScene, compositeCamera);

      // Pass 4: Blur bloom vertically
      blurMaterial.uniforms.tInput.value = bloomRT2.texture;
      blurMaterial.uniforms.uDirection.value.set(0, 1);
      blurMaterial.uniforms.uResolution.value.set(bloomRT2.width, bloomRT2.height);
      renderer.setRenderTarget(bloomRT);
      renderer.clear();
      renderer.render(blurScene, compositeCamera);

      // Extra blur passes for softer bloom
      blurMaterial.uniforms.tInput.value = bloomRT.texture;
      blurMaterial.uniforms.uDirection.value.set(1, 0);
      renderer.setRenderTarget(bloomRT2);
      renderer.clear();
      renderer.render(blurScene, compositeCamera);

      // Pass 5: Composite (scene + bloom + color grading)
      compositeMaterial.uniforms.tScene.value = sceneRT.texture;
      compositeMaterial.uniforms.tBloom.value = bloomRT2.texture;
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(compositeScene, compositeCamera);
    }

    animate();

    // ─── Cleanup ────────────────────────────────────────────────────
    return () => {
      destroyedRef.current = true;
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Dispose all
      renderer.dispose();
      sceneRT.dispose();
      bloomRT.dispose();
      bloomRT2.dispose();
      envTexture.dispose();
      scene.traverse((child) => {
        if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) mat.forEach(m => m.dispose());
          else mat.dispose();
        }
      });
      bloomScene.traverse((child) => {
        if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) mat.forEach(m => m.dispose());
          else mat.dispose();
        }
      });
    };
  }, []);

  useEffect(() => {
    destroyedRef.current = false;
    const cleanup = init();
    return () => {
      if (cleanup) cleanup();
    };
  }, [init]);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
