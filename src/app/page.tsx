import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import FeaturesSection from "@/components/sections/features-section";
import ServicesSection from "@/components/sections/services-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ContactSection from "@/components/sections/contact-section";
import UpdatesSection from "@/components/sections/updates-section";
import Seo from "@/components/Seo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Seo />
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <UpdatesSection />
      </main>
      <Footer />
    </div>
  );
}
