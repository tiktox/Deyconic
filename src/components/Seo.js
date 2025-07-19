"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';

function Seo() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Deyconic",
    "url": "https://deyconic.vercel.app/",
    "image": "https://ik.imagekit.io/ajkl5a98u/1000x1000-removebg-preview2.0.png?updatedAt=1746468946560",
    "description": "Somos una institución que ofrece servicios digitales y físicos a empresas que no tienen presencia en redes sociales o no cuentan con una plataforma profesional que los posicione en los motores de búsqueda.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Las Colinas",
      "addressLocality": "Santiago de los Caballeros",
      "addressCountry": "DO"
    },
    "telephone": "+1-829-931-5704",
    "openingHours": "Mo-Fr 08:00-6:00"
  };
  return (
    <Helmet>
      <title>Deyconic | Servicios Digitales y Físicos para Empresas</title>
      
      {/* Schema Markup (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>

      <meta name="description" content="Somos una institución que ofrece servicios digitales y físicos a empresas que no tienen presencia en redes sociales o no cuentan con una plataforma profesional que los posicione en los motores de búsqueda." />

      <meta property="og:url" content="https://deyconic.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Deyconic | Servicios Digitales y Físicos para Empresas" />
      <meta property="og:description" content="Somos una institución que ofrece servicios digitales y físicos a empresas que no tienen presencia en redes sociales o no cuentan con una plataforma profesional que los posicione en los motores de búsqueda." />
      <meta property="og:image" content="https://deyconic.vercel.app/images/deyconic-og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta property="og:site_name" content="Deyconic" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Deyconic" />
      <meta name="twitter:title" content="Deyconic | Servicios Digitales y Físicos para Empresas" />
      <meta name="twitter:description" content="Somos una institución que ofrece servicios digitales y físicos a empresas que no tienen presencia en redes sociales o no cuentan con una plataforma profesional que los posicione en los motores de búsqueda." />
      <meta name="twitter:image" content="https://deyconic.vercel.app/images/deyconic-twitter-image.jpg" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
}

export default Seo; 