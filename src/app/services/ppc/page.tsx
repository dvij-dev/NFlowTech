import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "PPC Marketing — Turn Clicks Into Customers",
  description: "Expert Google Ads and Meta Ads management. Average 5x ROAS across 138+ brands. Get your free PPC audit.",
};

export default function PPCPage() {
  return (
    <ServicePageTemplate
      label="PPC Marketing"
      title="Turn Clicks Into"
      titleAccent="Customers"
      subtitle="Google Ads · Meta Ads · Shopping · Display · Programmatic"
      description="We don't just manage ad accounts — we architect growth engines. Intent-based targeting, AI-powered bidding, and relentless optimization across Google, Meta, and 10+ ad platforms."
      heroImage="/images/hero/services-bg.png"
      stats={[
        { value: "5x", label: "Average ROAS" },
        { value: "$10M+", label: "Ad Spend Managed" },
        { value: "138+", label: "Brands Served" },
        { value: "60 Days", label: "To First Results" },
      ]}
      features={[
        { title: "Intent-Based Targeting", description: "We target people actively searching for what you sell — not passive browsers. Higher intent = higher conversion." },
        { title: "AI-Powered Bidding", description: "Our proprietary bid strategies leverage machine learning to find the optimal bid for every auction, every time." },
        { title: "Product-Led Performance", description: "For e-commerce: Shopping campaigns, Performance Max, and dynamic product ads that showcase your best sellers." },
        { title: "Conversion Tracking", description: "Enterprise-grade tracking with enhanced conversions, offline conversion import, and full-funnel attribution." },
        { title: "Landing Page Optimization", description: "We don't just send traffic — we ensure the destination converts. CRO testing included with every campaign." },
        { title: "Weekly Reporting", description: "Transparent, actionable reports with clear KPIs. No vanity metrics, just revenue and growth." },
      ]}
      process={[
        { step: "01", title: "Deep Audit", description: "We analyze your current ad accounts, tracking, creative, and competitor landscape to find quick wins and long-term opportunities." },
        { step: "02", title: "Strategy Blueprint", description: "Custom campaign architecture with targeting, bidding, and creative strategies tailored to your industry and goals." },
        { step: "03", title: "Launch & Test", description: "Campaigns go live with built-in A/B testing frameworks. We test everything — creative, audiences, landing pages, bids." },
        { step: "04", title: "Optimize & Scale", description: "Continuous optimization based on data, not gut feelings. When something works, we pour fuel on the fire." },
      ]}
      faq={[
        { q: "What's the minimum ad budget you work with?", a: "We typically work with businesses spending $3,000+/month on ads, but we've helped startups scale from $1K budgets to $100K+." },
        { q: "How long until we see results?", a: "Most clients see meaningful improvements within 30-60 days. For brand new accounts, it takes 2-4 weeks for algorithms to optimize." },
        { q: "Do you require long-term contracts?", a: "No. We work month-to-month. We earn your business every single month with results." },
        { q: "Which platforms do you manage?", a: "Google Ads (Search, Shopping, Display, YouTube, PMax), Meta Ads, TikTok Ads, LinkedIn Ads, Microsoft Ads, and more." },
        { q: "How is NFlow different from other PPC agencies?", a: "We're data scientists first, marketers second. Every decision is backed by data. Plus, you get direct access to senior strategists, not junior account managers." },
      ]}
    />
  );
}
