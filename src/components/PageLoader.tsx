'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counter = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up the loader
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: () => setIsLoading(false),
        });
      },
    });

    // Counter animation
    tl.to(counter, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(counter.val).toString();
        }
      },
    });

    // Fade in text
    tl.from(textRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
    }, 0.3);

    return () => { tl.kill(); };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] bg-navy-950 flex flex-col items-center justify-center"
    >
      <div className="relative">
        <div ref={textRef} className="text-center mb-8">
          <span className="text-xs tracking-[0.3em] uppercase text-sky-400 font-mono">
            NFlow Tech
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span
            ref={counterRef}
            className="text-7xl md:text-9xl font-playfair font-bold text-white tabular-nums"
          >
            0
          </span>
          <span className="text-2xl md:text-4xl font-playfair text-sky-400">%</span>
        </div>
        {/* Progress bar */}
        <div className="mt-6 w-48 h-[1px] bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-cyan-300"
            style={{
              animation: 'loaderBar 2s power2.inOut forwards',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes loaderBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
