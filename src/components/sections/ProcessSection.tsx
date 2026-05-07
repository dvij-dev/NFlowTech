"use client";

import { useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Deep Audit",
    description: "We dissect your current digital presence — ads, SEO, analytics, creative, competitors. No stone unturned.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2" />
        <path d="M22 22L28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 14H17M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Strategy Blueprint",
    description: "Data-driven growth roadmap tailored to your industry, budget, and goals. Clear KPIs, realistic timelines.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M10 16H22M10 11H22M10 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Launch & Execute",
    description: "Campaigns go live with built-in testing frameworks. Every dollar tracked, every hypothesis measured.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L28 16L16 28L4 16L16 4Z" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Optimize & Scale",
    description: "Continuous optimization loop. Weekly reports, monthly strategy reviews, quarterly scaling decisions.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M6 26L12 16L18 20L26 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="26" cy="6" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export function ProcessSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="section-dark py-24 md:py-32 relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/10 to-transparent hidden lg:block" />

      <div ref={ref} className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="label-accent mb-4 block">
            <span className="w-2 h-2 rounded-full bg-accent" />
            How We Work
          </span>
          <h2
            className={cn(
              "text-display-lg font-display font-bold mb-6 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            From Audit to <span className="gradient-text italic">Scale</span>
          </h2>
          <p
            className={cn(
              "text-body-lg text-white/50 transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            A systematic 4-phase process that takes the guesswork out of growth.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className={cn(
                "relative group transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: isInView ? `${300 + i * 150}ms` : "0ms" }}
            >
              {/* Connecting line on desktop */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+2rem)] right-0 h-px bg-gradient-to-r from-accent/20 to-transparent" />
              )}

              <div className="glass-card p-8 h-full hover:border-accent/20 transition-all duration-500 text-center">
                {/* Number */}
                <span className="text-caption font-mono text-accent/30 mb-4 block">{step.number}</span>

                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/[0.08] border border-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/[0.15] group-hover:border-accent/20 transition-all duration-300">
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>

                {/* Description */}
                <p className="text-body-sm text-white/40">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
