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

const service = getService('seo')!

export const metadata: Metadata = generatePageMetadata({
  title: 'SEO Agency — AI-Powered Search Engine Optimization Services',
  description: service.description,
  path: '/services/seo',
})

export default function SEOPage() {
  return (
    <>
      <JsonLd data={serviceSchema({ name: service.name, description: service.description, url: '/services/seo' })} />
      <Breadcrumbs items={[{ name: 'Services', href: '/services/ppc' }, { name: 'SEO', href: '/services/seo' }]} />

      <section className="section-padding bg-gradient-to-br from-brand-gray-50 to-brand-blue-light">
        <div className="section-container"><div className="max-w-3xl">
          <p className="overline mb-4">Search Engine Optimization</p>
          <h1 className="text-display-md sm:text-display-lg text-brand-navy mb-6">{service.tagline}</h1>
          <p className="text-body-lg text-brand-gray-600 mb-8">{service.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-primary gap-2">Get Your Free SEO Audit <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/case-studies" className="btn-secondary">View SEO Results</Link>
          </div>
        </div></div>
      </section>

      <section className="py-12 bg-brand-navy">
        <div className="section-container"><div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <MetricCard value="350%" label="Avg. Traffic Growth" dark />
          <MetricCard value="48%" label="Avg. Organic Share" dark />
          <MetricCard value="200K+" label="Keywords Tracked" dark />
          <MetricCard value="90+" label="Clients Ranked Page 1" dark />
        </div></div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container"><div className="max-w-3xl mx-auto">
          <p className="overline mb-3">What&apos;s Included</p>
          <h2 className="text-display-sm sm:text-display-md text-brand-navy mb-4">Comprehensive SEO Services</h2>
          <p className="text-body-lg text-brand-gray-600 mb-10">Our SEO service combines technical optimization, content strategy, and authority building to deliver sustainable organic growth that compounds over time.</p>
          <div className="space-y-4">
            {service.features.map((f) => (<div key={f} className="flex items-start gap-3 p-4 rounded-xl bg-brand-gray-50"><CheckCircle2 className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" /><p className="text-body-md text-brand-gray-700">{f}</p></div>))}
          </div>
        </div></div>
      </section>

      <FAQSection faqs={service.faqs} />

      <section className="section-padding bg-brand-blue">
        <div className="section-container text-center">
          <h2 className="text-display-sm sm:text-display-md text-white mb-4">Ready to Dominate Search Results?</h2>
          <p className="text-body-lg text-white/80 max-w-2xl mx-auto mb-8">Get a free SEO audit and discover the keywords and content gaps holding your organic traffic back.</p>
          <Link href="/contact" className="btn bg-white text-brand-blue px-8 py-4 hover:bg-brand-gray-50 font-semibold">Schedule Your Free Audit</Link>
        </div>
      </section>
    </>
  )
}
