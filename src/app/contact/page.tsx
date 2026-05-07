'use client'

import { useState } from 'react'
import { Mail, MapPin, Clock, Send } from 'lucide-react'
import JsonLd from '@/components/layout/JsonLd'
import { localBusinessSchema } from '@/lib/schema'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formState.name.trim()) newErrors.name = 'Name is required'
    if (!formState.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) newErrors.email = 'Enter a valid email'
    if (!formState.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) setSubmitted(true)
  }

  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Breadcrumbs items={[{ name: 'Contact', href: '/contact' }]} />

      <section className="section-padding bg-gradient-to-br from-brand-gray-50 to-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="overline mb-4">Contact Us</p>
            <h1 className="text-display-md sm:text-display-lg text-brand-navy mb-4">
              Let&apos;s Discuss Your Growth
            </h1>
            <p className="text-body-lg text-brand-gray-600">
              Get in touch for a free marketing audit and strategy session. We typically respond within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="card">
                <Mail className="w-6 h-6 text-brand-blue mb-3" />
                <h3 className="text-heading-sm text-brand-navy mb-1">Email</h3>
                <a href="mailto:hello@nflowtech.com" className="text-body-md text-brand-blue hover:underline">
                  hello@nflowtech.com
                </a>
              </div>
              <div className="card">
                <MapPin className="w-6 h-6 text-brand-blue mb-3" />
                <h3 className="text-heading-sm text-brand-navy mb-1">Location</h3>
                <p className="text-body-md text-brand-gray-600">Ahmedabad, Gujarat, India</p>
              </div>
              <div className="card">
                <Clock className="w-6 h-6 text-brand-blue mb-3" />
                <h3 className="text-heading-sm text-brand-navy mb-1">Response Time</h3>
                <p className="text-body-md text-brand-gray-600">Within 24 hours</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="card text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-accent-green/10 flex items-center justify-center mx-auto mb-5">
                    <Send className="w-7 h-7 text-accent-green" />
                  </div>
                  <h2 className="text-heading-lg text-brand-navy mb-2">Message Sent!</h2>
                  <p className="text-body-md text-brand-gray-600">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card space-y-5" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-body-sm font-medium text-brand-navy mb-1.5">
                      Full Name <span className="text-accent-red">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-brand-gray-300 text-body-md focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && <p id="name-error" className="text-body-sm text-accent-red mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-body-sm font-medium text-brand-navy mb-1.5">
                      Work Email <span className="text-accent-red">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-brand-gray-300 text-body-md focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                      placeholder="you@company.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && <p id="email-error" className="text-body-sm text-accent-red mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-body-sm font-medium text-brand-navy mb-1.5">
                      Company <span className="text-brand-gray-400">(optional)</span>
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-brand-gray-300 text-body-md focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-body-sm font-medium text-brand-navy mb-1.5">
                      How Can We Help? <span className="text-accent-red">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-brand-gray-300 text-body-md focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all resize-y"
                      placeholder="Tell us about your marketing goals..."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && <p id="message-error" className="text-body-sm text-accent-red mt-1">{errors.message}</p>}
                  </div>

                  <p className="text-caption text-brand-gray-500">
                    By submitting, you agree to our{' '}
                    <a href="/privacy-policy" className="underline hover:text-brand-blue">Privacy Policy</a>.
                  </p>

                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
