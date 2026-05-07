import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { generatePageMetadata } from '@/lib/metadata'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = generatePageMetadata({
  title: 'Marketing Insights & Blog',
  description: 'Expert insights on PPC, SEO, social media advertising, and conversion rate optimization from our team of certified digital marketing specialists.',
  path: '/insights',
})

const posts = [
  { title: 'How AI Is Changing PPC Campaign Management in 2025', category: 'PPC', readTime: '8 min', slug: '#' },
  { title: 'The Complete Guide to Meta Ads Audience Targeting', category: 'Social Media', readTime: '12 min', slug: '#' },
  { title: 'Why Your Landing Page Conversion Rate Is Below 3%', category: 'Web Design', readTime: '6 min', slug: '#' },
  { title: 'Local SEO in 2025: What Actually Moves the Needle', category: 'SEO', readTime: '10 min', slug: '#' },
  { title: 'Google Ads Performance Max: A Data-Driven Analysis', category: 'PPC', readTime: '9 min', slug: '#' },
  { title: '5 Creative Testing Frameworks That Reduce CPA by 30%', category: 'Creative', readTime: '7 min', slug: '#' },
]

export default function InsightsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Insights', href: '/insights' }]} />
      <section className="section-padding bg-gradient-to-br from-brand-gray-50 to-white">
        <div className="section-container">
          <div className="max-w-3xl mb-14">
            <p className="overline mb-4">Insights & Blog</p>
            <h1 className="text-display-md sm:text-display-lg text-brand-navy mb-4">Marketing Insights</h1>
            <p className="text-body-lg text-brand-gray-600">Expert perspectives on digital marketing strategy, PPC optimization, SEO trends, and conversion rate improvement.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post.title} className="card group flex flex-col">
                <div className="w-full h-40 rounded-xl bg-brand-gray-100 mb-5" />
                <p className="text-caption text-brand-blue font-medium uppercase tracking-wider mb-2">{post.category}</p>
                <h2 className="text-heading-md text-brand-navy mb-3 group-hover:text-brand-blue transition-colors flex-1">{post.title}</h2>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-caption text-brand-gray-500"><Clock className="w-3.5 h-3.5" /> {post.readTime} read</span>
                  <span className="flex items-center gap-1 text-brand-blue text-body-sm font-semibold">Read <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-14">
            <p className="text-body-lg text-brand-gray-600">More articles coming soon. <Link href="/contact" className="text-brand-blue font-semibold hover:underline">Subscribe for updates</Link>.</p>
          </div>
        </div>
      </section>
    </>
  )
}
