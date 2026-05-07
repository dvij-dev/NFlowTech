import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Award, Users, Globe, Zap } from 'lucide-react'
import { generatePageMetadata } from '@/lib/metadata'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import MetricCard from '@/components/ui/MetricCard'

export const metadata: Metadata = generatePageMetadata({
  title: 'About NFlow Tech — AI-Driven Digital Marketing Agency',
  description:
    'Learn how our team combines artificial intelligence with proven marketing strategies to generate qualified leads. Meet the experts behind your next campaign.',
  path: '/about',
})

const values = [
  { icon: Zap, title: 'Data-Driven Decisions', description: 'Every recommendation is backed by data, not guesswork. We use AI and analytics to find the most efficient path to growth.' },
  { icon: Users, title: 'Client-First Approach', description: 'Your success is our success. We work as an extension of your team with transparent communication and full accountability.' },
  { icon: Globe, title: 'Global Expertise', description: 'From Miami startups to Australian ecommerce brands, we bring cross-market insights to every campaign we manage.' },
  { icon: Award, title: 'Continuous Innovation', description: 'We stay ahead of platform changes and industry shifts so your campaigns are always leveraging the latest strategies.' },
]

const team = [
  { name: 'Nevil Bhatt', role: 'Founder & CEO', bio: 'Digital marketing strategist with 8+ years of experience building performance-driven campaigns across PPC, SEO, and social media.' },
  { name: 'Marketing Team', role: '23+ Certified Specialists', bio: 'Our team includes Google Ads certified experts, Meta Blueprint certified media buyers, and experienced SEO analysts.' },
]

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'About Us', href: '/about' }]} />

      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-brand-gray-50 to-brand-blue-light">
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="overline mb-4">About NFlow Tech</p>
            <h1 className="text-display-md sm:text-display-lg text-brand-navy mb-6">
              We Drive Profitable Business Growth With Data-Driven Marketing
            </h1>
            <p className="text-body-lg text-brand-gray-600 mb-4">
              NFlow Technologies is an AI-driven digital marketing agency that combines data science, creative strategy, and proven advertising tactics to help businesses generate qualified leads and scale revenue profitably.
            </p>
            <p className="text-body-lg text-brand-gray-600">
              Founded in 2017, we&apos;ve helped 138+ brands across 27+ industries achieve measurable growth through PPC, SEO, social media advertising, and conversion-led web design.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-brand-navy">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MetricCard value="138+" label="Brands Served" dark />
            <MetricCard value="27+" label="Industries" dark />
            <MetricCard value="23+" label="Certified Team Members" dark />
            <MetricCard value="Since 2017" label="In Business" dark />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="overline mb-3">Our Values</p>
            <h2 className="text-display-sm sm:text-display-md text-brand-navy">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="card">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-brand-blue" />
                  </div>
                  <h3 className="text-heading-lg text-brand-navy mb-2">{v.title}</h3>
                  <p className="text-body-md text-brand-gray-600">{v.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-brand-gray-50">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="overline mb-3">Our Team</p>
            <h2 className="text-display-sm sm:text-display-md text-brand-navy">The People Behind Your Growth</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-8 border border-brand-gray-200 text-center">
                <div className="w-20 h-20 rounded-full bg-brand-blue/10 flex items-center justify-center mx-auto mb-5">
                  <Users className="w-8 h-8 text-brand-blue" />
                </div>
                <h3 className="text-heading-lg text-brand-navy">{member.name}</h3>
                <p className="text-body-sm text-brand-blue font-medium mb-3">{member.role}</p>
                <p className="text-body-sm text-brand-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-brand-blue">
        <div className="section-container text-center">
          <h2 className="text-display-sm sm:text-display-md text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-body-lg text-white/80 max-w-2xl mx-auto mb-8">Let&apos;s discuss how we can help your brand achieve measurable growth.</p>
          <Link href="/contact" className="btn bg-white text-brand-blue px-8 py-4 hover:bg-brand-gray-50 font-semibold gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
