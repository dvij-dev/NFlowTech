import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'Read our privacy policy to understand how NFlow Technologies collects, uses, and protects your personal information.',
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: 'Privacy Policy', href: '/privacy-policy' }]} />
      <section className="section-padding bg-white">
        <div className="section-container">
          <article className="prose prose-lg max-w-3xl mx-auto">
            <h1 className="text-display-sm text-brand-navy mb-4">Privacy Policy</h1>
            <p className="text-body-sm text-brand-gray-500 mb-8">Last updated: January 2025</p>

            <h2 className="text-heading-lg text-brand-navy mt-8 mb-3">1. Information We Collect</h2>
            <p className="text-body-md text-brand-gray-600 mb-4">We collect information you provide directly, including your name, email, company name, and any message content submitted through our contact forms. We also collect usage data through analytics tools.</p>

            <h2 className="text-heading-lg text-brand-navy mt-8 mb-3">2. How We Use Your Information</h2>
            <p className="text-body-md text-brand-gray-600 mb-4">We use your information to respond to inquiries, provide our marketing services, improve our website, and send relevant communications about our services.</p>

            <h2 className="text-heading-lg text-brand-navy mt-8 mb-3">3. Data Protection</h2>
            <p className="text-body-md text-brand-gray-600 mb-4">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>

            <h2 className="text-heading-lg text-brand-navy mt-8 mb-3">4. Cookies</h2>
            <p className="text-body-md text-brand-gray-600 mb-4">Our website uses cookies and similar technologies to enhance your browsing experience and analyze site traffic. You can control cookie preferences through your browser settings.</p>

            <h2 className="text-heading-lg text-brand-navy mt-8 mb-3">5. Third-Party Services</h2>
            <p className="text-body-md text-brand-gray-600 mb-4">We use Google Analytics for website analytics. These third-party services have their own privacy policies governing the use of your data.</p>

            <h2 className="text-heading-lg text-brand-navy mt-8 mb-3">6. Your Rights</h2>
            <p className="text-body-md text-brand-gray-600 mb-4">You have the right to access, update, or delete your personal information at any time. Contact us at hello@nflowtech.com for any privacy-related requests.</p>

            <h2 className="text-heading-lg text-brand-navy mt-8 mb-3">7. Contact Us</h2>
            <p className="text-body-md text-brand-gray-600 mb-4">For questions about this privacy policy, contact us at <a href="mailto:hello@nflowtech.com" className="text-brand-blue hover:underline">hello@nflowtech.com</a>.</p>
          </article>
        </div>
      </section>
    </>
  )
}
