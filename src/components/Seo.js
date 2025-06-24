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

      <title>Deyconic</title>

      <meta name="description" content="Deyconic: Creamos sitios web corporativos que generan leads y ventas. Expertos en diseño UX/UI y desarrollo web a medida para empresas globales. Potencia tu marca." />

      <meta property="og:url" content="https://deyconic.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Deyconic | Diseño y Desarrollo Web Profesional para Empresas" />
      <meta property="og:description" content="Transforma tu visión digital en sitios web de alto impacto para empresas internacionales. Diseño, desarrollo y estrategia para tu éxito online." />
      <meta property="og:image" content="https://deyconic.vercel.app/images/deyconic-og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta property="og:site_name" content="Deyconic" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Deyconic" />
      <meta name="twitter:title" content="Deyconic: Tu Socio en Diseño y Desarrollo Web Profesional" />
      <meta name="twitter:description" content="Potencia tu negocio con diseño y desarrollo web a medida que genera resultados. Expertos en UX/UI y soluciones corporativas." />
      <meta name="twitter:image" content="https://deyconic.vercel.app/images/deyconic-twitter-image.jpg" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
}

export default Seo; 