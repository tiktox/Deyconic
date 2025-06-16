"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-secondary/50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Contáctanos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Envíanos un mensaje</CardTitle>
              <CardDescription>
                Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nombre
                  </label>
                  <Input id="name" placeholder="Tu nombre" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="tu@email.com" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mensaje
                  </label>
                  <Textarea
                    id="message"
                    placeholder="¿En qué podemos ayudarte?"
                    className="min-h-[100px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Enviar mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">contacto@deyconic.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Teléfono
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Av. Principal 123<br />
                  Ciudad, País
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
} 