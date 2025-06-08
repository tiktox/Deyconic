"use client";

<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect, useState, useRef, memo } from "react";
=======
import { useEffect, useState, useRef } from "react";
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
=======
import { useEffect, useState, useRef, memo } from "react";
>>>>>>> fc2cc9e92f36e1b2b279c4b2c3c700b1ab95053a
import { useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  to: number;
  duration?: number;
  className?: string;
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fc2cc9e92f36e1b2b279c4b2c3c700b1ab95053a
const AnimatedCounter = memo(function AnimatedCounter({ 
  to, 
  duration = 1.5, 
  className 
}: AnimatedCounterProps) {
<<<<<<< HEAD
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
=======
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: 0.5,
    margin: "50px"
  });
>>>>>>> fc2cc9e92f36e1b2b279c4b2c3c700b1ab95053a

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, to, {
        duration,
<<<<<<< HEAD
<<<<<<< HEAD
        ease: "easeOut",
=======
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
=======
        ease: "easeOut",
>>>>>>> fc2cc9e92f36e1b2b279c4b2c3c700b1ab95053a
        onUpdate(value) {
          setCount(Math.round(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, to, duration]);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fc2cc9e92f36e1b2b279c4b2c3c700b1ab95053a
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
<<<<<<< HEAD
=======
  return <span ref={ref} className={className}>{count}</span>;
}
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
=======
>>>>>>> fc2cc9e92f36e1b2b279c4b2c3c700b1ab95053a
