'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimatedSection } from '@/components/AnimatedSection'
import { SectionLabel } from '@/components/SectionLabel'

const articles = [
  {
    title: 'How We Achieve 7.5X Average ROAS Across 138+ Brands',
    excerpt: 'Our data-driven approach combines precise audience targeting, creative testing frameworks, and continuous optimization loops.',
    category: 'Strategy',
    readTime: '8 min',
    date: 'Coming Soon',
  },
  {
    title: 'The SEO Playbook That Drove 200K+ Organic Impressions',
    excerpt: 'From technical foundations to content strategy, learn how we approach SEO for sustainable organic growth.',
    category: 'SEO',
    readTime: '12 min',
    date: 'Coming Soon',
  },
  {
    title: 'Google Ads vs Meta Ads: Where Should You Invest First?',
    excerpt: 'A framework for deciding your ad spend allocation based on business model, industry, and growth stage.',
    category: 'PPC',
    readTime: '10 min',
    date: 'Coming Soon',
  },
  {
    title: 'Why 80% of Our Clients Come From Referrals',
    excerpt: 'Building a referral-first agency through transparency, results, and genuine client relationships.',
    category: 'Agency',
    readTime: '6 min',
    date: 'Coming Soon',
  },
  {
    title: 'Conversion Rate Optimization: The Hidden Revenue Multiplier',
    excerpt: 'Small changes in landing page design can dramatically impact ROAS. Here are the patterns we see across industries.',
    category: 'CRO',
    readTime: '9 min',
    date: 'Coming Soon',
  },
  {
    title: 'Scaling Ad Spend Without Killing ROAS',
    excerpt: 'The diminishing returns problem — and how to beat it with structured scaling protocols and creative diversification.',
    category: 'Growth',
    readTime: '11 min',
    date: 'Coming Soon',
  },
]

export default function InsightsPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-sky-500/[0.05] rounded-full blur-[140px]" />
        <div className="relative z-10 max-w-3xl">
          <AnimatedSection>
            <SectionLabel>Insights</SectionLabel>
            <h1 className="text-display font-display font-bold text-white mb-6">
              Stay Ahead with{' '}
              <span className="gradient-text">Expert Insights</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Data-driven perspectives on PPC, SEO, conversion strategy, and digital growth — from the team behind 138+ successful campaigns.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Articles grid */}
      <section className="section-pad pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <AnimatedSection key={article.title} delay={i * 80}>
              <div className="glass-card-hover p-8 h-full flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-[60px] group-hover:bg-sky-500/10 transition-all duration-500" />
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-sky-400 bg-sky-400/5 rounded-full border border-sky-400/20">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400">{article.readTime} read</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                </div>
                <div className="relative z-10 pt-4 border-t border-white/[0.06]">
                  <span className="text-xs font-mono text-sky-400/60 uppercase tracking-wider">{article.date}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-pad pb-32">
        <AnimatedSection>
          <div className="glass-card p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-sky-500/5" />
            <div className="relative z-10">
              <h2 className="text-heading font-display font-bold text-white mb-4">
                Get notified when we publish
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto mb-8">
                Subscribe to receive expert insights on PPC optimization, SEO strategy, and conversion growth — straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 px-5 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/20 transition-colors"
                />
                <button className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
