"use client";

import { MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const servicesData = [
  {
    title: "Gestión de Proyectos",
    description: "Desde la planificación hasta la ejecución y optimización de tus proyectos empresariales.",
  },
  {
    title: "Digitalización de Empresas",
    description: "Transformamos tu negocio con soluciones digitales innovadoras y automatización de procesos.",
  },
  {
    title: "Innovación y Desarrollo",
    description: "Incubación de startups y generación de estrategias disruptivas para tu negocio.",
  },
  {
    title: "Impulso Empresarial",
    description: "Mentorías, networking y financiamiento estratégico para nuevos empresarios.",
  },
  {
    title: "Zonas Francas y Operadores Logísticos",
    description: "Impulsar la eficiencia operativa, la visibilidad de la cadena de suministro y la resiliencia logística mediante la digitalización inteligente.",
  },
  {
    title: "Despachos de Abogados y Firmas Legales",
    description: "Modernizar la práctica legal, potenciar la eficiencia de los profesionales y mejorar la experiencia del cliente a través de soluciones LegalTech.",
  },
  {
    title: "Youtubers, Influencers y Creadores de Contenido Digital",
    description: "Maximizar el impacto y alcance del contenido, diversificar las fuentes de monetización y profesionalizar la operación creativa.",
  },
];

export default function ServiceRequestFAB() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceSelect = (service: typeof servicesData[0]) => {
    const message = encodeURIComponent(
      `¡Hola! Me interesa el servicio de "${service.title}"\n\n${service.description}`
    );
    const whatsappUrl = `https://wa.me/18299315704?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        size="lg"
      >
        <MessageSquarePlus className="h-6 w-6 mr-2" />
<<<<<<< HEAD
        <span className="hidden sm:inline">Solicitar Servicio</span>
=======
        Solicitar Servicio
>>>>>>> a89d67076adcbae9a1cf4394d7ee9ced74cff707
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-4">
              Selecciona el Servicio que Deseas
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="grid gap-4">
              {servicesData.map((service, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                  onClick={() => handleServiceSelect(service)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
} 