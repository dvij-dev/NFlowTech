import { Metadata } from 'next'
import Link from 'next/link'
import { Download, CheckCircle2 } from 'lucide-react'
import { generatePageMetadata } from '@/lib/metadata'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = generatePageMetadata({
  title: 'Free E-book — Digital Marketing Playbook',
  description: 'Download our free e-book on data-driven digital marketing strategies. Learn how to improve your PPC, SEO, and social media campaigns.',
  path: '/ebook',
})

export default function EbookPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Free E-book', href: '/ebook' }]} />
      <section className="section-padding bg-gradient-to-br from-brand-gray-50 to-brand-blue-light">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <p className="overline mb-4">Free Resource</p>
              <h1 className="text-display-md sm:text-display-lg text-brand-navy mb-4">The Data-Driven Marketing Playbook</h1>
              <p className="text-body-lg text-brand-gray-600 mb-8">Our comprehensive guide covers the strategies and tactics we use to drive 5x ROAS for our clients. Get actionable frameworks you can implement today.</p>
              <ul className="space-y-3 mb-8">
                {['PPC optimization frameworks', 'SEO content strategy templates', 'Social media audience targeting playbook', 'Conversion rate optimization checklist', 'Real campaign data and benchmarks'].map((item) => (
                  <li key={item} className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-accent-green flex-shrink-0" /><span className="text-body-md text-brand-gray-700">{item}</span></li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary gap-2"><Download className="w-4 h-4" /> Download Free E-book</Link>
            </div>
            <div className="bg-brand-navy rounded-2xl p-12 flex items-center justify-center">
              <div className="text-center"><p className="text-6xl mb-4">📘</p><p className="text-heading-lg text-white">The Data-Driven Marketing Playbook</p><p className="text-body-sm text-brand-gray-400 mt-2">By NFlow Tech</p></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
