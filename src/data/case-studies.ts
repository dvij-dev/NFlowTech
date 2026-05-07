export interface CaseStudy {
  slug: string
  name: string
  industry: string
  location: string
  description: string
  challenge: string
  solution: string
  metrics: { label: string; value: string }[]
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  services: string[]
  featured: boolean
  image: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'kinddesigns',
    name: 'KindDesigns',
    industry: 'Construction & Environment',
    location: 'Miami, FL — USA',
    description:
      'KindDesigns combines advanced 3D printing with environmental science to build biologically active seawalls that protect coastlines and restore marine ecosystems.',
    challenge:
      'The concept of 3D-printed, habitat-friendly seawalls was novel. The primary challenge was educating the target market about this technology with little to no existing search volume for terms like "3D printed seawall."',
    solution:
      'Built an SEO strategy around thought leadership, content marketing, and technical precision to establish KindDesigns as the leader in a new market category.',
    metrics: [
      { label: 'Sessions', value: '9.8K+' },
      { label: 'Organic Impressions', value: '200K+' },
      { label: 'Engagement Rate', value: '52.52%' },
      { label: 'Organic Search', value: '48.13%' },
      { label: 'Page Views', value: '7K+' },
      { label: 'Clicks', value: '10K+' },
    ],
    testimonial: {
      quote:
        "We've been working with NFlow for about six months now and the results have been incredible. They really understand how to educate the market about innovative products.",
      author: 'Anya F.',
      role: 'CEO & Founder, KindDesigns',
    },
    services: ['SEO', 'Content Marketing', 'Web Design'],
    featured: true,
    image: '/images/case-studies/kinddesigns.jpg',
  },
  {
    slug: 'breezy-permits',
    name: 'Breezy Permits',
    industry: 'Marine Construction Permitting',
    location: 'Florida, USA',
    description:
      'Breezy Permits provides end-to-end marine construction permitting support for docks, seawalls, lifts, and waterfront projects across Florida.',
    challenge:
      'Needed to establish online visibility in the niche marine construction permitting space and generate consistent project requests from Florida property owners and contractors.',
    solution:
      'Rebuilt their website, refined SEO strategy, and implemented targeted content to drive steady growth in traffic and project requests.',
    metrics: [
      { label: 'Organic Traffic', value: '340%↑' },
      { label: 'Lead Inquiries', value: '185%↑' },
      { label: 'Keyword Rankings', value: '42 in Top 10' },
      { label: 'Domain Authority', value: '+12 points' },
    ],
    services: ['SEO', 'Web Design', 'Content Marketing'],
    featured: true,
    image: '/images/case-studies/breezy-permits.jpg',
  },
  {
    slug: 'seaside-marine-construction',
    name: 'Seaside Marine Construction',
    industry: 'Marine Construction',
    location: 'USA',
    description:
      'Seaside Marine Construction specializes in marine construction services including docks, seawalls, and waterfront structures.',
    challenge:
      'Competing in a crowded local market for marine construction services while establishing brand authority online.',
    solution:
      'Implemented comprehensive local SEO, Google Ads campaigns, and website optimization to dominate local search results.',
    metrics: [
      { label: 'Leads Generated', value: '220+' },
      { label: 'Cost Per Lead', value: '-45%' },
      { label: 'Local Visibility', value: '3x' },
      { label: 'Conversion Rate', value: '8.2%' },
    ],
    services: ['PPC', 'SEO', 'Web Design'],
    featured: true,
    image: '/images/case-studies/seaside-marine.jpg',
  },
  {
    slug: 'tonic-studios',
    name: 'Tonic Studios',
    industry: 'Arts & Crafts',
    location: 'UK',
    description:
      'Tonic Studios is a leading arts and crafts brand creating innovative die-cutting machines, stamps, and crafting supplies for creative enthusiasts worldwide.',
    challenge:
      'Scaling ecommerce revenue while maintaining profitability in the competitive arts & crafts market with a global customer base.',
    solution:
      'Developed a multi-channel strategy combining Google Shopping, social ads, and SEO to drive both new customer acquisition and repeat purchases.',
    metrics: [
      { label: 'Revenue Growth', value: '165%↑' },
      { label: 'ROAS', value: '5.2x' },
      { label: 'New Customers', value: '3,400+' },
      { label: 'Cost Per Acquisition', value: '-32%' },
    ],
    services: ['PPC', 'Social Media', 'SEO'],
    featured: true,
    image: '/images/case-studies/tonic-studios.jpg',
  },
  {
    slug: 'avita-jewellery',
    name: 'Avita Jewellery',
    industry: 'Jewellery & Diamonds',
    location: 'USA',
    description:
      'Avita was born from the appreciation and trust of clients who loved craftsmanship and proudly shared the brand. Today, that same passion drives the creation of beautiful, meaningful jewellery.',
    challenge:
      'Breaking through the highly competitive online jewellery market and establishing trust with high-value customers searching for fine jewellery.',
    solution:
      'Combined SEO optimization with Google Ads and targeted social campaigns to drive qualified traffic and build brand authority.',
    metrics: [
      { label: 'Organic Traffic', value: '280%↑' },
      { label: 'ROAS', value: '4.8x' },
      { label: 'Revenue', value: '210%↑' },
      { label: 'Brand Searches', value: '3x' },
    ],
    services: ['SEO', 'PPC', 'Social Media'],
    featured: false,
    image: '/images/case-studies/avita-jewellery.jpg',
  },
  {
    slug: 'boomerang-accessories',
    name: 'Boomerang Accessories',
    industry: 'Automobile Accessories',
    location: 'USA',
    description:
      'Boomerang Enterprises, a leader in auto accessories for over 25 years, designs OEM-grade tire covers, armrest consoles, and more for brands like Jeep, Ford, and Bronco.',
    challenge:
      'Increasing direct-to-consumer sales while competing against larger automotive accessory retailers and Amazon sellers.',
    solution:
      'Implemented a full-funnel strategy with Google Shopping, branded search, and remarketing to capture purchase-intent traffic.',
    metrics: [
      { label: 'Revenue', value: '190%↑' },
      { label: 'ROAS', value: '6.1x' },
      { label: 'Conversion Rate', value: '4.7%' },
      { label: 'New Customers', value: '2,100+' },
    ],
    services: ['PPC', 'SEO', 'Social Media'],
    featured: false,
    image: '/images/case-studies/boomerang.jpg',
  },
  {
    slug: 'evelaniq',
    name: 'Evelaniq',
    industry: 'Cosmetics & Skin Care',
    location: 'Australia',
    description:
      'Evelaniq Australia partnered with NFlow to improve Google Ads performance after years of inconsistent results.',
    challenge:
      'Years of inconsistent Google Ads results with wasted spend and poor targeting leading to low ROAS.',
    solution:
      'Through focused optimization and a data-driven approach, restructured campaigns to deliver reliable profit from advertising.',
    metrics: [
      { label: 'ROAS', value: '4.2x' },
      { label: 'Cost Per Acquisition', value: '-38%' },
      { label: 'Revenue Growth', value: '145%↑' },
      { label: 'Wasted Spend', value: '-62%' },
    ],
    services: ['PPC', 'Social Media'],
    featured: false,
    image: '/images/case-studies/evelaniq.jpg',
  },
  {
    slug: 'klove-beauty',
    name: 'Klove Beauty',
    industry: 'Cosmetics & Skin Care',
    location: 'USA',
    description:
      'Klove Beauty is a premium cosmetics brand focused on clean beauty products and sustainable packaging.',
    challenge:
      'Launching a new DTC beauty brand in a saturated market with limited brand recognition and marketing budget.',
    solution:
      'Built a social-first launch strategy with influencer partnerships, Meta Ads, and conversion-optimized landing pages.',
    metrics: [
      { label: 'Launch Revenue', value: '$85K' },
      { label: 'Social Followers', value: '12K+' },
      { label: 'ROAS', value: '3.8x' },
      { label: 'Email Subscribers', value: '4,200+' },
    ],
    services: ['Social Media', 'Web Design', 'PPC'],
    featured: false,
    image: '/images/case-studies/klove-beauty.jpg',
  },
  {
    slug: 'la-vie-md',
    name: 'La ViE MD',
    industry: 'Health & Safety',
    location: 'USA',
    description:
      'La ViE MD provides advanced medical aesthetic treatments and wellness services.',
    challenge:
      'Generating qualified patient leads in the competitive medical aesthetics space while maintaining brand prestige.',
    solution:
      'Implemented local SEO, Google Ads for high-intent medical searches, and reputation management to build trust.',
    metrics: [
      { label: 'Patient Leads', value: '300+/mo' },
      { label: 'Cost Per Lead', value: '$32' },
      { label: 'Local Rankings', value: '#1-3' },
      { label: 'Reviews', value: '4.9★' },
    ],
    services: ['PPC', 'SEO', 'Web Design'],
    featured: false,
    image: '/images/case-studies/la-vie-md.jpg',
  },
  {
    slug: 'ocean-consulting-llc',
    name: 'Ocean Consulting LLC',
    industry: 'Marine Construction',
    location: 'Florida, USA',
    description:
      'Ocean Consulting LLC provides expert marine construction consulting and project management services throughout Florida.',
    challenge:
      'Establishing online presence in a specialized B2B niche and generating qualified project inquiries from contractors and developers.',
    solution:
      'Built comprehensive local SEO presence combined with targeted Google Ads for marine construction-related searches.',
    metrics: [
      { label: 'Organic Traffic', value: '420%↑' },
      { label: 'Qualified Leads', value: '85+/mo' },
      { label: 'Top 3 Rankings', value: '28 keywords' },
      { label: 'Domain Authority', value: '+18' },
    ],
    services: ['SEO', 'PPC', 'Content Marketing'],
    featured: false,
    image: '/images/case-studies/ocean-consulting.jpg',
  },
  {
    slug: 'open-concept-financial-group',
    name: 'Open Concept Financial Group',
    industry: 'Financial Services',
    location: 'USA',
    description:
      'Open Concept Financial Group provides innovative financial planning and advisory services for individuals and businesses.',
    challenge:
      'Building trust and generating leads in the competitive financial services space where compliance and credibility are essential.',
    solution:
      'Developed a content-driven SEO strategy with educational resources and targeted PPC to capture high-intent searches.',
    metrics: [
      { label: 'Lead Volume', value: '250%↑' },
      { label: 'Cost Per Lead', value: '$45' },
      { label: 'Organic Traffic', value: '180%↑' },
      { label: 'Conversion Rate', value: '6.8%' },
    ],
    services: ['SEO', 'PPC', 'Content Marketing'],
    featured: false,
    image: '/images/case-studies/open-concept.jpg',
  },
  {
    slug: 'orbis-environmental',
    name: 'Orbis Environmental',
    industry: 'Environmental Services',
    location: 'USA',
    description:
      'Orbis Environmental provides comprehensive environmental consulting and remediation services for commercial and industrial clients.',
    challenge:
      'Generating qualified B2B leads in the specialized environmental consulting market with long sales cycles.',
    solution:
      'Built authority through technical content marketing and targeted Google Ads for environmental compliance-related searches.',
    metrics: [
      { label: 'Qualified Inquiries', value: '175%↑' },
      { label: 'Organic Rankings', value: '35 Top 10' },
      { label: 'Site Traffic', value: '310%↑' },
      { label: 'Lead Quality Score', value: '8.4/10' },
    ],
    services: ['SEO', 'PPC', 'Content Marketing'],
    featured: false,
    image: '/images/case-studies/orbis-environmental.jpg',
  },
  {
    slug: 'podcastcola',
    name: 'PodcastCola',
    industry: 'Media & Entertainment',
    location: 'USA',
    description:
      'PodcastCola is a podcast production and marketing platform helping creators grow their audience and monetize their content.',
    challenge:
      'Standing out in the rapidly growing podcast services market and converting free users to paid subscribers.',
    solution:
      'Implemented a social media-first strategy with Meta Ads, content marketing, and conversion rate optimization.',
    metrics: [
      { label: 'Subscribers', value: '400%↑' },
      { label: 'Social Reach', value: '1.2M+' },
      { label: 'ROAS', value: '5.5x' },
      { label: 'Churn Rate', value: '-28%' },
    ],
    services: ['Social Media', 'Web Design', 'SEO'],
    featured: false,
    image: '/images/case-studies/podcastcola.jpg',
  },
  {
    slug: 'diana-s-closet',
    name: "Diana's Closet",
    industry: 'Fashion & Apparel',
    location: 'Australia',
    description:
      "Diana's Closet, an Australian online boutique founded in 2018, curates unique and highly personalized fashion pieces.",
    challenge:
      'Growing an online boutique in the competitive fashion market while building a loyal customer base in Australia.',
    solution:
      'Developed integrated social commerce strategy with Meta Ads, Google Shopping, and email marketing automation.',
    metrics: [
      { label: 'Revenue', value: '230%↑' },
      { label: 'ROAS', value: '4.5x' },
      { label: 'Email Revenue', value: '35%' },
      { label: 'Repeat Customers', value: '42%' },
    ],
    services: ['Social Media', 'PPC', 'Email Marketing'],
    featured: false,
    image: '/images/case-studies/dianas-closet.jpg',
  },
  {
    slug: 'gallant',
    name: 'Gallant',
    industry: 'Luxury Luggage',
    location: 'USA',
    description:
      'Gallant is a premium luggage and travel accessories brand known for quality craftsmanship and modern design.',
    challenge:
      'Launching a premium luggage brand in a market dominated by established players like Away, Samsonite, and Tumi.',
    solution:
      'Built brand awareness through social media, influencer partnerships, and targeted search ads for premium luggage keywords.',
    metrics: [
      { label: 'Brand Awareness', value: '500%↑' },
      { label: 'Revenue', value: '320%↑' },
      { label: 'ROAS', value: '3.9x' },
      { label: 'New Customers', value: '1,800+' },
    ],
    services: ['Social Media', 'PPC', 'Web Design'],
    featured: false,
    image: '/images/case-studies/gallant.jpg',
  },
  {
    slug: 'indian-grocery-store',
    name: 'Indian Grocery Store',
    industry: 'Food & Beverages',
    location: 'USA',
    description:
      'Indian Grocery Store is an online marketplace for authentic Indian groceries, spices, and specialty foods delivered across the US.',
    challenge:
      'Scaling ecommerce sales in a niche market while competing with Amazon and local ethnic grocery stores.',
    solution:
      'Implemented Google Shopping campaigns, local SEO for delivery areas, and remarketing to drive repeat purchases.',
    metrics: [
      { label: 'Online Orders', value: '280%↑' },
      { label: 'ROAS', value: '7.2x' },
      { label: 'Average Order Value', value: '+24%' },
      { label: 'Repeat Purchase Rate', value: '56%' },
    ],
    services: ['PPC', 'SEO', 'Social Media'],
    featured: false,
    image: '/images/case-studies/indian-grocery.jpg',
  },
  {
    slug: 'kindtokidz',
    name: 'KindtoKidz',
    industry: 'Children & Education',
    location: 'USA',
    description:
      'KindtoKidz creates educational toys and learning resources designed to foster creativity and kindness in children.',
    challenge:
      'Building brand awareness and driving sales in the competitive children\'s product market during peak seasons.',
    solution:
      'Launched seasonal campaigns on Meta and Google with creative ad formats and landing page optimization.',
    metrics: [
      { label: 'Holiday Revenue', value: '340%↑' },
      { label: 'ROAS', value: '4.1x' },
      { label: 'Email List', value: '8,500+' },
      { label: 'Social Engagement', value: '12x' },
    ],
    services: ['Social Media', 'PPC', 'Email Marketing'],
    featured: false,
    image: '/images/case-studies/kindtokidz.jpg',
  },
  {
    slug: 'parsemus-foundation-pro-bono',
    name: 'Parsemus Foundation',
    industry: 'Non-Profit',
    location: 'USA',
    description:
      'Parsemus Foundation is a nonprofit advancing neglected medical research, including innovative contraceptive and veterinary solutions.',
    challenge:
      'Increasing awareness and donations for medical research projects that mainstream pharma companies overlook.',
    solution:
      'Pro bono engagement: built organic visibility through content strategy, Google Ad Grants optimization, and social campaigns.',
    metrics: [
      { label: 'Organic Traffic', value: '190%↑' },
      { label: 'Donations', value: '85%↑' },
      { label: 'Email Signups', value: '3,200+' },
      { label: 'Media Coverage', value: '12 features' },
    ],
    services: ['SEO', 'Social Media', 'Content Marketing'],
    featured: false,
    image: '/images/case-studies/parsemus.jpg',
  },
  {
    slug: 'royal-plaza',
    name: 'Royal Plaza',
    industry: 'Real Estate',
    location: 'India',
    description:
      'Royal Plaza is a premium commercial real estate project offering modern retail and office spaces in a prime location.',
    challenge:
      'Generating qualified buyer and tenant leads for a new commercial development in a competitive real estate market.',
    solution:
      'Launched targeted Google Ads and social media campaigns with virtual tour content to attract serious investors and tenants.',
    metrics: [
      { label: 'Qualified Leads', value: '450+' },
      { label: 'Cost Per Lead', value: '$18' },
      { label: 'Site Visits Booked', value: '120+' },
      { label: 'Conversion Rate', value: '12.5%' },
    ],
    services: ['PPC', 'Social Media', 'Web Design'],
    featured: false,
    image: '/images/case-studies/royal-plaza.jpg',
  },
  {
    slug: 'saitech-inc',
    name: 'Saitech Inc',
    industry: 'ERP & SaaS',
    location: 'USA',
    description:
      'Saitech Inc provides enterprise IT solutions, hardware, and data center infrastructure to businesses and government agencies.',
    challenge:
      'Generating qualified B2B leads for enterprise IT products with long sales cycles and complex buyer journeys.',
    solution:
      'Built a technical SEO foundation with product-specific landing pages and targeted Google Ads for enterprise IT keywords.',
    metrics: [
      { label: 'B2B Leads', value: '200%↑' },
      { label: 'Organic Traffic', value: '350%↑' },
      { label: 'Cost Per Lead', value: '-55%' },
      { label: 'Pipeline Value', value: '$2.4M' },
    ],
    services: ['SEO', 'PPC', 'Content Marketing'],
    featured: false,
    image: '/images/case-studies/saitech.jpg',
  },
  {
    slug: 'zikhara-ai',
    name: 'Zikhara AI',
    industry: 'ERP & SaaS',
    location: 'USA',
    description:
      'Zikhara AI builds AI-powered business intelligence tools that help companies automate decision-making and optimize operations.',
    challenge:
      'Launching a new AI SaaS product in a rapidly evolving market where awareness and trust are critical for adoption.',
    solution:
      'Developed thought leadership content strategy combined with targeted LinkedIn ads and Google Search campaigns.',
    metrics: [
      { label: 'Demo Requests', value: '300%↑' },
      { label: 'Website Traffic', value: '450%↑' },
      { label: 'LinkedIn Followers', value: '5,200+' },
      { label: 'Trial Signups', value: '180%↑' },
    ],
    services: ['SEO', 'PPC', 'Social Media'],
    featured: false,
    image: '/images/case-studies/zikhara-ai.jpg',
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug)
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((cs) => cs.featured)
}
