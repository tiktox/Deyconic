"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import PortfolioDetailModal, { type PortfolioItem } from "@/components/modals/portfolio-detail-modal";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    title: "Digitalización Empresarial - Clínica Dental",
    category: "Web Development",
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
    category: "Web Development",
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
    category: "Web Development",
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
    category: "Web Development",
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

const filters = [
  { label: "All", category: "All" },
  { label: "Desarrollos web", category: "Web Development" },
  { label: "Aplicaciones mobiles", category: "Mobile Apps" },
];

export default function PortfolioSection() {
  // El filtro "All" está siempre activo por defecto al cargar la sección.
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeCategory = filters.find(f => f.label === activeFilter)?.category ?? "All";
  const filteredItems = activeCategory === "All"
    ? portfolioData
    : portfolioData.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

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
    <section id="proyectos" className="home-portfolio-section">
      {/* Fondo innovador: rejilla sutil + resplandores + aurora (ver home.css) */}
      <div className="home-portfolio-bg" aria-hidden="true">
        <div className="home-portfolio-grid-bg" />
        <motion.div
          className="home-portfolio-glow home-portfolio-glow--top"
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="home-portfolio-glow home-portfolio-glow--cyan"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="home-portfolio-glow home-portfolio-glow--left"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        <div className="home-portfolio-fade home-portfolio-fade--top" />
        <div className="home-portfolio-fade home-portfolio-fade--bottom" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">
            Nuestro <span className="text-primary">Portafolio</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Conoce algunos de nuestros proyectos más destacados.
          </p>
        </motion.div>

        {/* Filtros: "All" activo por defecto */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-center flex-wrap gap-2 sm:gap-4 mb-12"
        >
          {filters.map(filter => (
            <button
              key={filter.label}
              type="button"
              onClick={() => setActiveFilter(filter.label)}
              aria-pressed={activeFilter === filter.label}
              className={cn(
                "home-filter-btn",
                activeFilter === filter.label && "home-filter-btn--active"
              )}
            >
              {activeFilter === filter.label && <Check className="mr-2 h-4 w-4 animate-pulse" />}
              {filter.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8"
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
                <div
                  onClick={() => handleItemClick(item)}
                  className="home-portfolio-card"
                  tabIndex={0}
                  role="button"
                  aria-label={`Ver detalles de ${item.title}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleItemClick(item); }}
                >
                  <Image
                    src={`${item.mainImage}&tr=w-600,h-900,q-75,f-webp,c-at_max`}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    loading="lazy"
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  {/* Degradado para legibilidad del título */}
                  <div className="home-portfolio-card-overlay" />
                  {/* Solo el título del proyecto */}
                  <div className="home-portfolio-card-title-wrap">
                    <h3 className="home-portfolio-card-title">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="home-portfolio-empty"
          >
            Aún no hay proyectos en esta categoría. ¡Muy pronto!
          </motion.p>
        )}
      </div>
      <PortfolioDetailModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  );
}
