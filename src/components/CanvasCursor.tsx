'use client';

import { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   CanvasCursor — Custom canvas-based cursor with trail effect
   Inspired by hatom.com's Lottie cursor but implemented as a canvas trail
   ═══════════════════════════════════════════════════════════════════════════ */

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

export default function CanvasCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    const trail: TrailPoint[] = [];
    const maxTrail = 20;
    let rafId: number;
    let isVisible = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isVisible = true;
    };

    const handleMouseLeave = () => {
      isVisible = false;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    function animate() {
      rafId = requestAnimationFrame(animate);
      ctx!.clearRect(0, 0, width, height);

      if (!isVisible) return;

      // Smooth cursor follow
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      // Add to trail
      trail.unshift({ x: cursorX, y: cursorY, age: 0 });
      if (trail.length > maxTrail) trail.pop();

      // Draw trail
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age += 1;
        const t = trail[i].age / maxTrail;
        const alpha = (1 - t) * 0.3;
        const radius = (1 - t) * 3 + 1;
        
        ctx!.beginPath();
        ctx!.arc(trail[i].x, trail[i].y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(148, 185, 235, ${alpha})`;
        ctx!.fill();
      }

      // Draw main cursor dot
      ctx!.beginPath();
      ctx!.arc(cursorX, cursorY, 4, 0, Math.PI * 2);
      ctx!.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx!.fill();

      // Outer ring
      ctx!.beginPath();
      ctx!.arc(cursorX, cursorY, 16, 0, Math.PI * 2);
      ctx!.strokeStyle = 'rgba(148, 185, 235, 0.3)';
      ctx!.lineWidth = 1;
      ctx!.stroke();
    }

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999, cursor: 'none' }}
    />
  );
}
