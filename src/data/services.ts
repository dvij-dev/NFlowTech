export interface Service {
  slug: string
  name: string
  shortName: string
  tagline: string
  description: string
  icon: string
  href: string
  features: string[]
  faqs: { question: string; answer: string }[]
}

export const services: Service[] = [
  {
    slug: 'ppc',
    name: 'Pay-Per-Click Advertising',
    shortName: 'PPC',
    tagline: 'Stop wasting ad spend. Start generating qualified leads.',
    description:
      'Our PPC management service uses AI-driven bidding, audience targeting, and creative optimization to lower your cost per acquisition while scaling your ad spend profitably across Google Ads, Microsoft Ads, and display networks.',
    icon: 'Target',
    href: '/services/ppc',
    features: [
      'AI-powered bid management and budget optimization',
      'Google Ads, Microsoft Ads, and Display Network campaigns',
      'Landing page design and conversion rate optimization',
      'Real-time performance dashboards with Looker Studio',
      'Negative keyword mining and search term optimization',
      'Remarketing and audience segmentation strategies',
    ],
    faqs: [
      {
        question: 'How much does PPC management cost?',
        answer:
          'Our PPC management starts at $1,499/month for our Standard subscription plan, which includes 60 hours of dedicated work. We also offer Premium ($2,880/month) and Advance ($1,760/month) tiers based on campaign complexity and ad spend volume.',
      },
      {
        question: 'How quickly will I see results from PPC campaigns?',
        answer:
          'Most clients see initial results within 2–4 weeks of campaign launch. However, optimal performance typically takes 60–90 days as our AI systems gather conversion data and refine bidding strategies for your specific market.',
      },
      {
        question: 'What platforms do you manage PPC campaigns on?',
        answer:
          'We manage campaigns across Google Ads (Search, Shopping, Display, YouTube, Performance Max), Microsoft Ads, and programmatic display networks. We recommend platform allocation based on your industry and target audience.',
      },
      {
        question: 'Do you provide transparent reporting on ad spend?',
        answer:
          'Yes. Every client receives a real-time Looker Studio dashboard showing impressions, clicks, conversions, cost per lead, ROAS, and budget utilization. We also provide weekly written reports and monthly strategy reviews.',
      },
      {
        question: 'What makes your PPC management different from other agencies?',
        answer:
          'We combine AI-driven optimization with human strategic oversight. Our team uses machine learning models for bid adjustments and audience targeting, backed by certified Google Ads specialists who review every campaign weekly.',
      },
    ],
  },
  {
    slug: 'social-media',
    name: 'Social Media Advertising',
    shortName: 'Social Ads',
    tagline: 'Turn social platforms into your highest-converting sales channel.',
    description:
      'We design and manage paid social campaigns across Meta (Facebook & Instagram), TikTok, LinkedIn, and Pinterest that drive measurable conversions — not just vanity metrics. Our AI-driven approach optimizes creative, audience, and bidding in real time.',
    icon: 'Share2',
    href: '/services/social-media',
    features: [
      'Meta (Facebook & Instagram) campaign management',
      'Creative strategy with A/B testing frameworks',
      'Lookalike and custom audience development',
      'Dynamic product ads for ecommerce brands',
      'Cross-platform attribution and reporting',
      'Influencer partnership coordination',
    ],
    faqs: [
      {
        question: 'Which social media platforms do you advertise on?',
        answer:
          'We manage paid campaigns on Meta (Facebook and Instagram), TikTok, LinkedIn, and Pinterest. We recommend the right platform mix based on your target audience demographics, industry, and business goals.',
      },
      {
        question: 'How do you measure social media advertising ROI?',
        answer:
          'We track ROAS, cost per acquisition, conversion value, and assisted conversions using a combination of platform pixels, UTM tracking, and server-side events (CAPI). Every dollar spent is tied to a measurable business outcome.',
      },
      {
        question: 'Do you create the ad creatives or do we need to provide them?',
        answer:
          'Our subscription plans include ad creative concepting and design. We produce static images, carousel ads, and video ad concepts. For video production, we can work with your existing assets or recommend production partners.',
      },
      {
        question: 'How much should I budget for social media advertising?',
        answer:
          'We recommend a minimum monthly ad spend of $2,000–$5,000 for meaningful data collection and optimization. Our management fees start at $1,499/month. The ideal budget depends on your industry, competition, and growth targets.',
      },
      {
        question: 'How long does it take to see results from social ads?',
        answer:
          'Initial performance data is available within the first 1–2 weeks. However, Meta and TikTok algorithms need 50+ conversions per ad set weekly for optimal learning. Most accounts reach stable performance within 6–8 weeks.',
      },
    ],
  },
  {
    slug: 'seo',
    name: 'Search Engine Optimization',
    shortName: 'SEO',
    tagline: 'Rank higher. Get found. Generate organic leads on autopilot.',
    description:
      'Our AI-powered SEO services combine technical optimization, content strategy, and authority building to improve your search rankings and drive consistent organic traffic. We focus on revenue-generating keywords, not vanity rankings.',
    icon: 'Search',
    href: '/services/seo',
    features: [
      'Technical SEO audits and site architecture optimization',
      'Keyword research and content strategy development',
      'On-page optimization with schema markup implementation',
      'Link building and digital PR campaigns',
      'Local SEO and Google Business Profile management',
      'Monthly reporting with organic revenue attribution',
    ],
    faqs: [
      {
        question: 'How long does SEO take to show results?',
        answer:
          'SEO is a long-term investment. Most clients see measurable improvements in 3–6 months, with significant traffic and ranking gains by months 6–12. The timeline depends on your current domain authority, competition level, and content velocity.',
      },
      {
        question: 'What does your SEO service include?',
        answer:
          'Our SEO service covers technical audits, site architecture fixes, keyword research, content strategy and creation, on-page optimization, schema markup, link building, local SEO, and monthly performance reporting with organic revenue attribution.',
      },
      {
        question: 'Do you guarantee first-page rankings?',
        answer:
          'No ethical SEO agency can guarantee specific rankings because Google\'s algorithm considers 200+ factors. What we guarantee is a systematic, data-driven approach that consistently improves your organic visibility and traffic over time.',
      },
      {
        question: 'How is your SEO different from other agencies?',
        answer:
          'We use AI-powered tools for keyword opportunity scoring, content gap analysis, and competitive intelligence. Every recommendation is backed by data, not guesswork. We also focus on revenue metrics — not just rankings and traffic.',
      },
      {
        question: 'Do you offer local SEO services?',
        answer:
          'Yes. We provide comprehensive local SEO including Google Business Profile optimization, local citation building, review management strategy, and location-specific content creation to help you dominate local search results.',
      },
    ],
  },
  {
    slug: 'web-design',
    name: 'Conversion-Led Web Design',
    shortName: 'Web Design',
    tagline: 'Beautiful websites that turn visitors into customers.',
    description:
      'Our design studio creates websites built on behavioral psychology and conversion rate optimization. Every layout, color, and CTA is intentionally placed to guide visitors toward action — combining visual excellence with measurable business results.',
    icon: 'Palette',
    href: '/services/web-design',
    features: [
      'Conversion-focused UI/UX design with psychology principles',
      'Mobile-first responsive development',
      'A/B testing and heatmap-driven optimization',
      'Site speed optimization for Core Web Vitals',
      'Ecommerce store design (Shopify, WooCommerce)',
      'Brand identity and visual design system creation',
    ],
    faqs: [
      {
        question: 'How much does a website redesign cost?',
        answer:
          'Website redesign costs vary based on scope. A standard business website starts around $5,000–$15,000. Ecommerce stores with custom functionality range from $10,000–$30,000+. We provide detailed proposals after understanding your specific requirements.',
      },
      {
        question: 'How long does a website redesign take?',
        answer:
          'A typical website redesign takes 6–12 weeks from strategy to launch. This includes discovery, wireframing, design, development, content migration, QA testing, and launch. Complex ecommerce projects may take 12–16 weeks.',
      },
      {
        question: 'Do you build websites on WordPress?',
        answer:
          'We build on the platform that best fits your needs. Our most common choices are Next.js for performance-critical sites, WordPress for content-heavy sites, and Shopify for ecommerce. We recommend based on your technical requirements and team capabilities.',
      },
      {
        question: 'Will my new website be SEO-friendly?',
        answer:
          'Absolutely. Every website we build includes technical SEO fundamentals: proper heading hierarchy, schema markup, optimized meta tags, fast load times, mobile responsiveness, and clean URL structure. SEO is built into our development process, not added after.',
      },
      {
        question: 'Do you provide ongoing website maintenance?',
        answer:
          'Yes. Our subscription plans include ongoing website maintenance, security updates, performance monitoring, and content updates. This ensures your site stays fast, secure, and optimized long after launch.',
      },
    ],
  },
]

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
