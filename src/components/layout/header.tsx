"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { DeyconicLogo } from "@/components/icons/deyconic-logo";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "#proyectos", label: "PROYECTOS" },
  { href: "#servicios", label: "SERVICIOS" },
  { href: "#hero", label: "DEYCONIC", brand: true },
  { href: "/plus/login", label: "INVERTIR" },
  { href: "/plus/login", label: "DEYCONIC PLUS" },
];

const originalLightLogoUrl = "https://ik.imagekit.io/ajkl5a98u/logo_1000x1000-removebg-preview.png?updatedAt=1746469003137";
const originalDarkLogoUrl = "https://ik.imagekit.io/ajkl5a98u/1000x1000-removebg-preview2.0.png?updatedAt=1746468946560";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();
    const targetId = href.slice(1);
    if (pathname === "/") {
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
      }
      return;
    }

    router.push(`/${href}`);
    window.setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
      }
    }, 500);
  };

  const logo = (
    <Link href="/" className="flex items-center" aria-label="Deyconic, inicio">
      <DeyconicLogo
        lightLogoUrl={isScrolled ? originalLightLogoUrl : originalDarkLogoUrl}
        darkLogoUrl={originalDarkLogoUrl}
        width={40}
        height={40}
      />
    </Link>
  );

  const contactButton = (
    <Button
      asChild
      className="h-9 rounded-full bg-white px-4 text-[11px] font-bold text-black hover:bg-white/90 sm:h-10 sm:px-6 sm:text-xs xl:px-7 xl:text-sm"
    >
      <Link href="#contacto">CONTACTO</Link>
    </Button>
  );

  return (
    <motion.header
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-[#000000] shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
      initial={false}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
    >
      <div className="relative mx-auto w-full pl-4 pr-3 sm:pl-6 sm:pr-4 lg:pl-10 lg:pr-[12px]">
        <div className="flex h-16 items-center justify-between">
          {logo}

          <nav
            aria-label="Navegación principal"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 lg:left-[calc(50%+12px)] lg:flex xl:gap-8 2xl:gap-12"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={handleNavClick(link.href)}
                className={`whitespace-nowrap font-semibold transition-colors hover:text-primary ${
                  isScrolled ? "text-white" : "text-white"
                } ${link.brand ? "text-lg font-extrabold xl:text-2xl 2xl:text-[26px]" : "text-[10px] lg:text-[11px] xl:text-sm 2xl:text-base"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">{contactButton}</div>

          <div className="flex items-center gap-2 lg:hidden">
            {contactButton}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={isScrolled ? "text-white" : "text-white hover:bg-white/10"}
                  aria-label="Abrir menú"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-[300px] flex-col bg-white p-0 sm:w-[400px]">
                <SheetHeader className="border-b border-border p-6">
                  <SheetTitle>{logo}</SheetTitle>
                </SheetHeader>
                <nav aria-label="Navegación móvil" className="flex flex-col gap-1 p-6">
                  {navLinks.map((link) => (
                    <SheetClose key={link.label} asChild>
                      <Link
                        href={link.href}
                        onClick={handleNavClick(link.href)}
                        className={`rounded-md px-3 py-3 font-semibold text-foreground transition-colors hover:bg-muted hover:text-primary ${
                          link.brand ? "text-xl font-extrabold" : "text-base"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link
                      href="#contacto"
                      className="rounded-md bg-primary px-3 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      CONTACTO
                    </Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
