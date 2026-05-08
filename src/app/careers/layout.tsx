import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers at NFlow — Join Our Growing Team',
  description: 'Join NFlow Technologies — a growing digital marketing agency with offices in Ahmedabad and Jersey City.',
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
