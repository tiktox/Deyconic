"use client";

import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import dynamic from 'next/dynamic';
import { HelmetProvider } from 'react-helmet-async';

// Carga dinámica de componentes para optimizar rendimiento
const FloatingActionButtonWrapper = dynamic(
  () => import('@/components/layout/floating-action-button'),
  {
    ssr: false,
    loading: () => <div className="fixed bottom-4 right-4 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />,
  }
);

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <HelmetProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <FloatingActionButtonWrapper />
            <Toaster />
          </ThemeProvider>
        </HelmetProvider>
      </body>
    </html>
  );
}
