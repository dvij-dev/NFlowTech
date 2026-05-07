import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "NFlow Tech privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <section className="section-dark pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-wide max-w-3xl">
        <h1 className="text-display-lg font-display font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-white/60">
          <p className="text-white/50 text-sm">Last updated: January 2025</p>

          <h2 className="text-xl font-bold text-white mt-8">1. Information We Collect</h2>
          <p>We collect information you provide directly (name, email, company, phone number) when you fill out our contact form, request an audit, or subscribe to our newsletter. We also collect usage data through cookies and analytics tools.</p>

          <h2 className="text-xl font-bold text-white mt-8">2. How We Use Your Information</h2>
          <p>We use the information to respond to your inquiries, provide our marketing services, send relevant communications, improve our website, and comply with legal obligations.</p>

          <h2 className="text-xl font-bold text-white mt-8">3. Data Sharing</h2>
          <p>We do not sell your personal information. We may share data with trusted service providers who assist in operating our website and conducting our business (e.g., email service providers, analytics tools), always under strict confidentiality agreements.</p>

          <h2 className="text-xl font-bold text-white mt-8">4. Cookies</h2>
          <p>We use essential cookies for site functionality and analytics cookies (Google Analytics) to understand how visitors interact with our site. You can control cookie preferences through your browser settings.</p>

          <h2 className="text-xl font-bold text-white mt-8">5. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>

          <h2 className="text-xl font-bold text-white mt-8">6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at hello@nflowtech.com.</p>

          <h2 className="text-xl font-bold text-white mt-8">7. Contact Us</h2>
          <p>If you have questions about this privacy policy, please contact us at hello@nflowtech.com.</p>
        </div>
      </div>
    </section>
  );
}
