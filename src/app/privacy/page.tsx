'use client'

import { siteConfig } from '@/data/site-data'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionLabel } from '@/components/SectionLabel'

export default function PrivacyPage() {
  return (
    <section className="section-pad pt-40 pb-32">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <SectionLabel>Legal</SectionLabel>
          <h1 className="text-display font-display font-bold text-white mb-8">Privacy Policy</h1>
        </AnimatedSection>

        <AnimatedSection delay={200} className="prose prose-invert prose-slate max-w-none">
          <div className="space-y-6 text-slate-400 leading-relaxed">
            <p>
              At {siteConfig.fullName}, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
              use, and safeguard your information when you visit our website.
            </p>
            <h3 className="text-white font-bold text-lg">Information We Collect</h3>
            <p>
              We may collect information you provide directly, such as your name, email address, phone number,
              and any other information you submit through our contact forms.
            </p>
            <h3 className="text-white font-bold text-lg">How We Use Your Information</h3>
            <p>
              We use the information we collect to respond to your inquiries, provide our services,
              improve our website, and send periodic emails regarding your project or other products and services.
            </p>
            <h3 className="text-white font-bold text-lg">Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-sky-400 hover:text-sky-300">{siteConfig.email}</a>.
            </p>
            <p className="text-sm text-slate-400">
              Copyright © {new Date().getFullYear()} {siteConfig.legalName}. All Rights Reserved.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
