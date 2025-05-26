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
      </body>
    </html>
  );
}