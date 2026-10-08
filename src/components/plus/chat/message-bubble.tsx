"use client";

import type { ChatMessage } from "@/lib/plus-chat";
import SelectiveOptions from "./selective-options";

type Props = {
  message: ChatMessage;
  optionsActive?: boolean; // solo el último mensaje del asistente permite interactuar
  onSelectOptions?: (labels: string[]) => void;
};

/** Formato markdown-lite: **negrita**, encabezados "X:", bullets "- " / "• ". */
function FormattedText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-3">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-1" />;

        // Bullets
        if (/^[-•*]\s+/.test(trimmed)) {
          return (
            <div key={i} className="flex gap-2.5">
              <span className="text-white/80 mt-[2px] shrink-0 select-none">•</span>
              <p className="text-sm leading-relaxed text-white/90">
                {renderBold(trimmed.replace(/^[-•*]\s+/, ""))}
              </p>
            </div>
          );
        }

        // Encabezado tipo "Resumen ejecutivo:" o "**Problemas**"
        if (
          /^[*#]*[A-ZÁÉÍÓÚÑ][^:]{2,45}:[*#]*$/.test(trimmed) ||
          /^[*#]{1,3}[^*#]+[*#]{1,3}$/.test(trimmed)
        ) {
          return (
            <p key={i} className="text-sm font-bold text-white pt-1">
              {renderBold(trimmed)}
            </p>
          );
        }

        return (
          <p key={i} className="text-sm leading-relaxed text-white/85">
            {renderBold(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

/** Convierte **negrita** en <strong>. */
function renderBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="text-white font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

export default function MessageBubble({ message, optionsActive, onSelectOptions }: Props) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-[#2a2a2a] px-4 py-2.5">
          <p className="text-sm leading-relaxed text-white/95 whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  // Asistente: texto plano sobre fondo negro (estilo de la referencia), sin burbuja
  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-full">
        <FormattedText text={message.content} />
        {message.options && message.options.length > 0 && onSelectOptions && (
          <SelectiveOptions
            options={message.options}
            disabled={!optionsActive}
            onSubmit={onSelectOptions}
          />
        )}
      </div>
    </div>
  );
}

/** Asistente mientras escribe (streaming): indicador de puntos o texto + cursor. */
export function StreamingBubble({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-start w-full">
      {!text ? (
        <div className="flex items-center gap-1.5 py-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      ) : (
        <div>
          <FormattedText text={text} />
          <span className="inline-block w-2 h-4 bg-[#5aa9ff] animate-pulse mt-1" />
        </div>
      )}
    </div>
  );
}
