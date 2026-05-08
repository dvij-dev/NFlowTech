'use client'

import { useState } from 'react'
import { siteConfig } from '@/data/site-data'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionLabel } from '@/components/SectionLabel'
import { Breadcrumb } from '@/components/Breadcrumb'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const subject = encodeURIComponent('New Inquiry from ' + data.get('fname') + ' ' + data.get('lname'))
    const body = encodeURIComponent(
      'Name: ' + data.get('fname') + ' ' + data.get('lname') + '\n' +
      'Email: ' + data.get('email') + '\n' +
      'Phone: ' + data.get('phone') + '\n' +
      'Website: ' + data.get('website') + '\n' +
      'Industry: ' + data.get('industry') + '\n\n' +
      'Message:\n' + data.get('message')
    )
    window.open('mailto:' + siteConfig.email + '?subject=' + subject + '&body=' + body)
    setSubmitted(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="section-pad pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-sky-500/[0.05] rounded-full blur-[140px]" />
        <div className="relative z-10 max-w-3xl">
          <AnimatedSection>
            <SectionLabel>Get In Touch</SectionLabel>
            <h1 className="text-display font-display font-bold text-white mb-6">
              We&apos;d Absolutely Love To Hear From You{' '}
              <span className="gradient-text">Let&apos;s Connect!</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Start the conversation today — your next big opportunity could begin right here with us.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad pb-32">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Contact Info */}
          <AnimatedSection direction="right" className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <p className="text-slate-300 leading-relaxed mb-6">
                  They say success follows when we move forward together, so let&apos;s connect and start building that journey. We&apos;d love to hear from you.
                </p>
                <p className="text-sky-400 font-medium mb-1">Got a thought? A Hello is all it takes to start.</p>
                <p className="text-sm text-slate-400">No pitches. No delays. Just meaningful conversations and real solutions.</p>
              </div>

              <div className="space-y-4">
                <div className="glass-card p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Phone</p>
                    <a href={`tel:${siteConfig.phone}`} className="text-white font-medium hover:text-sky-400 transition-colors">{siteConfig.phone}</a>
                  </div>
                </div>

                <div className="glass-card p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-white font-medium hover:text-sky-400 transition-colors">{siteConfig.email}</a>
                  </div>
                </div>

                {siteConfig.locations.map((loc) => (
                  <div key={loc.city} className="glass-card p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">{loc.city}, {loc.country}</p>
                      <p className="text-sm text-white/80 mt-1">{loc.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection direction="left" className="lg:col-span-3">
            <div className="glass-card p-8 md:p-10">
              <h3 className="text-xl font-bold text-white mb-6">Send us a message</h3>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="fname" className="block text-sm text-slate-400 mb-2">First Name*</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/20 transition-colors"
                      id="fname" name="fname" placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lname" className="block text-sm text-slate-400 mb-2">Last Name*</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/20 transition-colors"
                      id="lname" name="lname" placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-slate-400 mb-2">Email*</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/20 transition-colors"
                    id="email" name="email" placeholder="john@example.com"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm text-slate-400 mb-2">Phone Number*</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/20 transition-colors"
                      id="phone" name="phone" placeholder="+1 (234) 567-8900"
                    />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm text-slate-400 mb-2">Website*</label>
                    <input
                      type="url"
                      className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/20 transition-colors"
                      id="website" name="website" placeholder="https://example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm text-slate-400 mb-2">Industry*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/20 transition-colors"
                    id="industry" name="industry" placeholder="E-commerce, SaaS, Healthcare..."
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-slate-400 mb-2">Message*</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/20 transition-colors resize-none"
                    id="message" name="message" placeholder="Tell us about your project..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  Submit Form
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </form>
              {submitted && (
                <div className="mt-6 p-6 glass-card text-center">
                  <p className="text-lg text-sky-400 font-medium mb-2">✓ Opening your email client</p>
                  <p className="text-sm text-slate-400">If it didn&apos;t open, email us directly at <a href={'mailto:' + siteConfig.email} className="text-sky-400 hover:underline">{siteConfig.email}</a></p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
