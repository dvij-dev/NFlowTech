import { Metadata } from 'next'

const BASE_URL = 'https://www.nflowtech.com'

interface PageMetadataOptions {
  title: string
  description: string
  path: string
  ogImage?: string
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = '/images/og-default.png',
}: PageMetadataOptions): Metadata {
  const url = `${BASE_URL}${path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export function generateArticleMetadata({
  title,
  description,
  path,
  publishedTime,
  author = 'NFlow Tech',
}: PageMetadataOptions & { publishedTime: string; author?: string }): Metadata {
  const url = `${BASE_URL}${path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime,
      authors: [author],
    },
  }
}
