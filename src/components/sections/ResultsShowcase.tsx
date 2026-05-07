"use client";

import Link from "next/link";
import { useInView, useCounter } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const results = [
  {
    client: "KindDesigns",
    industry: "E-Commerce / Jewelry",
    metric: "312%",
    metricLabel: "Revenue Growth",
    description: "Scaled from $50K to $206K monthly revenue with integrated PPC + SEO strategy",
    href: "/case-studies/kinddesigns",
  },
  {
    client: "Ocean Consulting",
    industry: "Professional Services",
    metric: "£460K",
    metricLabel: "Revenue from SEO",
    description: "Enterprise SEO strategy drove £460K in attributable revenue for luxury consulting",
    href: "/case-studies/ocean-consulting-llc",
  },
  {
    client: "Breezy Permits",
    industry: "Construction / SaaS",
    metric: "8.2x",
    metricLabel: "ROAS Achieved",
    description: "Turned a struggling Google Ads account into a lead-generation machine in 90 days",
    href: "/case-studies/breezy-permits",
  },
];

export function ResultsShowcase() {
  const { ref, isInView } = useInView();

  return (
    <section className="section-darker py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent/5 to-transparent pointer-events-none" />

      <div ref={ref} className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="label-accent mb-4 block">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Proof, Not Promises
          </span>
          <h2
            className={cn(
              "text-display-lg font-display font-bold mb-6 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Results That <span className="gradient-text italic">Hit Hard</span>
          </h2>
        </div>

        {/* Results grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {results.map((result, i) => (
            <Link
              key={i}
              href={result.href}
              className={cn(
                "group glass-card p-8 hover:border-accent/20 transition-all duration-500",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: isInView ? `${200 + i * 150}ms` : "0ms" }}
            >
              {/* Industry tag */}
              <span className="inline-block text-xs font-mono text-accent/50 border border-accent/10 rounded-full px-3 py-1 mb-6">
                {result.industry}
              </span>

              {/* Big metric */}
              <div className="mb-4">
                <div className="text-display-lg font-display font-bold gradient-text mb-1">
                  {result.metric}
                </div>
                <div className="text-body-sm text-white/50 font-semibold">
                  {result.metricLabel}
                </div>
              </div>

              {/* Client name */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                {result.client}
              </h3>

              {/* Description */}
              <p className="text-body-sm text-white/40 mb-6">{result.description}</p>

              {/* Read more */}
              <div className="flex items-center gap-2 text-sm text-accent/60 group-hover:text-accent transition-colors">
                Read Case Study
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M10 5L13 8L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          className={cn(
            "text-center transition-all duration-700 delay-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <Link href="/case-studies" className="btn-outline">
            View All Case Studies
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M10 5L13 8L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
