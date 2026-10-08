import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import StatsSection from "@/components/sections/stats-section";
import ServicesSection from "@/components/sections/services-section";
import PortfolioSection from "@/components/sections/portfolio-section";
import Seo from "@/components/Seo";
import SchemaMarkup from "@/components/SEO/SchemaMarkup";
import { localBusinessSchema, serviceSchema, faqGeneralSchema } from "@/config/schemas";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Seo />
      <SchemaMarkup schema={[localBusinessSchema, serviceSchema, faqGeneralSchema]} />
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <PortfolioSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}
