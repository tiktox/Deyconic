"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, ArrowRight, Check, Search } from "lucide-react";
import PortfolioDetailModal, { type PortfolioItem } from "@/components/modals/portfolio-detail-modal";
import { motion, AnimatePresence } from "framer-motion";

// Reutilizamos los datos del portafolio
const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    title: "Clínica Dental",
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
    title: "Restaurante Mr Grilled",
    category: "Digitalización",
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
    projectLink: "https://tiktox.github.io/Mr-Grilled/",
    aiHint: "hotel management software"
  },
  {
    id: "3",
    title: "Deyconic Store",
    category: "Digitalización",
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
    title: "Prime legacy ring",
    category: "Proyectos de inversión",
    client: "Startup Tecnológicak Local",
    date: "2024",
    description: "Es un anillo inteligente con tecnología avanzada integrada que formará parte de cada uno de nuestros clientes brindando seguridad, estatus y exclusividad.",
    features: ["Seguridad", "Innovación", "Tecnologia", "Exclusividad"],
    mainImage: "https://ik.imagekit.io/lics6cm47/1.jpg?updatedAt=1751379755829",
    thumbnails: [
      "https://ik.imagekit.io/ajkl5a98u/026df623214f3060da63ee053f2be7b6.jpg?updatedAt=1751383904721",
      "https://ik.imagekit.io/ajkl5a98u/6f5e04d875cb07b4c27a099fc0d95807.jpg?updatedAt=1751383771610",
      "https://ik.imagekit.io/ajkl5a98u/fb6a1a4dfaa331e7e1c396a6bffbf845.jpg?updatedAt=1751383663861",
    ],
    projectLink: "#",
    aiHint: "e-commerce marketplacee"
  },
];

const filters = ["Digitalización", "Proyectos de inversión", "Diseño"];

export default function ProyectosPage() {
  const [activeFilter, setActiveFilter] = useState("Digitalización");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtrado por nombre y categoría
  const filteredItems = portfolioData.filter(item => {
    const matchesFilter = activeFilter === filters[0] || item.category.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10">
        {/* Buscador */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Buscar proyectos"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-full py-2 px-4 pl-10 bg-background text-foreground border border-border focus:ring-2 focus:ring-primary outline-none transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            {filters.map(filter => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className="rounded-full px-4 py-2 text-sm"
              >
                {activeFilter === filter && <Check className="mr-2 h-4 w-4 animate-pulse" />}
                {filter}
              </Button>
            ))}
          </div>
        </div>
        {/* Grilla de proyectos */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.05, layout: { duration: 0.3 } }}
                className="cursor-pointer"
              >
                <Card onClick={() => { setSelectedItem(item); setIsModalOpen(true); }} className="overflow-hidden group h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl hover:border-primary border-2 border-transparent min-h-[380px] sm:min-h-[400px]">
                  <div className="relative h-52 sm:h-60 w-full overflow-hidden">
                    <Image
                      src={item.mainImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      quality={75}
                      className="transform group-hover:scale-105 transition-transform duration-500 ease-in-out object-cover"
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
                    <Button variant="outline" size="sm" className="mt-auto self-start group/button hover:bg-primary hover:text-primary-foreground border-primary text-primary w-full sm:w-auto justify-center">
                      Ver detalles <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <PortfolioDetailModal item={selectedItem} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </main>
      <Footer />
    </div>
  );
} 