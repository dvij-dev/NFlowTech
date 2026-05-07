import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock } from 'lucide-react'
import { generatePageMetadata } from '@/lib/metadata'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = generatePageMetadata({
  title: 'Careers at NFlow Tech — Join Our Team',
  description: 'Build your career at a fast-growing AI-driven marketing agency. We are always looking for talented digital marketers, analysts, and developers.',
  path: '/career',
})

const openings = [
  { title: 'Senior PPC Strategist', location: 'Remote / India', type: 'Full-time', description: 'Manage enterprise-level Google Ads and Microsoft Ads campaigns for our top-tier clients.' },
  { title: 'Social Media Ads Specialist', location: 'Remote / India', type: 'Full-time', description: 'Plan and execute paid social campaigns across Meta, TikTok, and LinkedIn.' },
  { title: 'SEO Content Writer', location: 'Remote', type: 'Full-time', description: 'Create high-quality, research-backed content that ranks and converts.' },
  { title: 'Web Developer (Next.js)', location: 'Remote / India', type: 'Full-time', description: 'Build fast, conversion-optimized websites using React and Next.js.' },
]

export default function CareerPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Careers', href: '/career' }]} />
      <section className="section-padding bg-gradient-to-br from-brand-gray-50 to-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="overline mb-4">Careers</p>
            <h1 className="text-display-md sm:text-display-lg text-brand-navy mb-4">Join the NFlow Team</h1>
            <p className="text-body-lg text-brand-gray-600">We are building the future of AI-driven marketing. If you are passionate about data, creativity, and results — we want to hear from you.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {openings.map((job) => (
              <Link key={job.title} href="/contact" className="card group flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-blue/30">
                <div>
                  <h2 className="text-heading-md text-brand-navy group-hover:text-brand-blue transition-colors">{job.title}</h2>
                  <p className="text-body-sm text-brand-gray-600 mt-1">{job.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-caption text-brand-gray-500"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                    <span className="flex items-center gap-1 text-caption text-brand-gray-500"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-blue flex-shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-body-md text-brand-gray-600">Don&apos;t see the right role? <Link href="/contact" className="text-brand-blue font-semibold hover:underline">Send us your resume</Link> — we&apos;re always looking for talented people.</p>
          </div>
        </div>
      </section>
    </>
  )
}
