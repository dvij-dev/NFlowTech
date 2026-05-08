'use client'

import Link from 'next/link'
import Image from 'next/image'
import { siteConfig, footerServices, certifications } from '@/data/site-data'

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06]" role="contentinfo">
      {/* CTA banner */}
      <div className="section-pad py-20 md:py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-sky-500/5 to-navy-950" />
        <div className="relative z-10">
          <span className="label mb-6">Open For Any Collaboration</span>
          <h2 className="text-display font-display font-bold text-white mt-6 mb-4">
            Book a free consultation now
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">
            Discover how we can help your business to thrive!
          </p>
          <Link href="/contact" className="btn-gold">
            Let&apos;s Get Connected
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>

      {/* Trust logos */}
      <div className="section-pad py-12 border-t border-white/[0.06]">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-40">
          {certifications.map((cert) => (
            <Image
              key={cert.name}
              src={cert.image}
              alt={cert.name}
              width={80}
              height={40}
              className="h-8 w-auto brightness-0 invert"
            />
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="section-pad py-16 border-t border-white/[0.06]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image src={siteConfig.icon} alt="NFlow" width={32} height={32} className="rounded-lg" />
              <span className="text-lg font-bold text-white">NFLOW</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-slate-500">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-6">Services</h4>
            <ul className="space-y-3">
              {footerServices.map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-6">Information</h4>
            <ul className="space-y-3">
              {[
                { label: 'Our Story', href: '/about' },
                { label: 'Career', href: '/careers' },
                { label: 'Success Stories', href: '/case-studies' },
                { label: 'Insights', href: '/insights' },
                { label: 'Contact', href: '/contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-6">Locations</h4>
            {siteConfig.locations.map((loc) => (
              <div key={loc.city} className="mb-4">
                <p className="text-sm text-slate-400 leading-relaxed">{loc.address}</p>
              </div>
            ))}
            <a href={`mailto:${siteConfig.email}`} className="text-sm text-sky-400 hover:text-sky-300 transition-colors">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="section-pad py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          Copyright © {new Date().getFullYear()} {siteConfig.legalName}. All Rights Reserved.
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms & Conditions', href: '/privacy' },
          ].map((l) => (
            <Link key={l.label} href={l.href} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
