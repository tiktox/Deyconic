// Tipos y utilidades del chat de Deyconic Plus (cliente)

export type SelectiveOption = {
  id: number;
  label: string;
  priority: "normal" | "high";
};

/** Artefactos estructurados que el agente emite dentro del cierre. */
export type ProblemArtifact = {
  titulo: string;
  contexto: string;
  prioridad: "alta" | "media" | "baja";
  criterioResolucion: string;
  accion: string;
  plazo: string;
};

export type InnovationArtifact = {
  area: string;
  propuesta: string;
  beneficio: string;
  primerPaso: string;
};

export type ControlArtifact = {
  queVerificar: string;
  fechaRevision: string;
  criterioExito: string;
  siFalla: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string; // texto visible (sin bloques <<<...>>>)
  options?: SelectiveOption[];
  auto?: boolean; // mensaje enviado automáticamente (selección de opción)
  createdAt: number;
};

// ─── Parser de bloques estructurados <<<TAG>>> json <<<END>>> ───────────────

const BLOCK_TAGS = ["OPTIONS", "PROBLEM", "INNOVATION", "CONTROL"] as const;

function stripBlocks(raw: string): string {
  let text = raw;
  for (const tag of BLOCK_TAGS) {
    text = text.replace(new RegExp(`<<<${tag}>>>\\s*[\\s\\S]*?\\s*<<<END>>>`, "g"), "");
  }
  return text.trim();
}

function parseJsonBlocks<T>(raw: string, tag: string, guard: (o: unknown) => o is T): T[] {
  const re = new RegExp(`<<<${tag}>>>\\s*([\\s\\S]*?)\\s*<<<END>>>`, "g");
  const out: T[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw)) !== null) {
    try {
      const parsed = JSON.parse(m[1]) as unknown;
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) if (guard(item)) out.push(item);
    } catch {
      // bloque mal formado — ignorar, el texto visible ya quedó limpio
    }
  }
  return out;
}

const isStr = (v: unknown): v is string => typeof v === "string" && v.length > 0;

function isProblem(o: unknown): o is ProblemArtifact {
  const r = o as Record<string, unknown>;
  return !!o && isStr(r.titulo) && isStr(r.accion);
}
function isInnovation(o: unknown): o is InnovationArtifact {
  const r = o as Record<string, unknown>;
  return !!o && isStr(r.area) && isStr(r.propuesta);
}
function isControl(o: unknown): o is ControlArtifact {
  const r = o as Record<string, unknown>;
  return !!o && isStr(r.queVerificar) && isStr(r.fechaRevision);
}

export type ParsedAssistant = {
  text: string;
  options?: SelectiveOption[];
  problems: ProblemArtifact[];
  innovations: InnovationArtifact[];
  controls: ControlArtifact[];
};

/**
 * Separa el texto visible de un mensaje del asistente y extrae todos los
 * bloques estructurados (opciones selectivas + artefactos del cierre).
 */
export function parseAssistantContent(raw: string): ParsedAssistant {
  const text = stripBlocks(raw);

  const rawOptions = parseJsonBlocks<SelectiveOption>(raw, "OPTIONS", (o): o is SelectiveOption => {
    const r = o as Record<string, unknown>;
    return !!o && (typeof r.id === "number" || typeof r.id === "string") && isStr(r.label);
  })
    .map((o, i) => {
      const idNum = typeof o.id === "string" ? parseInt(o.id, 10) : o.id;
      const prio = typeof o.priority === "string" ? o.priority.toLowerCase() : "";
      return {
        id: Number.isFinite(idNum) ? (idNum as number) : i + 1,
        label: String(o.label),
        priority: prio === "high" || prio === "alta" || prio === "alto" ? ("high" as const) : ("normal" as const),
      };
    })
    .slice(0, 4);

  return {
    text,
    options: rawOptions.length ? rawOptions : undefined,
    problems: parseJsonBlocks(raw, "PROBLEM", isProblem),
    innovations: parseJsonBlocks(raw, "INNOVATION", isInnovation),
    controls: parseJsonBlocks(raw, "CONTROL", isControl),
  };
}

/** Quita bloques de un texto en streaming (aún incompleto). */
export function visibleStreamText(raw: string): string {
  const idx = raw.indexOf("<<<");
  return (idx === -1 ? raw : raw.slice(0, idx)).trimEnd();
}

/** Hitos fijos del cierre (0–100). */
export const MILESTONES = {
  bienvenida: 10,
  resumen: 100,
} as const;

/**
 * Progreso por fases del cierre diario — Ningún cierre termina sin producir
 * progreso: Solución (+30) → Innovación (+30) → Control (+20) → Resumen (100).
 */
export function phaseProgress(p: {
  problemsResolved: number;
  problemsTotal: number;
  innovationDone: boolean;
  controlDone: boolean;
}): number {
  let pct = MILESTONES.bienvenida;
  if (p.problemsTotal > 0) {
    // La fase de solución aporta hasta +30, escalado por problemas resueltos
    pct += Math.round(30 * Math.min(p.problemsResolved / p.problemsTotal, 1));
  }
  if (p.innovationDone) pct += 30;
  if (p.controlDone) pct += 20;
  return Math.min(pct, 95); // el 100% lo pone exclusivamente el resumen ejecutivo
}

/** Extrae un extracto legible del resumen ejecutivo para la lista de cierres. */
export function extractSummary(text: string): string {
  const m = text.match(/resumen ejecutivo[:*\s—-]*([\s\S]+)/i);
  const src = m ? m[1] : text;
  const clean = src
    .replace(/[#*_—`>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return clean.length > 200 ? `${clean.slice(0, 200).trimEnd()}…` : clean;
}

/** Regex para detectar el bloque de problemas al inicio de un cierre. */
export const PROBLEM_SELECT_RE = /selecciona el problema/i;
