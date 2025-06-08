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

<<<<<<< HEAD
<<<<<<< HEAD
      <title>Diseño y Desarrollo Web Profesional para Empresas | Deyconic</title>

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

=======
      {/* Meta Description */}
      <meta name="description" content="Deyconic es una institución que ofrece servicios digitales y fisicos a empresas que no tienen presencia en redes sociales o no cuentan con una plataforma profesional que los posicione en los motores de busqueda, nuestro objetivo es lograr el impulso digital para pequeñas y grandes empresas y mejorar la interacción empresarial con el cliente. Nuestro equipo de expertos fusiona creatividad y tecnología para potenciar el crecimiento de tu negocio, ya sea en el ámbito digital o físico, alcanzando el máximo nivel de desarrollo empresarial para tu organización." />
=======
      <title>Diseño y Desarrollo Web Profesional para Empresas | Deyconic</title>
>>>>>>> fc2cc9e92f36e1b2b279c4b2c3c700b1ab95053a

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

<<<<<<< HEAD
      {/* Viewport Meta */}
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
=======
>>>>>>> fc2cc9e92f36e1b2b279c4b2c3c700b1ab95053a
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
}

export default Seo; 