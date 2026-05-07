'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function Testimonial() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="overline mb-6">Testimonials</p>
            <Quote className="w-10 h-10 text-brand-blue/30 mx-auto mb-6" aria-hidden="true" />
            <blockquote>
              <p className="text-display-sm sm:text-display-md font-display italic text-brand-navy leading-snug">
                &ldquo;We&apos;ve been working with NFlow for about six months now. They really understand how to educate the market about innovative products. The results have been incredible.&rdquo;
              </p>
            </blockquote>
            <div className="mt-8">
              <p className="text-heading-md text-brand-navy">Anya F.</p>
              <p className="text-body-sm text-brand-gray-500">CEO & Founder, KindDesigns</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
