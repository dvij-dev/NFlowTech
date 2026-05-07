import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { generatePageMetadata } from '@/lib/metadata'
import { caseStudies } from '@/data/case-studies'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = generatePageMetadata({
  title: 'Case Studies — Marketing Success Stories',
  description:
    'See how our AI-driven strategies helped businesses generate more leads and sales. Discover what is possible for your business.',
  path: '/case-studies',
})

export default function CaseStudiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Case Studies', href: '/case-studies' }]} />

      <section className="section-padding bg-gradient-to-br from-brand-gray-50 to-white">
        <div className="section-container">
          <div className="max-w-3xl mb-14">
            <p className="overline mb-4">Case Studies</p>
            <h1 className="text-display-md sm:text-display-lg text-brand-navy mb-4">
              Success Stories That Speak
            </h1>
            <p className="text-body-lg text-brand-gray-600">
              Real results from real brands. See how we&apos;ve helped businesses across 27+ industries achieve measurable growth through data-driven marketing strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="card group hover:border-brand-blue/30 flex flex-col"
              >
                <div className="w-full h-48 rounded-xl bg-brand-gray-100 mb-5 flex items-center justify-center">
                  <span className="text-brand-gray-400 text-heading-lg font-display">{cs.name.charAt(0)}</span>
                </div>
                <p className="text-caption text-brand-blue font-medium uppercase tracking-wider mb-2">
                  {cs.industry}
                </p>
                <h2 className="text-heading-lg text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                  {cs.name}
                </h2>
                <p className="text-body-sm text-brand-gray-600 mb-5 flex-1 line-clamp-2">
                  {cs.description}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {cs.metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="bg-brand-gray-50 rounded-lg p-3">
                      <p className="text-heading-sm text-brand-navy font-bold">{m.value}</p>
                      <p className="text-caption text-brand-gray-500">{m.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-brand-blue text-body-sm font-semibold">
                  View Case Study
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
