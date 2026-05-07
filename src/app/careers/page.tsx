import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers — Join the NFlow Team",
  description: "Join a team of hungry, data-driven marketers building the future of digital marketing.",
};

const positions = [
  { title: "Senior PPC Strategist", type: "Full-time · Remote", department: "Performance Marketing" },
  { title: "SEO Content Writer", type: "Full-time · Remote", department: "Content & SEO" },
  { title: "Paid Social Manager", type: "Full-time · Remote", department: "Social Media" },
  { title: "Full-Stack Developer", type: "Full-time · Remote", department: "Engineering" },
];

export default function CareersPage() {
  return (
    <>
      <section className="section-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-wide">
          <span className="label-accent mb-4 block">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Careers
          </span>
          <h1 className="text-display-xl font-display font-bold mb-6 max-w-4xl">
            Build Something <span className="gradient-text italic">Special</span>
          </h1>
          <p className="text-body-lg text-white/50 max-w-2xl">
            We&apos;re looking for hungry, data-driven marketers who want to push boundaries. No politics, no bureaucracy — just great work.
          </p>
        </div>
      </section>

      <section className="section-dark pb-24 md:pb-32">
        <div className="container-wide max-w-3xl">
          <h2 className="text-display-sm font-display font-bold mb-8">Open <span className="gradient-text italic">Positions</span></h2>
          <div className="space-y-4">
            {positions.map((pos, i) => (
              <Link key={i} href="/contact" className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-accent/20 transition-all">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">{pos.title}</h3>
                  <p className="text-sm text-white/40">{pos.department} · {pos.type}</p>
                </div>
                <span className="text-sm text-accent/60 group-hover:text-accent flex items-center gap-2 transition-colors flex-shrink-0">
                  Apply Now
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M10 5L13 8L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 glass-card p-8 text-center">
            <h3 className="text-lg font-bold text-white mb-3">Don&apos;t See Your Role?</h3>
            <p className="text-body-sm text-white/40 mb-6">We&apos;re always looking for exceptional talent. Send us your resume and let&apos;s talk.</p>
            <Link href="/contact" className="btn-outline">Get In Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
