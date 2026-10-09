export const portfolioCategories = [
  { id: "apps-web", label: "APPS WEB" },
  { id: "apps-moviles", label: "APPS MÓVILES" },
  { id: "all", label: "PROYECTOS" },
  { id: "softwares", label: "SOFTWARES" },
  { id: "disenos", label: "DISEÑOS" },
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number]["id"];

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string;
  client: string;
  date: string;
  description: string;
  features: string[];
  mainImage?: string;
  detailImage?: string;
  images: string[];
  mobileImages?: string[];
  mobileVideo?: string;
  projectLink?: string;
  aiHint?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "reverglim",
    slug: "reverglim",
    title: "REVERGLIM",
    category: "apps-moviles",
    categoryLabel: "App móvil",
    client: "REVERGLIM",
    date: "2026",
    description:
      "Descubre la experiencia móvil de REVERGLIM a través de distintas vistas de su interfaz, presentadas en un formato vertical.",
    features: ["Interfaz en formato vertical", "Experiencia visual para dispositivos móviles"],
    images: [],
    mobileImages: [
      "https://ik.imagekit.io/8om8rmpb6/jjdfjnjfndnfjdnfjdnfdnjndjfnjdnjf-Photoroom.png?updatedAt=1791580566984&tr=w-480,h-854,q-90,f-webp",
      "https://ik.imagekit.io/8om8rmpb6/reverglim%20social%20media%202-Photoroom.png?updatedAt=1791580036398&tr=w-480,h-854,q-90,f-webp",
      "https://ik.imagekit.io/8om8rmpb6/reverglim%20social%20media%203-Photoroom.png?updatedAt=1791580037376&tr=w-480,h-854,q-90,f-webp",
      "https://ik.imagekit.io/8om8rmpb6/reverglim%20social%20media%201-Photoroom.png?updatedAt=1791580037415&tr=w-480,h-854,q-90,f-webp",
    ],
      projectLink: "https://play.google.com/store/apps/details?id=com.reverglim&pcampaignid=web_share",
    mobileVideo:
      "https://ik.imagekit.io/8om8rmpb6/reverglim%20movil.mp4?updatedAt=1791469170555&tr=f-mp4",
  },
  {
    id: "clinicadental",
    slug: "clinica-dental",
    title: "Clínica Dental",
    category: "apps-web",
    categoryLabel: "App web",
    client: "Clínica Dental XYZ",
    date: "2024",
    description:
      "Desarrollo de una plataforma web para una clínica dental con sistema de citas online, gestión de pacientes y una experiencia optimizada para sus visitantes.",
    features: [
      "Sistema de reservas online",
      "Portal de pacientes",
      "Optimización SEO local",
      "Diseño web responsive",
    ],
    mainImage:
      "https://ik.imagekit.io/8om8rmpb6/screencapture-clinica-dental01-web-app-2026-10-06-20_22_19.png?updatedAt=1791332599046",
    detailImage:
      "https://ik.imagekit.io/ajkl5a98u/clinica%20dental%201.jpg?updatedAt=1746197438549",
    images: [
      "https://ik.imagekit.io/ajkl5a98u/clinica%20dental%203.jpg?updatedAt=1746197442723",
    ],
    projectLink: "https://clinica-dental01.web.app/",
    aiHint: "dental clinic website",
  },
  {
    id: "Chicago Motors",
    slug: "chicago-motors",
    title: "Chicago Motors",
    category: "apps-web",
    categoryLabel: "App web",
    client: "Chicago Motors",
    date: "2023",
    description:
      "Experiencia web para Chicago Motors, con una presencia digital diseñada para presentar su propuesta de vehículos y facilitar el contacto con sus clientes.",
    features: [
      "Diseño responsive",
      "Presentación de la propuesta de vehículos",
      "Experiencia optimizada para dispositivos móviles",
    ],
    mainImage:
      "https://ik.imagekit.io/8om8rmpb6/imagen.png?updatedAt=1791332340847",
    detailImage:
      "https://ik.imagekit.io/8om8rmpb6/Sell%20secci%C3%B3n%20.png?updatedAt=1791403190493",
    images: [
      "https://ik.imagekit.io/8om8rmpb6/Sell%20secci%C3%B3n%20.png?updatedAt=1791403190493",
    ],
    projectLink: "https://chicago-motors.vercel.app/",
    aiHint: "car dealership website",
  },
  {
    id: "deyconicstore",
    slug: "deyconic-store",
    title: "Deyconic Store",
    category: "apps-web",
    categoryLabel: "App web",
    client: "Startup tecnológica",
    date: "2024",
    description:
      "Marketplace digital para conectar proveedores y consumidores de productos tecnológicos mediante una experiencia de compra en línea.",
    features: [
      "Plataforma e-commerce",
      "Perfiles de usuario",
      "Catálogo digital",
      "Panel de administración",
    ],
    mainImage:
      "https://ik.imagekit.io/8om8rmpb6/landin%20page.png?updatedAt=1791332782780",
    detailImage:
      "https://ik.imagekit.io/ajkl5a98u/deyconic%20store.jpg?updatedAt=1746197440975",
    images: [
      "https://ik.imagekit.io/ajkl5a98u/STORE%204.jpg?updatedAt=1746316452904",
    ],
    projectLink: "https://xmchat-three.vercel.app/",
    aiHint: "e-commerce marketplace",
  },
  {
    id: "Deyconic link",
    slug: "Deyconic-link",
    title: "Deyconic Link ",
    category: "apps-web",
    categoryLabel: "App web",
    client: "Web representativa",
    date: "2025",
    description:
      "Plataforma para presentar perfil de forma profesional, creada para presentar su propuesta y facilitar a los clientes el acceso a sus servicios.",
    features: [
      "Diseño responsive",
      "Presentación de su perfil de forma profesional",
      "Información de contacto",
    ],
    mainImage:
      "https://ik.imagekit.io/8om8rmpb6/imagen.jpg?updatedAt=1791331996838",
    detailImage:
      "https://ik.imagekit.io/8om8rmpb6/Home%20deyconiclink.png?updatedAt=1791403406895",
    images: [
      "https://ik.imagekit.io/8om8rmpb6/Home%20deyconiclink.png?updatedAt=1791403406895",
      "https://ik.imagekit.io/8om8rmpb6/Home%20deyconiclink.png?updatedAt=1791403406895",
    ],
    projectLink: "https://deyconiclink.vercel.app/",
    aiHint: "restaurant website",
  },
  {
    id: "primelegacyring",
    slug: "prime-legacy-ring",
    title: "Prime Legacy Ring",
    category: "softwares",
    categoryLabel: "Tecnología",
    client: "Proyecto Deyconic",
    date: "2024",
    description:
      "Concepto de anillo inteligente con tecnología integrada, pensado para ofrecer seguridad, estatus y exclusividad.",
    features: ["Seguridad", "Tecnología integrada", "Diseño exclusivo"],
    mainImage: "https://ik.imagekit.io/8om8rmpb6/imagen%20web.png?updatedAt=1791386406955",
    detailImage:
      "https://ik.imagekit.io/8om8rmpb6/Home%20prime%20legacy%20ring.png?updatedAt=1791404912810",
    images: [
      "https://ik.imagekit.io/ajkl5a98u/6f5e04d875cb07b4c27a099fc0d95807.jpg?updatedAt=1751383771610",
      "https://ik.imagekit.io/ajkl5a98u/fb6a1a4dfaa331e7e1c396a6bffbf845.jpg?updatedAt=1751383663861",
    ],
    aiHint: "smart ring concept",
    projectLink: "https://prime-legacy-ring.vercel.app/"
  },
  
  {
    id: "elitefit-rd",
    slug: "elitefit-rd",
    title: "ELITEFIT RD",
    category: "apps-web",
    categoryLabel: "App web",
    client: "ELITEFIT RD",
    date: "2026",
    description:
      "Plataforma web para una tienda de artículos fitness, diseñada para presentar sus productos y facilitar la compra en línea.",
    features: [
      "Diseño responsive",
      "Presentación de productos y servicios",
      "Acceso a tienda online",
      "Información de contacto",
    ],
    mainImage:
      "https://ik.imagekit.io/8om8rmpb6/screencapture-file-D-Digitalizaciones-empresariales-gym-index-html-2026-10-07-14_31_22zsasasw3.png?updatedAt=1791401113916",
    detailImage:
      "https://ik.imagekit.io/8om8rmpb6/HERO%20GYM.png?updatedAt=1791401278180",
    images: [
      "https://ik.imagekit.io/8om8rmpb6/Store%20mage%201212e.png?updatedAt=1791406645173",
    ],
    aiHint: "fitness e-commerce website",
    projectLink: "https://elite-fit-rd.vercel.app/"
  },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug);
}
