# Guía de Implementación de Schemas JSON-LD

## ✅ Implementación Completada

### Archivos Creados:

1. **`src/config/seo.ts`** - Configuración centralizada del negocio
2. **`src/config/schemas.ts`** - Todos los schemas JSON-LD
3. **`src/components/SEO/SchemaMarkup.tsx`** - Componente reutilizable
4. **`Meta.md`** - Documento corregido con datos actualizados

### Schemas Disponibles:

- ✅ `localBusinessSchema` - Información del negocio
- ✅ `serviceSchema` - Servicios ofrecidos
- ✅ `faqGeneralSchema` - FAQ general (5 preguntas)
- ✅ `faqTecnicoSchema` - FAQ técnico (5 preguntas)
- ✅ `faqPreciosSchema` - FAQ de precios (5 preguntas)
- ✅ `faqLocalSchema` - FAQ local Santiago (5 preguntas)
- ✅ `howToSchema` - Guía paso a paso (7 pasos)

---

## 📋 Cómo Usar en Otras Páginas

### Ejemplo 1: Página de Precios

Crea `src/app/precios/page.tsx`:

```tsx
import SchemaMarkup from "@/components/SEO/SchemaMarkup";
import { faqPreciosSchema } from "@/config/schemas";

export default function PreciosPage() {
  return (
    <>
      <SchemaMarkup schema={faqPreciosSchema} />
      {/* Tu contenido aquí */}
    </>
  );
}
```

### Ejemplo 2: Página de Guía/Blog

Crea `src/app/guia/page.tsx`:

```tsx
import SchemaMarkup from "@/components/SEO/SchemaMarkup";
import { howToSchema, faqTecnicoSchema } from "@/config/schemas";

export default function GuiaPage() {
  return (
    <>
      <SchemaMarkup schema={[howToSchema, faqTecnicoSchema]} />
      {/* Tu contenido aquí */}
    </>
  );
}
```

### Ejemplo 3: Página de Contacto

Crea `src/app/contacto/page.tsx`:

```tsx
import SchemaMarkup from "@/components/SEO/SchemaMarkup";
import { localBusinessSchema, faqLocalSchema } from "@/config/schemas";

export default function ContactoPage() {
  return (
    <>
      <SchemaMarkup schema={[localBusinessSchema, faqLocalSchema]} />
      {/* Tu contenido aquí */}
    </>
  );
}
```

---

## 🔧 Personalización

### Actualizar Información del Negocio

Edita `src/config/seo.ts`:

```typescript
export const businessInfo = {
  contact: {
    email: "tu-email-real@deyconic.com" // ⚠️ ACTUALIZAR
  },
  address: {
    street: "Avenida Las Colinas, Número Exacto" // ⚠️ ACTUALIZAR
  }
};
```

### Crear Schema Personalizado

En `src/config/schemas.ts`:

```typescript
export const customSchema = {
  "@context": "https://schema.org",
  "@type": "TuTipo",
  // ... tu schema
};
```

---

## ✅ Validación

### 1. Google Rich Results Test
```
https://search.google.com/test/rich-results
```
- Ingresa: `https://deyconic.vercel.app`
- Verifica que no haya errores

### 2. Schema Markup Validator
```
https://validator.schema.org/
```
- Copia el código fuente de tu página
- Pega y valida

### 3. Google Search Console
- Ve a "Mejoras" → "Datos estructurados"
- Monitorea errores y advertencias

---

## 📊 Distribución Recomendada por Página

| Página | Schemas Recomendados |
|--------|---------------------|
| **Home** (`/`) | `localBusinessSchema`, `serviceSchema`, `faqGeneralSchema` |
| **Precios** (`/precios`) | `faqPreciosSchema` |
| **Guía** (`/guia`) | `howToSchema`, `faqTecnicoSchema` |
| **Contacto** (`/contacto`) | `localBusinessSchema`, `faqLocalSchema` |
| **Blog Post** | `faqTecnicoSchema` (según tema) |

---

## 🚀 Próximos Pasos

### Prioridad Alta:
1. ✅ Actualizar email corporativo en `src/config/seo.ts`
2. ✅ Completar dirección exacta en `src/config/seo.ts`
3. ⬜ Crear página `/precios` con `faqPreciosSchema`
4. ⬜ Crear página `/guia` con `howToSchema`

### Prioridad Media:
5. ⬜ Agregar Schema `BreadcrumbList` para navegación
6. ⬜ Agregar Schema `Review` con testimonios reales
7. ⬜ Implementar Schema `VideoObject` si hay videos

### Prioridad Baja:
8. ⬜ Optimizar imágenes para `image` en schemas
9. ⬜ Agregar más FAQs específicos por servicio
10. ⬜ Implementar Schema `Organization` con redes sociales

---

## 🐛 Troubleshooting

### Error: "Module not found"
```bash
# Verifica que los archivos existan
ls src/config/seo.ts
ls src/config/schemas.ts
ls src/components/SEO/SchemaMarkup.tsx
```

### Schema no aparece en Google
- Espera 1-2 semanas para indexación
- Verifica con Rich Results Test
- Asegúrate que el schema esté en el `<head>` o al inicio del `<body>`

### Errores de validación
- Revisa comillas y formato JSON
- Verifica que todos los campos requeridos estén presentes
- Usa validator.schema.org para detalles

---

## 📝 Notas Importantes

- ✅ Todos los datos están corregidos (UTF-8, coordenadas GPS, URLs)
- ✅ Precios unificados: $300-$500
- ✅ Ubicación: Santiago de los Caballeros (19.4517, -70.6970)
- ⚠️ Email temporal: `contacto@deyconic.com` (actualizar con real)
- ⚠️ Dirección incompleta: agregar número exacto

---

## 🎯 Beneficios Esperados

1. **Rich Snippets** en resultados de Google
2. **Mejor CTR** con información destacada
3. **Posicionamiento local** en Santiago de los Caballeros
4. **FAQ expandibles** en resultados de búsqueda
5. **Knowledge Panel** potencial para el negocio

---

## 📞 Soporte

Para dudas sobre implementación:
- Revisa `Meta.md` para ver todos los schemas disponibles
- Consulta ejemplos en `src/app/page.tsx`
- Valida siempre con Google Rich Results Test
