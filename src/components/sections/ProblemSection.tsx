"use client";

import { useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const problems = [
  {
    stat: "72%",
    text: "of ad budgets are wasted on underperforming campaigns",
    icon: "💸",
  },
  {
    stat: "3.2x",
    text: "more expensive to acquire a lead today vs. 2020",
    icon: "📈",
  },
  {
    stat: "68%",
    text: "of businesses can't attribute revenue to specific channels",
    icon: "🎯",
  },
];

export function ProblemSection() {
  const { ref, isInView } = useInView();

  return (
    <section className="section-darker py-24 md:py-32">
      <div ref={ref} className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="label-gold mb-4 block">
            <span className="w-2 h-2 rounded-full bg-gold" />
            The Problem
          </span>
          <h2
            className={cn(
              "text-display-lg font-display font-bold mb-6 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Your Competitors Are <span className="italic gradient-text-gold">Scaling.</span>
            <br />
            Are You?
          </h2>
          <p
            className={cn(
              "text-body-lg text-white/50 transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            The digital landscape got brutally competitive. Generic agencies run
            generic playbooks. The brands that win are the ones with a
            data-driven unfair advantage.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <div
              key={i}
              className={cn(
                "glass-card p-8 text-center group hover:border-gold/20 transition-all duration-500",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: isInView ? `${300 + i * 150}ms` : "0ms" }}
            >
              <div className="text-4xl mb-4">{problem.icon}</div>
              <div className="text-display-sm font-display font-bold gradient-text-gold mb-3">
                {problem.stat}
              </div>
              <p className="text-body-sm text-white/50">{problem.text}</p>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "text-center mt-16 transition-all duration-700 delay-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <p className="text-display-sm font-display font-semibold text-white/80">
            That&apos;s where <span className="gradient-text">NFlow</span> comes in.
          </p>
        </div>
      </div>
    </section>
  );
}
