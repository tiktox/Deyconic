import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deyconic',
  description: 'Empresa líder en creación de páginas web profesionales en RD. Diseño responsive, SEO optimizado y soporte local en Santiago de los Caballeros. Desde $300.',
  keywords: 'crear pagina web, empresas que generan paginas web, diseño web republica dominicana, desarrollo web santiago, pagina web profesional, crear sitio web, empresa desarrollo web, diseño web dominicana, paginas web baratas, crear web profesional',
  authors: [{ name: 'Deyconic' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Crear Página Web Profesional en República Dominicana | Deyconic',
    description: 'Empresa líder en creación de páginas web profesionales en RD. Diseño responsive, SEO optimizado y soporte local en Santiago de los Caballeros.',
    url: 'https://deyconic.vercel.app',
    siteName: 'Deyconic',
    images: [{
      url: 'https://ik.imagekit.io/lics6cm47/blanco-modified.png?updatedAt=1765489941274',
      width: 1200,
      height: 630,
    }],
    locale: 'es_DO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crear Página Web Profesional en República Dominicana | Deyconic',
    description: 'Empresa líder en creación de páginas web profesionales en RD. Diseño responsive, SEO optimizado y soporte local.',
    images: ['https://ik.imagekit.io/lics6cm47/blanco-modified.png?updatedAt=1765489941274'],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ClientLayoutWrapper from '@/components/client-layout-wrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const lightLogoUrl = "https://ik.imagekit.io/ajkl5a98u/logo_1000x1000-removebg-preview.png?updatedAt=1746469003137";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://videos.pexels.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />
        <link rel="dns-prefetch" href="https://videos.pexels.com" />
        <link rel="preload" as="video" href="https://ik.imagekit.io/yfitk2mna/5725962-uhd_2560_1440_30fps.mp4?updatedAt=1765543910176" type="video/mp4" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                if (e.message && e.message.includes('extension')) {
                  e.preventDefault();
                }
              });
              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason && e.reason.message && e.reason.message.includes('extension')) {
                  e.preventDefault();
                }
              });
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary`}>
        <ClientLayoutWrapper>
          <main className="min-h-[calc(100vh-0rem)]">
            {children}
          </main>
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}