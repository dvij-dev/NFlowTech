'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  scale?: boolean;
  opacity?: boolean;
}

export default function RevealOnScroll({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  scale = false,
  opacity = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fromVars: any = {};
    if (opacity) fromVars.opacity = 0;
    if (scale) fromVars.scale = 0.95;

    switch (direction) {
      case 'up': fromVars.y = distance; break;
      case 'down': fromVars.y = -distance; break;
      case 'left': fromVars.x = distance; break;
      case 'right': fromVars.x = -distance; break;
    }

    gsap.from(el, {
      ...fromVars,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [direction, delay, duration, distance, scale, opacity]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
