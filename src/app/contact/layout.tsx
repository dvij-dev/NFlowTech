import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact NFlow — Schedule a Free Consultation',
  description: 'Get in touch with NFlow Technologies. Offices in Ahmedabad & Jersey City. Call +91 905-433-1400 or email hello@nflowtech.com.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
