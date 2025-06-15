"use client";

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import dynamic from 'next/dynamic';
import { HelmetProvider } from 'react-helmet-async';
import ClientLayout from '@/components/layout/ClientLayout';

// Dynamically import components that are not needed immediately
const FloatingActionButtonWrapper = dynamic(
  () => import('@/components/custom/floating-action-button-wrapper'),
  { ssr: false }
);

const InvestmentFabWrapper = dynamic(
  () => import('@/components/custom/investment-fab-wrapper'),
  { ssr: false }
);

const ServiceRequestFabWrapper = dynamic(
  () => import('@/components/custom/service-request-fab-wrapper'),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import('@/components/scroll-progress').then(mod => ({ default: mod.ScrollProgress })),
  { ssr: false }
);

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HelmetProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
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