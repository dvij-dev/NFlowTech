"use client";

import Link from "next/link";
import { useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const caseStudies = [
  {
    client: "KindDesigns",
    industry: "E-Commerce / Jewelry",
    metric: "312%",
    metricLabel: "Revenue Growth",
    services: ["PPC", "SEO"],
    description: "Scaled from $50K to $206K monthly revenue with integrated PPC + SEO strategy in 6 months.",
    slug: "kinddesigns",
  },
  {
    client: "Ocean Consulting",
    industry: "Professional Services",
    metric: "£460K",
    metricLabel: "Revenue from SEO",
    services: ["SEO", "Content"],
    description: "Enterprise SEO strategy drove £460K in attributable revenue for luxury consulting firm.",
    slug: "ocean-consulting-llc",
  },
  {
    client: "Breezy Permits",
    industry: "Construction / SaaS",
    metric: "8.2x",
    metricLabel: "ROAS",
    services: ["PPC", "Landing Pages"],
    description: "Turned a struggling Google Ads account into a lead-generation machine in 90 days.",
    slug: "breezy-permits",
  },
  {
    client: "Tonic Studios",
    industry: "Crafts / E-Commerce",
    metric: "245%",
    metricLabel: "ROAS Improvement",
    services: ["PPC", "Shopping"],
    description: "Rebuilt Shopping campaigns and Performance Max strategy for a global crafts brand.",
    slug: "tonic-studios",
  },
  {
    client: "Gallant",
    industry: "Pet / D2C",
    metric: "189%",
    metricLabel: "Lead Gen Growth",
    services: ["Social", "PPC"],
    description: "Combined Meta Ads and Google Ads strategy to drive pet supplement subscriptions.",
    slug: "gallant",
  },
  {
    client: "Royal Plaza",
    industry: "Hospitality",
    metric: "156%",
    metricLabel: "Direct Bookings",
    services: ["SEO", "PPC", "Social"],
    description: "Full-stack digital strategy increased direct bookings and reduced OTA dependency.",
    slug: "royal-plaza",
  },
  {
    client: "Saitech Inc",
    industry: "IT Services",
    metric: "4.7x",
    metricLabel: "Lead Volume",
    services: ["PPC", "SEO"],
    description: "B2B lead generation campaign for enterprise IT services company.",
    slug: "saitech-inc",
  },
  {
    client: "La Vie MD",
    industry: "Healthcare / MedSpa",
    metric: "340%",
    metricLabel: "Patient Inquiries",
    services: ["PPC", "Social", "SEO"],
    description: "Multi-channel strategy for luxury medical spa driving high-value patient acquisition.",
    slug: "la-vie-md",
  },
  {
    client: "Parsemus Foundation",
    industry: "Nonprofit (Pro Bono)",
    metric: "10x",
    metricLabel: "Donation Growth",
    services: ["PPC", "Social"],
    description: "Pro bono Google Ad Grants management and Meta Ads for medical research nonprofit.",
    slug: "parsemus-foundation-pro-bono",
  },
];

export function CaseStudiesContent() {
  const { ref, isInView } = useInView();

  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div ref={ref} className="container-wide">
          <span className="label-accent mb-4 block">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Case Studies
          </span>
          <h1
            className={cn(
              "text-display-xl font-display font-bold mb-6 max-w-4xl transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Proof, Not <span className="gradient-text italic">Promises</span>
          </h1>
          <p
            className={cn(
              "text-body-lg text-white/50 max-w-2xl transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Real results from real clients across 27+ industries.
            Every metric verified. Every story worth telling.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-dark pb-24 md:pb-32">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <CaseStudyCard key={cs.slug} study={cs} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-dark via-accent to-accent-light" />
        <div className="absolute inset-0 bg-navy-950/40" />
        <div className="container-wide relative z-10 text-center">
          <h2 className="text-display-md font-display font-bold text-white mb-6">
            Want Results <span className="italic">Like These?</span>
          </h2>
          <p className="text-body-lg text-white/70 mb-8 max-w-xl mx-auto">
            Your competitors already started. Let&apos;s build your unfair advantage.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-navy-950 font-bold rounded-full hover:bg-cream transition-all duration-300 hover:-translate-y-1">
            Get Your Free Audit →
          </Link>
        </div>
      </section>
    </>
  );
}

function CaseStudyCard({ study, index }: { study: typeof caseStudies[0]; index: number }) {
  const { ref, isInView } = useInView<HTMLAnchorElement>();

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      ref={ref}
      className={cn(
        "group glass-card p-8 flex flex-col hover:border-accent/20 transition-all duration-500",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: isInView ? `${(index % 3) * 100}ms` : "0ms" }}
    >
      {/* Services tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {study.services.map((s) => (
          <span key={s} className="px-2.5 py-1 text-xs font-mono text-accent/60 border border-accent/10 rounded-full">
            {s}
          </span>
        ))}
        <span className="px-2.5 py-1 text-xs font-mono text-white/30 border border-white/[0.06] rounded-full">
          {study.industry}
        </span>
      </div>

      {/* Metric */}
      <div className="mb-4">
        <div className="text-display-md font-display font-bold gradient-text">{study.metric}</div>
        <div className="text-body-sm text-white/50 font-medium">{study.metricLabel}</div>
      </div>

      {/* Client */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
        {study.client}
      </h3>

      {/* Description */}
      <p className="text-body-sm text-white/40 flex-1">{study.description}</p>

      {/* Read more */}
      <div className="flex items-center gap-2 text-sm text-accent/60 group-hover:text-accent transition-colors mt-6 pt-4 border-t border-white/[0.04]">
        Read Full Case Study
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
          <path d="M3 8H13M10 5L13 8L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}
