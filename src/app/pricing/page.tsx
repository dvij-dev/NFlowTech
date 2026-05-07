import { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { generatePageMetadata } from '@/lib/metadata'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import FAQSection from '@/components/ui/FAQSection'

export const metadata: Metadata = generatePageMetadata({
  title: 'Pricing Plans — Flexible Marketing Subscriptions',
  description:
    'Transparent pricing for PPC, SEO, social media, and web design. Choose from Standard ($1,499/mo), Advance ($1,760/mo), or Premium ($2,880/mo) subscription plans.',
  path: '/pricing',
})

const plans = [
  {
    name: 'Standard',
    price: '$1,499',
    period: '/month',
    hours: '60 Hours/Month',
    featured: false,
    features: [
      'Dedicated marketing strategist',
      'Google Ads & Meta Ads management',
      'SEO optimization (on-page + technical)',
      'Monthly performance reporting',
      'Bi-weekly strategy calls',
      'Basic landing page optimization',
      'Keyword research & content planning',
    ],
  },
  {
    name: 'Advance',
    price: '$1,760',
    period: '/month',
    hours: '80 Hours/Month',
    featured: true,
    features: [
      'Everything in Standard, plus:',
      'Multi-platform ad management',
      'Advanced audience segmentation',
      'A/B testing & CRO optimization',
      'Weekly strategy calls',
      'Content creation & copywriting',
      'Competitive analysis reports',
      'Custom Looker Studio dashboards',
    ],
  },
  {
    name: 'Premium',
    price: '$2,880',
    period: '/month',
    hours: '160 Hours/Month',
    featured: false,
    features: [
      'Everything in Advance, plus:',
      'Full-funnel campaign management',
      'Website design & development',
      'Video ad creative production',
      'Dedicated account manager',
      'Daily monitoring & optimization',
      'Quarterly business reviews',
      'Priority support & Slack channel',
      'Custom integrations & automation',
    ],
  },
]

const pricingFaqs = [
  {
    question: 'What does the subscription include?',
    answer: 'Each subscription includes a dedicated team of marketing specialists working on your campaigns for the allocated hours. This covers strategy, setup, optimization, creative, reporting, and ongoing management across all included services.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the start of your next billing cycle.',
  },
  {
    question: 'Is there a minimum commitment?',
    answer: 'We recommend a minimum 3-month commitment for best results, as digital marketing campaigns need time to optimize. However, we offer month-to-month billing with no long-term contracts.',
  },
  {
    question: 'What if I need more hours than my plan includes?',
    answer: 'Additional hours can be purchased at a discounted rate. We also offer custom enterprise packages for businesses with larger needs — contact us for details.',
  },
  {
    question: 'Does the price include ad spend?',
    answer: 'No, our subscription fees cover management and strategy services only. Ad spend is paid directly to the advertising platforms (Google, Meta, etc.) and is separate from our management fees.',
  },
]

export default function PricingPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Pricing', href: '/pricing' }]} />

      <section className="section-padding bg-gradient-to-br from-brand-gray-50 to-white">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="overline mb-4">Pricing</p>
            <h1 className="text-display-md sm:text-display-lg text-brand-navy mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-body-lg text-brand-gray-600">
              Choose a plan that fits your business. All plans include a dedicated strategist, real-time reporting, and our full suite of AI-powered marketing tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border flex flex-col ${
                  plan.featured
                    ? 'bg-brand-navy text-white border-brand-blue shadow-xl scale-[1.02] relative'
                    : 'bg-white text-brand-navy border-brand-gray-200'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-blue text-white text-caption font-semibold px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className={`text-heading-lg mb-1 ${plan.featured ? 'text-white' : 'text-brand-navy'}`}>
                  {plan.name}
                </h3>
                <p className={`text-body-sm mb-5 ${plan.featured ? 'text-brand-gray-400' : 'text-brand-gray-500'}`}>
                  {plan.hours}
                </p>
                <div className="mb-6">
                  <span className={`text-display-md font-bold ${plan.featured ? 'text-white' : 'text-brand-navy'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-body-md ${plan.featured ? 'text-brand-gray-400' : 'text-brand-gray-500'}`}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-4.5 h-4.5 mt-0.5 flex-shrink-0 ${plan.featured ? 'text-brand-blue' : 'text-accent-green'}`} />
                      <span className={`text-body-sm ${plan.featured ? 'text-brand-gray-300' : 'text-brand-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`btn w-full text-center py-3.5 font-semibold ${
                    plan.featured
                      ? 'bg-brand-blue text-white hover:bg-brand-blue-dark'
                      : 'bg-brand-navy text-white hover:bg-brand-gray-800'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding process */}
      <section className="section-padding bg-white">
        <div className="section-container max-w-3xl">
          <div className="text-center mb-12">
            <p className="overline mb-3">How It Works</p>
            <h2 className="text-display-sm sm:text-display-md text-brand-navy">Get Started in 3 Steps</h2>
          </div>
          <div className="space-y-6">
            {[
              { step: '1', title: 'Book a Free Audit', desc: 'We analyze your current marketing and identify the highest-impact growth opportunities.' },
              { step: '2', title: 'Choose Your Plan', desc: 'Pick the subscription that fits your budget and goals. No long-term contracts required.' },
              { step: '3', title: 'Launch & Grow', desc: 'Your dedicated team gets to work immediately. See results within the first month.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 items-start">
                <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-body-sm">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-heading-md text-brand-navy mb-1">{item.title}</h3>
                  <p className="text-body-md text-brand-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/contact" className="btn-primary gap-2">
              Book Your Free Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <FAQSection faqs={pricingFaqs} title="Pricing FAQ" />
    </>
  )
}
