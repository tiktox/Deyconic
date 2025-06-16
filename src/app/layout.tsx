"use client";

import { Inter } from 'next/font/google';
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
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

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
      <body className={`${inter.variable} antialiased bg-secondary`}>
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
