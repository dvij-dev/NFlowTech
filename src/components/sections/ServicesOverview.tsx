'use client'

import Link from 'next/link'
import { ArrowRight, Target, Share2, Search, Palette } from 'lucide-react'
import { motion } from 'framer-motion'
import { services } from '@/data/services'
import SectionHeading from '@/components/ui/SectionHeading'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Share2,
  Search,
  Palette,
}

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <SectionHeading
          overline="What We Do"
          title="Digital Marketing Services That Grow Your Business"
          description="We offer end-to-end digital marketing services focused on driving qualified traffic, generating leads, and improving your return on ad spend."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon]
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={service.href}
                  className="card group flex flex-col h-full hover:border-brand-blue/30"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-5 group-hover:bg-brand-blue/20 transition-colors">
                    {Icon && <Icon className="w-6 h-6 text-brand-blue" />}
                  </div>
                  <h3 className="text-heading-lg text-brand-navy mb-2 group-hover:text-brand-blue transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-body-md text-brand-gray-600 mb-5 flex-1">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-brand-blue text-body-sm font-semibold">
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
