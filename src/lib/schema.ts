const BASE_URL = 'https://www.nflowtech.com'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NFlow Technologies',
    alternateName: 'NFlow Tech',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description:
      'AI-driven digital marketing agency specializing in PPC, SEO, social media advertising, and conversion-led web design.',
    email: 'hello@nflowtech.com',
    foundingDate: '2017',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 20, maxValue: 30 },
    sameAs: [
      'https://www.linkedin.com/company/nflowtech',
      'https://www.instagram.com/nflowtech',
      'https://www.facebook.com/nflowtech',
      'https://twitter.com/nflowtech',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    areaServed: { '@type': 'GeoShape', name: 'Worldwide' },
    knowsAbout: ['PPC Advertising', 'SEO', 'Social Media Marketing', 'Web Design', 'Digital Marketing'],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'NFlow Tech',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  }
}

export function serviceSchema({ name, description, url }: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${BASE_URL}${url}`,
    provider: {
      '@type': 'Organization',
      name: 'NFlow Technologies',
      url: BASE_URL,
    },
    areaServed: { '@type': 'GeoShape', name: 'Worldwide' },
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function articleSchema(options: {
  title: string
  description: string
  url: string
  publishedDate: string
  modifiedDate?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.title,
    description: options.description,
    url: `${BASE_URL}${options.url}`,
    datePublished: options.publishedDate,
    dateModified: options.modifiedDate || options.publishedDate,
    author: {
      '@type': 'Organization',
      name: options.author || 'NFlow Tech',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NFlow Technologies',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/logo.png` },
    },
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'NFlow Technologies',
    url: BASE_URL,
    email: 'hello@nflowtech.com',
    description: 'AI-driven digital marketing agency',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ahmedabad',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
  }
}
