'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  splitBy?: 'chars' | 'words' | 'lines';
  stagger?: number;
  scrub?: boolean;
}

export default function TextReveal({
  children,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  splitBy = 'words',
  stagger = 0.03,
  scrub = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Split text
    const text = el.textContent || '';
    let parts: string[];

    if (splitBy === 'chars') {
      parts = text.split('');
    } else if (splitBy === 'words') {
      parts = text.split(' ');
    } else {
      parts = text.split('\n');
    }

    el.innerHTML = parts
      .map((part, i) => {
        const content = splitBy === 'chars' ? part : part;
        return `<span class="inline-block overflow-hidden"><span class="text-reveal-part inline-block" style="transform: translateY(110%)">${content}</span></span>`;
      })
      .join(splitBy === 'chars' ? '' : ' ');

    const spans = el.querySelectorAll('.text-reveal-part');

    const tl = gsap.timeline({
      scrollTrigger: scrub ? {
        trigger: el,
        start: 'top 85%',
        end: 'top 40%',
        scrub: 1,
      } : {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(spans, {
      y: 0,
      duration: 0.8,
      stagger: stagger,
      ease: 'power3.out',
      delay: delay,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [children, splitBy, stagger, delay, scrub]);

  // @ts-ignore
  return <Tag ref={containerRef} className={className}>{children}</Tag>;
}
