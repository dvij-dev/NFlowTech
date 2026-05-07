import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Quote, CheckCircle2 } from 'lucide-react'
import { caseStudies, getCaseStudy } from '@/data/case-studies'
import { generatePageMetadata } from '@/lib/metadata'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import MetricCard from '@/components/ui/MetricCard'

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) return {}
  return generatePageMetadata({
    title: `${cs.name} Case Study — ${cs.industry}`,
    description: cs.description,
    path: `/case-studies/${slug}`,
  })
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = getCaseStudy(slug)
  if (!cs) notFound()

  return (
    <>
      <Breadcrumbs items={[
        { name: 'Case Studies', href: '/case-studies' },
        { name: cs.name, href: `/case-studies/${cs.slug}` },
      ]} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-brand-gray-50 to-brand-blue-light">
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="overline mb-3">{cs.industry} · {cs.location}</p>
            <h1 className="text-display-md sm:text-display-lg text-brand-navy mb-4">{cs.name}</h1>
            <p className="text-body-lg text-brand-gray-600 mb-6">{cs.description}</p>
            <div className="flex flex-wrap gap-2">
              {cs.services.map((svc) => (
                <span key={svc} className="px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-body-sm font-medium">
                  {svc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 bg-brand-navy">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cs.metrics.slice(0, 4).map((m) => (
              <MetricCard key={m.label} value={m.value} label={m.label} dark />
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="section-padding bg-white">
        <div className="section-container max-w-3xl">
          <div className="mb-12">
            <h2 className="text-display-sm text-brand-navy mb-4">The Challenge</h2>
            <p className="text-body-lg text-brand-gray-600 leading-relaxed">{cs.challenge}</p>
          </div>
          <div className="mb-12">
            <h2 className="text-display-sm text-brand-navy mb-4">Our Solution</h2>
            <p className="text-body-lg text-brand-gray-600 leading-relaxed">{cs.solution}</p>
          </div>
          {cs.metrics.length > 0 && (
            <div>
              <h2 className="text-display-sm text-brand-navy mb-6">Key Results</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cs.metrics.map((m) => (
                  <div key={m.label} className="flex items-start gap-3 p-4 rounded-xl bg-brand-gray-50">
                    <CheckCircle2 className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-heading-sm text-brand-navy font-bold">{m.value}</p>
                      <p className="text-body-sm text-brand-gray-600">{m.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonial */}
      {cs.testimonial && (
        <section className="section-padding bg-brand-gray-50">
          <div className="section-container max-w-3xl text-center">
            <Quote className="w-10 h-10 text-brand-blue/30 mx-auto mb-6" />
            <blockquote>
              <p className="text-heading-lg sm:text-display-sm font-display italic text-brand-navy leading-snug">
                &ldquo;{cs.testimonial.quote}&rdquo;
              </p>
            </blockquote>
            <div className="mt-6">
              <p className="text-heading-md text-brand-navy">{cs.testimonial.author}</p>
              <p className="text-body-sm text-brand-gray-500">{cs.testimonial.role}</p>
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-12 bg-white border-t border-brand-gray-100">
        <div className="section-container flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/case-studies" className="btn-ghost gap-2">
            <ArrowLeft className="w-4 h-4" /> All Case Studies
          </Link>
          <Link href="/contact" className="btn-primary gap-2">
            Get Similar Results <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
