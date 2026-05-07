import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { footerNav, socialLinks } from '@/data/navigation'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-navy text-white" role="contentinfo">
      {/* CTA Band */}
      <div className="border-b border-white/10">
        <div className="section-container py-16 sm:py-20 text-center">
          <p className="overline text-brand-blue/80 mb-4">Ready to Grow?</p>
          <h2 className="text-display-md sm:text-display-lg text-white font-display mb-6">
            Let&apos;s Build Something Great Together
          </h2>
          <p className="text-body-lg text-brand-gray-400 max-w-2xl mx-auto mb-8">
            Get a free marketing audit and discover exactly where your growth
            opportunities are. No fluff, no commitment — just actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-body-md">
              Get Your Free Audit
            </Link>
            <Link href="/case-studies" className="btn bg-white/10 text-white px-7 py-3.5 hover:bg-white/20">
              View Our Results
            </Link>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="section-container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl mb-5">
              <div className="w-9 h-9 bg-brand-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NF</span>
              </div>
              NFLOW
            </Link>
            <p className="text-body-sm text-brand-gray-400 max-w-sm mb-6 leading-relaxed">
              AI-driven digital marketing agency helping brands grow with result-driven
              PPC, SEO, social media advertising, and conversion-led web design.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-brand-blue/30 transition-colors text-body-sm font-medium"
                    aria-label={`Follow NFlow on ${social.label}`}
                  >
                    {social.label.charAt(0)}
                  </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-heading-sm text-white mb-4">Services</h3>
            <ul className="space-y-3">
              {footerNav.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-brand-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-heading-sm text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-brand-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-heading-sm text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerNav.resources.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-body-sm text-brand-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-body-sm text-brand-gray-500">
            © {currentYear} NFlow Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-body-sm text-brand-gray-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="text-body-sm text-brand-gray-500 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
