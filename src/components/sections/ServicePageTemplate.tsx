"use client";

import Link from "next/link";
import Image from "next/image";
import { useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface ServicePageProps {
  label: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  description: string;
  heroImage: string;
  features: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
  stats: { value: string; label: string }[];
  faq: { q: string; a: string }[];
}

export function ServicePageTemplate({
  label, title, titleAccent, subtitle, description, heroImage,
  features, process, stats, faq,
}: ServicePageProps) {
  const { ref: heroRef, isInView: heroInView } = useInView();
  const { ref: featRef, isInView: featInView } = useInView();
  const { ref: procRef, isInView: procInView } = useInView();
  const { ref: faqRef, isInView: faqInView } = useInView();

  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-32 pb-20 md:pt-40 md:pb-28 relative">
        <div className="absolute inset-0">
          <Image src={heroImage} alt="" fill className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/50 to-navy-950" />
        </div>

        <div ref={heroRef} className="container-wide relative z-10">
          <span className="label-accent mb-4 block">
            <span className="w-2 h-2 rounded-full bg-accent" />
            {label}
          </span>
          <h1
            className={cn(
              "text-display-xl font-display font-bold mb-6 max-w-4xl transition-all duration-700",
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {title}
            <br />
            <span className="gradient-text italic">{titleAccent}</span>
          </h1>
          <p
            className={cn(
              "text-body text-accent/70 font-medium mb-4 transition-all duration-700 delay-100",
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {subtitle}
          </p>
          <p
            className={cn(
              "text-body-lg text-white/50 max-w-2xl mb-10 transition-all duration-700 delay-200",
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {description}
          </p>
          <div
            className={cn(
              "flex flex-wrap gap-4 transition-all duration-700 delay-300",
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <Link href="/contact" className="btn-gold">Get Started →</Link>
            <Link href="/case-studies" className="btn-outline">See Results</Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="section-darker py-12 border-y border-white/[0.04]">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-display-sm font-display font-bold gradient-text">{stat.value}</div>
                <div className="text-body-sm text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-dark py-24 md:py-32">
        <div ref={featRef} className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="label-accent mb-4 block">
              <span className="w-2 h-2 rounded-full bg-accent" />
              What&apos;s Included
            </span>
            <h2
              className={cn(
                "text-display-lg font-display font-bold transition-all duration-700",
                featInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              Everything You <span className="gradient-text italic">Need</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className={cn(
                  "glass-card p-8 group hover:border-accent/20 transition-all duration-500",
                  featInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: featInView ? `${200 + i * 80}ms` : "0ms" }}
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/10 flex items-center justify-center text-accent mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm4.72 6.6l-5.62 6.25a.94.94 0 01-1.33.02l-2.5-2.35a.94.94 0 011.29-1.37l1.81 1.71 4.96-5.51a.94.94 0 011.39 1.25z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">{feat.title}</h3>
                <p className="text-body-sm text-white/40">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-darker py-24 md:py-32">
        <div ref={procRef} className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="label-accent mb-4 block">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Our Process
            </span>
            <h2
              className={cn(
                "text-display-lg font-display font-bold transition-all duration-700",
                procInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              How We <span className="gradient-text italic">Deliver Results</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {process.map((step, i) => (
              <div
                key={i}
                className={cn(
                  "glass-card p-8 flex gap-6 items-start transition-all duration-500",
                  procInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: procInView ? `${200 + i * 100}ms` : "0ms" }}
              >
                <span className="text-display-sm font-display font-bold gradient-text flex-shrink-0">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-body-sm text-white/40">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-dark py-24 md:py-32">
        <div ref={faqRef} className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className={cn(
                  "text-display-lg font-display font-bold transition-all duration-700",
                  faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                Frequently <span className="gradient-text italic">Asked</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faq.map((item, i) => (
                <details
                  key={i}
                  className={cn(
                    "glass-card group transition-all duration-500",
                    faqInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: faqInView ? `${200 + i * 80}ms` : "0ms" }}
                >
                  <summary className="p-6 cursor-pointer list-none flex items-center justify-between font-semibold text-white hover:text-accent transition-colors">
                    {item.q}
                    <svg className="w-5 h-5 text-white/30 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-body-sm text-white/40 border-t border-white/[0.04] pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-dark via-accent to-accent-light" />
        <div className="absolute inset-0 bg-navy-950/40" />
        <div className="container-wide relative z-10 text-center">
          <h2 className="text-display-md font-display font-bold text-white mb-6">
            Ready to <span className="italic">Get Started?</span>
          </h2>
          <p className="text-body-lg text-white/70 mb-8 max-w-xl mx-auto">
            Free audit, no contracts, results in 60 days. Let&apos;s build your growth engine.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-navy-950 font-bold rounded-full hover:bg-cream transition-all duration-300 hover:-translate-y-1">
            Get Your Free Audit →
          </Link>
        </div>
      </section>
    </>
  );
}
