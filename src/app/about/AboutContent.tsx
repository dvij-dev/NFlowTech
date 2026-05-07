"use client";

import Image from "next/image";
import Link from "next/link";
import { useInView, useCounter } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    name: "Dvij Kinkhabwala",
    role: "CEO & Founder",
    image: "/images/team/dvij.png",
    bio: "Data-obsessed marketer who started NFlow in 2020 to prove that small brands can outperform big competitors with the right strategy.",
  },
  {
    name: "Anand Sariya",
    role: "Co-Founder & COO",
    image: "/images/team/founder1.jpg",
    bio: "Operations architect who ensures every campaign runs like clockwork. 10+ years in performance marketing.",
  },
];

const values = [
  { icon: "🎯", title: "Results Over Everything", description: "We measure success by your revenue growth, not vanity metrics." },
  { icon: "🔬", title: "Data-Driven Decisions", description: "Every recommendation backed by data. Every hypothesis tested." },
  { icon: "🤝", title: "Radical Transparency", description: "No hidden fees, no BS reports. You see everything we see." },
  { icon: "⚡", title: "Speed of Execution", description: "Most agencies take weeks to make changes. We ship daily." },
  { icon: "🧠", title: "AI + Human Intelligence", description: "We leverage cutting-edge AI tools paired with seasoned marketers." },
  { icon: "💎", title: "Client Obsession", description: "We treat your budget like our own money. Every dollar accountable." },
];

const stats = [
  { value: 138, suffix: "+", label: "Brands Served" },
  { value: 27, suffix: "+", label: "Industries" },
  { value: 35, suffix: "+", label: "Team Members" },
  { value: 4, suffix: "+", label: "Years Operating" },
];

export function AboutContent() {
  const { ref: heroRef, isInView: heroInView } = useInView();
  const { ref: valuesRef, isInView: valuesInView } = useInView();
  const { ref: teamRef, isInView: teamInView } = useInView();

  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-32 pb-20 md:pt-40 md:pb-28 relative">
        <div className="absolute inset-0">
          <Image src="/images/hero/about-bg.png" alt="" fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/50 to-navy-950" />
        </div>

        <div ref={heroRef} className="container-wide relative z-10">
          <span className="label-accent mb-4 block">About NFlow Tech</span>
          <h1
            className={cn(
              "text-display-xl font-display font-bold mb-8 max-w-4xl transition-all duration-700",
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Marketing That <span className="gradient-text italic">Hits Hard.</span>
            <br />
            Results That <span className="gradient-text-gold italic">Hit Harder.</span>
          </h1>
          <p
            className={cn(
              "text-body-lg text-white/60 max-w-2xl transition-all duration-700 delay-200",
              heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Founded in 2020, NFlow Tech was born from a simple frustration:
            most agencies optimize for their own growth, not yours. We decided
            to build the agency we wished we could have hired.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section-darker py-16">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <StatItem key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-dark py-24 md:py-32">
        <div ref={valuesRef} className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="label-accent mb-4 block">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Our Values
            </span>
            <h2
              className={cn(
                "text-display-lg font-display font-bold transition-all duration-700",
                valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              What We <span className="gradient-text italic">Stand For</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className={cn(
                  "glass-card p-8 group hover:border-accent/20 transition-all duration-500",
                  valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: valuesInView ? `${200 + i * 100}ms` : "0ms" }}
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-body-sm text-white/40">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-darker py-24 md:py-32">
        <div ref={teamRef} className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="label-accent mb-4 block">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Leadership Team
            </span>
            <h2
              className={cn(
                "text-display-lg font-display font-bold transition-all duration-700",
                teamInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              The Minds Behind <span className="gradient-text italic">NFlow</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className={cn(
                  "glass-card overflow-hidden group hover:border-accent/20 transition-all duration-500",
                  teamInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: teamInView ? `${200 + i * 150}ms` : "0ms" }}
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
                </div>
                <div className="p-8 -mt-16 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-accent text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-body-sm text-white/40">{member.bio}</p>
                </div>
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
            Want to Join the <span className="italic">Team?</span>
          </h2>
          <p className="text-body-lg text-white/70 mb-8 max-w-xl mx-auto">
            We&apos;re always looking for hungry, data-driven marketers who want to build something special.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-navy-950 font-bold rounded-full hover:bg-cream transition-all duration-300 hover:-translate-y-1">
            Let&apos;s Talk
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M12 6L16 10L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter(value, 2000);
  return (
    <div className="text-center">
      <div className="text-display-md font-display font-bold gradient-text" ref={ref}>
        {count}{suffix}
      </div>
      <div className="text-body-sm text-white/40 mt-1">{label}</div>
    </div>
  );
}
