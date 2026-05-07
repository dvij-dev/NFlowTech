"use client";

import Image from "next/image";

const clientLogos = [
  { src: "/images/clients/c52e1ca01e6a253d7ffe707cd216e756c05557ba.png", alt: "Partner" },
  { src: "/images/clients/4397201f1753c1fc9ac362e6f42a9d68a6fe7cf0.png", alt: "Partner" },
  { src: "/images/clients/c2801e464d08a4638dabd5f328e698082a3e9384.png", alt: "Partner" },
  { src: "/images/clients/afe57ac17d2891ad5c7750c653a53322b043241a.png", alt: "Partner" },
  { src: "/images/clients/179a71c8c5539be47487176808dbc13c748ab268.png", alt: "Partner" },
  { src: "/images/clients/afe2ee474324dff5a3f85d9fccf36f67647d4953.png", alt: "Partner" },
  { src: "/images/clients/134aa5a2af3bce348ce4863a91dc41e7646c4a9e.png", alt: "Partner" },
  { src: "/images/clients/60139b1fc81a450dc748360aa668bd5dff9166bf.png", alt: "Partner" },
  { src: "/images/clients/89d1c6b6ebb74710bd3322b96d3cc4d3c9e05aa8.png", alt: "Partner" },
  { src: "/images/clients/21e0d02903f06469fae4cb5572bb8b61e9054cbc.png", alt: "Partner" },
  { src: "/images/clients/42ed1012fb2cbebb8c03ba6a3d98e362a6206b29.png", alt: "Partner" },
];

export function LogoMarquee() {
  const doubled = [...clientLogos, ...clientLogos];

  return (
    <section className="section-dark py-16 border-y border-white/[0.04]">
      <div className="container-wide mb-8">
        <p className="text-caption text-white/30 text-center uppercase tracking-[0.2em]">
          Trusted by innovative brands worldwide
        </p>
      </div>

      <div className="relative overflow-hidden mask-fade-edges">
        <div className="flex items-center gap-16 animate-marquee">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-8 w-auto opacity-40 hover:opacity-80 transition-opacity duration-300 grayscale hover:grayscale-0"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={32}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
