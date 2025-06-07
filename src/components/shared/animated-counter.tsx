"use client";

<<<<<<< HEAD
import { useEffect, useState, useRef, memo } from "react";
=======
import { useEffect, useState, useRef } from "react";
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  to: number;
  duration?: number;
  className?: string;
}

<<<<<<< HEAD
const AnimatedCounter = memo(function AnimatedCounter({ 
  to, 
  duration = 1.5, 
  className 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.5,
    margin: "50px"
  });
=======
export default function AnimatedCounter({ to, duration = 1.5, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, to, {
        duration,
<<<<<<< HEAD
        ease: "easeOut",
=======
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
        onUpdate(value) {
          setCount(Math.round(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, to, duration]);

<<<<<<< HEAD
  return (
    <span 
      ref={ref} 
      className={className}
      aria-live="polite"
      aria-atomic="true"
    >
      {count}
    </span>
  );
});

export default AnimatedCounter;
=======
  return <span ref={ref} className={className}>{count}</span>;
}
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
