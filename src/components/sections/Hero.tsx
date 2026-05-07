'use client'

import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-brand-gray-50 via-white to-brand-blue-light">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/3 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-accent-amber/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10 pt-28 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-body-sm font-medium mb-6">
              <span className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
              AI-Driven Digital Marketing Agency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-display-lg sm:text-display-xl text-brand-navy leading-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We Turn Ad Spend Into{' '}
            <span className="font-display italic text-brand-blue">
              Measurable Growth
            </span>
          </motion.h1>

          {/* Subhead — answer-first content block (40-60 words for AEO) */}
          <motion.p
            className="mt-6 text-body-lg sm:text-xl text-brand-gray-600 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            NFlow Tech is an AI-driven digital marketing agency that combines data science,
            creative strategy, and proven advertising tactics to generate qualified leads and
            scale revenue for brands across 27+ industries. We manage PPC, SEO, social media
            ads, and conversion-led web design.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/contact" className="btn-primary text-body-md gap-2 group">
              Get Your Free Audit
              <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/case-studies" className="btn-secondary text-body-md gap-2">
              <Play className="w-4 h-4" />
              See Our Results
            </Link>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            className="mt-14 flex flex-wrap items-center gap-8 sm:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div>
              <p className="text-display-sm font-bold text-brand-navy">138+</p>
              <p className="text-body-sm text-brand-gray-500">Brands Served</p>
            </div>
            <div className="w-px h-10 bg-brand-gray-200" />
            <div>
              <p className="text-display-sm font-bold text-brand-navy">27+</p>
              <p className="text-body-sm text-brand-gray-500">Industries</p>
            </div>
            <div className="w-px h-10 bg-brand-gray-200" />
            <div>
              <p className="text-display-sm font-bold text-brand-navy">5x</p>
              <p className="text-body-sm text-brand-gray-500">Avg. ROAS</p>
            </div>
            <div className="w-px h-10 bg-brand-gray-200 hidden sm:block" />
            <div className="hidden sm:block">
              <p className="text-display-sm font-bold text-brand-navy">$10M+</p>
              <p className="text-body-sm text-brand-gray-500">Ad Spend Managed</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
