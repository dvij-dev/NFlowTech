import type { Metadata } from "next";
import { ServicePageTemplate } from "@/components/sections/ServicePageTemplate";

export const metadata: Metadata = {
  title: "Social Media Marketing — Paid Social That Converts",
  description: "Behavior-based social media marketing that stops the scroll and drives conversions. Meta, TikTok, LinkedIn, and more.",
};

export default function SocialMediaPage() {
  return (
    <ServicePageTemplate
      label="Social Media Marketing"
      title="Paid Social That"
      titleAccent="Actually Converts"
      subtitle="Meta Ads · TikTok · LinkedIn · Organic · Influencer"
      description="Social media isn't about likes — it's about revenue. We build behavior-based targeting strategies with scroll-stopping creative that turns followers into customers."
      heroImage="/images/hero/services-bg.png"
      stats={[
        { value: "3.2x", label: "Avg. Lead Gen Lift" },
        { value: "Daily", label: "Optimization Loops" },
        { value: "85%", label: "Client Retention" },
        { value: "10+", label: "Platforms Managed" },
      ]}
      features={[
        { title: "Behavior-Based Targeting", description: "We target based on actual user behavior patterns, not just demographics. Reach people who are ready to act." },
        { title: "Scroll-Stopping Creative", description: "Thumb-stopping creative frameworks designed for each platform. Video, carousel, UGC, and static formats tested continuously." },
        { title: "Daily Optimization Loops", description: "Our team monitors and adjusts campaigns daily — not weekly. Faster iteration = faster results." },
        { title: "Community Management", description: "Building engaged communities that amplify your brand. Responding, engaging, and turning followers into advocates." },
        { title: "Influencer Partnerships", description: "Strategic influencer collaboration with ROI tracking. We find creators who actually drive conversions, not just impressions." },
        { title: "Social Commerce", description: "Instagram Shop, Facebook Shop, TikTok Shop integration. Turn your social profiles into revenue channels." },
      ]}
      process={[
        { step: "01", title: "Social Audit", description: "Analyze your current social presence, audience insights, competitor strategies, and content performance." },
        { step: "02", title: "Strategy & Creative Brief", description: "Platform selection, audience targeting, content calendar, and creative production plan." },
        { step: "03", title: "Launch & Test", description: "Multi-variant creative testing, audience expansion, and bid optimization across all selected platforms." },
        { step: "04", title: "Scale & Diversify", description: "Double down on winners, kill underperformers, expand to new platforms and audiences." },
      ]}
      faq={[
        { q: "Which social platforms do you manage?", a: "Meta (Facebook & Instagram), TikTok, LinkedIn, X/Twitter, Pinterest, Snapchat, and Reddit. We recommend platforms based on your audience and goals." },
        { q: "Do you create the content too?", a: "Yes! Our creative team produces video, photography, UGC-style content, carousels, and static ads. We can also work with your existing creative team." },
        { q: "What's the difference between organic and paid social?", a: "Organic builds community and brand loyalty. Paid drives immediate, scalable results. We recommend both, but most ROI comes from paid social." },
        { q: "How do you measure social media ROI?", a: "We track end-to-end: from impressions to clicks to conversions to revenue. No vanity metrics — just business outcomes." },
      ]}
    />
  );
}
