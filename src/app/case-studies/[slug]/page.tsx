import Link from "next/link";
import type { Metadata } from "next";

const caseStudyData: Record<string, {
  client: string; industry: string; metric: string; metricLabel: string;
  services: string[]; challenge: string; solution: string; results: string[];
}> = {
  "kinddesigns": {
    client: "KindDesigns",
    industry: "E-Commerce / Jewelry",
    metric: "312%",
    metricLabel: "Revenue Growth",
    services: ["PPC Marketing", "SEO"],
    challenge: "KindDesigns was stuck at $50K/month in revenue with inefficient Google Ads campaigns and no organic presence. Their previous agency was burning budget on broad match keywords with no conversion tracking.",
    solution: "We rebuilt their Google Ads from scratch with intent-based targeting, implemented enhanced conversion tracking, launched Shopping campaigns, and built an SEO content strategy targeting high-value long-tail keywords.",
    results: ["Revenue grew from $50K to $206K/month", "ROAS improved from 1.8x to 5.2x", "Organic traffic increased 245%", "CPA reduced by 62%", "Shopping campaigns drove 40% of total revenue"],
  },
  "ocean-consulting-llc": {
    client: "Ocean Consulting",
    industry: "Professional Services",
    metric: "£460K",
    metricLabel: "Revenue from SEO",
    services: ["SEO", "Content Strategy"],
    challenge: "Ocean Consulting had no organic search presence despite being a leader in luxury consulting. Their website had critical technical issues and zero content strategy.",
    solution: "Complete technical SEO overhaul, content hub strategy with pillar pages, strategic link building from industry publications, and local SEO for their London office.",
    results: ["£460K in attributable revenue from organic search", "84 keywords ranking on page 1", "Domain authority increased from 28 to 52", "Featured snippets for 12 high-value keywords", "300% increase in qualified leads"],
  },
  "breezy-permits": {
    client: "Breezy Permits",
    industry: "Construction / SaaS",
    metric: "8.2x",
    metricLabel: "ROAS",
    services: ["PPC Marketing", "Landing Pages"],
    challenge: "Breezy Permits was spending $15K/month on Google Ads with a 1.2x ROAS. Poor landing pages, broad targeting, and no conversion tracking were destroying their budget.",
    solution: "Rebuilt the account with single-theme ad groups, designed high-converting landing pages, implemented call tracking and form submission tracking, and set up automated bidding with proper signals.",
    results: ["ROAS improved from 1.2x to 8.2x", "Lead volume increased 340%", "CPA reduced from $245 to $38", "Landing page conversion rate: 12.4%", "Profitable scaling to $30K/month spend"],
  },
};

export function generateStaticParams() {
  return Object.keys(caseStudyData).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const data = caseStudyData[params.slug];
  if (!data) return { title: "Case Study — NFlow Tech" };
  return {
    title: `${data.client} — ${data.metric} ${data.metricLabel}`,
    description: data.challenge.slice(0, 155),
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const data = caseStudyData[params.slug];

  if (!data) {
    return (
      <section className="section-dark pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container-wide text-center">
          <h1 className="text-display-lg font-display font-bold mb-6">Case Study Coming Soon</h1>
          <p className="text-body-lg text-white/50 mb-8">We&apos;re putting the finishing touches on this case study.</p>
          <Link href="/case-studies" className="btn-primary">View All Case Studies</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-wide max-w-4xl">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-accent/60 hover:text-accent transition-colors mb-8">
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M6 5L3 8L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Case Studies
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            {data.services.map((s) => (
              <span key={s} className="px-3 py-1 text-xs font-mono text-accent/60 border border-accent/10 rounded-full">{s}</span>
            ))}
            <span className="px-3 py-1 text-xs font-mono text-white/30 border border-white/[0.06] rounded-full">{data.industry}</span>
          </div>

          <h1 className="text-display-xl font-display font-bold mb-6">{data.client}</h1>

          <div className="flex flex-wrap gap-8 mb-8">
            <div>
              <div className="text-display-md font-display font-bold gradient-text">{data.metric}</div>
              <div className="text-body-sm text-white/50">{data.metricLabel}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-darker py-16 md:py-24">
        <div className="container-wide max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">The Challenge</h2>
              <p className="text-body text-white/50 leading-relaxed">{data.challenge}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Our Solution</h2>
              <p className="text-body text-white/50 leading-relaxed">{data.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-dark py-16 md:py-24">
        <div className="container-wide max-w-4xl">
          <h2 className="text-display-sm font-display font-bold mb-8">The <span className="gradient-text italic">Results</span></h2>
          <div className="space-y-4">
            {data.results.map((result, i) => (
              <div key={i} className="glass-card p-6 flex items-center gap-4">
                <svg className="w-6 h-6 text-accent flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 0a10 10 0 100 20 10 10 0 000-20zm4.72 6.6l-5.62 6.25a.94.94 0 01-1.33.02l-2.5-2.35a.94.94 0 011.29-1.37l1.81 1.71 4.96-5.51a.94.94 0 011.39 1.25z" />
                </svg>
                <span className="text-body text-white/70">{result}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-dark via-accent to-accent-light" />
        <div className="absolute inset-0 bg-navy-950/40" />
        <div className="container-wide relative z-10 text-center">
          <h2 className="text-display-md font-display font-bold text-white mb-6">
            Want Results <span className="italic">Like These?</span>
          </h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-navy-950 font-bold rounded-full hover:bg-cream transition-all duration-300 hover:-translate-y-1">
            Get Your Free Audit →
          </Link>
        </div>
      </section>
    </>
  );
}
