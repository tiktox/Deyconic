"use client";

import { MapPin, Menu } from "lucide-react";

export default function PlusHeader({ onSettings }: { onSettings?: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-black">
      {/* Pin del agente (marca Deyconic) */}
      <div className="w-9 h-9 rounded-xl bg-[#1f1f1f] flex items-center justify-center">
        <MapPin className="w-4 h-4 text-white/80" />
      </div>

      {/* Menú / ajustes */}
      <button
        onClick={onSettings}
        aria-label="Configuración"
        className="w-9 h-9 rounded-full bg-[#1f1f1f] flex items-center justify-center text-white/80 hover:bg-[#2a2a2a] transition-colors"
      >
        <Menu className="w-4 h-4" />
      </button>
    </div>
  );
}
