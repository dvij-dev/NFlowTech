'use client'

const clients = [
  { name: 'KindDesigns', alt: 'KindDesigns — 3D printed seawall manufacturer' },
  { name: 'Tonic Studios', alt: 'Tonic Studios — Arts and crafts brand' },
  { name: 'Boomerang', alt: 'Boomerang Enterprises — Auto accessories' },
  { name: 'Avita', alt: 'Avita Jewellery — Fine jewellery brand' },
  { name: 'Evelaniq', alt: 'Evelaniq — Australian cosmetics brand' },
  { name: 'Breezy Permits', alt: 'Breezy Permits — Marine construction permitting' },
  { name: 'La ViE MD', alt: 'La ViE MD — Medical aesthetics' },
  { name: 'PodcastCola', alt: 'PodcastCola — Podcast production platform' },
  { name: 'Saitech', alt: 'Saitech Inc — Enterprise IT solutions' },
  { name: 'Zikhara AI', alt: 'Zikhara AI — AI business intelligence' },
  { name: 'Ocean Consulting', alt: 'Ocean Consulting — Marine construction consulting' },
  { name: 'Gallant', alt: 'Gallant — Premium luggage brand' },
]

function LogoPlaceholder({ name, alt }: { name: string; alt: string }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center h-12 px-8 mx-6
        bg-brand-gray-100 rounded-lg text-brand-gray-500 text-body-sm font-medium
        select-none whitespace-nowrap"
      aria-label={alt}
      role="img"
    >
      {name}
    </div>
  )
}

export default function LogoMarquee() {
  return (
    <section className="py-12 sm:py-16 border-y border-brand-gray-100 bg-white overflow-hidden">
      <div className="section-container mb-6">
        <p className="text-center text-body-sm text-brand-gray-500 font-medium uppercase tracking-wider">
          Trusted by 138+ Brands Across the Globe
        </p>
      </div>
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex marquee-track" aria-hidden="false">
          {/* Duplicate for seamless loop */}
          {[...clients, ...clients].map((client, i) => (
            <LogoPlaceholder key={`${client.name}-${i}`} name={client.name} alt={client.alt} />
          ))}
        </div>
      </div>
    </section>
  )
}
