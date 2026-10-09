"use client";

import Image from "next/image";
import { useState } from "react";

interface MobileProjectGalleryProps {
  images: string[];
  title: string;
}

export default function MobileProjectGallery({
  images,
  title,
}: MobileProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];
  const thumbnails = images
    .map((image, index) => ({ image, index }))
    .filter(({ index }) => index !== selectedIndex);

  return (
    <div>
      <div className="flex w-max items-start justify-start gap-2 sm:gap-4">
        <div className="relative aspect-[9/16] w-[clamp(150px,24vw,240px)] shrink-0">
          <Image
            key={selectedImage}
            src={selectedImage}
            alt={`${title}, vista ${selectedIndex + 1}`}
            fill
            priority
            sizes="(max-width: 640px) 150px, (max-width: 1024px) 24vw, 240px"
            className="object-contain"
          />
        </div>

        {thumbnails.map(({ image, index }) => (
          <button
            key={image}
            type="button"
            aria-label={`Mostrar vista ${index + 1} de ${title}`}
            onClick={() => setSelectedIndex(index)}
            className="relative aspect-[9/16] w-[clamp(150px,24vw,240px)] shrink-0 transition hover:opacity-80"
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 640px) 150px, (max-width: 1024px) 24vw, 240px"
              className="object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
