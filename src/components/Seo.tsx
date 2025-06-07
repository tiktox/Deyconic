'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Head from 'next/head';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

export default function Seo({
  title = 'Deyconic - Soluciones Tecnológicas',
  description = 'Plataforma de soluciones tecnológicas integrales para empresas y particulares',
  image = 'https://ik.imagekit.io/ajkl5a98u/logo_1000x1000-removebg-preview.png?updatedAt=1746469003137',
  type = 'website',
}: SeoProps) {
  const pathname = usePathname();
  const canonicalUrl = `https://deyconic.com${pathname}`;

  useEffect(() => {
    // Actualizar el título de la página
    document.title = title;
  }, [title]);

  return (
    <Head>
      {/* Metadatos básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Deyconic" />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Otros metadatos importantes */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </Head>
  );
} 