import dynamic from 'next/dynamic';

/* ═══════════════════════════════════════════════════════════════════════════
   NFlow Technologies — Homepage
   
   Architecture (inspired by hatom.com analysis):
   - Full-screen fixed WebGL canvas (CosmicJourney)
   - 16 empty viewport-height scroll spacer divs
   - Fixed content overlays that fade in/out based on scroll progress
   - Custom canvas cursor with trail
   - Camera-on-rails driven by scroll, mouse parallax for 3D feel
   ═══════════════════════════════════════════════════════════════════════════ */

// Dynamic imports for client-only WebGL components
const CosmicJourney = dynamic(() => import('@/components/CosmicJourney'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#0a0612] flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-6 mx-auto">
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
        </div>
        <p className="text-white/30 text-xs uppercase tracking-[0.3em]">Loading Experience</p>
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
  return (
    <main className="bg-[#0a0612] min-h-screen" style={{ cursor: 'none' }}>
      {/* WebGL Background — fixed canvas */}
      <CosmicJourney />
      
      {/* Scroll Sections + Content Overlays */}
      <ScrollSections />
      
      {/* Custom Cursor */}
      <CanvasCursor />
    </main>
  );
}
