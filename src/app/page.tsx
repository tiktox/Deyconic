<<<<<<< HEAD
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

=======
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import StatsSection from "@/components/sections/stats-section";
import AboutSection from "@/components/sections/about-section";
import MissionSection from "@/components/sections/mission-section";
import ServicesSection from "@/components/sections/services-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import NewsSection from "@/components/sections/news-section";
import UpdatesSection from "@/components/sections/updates-section";
import Seo from "@/components/Seo";

>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Seo />
      <Header />
      <main className="flex-grow">
<<<<<<< HEAD
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
=======
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <MissionSection />
        <ServicesSection />
        <PortfolioSection />
        <NewsSection />
        <UpdatesSection />
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
      </main>
      <Footer />
    </div>
  );
}
