"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "@/lib/plus-chat";
import { visibleStreamText } from "@/lib/plus-chat";
import MessageBubble, { StreamingBubble } from "./message-bubble";

type Props = {
  messages: ChatMessage[];
  streaming: boolean;
  streamingText: string;
  onSelectOptions: (labels: string[]) => void;
};

/**
 * Área interactiva central: renderiza la conversación del cierre diario,
 * el streaming en vivo y las opciones selectivas del agente.
 */
export default function ChatArea({
  messages,
  streaming,
  streamingText,
  onSelectOptions,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Ocultar mensajes automáticos (WELCOME_START + selecciones de opciones)
  const visible = messages.filter((m) => !m.auto);

  // Índice del último mensaje del asistente (el único con opciones activas)
  const lastAssistantId = [...visible].reverse().find((m) => m.role === "assistant")?.id;

  // Auto-scroll al final con cada mensaje nuevo o chunk de streaming
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visible.length, streamingText]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-5">
        {visible.map((m) => (
          <MessageBubble
            key={m.id}
            message={m}
            optionsActive={m.id === lastAssistantId && !streaming}
            onSelectOptions={onSelectOptions}
          />
        ))}

        {streaming && <StreamingBubble text={visibleStreamText(streamingText)} />}

        {visible.length === 0 && !streaming && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 rounded-full bg-[#5aa9ff]/15 flex items-center justify-center mb-4">
              <div className="w-4 h-4 rounded-full bg-[#5aa9ff] animate-pulse" />
            </div>
            <p className="text-white/50 text-sm">Preparando tu cierre diario…</p>
          </div>
        )}
      </div>
    </div>
  );
}
