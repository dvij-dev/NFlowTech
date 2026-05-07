'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'
import {
  Gem, Luggage, Dumbbell, Monitor, Building2, Sparkles,
  ShieldCheck, Scissors, UtensilsCrossed, Car, Shirt
} from 'lucide-react'

const industries = [
  { name: 'Jewellery & Diamonds', icon: Gem, projects: 53 },
  { name: 'Luxury Luggage', icon: Luggage, projects: 14 },
  { name: 'Fitness', icon: Dumbbell, projects: 9 },
  { name: 'ERP & SaaS', icon: Monitor, projects: 21 },
  { name: 'Real Estate', icon: Building2, projects: 16 },
  { name: 'Cosmetics & Skin Care', icon: Sparkles, projects: 8 },
  { name: 'Health & Safety', icon: ShieldCheck, projects: 18 },
  { name: 'Arts & Crafts', icon: Scissors, projects: 22 },
  { name: 'Food & Beverages', icon: UtensilsCrossed, projects: 46 },
  { name: 'Automobile Accessories', icon: Car, projects: 11 },
  { name: 'Clothing & Apparel', icon: Shirt, projects: 19 },
]

export default function Industries() {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <SectionHeading
          overline="Industries We Serve"
          title="Specialized Expertise Across 27+ Industries"
          description="We create immersive digital experiences tailored to your industry's unique challenges and audience expectations."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                className="p-5 rounded-xl border border-brand-gray-200 hover:border-brand-blue/20 hover:shadow-md transition-all text-center group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Icon className="w-7 h-7 text-brand-blue mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-body-sm font-semibold text-brand-navy mb-1">{industry.name}</h3>
                <p className="text-caption text-brand-gray-500">{industry.projects} Projects</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
