"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';

function Seo() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Deyconic",
    "url": "https://deyconic.vercel.app/",
    "image": "https://deyconic.vercel.app/img/logo-deyconic.jpg",
    "description": "Deyconic ofrece servicios de desarrollo web, transformación digital y gestión empresarial en República Dominicana.",
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
      {/* Schema Markup (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
}

export default Seo; 