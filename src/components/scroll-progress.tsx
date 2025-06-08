"use client";

<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

// Throttle function
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};
=======
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button"; // Assuming you use this button component
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
=======
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

// Throttle function
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
};
>>>>>>> fc2cc9e92f36e1b2b279c4b2c3c700b1ab95053a

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fc2cc9e92f36e1b2b279c4b2c3c700b1ab95053a
  const handleScroll = useCallback(throttle(() => {
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const currentScroll = window.scrollY;
    const scrollProgress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
    
    requestAnimationFrame(() => {
<<<<<<< HEAD
      setProgress(scrollProgress);
      setShowScrollToTop(scrollProgress > 95);
    });
  }, 16), []); // 16ms = ~60fps

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
=======
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      // Avoid division by zero if the page isn't scrollable yet
      const scrollProgress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
=======
>>>>>>> fc2cc9e92f36e1b2b279c4b2c3c700b1ab95053a
      setProgress(scrollProgress);
      setShowScrollToTop(scrollProgress > 95);
    });
  }, 16), []); // 16ms = ~60fps

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
<<<<<<< HEAD
  }, []);
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
=======
  }, [handleScroll]);
>>>>>>> fc2cc9e92f36e1b2b279c4b2c3c700b1ab95053a

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center will-change-transform">
      {/* Progress Bar */}
      <div className="w-2 bg-muted-foreground/20 rounded-full overflow-hidden flex-grow" style={{ height: '200px' }}>
        <div
          className="w-full bg-primary rounded-full transition-transform duration-300 ease-out will-change-transform"
          style={{ 
            transform: `translateY(${100 - progress}%)`,
            height: '100%'
          }}
=======
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center">
      {/* Progress Bar */}
      <div className="w-2 bg-muted-foreground/20 rounded-full overflow-hidden flex-grow" style={{ height: '200px' }}>
        <div
          className="w-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ height: `${progress}%` }}
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
=======
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center will-change-transform">
      {/* Progress Bar */}
      <div className="w-2 bg-muted-foreground/20 rounded-full overflow-hidden flex-grow" style={{ height: '200px' }}>
        <div
          className="w-full bg-primary rounded-full transition-transform duration-300 ease-out will-change-transform"
          style={{ 
            transform: `translateY(${100 - progress}%)`,
            height: '100%'
          }}
>>>>>>> fc2cc9e92f36e1b2b279c4b2c3c700b1ab95053a
        ></div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollToTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <Button
              variant="default"
              size="icon"
              className="rounded-full shadow-lg"
              onClick={scrollToTop}
            >
              <ChevronUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 