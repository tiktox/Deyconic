"use client";

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import dynamic from 'next/dynamic';
import { HelmetProvider } from 'react-helmet-async';

// Carga dinámica de componentes para optimizar rendimiento
const FloatingActionButtonWrapper = dynamic(
  () => import('@/components/custom/floating-action-button-wrapper'),
  {
    ssr: false,
    loading: () => <div className="fixed bottom-4 right-4 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />,
  }
);

const InvestmentFabWrapper = dynamic(
  () => import('@/components/custom/investment-fab-wrapper'),
  {
    ssr: false,
    loading: () => <div className="fixed bottom-20 right-4 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />,
  }
);

const ServiceRequestFabWrapper = dynamic(
  () => import('@/components/custom/service-request-fab-wrapper'),
  {
    ssr: false,
    loading: () => <div className="fixed bottom-36 right-4 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />,
  }
);

const ScrollProgress = dynamic(
  () => import('@/components/scroll-progress').then(mod => ({ default: mod.ScrollProgress })),
  {
    ssr: false,
    loading: () => <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700" />,
  }
);

// Carga de fuentes
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const lightLogoUrl = "https://ik.imagekit.io/ajkl5a98u/logo_1000x1000-removebg-preview.png?updatedAt=1746469003137";

// Metadata del sitio
export const metadata: Metadata = {
  title: 'Deyconic - Soluciones Tecnológicas',
  description: 'Plataforma de soluciones tecnológicas integrales para empresas y particulares',
  keywords: 'tecnología, soluciones digitales, desarrollo web, servicios tecnológicos',
  openGraph: {
    title: 'Deyconic - Soluciones Tecnológicas',
    description: 'Plataforma de soluciones tecnológicas integrales para empresas y particulares',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: lightLogoUrl,
        width: 1000,
        height: 1000,
        alt: 'Deyconic Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deyconic - Soluciones Tecnológicas',
    description: 'Plataforma de soluciones tecnológicas integrales para empresas y particulares',
    images: [lightLogoUrl],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://ik.imagekit.io" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <HelmetProvider>
            <main className="min-h-[100vh]">
              {children}
            </main>
            <Toaster />
            <FloatingActionButtonWrapper />
            <InvestmentFabWrapper />
            <ServiceRequestFabWrapper />
            <ScrollProgress />
          </HelmetProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
