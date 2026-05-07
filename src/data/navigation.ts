export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export const mainNav: NavItem[] = [
  {
    label: 'Services',
    href: '/services/ppc',
    children: [
      { label: 'PPC Advertising', href: '/services/ppc' },
      { label: 'Social Media Ads', href: '/services/social-media' },
      { label: 'SEO', href: '/services/seo' },
      { label: 'Web Design', href: '/services/web-design' },
    ],
  },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export const footerNav = {
  services: [
    { label: 'PPC Advertising', href: '/services/ppc' },
    { label: 'Social Media Ads', href: '/services/social-media' },
    { label: 'SEO Services', href: '/services/seo' },
    { label: 'Web Design', href: '/services/web-design' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Insights', href: '/insights' },
    { label: 'Career', href: '/career' },
  ],
  resources: [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Free E-book', href: '/ebook' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ],
}

export const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/nflowtech', icon: 'Linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/nflowtech', icon: 'Instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/nflowtech', icon: 'Facebook' },
  { label: 'Twitter', href: 'https://twitter.com/nflowtech', icon: 'X' },
]
