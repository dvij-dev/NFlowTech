import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import JsonLd from './JsonLd'
import { breadcrumbSchema } from '@/lib/schema'

interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ name: 'Home', href: '/' }, ...items]

  return (
    <>
      <JsonLd data={breadcrumbSchema(allItems.map(i => ({ name: i.name, url: i.href })))} />
      <nav aria-label="Breadcrumb" className="section-container py-4">
        <ol className="flex items-center gap-1.5 text-body-sm text-brand-gray-500 flex-wrap">
          {allItems.map((item, idx) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-brand-gray-400" />}
              {idx === allItems.length - 1 ? (
                <span className="text-brand-gray-700 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-brand-blue transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
