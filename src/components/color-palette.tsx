"use client";

import { cn } from "@/lib/utils";

interface ColorPaletteProps {
  colors: string[];
  className?: string;
}

export function ColorPalette({ colors, className }: ColorPaletteProps) {
  return (
    <div className={cn("grid grid-cols-5 gap-2", className)}>
      {colors.map((color, index) => (
        <div
          key={index}
          className="aspect-square rounded-lg shadow-md transition-transform hover:scale-105"
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  );
} 