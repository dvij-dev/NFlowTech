'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   NFlow Technologies — Homepage
   
   Architecture (inspired by hatom.com):
   - Full-screen fixed WebGL canvas (CosmicJourney)
   - 16 viewport-height scroll spacers + fixed content overlays
   - Click-to-activate: starts inverted (white bg, dark outlines),
     color bleeds in on click (like hatom.com intro)
   - Camera-on-rails + mouse parallax
   ═══════════════════════════════════════════════════════════════════════════ */

const CosmicJourney = dynamic(() => import('@/components/CosmicJourney'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border border-black/10 rounded-full flex items-center justify-center mb-6 mx-auto">
          <div className="w-2 h-2 bg-black/40 rounded-full animate-pulse" />
        </div>
        <p className="text-black/30 text-xs uppercase tracking-[0.3em]">Loading</p>
      </div>
    </div>
  ),
});

const ScrollSections = dynamic(() => import('@/components/ScrollSections'), {
  ssr: false,
});

const CanvasCursor = dynamic(() => import('@/components/CanvasCursor'), {
  ssr: false,
});

export default function Home() {
  const [activated, setActivated] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(1);

  const handleActivate = useCallback(() => {
    if (!activated) {
      setActivated(true);
      // Animate overlay fade-out
      requestAnimationFrame(() => {
        setOverlayOpacity(0);
      });
    }
  }, [activated]);

  useEffect(() => {
    const onClick = () => handleActivate();
    const onScroll = () => {
      if (window.scrollY > 10) handleActivate();
    };
    window.addEventListener('click', onClick);
    window.addEventListener('touchstart', onClick, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchstart', onClick);
      window.removeEventListener('scroll', onScroll);
    };
  }, [handleActivate]);

  return (
    <main className="bg-[#0a0612] min-h-screen" style={{ cursor: 'none' }}>
      {/* WebGL Background */}
      <CosmicJourney />
      
      {/* Scroll Sections + Content Overlays */}
      <ScrollSections activated={activated} />
      
      {/* Custom Cursor */}
      <CanvasCursor />

      {/* ═══ Inversion overlay ═══
          White overlay with mix-blend-mode: difference
          Creates "inverted colors" look (white bg, dark outlines)
          Fades out on activation → true colors bleed in */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#ffffff',
          opacity: overlayOpacity,
          transition: 'opacity 2.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
          mixBlendMode: 'difference',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />

      {/* Click-to-enter prompt — always visible pre-activation */}
      {!activated && (
        <div
          className="fixed inset-0 flex items-end justify-center pb-[15vh]"
          style={{ zIndex: 25, pointerEvents: 'none' }}
        >
          <div className="flex flex-col items-center gap-3 animate-pulse">
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
              <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <span className="text-white/40 text-xs uppercase tracking-[0.3em]">Click anywhere to enter</span>
          </div>
        </div>
      )}
    </main>
  );
}
