import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "SEO Services — Organic Growth That Compounds",
  description: "Enterprise-grade SEO strategy for brands that want to dominate organic search. Technical SEO, content strategy, and AI optimization.",
};

export default function SEOPage() {
  return (
    <ServicePageTemplate
      label="SEO Services"
      title="Organic Growth That"
      titleAccent="Compounds"
      subtitle="Technical SEO · Content Strategy · Link Building · Local · AI/AEO"
      description="We build sustainable organic visibility that compounds over time. Enterprise-grade SEO architecture, AI-optimized content, and strategic link building that turns your website into a revenue engine."
      heroImage="/images/hero/services-bg.png"
      stats={[
        { value: "£460K", label: "Revenue from SEO" },
        { value: "312%", label: "Traffic Growth" },
        { value: "Page 1", label: "Average Rankings" },
        { value: "27+", label: "Industries Served" },
      ]}
      features={[
        { title: "Technical SEO Audits", description: "Deep crawl analysis, Core Web Vitals optimization, structured data implementation, and site architecture reviews." },
        { title: "Content Strategy & Creation", description: "Data-driven content that ranks AND converts. Topic clusters, pillar pages, and AI-assisted content at scale." },
        { title: "Link Building", description: "White-hat link acquisition from relevant, high-authority domains. Digital PR, guest posting, and resource link building." },
        { title: "Local SEO", description: "Google Business Profile optimization, local citation building, and geo-targeted content for location-based businesses." },
        { title: "E-Commerce SEO", description: "Product page optimization, category architecture, schema markup, and shopping feed integration for maximum visibility." },
        { title: "AI/AEO Optimization", description: "Future-proof your SEO with Answer Engine Optimization for Google AI Overviews, ChatGPT, and Perplexity." },
      ]}
      process={[
        { step: "01", title: "SEO Audit", description: "Comprehensive technical audit covering 200+ ranking factors, competitor analysis, and content gap analysis." },
        { step: "02", title: "Strategy Development", description: "Keyword targeting, content roadmap, and technical fix prioritization based on impact vs effort." },
        { step: "03", title: "Execute & Build", description: "On-page optimization, content creation, technical fixes, and link building — all running in parallel." },
        { step: "04", title: "Measure & Adapt", description: "Monthly ranking reports, traffic analysis, and conversion tracking. Strategy adjusts based on real data." },
      ]}
      faq={[
        { q: "How long does SEO take to show results?", a: "SEO is a compounding investment. You'll typically see movement in 3-6 months, with significant results by 6-12 months. We focus on quick wins early while building long-term authority." },
        { q: "Do you do SEO for e-commerce sites?", a: "Absolutely. E-commerce SEO is one of our strongest capabilities — product optimization, category architecture, and Shopping feed management." },
        { q: "How do you handle AI and AEO?", a: "We actively optimize for AI Overviews, ChatGPT citations, and Perplexity answers through structured data, FAQ schema, and authoritative content patterns." },
        { q: "Do you guarantee rankings?", a: "No ethical SEO agency can guarantee specific rankings. But we guarantee a data-driven strategy and transparent reporting on your progress." },
      ]}
    />
  );
}
