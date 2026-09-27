"use client";

import { useEffect, useState } from "react";
import type { SelectiveOption } from "@/lib/plus-chat";

export type { SelectiveOption };

type Props = {
  options: SelectiveOption[];
  disabled?: boolean;
  onSubmit: (labels: string[]) => void;
};

/**
 * Opciones selectivas del agente (estilo de la referencia visual):
 * píldoras gris oscuro con círculo blanco vacío; al marcar, el círculo
 * se rellena. El usuario puede elegir varias y confirmar con "Analizar".
 */
export default function SelectiveOptions({ options, disabled, onSubmit }: Props) {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (disabled) setSelected(new Set());
  }, [disabled]);

  const toggle = (id: number) => {
    if (disabled) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const normal = options.filter((o) => o.priority !== "high");
  const highPriority = options.filter((o) => o.priority === "high");

  const OptionButton = ({ opt }: { opt: SelectiveOption }) => {
    const active = selected.has(opt.id);
    return (
      <button
        onClick={() => toggle(opt.id)}
        disabled={disabled}
        className={`flex items-center gap-3 w-fit max-w-full px-4 py-2.5 rounded-full bg-[#262626] border border-white/10 transition-all text-left group hover:bg-[#303030] disabled:opacity-60 disabled:cursor-not-allowed ${
          active ? "ring-1 ring-white/60 bg-[#303030]" : ""
        }`}
      >
        <span
          className={`w-5 h-5 rounded-full border-2 shrink-0 transition-all flex items-center justify-center ${
            active ? "border-white bg-white" : "border-white/85 bg-transparent"
          }`}
        >
          {active && <span className="w-2 h-2 rounded-full bg-black" />}
        </span>
        <span className="text-sm font-semibold text-white/95">
          {opt.id}: {opt.label}
        </span>
      </button>
    );
  };

  return (
    <div className="space-y-2.5 mt-4">
      {normal.map((opt) => (
        <OptionButton key={opt.id} opt={opt} />
      ))}

      {highPriority.length > 0 && (
        <div className="space-y-2.5">
          <p className="text-sm text-white font-bold">
            Recomendado <span className="text-white/80">(ALTA PRIORIDAD)</span>
          </p>
          {highPriority.map((opt) => (
            <OptionButton key={opt.id} opt={opt} />
          ))}
        </div>
      )}

      {!disabled && selected.size > 0 && (
        <div className="pt-2">
          <button
            onClick={() => {
              const labels = options
                .filter((o) => selected.has(o.id))
                .map((o) => o.label);
              onSubmit(labels);
              setSelected(new Set());
            }}
            className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-colors"
          >
            Analizar {selected.size > 1 ? `${selected.size} problemas` : "seleccionado"}
          </button>
          <p className="text-[11px] text-white/35 mt-1.5">
            {selected.size > 1
              ? "Analizaré cada problema seleccionado, en orden, hasta completarlos todos."
              : "Puedes seleccionar varias opciones si lo necesitas."}
          </p>
        </div>
      )}
    </div>
  );
}
