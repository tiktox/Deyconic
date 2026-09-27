# Schemas JSON-LD para SEO - Deyconic

## FAQ General - Página Principal

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué incluye un servicio de diseño web profesional en RD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nuestro servicio incluye diseño responsive optimizado para móviles, SEO técnico, hosting seguro, certificado SSL, capacitación completa y soporte 24/7. Todo enfocado en resultados medibles para tu negocio en República Dominicana."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo elegir una empresa de desarrollo web en República Dominicana?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Evalúa casos de éxito con métricas reales, transparencia en precios, experiencia local en Santiago de los Caballeros, velocidad de carga móvil, soporte continuo y conocimiento del mercado dominicano. Pide referencias verificables y revisa su portafolio."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tiempo toma desarrollar una página web profesional?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Un sitio web profesional toma entre 2-4 semanas dependiendo de la complejidad. Sitios básicos: 7-10 días. Tiendas online: 3-4 semanas. Plataformas personalizadas: 4-8 semanas. Entregamos cronograma detallado desde el inicio."
      }
    },
    {
      "@type": "Question",
      "name": "¿Ofrecen mantenimiento después de entregar la página web?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, incluimos 30 días de soporte gratuito post-lanzamiento. Luego ofrecemos planes de mantenimiento mensual con actualizaciones de seguridad, backups automáticos, optimización continua y soporte técnico prioritario para tu tranquilidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Puedo hacer cambios en mi página web después de creada?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutamente. Te capacitamos para gestionar contenidos básicos tú mismo. Para cambios de diseño o funcionalidad, nuestro equipo local en Santiago de los Caballeros está disponible con tiempos de respuesta rápidos y sin costos ocultos."
      }
    }
  ]
}
```

## LocalBusiness - Información Principal

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://deyconic.vercel.app/#localbusiness",
  "name": "Deyconic",
  "image": "https://ik.imagekit.io/ajkl5a98u/1000x1000-removebg-preview2.0.png?updatedAt=1746468946560",
  "description": "Empresa líder en desarrollo web profesional en República Dominicana. Creamos sitios optimizados que generan resultados medibles.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Avenida Las Colinas",
    "addressLocality": "Santiago de los Caballeros",
    "addressRegion": "Santiago",
    "postalCode": "51000",
    "addressCountry": "DO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "19.4517",
    "longitude": "-70.6970"
  },
  "telephone": "+1-829-931-5704",
  "email": "contacto@deyconic.com",
  "priceRange": "$300-$500",
  "serviceType": "Diseño y desarrollo web profesional",
  "areaServed": {
    "@type": "Country",
    "name": "República Dominicana"
  },
  "url": "https://deyconic.vercel.app",
  "openingHours": "Mo-Fr 09:00-18:00"
}
```

## Service - Servicios Principales

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://deyconic.vercel.app/#service",
  "serviceType": "Creación de Páginas Web Profesionales",
  "provider": {
    "@type": "LocalBusiness",
    "@id": "https://deyconic.vercel.app/#localbusiness"
  },
  "description": "Servicio completo de creación de páginas web profesionales optimizadas para SEO, con diseño responsive y soporte local en República Dominicana.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "300",
    "priceRange": "$300-$500"
  },
  "areaServed": {
    "@type": "Country",
    "name": "República Dominicana"
  }
}
```

## FAQ Técnico - Requisitos y Tecnología

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué se necesita para crear una página web profesional en RD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Necesitas un dominio (.com o .do), hosting confiable, diseño responsive, certificado SSL, contenido optimizado y SEO técnico. Nosotros gestionamos todo el proceso incluyendo integración de métodos de pago dominicanos como Qik."
      }
    },
    {
      "@type": "Question",
      "name": "¿Necesito SSL y hosting para mi página web en República Dominicana?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, son esenciales. El certificado SSL protege datos de tus clientes y mejora tu posicionamiento en Google. El hosting adecuado garantiza velocidad óptima para conexiones dominicanas. Incluimos ambos en nuestros paquetes."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es mejor: WordPress o un creador con IA para mi negocio en RD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WordPress es ideal para flexibilidad y escalabilidad a largo plazo. Creadores con IA son mejores para lanzamientos rápidos y presupuestos ajustados. Analizamos tu caso específico y recomendamos la mejor opción según tus objetivos comerciales."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo posicionar mi página web en Google en República Dominicana?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Implementamos SEO local con keywords dominicanas, optimización técnica de velocidad, contenido relevante, schema LocalBusiness, perfil Google My Business completo y estrategia de enlaces locales. Todo incluido en nuestro servicio de creación."
      }
    },
    {
      "@type": "Question",
      "name": "¿Hay costos ocultos al crear una página web profesional?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Ofrecemos transparencia total: desglosamos dominio, hosting, diseño, desarrollo y mantenimiento desde el inicio. Sin sorpresas. Recibes presupuesto detallado con todos los costos del primer año antes de comenzar."
      }
    }
  ]
}
```

## FAQ Precios - Para Página de Precios

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta un diseño web en República Dominicana en 2025?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los precios varían según complejidad: sitios básicos desde $300, corporativos $400, tiendas online $500, y plataformas personalizadas desde $500+. Todos incluyen hosting primer año, SSL y SEO básico sin costos ocultos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué factores afectan el costo de una página web en RD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Inciden: número de páginas, funcionalidades personalizadas, integraciones de pago, diseño a medida vs. plantillas, e-commerce, cantidad de productos, SEO avanzado, y mantenimiento continuo. Evaluamos tu proyecto sin cargo para presupuesto exacto."
      }
    },
    {
      "@type": "Question",
      "name": "¿El precio incluye hosting y dominio para mi web en RD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí. Todos nuestros paquetes incluyen hosting optimizado primer año, certificado SSL gratuito y asistencia para registro de dominio .do o internacional. Renovaciones posteriores con precios claros sin aumentos sorpresa."
      }
    },
    {
      "@type": "Question",
      "name": "¿Ofrecen planes de pago o financiamiento para el diseño web?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, ofrecemos planes flexibles: 50% al inicio + 50% al finalizar, o pagos mensuales para proyectos mayores a $500. También aceptamos métodos de pago dominicanos y transferencias bancarias locales."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es la diferencia entre sus paquetes Básico, Profesional y Premium?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Básico: hasta 5 páginas, plantilla personalizada, SEO básico ($300). Profesional: hasta 10 páginas, diseño a medida, SEO avanzado ($400). Premium: ilimitado, funcionalidades custom, integración completa ($500+). Todos con soporte incluido."
      }
    }
  ]
}
```

## WebPage Schema - Para Página de Precios

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Precios de Diseño Web en República Dominicana 2025",
  "description": "Tabla transparente de precios para servicios de diseño y desarrollo web en RD, con calculadora interactiva y comparativa de paquetes.",
  "url": "https://deyconic.vercel.app/precios",
  "inLanguage": "es-DO",
  "about": {
    "@type": "Service",
    "name": "Diseño Web Profesional",
    "areaServed": "República Dominicana"
  }
}
```

## FAQ Local - Santiago de los Caballeros

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Dónde están ubicados en Santiago de los Caballeros?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nuestras oficinas están en Avenida Las Colinas, Santiago de los Caballeros. Ofrecemos reuniones presenciales para conocer tu proyecto, además de videollamadas para mayor comodidad. Agenda tu consulta gratuita con nuestro equipo local."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué ventajas tiene contratar diseño web local en Santiago de los Caballeros vs. remoto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Entendemos el comportamiento del consumidor dominicano, ofrecemos soporte en horario local, reuniones cara a cara, conocimiento de proveedores locales de pago como Qik, y respuesta inmediata ante cualquier emergencia técnica."
      }
    },
    {
      "@type": "Question",
      "name": "¿Trabajan con negocios de todos los sectores en Santiago de los Caballeros?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, tenemos experiencia con restaurantes, clínicas, tiendas retail, servicios profesionales, constructoras y más. Cada sector requiere estrategias específicas que conocemos a profundidad por nuestra experiencia en el mercado santiaguero."
      }
    },
    {
      "@type": "Question",
      "name": "¿Incluyen posicionamiento en Google para búsquedas locales en Santiago de los Caballeros?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutamente. Implementamos SEO local con schema LocalBusiness, optimización Google My Business, keywords geo-específicas como 'tu servicio Santiago de los Caballeros', y estrategia de reseñas para aparecer en el Local Pack de Google."
      }
    },
    {
      "@type": "Question",
      "name": "¿Puedo ver ejemplos de páginas web que han creado en Santiago de los Caballeros?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Por supuesto. Visita nuestra sección de casos de éxito donde mostramos proyectos de clientes santiagueros con métricas reales: tráfico generado, posiciones en Google y conversiones logradas. Testimonios verificables disponibles."
      }
    }
  ]
}
```

## LocalBusiness Específico - Santiago

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://deyconic.vercel.app/#santiago",
  "name": "Deyconic - Santiago de los Caballeros",
  "image": "https://ik.imagekit.io/ajkl5a98u/1000x1000-removebg-preview2.0.png?updatedAt=1746468946560",
  "description": "Agencia de diseño web profesional con oficinas en Santiago de los Caballeros, especializada en crear sitios optimizados para el mercado dominicano.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Avenida Las Colinas",
    "addressLocality": "Santiago de los Caballeros",
    "addressRegion": "Santiago",
    "postalCode": "51000",
    "addressCountry": "DO"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "19.4517",
    "longitude": "-70.6970"
  },
  "telephone": "+1-829-931-5704",
  "email": "contacto@deyconic.com",
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "$300-$500",
  "serviceType": ["Diseño Web", "Desarrollo Web", "SEO Local"],
  "areaServed": {
    "@type": "City",
    "name": "Santiago de los Caballeros",
    "containedIn": "República Dominicana"
  },
  "url": "https://deyconic.vercel.app"
}
```

## FAQ Proceso - Para Guía/Blog

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta crear una página web profesional en RD en 2025?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Los costos varían: sitio básico DIY con plantilla $50-$200, sitio profesional con agencia $300-$400, tienda online completa $500+. Incluye dominio ($10-$30/año), hosting ($5-$50/mes) y desarrollo según complejidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Es mejor registrar un dominio .do o .com para mi negocio en RD?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dominio .do refuerza presencia local y confianza en República Dominicana, ideal si tu mercado es 100% dominicano. El .com es mejor para proyección internacional. Muchas empresas registran ambos para proteger su marca."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué es más rápido y económico: WordPress o un creador con IA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Creadores con IA (Wix, Squarespace) son más rápidos (1-3 días) y económicos inicialmente ($15-40/mes todo incluido). WordPress requiere más tiempo (1-2 semanas) pero ofrece mayor personalización y escalabilidad a largo plazo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo integrar pasarelas de pago dominicanas en mi web?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Puedes integrar Qik (popular en RD), CardNet, Azul, o pasarelas internacionales como PayPal y Stripe. La mayoría requiere API o plugins específicos. Recomendamos asesoría técnica para configuración segura y cumplimiento PCI DSS."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuáles son los errores más comunes al crear una web en República Dominicana?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Errores frecuentes: no optimizar velocidad móvil para conexiones dominicanas, ignorar SEO local, no incluir métodos de pago locales, contenido no adaptado al lenguaje/cultura local, y no implementar certificado SSL de seguridad."
      }
    }
  ]
}
```

## HowTo Schema - Guía Paso a Paso

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo Crear una Página Web en República Dominicana",
  "description": "Guía paso a paso para crear un sitio web profesional optimizado para el mercado dominicano en 2025.",
  "image": "https://ik.imagekit.io/ajkl5a98u/1000x1000-removebg-preview2.0.png?updatedAt=1746468946560",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Define el objetivo de tu web",
      "text": "Determina el tipo de sitio que necesitas según tu negocio: corporativo, e-commerce, landing page o portafolio.",
      "position": 1
    },
    {
      "@type": "HowToStep",
      "name": "Registra dominio y contrata hosting",
      "text": "Elige entre dominio .do (local) o .com (internacional) y contrata hosting optimizado para República Dominicana.",
      "position": 2
    },
    {
      "@type": "HowToStep",
      "name": "Selecciona plataforma de desarrollo",
      "text": "Decide entre WordPress (flexible), creadores con IA (rápido) o desarrollo a medida (personalizado) según presupuesto.",
      "position": 3
    },
    {
      "@type": "HowToStep",
      "name": "Diseña con UX optimizado",
      "text": "Crea diseño responsive, rápido en móviles y adaptado al comportamiento del usuario dominicano.",
      "position": 4
    },
    {
      "@type": "HowToStep",
      "name": "Optimiza SEO local",
      "text": "Implementa keywords dominicanas, schema LocalBusiness, Google My Business y velocidad de carga optimizada.",
      "position": 5
    },
    {
      "@type": "HowToStep",
      "name": "Integra pagos locales",
      "text": "Configura métodos de pago dominicanos como Qik, CardNet o Azul además de opciones internacionales.",
      "position": 6
    },
    {
      "@type": "HowToStep",
      "name": "Lanza y mide resultados",
      "text": "Publica tu web, instala Google Analytics y monitorea tráfico, conversiones y posicionamiento mensualmente.",
      "position": 7
    }
  ]
}
```

---

## Notas de Implementación

### Datos Corregidos:
- ✅ Coordenadas GPS: Santiago de los Caballeros (19.4517, -70.6970)
- ✅ Dirección: Avenida Las Colinas
- ✅ URLs: https://deyconic.vercel.app
- ✅ Precios unificados: $300-$500
- ✅ Email: contacto@deyconic.com (actualizar con email corporativo real)
- ✅ Codificación UTF-8 correcta

### Distribución por Página:
- **Página Principal**: LocalBusiness + Service + FAQ General
- **Página Precios**: WebPage + FAQ Precios
- **Página Guía/Blog**: HowTo + FAQ Proceso
- **Página Contacto**: LocalBusiness Santiago + FAQ Local

### Validación:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org/
