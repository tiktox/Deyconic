"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PortfolioDetailModal, { type PortfolioItem } from "@/components/modals/portfolio-detail-modal";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Check, ArrowRight } from "lucide-react";

const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    title: "Digitalización Empresarial - Clínica Dental",
    category: "Digitalización",
    client: "Clínica Dental XYZ",
    date: "2024",
    description: "Desarrollo de una plataforma web completa para una clínica dental, incluyendo sistema de citas online, gestión de pacientes y marketing digital.",
    features: ["Sistema de reservas online", "Portal de pacientes", "Optimización SEO local", "Diseño web responsive"],
    mainImage: "https://ik.imagekit.io/ajkl5a98u/clinica%20dental%201.jpg?updatedAt=1746197438549",
    thumbnails: [
        "https://ik.imagekit.io/ajkl5a98u/clinica%20dental%201.jpg?updatedAt=1746197438549",
        "https://ik.imagekit.io/ajkl5a98u/clinica%20dental%202.jpg?updatedAt=1746197442037",
        "https://ik.imagekit.io/ajkl5a98u/clinica%20dental%203.jpg?updatedAt=1746197442723",
    ],
    projectLink: "https://clinica-dental01.web.app/",
    aiHint: "dental clinic website"
  },
  {
    id: "2",
    title: "Gestión de Proyectos - Mr. Grilled",
    category: "Gestión",
    client: "Mr. Grilled Hotelería",
    date: "2023",
    description: "Automatización de procesos internos y gestión de proyectos para una cadena hotelera, mejorando la eficiencia operativa.",
    features: ["Software de gestión de tareas", "Integración de sistemas", "Dashboard de KPIs", "Optimización de flujos de trabajo"],
    mainImage: "https://ik.imagekit.io/ajkl5a98u/mr%20grilled%201.jpg?updatedAt=1746197443058",
    thumbnails: [
        "https://ik.imagekit.io/ajkl5a98u/mr%20grilled%201.jpg?updatedAt=1746197443058",
        "https://ik.imagekit.io/ajkl5a98u/mr%20grilled%202.jpg?updatedAt=1746197442745",
        "https://ik.imagekit.io/ajkl5a98u/mr%20grilled%203.jpg?updatedAt=1746197443843",
    ],
    projectLink: "https://tiktox.github.io/msgrilled/",
    aiHint: "hotel management software"
  },
  {
    id: "3",
    title: "Plataforma de Innovación - Deyconic Store",
    category: "Innovación",
    client: "Startup Tecnológica Local",
    date: "2024",
    description: "Desarrollo de un marketplace innovador para una startup, conectando proveedores y consumidores de productos tecnológicos.",
    features: ["Plataforma e-commerce", "Sistema de pagos seguro", "Perfiles de usuario avanzados", "Panel de administración"],
    mainImage: "https://ik.imagekit.io/ajkl5a98u/deyconic%20store.jpg?updatedAt=1746197440975",
    thumbnails: [
        "https://ik.imagekit.io/ajkl5a98u/deyconic%20store.jpg?updatedAt=1746197440975",
        "https://ik.imagekit.io/ajkl5a98u/deyconic%20store%202.jpg?updatedAt=1746197440948",
        "https://ik.imagekit.io/ajkl5a98u/STORE%204.jpg?updatedAt=1746316452904",
    ],
    projectLink: "https://tiktox.github.io/xmchat/",
    aiHint: "e-commerce marketplace"
  },
   {
    id: "4",
    title: "Plataforma de Innovación - Taconazo",
    category: "Innovación",
    client: "Taconazo restaurant",
    date: "2025",
    description: "Desarrollo de una plataforma profesional e innovadora para un restaurante de tacos",
    features: ["Plataforma e-commerce", "Sistema de reservas", "Reservar mesas", "Panel de contacto"],
    mainImage: "https://ik.imagekit.io/lics6cm47/Captura%20de%20pantalla%202025-11-05%20070327.jpg?updatedAt=1762369748928",
    thumbnails: [
        "https://ik.imagekit.io/lics6cm47/Captura%20de%20pantalla%202025-11-05%20070434.jpg?updatedAt=1762369749756",
        "https://ik.imagekit.io/lics6cm47/Captura%20de%20pantalla%202025-11-05%20070404.jpg?updatedAt=1762369748901",
        "https://ik.imagekit.io/lics6cm47/Captura%20de%20pantalla%202025-11-05%20070501.jpg?updatedAt=1762369749028",
    ],
    projectLink: "https://taconazo.vercel.app",
    aiHint: "e-commerce marketplace"
  },
];

const filters = ["Todos", "Gestión", "Digitalización", "Innovación"];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems = activeFilter === "Todos"
    ? portfolioData
    : portfolioData.filter(item => item.category.toLowerCase() === activeFilter.toLowerCase());

  const handleItemClick = useCallback((item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedItem(null);
    }, 300);
  }, []);

  return (
    <section id="proyectos" className="py-20 bg-secondary">
      {/* Bloque destacado eliminado, ahora solo la grilla y filtros */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground tracking-tight mb-4">
            Nuestro <span className="text-primary">Portafolio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conoce algunos de nuestros proyectos más destacados.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-12"
        >
          {filters.map(filter => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className="rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base transition-all duration-300 flex items-center group"
            >
              {activeFilter === filter && <Check className="mr-2 h-4 w-4 animate-pulse" />}
              {filter}
            </Button>
          ))}
        </motion.div>

        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                className="cursor-pointer"
              >
                <Card 
                  onClick={() => handleItemClick(item)} 
                  className="overflow-hidden group h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-xl hover:border-primary border-2 border-transparent min-h-[380px] sm:min-h-[400px]"
                  tabIndex={0} 
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleItemClick(item); }}
                >
                  <div className="relative h-52 sm:h-60 w-full overflow-hidden">
                    <Image
                      src={`${item.mainImage}?tr=w-400,h-300,q-70,f-webp`}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      quality={70}
                      className="object-cover will-change-transform"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Eye className="h-12 w-12 text-white/90 transform group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute top-3 right-3 bg-primary/80 backdrop-blur-sm text-primary-foreground px-2.5 py-1 rounded-full text-xs font-semibold shadow-md">
                      {item.category}
                    </div>
                  </div>
                  <CardContent className="p-5 flex-grow flex flex-col bg-background">
                    <div className="flex-grow">
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 mb-3">{item.description}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-auto self-start group/button hover:bg-primary hover:text-primary-foreground border-primary text-primary w-full sm:w-auto justify-center"
                      onClick={(e) => { e.stopPropagation(); handleItemClick(item); }} 
                    >
                      Ver detalles <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <PortfolioDetailModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}

