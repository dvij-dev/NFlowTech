"use client";

import { useState } from "react";
import Image from "next/image";
import { useInView } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" fill="currentColor" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" fill="currentColor" />
      </svg>
    ),
    label: "Email",
    value: "hello@nflowtech.com",
    href: "mailto:hello@nflowtech.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" fill="currentColor" />
      </svg>
    ),
    label: "Phone",
    value: "+1 (888) 555-FLOW",
    href: "tel:+18885553569",
  },
  {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" fill="currentColor" />
      </svg>
    ),
    label: "Location",
    value: "USA — Serving clients worldwide",
    href: null,
  },
];

export function ContactContent() {
  const [formState, setFormState] = useState({
    name: "", email: "", company: "", budget: "", service: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref, isInView } = useInView();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <>
      <section className="section-dark pt-32 pb-20 md:pt-40 md:pb-28 relative">
        <div className="absolute inset-0">
          <Image src="/images/hero/contact-bg.png" alt="" fill className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/50 to-navy-950" />
        </div>

        <div ref={ref} className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left - Info */}
            <div>
              <span className="label-accent mb-4 block">Get In Touch</span>
              <h1
                className={cn(
                  "text-display-lg font-display font-bold mb-6 transition-all duration-700",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                Let&apos;s Build Your
                <br />
                <span className="gradient-text italic">Growth Engine</span>
              </h1>
              <p
                className={cn(
                  "text-body-lg text-white/50 mb-10 max-w-md transition-all duration-700 delay-200",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
              >
                Book a free strategy call. We&apos;ll audit your current digital
                presence and show you the path to scalable growth.
              </p>

              {/* Contact info */}
              <div className="space-y-6 mb-12">
                {contactInfo.map((info, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start gap-4 transition-all duration-700",
                      isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                    style={{ transitionDelay: isInView ? `${400 + i * 100}ms` : "0ms" }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-white/40 mb-0.5">{info.label}</div>
                      {info.href ? (
                        <a href={info.href} className="text-white hover:text-accent transition-colors font-medium">
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-white font-medium">{info.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4">
                {["Google Certified", "HubSpot Partner", "No Contracts", "Results in 60 Days"].map((badge) => (
                  <span key={badge} className="px-3 py-1.5 text-xs font-mono text-accent/60 border border-accent/10 rounded-full">
                    ✓ {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <div
              className={cn(
                "glass-card p-8 md:p-10 transition-all duration-700 delay-300",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-display-sm font-display font-bold text-white mb-3">
                    Thank You!
                  </h3>
                  <p className="text-body text-white/50">
                    We&apos;ve received your message. A strategist will reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-2">Request Your Free Audit</h3>
                  <p className="text-body-sm text-white/40 mb-6">Fill this out and we&apos;ll prepare a custom strategy for you.</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      label="Full Name"
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(v) => setFormState(s => ({ ...s, name: v }))}
                    />
                    <FormField
                      label="Email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formState.email}
                      onChange={(v) => setFormState(s => ({ ...s, email: v }))}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      label="Company"
                      type="text"
                      placeholder="Your company"
                      value={formState.company}
                      onChange={(v) => setFormState(s => ({ ...s, company: v }))}
                    />
                    <div>
                      <label className="block text-sm text-white/60 font-medium mb-2">Monthly Budget</label>
                      <select
                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all outline-none appearance-none"
                        value={formState.budget}
                        onChange={(e) => setFormState(s => ({ ...s, budget: e.target.value }))}
                      >
                        <option value="" className="bg-navy-900">Select range</option>
                        <option value="<5k" className="bg-navy-900">Under $5,000</option>
                        <option value="5k-15k" className="bg-navy-900">$5,000 - $15,000</option>
                        <option value="15k-50k" className="bg-navy-900">$15,000 - $50,000</option>
                        <option value="50k+" className="bg-navy-900">$50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 font-medium mb-2">Service Interested In</label>
                    <select
                      className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all outline-none appearance-none"
                      value={formState.service}
                      onChange={(e) => setFormState(s => ({ ...s, service: e.target.value }))}
                    >
                      <option value="" className="bg-navy-900">Select a service</option>
                      <option value="ppc" className="bg-navy-900">PPC Marketing</option>
                      <option value="seo" className="bg-navy-900">SEO Services</option>
                      <option value="social" className="bg-navy-900">Social Media Marketing</option>
                      <option value="design" className="bg-navy-900">Web Design</option>
                      <option value="subscription" className="bg-navy-900">Full Marketing Subscription</option>
                      <option value="other" className="bg-navy-900">Other / Multiple</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 font-medium mb-2">How Can We Help?</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all outline-none resize-none"
                      placeholder="Tell us about your goals..."
                      value={formState.message}
                      onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-gold justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                          <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        Get My Free Audit
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                          <path d="M4 10H16M12 6L16 10L12 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FormField({
  label, type, required, placeholder, value, onChange,
}: {
  label: string; type: string; required?: boolean; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm text-white/60 font-medium mb-2">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-white/20 focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all outline-none"
      />
    </div>
  );
}
