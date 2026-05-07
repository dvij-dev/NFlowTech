"use client";

import Link from "next/link";
import Image from "next/image";
import { useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const services = [
  {
    number: "01",
    title: "PPC Marketing",
    subtitle: "Google Ads · Meta Ads · Programmatic",
    description: "Intent-based targeting, AI-powered bidding, and relentless optimization. We architect paid campaigns that turn clicks into customers — not just traffic.",
    features: ["Google Ads Management", "Meta/Facebook Ads", "Shopping & Performance Max", "Retargeting & Lookalikes", "Landing Page Optimization", "Conversion Tracking"],
    href: "/services/ppc",
    color: "accent",
  },
  {
    number: "02",
    title: "SEO Services",
    subtitle: "Technical · On-Page · Content · Local",
    description: "Enterprise-grade organic strategy built for humans and search engines. We build sustainable visibility that compounds over time.",
    features: ["Technical SEO Audits", "Content Strategy", "Link Building", "Local SEO", "E-Commerce SEO", "AI/AEO Optimization"],
    href: "/services/seo",
    color: "accent",
  },
  {
    number: "03",
    title: "Social Media Marketing",
    subtitle: "Paid Social · Organic · Influencer",
    description: "Behavior-based targeting with creative that stops the scroll. We build communities that convert, not just engage.",
    features: ["Paid Social Campaigns", "Community Management", "Content Creation", "Influencer Partnerships", "Social Commerce", "Analytics & Reporting"],
    href: "/services/social-media",
    color: "accent",
  },
  {
    number: "04",
    title: "Web Design & Development",
    subtitle: "UX/UI · Development · CRO",
    description: "Conversion-led design that doesn't just look premium — it performs. Every pixel serves a purpose.",
    features: ["Custom Web Design", "E-Commerce Stores", "Landing Pages", "Speed Optimization", "A/B Testing", "Mobile-First Development"],
    href: "/services/web-design",
    color: "accent",
  },
];

export function ServicesContent() {
  const { ref, isInView } = useInView();

  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-32 pb-16 md:pt-40 md:pb-20 relative">
        <div className="absolute inset-0">
          <Image src="/images/hero/services-bg.png" alt="" fill className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/50 to-navy-950" />
        </div>

        <div ref={ref} className="container-wide relative z-10">
          <span className="label-accent mb-4 block">Our Services</span>
          <h1
            className={cn(
              "text-display-xl font-display font-bold mb-6 max-w-4xl transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Full-Stack Digital
            <br />
            <span className="gradient-text italic">Marketing Arsenal</span>
          </h1>
          <p
            className={cn(
              "text-body-lg text-white/50 max-w-2xl transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Every service is interconnected. Every tactic data-driven.
            We don&apos;t do silos — we build integrated growth engines that compound.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="section-dark pb-24 md:pb-32">
        <div className="container-wide space-y-8">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-dark via-accent to-accent-light" />
        <div className="absolute inset-0 bg-navy-950/40" />
        <div className="container-wide relative z-10 text-center">
          <h2 className="text-display-md font-display font-bold text-white mb-6">
            Not Sure Which Service <span className="italic">You Need?</span>
          </h2>
          <p className="text-body-lg text-white/70 mb-8 max-w-xl mx-auto">
            Start with a free audit. We&apos;ll analyze your current setup and recommend the best strategy for your goals.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-navy-950 font-bold rounded-full hover:bg-cream transition-all duration-300 hover:-translate-y-1">
            Get Your Free Audit →
          </Link>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        "glass-card overflow-hidden transition-all duration-700",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: isInView ? `${index * 100}ms` : "0ms" }}
    >
      <div className="p-8 md:p-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left */}
          <div className="lg:w-1/2">
            <span className="text-caption font-mono text-accent/40 mb-4 block">{service.number}</span>
            <h2 className="text-display-md font-display font-bold text-white mb-2">{service.title}</h2>
            <p className="text-sm text-accent/60 font-medium mb-6">{service.subtitle}</p>
            <p className="text-body text-white/50 mb-8">{service.description}</p>
            <Link href={service.href} className="btn-primary">
              Learn More
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M10 5L13 8L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Right - Features */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-3">
              {service.features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]"
                >
                  <svg className="w-4 h-4 text-accent flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.78 5.28l-4.5 5a.75.75 0 01-1.06.02l-2-1.88a.75.75 0 011.03-1.09l1.45 1.37 3.97-4.41a.75.75 0 011.11 1z" />
                  </svg>
                  <span className="text-sm text-white/60">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
