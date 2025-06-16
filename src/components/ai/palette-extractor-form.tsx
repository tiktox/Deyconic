"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Palette } from "lucide-react";
import { extractColorPalette } from "@/ai/flows/extract-color-palette";
import { toast } from "sonner";
import { ColorPalette } from "@/components/color-palette";

export default function PaletteExtractorForm() {
  const [imageUri, setImageUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [palette, setPalette] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUri) {
      toast.error("Por favor, ingresa una URL de imagen");
      return;
    }

    setIsLoading(true);
    try {
      const result = await extractColorPalette({ imageUri });
      if (result.colors.length > 0) {
        setPalette(result.colors);
        toast.success("¡Paleta de colores extraída con éxito!");
      } else {
        toast.error("No se pudieron extraer colores de la imagen");
      }
    } catch (error) {
      console.error("Error al extraer la paleta:", error);
      toast.error("Error al extraer la paleta de colores");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Palette className="mr-3 h-7 w-7 text-primary" />
          Extractor de Paleta de Colores
        </CardTitle>
        <CardDescription>
          Ingresa la URL de una imagen para extraer su paleta de colores
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageUri">URL de la imagen</Label>
              <Input
                id="imageUri"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={imageUri}
                onChange={(e) => setImageUri(e.target.value)}
                required
              />
            </div>
            {palette.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Paleta de colores extraída:</h3>
                <ColorPalette colors={palette} />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Extrayendo..." : "Extraer Paleta"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

