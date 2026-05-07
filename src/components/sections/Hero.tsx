"use client";

import Link from "next/link";
import Image from "next/image";
import { useCounter } from "@/lib/hooks";

const metrics = [
  { value: 138, suffix: "+", label: "Brands Served" },
  { value: 27, suffix: "+", label: "Industries" },
  { value: 5, suffix: "x", label: "Avg. ROAS" },
  { value: 10, prefix: "$", suffix: "M+", label: "Ad Spend Managed" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/40 to-navy-950" />
        <div className="absolute inset-0 bg-hero-glow" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Label */}
          <div className="label-accent mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
            AI-Driven Digital Marketing Agency
          </div>

          {/* Headline */}
          <h1 className="text-display-xl font-display font-bold text-white mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            We Turn Ad Spend Into{" "}
            <span className="gradient-text italic">
              Measurable Growth
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-body-lg text-white/60 max-w-2xl mb-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            NFlow Tech combines data science, creative strategy, and proven
            advertising tactics to generate qualified leads and scale revenue
            for brands across 27+ industries.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-20 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Link href="/contact" className="btn-gold text-base">
              Get Your Free Audit
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M12 6L16 10L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/case-studies" className="btn-outline text-base">
              See Our Results
            </Link>
          </div>
        </div>

        {/* Metrics bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          {metrics.map((metric, i) => (
            <MetricItem key={i} {...metric} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1s" }}>
        <span className="text-caption text-white/30">Scroll to explore</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-accent animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function MetricItem({ value, prefix, suffix, label }: { value: number; prefix?: string; suffix: string; label: string }) {
  const { count, ref } = useCounter(value, 2000);

  return (
    <div className="relative group">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="glass-card p-6 text-center relative">
        <div className="text-display-md font-display font-bold text-white mb-1" ref={ref}>
          {prefix}{count}{suffix}
        </div>
        <div className="text-body-sm text-white/40">{label}</div>
      </div>
    </div>
  );
}
