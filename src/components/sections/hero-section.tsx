"use client";

import { Button } from "@/components/ui/button";
import DigitalizationFormModal from "@/components/modals/digitalization-form-modal";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const projectImages = [
  "https://ik.imagekit.io/8om8rmpb6/Sell%20secci%C3%B3n%20.png?updatedAt=1791403190499",
  "https://ik.imagekit.io/8om8rmpb6/Home%20prime%20legacy%20ring.png?updatedAt=1791404912810",
  "https://ik.imagekit.io/8om8rmpb6/Home%20Deyconic%20store1.png?updatedAt=1791405296048",
  "https://ik.imagekit.io/8om8rmpb6/Home%20reverglim.png?updatedAt=1791405631982",
];

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [activeImage, setActiveImage] = useState(1);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [hiddenImage, setHiddenImage] = useState<number | null>(null);
  const hiddenImageTimer = useRef<number | null>(null);

  const selectImage = useCallback((nextImage: number) => {
    if (nextImage === activeImage) return;

    const direction = (nextImage - activeImage + projectImages.length) % projectImages.length <= projectImages.length / 2
      ? 1
      : -1;
    const imageToWrap = direction > 0
      ? (activeImage - 1 + projectImages.length) % projectImages.length
      : (activeImage + 1) % projectImages.length;

    if (hiddenImageTimer.current !== null) {
      window.clearTimeout(hiddenImageTimer.current);
    }

    setHiddenImage(imageToWrap);
    setActiveImage(nextImage);
    hiddenImageTimer.current = window.setTimeout(() => {
      setHiddenImage(null);
      hiddenImageTimer.current = null;
    }, 500);
  }, [activeImage]);

  useEffect(() => {
    if (isCarouselPaused) return;

    const interval = window.setInterval(() => {
      selectImage((activeImage + 1) % projectImages.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [activeImage, isCarouselPaused, selectImage]);

  useEffect(() => () => {
    if (hiddenImageTimer.current !== null) {
      window.clearTimeout(hiddenImageTimer.current);
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 pb-10 pt-24 sm:px-6"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {!videoLoaded && <div className="absolute inset-0 bg-black" />}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <source
            src="https://www.pexels.com/es-es/download/video/3209211/"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] text-center lg:left-[7px] lg:translate-y-[94px]">
        <Button
          type="button"
          onClick={() => setIsRequestModalOpen(true)}
          className="relative -top-10 h-[30px] w-[140px] rounded-xl bg-white px-0 text-1xl font-bold text-primary-foreground hover:bg-primary/90"
        >
          SOLICITAR
        </Button>

        <h1 className="relative mx-auto mt-8 max-w-[360px] text-base font-bold -top-10 leading-snug text-white sm:mt-8 lg:mt-[20px]">
          SOLICITA UNA WEB PROFESIONAL A LA ALTURA DE TU EMPRESA
        </h1>

        <div
          className="relative -top-10 mx-auto mt-5 h-[190px] w-full sm:mt-6 sm:h-[220px] lg:mt-[17px] lg:h-[270px] lg:[--side-offset-y:36px]"
          role="region"
          aria-label="Carrusel de imágenes de proyectos"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
          onFocus={() => setIsCarouselPaused(true)}
          onBlur={() => setIsCarouselPaused(false)}
        >
          {projectImages.map((image, index) => {
            const isActive = index === activeImage;
            const circularOffset = (index - activeImage + projectImages.length) % projectImages.length;
            const offset = circularOffset > projectImages.length / 2
              ? circularOffset - projectImages.length
              : circularOffset;
            const isVisible = Math.abs(offset) <= 1;
            const positionClass = isActive
              ? "left-1/2"
              : offset < 0
                ? "left-0 sm:left-[12%]"
                : "left-full sm:left-[88%]";

            return (
              <button
                key={image}
                type="button"
                aria-label={`Mostrar imagen ${index + 1}`}
                aria-pressed={isActive}
                aria-hidden={!isVisible}
                tabIndex={isVisible ? 0 : -1}
                onClick={() => selectImage(index)}
                className={`absolute top-1/2 aspect-[2.125/1] w-[82vw] max-w-[400px] overflow-hidden rounded-xl bg-white shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-[42vw] sm:max-w-[600px] sm:rounded-2xl ${
                  hiddenImage === index
                    ? "transition-none"
                    : "transition-[left,transform,opacity] duration-500 ease-in-out"
                } ${positionClass}`}
                style={{
                  transform: `translate(-50%, calc(-50% + ${isActive ? "0px" : "var(--side-offset-y, 0px)"})) scale(${isActive ? 1 : "0.66, 0.82"})`,
                  opacity: hiddenImage === index || !isVisible ? 0 : isActive ? 1 : 0.5,
                  zIndex: isActive ? 2 : 1,
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                <Image
                  src={`${image}&tr=w-1200,h-600,q-85,f-webp,c-at_max`}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 82vw, 42vw"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>

      </div>

      <DigitalizationFormModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
    </section>
  );
}
