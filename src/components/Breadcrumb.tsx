'use client'

import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="section-pad pt-28 pb-0">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <svg className="w-3 h-3 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {item.href ? (
              <Link href={item.href} className="text-slate-400 hover:text-white transition-colors">{item.label}</Link>
            ) : (
              <span className="text-sky-400">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
