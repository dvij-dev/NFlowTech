"use client";

import { useState } from "react";
import Image from "next/image";
import { useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "NFlow didn't just run our ads — they reimagined our entire digital strategy. Revenue went from $50K to $206K a month. The ROI speaks for itself.",
    name: "Anya F.",
    role: "Founder, KindDesigns",
    avatar: "/images/team/founder2.png",
  },
  {
    quote:
      "We went through 3 agencies before NFlow. They're the first team that actually understood our niche and delivered results within 60 days.",
    name: "Michael R.",
    role: "CEO, Breezy Permits",
    avatar: null,
  },
  {
    quote:
      "The transparency is what got me. Weekly reports, clear KPIs, no BS. They treat our budget like it's their own money. Finally, an agency that gets it.",
    name: "Sarah Chen",
    role: "Marketing Director, Orbis Environmental",
    avatar: null,
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const { ref, isInView } = useInView();

  return (
    <section className="section-darker py-24 md:py-32 relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/[0.03] to-transparent pointer-events-none" />

      <div ref={ref} className="container-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="label-accent mb-4 block">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Client Testimonials
          </span>

          {/* Quote */}
          <div className="mb-12 min-h-[200px] flex items-center justify-center">
            <blockquote
              className={cn(
                "transition-all duration-500",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {/* Quote mark */}
              <svg className="w-12 h-12 text-accent/20 mx-auto mb-6" viewBox="0 0 48 48" fill="currentColor">
                <path d="M14 28c-2.21 0-4-1.79-4-4V14h10v10h-6c0 3.31-2.69 6-6 6v2c4.42 0 8-3.58 8-8V14c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10c0 3.31 2.69 6 6 6h2v-2zM36 28c-2.21 0-4-1.79-4-4V14h10v10h-6c0 3.31-2.69 6-6 6v2c4.42 0 8-3.58 8-8V14c0-1.1-.9-2-2-2H30c-1.1 0-2 .9-2 2v10c0 3.31 2.69 6 6 6h2v-2z" />
              </svg>

              <p className="text-display-sm font-display font-medium text-white/90 italic leading-relaxed mb-8">
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-4">
                {testimonials[active].avatar && (
                  <Image
                    src={testimonials[active].avatar!}
                    alt={testimonials[active].name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-accent/20"
                  />
                )}
                <div className="text-left">
                  <div className="text-white font-semibold">{testimonials[active].name}</div>
                  <div className="text-sm text-white/40">{testimonials[active].role}</div>
                </div>
              </div>
            </blockquote>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  i === active
                    ? "w-8 h-2 bg-accent"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                )}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
