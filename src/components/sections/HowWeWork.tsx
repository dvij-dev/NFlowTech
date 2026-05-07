'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck, BarChart3, Rocket, TrendingUp } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const steps = [
  {
    icon: ClipboardCheck,
    step: '01',
    title: 'Free Audit & Strategy',
    description: 'We analyze your current marketing, competitors, and growth opportunities. You get a detailed action plan — no strings attached.',
  },
  {
    icon: BarChart3,
    step: '02',
    title: 'Data-Driven Setup',
    description: 'We build your campaigns with AI-powered targeting, tracking, and creative. Every dollar is accountable from day one.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Launch & Optimize',
    description: 'Campaigns go live with real-time monitoring. Our AI adjusts bids, audiences, and creatives continuously for peak performance.',
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'Scale & Report',
    description: 'Weekly reports, monthly strategy reviews, and proactive scaling recommendations. We grow as you grow.',
  },
]

export default function HowWeWork() {
  return (
    <section className="section-padding bg-brand-gray-50">
      <div className="section-container">
        <SectionHeading
          overline="How We Work"
          title="From Strategy to Scale in 4 Steps"
          description="Our proven process eliminates guesswork and focuses on measurable business outcomes from the very first week."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.step}
                className="relative bg-white rounded-2xl p-6 sm:p-7 border border-brand-gray-200"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="text-6xl font-bold text-brand-gray-100 absolute top-4 right-5 select-none" aria-hidden="true">
                  {step.step}
                </span>
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-5">
                    <Icon className="w-5.5 h-5.5 text-brand-blue" />
                  </div>
                  <h3 className="text-heading-md text-brand-navy mb-2">{step.title}</h3>
                  <p className="text-body-sm text-brand-gray-600">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
