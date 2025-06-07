<<<<<<< HEAD
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from '@/components/layout/ClientLayout';
import Image from 'next/image';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
=======
"use client";

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
// import { AuthProvider } from '@/components/auth/auth-provider'; // Assuming this will be created
// import AppHeader from '@/components/layout/AppHeader'; // Assuming this will be created
import { ThemeProvider } from '@/components/theme-provider';
import FloatingActionButtonWrapper from '@/components/custom/floating-action-button-wrapper';
import InvestmentFabWrapper from '@/components/custom/investment-fab-wrapper';
import ServiceRequestFabWrapper from '@/components/custom/service-request-fab-wrapper';
import { ScrollProgress } from '@/components/scroll-progress'; // Import the ScrollProgress component
import { HelmetProvider } from 'react-helmet-async';


// Placeholder for AppHeader - will be created later if requested
const AppHeader = () => (
  <header className="bg-background text-foreground p-4 shadow-md h-16">
    {/* Placeholder content */}
  </header>
);

// Placeholder for AuthProvider - will be created later if requested
// The current AuthProvider is effectively ThemeProvider
const AuthProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </ThemeProvider>
);


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
});

const lightLogoUrl = "https://ik.imagekit.io/ajkl5a98u/logo_1000x1000-removebg-preview.png?updatedAt=1746469003137";

<<<<<<< HEAD
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
=======
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
<<<<<<< HEAD
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-secondary`}>
        <ClientLayout>
          {children}
        </ClientLayout>
=======
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary`}>
        <AuthProvider>
          <HelmetProvider>
            {/* <AppHeader /> */} {/* Temporarily commenting out as it's a placeholder */}
            <main className="min-h-[calc(100vh-0rem)]"> {/* Adjust 4rem based on AppHeader height, using 0 for now */}
              {children}
            </main>
            <Toaster />
            <FloatingActionButtonWrapper />
            <InvestmentFabWrapper />
            <ServiceRequestFabWrapper />
            <ScrollProgress /> {/* Added the ScrollProgress component here */}
          </HelmetProvider>
        </AuthProvider>
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
      </body>
    </html>
  );
}