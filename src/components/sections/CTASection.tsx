"use client";

import Link from "next/link";
import { useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export function CTASection() {
  const { ref, isInView } = useInView();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-dark via-accent to-accent-light" />
      <div className="absolute inset-0 bg-navy-950/40" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div ref={ref} className="container-wide relative z-10 text-center">
        <h2
          className={cn(
            "text-display-lg md:text-display-xl font-display font-bold text-white mb-6 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Ready to Turn Your Ad
          <br />
          Spend Into <span className="italic">Revenue?</span>
        </h2>

        <p
          className={cn(
            "text-body-lg text-white/70 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Book a free strategy call. We&apos;ll audit your current setup,
          identify the biggest opportunities, and show you what&apos;s possible —
          no strings attached.
        </p>

        <div
          className={cn(
            "flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-400",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-navy-950 font-bold text-lg rounded-full hover:bg-cream hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            Get Your Free Audit
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M12 6L16 10L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-5 border-2 border-white/30 text-white font-semibold text-lg rounded-full hover:border-white hover:bg-white/10 transition-all duration-300"
          >
            View Pricing
          </Link>
        </div>

        {/* Trust badges */}
        <div
          className={cn(
            "mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50 transition-all duration-700 delay-600",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.78 5.28l-4.5 5a.75.75 0 01-1.06.02l-2-1.88a.75.75 0 011.03-1.09l1.45 1.37 3.97-4.41a.75.75 0 011.11 1z" />
            </svg>
            No contracts
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.78 5.28l-4.5 5a.75.75 0 01-1.06.02l-2-1.88a.75.75 0 011.03-1.09l1.45 1.37 3.97-4.41a.75.75 0 011.11 1z" />
            </svg>
            Free audit included
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.78 5.28l-4.5 5a.75.75 0 01-1.06.02l-2-1.88a.75.75 0 011.03-1.09l1.45 1.37 3.97-4.41a.75.75 0 011.11 1z" />
            </svg>
            Results in 60 days
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.78 5.28l-4.5 5a.75.75 0 01-1.06.02l-2-1.88a.75.75 0 011.03-1.09l1.45 1.37 3.97-4.41a.75.75 0 011.11 1z" />
            </svg>
            Google & HubSpot Certified
          </span>
        </div>
      </div>
    </section>
  );
}
