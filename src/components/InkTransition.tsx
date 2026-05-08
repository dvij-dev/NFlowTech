'use client';

import { useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   InkTransition — Organic noise-driven color bleed reveal
   
   Inspired by hatom.com's intro transition:
   - Starts with a fully white overlay (inverted look)
   - On activation, dark scene "bleeds" through using noise threshold
   - Center reveals first, edges last (radial gradient bias)
   - Noise gives organic, painterly edges to the bleed
   - Transition duration ~3s with ease-out curve
   ═══════════════════════════════════════════════════════════════════════════ */

interface InkTransitionProps {
  activated: boolean;
  duration?: number; // transition duration in ms
}

// Simple 2D noise function for organic edges
function createNoiseTexture(width: number, height: number): Float32Array {
  const data = new Float32Array(width * height);
  
  // Simplex-like noise via multi-octave value noise
  function hash(x: number, y: number): number {
    let h = x * 374761393 + y * 668265263;
    h = (h ^ (h >> 13)) * 1274126177;
    h = h ^ (h >> 16);
    return (h & 0x7fffffff) / 0x7fffffff;
  }
  
  function smoothNoise(x: number, y: number): number {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    
    // Smoothstep
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    
    const n00 = hash(ix, iy);
    const n10 = hash(ix + 1, iy);
    const n01 = hash(ix, iy + 1);
    const n11 = hash(ix + 1, iy + 1);
    
    return n00 * (1 - sx) * (1 - sy) + n10 * sx * (1 - sy) +
           n01 * (1 - sx) * sy + n11 * sx * sy;
  }
  
  function fbm(x: number, y: number): number {
    let val = 0;
    let amp = 0.5;
    let freq = 1;
    for (let i = 0; i < 6; i++) {
      val += amp * smoothNoise(x * freq, y * freq);
      amp *= 0.5;
      freq *= 2.1;
    }
    return val;
  }
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Normalized coordinates
      const nx = x / width;
      const ny = y / height;
      
      // Radial distance from center (0 at center, 1 at corners)
      const dx = (nx - 0.5) * 2;
      const dy = (ny - 0.5) * 2;
      const radial = Math.sqrt(dx * dx + dy * dy) / 1.414; // normalized to 0-1
      
      // Multi-scale noise for organic edges
      const noise = fbm(nx * 4 + 0.5, ny * 4 + 0.5);
      
      // Combine: center reveals first (low values), edges last (high values)
      // Noise adds organic variation to the reveal boundary
      const revealOrder = radial * 0.6 + noise * 0.4;
      
      data[y * width + x] = revealOrder;
    }
  }
  
  return data;
}

export default function InkTransition({ activated, duration = 3000 }: InkTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseRef = useRef<Float32Array | null>(null);
  const progressRef = useRef(0); // 0 = full white, 1 = fully revealed
  const startTimeRef = useRef(0);
  const animRef = useRef(0);
  const doneRef = useRef(false);

  // Generate noise on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Use a manageable resolution — upscaled by canvas CSS
    const w = 256;
    const h = 144;
    canvas.width = w;
    canvas.height = h;
    
    noiseRef.current = createNoiseTexture(w, h);
    
    // Initial render: full white
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);
    }
  }, []);

  const renderFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    const noise = noiseRef.current;
    if (!canvas || !noise) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const w = canvas.width;
    const h = canvas.height;
    
    const imgData = ctx.createImageData(w, h);
    const pixels = imgData.data;
    
    // Ease-out cubic for smooth deceleration
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    
    // Threshold sweep: as progress goes 0→1, more pixels become transparent
    // Add a soft edge (feather) for smooth bleed boundaries
    const threshold = easedProgress * 1.2; // overshoot slightly to ensure full reveal
    const feather = 0.08 + easedProgress * 0.12; // wider feather as it expands
    
    for (let i = 0; i < w * h; i++) {
      const noiseVal = noise[i];
      
      // Alpha: 255 (opaque white) when noiseVal > threshold
      // Fades in the feather zone
      let alpha: number;
      if (noiseVal < threshold - feather) {
        alpha = 0; // fully revealed
      } else if (noiseVal > threshold) {
        alpha = 255; // still white
      } else {
        // Feather zone — smooth transition
        const t = (noiseVal - (threshold - feather)) / feather;
        alpha = Math.round(t * t * 255); // quadratic for softer edge
      }
      
      const idx = i * 4;
      pixels[idx] = 255;     // R
      pixels[idx + 1] = 255; // G
      pixels[idx + 2] = 255; // B
      pixels[idx + 3] = alpha;
    }
    
    ctx.putImageData(imgData, 0, 0);
  }, []);

  // Animate on activation
  useEffect(() => {
    if (!activated || doneRef.current) return;
    
    startTimeRef.current = performance.now();
    
    function tick() {
      const elapsed = performance.now() - startTimeRef.current;
      const progress = Math.min(1, elapsed / duration);
      
      progressRef.current = progress;
      renderFrame(progress);
      
      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        doneRef.current = true;
      }
    }
    
    animRef.current = requestAnimationFrame(tick);
    
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [activated, duration, renderFrame]);

  // Don't render if transition is complete
  if (doneRef.current) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 100,
        pointerEvents: 'none',
        imageRendering: 'auto', // let browser smooth the upscale
      }}
    />
  );
}
