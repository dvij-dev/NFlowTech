import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section-padding bg-white min-h-[60vh] flex items-center">
      <div className="section-container text-center">
        <p className="text-8xl font-bold text-brand-blue/20 mb-6">404</p>
        <h1 className="text-display-md text-brand-navy mb-4">Page Not Found</h1>
        <p className="text-body-lg text-brand-gray-600 max-w-md mx-auto mb-8">The page you are looking for does not exist or has been moved.</p>
        <Link href="/" className="btn-primary">Return Home</Link>
      </div>
    </section>
  )
}
