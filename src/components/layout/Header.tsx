"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "PPC Marketing", href: "/services/ppc", desc: "Google Ads, Meta Ads, and beyond" },
      { label: "Social Media", href: "/services/social-media", desc: "Paid social that converts" },
      { label: "SEO", href: "/services/seo", desc: "Organic growth engine" },
      { label: "Web Design", href: "/services/web-design", desc: "Conversion-led design" },
    ],
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-navy-950/80 backdrop-blur-xl border-b border-white/[0.06] py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-wide flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50 flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center font-bold text-white text-sm shadow-glow-teal group-hover:scale-105 transition-transform">
            NF
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            NFLOW
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  pathname.startsWith(item.href)
                    ? "text-accent"
                    : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                )}
              >
                {item.label}
                {item.children && (
                  <svg className="inline-block w-3.5 h-3.5 ml-1 opacity-50" viewBox="0 0 12 12" fill="none">
                    <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </Link>

              {/* Dropdown */}
              {item.children && activeDropdown === item.label && (
                <div className="absolute top-full left-0 pt-2 w-72">
                  <div className="glass-card p-2 shadow-card-dark">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-3 rounded-xl hover:bg-white/[0.05] transition-colors group"
                      >
                        <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
                          {child.label}
                        </div>
                        <div className="text-xs text-white/40 mt-0.5">{child.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-light hover:shadow-glow-teal transition-all duration-300 hover:-translate-y-0.5"
          >
            Get Free Audit
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M10 5L13 8L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden relative z-50 w-11 h-11 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={cn("h-0.5 bg-white rounded-full transition-all duration-300 origin-center", isMobileOpen && "rotate-45 translate-y-[7px]")} />
              <span className={cn("h-0.5 bg-white rounded-full transition-all duration-300", isMobileOpen && "opacity-0 scale-0")} />
              <span className={cn("h-0.5 bg-white rounded-full transition-all duration-300 origin-center", isMobileOpen && "-rotate-45 -translate-y-[7px]")} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-navy-950/98 backdrop-blur-2xl z-40 transition-all duration-500 lg:hidden",
          isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-start justify-center h-full px-8 pb-20">
          {navItems.map((item, i) => (
            <div key={item.label} className="w-full">
              <Link
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "block py-4 text-3xl font-display font-bold transition-all duration-300",
                  isMobileOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
                  pathname.startsWith(item.href) ? "text-accent" : "text-white hover:text-accent"
                )}
                style={{ transitionDelay: isMobileOpen ? `${i * 60}ms` : "0ms" }}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pl-4 pb-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block py-2 text-base text-white/50 hover:text-accent transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMobileOpen(false)}
            className="btn-primary mt-8"
          >
            Get Free Audit →
          </Link>
        </nav>
      </div>
    </header>
  );
}
