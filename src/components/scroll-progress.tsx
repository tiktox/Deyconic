"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const rafRef = useRef<number>();
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      const currentScroll = window.scrollY;
      
      // Only update if scroll changed significantly
      if (Math.abs(currentScroll - lastScrollY.current) < 5) return;
      
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollProgress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
      
      setProgress(scrollProgress);
      setShowScrollToTop(scrollProgress > 20);
      lastScrollY.current = currentScroll;
    });
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center will-change-transform">
      {/* Progress Bar */}
      <div className="w-2 bg-muted-foreground/20 rounded-full overflow-hidden flex-grow" style={{ height: '200px' }}>
        <div
          className="w-full bg-primary rounded-full transition-transform duration-300 ease-out will-change-transform"
          style={{ 
            transform: `translateY(${100 - progress}%)`,
            height: '100%'
          }}
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