'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { getFeaturedCaseStudies } from '@/data/case-studies'
import SectionHeading from '@/components/ui/SectionHeading'

export default function FeaturedCaseStudies() {
  const featured = getFeaturedCaseStudies().slice(0, 3)

  return (
    <section className="section-padding bg-brand-navy">
      <div className="section-container">
        <SectionHeading
          overline="Case Studies"
          title="Results That Speak for Themselves"
          description="See how we've helped brands across industries achieve measurable growth through data-driven marketing strategies."
          dark
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((cs, index) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/case-studies/${cs.slug}`}
                className="group block bg-white/5 rounded-2xl border border-white/10 p-6 sm:p-8 hover:bg-white/10 hover:border-white/20 transition-all h-full"
              >
                <p className="text-overline text-brand-blue/80 uppercase tracking-wider text-xs mb-3">
                  {cs.industry} · {cs.location}
                </p>
                <h3 className="text-heading-lg text-white mb-3 group-hover:text-brand-blue transition-colors">
                  {cs.name}
                </h3>
                <p className="text-body-sm text-brand-gray-400 mb-6 line-clamp-2">
                  {cs.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {cs.metrics.slice(0, 4).map((metric) => (
                    <div key={metric.label}>
                      <p className="text-heading-lg text-white font-bold">{metric.value}</p>
                      <p className="text-caption text-brand-gray-500">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-brand-blue text-body-sm font-semibold">
                  View Case Study
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/case-studies" className="btn bg-white/10 text-white px-8 py-3.5 hover:bg-white/20">
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  )
}
