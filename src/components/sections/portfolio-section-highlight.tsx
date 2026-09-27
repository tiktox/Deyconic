"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function PortfolioSectionHighlight() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="proyectos">
      <div className="relative w-full h-[350px] sm:h-[420px] flex items-center justify-center mb-50 overflow-hidden rounded-2xl shadow-lg">
        {shouldLoad ? (
          <video
            ref={videoRef}
            src="https://videos.pexels.com/video-files/3191248/3191248-sd_640_360_25fps.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          />
        ) : (
          <div ref={videoRef} className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 z-0" />
        )}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <a href="/proyectos" className="z-20">
          <Button
            size="lg"
            className="rounded-full px-10 py-4 text-xl font-medium bg-black/60 text-white hover:bg-primary/90 hover:text-primary-foreground shadow-lg backdrop-blur-md transition-all"
          >
            Ver proyectos
          </Button>
        </a>
      </div>
    </section>
  );
}