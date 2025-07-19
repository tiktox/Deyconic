import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deyconic',
  description: 'Somos una institución que ofrece servicios digitales y físicos a empresas que no tienen presencia en redes sociales o no cuentan con una plataforma profesional que los posicione en los motores de búsqueda.',
}

"use client";
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
// import { AuthProvider } from '@/components/auth/auth-provider'; // Assuming this will be created
// import AppHeader from '@/components/layout/AppHeader'; // Assuming this will be created
import { ThemeProvider } from '@/components/theme-provider';
import dynamic from 'next/dynamic';
import { HelmetProvider } from 'react-helmet-async';

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}