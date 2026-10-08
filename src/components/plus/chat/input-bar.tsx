"use client";

import { useState } from "react";
import { ArrowUp, Square, CheckCircle2, MoonStar, TrendingUp, Save, Play } from "lucide-react";

type Props = {
  disabled?: boolean;
  streaming?: boolean;
  completed?: boolean;
  incomplete?: boolean;
  onSend: (text: string) => void;
  onElevate?: () => void;
  onSaveAndContinue?: () => void;
  onResume?: () => void;
};

/**
 * Barra de input del cierre diario (estilo de la referencia visual):
 * píldora oscura grande + botón circular azul a la derecha.
 * Incluye acciones del ciclo: elevar el cierre y guardar para mañana.
 */
export default function InputBar({
  disabled,
  streaming,
  completed,
  incomplete,
  onSend,
  onElevate,
  onSaveAndContinue,
  onResume,
}: Props) {
  const [value, setValue] = useState("");

  const canSend = !disabled && !streaming && value.trim().length > 0;

  const submit = () => {
    if (!canSend) return;
    onSend(value.trim());
    setValue("");
  };

  // ── Cierre completado ──
  if (completed) {
    return (
      <div className="px-4 sm:px-6 pt-3 pb-1">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-2 rounded-full bg-[#1f1f1f] border border-[#5aa9ff]/25 px-4 py-3">
          <CheckCircle2 className="w-4 h-4 text-[#5aa9ff] shrink-0" />
          <p className="text-sm text-white/80 font-medium">
            Cierre completado — solución, innovación y control quedaron registrados.
          </p>
        </div>
      </div>
    );
  }

  // ── Cierre guardado como pendiente ──
  if (incomplete) {
    return (
      <div className="px-4 sm:px-6 pt-3 pb-1">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 rounded-2xl bg-[#1f1f1f] border border-amber-500/25 px-4 py-3">
          <div className="flex items-center gap-2">
            <MoonStar className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-sm text-white/80 font-medium">
              Cierre guardado — retomaremos lo pendiente.
            </p>
          </div>
          {onResume && (
            <button
              onClick={onResume}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400 text-black text-xs font-bold hover:bg-amber-300 transition-colors"
            >
              <Play className="w-3 h-3 fill-current" /> Continuar ahora
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 pt-3 pb-2">
      <div className="max-w-3xl mx-auto space-y-2">

        {/* Acciones del ciclo */}
        <div className="flex items-center justify-center gap-2">
          {onElevate && (
            <button
              onClick={onElevate}
              disabled={disabled || streaming}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1f1f1f] border border-white/10 text-[11px] text-white/60 hover:text-white hover:border-white/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <TrendingUp className="w-3 h-3" />
              Elevar este cierre
            </button>
          )}
          {onSaveAndContinue && (
            <button
              onClick={onSaveAndContinue}
              disabled={disabled || streaming}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1f1f1f] border border-white/10 text-[11px] text-white/60 hover:text-white hover:border-white/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Save className="w-3 h-3" />
              Guardar y continuar mañana
            </button>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex items-center gap-2 rounded-full bg-[#1f1f1f] border border-white/10 pl-5 pr-1.5 py-1.5 focus-within:border-white/25 transition-colors"
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={
              streaming ? "Deyconic está analizando…" : "Escribir a Deyconic plus"
            }
            disabled={disabled || streaming}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none disabled:opacity-60"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!canSend && !streaming}
            aria-label={streaming ? "Analizando" : "Enviar"}
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all bg-[#5aa9ff] ${
              canSend
                ? "hover:bg-[#6fb4ff] shadow-lg shadow-[#5aa9ff]/30"
                : "opacity-70"
            }`}
          >
            {streaming ? (
              <Square className="w-3 h-3 text-white fill-white" />
            ) : (
              <ArrowUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
