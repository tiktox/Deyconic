"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "María García",
    role: "CEO, TechStart",
    content: "Deyconic transformó completamente nuestra presencia digital. Su equipo es profesional y entregó más de lo que esperábamos.",
    avatar: "/avatars/maria.jpg",
  },
  {
    name: "Juan Pérez",
    role: "Director de Marketing",
    content: "El trabajo de Deyconic ha sido fundamental para nuestro crecimiento online. Su enfoque en la experiencia del usuario es excepcional.",
    avatar: "/avatars/juan.jpg",
  },
  {
    name: "Ana Martínez",
    role: "Emprendedora",
    content: "Gracias a Deyconic, mi negocio tiene una presencia web profesional que atrae a más clientes cada día.",
    avatar: "/avatars/ana.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 