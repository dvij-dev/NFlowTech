import Image from 'next/image'
import Link from 'next/link'
import { caseStudies } from '@/data/site-data'
import { notFound } from 'next/navigation'
import { CaseStudyContent } from './CaseStudyContent'

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export default function CaseStudyDetail({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug)
  if (!cs) notFound()

  const currentIndex = caseStudies.findIndex((c) => c.slug === cs.slug)
  const nextCs = caseStudies[(currentIndex + 1) % caseStudies.length]
  const prevCs = caseStudies[(currentIndex - 1 + caseStudies.length) % caseStudies.length]

  return <CaseStudyContent cs={cs} nextCs={nextCs} prevCs={prevCs} />
}
