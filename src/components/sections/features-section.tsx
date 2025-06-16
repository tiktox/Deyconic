"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Palette, Zap, Shield, Globe } from "lucide-react";

const features = [
  {
    title: "Desarrollo Web",
    description: "Creamos sitios web modernos y responsivos con las últimas tecnologías.",
    icon: Code,
  },
  {
    title: "Diseño UI/UX",
    description: "Diseños intuitivos y atractivos que mejoran la experiencia del usuario.",
    icon: Palette,
  },
  {
    title: "Optimización",
    description: "Mejoramos el rendimiento y la velocidad de tu aplicación web.",
    icon: Zap,
  },
  {
    title: "Seguridad",
    description: "Implementamos las mejores prácticas de seguridad para proteger tus datos.",
    icon: Shield,
  },
  {
    title: "Hosting",
    description: "Ofrecemos soluciones de hosting confiables y escalables.",
    icon: Globe,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestras Características</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 