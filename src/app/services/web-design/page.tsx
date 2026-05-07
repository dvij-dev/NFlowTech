import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Web Design — Conversion-Led Design That Performs",
  description: "Custom web design and development built around marketing goals. Speed optimized, mobile-first, conversion-focused.",
};

export default function WebDesignPage() {
  return (
    <ServicePageTemplate
      label="Web Design & Development"
      title="Conversion-Led Design"
      titleAccent="That Performs"
      subtitle="Custom Design · E-Commerce · Landing Pages · CRO · Speed Optimization"
      description="We build websites that don't just look premium — they perform. Every pixel serves a purpose. Every interaction guides the visitor toward conversion."
      heroImage="/images/hero/services-bg.png"
      stats={[
        { value: "40%", label: "Avg. Conversion Lift" },
        { value: "<2s", label: "Load Times" },
        { value: "100%", label: "Mobile Responsive" },
        { value: "A/B", label: "Tested Everything" },
      ]}
      features={[
        { title: "Strategy-First Design", description: "We don't just make it pretty. We start with your conversion goals and work backwards to design the ideal user journey." },
        { title: "Speed Optimization", description: "Sub-2-second load times. Optimized images, lazy loading, code splitting, and edge caching for maximum performance." },
        { title: "Mobile-First Development", description: "Over 60% of web traffic is mobile. We design mobile-first, then scale up — ensuring perfect experiences everywhere." },
        { title: "E-Commerce Stores", description: "Shopify, WooCommerce, and custom e-commerce solutions. Built for product discovery, upselling, and seamless checkout." },
        { title: "Landing Pages", description: "High-converting landing pages for PPC and social campaigns. A/B tested and optimized for maximum Quality Score." },
        { title: "CRO & A/B Testing", description: "Continuous conversion rate optimization. We test headlines, layouts, CTAs, and user flows to squeeze every conversion." },
      ]}
      process={[
        { step: "01", title: "Discovery & Research", description: "Deep dive into your business goals, audience, competitors, and current site analytics to inform the design strategy." },
        { step: "02", title: "Wireframes & Design", description: "Low-fidelity wireframes for structure, then high-fidelity designs with your brand identity. Full approval before development." },
        { step: "03", title: "Build & QA", description: "Clean, semantic code. Cross-browser testing. Accessibility compliance. Performance optimization. Everything pixel-perfect." },
        { step: "04", title: "Launch & Optimize", description: "Post-launch monitoring, heatmap analysis, and ongoing CRO to ensure the site keeps performing." },
      ]}
      faq={[
        { q: "How long does a website take to build?", a: "Simple sites: 4-6 weeks. Complex e-commerce: 8-12 weeks. Landing pages: 1-2 weeks. We always provide accurate timelines upfront." },
        { q: "What platforms do you build on?", a: "We're platform-agnostic — Next.js, WordPress, Shopify, Webflow, or custom builds depending on your needs and budget." },
        { q: "Do you handle hosting and maintenance?", a: "Yes. We offer managed hosting with 99.9% uptime, daily backups, security monitoring, and ongoing maintenance packages." },
        { q: "Can you redesign our existing site?", a: "Absolutely. We audit your current site, identify what's working and what's not, and rebuild it for maximum conversion and performance." },
      ]}
    />
  );
}
