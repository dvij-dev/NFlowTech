'use client'

import { useInView } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import type { ReactNode, CSSProperties } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  as?: 'div' | 'section' | 'article' | 'li'
}

export function AnimatedSection({ children, className, delay = 0, direction = 'up', as: Tag = 'div' }: Props) {
  const { ref, isInView } = useInView<HTMLDivElement>()

  const transforms: Record<string, string> = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(40px)',
    right: 'translateX(-40px)',
    none: 'none',
  }

  const style: CSSProperties = {
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'none' : transforms[direction],
    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  }

  return (
    <Tag ref={ref as any} className={cn(className)} style={style}>
      {children}
    </Tag>
  )
}
