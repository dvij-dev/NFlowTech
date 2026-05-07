'use client';

import { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTransform(`translate3d(${x * strength}px, ${y * strength}px, 0)`);
  };

  const handleMouseLeave = () => {
    setTransform('translate3d(0, 0, 0)');
  };

  const style = {
    transform,
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const props = {
    ref: ref as any,
    className,
    style,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    'data-cursor-hover': true,
  };

  if (href) {
    return <a href={href} {...props}>{children}</a>;
  }

  return <button {...props}>{children}</button>;
}
