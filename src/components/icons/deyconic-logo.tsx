// src/components/icons/deyconic-logo.tsx
"use client";

import Image from 'next/image';
import { useTheme } from 'next-themes';
<<<<<<< HEAD
import { useEffect, useState, memo } from 'react';
=======
import { useEffect, useState } from 'react';
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707

interface DeyconicLogoProps {
  className?: string;
  lightLogoUrl: string;
  darkLogoUrl: string;
  width?: number;
  height?: number;
}

<<<<<<< HEAD
const DeyconicLogo = memo(function DeyconicLogo({ 
  className, 
  lightLogoUrl, 
  darkLogoUrl, 
  width = 32, 
  height = 32 
}: DeyconicLogoProps) {
=======
export function DeyconicLogo({ className, lightLogoUrl, darkLogoUrl, width = 32, height = 32 }: DeyconicLogoProps) {
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder or null to avoid hydration mismatch
    return <div style={{ width: `${width}px`, height: `${height}px` }} className={className} />;
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const logoUrl = currentTheme === 'dark' ? darkLogoUrl : lightLogoUrl;

  return (
    <Image
      src={logoUrl}
      alt="Deyconic Logo"
      width={width}
      height={height}
      className={className}
      priority
<<<<<<< HEAD
      loading="eager"
      quality={90}
      sizes={`${width}px`}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
});

export { DeyconicLogo };
=======
    />
  );
}
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
