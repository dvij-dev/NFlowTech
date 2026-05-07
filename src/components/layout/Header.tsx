'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { mainNav } from '@/data/navigation'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-gray-100'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <div className="section-container">
        <nav
          className="flex items-center justify-between h-16 sm:h-20"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-xl text-brand-navy z-50 relative"
            aria-label="NFlow Tech — Home"
          >
            <div className="w-9 h-9 bg-brand-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NF</span>
            </div>
            <span className={cn(
              'transition-colors duration-300',
              !isScrolled && !isOpen ? 'text-brand-navy' : 'text-brand-navy'
            )}>
              NFLOW
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNav.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1 px-4 py-2.5 text-body-sm font-medium rounded-lg transition-colors',
                      pathname.startsWith('/services')
                        ? 'text-brand-blue'
                        : 'text-brand-gray-700 hover:text-brand-blue hover:bg-brand-blue/5'
                    )}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </button>
                  <div
                    className={cn(
                      'absolute top-full left-0 pt-2 transition-all duration-200',
                      openDropdown === item.label
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    )}
                  >
                    <div className="bg-white rounded-xl shadow-lg border border-brand-gray-100 py-2 min-w-[220px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-5 py-2.5 text-body-sm transition-colors',
                            pathname === child.href
                              ? 'text-brand-blue bg-brand-blue/5 font-medium'
                              : 'text-brand-gray-700 hover:text-brand-blue hover:bg-brand-blue/5'
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2.5 text-body-sm font-medium rounded-lg transition-colors',
                    pathname === item.href
                      ? 'text-brand-blue'
                      : 'text-brand-gray-700 hover:text-brand-blue hover:bg-brand-blue/5'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex btn-primary text-body-sm"
            >
              Get Free Audit
            </Link>
            <button
              className="lg:hidden btn p-2.5 text-brand-navy z-50 relative"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 bg-white z-40 lg:hidden transition-all duration-300',
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="pt-24 px-6 pb-8 h-full overflow-y-auto" aria-label="Mobile navigation">
          <div className="space-y-1">
            {mainNav.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    className="flex items-center justify-between w-full px-4 py-3.5 text-lg font-medium text-brand-navy rounded-lg"
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.label ? null : item.label)
                    }
                    aria-expanded={openDropdown === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'w-5 h-5 transition-transform',
                        openDropdown === item.label && 'rotate-180'
                      )}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div className="ml-4 space-y-1 mb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            'block px-4 py-2.5 text-body-md rounded-lg transition-colors',
                            pathname === child.href
                              ? 'text-brand-blue bg-brand-blue/5 font-medium'
                              : 'text-brand-gray-600 hover:text-brand-blue'
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block px-4 py-3.5 text-lg font-medium rounded-lg transition-colors',
                    pathname === item.href
                      ? 'text-brand-blue'
                      : 'text-brand-navy hover:text-brand-blue'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
          <div className="mt-8 px-4">
            <Link href="/contact" className="btn-primary w-full text-center">
              Get Free Audit
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
