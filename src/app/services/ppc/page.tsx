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

const service = getService('ppc')!

export const metadata: Metadata = generatePageMetadata({
  title: 'PPC Management Agency — Pay-Per-Click Advertising',
  description: service.description,
  path: '/services/ppc',
})

export default function PPCPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: service.name, description: service.description, url: '/services/ppc' })} />
      <Breadcrumbs items={[{ name: 'Services', href: '/services/ppc' }, { name: 'PPC Advertising', href: '/services/ppc' }]} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-brand-gray-50 to-brand-blue-light">
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="overline mb-4">PPC Advertising</p>
            <h1 className="text-display-md sm:text-display-lg text-brand-navy mb-6">
              {service.tagline}
            </h1>
            <p className="text-body-lg text-brand-gray-600 mb-8">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary gap-2">
                Get Your Free PPC Audit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/case-studies" className="btn-secondary">
                View PPC Results
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 bg-brand-navy">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MetricCard value="138+" label="Brands Managed" dark />
            <MetricCard value="5x" label="Average ROAS" dark />
            <MetricCard value="-42%" label="Avg. CPA Reduction" dark />
            <MetricCard value="$10M+" label="Ad Spend Managed" dark />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <p className="overline mb-3">What&apos;s Included</p>
            <h2 className="text-display-sm sm:text-display-md text-brand-navy mb-4">
              Full-Service PPC Management
            </h2>
            <p className="text-body-lg text-brand-gray-600 mb-10">
              Our PPC service covers every aspect of paid search and display advertising. We handle strategy, setup, optimization, and reporting so you can focus on running your business.
            </p>
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

      {/* CTA */}
      <section className="section-padding bg-brand-blue">
        <div className="section-container text-center">
          <h2 className="text-display-sm sm:text-display-md text-white mb-4">
            Ready to Lower Your CPA?
          </h2>
          <p className="text-body-lg text-white/80 max-w-2xl mx-auto mb-8">
            Get a free PPC audit and discover exactly where your ad spend is being wasted. We&apos;ll show you the opportunities you&apos;re missing.
          </p>
          <Link href="/contact" className="btn bg-white text-brand-blue px-8 py-4 hover:bg-brand-gray-50 font-semibold">
            Schedule Your Free Audit
          </Link>
        </div>
      </section>
    </>
  )
}
