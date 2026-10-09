"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import {
  portfolioCategories,
  portfolioProjects,
  type PortfolioCategory,
} from "@/lib/portfolio-data";

export default function ProyectosPage() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("all");
  const [search, setSearch] = useState("");

  const visibleProjects = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return portfolioProjects.filter((project) => {
      const matchesCategory = activeCategory === "all" || project.category === activeCategory;
      const matchesSearch = !query
        || project.title.toLocaleLowerCase().includes(query)
        || project.client.toLocaleLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="flex min-h-screen flex-col bg-[#0077ff] text-foreground">
      <Header />
      <main className="relative flex-1 overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.12),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-7xl">
          <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Explora las soluciones digitales que hemos desarrollado para nuestros clientes.
            </p>
          </header>

          <div className="mb-7 flex justify-center sm:mb-9">
            <label className="relative block w-full max-w-md">
              <span className="sr-only">Buscar proyectos</span>
              <Search
                aria-hidden="true"
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="search"
                placeholder="Buscar proyectos"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-12 w-full rounded-full border border-input bg-card pl-11 pr-5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
            </label>
          </div>

          <nav
            aria-label="Categorías de proyectos"
            className="mb-9 flex flex-wrap items-center justify-center gap-2 sm:mb-12 sm:gap-3"
          >
            {portfolioCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full border px-4 py-2.5 text-[11px] font-semibold tracking-[0.12em] transition-colors sm:px-6 sm:text-xs ${
                    category.id === "all"
                      ? "border-border px-5 text-sm font-extrabold tracking-[0.16em] sm:px-8 sm:text-base"
                      : ""
                  } ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </nav>

          {visibleProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
              {visibleProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/proyectos/${project.slug}`}
                  aria-label={`Ver detalles de ${project.title}`}
                  className={`group -left-[10px] block rounded-2xl border border-white/10 p-2.5 shadow-sm transition-colors hover:border-primary/50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:p-3 ${
                    project.mobileImages ? "bg-white text-black" : ""
                  }`}
                >
                  {project.mobileImages && (
                    <div className="px-2 pb-3 pt-1 text-center">
                      <h2 className="text-lg font-semibold text-black transition-colors group-hover:text-primary sm:text-xl">
                        {project.title}
                      </h2>
                      <p className="mt-1 text-sm text-black/70">{project.client}</p>
                    </div>
                  )}
                  <div className={`relative overflow-hidden ${project.mobileImages ? "mx-auto aspect-[9/16] max-w-[260px]" : "aspect-[1.38/1]"}`}>
                    {project.mobileImages ? (
                      <Image
                        src={project.mobileImages[0]}
                        alt={`Vista previa vertical de ${project.title}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        quality={80}
                        className=" transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : project.mainImage ? (
                      <>
                        <Image
                          src={`${project.mainImage}&tr=w-1000,h-720,q-80,f-webp,c-at_max`}
                          alt={`Vista previa del proyecto ${project.title}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          quality={80}
                          className=" transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                      </>
                    ) : null}
                    <span className="absolute left-4 top-4 rounded-full border border-primary/40 bg-black/55 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary backdrop-blur-md">
                      {project.categoryLabel}
                    </span>
                    {!project.mobileImages && (
                      <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    )}
                  </div>
                  {!project.mobileImages && (
                    <div className="flex items-center justify-between gap-4 px-2 pb-2 pt-4 sm:px-3 sm:pb-3">
                      <div>
                        <h2 className="text-lg font-semibold text-white transition-colors group-hover:text-primary sm:text-xl">
                          {project.title}
                        </h2>
                        <p className="mt-1 text-sm text-white/70">{project.client}</p>
                      </div>
                      <span className="shrink-0 text-xs font-medium tracking-wide text-white/55">
                        {project.date}
                      </span>
                    </div>
                  )}
                  {project.mobileImages && (
                    <span className="mx-auto mb-2 flex min-h-9 w-fit items-center justify-center rounded-full bg-black px-4 text-[10px] font-bold tracking-wide text-white transition-transform group-hover:scale-105 sm:text-xs">
                      VER PROYECTO
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-border bg-card px-5 py-16 text-center text-sm text-muted-foreground">
              No encontramos proyectos en esta categoría. Prueba otra categoría o búsqueda.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
