"use client";

import Link from "next/link";
import { useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const services = [
  {
    number: "01",
    title: "PPC Marketing",
    description:
      "Google Ads, Meta Ads, and programmatic campaigns engineered for maximum ROAS. We don't just manage — we architect growth.",
    href: "/services/ppc",
    metrics: ["5x Avg. ROAS", "138+ Brands"],
    color: "accent",
  },
  {
    number: "02",
    title: "SEO",
    description:
      "Enterprise-grade organic strategy built for humans and search engines. Rank higher, convert more, own your niche.",
    href: "/services/seo",
    metrics: ["460K+ Revenue Driven", "Page 1 Rankings"],
    color: "accent",
  },
  {
    number: "03",
    title: "Social Media",
    description:
      "Paid social that actually converts. Behavior-based targeting, daily optimization loops, and creative that stops the scroll.",
    href: "/services/social-media",
    metrics: ["3.2x Lead Gen", "Daily Optimization"],
    color: "accent",
  },
  {
    number: "04",
    title: "Web Design",
    description:
      "Conversion-led design that doesn't just look good — it performs. Built around marketing goals, optimized for speed.",
    href: "/services/web-design",
    metrics: ["Speed Optimized", "Conversion Focused"],
    color: "accent",
  },
];

export function ServicesOverview() {
  const { ref, isInView } = useInView();

  return (
    <section className="section-dark py-24 md:py-32">
      <div ref={ref} className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="label-accent mb-4 block">
              <span className="w-2 h-2 rounded-full bg-accent" />
              What We Do
            </span>
            <h2
              className={cn(
                "text-display-lg font-display font-bold transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              Full-Stack Digital
              <br />
              <span className="gradient-text italic">Marketing Arsenal</span>
            </h2>
          </div>
          <p
            className={cn(
              "text-body text-white/50 max-w-md transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Every service is interconnected. Every tactic data-driven. 
            We don&apos;t do silos — we build integrated growth engines.
          </p>
        </div>

        {/* Service Cards */}
        <div className="space-y-4">
          {services.map((service, i) => (
            <Link
              key={service.number}
              href={service.href}
              className={cn(
                "group block glass-card p-8 md:p-10 hover:border-accent/20 transition-all duration-500",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: isInView ? `${200 + i * 100}ms` : "0ms" }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                {/* Number */}
                <span className="text-caption text-accent/40 font-mono">{service.number}</span>

                {/* Title */}
                <h3 className="text-display-sm font-display font-bold text-white group-hover:text-accent transition-colors flex-shrink-0 md:w-56">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-body-sm text-white/40 group-hover:text-white/60 transition-colors flex-1">
                  {service.description}
                </p>

                {/* Metrics */}
                <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
                  {service.metrics.map((m, j) => (
                    <span
                      key={j}
                      className="px-3 py-1.5 text-xs font-mono text-accent/60 border border-accent/10 rounded-full"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                  <svg className="w-4 h-4 text-white/40 group-hover:text-accent group-hover:translate-x-0.5 transition-all" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M10 5L13 8L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
