import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Seo from "@/components/Seo";

// Componentes cargados de forma dinámica
const HeroSection = dynamic(() => import("@/components/sections/hero-section"), {
  loading: () => <div className="h-screen bg-gray-100 animate-pulse" />
});

const StatsSection = dynamic(() => import("@/components/sections/stats-section"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />
});

const AboutSection = dynamic(() => import("@/components/sections/about-section"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
});

const MissionSection = dynamic(() => import("@/components/sections/mission-section"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />
});

const ServicesSection = dynamic(() => import("@/components/sections/services-section"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
});

const PortfolioSection = dynamic(() => import("@/components/sections/portfolio-section"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
});

const NewsSection = dynamic(() => import("@/components/sections/news-section"), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse" />
});

const UpdatesSection = dynamic(() => import("@/components/sections/updates-section"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />
});

// Componente de error
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="flex items-center justify-center min-h-[400px] bg-red-50">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-red-600">Algo salió mal</h2>
      <p className="mt-2 text-red-500">{error.message}</p>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Seo />
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<div className="h-screen bg-gray-100 animate-pulse" />}>
          <HeroSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
          <StatsSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
          <MissionSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <ServicesSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <PortfolioSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
          <NewsSection />
        </Suspense>
        
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
          <UpdatesSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
