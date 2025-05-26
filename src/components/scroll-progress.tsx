"use client";

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button"; // Assuming you use this button component
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      // Avoid division by zero if the page isn't scrollable yet
      const scrollProgress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
      setProgress(scrollProgress);

      // Show scroll to top button when progress is close to 100%
      if (scrollProgress > 95) { // Threshold can be adjusted
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    // Also check initial position on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center">
      {/* Progress Bar */}
      <div className="w-2 bg-muted-foreground/20 rounded-full overflow-hidden flex-grow" style={{ height: '200px' }}>
        <div
          className="w-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ height: `${progress}%` }}
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