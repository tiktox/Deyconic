"use client";

import { ReactNode, useRef } from 'react';
import { useInView } from 'framer-motion';

interface LazySectionProps {
  children: ReactNode;
  threshold?: number;
  margin?: string;
  className?: string;
}

export default function LazySection({ 
  children, 
  threshold = 0.1, 
  margin = "100px",
  className = ""
}: LazySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold,
    margin 
  });

  return (
    <div ref={ref} className={className}>
      {isInView ? children : <div style={{ minHeight: '200px' }} />}
    </div>
  );
}