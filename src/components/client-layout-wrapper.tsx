"use client";

import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import dynamic from 'next/dynamic';
import { HelmetProvider } from 'react-helmet-async';
import { usePathname } from 'next/navigation';

// Dynamically import components that are not needed immediately

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

export default function ClientLayoutWrapper({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <HelmetProvider>
        {children}
        <Toaster />

        {!pathname.startsWith('/plus') && (
          <>
            <InvestmentFabWrapper />
            <ServiceRequestFabWrapper />
          </>
        )}
        <ScrollProgress />
      </HelmetProvider>
    </ThemeProvider>
  );
}