'use client'

import Link from 'next/link'
import { services, siteConfig } from '@/data/site-data'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionLabel } from '@/components/SectionLabel'
import { Breadcrumb } from '@/components/Breadcrumb'

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-purple-500/[0.05] rounded-full blur-[140px]" />
        <div className="relative z-10 max-w-3xl">
          <AnimatedSection>
            <SectionLabel>What We Do</SectionLabel>
            <h1 className="text-display font-display font-bold text-white mb-6">
              Digital Marketing Services{' '}
              <span className="gradient-text">That Grow Your Business</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              We offer end-to-end digital marketing services, including PPC, SEO, and SEM,
              focused on driving qualified traffic, generating leads, and maximizing ROAS.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Deep Dive */}
      <section className="section-pad section-y">
        <div className="space-y-24">
          {services.map((service, i) => (
            <AnimatedSection key={service.id} className="relative">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content side */}
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl font-display font-bold opacity-10" style={{ color: service.color }}>
                      {service.number}
                    </span>
                    <div className="h-px flex-1 bg-white/[0.06]" />
                  </div>
                  <h2 className="text-heading font-display font-bold text-white mb-2">{service.title}</h2>
                  <p className="text-sky-400 font-medium text-sm uppercase tracking-wider mb-6">{service.subtitle}</p>
                  <p className="text-slate-400 leading-relaxed mb-8">{service.description}</p>

                  {/* Capabilities */}
                  <div className="space-y-3">
                    {service.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: `${service.color}20` }}>
                          <svg className="w-3 h-3" style={{ color: service.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white font-medium">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual side */}
                <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div
                    className="glass-card p-12 flex flex-col items-center justify-center aspect-square max-w-sm mx-auto"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${service.color}10, transparent 70%)`,
                      borderColor: `${service.color}15`,
                    }}
                  >
                    <div
                      className="text-8xl font-display font-bold mb-4"
                      style={{ color: service.color, opacity: 0.8 }}
                    >
                      {service.number}
                    </div>
                    <h3 className="text-xl font-bold text-white text-center">{service.title}</h3>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {service.capabilities.map((cap) => (
                        <span key={cap} className="px-3 py-1 text-xs rounded-full border border-white/10 text-slate-400">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-pad section-y text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/[0.04] to-amber-500/[0.04]" />
        <AnimatedSection className="relative z-10">
          <h2 className="text-heading font-display font-bold text-white mb-4">
            Ready to grow your business?
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-8">
            Get a free consultation and discover which services fit your business goals.
          </p>
          <Link href="/contact" className="btn-gold">
            Get Free Consultation
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </AnimatedSection>
      </section>
    </>
  )
}
