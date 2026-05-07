import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { generatePageMetadata } from '@/lib/metadata'
import { getService } from '@/data/services'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import JsonLd from '@/components/layout/JsonLd'
import { serviceSchema } from '@/lib/schema'
import FAQSection from '@/components/ui/FAQSection'
import MetricCard from '@/components/ui/MetricCard'

const service = getService('social-media')!

export const metadata: Metadata = generatePageMetadata({
  title: 'Social Media Advertising Agency — Paid Social Campaigns',
  description: service.description,
  path: '/services/social-media',
})

export default function SocialMediaPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: service.name, description: service.description, url: '/services/social-media' })} />
      <Breadcrumbs items={[{ name: 'Services', href: '/services/ppc' }, { name: 'Social Media Ads', href: '/services/social-media' }]} />

      <section className="section-padding bg-gradient-to-br from-brand-gray-50 to-brand-blue-light">
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="overline mb-4">Social Media Advertising</p>
            <h1 className="text-display-md sm:text-display-lg text-brand-navy mb-6">{service.tagline}</h1>
            <p className="text-body-lg text-brand-gray-600 mb-8">{service.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary gap-2">Get Your Free Social Audit <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/case-studies" className="btn-secondary">View Social Results</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-navy">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MetricCard value="4.5x" label="Average ROAS" dark />
            <MetricCard value="85+" label="Active Campaigns" dark />
            <MetricCard value="2.1M+" label="Monthly Impressions" dark />
            <MetricCard value="-35%" label="Avg. CPA Reduction" dark />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <p className="overline mb-3">What&apos;s Included</p>
            <h2 className="text-display-sm sm:text-display-md text-brand-navy mb-4">Full-Service Social Ad Management</h2>
            <p className="text-body-lg text-brand-gray-600 mb-10">We manage every aspect of your paid social campaigns across Meta, TikTok, LinkedIn, and Pinterest — from creative strategy to conversion tracking.</p>
            <div className="space-y-4">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 p-4 rounded-xl bg-brand-gray-50">
                  <CheckCircle2 className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                  <p className="text-body-md text-brand-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={service.faqs} />

      <section className="section-padding bg-brand-blue">
        <div className="section-container text-center">
          <h2 className="text-display-sm sm:text-display-md text-white mb-4">Ready to Scale Your Social Ads?</h2>
          <p className="text-body-lg text-white/80 max-w-2xl mx-auto mb-8">Get a free social media audit and discover the audiences and creatives that will drive your next wave of growth.</p>
          <Link href="/contact" className="btn bg-white text-brand-blue px-8 py-4 hover:bg-brand-gray-50 font-semibold">Schedule Your Free Audit</Link>
        </div>
      </section>
    </>
  )
}
