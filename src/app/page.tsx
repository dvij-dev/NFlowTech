'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback, useEffect } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   NFlow Technologies — Homepage
   
   Architecture (inspired by hatom.com):
   - Full-screen fixed WebGL canvas (CosmicJourney)
   - 16 viewport-height scroll spacers + fixed content overlays
   - Ink-bleed reveal: starts white, noise-driven organic reveal on click
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

const InkTransition = dynamic(() => import('@/components/InkTransition'), {
  ssr: false,
});

export default function Home() {
  const [activated, setActivated] = useState(false);

  const handleActivate = useCallback(() => {
    if (!activated) {
      setActivated(true);
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

      {/* ═══ Ink-Bleed Transition Overlay ═══
          White canvas that reveals the scene through noise-driven organic bleed.
          Center reveals first, edges last, with painterly feathered boundaries.
          Hatom.com-style effect. */}
      <InkTransition activated={activated} duration={3000} />

      {/* ═══ Pre-activation overlay content ═══
          Dark text on white bg — sits ABOVE the ink overlay.
          Shows logo, title, and click prompt.
          Fades out as ink transition reveals the dark scene beneath. */}
      <div
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{
          zIndex: 110,
          pointerEvents: 'none',
          opacity: activated ? 0 : 1,
          transition: 'opacity 1.5s ease-out',
        }}
      >
        {/* Nav bar clone — dark text on white */}
        <div className="fixed top-0 left-0 right-0 p-6 md:p-8 flex items-center justify-between">
          <span className="text-black/70 text-lg font-light tracking-wider">NFLOW</span>
          <div className="flex items-center gap-6">
            <span className="text-black/30 text-sm tracking-wider hidden md:block">SERVICES</span>
            <span className="text-black/30 text-sm tracking-wider hidden md:block">WORK</span>
            <span className="text-black/30 text-sm tracking-wider hidden md:block">ABOUT</span>
            <span className="text-black/30 text-sm tracking-wider hidden md:block">CONTACT</span>
          </div>
        </div>

        {/* Hero title — large, centered */}
        <div className="text-center" style={{ marginTop: '-5vh' }}>
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-extralight tracking-tight leading-none text-black/85">
            NFlow
          </h1>
          <p className="text-[clamp(0.8rem,2vw,1.3rem)] tracking-[0.35em] uppercase mt-2 text-sky-600/70">
            TECHNOLOGIES
          </p>
          <p className="text-black/30 text-sm mt-4 font-light">
            Performance marketing that transforms brands
          </p>
        </div>

        {/* Click prompt */}
        <div className="absolute bottom-[15vh] flex flex-col items-center gap-3 animate-pulse">
          <div className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center">
            <svg className="w-5 h-5 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
          <span className="text-black/25 text-xs uppercase tracking-[0.3em]">Click anywhere to enter</span>
        </div>
      </div>
    </main>
  );
}
