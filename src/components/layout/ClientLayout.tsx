'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import components that are not needed immediately
const FloatingActionButtonWrapper = dynamic(
  () => import('@/components/custom/floating-action-button-wrapper'),
  { 
    ssr: false,
    loading: () => null
  }
);

const InvestmentFabWrapper = dynamic(
  () => import('@/components/custom/investment-fab-wrapper'),
  { 
    ssr: false,
    loading: () => null
  }
);

const ServiceRequestFabWrapper = dynamic(
  () => import('@/components/custom/service-request-fab-wrapper'),
  { 
    ssr: false,
    loading: () => null
  }
);

const ScrollProgress = dynamic(
  () => import('@/components/scroll-progress').then(mod => ({ default: mod.ScrollProgress })),
  { 
    ssr: false,
    loading: () => null
  }
);

// Loading fallback component
const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <HelmetProvider>
        <Suspense fallback={<LoadingFallback />}>
          <main className="min-h-[calc(100vh-0rem)]">
            {children}
          </main>
          <Toaster />
          <FloatingActionButtonWrapper />
          <InvestmentFabWrapper />
          <ServiceRequestFabWrapper />
          <ScrollProgress />
        </Suspense>
      </HelmetProvider>
    </ThemeProvider>
  );
} 