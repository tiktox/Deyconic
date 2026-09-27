"use client";

import { useState } from "react";
import { Search, Plus, CheckCircle2, Clock, Target, MoonStar } from "lucide-react";
import type { ClosingDoc } from "@/lib/use-closing";

export type Goal = {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "active" | "completed";
};

type Props = {
  closings: ClosingDoc[];
  goals: Goal[];
  totalCompletedClosings: number;
  onSelectClosing: (id: string) => void;
  onCreateGoal: () => void;
};

function formatDate(createdAt: number): string {
  return new Date(createdAt).toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function PlusSidebar({
  closings,
  goals,
  totalCompletedClosings,
  onSelectClosing,
  onCreateGoal,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = closings.filter(
    (c) =>
      formatDate(c.createdAt).toLowerCase().includes(search.toLowerCase()) ||
      (c.summary ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const goalsUnlocked = totalCompletedClosings >= 3;

  return (
    <div className="flex flex-col h-full bg-black lg:border-r border-white/8 w-full lg:w-[340px] lg:shrink-0">

      {/* ── Búsqueda (icono a la derecha, como en la referencia) ── */}
      <div className="p-3">
        <div className="flex items-center gap-2 bg-[#1f1f1f] rounded-full px-4 py-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar cierres anteriores"
            className="bg-transparent text-xs text-white/80 placeholder:text-white/35 outline-none w-full"
          />
          <Search className="w-4 h-4 text-white/40 shrink-0" />
        </div>
      </div>

      {/* ── Cierres diarios ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="m-3 rounded-2xl bg-[#1c1c1c] overflow-hidden">
          <div className="px-4 pt-4 pb-2 text-center">
            <p className="font-bold text-white text-base">Cierres diarios</p>
          </div>

          {filtered.length === 0 ? (
            <div className="px-4 pb-6 pt-1 text-center">
              <p className="text-xs text-white/40">
                {search ? "Sin resultados" : "Aún no hay cierres diarios"}
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-white/5 border-t border-white/5">
              {filtered.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onSelectClosing(c.id)}
                    className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      {c.status === "completed" ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                      ) : c.status === "incomplete" ? (
                        <MoonStar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-[#8fc3ff] shrink-0" />
                      )}
                      <p className="text-xs text-white/50">{formatDate(c.createdAt)}</p>
                    </div>
                    <p className="text-sm text-white/80 line-clamp-2">{c.summary}</p>
                    <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          c.status === "completed"
                            ? "bg-green-500/70"
                            : c.status === "incomplete"
                              ? "bg-amber-400/70"
                              : "bg-[#5aa9ff]"
                        }`}
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Metas ── */}
        <div className="m-3 mt-0 rounded-2xl bg-[#1c1c1c] overflow-hidden">
          <div className="px-4 pt-4 pb-2 text-center">
            <p className="font-bold text-white text-base">Metas</p>
          </div>

          {!goalsUnlocked ? (
            <div className="px-4 pb-7 pt-1 text-center flex flex-col items-center gap-4">
              <p className="text-xs text-white/40">Aún no hay metas creadas</p>
              <button
                disabled
                className="w-14 h-14 rounded-full border-2 border-white/50 flex items-center justify-center text-white/50 cursor-not-allowed"
              >
                <Plus className="w-6 h-6" />
              </button>
              <p className="text-xs text-white/40 leading-snug">
                Completa 3 Cierres para crear
                <br />
                nuestra primera meta
                <span className="block mt-1.5 text-[#8fc3ff]">
                  ({totalCompletedClosings}/3 completados)
                </span>
              </p>
            </div>
          ) : goals.length === 0 ? (
            <div className="px-4 pb-7 pt-1 text-center flex flex-col items-center gap-4">
              <p className="text-xs text-white/40">Sin metas activas</p>
              <button
                onClick={onCreateGoal}
                className="w-14 h-14 rounded-full border-2 border-white/60 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <Plus className="w-6 h-6" />
              </button>
              <p className="text-xs text-white/40">Crear primera meta</p>
            </div>
          ) : (
            <ul className="divide-y divide-white/5 border-t border-white/5">
              {goals.map((g) => (
                <li key={g.id} className="px-4 py-3 flex items-center gap-3">
                  <Target
                    className={`w-4 h-4 shrink-0 ${
                      g.status === "completed"
                        ? "text-green-400"
                        : g.status === "active"
                          ? "text-[#5aa9ff]"
                          : "text-white/30"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white/80 line-clamp-1">{g.title}</p>
                    {g.description && (
                      <p className="text-xs text-white/40 line-clamp-1">{g.description}</p>
                    )}
                  </div>
                </li>
              ))}
              <li className="px-4 py-3">
                <button
                  onClick={onCreateGoal}
                  className="flex items-center gap-2 text-xs text-[#8fc3ff] hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Nueva meta
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
