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
    <section id="portafolio" className="py-20 bg-secondary">
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
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => handleItemClick(item)}>
                  <div className="relative aspect-video">
                    <Image
                      src={item.mainImage}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Eye className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{item.category}</span>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        Ver detalles
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <PortfolioDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem}
      />
    </section>
  );
}

