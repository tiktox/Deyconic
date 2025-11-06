"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import EvaluationModal from "@/components/modals/evaluation-modal";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => setVideoLoaded(true);
      video.addEventListener('canplay', handleCanPlay);
      return () => video.removeEventListener('canplay', handleCanPlay);
    }
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Optimized Background */}
      <div className="absolute inset-0 z-0">
        {!videoLoaded && (
          <Image
            src="https://picsum.photos/1920/1080?random=1"
            alt="Hero background"
            fill
            priority
            quality={60}
            className="object-cover"
            sizes="100vw"
          />
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
          <source src="https://videos.pexels.com/video-files/3209211/3209211-sd_640_360_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6" // Changed text color to white for better contrast
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Deyconic te brinda <span className="text-primary">Innovación</span> y <span className="text-accent">Desarrollo</span>
        </motion.h1>
        <motion.p 
          className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-10" // Changed text color for better contrast
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Lleva tu negocio al éxito digital con nuestras soluciones estratégicas y tecnológicas de vanguardia.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            className="text-lg px-4 sm:px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow group bg-primary hover:bg-primary/90 text-primary-foreground" 
            onClick={() => setIsModalOpen(true)}
          >
            <span className="hidden sm:inline">Evalúa tu Empresa</span>
            <ArrowRight className="h-5 w-5 sm:ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
      <EvaluationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

