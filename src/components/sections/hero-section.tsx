"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Soluciones Tecnológicas Innovadoras
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Transformamos ideas en realidad digital con soluciones tecnológicas de vanguardia
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            Comienza Ahora
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10"
          >
            Conoce Más
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comienza tu proyecto</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" placeholder="Tu nombre" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Input id="message" placeholder="¿En qué podemos ayudarte?" required />
            </div>
            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}

