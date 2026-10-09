import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, UserRound } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileProjectGallery from "@/components/portfolio/mobile-project-gallery";
import { getPortfolioProject, portfolioProjects } from "@/lib/portfolio-data";

interface PortfolioProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PortfolioProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) return { title: "Proyecto no encontrado | Deyconic" };

  return {
    title: `${project.title} | Proyectos Deyconic`,
    description: project.description,
  };
}

export default async function PortfolioProjectPage({
  params,
}: PortfolioProjectPageProps) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) notFound();

  const images = project.images;
  const mobileImages = project.mobileImages ?? [];

  return (
    <div className="flex min-h-screen flex-col bg-[#0077ff] text-foreground">
      <Header />
      <main className="relative flex-1 overflow-hidden px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
        />

        <article className="relative mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-4">
            <Link
              href="/#proyectos"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a proyectos
            </Link>
            {mobileImages.length > 0 && (
              <p className="inline-flex items-center rounded-full border border-white/30 bg-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                {project.categoryLabel}
              </p>
            )}
          </div>

          <header
            className={`mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between`}
          >
            <div className="max-w-3xl">
              {mobileImages.length === 0 && (
                <p className="mb-4 inline-flex items-center rounded-full border border-white/30 bg-black px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                  {project.categoryLabel}
                </p>
              )}
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              {mobileImages.length === 0 && (
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                  {project.description}
                </p>
              )}
            </div>

            {project.projectLink && (
              <a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-black shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Visitar proyecto
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </header>

          {mobileImages.length > 0 ? (
            <MobileProjectGallery images={mobileImages} title={project.title} />
          ) : (
            <div className="overflow-hidden rounded-[24px] border border-white/25 p-2 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:rounded-[32px] sm:p-3">
              <div className="relative h-[clamp(220px,38vw,460px)] overflow-hidden rounded-[18px] bg-black sm:rounded-[24px]">
                {project.detailImage ? (
                  <Image
                    src={`${project.detailImage}&tr=w-1800,h-1000,q-85,f-webp,c-at_max`}
                    alt={`Vista principal de ${project.title}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 1152px"
                    quality={85}
                  />
                ) : null}
              </div>
            </div>
          )}

          {mobileImages.length > 0 && (
            <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-white/85 sm:text-lg">
              {project.description}
            </p>
          )}

          {images.length > 0 && mobileImages.length === 0 && (
            <section aria-labelledby="project-gallery-title" className="mt-12 sm:mt-16">
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                    Vistas del proyecto
                  </p>
                  <h2 id="project-gallery-title" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                    Explora cada detalle
                  </h2>
                </div>
                <span className="hidden text-sm font-medium text-white/70 sm:block">
                  {images.length} {images.length === 1 ? "imagen" : "imágenes"}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
                {images.map((image, index) => (
                  <div
                    key={image}
                    className="group relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/20 shadow-lg sm:rounded-3xl"
                  >
                    <Image
                      src={`${image}&tr=w-1200,h-675,q-85,f-webp,c-at_max`}
                      alt={`Vista ${index + 1} del proyecto ${project.title}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={85}
                      className=" transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="project-details-title" className="mt-12 sm:mt-16">
            <div className="grid overflow-hidden rounded-[24px] bg-black text-white shadow-[0_24px_70px_rgba(0,0,0,0.24)] lg:grid-cols-[1.15fr_0.85fr] sm:rounded-[32px]">
              <div className="p-6 sm:p-9 lg:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Caso de proyecto
                </p>
                <h2 id="project-details-title" className="mt-3 text-2xl font-bold sm:text-3xl">
                  Alcance y funcionalidades
                </h2>
                {project.features.length > 0 && (
                  <div className="mt-6">
                    <ul className="grid gap-4 sm:grid-cols-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-relaxed text-white/85">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 bg-white/[0.04] p-6 sm:p-9 lg:border-l lg:border-t-0 lg:p-12">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">
                  Información del proyecto
                </h3>
                <dl className="mt-5 divide-y divide-white/10">
                  <div className="flex items-center gap-4 py-5">
                    <UserRound className="h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <dt className="text-xs text-white/50">Cliente</dt>
                      <dd className="mt-1 text-sm font-semibold text-white">{project.client}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 py-5">
                    <CalendarDays className="h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <dt className="text-xs text-white/50">Año</dt>
                      <dd className="mt-1 text-sm font-semibold text-white">{project.date}</dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 py-5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-black text-black">
                      D
                    </span>
                    <div>
                      <dt className="text-xs text-white/50">Categoría</dt>
                      <dd className="mt-1 text-sm font-semibold text-white">{project.categoryLabel}</dd>
                    </div>
                  </div>
                </dl>
                {project.projectLink && (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    Visitar sitio
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
