import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insights — Marketing Intelligence",
  description: "Expert insights on PPC, SEO, social media, and digital marketing strategy from the NFlow Tech team.",
};

const articles = [
  { title: "The 2025 Guide to Google Ads Performance Max", category: "PPC", date: "Jan 2025", readTime: "8 min read" },
  { title: "Why Your Meta Ads ROAS Dropped (And How to Fix It)", category: "Social Media", date: "Dec 2024", readTime: "6 min read" },
  { title: "SEO in the Age of AI: What Actually Works", category: "SEO", date: "Dec 2024", readTime: "10 min read" },
  { title: "Landing Page Optimization: 23 Tactics That Move the Needle", category: "CRO", date: "Nov 2024", readTime: "12 min read" },
  { title: "How We Scaled a D2C Brand from $50K to $200K/Month", category: "Case Study", date: "Nov 2024", readTime: "7 min read" },
  { title: "The Complete Google Ads Audit Checklist", category: "PPC", date: "Oct 2024", readTime: "15 min read" },
];

export default function InsightsPage() {
  return (
    <>
      <section className="section-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-wide">
          <span className="label-accent mb-4 block">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Insights
          </span>
          <h1 className="text-display-xl font-display font-bold mb-6 max-w-4xl">
            Marketing <span className="gradient-text italic">Intelligence</span>
          </h1>
          <p className="text-body-lg text-white/50 max-w-2xl">
            Actionable insights from our team of strategists, data scientists, and growth marketers.
          </p>
        </div>
      </section>

      <section className="section-dark pb-24 md:pb-32">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <article key={i} className="glass-card p-8 group hover:border-accent/20 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-1 text-xs font-mono text-accent/60 border border-accent/10 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-white/30">{article.date}</span>
                </div>
                <h2 className="text-lg font-bold text-white group-hover:text-accent transition-colors mb-4 flex-1">
                  {article.title}
                </h2>
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                  <span className="text-xs text-white/30">{article.readTime}</span>
                  <span className="text-sm text-accent/60 group-hover:text-accent transition-colors flex items-center gap-1">
                    Read
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6H10M7 3L10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
