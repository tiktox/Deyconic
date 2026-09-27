"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => setVideoLoaded(true);
      video.addEventListener('canplay', handleCanPlay);
      
      const timer = setTimeout(() => {
        if (video.readyState < 3) video.load();
      }, 100);
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {!videoLoaded && (
          <div className="absolute inset-0 bg-black" />
        )}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className={`w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="https://videos.pexels.com/video-files/5725962/5725962-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
<div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="flex-1 text-left max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Deyconic te brinda<br />
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  innovación y desarrollo
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Lleva tu negocio al máximo nivel con evaluaciones diarias que<br />
                te brinda Deyconic Plus
              </p>
              <Button 
                asChild
                className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-full shadow-lg transition-all duration-300 text-lg font-medium"
              >
                <Link href="/plus/login">Deyconic plus</Link>
              </Button>
            </div>

          </div>
        </div>
      </div>
      
    </section>
  );
}
