"use client";

import Link from "next/link";
import { useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Growth",
    price: "$1,500",
    period: "/month",
    description: "Perfect for startups and small businesses ready to scale their digital presence.",
    features: [
      "1 Marketing Channel",
      "Monthly Strategy Calls",
      "Campaign Setup & Management",
      "Weekly Performance Reports",
      "Landing Page Recommendations",
      "Dedicated Account Manager",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Scale",
    price: "$3,500",
    period: "/month",
    description: "For growing businesses that need multi-channel marketing with aggressive scaling.",
    features: [
      "2-3 Marketing Channels",
      "Bi-Weekly Strategy Calls",
      "Advanced Campaign Architecture",
      "A/B Testing Framework",
      "Conversion Rate Optimization",
      "Custom Reporting Dashboard",
      "Creative Asset Production",
      "Competitor Monitoring",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Full-stack digital marketing for established brands with complex needs.",
    features: [
      "All Marketing Channels",
      "Weekly Strategy Sessions",
      "Dedicated Team of 3+",
      "Custom AI Optimization",
      "Landing Page Design & Dev",
      "Advanced Attribution Modeling",
      "Quarterly Business Reviews",
      "Priority Support & SLA",
      "Custom Integrations",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

const addOns = [
  { name: "Landing Page Design", price: "From $2,000", description: "High-converting landing pages with A/B testing" },
  { name: "SEO Content Package", price: "From $1,500/mo", description: "8 optimized blog posts + 2 pillar pages monthly" },
  { name: "Creative Production", price: "From $1,000/mo", description: "Video ads, static creatives, carousel designs" },
  { name: "Marketing Subscription", price: "From $4,997/mo", description: "Unlimited design + marketing requests" },
];

export function PricingContent() {
  const { ref, isInView } = useInView();
  const { ref: addRef, isInView: addInView } = useInView();

  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div ref={ref} className="container-wide text-center">
          <span className="label-accent mb-4 block">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Pricing
          </span>
          <h1
            className={cn(
              "text-display-xl font-display font-bold mb-6 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Transparent Pricing.
            <br />
            <span className="gradient-text italic">No Surprises.</span>
          </h1>
          <p
            className={cn(
              "text-body-lg text-white/50 max-w-2xl mx-auto transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            No long-term contracts. No hidden fees. Just results.
            Start with a free audit and choose the plan that fits.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="section-dark pb-24">
        <div className="container-wide">
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="section-darker py-24 md:py-32">
        <div ref={addRef} className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="label-accent mb-4 block">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Add-Ons
            </span>
            <h2
              className={cn(
                "text-display-lg font-display font-bold transition-all duration-700",
                addInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              Customize Your <span className="gradient-text italic">Stack</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, i) => (
              <div
                key={addon.name}
                className={cn(
                  "glass-card p-6 transition-all duration-500",
                  addInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: addInView ? `${200 + i * 100}ms` : "0ms" }}
              >
                <h3 className="text-lg font-bold text-white mb-1">{addon.name}</h3>
                <p className="text-accent font-semibold text-sm mb-3">{addon.price}</p>
                <p className="text-body-sm text-white/40">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-dark py-24 md:py-32">
        <div className="container-wide max-w-3xl mx-auto">
          <h2 className="text-display-lg font-display font-bold text-center mb-12">
            Pricing <span className="gradient-text italic">FAQ</span>
          </h2>
          <div className="space-y-4">
            {[
              { q: "Is there a setup fee?", a: "No. Setup, onboarding, and initial audit are included in every plan." },
              { q: "What if I need to cancel?", a: "Cancel anytime with 30 days notice. No penalties, no guilt trips." },
              { q: "Do prices include ad spend?", a: "No. Our fees are for management and strategy. Ad spend is separate and goes directly to the platforms." },
              { q: "Can I switch plans?", a: "Absolutely. Upgrade or downgrade anytime based on your needs." },
              { q: "What's included in the free audit?", a: "A comprehensive analysis of your current digital presence — ads, SEO, website, competitors — with actionable recommendations." },
            ].map((item, i) => (
              <details key={i} className="glass-card group">
                <summary className="p-6 cursor-pointer list-none flex items-center justify-between font-semibold text-white hover:text-accent transition-colors">
                  {item.q}
                  <svg className="w-5 h-5 text-white/30 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-body-sm text-white/40 border-t border-white/[0.04] pt-4">{item.a}</div>
              </details>
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
            Start With a <span className="italic">Free Audit</span>
          </h2>
          <p className="text-body-lg text-white/70 mb-8 max-w-xl mx-auto">
            No commitment required. We&apos;ll show you exactly what&apos;s possible before you spend a dime.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-navy-950 font-bold rounded-full hover:bg-cream transition-all duration-300 hover:-translate-y-1">
            Get Your Free Audit →
          </Link>
        </div>
      </section>
    </>
  );
}

function PlanCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col transition-all duration-700",
        plan.popular ? "lg:-mt-4 lg:mb-4" : "",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: isInView ? `${index * 150}ms` : "0ms" }}
    >
      {plan.popular && (
        <div className="text-center mb-3">
          <span className="px-4 py-1.5 bg-accent text-navy-950 text-xs font-bold uppercase tracking-wider rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <div
        className={cn(
          "glass-card flex-1 flex flex-col p-8",
          plan.popular ? "border-accent/30 shadow-glow-teal" : ""
        )}
      >
        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
        <div className="mb-4">
          <span className="text-display-md font-display font-bold gradient-text">{plan.price}</span>
          <span className="text-white/40 text-sm">{plan.period}</span>
        </div>
        <p className="text-body-sm text-white/40 mb-8">{plan.description}</p>

        <ul className="space-y-3 flex-1 mb-8">
          {plan.features.map((feat) => (
            <li key={feat} className="flex items-start gap-3 text-sm text-white/60">
              <svg className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.78 5.28l-4.5 5a.75.75 0 01-1.06.02l-2-1.88a.75.75 0 011.03-1.09l1.45 1.37 3.97-4.41a.75.75 0 011.11 1z" />
              </svg>
              {feat}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={cn(
            "w-full text-center justify-center",
            plan.popular ? "btn-gold" : "btn-outline"
          )}
        >
          {plan.cta}
        </Link>
      </div>
    </div>
  );
}
