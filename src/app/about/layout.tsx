import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About NFlow — Our Story, Team & Mission',
  description: 'Meet the 18+ specialists behind NFlow Technologies. Seven years, 138+ brands, and an 80% referral rate — discover our story.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
