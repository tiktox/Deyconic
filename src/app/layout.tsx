"use client";

<<<<<<< HEAD
import { Inter } from 'next/font/google';
=======
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
>>>>>>> 40da95a71fd569c44311968692778291ffa07a61
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import dynamic from 'next/dynamic';
import { HelmetProvider } from 'react-helmet-async';
<<<<<<< HEAD

// Carga dinámica de componentes para optimizar rendimiento
const FloatingActionButtonWrapper = dynamic(
  () => import('@/components/custom/floating-action-button-wrapper'),
  {
    ssr: false,
    loading: () => <div className="fixed bottom-4 right-4 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />,
  }
=======
import ClientLayout from '@/components/layout/ClientLayout';

// Dynamically import components that are not needed immediately
const FloatingActionButtonWrapper = dynamic(
  () => import('@/components/custom/floating-action-button-wrapper'),
  { ssr: false }
>>>>>>> 40da95a71fd569c44311968692778291ffa07a61
);

const InvestmentFabWrapper = dynamic(
  () => import('@/components/custom/investment-fab-wrapper'),
<<<<<<< HEAD
  {
    ssr: false,
    loading: () => <div className="fixed bottom-20 right-4 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />,
  }
=======
  { ssr: false }
>>>>>>> 40da95a71fd569c44311968692778291ffa07a61
);

const ServiceRequestFabWrapper = dynamic(
  () => import('@/components/custom/service-request-fab-wrapper'),
<<<<<<< HEAD
  {
    ssr: false,
    loading: () => <div className="fixed bottom-36 right-4 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />,
  }
=======
  { ssr: false }
>>>>>>> 40da95a71fd569c44311968692778291ffa07a61
);

const ScrollProgress = dynamic(
  () => import('@/components/scroll-progress').then(mod => ({ default: mod.ScrollProgress })),
<<<<<<< HEAD
  {
    ssr: false,
    loading: () => <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700" />,
  }
);

// Carga de fuentes
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

=======
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

>>>>>>> 40da95a71fd569c44311968692778291ffa07a61
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
<<<<<<< HEAD
      <body className={`${inter.variable} antialiased bg-secondary`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <HelmetProvider>
            <main className="min-h-[100vh]">
=======
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HelmetProvider>
            <ClientLayout>
>>>>>>> 40da95a71fd569c44311968692778291ffa07a61
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
