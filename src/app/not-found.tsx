'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section-pad pt-40 pb-32 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/[0.03] rounded-full blur-[150px]" />
      <div className="relative z-10 text-center max-w-lg">
        <p className="font-mono text-sky-400 text-sm uppercase tracking-[0.3em] mb-4">404</p>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
          Lost in <span className="gradient-text">Space</span>
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed mb-10">
          This page doesn&apos;t exist in our universe yet. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary">
            Back to Home
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <Link href="/contact" className="px-6 py-3 text-sm font-medium text-slate-300 border border-white/10 rounded-xl hover:bg-white/[0.03] hover:border-white/20 transition-all">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  )
}
