'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import JsonLd from '@/components/layout/JsonLd'
import { faqSchema } from '@/lib/schema'

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
  title?: string
  description?: string
}

export default function FAQSection({
  faqs,
  title = 'Frequently Asked Questions',
  description,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-padding bg-brand-gray-50">
      <JsonLd data={faqSchema(faqs)} />
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="overline mb-3">FAQ</p>
          <h2 className="text-display-sm sm:text-display-md text-brand-navy">{title}</h2>
          {description && (
            <p className="mt-4 text-body-lg text-brand-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-brand-gray-200 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left text-heading-sm text-brand-navy hover:text-brand-blue transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 flex-shrink-0 transition-transform duration-200',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                role="region"
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                )}
              >
                <p className="px-6 pb-5 text-body-md text-brand-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
