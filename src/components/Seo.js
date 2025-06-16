"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * A comprehensive SEO component for React applications using react-helmet-async.
 * This component dynamically generates meta tags, Open Graph tags, Twitter Cards,
 * and various JSON-LD schema markups based on provided props, aligning with
 * advanced SEO best practices and the Deyconic SEO strategy.
 *
 * It's designed to be highly configurable, allowing different pages to have
 * tailored SEO information.
 *
 * @param {object} props - The properties for the SEO component.
 * @param {string} props.title - The primary title for the page (meta title, OG title, Twitter title).
 * @param {string} props.description - The meta description for the page (meta description, OG description, Twitter description).
 * @param {string} props.url - The canonical URL for the current page.
 * @param {string} [props.image] - The URL of the primary image for social sharing (OG image, Twitter image).
 * @param {number} [props.imageWidth] - The width of the primary image in pixels.
 * @param {number} [props.imageHeight] - The height of the primary image in pixels.
 * @param {string} [props.type='website'] - The Open Graph type (e.g., 'website', 'article', 'product').
 * @param {string[]} [props.keywords=[]] - An array of keywords relevant to the page content.
 * @param {string} [props.author='Deyconic'] - The author of the content (especially for articles).
 * @param {string} [props.publishedTime] - ISO 8601 formatted date string for content publication (for 'article' type).
 * @param {string} [props.modifiedTime] - ISO 8601 formatted date string for content last modification (for 'article' type).
 * @param {object[]} [props.faqData=[]] - An array of FAQ objects for FAQPage schema: [{ question: string, answer: string }].
 * @param {object[]} [props.serviceData=[]] - An array of service objects for Service schema: [{ name: string, description: string, url: string, image: string, offers: { price: string, priceCurrency: string }}].
 * @param {object[]} [props.reviews=[]] - An array of review objects for Review/AggregateRating schema: [{ author: string, datePublished: string, reviewBody: string, reviewRating: { ratingValue: number, bestRating: number }}].
 * @param {object[]} [props.breadcrumbs=[]] - An array of breadcrumb objects for BreadcrumbList schema: [{ name: string, item: string }].
 * @param {string} [props.locale='en_US'] - The Open Graph locale (e.g., 'en_US', 'es_ES').
 * @param {object[]} [props.alternateLocales=[]] - An array of alternate locale objects for hreflang: [{ locale: string, url: string }].
 * @param {boolean} [props.noIndex=false] - If true, adds 'noindex, nofollow' to robots meta tag.
 */
function Seo({
  title,
  description,
  url,
  image = 'https://deyconic.vercel.app/images/deyconic-og-image.jpg',
  imageWidth = 1200,
  imageHeight = 627,
  type = 'website',
  keywords = [],
  author = 'Deyconic',
  publishedTime,
  modifiedTime,
  faqData = [],
  serviceData = [],
  reviews = [],
  breadcrumbs = [],
  locale = 'en_US',
  alternateLocales = [],
  noIndex = false,
}) {

  // --- Constants and Default Values ---
  const siteName = "Deyconic";
  const twitterHandle = "@Deyconic"; // From SEO.txt
  const defaultLogo = "https://deyconic.vercel.app/img/logo-deyconic.jpg";

  // --- Helper Functions for Schema Generation ---

  /**
   * Generates LocalBusiness Schema.org data.
   * Based on current location (Santiago de los Caballeros) and `seo.js.txt` content.
   */
  const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteName,
    "url": "https://deyconic.vercel.app/",
    "image": defaultLogo,
    "description": "Deyconic ofrece servicios de desarrollo web, transformación digital y gestión empresarial en República Dominicana. Creamos sitios web corporativos que generan leads y ventas para empresas globales.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Las Colinas", // Example street address
      "addressLocality": "Santiago de los Caballeros",
      "addressRegion": "Santiago",
      "addressCountry": "DO"
    },
    "telephone": "+1-829-931-5704",
    "openingHours": "Mo-Fr 08:00-18:00", // Corrected format for ISO 8601
    "priceRange": "$$$", // Example price range
    "hasMap": "https://www.google.com/maps/place/Deyconic/@19.46747,-70.70617,17z", // Example Google Maps URL
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-829-931-5704",
        "contactType": "customer service",
        "areaServed": ["US", "DO", "LATAM", "Europe"],
        "availableLanguage": ["English", "Spanish"]
      }
    ],
    "sameAs": [
      "https://www.facebook.com/deyconic",
      "https://www.instagram.com/deyconic",
      "https://www.linkedin.com/company/deyconic",
      "https://twitter.com/Deyconic" // From SEO.txt
    ]
  });

  /**
   * Generates Organization Schema.org data.
   */
  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": "https://deyconic.vercel.app/",
    "logo": defaultLogo,
    "sameAs": [
      "https://www.facebook.com/deyconic",
      "https://www.instagram.com/deyconic",
      "https://www.linkedin.com/company/deyconic",
      "https://twitter.com/Deyconic"
    ]
  });

  /**
   * Generates WebSite Schema.org data (for sitelinks searchbox).
   */
  const getWebSiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://deyconic.vercel.app/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://deyconic.vercel.app/search?q={search_term_string}"
      },
      "queryInput": "required name=search_term_string"
    }
  });

  /**
   * Generates FAQPage Schema.org data.
   * @param {object[]} faqs - Array of FAQ objects.
   */
  const getFaqPageSchema = (faqs) => {
    if (!faqs || faqs.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  /**
   * Generates Service Schema.org data for a list of services.
   * @param {object[]} services - Array of service objects.
   */
  const getServiceSchema = (services) => {
    if (!services || services.length === 0) return null;

    return services.map(service => ({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": service.name,
      "name": service.name,
      "description": service.description,
      "url": service.url,
      "image": service.image,
      "provider": {
        "@type": "LocalBusiness",
        "name": siteName,
        "url": "https://deyconic.vercel.app/"
      },
      "offers": service.offers ? {
        "@type": "Offer",
        "price": service.offers.price,
        "priceCurrency": service.offers.priceCurrency
      } : undefined
    }));
  };

  /**
   * Generates AggregateRating and Review Schema.org data.
   * @param {object[]} reviewList - Array of review objects.
   */
  const getReviewSchema = (reviewList) => {
    if (!reviewList || reviewList.length === 0) return null;

    const totalRating = reviewList.reduce((sum, r) => sum + r.reviewRating.ratingValue, 0);
    const averageRating = totalRating / reviewList.length;

    return {
      "@context": "https://schema.org",
      "@type": "Product", // Can also be Service, LocalBusiness depending on context
      "name": title, // Or name of the service/product being reviewed
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": averageRating.toFixed(1),
        "reviewCount": reviewList.length
      },
      "review": reviewList.map(review => ({
        "@type": "Review",
        "author": { "@type": "Person", "name": review.author },
        "datePublished": review.datePublished,
        "reviewBody": review.reviewBody,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.reviewRating.ratingValue,
          "bestRating": review.reviewRating.bestRating // Max rating, e.g., 5
        }
      }))
    };
  };

  /**
   * Generates Article/BlogPosting Schema.org data.
   */
  const getArticleSchema = () => {
    if (type !== 'article') return null;
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },
      "headline": title,
      "description": description,
      "image": {
        "@type": "ImageObject",
        "url": image,
        "width": imageWidth,
        "height": imageHeight
      },
      "author": {
        "@type": "Person",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": siteName,
        "logo": {
          "@type": "ImageObject",
          "url": defaultLogo,
          "width": 600, // Example size
          "height": 60 // Example size
        }
      },
      "datePublished": publishedTime,
      "dateModified": modifiedTime || publishedTime
    };
  };

  /**
   * Generates BreadcrumbList Schema.org data.
   * @param {object[]} breadcrumbsList - Array of breadcrumb objects.
   */
  const getBreadcrumbSchema = (breadcrumbsList) => {
    if (!breadcrumbsList || breadcrumbsList.length === 0) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbsList.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.item
      }))
    };
  };


  // --- Combine all schema data ---
  const allSchemaData = [
    getLocalBusinessSchema(),
    getOrganizationSchema(),
    getWebSiteSchema(),
    getFaqPageSchema(faqData),
    getServiceSchema(serviceData),
    getReviewSchema(reviews),
    getArticleSchema(),
    getBreadcrumbSchema(breadcrumbs)
  ].filter(Boolean); // Filter out null values

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>Deyconic</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="referrer" content="origin-when-cross-origin" />
      <meta name="theme-color" content="#317EFB" /> {/* Example theme color */}
      <link rel="canonical" href={url} />

      {/* Viewport for Responsive Design (Good Practice) */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph Meta Tags (for Facebook, LinkedIn, etc.) */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {imageWidth && <meta property="og:image:width" content={imageWidth.toString()} />}
      {imageHeight && <meta property="og:image:height" content={imageHeight.toString()} />}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      {alternateLocales.map((alt, index) => (
        <meta key={`og-locale-alt-${index}`} property="og:locale:alternate" content={alt.locale} />
      ))}

      {/* Article Specific Open Graph Tags (if type is 'article') */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {/* Example for article section or tag */}
      {type === 'article' && keywords.length > 0 && (
        keywords.map((keyword, index) => (
          <meta key={`article-tag-${index}`} property="article:tag" content={keyword} />
        ))
      )}


      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />} {/* For specific author/creator */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={description} /> {/* Twitter image alt text */}

      {/* Favicons and Apple Touch Icons */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />

      {/* Hreflang Tags for International SEO (as per SEO.txt) */}
      {/* Example structure for alternateLocales:
          [{ locale: 'es-ES', url: 'https://deyconic.vercel.app/es' },
           { locale: 'en-US', url: 'https://deyconic.vercel.app/en' }]
      */}
      {alternateLocales.map((alt, index) => (
        <link key={`hreflang-${index}`} rel="alternate" hrefLang={alt.locale} href={alt.url} />
      ))}
      {/* Fallback hreflang for default language if not explicitly included in alternates */}
      <link rel="alternate" hrefLang="x-default" href={url} />


      {/* JSON-LD Schema Markup */}
      {allSchemaData.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Additional potential scripts or meta tags can be added here
          e.g., Google Site Verification meta tags (if dynamically added)
          <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      */}
    </Helmet>
  );
}

export default Seo;

// --- Example Usage and Data Structures for Reference ---
/*
// Basic Usage
<Seo
  title="Deyconic"
  description="Transforma tu visión digital en sitios web de alto impacto para empresas internacionales. Diseño, desarrollo y estrategia para tu éxito online."
  url="https://deyconic.vercel.app/"
/>

// Blog Post Usage
<Seo
  title="Cómo el Diseño UX/UI Impulsa tus Ventas"
  description="Descubre cómo una excelente experiencia de usuario puede convertir visitantes en clientes fieles."
  url="https://deyconic.vercel.app/blog/ux-ui-ventas"
  image="https://deyconic.vercel.app/images/blog/ux-ui-sales.jpg"
  imageWidth={800}
  imageHeight={450}
  type="article"
  keywords={['UX/UI', 'diseño web', 'ventas', 'experiencia de usuario']}
  author="Equipo Deyconic"
  publishedTime="2023-10-26T10:00:00Z"
  modifiedTime="2024-06-15T14:30:00Z"
  faqData={[
    { question: '¿Qué es UX/UI?', answer: 'UX se refiere a la experiencia de usuario y UI a la interfaz de usuario.' },
    { question: '¿Por qué es importante el UX para mi negocio?', answer: 'Un buen UX mejora la satisfacción del cliente y las tasas de conversión.' },
  ]}
  breadcrumbs={[
    { name: 'Home', item: 'https://deyconic.vercel.app/' },
    { name: 'Blog', item: 'https://deyconic.vercel.app/blog' },
    { name: 'Cómo el Diseño UX/UI Impulsa tus Ventas', item: 'https://deyconic.vercel.app/blog/ux-ui-ventas' }
  ]}
/>

// Service Page Usage
<Seo
  title="Desarrollo Web a Medida para Empresas Globales | Deyconic"
  description="Creamos soluciones web personalizadas que se adaptan perfectamente a las necesidades de tu negocio."
  url="https://deyconic.vercel.app/servicios/desarrollo-web"
  image="https://deyconic.vercel.app/images/services/custom-dev.jpg"
  type="website" // Or 'product' if treated as a product for schema purposes
  keywords={['desarrollo web a medida', 'soluciones corporativas', 'aplicaciones web']}
  serviceData={[
    {
      name: "Desarrollo Web a Medida",
      description: "Construcción de sitios y aplicaciones web personalizadas para satisfacer requisitos específicos de negocio.",
      url: "https://deyconic.vercel.app/servicios/desarrollo-web",
      image: "https://deyconic.vercel.app/images/services/custom-dev.jpg",
      offers: { price: "Contacto para cotización", priceCurrency: "USD" }
    },
    {
      name: "Diseño UX/UI",
      description: "Creación de experiencias de usuario intuitivas y atractivas para maximizar la conversión y la satisfacción.",
      url: "https://deyconic.vercel.app/servicios/ux-ui",
      image: "https://deyconic.vercel.app/images/services/ux-ui.jpg",
      offers: { price: "Contacto para cotización", priceCurrency: "USD" }
    }
  ]}
  reviews={[
    {
      author: 'Cliente Satisfecho 1',
      datePublished: '2024-05-10',
      reviewBody: 'Excelente trabajo, superaron nuestras expectativas en el desarrollo de la plataforma.',
      reviewRating: { ratingValue: 5, bestRating: 5 }
    },
    {
      author: 'Cliente Satisfecho 2',
      datePublished: '2024-04-22',
      reviewBody: 'El diseño UX/UI fue clave para nuestro éxito, muy profesionales.',
      reviewRating: { ratingValue: 5, bestRating: 5 }
    }
  ]}
  locale="es_ES"
  alternateLocales={[
    { locale: 'en-US', url: 'https://deyconic.vercel.app/en/services/web-development' },
    { locale: 'es-ES', url: 'https://deyconic.vercel.app/es/servicios/desarrollo-web' }
  ]}
/>
*/