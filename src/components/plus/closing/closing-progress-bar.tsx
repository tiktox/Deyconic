"use client";

import { Check } from "lucide-react";

type Props = {
  progress: number; // 0-100
  solutionDone?: boolean;
  innovationDone?: boolean;
  controlDone?: boolean;
};

/**
 * Barra de progreso del cierre con las 3 fases obligatorias:
 * Solución → Innovación → Control. Avanza al completar cada fase.
 */
export default function ClosingProgressBar({
  progress,
  solutionDone,
  innovationDone,
  controlDone,
}: Props) {
  const clamped = Math.min(100, Math.max(0, progress));

  const phases = [
    { key: "solucion", label: "Solución", done: !!solutionDone },
    { key: "innovacion", label: "Innovación", done: !!innovationDone },
    { key: "control", label: "Control", done: !!controlDone },
  ];

  return (
    <div className="px-4 sm:px-6 py-2">
      <div className="max-w-3xl mx-auto">
        <div className="h-1 bg-[#262626] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#5aa9ff] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${clamped}%` }}
          />
        </div>

        {/* Fases del cierre */}
        <div className="flex items-center justify-center gap-4 mt-2 min-h-[16px]">
          {phases.map((p) => (
            <span
              key={p.key}
              className={`flex items-center gap-1 text-[10px] font-medium transition-colors ${
                p.done ? "text-[#5aa9ff]" : "text-white/25"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full flex items-center justify-center border transition-colors ${
                  p.done ? "bg-[#5aa9ff] border-[#5aa9ff]" : "border-white/20"
                }`}
              >
                {p.done && <Check className="w-2 h-2 text-black" strokeWidth={3.5} />}
              </span>
              {p.label}
            </span>
          ))}
        </div>

        {clamped >= 100 && (
          <p className="text-[10px] text-[#5aa9ff] text-center mt-1 font-medium">
            ✓ Cierre completado exitosamente — tu empresa avanzó hoy
          </p>
        )}
      </div>
    </div>
  );
}
