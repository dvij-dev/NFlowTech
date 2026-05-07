'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  value: string
  label: string
  dark?: boolean
}

export default function MetricCard({ value, label, dark = false }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'text-center p-6 transition-all duration-700',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
    >
      <p className={cn(
        'text-display-sm sm:text-display-md font-bold font-display',
        dark ? 'text-white' : 'text-brand-blue'
      )}>
        {value}
      </p>
      <p className={cn(
        'text-body-sm mt-1',
        dark ? 'text-brand-gray-400' : 'text-brand-gray-600'
      )}>
        {label}
      </p>
    </div>
  )
}
