'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Quick dark fade — seamlessly transitions into the dark starfield
    const tl = gsap.timeline({
      delay: 0.5,
      onComplete: () => setIsLoading(false),
    });

    tl.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    });

    return () => { tl.kill(); };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] bg-[#020208] flex items-center justify-center"
    />
  );
}
