import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  overline?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
  className?: string
}

export default function SectionHeading({
  overline,
  title,
  description,
  align = 'center',
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 sm:mb-16',
        align === 'center' && 'text-center max-w-3xl mx-auto',
        className
      )}
    >
      {overline && (
        <p className={cn('overline mb-3', dark && 'text-brand-blue/80')}>
          {overline}
        </p>
      )}
      <h2
        className={cn(
          'text-display-sm sm:text-display-md',
          dark ? 'text-white' : 'text-brand-navy'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-body-lg',
            dark ? 'text-brand-gray-400' : 'text-brand-gray-600'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
