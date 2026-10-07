"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  portfolioCategories,
  portfolioProjects,
  type PortfolioCategory,
} from "@/lib/portfolio-data";

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("all");
  const visibleProjects = activeCategory === "all"
    ? portfolioProjects
    : portfolioProjects.filter((project) => project.category === activeCategory);

  return (
    <section id="proyectos" className="home-portfolio-section">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Categorías de proyectos"
          className="mb-8 flex flex-wrap items-center justify-center gap-2 px-1 sm:mb-10 sm:gap-3 lg:mb-12"
        >
          {portfolioCategories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-xl border px-3 py-2 text-[9px] font-semibold leading-tight tracking-[0.08em] transition-colors sm:px-5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.12em] lg:px-6 lg:text-xs ${
                  category.id === "all"
                    ? "px-4 text-[11px] font-extrabold tracking-[0.12em] sm:px-6 sm:text-sm lg:px-8 lg:text-base"
                    : ""
                } ${
                  isActive
                    ? "border-primary bg-black text-white"
                    : "border-border bg-card text-black hover:border-primary hover:bg-black hover:text-white"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </nav>

        {visibleProjects.length > 0 ? (
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 xl:grid-cols-[repeat(5,minmax(180px,1fr))]">
            {visibleProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className="w-full"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Link
                  href={`/proyectos/${project.slug}`}
                  aria-label={`Ver detalles de ${project.title}`}
                  className="group block overflow-hidden rounded-[20px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <div className="relative aspect-[9/20] h-full w-full overflow-hidden rounded-[20px]">
                    <Image
                      src={`${project.mainImage}&tr=w-1000,h-1400,q-80,f-webp,c-at_max`}
                      alt={`Vista previa del proyecto ${project.title}`}
                      fill
                      sizes="(max-width: 500px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      quality={80}
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-border bg-card px-5 py-16 text-center text-sm text-muted-foreground">
            Estamos preparando los proyectos de esta categoría. Vuelve pronto para descubrirlos.
          </p>
        )}
      </div>
    </section>
  );
}
