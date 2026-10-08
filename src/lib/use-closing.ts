"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getPlusAuth, getPlusDb } from "@/lib/firebase-plus";
import type { EmpresaData } from "@/lib/plus-types";
import {
  parseAssistantContent,
  phaseProgress,
  extractSummary,
  MILESTONES,
  type ChatMessage,
  type ProblemArtifact,
  type InnovationArtifact,
  type ControlArtifact,
} from "@/lib/plus-chat";

export type { ChatMessage, ProblemArtifact, InnovationArtifact, ControlArtifact };

export type ClosingStatus = "loading" | "active" | "incomplete" | "completed";

export type ClosingDoc = {
  id: string;
  status: "active" | "incomplete" | "completed";
  progress: number;
  summary?: string;
  createdAt: number;
};

/** yyyy-MM-dd en hora local — identifica el cierre diario. */
export function todayId(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Firestore no admite valores undefined — construye el doc sin claves vacías. */
function sanitizeMessages(msgs: ChatMessage[]): Record<string, unknown>[] {
  return msgs.map((m) => {
    const out: Record<string, unknown> = {
      id: m.id,
      role: m.role,
      content: m.content,
      createdAt: m.createdAt,
    };
    if (m.options && m.options.length > 0) out.options = m.options;
    if (m.auto) out.auto = true;
    return out;
  });
}

// ─── Bienvenida: primer "mensaje" invisible que instruye al agente ───────────

export function buildWelcomeStartMessage(
  e: EmpresaData,
  ctx: { isFirstClosing: boolean; pendingNote?: string; lastSummary?: string }
): string {
  if (ctx.isFirstClosing) {
    // ── PRIMER CIERRE DE LA EMPRESA: la gran presentación (es la única vez) ──
    return [
      `WELCOME_START (mi PRIMER cierre con Deyconic Plus): Abre con energía, exactamente en este estilo:`,
      `"Heyy, ${e.name}. Bienvenido(a) a Deyconic Plus."`,
      `Luego: "Gracias por confiar en nosotros y permitirme formar parte del crecimiento de ${e.companyName}."`,
      `Explica que trabajarás conmigo como mi gerente digital, utilizando la información de mi`,
      `empresa, mis objetivos, mis prioridades y la evolución que iremos construyendo con cada cierre.`,
      `Afirma: "Ya conozco el contexto inicial de ${e.companyName}." y que a partir de hoy no`,
      `solamente vamos a identificar lo que está ocurriendo en la empresa: vamos a trabajar para mejorarla.`,
      `Presenta los tres objetivos del cierre con este formato numerado exacto:`,
      `• 01 — Resolver: Atender un problema potencial y establecer una solución concreta.`,
      `• 02 — Innovar: Detectar una oportunidad y mejorar una parte importante de la empresa.`,
      `• 03 — Verificar: Definir cómo comprobaremos que lo realizado realmente funcionó.`,
      `Cierra diciendo: "Empecemos. Ya tengo identificado el primer punto que debemos atender."`,
      `y ofrece 3 opciones selectivas (<<<OPTIONS>>>, máximo 3) a partir de mis problemas actuales:`,
      `${e.mainProblems}. Marca con "priority":"high" el que consideres más urgente.`,
      ctx.pendingNote ?? "",
    ].join(" ");
  }

  // ── CIERRES SIGUIENTES: cero presentación, cero nombre, directo a la agenda ──
  return [
    `WELCOME_CONTINUACION (este NO es mi primer cierre — ya te conozco):`,
    `PROHIBIDO volver a presentarte, dar la bienvenida a Deyconic Plus, explicar quién eres`,
    `o usar mi nombre. Abre directo con una frase breve de continuidad, por ejemplo:`,
    `"Continuamos con el siguiente cierre." o "Seguimos adelante con el cierre de hoy."`,
    ctx.lastSummary
      ? `En UNA línea, recuerda lo trabajado en el último cierre: ${ctx.lastSummary}`
      : "",
    ctx.pendingNote ?? "",
    `Luego ve DIRECTO a la agenda: indica el problema que recomiendas atender hoy y por qué,`,
    `y ofrece opciones selectivas (<<<OPTIONS>>>, máximo 3) con los problemas vigentes:`,
    `${e.mainProblems}. Marca con "priority":"high" el más urgente.`,
  ].join(" ");
}

// ─── Hook principal del ciclo de cierre ──────────────────────────────────────

export function useClosing(empresa: EmpresaData | null, uid: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamingText, setStreamingText] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<ClosingStatus>("loading");
  // ── Artefactos del cierre (los 3 resultados obligatorios) ──
  const [solutions, setSolutions] = useState<ProblemArtifact[]>([]);
  const [innovation, setInnovation] = useState<InnovationArtifact | null>(null);
  const [control, setControl] = useState<ControlArtifact | null>(null);

  const queueRef = useRef<string[]>([]);
  const queuePosRef = useRef(0);
  const progressRef = useRef(0);
  const dayRef = useRef(todayId());
  // ── Progreso semántico: la barra SOLO avanza al resolver problemas ──
  // problemPlanRef: problemas seleccionados hoy | resolvedRef: cuántos ya
  // recibieron su análisis-resolución completo | currentProblemRef: problema
  // que está siendo respondido ahora mismo
  const problemPlanRef = useRef<string[]>([]);
  const resolvedRef = useRef(0);
  const currentProblemRef = useRef<string | null>(null);
  const solutionsRef = useRef<ProblemArtifact[]>([]);
  const innovationRef = useRef<InnovationArtifact | null>(null);
  const controlRef = useRef<ControlArtifact | null>(null);
  const [problemsTotal, setProblemsTotal] = useState(0);
  const [problemsResolved, setProblemsResolved] = useState(0);
  // refs espejo para evitar closures obsoletos dentro del stream
  const messagesRef = useRef<ChatMessage[]>([]);
  const empresaRef = useRef<EmpresaData | null>(null);
  const uidRef = useRef<string | null>(null);
  messagesRef.current = messages;
  empresaRef.current = empresa;
  uidRef.current = uid;

  const closingDocRef = useMemo(
    () => (uid ? doc(getPlusDb(), "cierres", uid, "diarios", dayRef.current) : null),
    [uid]
  );

  const bumpProgress = useCallback((milestone: number) => {
    if (milestone > progressRef.current) {
      progressRef.current = milestone;
      setProgress(milestone);
    }
  }, []);

  // ── Persistencia del cierre del día ────────────────────────────────────────
  const persist = useCallback(
    async (
      msgs: ChatMessage[],
      st: "active" | "incomplete" | "completed",
      summary?: string,
      pendientes?: string[]
    ) => {
      if (!closingDocRef) return;
      try {
        await setDoc(
          closingDocRef,
          {
            messages: sanitizeMessages(msgs),
            progress: progressRef.current,
            status: st,
            problemPlan: problemPlanRef.current,
            ...(solutionsRef.current.length ? { problems: solutionsRef.current } : {}),
            ...(innovationRef.current ? { innovation: innovationRef.current } : {}),
            ...(controlRef.current ? { control: controlRef.current } : {}),
            ...(summary ? { summary } : {}),
            ...(pendientes ? { pendientes } : {}),
            ...(st === "completed" ? { completedAt: serverTimestamp() } : {}),
            updatedAt: serverTimestamp(),
            createdAt: Date.now(),
          },
          { merge: true }
        );
      } catch (e) {
        console.error("[useClosing] persist:", e);
      }
    },
    [closingDocRef]
  );

  // ── Lectura del stream SSE (NVIDIA → API route → aquí) ────────────────────
  async function readStream(
    body: ReadableStream<Uint8Array>,
    onChunk: (acc: string) => void
  ): Promise<string> {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buf = "";
    let acc = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";
      for (const line of lines) {
        const t = line.trim();
        if (!t.startsWith("data:")) continue;
        const payload = t.slice(5).trim();
        if (payload === "[DONE]") break;
        try {
          const json = JSON.parse(payload) as {
            choices?: { delta?: { content?: string } }[];
          };
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) {
            acc += delta;
            onChunk(acc);
          }
        } catch {
          // fragmento parcial — ignorar
        }
      }
    }
    return acc;
  }

  // ── Llamada al backend con el historial actual ─────────────────────────────
  const callApi = useCallback(async (baseMsgs: ChatMessage[]): Promise<string> => {
    const token = await getPlusAuth().currentUser?.getIdToken();
    if (!token) throw new Error("Sesión expirada");
    const history = baseMsgs.slice(-30).map(({ role, content }) => ({ role, content }));
    const res = await fetch("/api/plus/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ messages: history }),
    });
    if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
    return readStream(res.body, setStreamingText);
  }, []);

  // ── Finalizar respuesta del asistente: parseo, artefactos, progreso ──────
  const commitAssistant = useCallback(
    (raw: string, baseMsgs: ChatMessage[]) => {
      const parsed = parseAssistantContent(raw);
      const msg: ChatMessage = {
        id: newId(),
        role: "assistant",
        content: parsed.text,
        ...(parsed.options ? { options: parsed.options } : {}),
        createdAt: Date.now(),
      };
      const nextMsgs = [...baseMsgs, msg];
      setMessages(nextMsgs);

      // Piso: la bienvenida siempre garantiza el primer 10%
      bumpProgress(MILESTONES.bienvenida);

      // ── Artefactos estructurados emitidos por el agente ──
      if (parsed.problems.length) {
        for (const p of parsed.problems) {
          if (!solutionsRef.current.some((s) => s.titulo === p.titulo)) {
            solutionsRef.current = [...solutionsRef.current, p];
          }
        }
        setSolutions(solutionsRef.current);
      }
      if (parsed.innovations.length) {
        innovationRef.current = parsed.innovations[parsed.innovations.length - 1];
        setInnovation(innovationRef.current);
      }
      if (parsed.controls.length) {
        controlRef.current = parsed.controls[parsed.controls.length - 1];
        setControl(controlRef.current);
      }

      // Avance de la fase SOLUCIÓN: esta respuesta resolvió el problema en curso
      if (currentProblemRef.current) {
        currentProblemRef.current = null;
        resolvedRef.current += 1;
      }
      // Resuelto = máximo entre turnos de problema completados y bloques PROBLEM
      const resolved = Math.max(resolvedRef.current, solutionsRef.current.length);
      setProblemsResolved(resolved);

      bumpProgress(
        phaseProgress({
          problemsResolved: resolved,
          problemsTotal: Math.max(problemPlanRef.current.length, 1),
          innovationDone: !!innovationRef.current,
          controlDone: !!controlRef.current,
        })
      );

      const isSummary = /resumen ejecutivo/i.test(parsed.text);
      if (isSummary) {
        const summary = extractSummary(parsed.text);
        bumpProgress(MILESTONES.resumen);
        setStatus("completed");
        void persist(nextMsgs, "completed", summary);
        if (uidRef.current) {
          void setDoc(
            doc(getPlusDb(), "empresas", uidRef.current),
            { closingsCompleted: increment(1) },
            { merge: true }
          ).catch(() => {});
        }
      } else {
        void persist(nextMsgs, "active");
      }
    },
    [bumpProgress, persist]
  );

  // ── Enviar mensaje (texto libre u opción seleccionada) ────────────────────
  const sendMessage = useCallback(
    async (raw: string, opt?: { problemLabel?: string }) => {
      const empresa = empresaRef.current;
      const uid = uidRef.current;
      const content = raw.trim();
      if (!content || !uid || !empresa) return;
      if (streaming) {
        // Encolar si viene de selección múltiple
        if (opt?.problemLabel) queueRef.current.push(opt.problemLabel);
        return;
      }

      const userMsg: ChatMessage = {
        id: newId(),
        role: "user",
        content,
        auto: !!opt?.problemLabel,
        createdAt: Date.now(),
      };
      const baseMsgs = [...messagesRef.current, userMsg];
      setMessages(baseMsgs);

      if (opt?.problemLabel) {
        // Registrar el problema en el plan del día y marcarlo como "en curso";
        // la fase SOLUCIÓN avanzará cuando el asistente termine de resolverlo
        currentProblemRef.current = opt.problemLabel;
        if (!problemPlanRef.current.includes(opt.problemLabel)) {
          problemPlanRef.current = [...problemPlanRef.current, opt.problemLabel];
          setProblemsTotal(problemPlanRef.current.length);
        }
        void persist(baseMsgs, "active");
      }

      setStreaming(true);
      setStreamingText("");
      try {
        const acc = await callApi(baseMsgs);
        commitAssistant(acc, baseMsgs);
      } catch (e) {
        console.error("[useClosing] send:", e);
        const errMsg: ChatMessage = {
          id: newId(),
          role: "assistant",
          content:
            "Ocurrió un problema de comunicación con el servidor de IA. " +
            "Por favor, intenta de nuevo en unos segundos.",
          createdAt: Date.now(),
        };
        setMessages([...baseMsgs, errMsg]);
      } finally {
        setStreaming(false);
        setStreamingText("");
        // Procesar siguiente opción en cola (selección múltiple)
        queuePosRef.current += 1;
        const next = queueRef.current[queuePosRef.current];
        if (next) {
          // pequeña pausa perceptible entre análisis consecutivos
          setTimeout(() => void sendMessage(next, { problemLabel: next }), 700);
        } else {
          queueRef.current = [];
          queuePosRef.current = 0;
        }
      }
    },
    [streaming, callApi, commitAssistant, bumpProgress, persist]
  );

  /** Selección múltiple: encola todas y dispara la primera. */
  const sendOptions = useCallback(
    (labels: string[]) => {
      if (labels.length === 0 || streaming) return;
      queueRef.current = labels.slice(1);
      queuePosRef.current = -1;
      void sendMessage(labels[0], { problemLabel: labels[0] });
    },
    [streaming, sendMessage]
  );

  /** Elevación opcional: profundizar hasta ~25 min (riesgos, implementación, métricas). */
  const elevate = useCallback(() => {
    if (streaming || status !== "active") return;
    void sendMessage(
      "⤴ Quiero elevar este cierre: profundiza en riesgos, implementación detallada, " +
        "alternativas y métricas de lo trabajado hoy."
    );
  }, [streaming, status, sendMessage]);

  /** Calcula qué quedó abierto (soluciones, innovación y/o control pendientes). */
  const computePendientes = useCallback((): string[] => {
    const pendientes: string[] = [];
    const plan = problemPlanRef.current;
    const done = Math.max(resolvedRef.current, solutionsRef.current.length);
    for (const label of plan.slice(done)) {
      pendientes.push(`Resolver problema: ${label}`);
    }
    if (!innovationRef.current) pendientes.push("Definir la innovación del día");
    if (!controlRef.current) pendientes.push("Establecer el mecanismo de control y verificación");
    return pendientes;
  }, []);

  /** "Guardar y continuar mañana": el cierre queda incompleto con pendientes claros. */
  const saveAndContinue = useCallback(async () => {
    if (streaming || status !== "active") return;
    const pendientes = computePendientes();
    void persist(messagesRef.current, "incomplete", undefined, pendientes);
    setStatus("incomplete");
  }, [streaming, status, persist, computePendientes]);

  /** Reanudar un cierre guardado como pendiente (mismo día). */
  const resume = useCallback(() => {
    if (status !== "incomplete") return;
    setStatus("active");
    void persist(messagesRef.current, "active");
    void sendMessage(
      "Reanudo el cierre: continuemos con lo que quedó pendiente de la agenda de hoy."
    );
  }, [status, persist, sendMessage]);

  // ── Cargar cierre existente o iniciar bienvenida ──────────────────────────
  // En React StrictMode el efecto corre dos veces en dev: la primera pasada
  // queda cancelada (cleanup sincrónico) y la segunda completa el flujo.
  useEffect(() => {
    if (!uid || !empresa || !closingDocRef) return;
    let cancelled = false;

    (async () => {
      try {
        const snap = await getDoc(closingDocRef);
        if (cancelled) return;
        if (snap.exists()) {
          const data = snap.data() as {
            messages?: ChatMessage[];
            progress?: number;
            status?: string;
            problems?: ProblemArtifact[];
            innovation?: InnovationArtifact;
            control?: ControlArtifact;
            problemPlan?: string[];
          };
          const msgs = Array.isArray(data.messages)
            ? data.messages.filter(
                (m) => m && typeof m.content === "string" && m.role
              )
            : [];
          setMessages(msgs);
          // Restaurar artefactos y fases
          if (Array.isArray(data.problems)) {
            solutionsRef.current = data.problems;
            setSolutions(data.problems);
          }
          if (data.innovation) {
            innovationRef.current = data.innovation;
            setInnovation(data.innovation);
          }
          if (data.control) {
            controlRef.current = data.control;
            setControl(data.control);
          }
          if (Array.isArray(data.problemPlan)) {
            problemPlanRef.current = data.problemPlan;
            setProblemsTotal(data.problemPlan.length);
          }
          const restored = Math.max(
            data.problems?.length ?? 0,
            resolvedRef.current
          );
          setProblemsResolved(restored);
          const p = typeof data.progress === "number" ? data.progress : 0;
          progressRef.current = p;
          setProgress(p);
          setStatus(
            data.status === "completed"
              ? "completed"
              : data.status === "incomplete"
                ? "incomplete"
                : "active"
          );
          return;
        }
      } catch (e) {
        console.error("[useClosing] load:", e);
      }

      // ── Cierre nuevo del día → contexto: ¿primer cierre? ¿pendientes? ──
      let isFirstClosing = true;
      let pendingNote = "";
      let lastSummary = "";
      try {
        const recentQ = query(
          collection(getPlusDb(), "cierres", uid, "diarios"),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const recent = await getDocs(recentQ);
        if (cancelled) return;
        const previous = recent.docs
          .map((d) => ({ id: d.id, ...(d.data() as Record<string, unknown>) }))
          .filter((d) => d.id !== dayRef.current);

        isFirstClosing = previous.length === 0;

        const lastIncomplete = previous.find((d) => d.status === "incomplete");
        if (lastIncomplete) {
          const pend = Array.isArray(lastIncomplete.pendientes)
            ? (lastIncomplete.pendientes as string[])
            : [];
          pendingNote = pend.length
            ? `PENDIENTE: El cierre anterior (${lastIncomplete.id}) quedó guardado como pendiente. ` +
              `Al inicio del cierre de hoy, menciona brevemente que retomamos lo pendiente: ${pend.join("; ")}. ` +
              `Intégralo a la agenda de hoy antes de abrir temas nuevos.`
            : `PENDIENTE: El cierre anterior (${lastIncomplete.id}) quedó pendiente sin completar. ` +
              `Menciónalo brevemente y retómalo dentro de la agenda de hoy.`;
        }

        const lastCompleted = previous.find(
          (d) => d.status === "completed" && typeof d.summary === "string"
        );
        if (lastCompleted) lastSummary = lastCompleted.summary as string;
      } catch (e) {
        console.error("[useClosing] history lookup:", e);
      }

      // ── Mensaje de bienvenida (WELCOME_START) ──
      if (cancelled) return;
      setStatus("active");
      setStreaming(true);
      setStreamingText("");
      try {
        const kickoff: ChatMessage = {
          id: newId(),
          role: "user",
          content: buildWelcomeStartMessage(empresa, {
            isFirstClosing,
            ...(pendingNote ? { pendingNote } : {}),
            ...(lastSummary ? { lastSummary } : {}),
          }),
          auto: true,
          createdAt: Date.now(),
        };
        const acc = await callApi([kickoff]);
        if (cancelled) return;
        commitAssistant(acc, [kickoff]);
      } catch (e) {
        console.error("[useClosing] welcome:", e);
        if (!cancelled) {
          setMessages([
            {
              id: newId(),
              role: "assistant",
              content: isFirstClosing
                ? `Heyy, ${empresa.name}. Bienvenido a Deyconic Plus — seré tu Gerente Digital. ` +
                  `Estoy teniendo un problema de conexión con el servidor de IA; mientras se restablece, ` +
                  `cuéntame: ¿cuál es el problema más urgente de "${empresa.companyName}" hoy?`
                : `Continuamos con el siguiente cierre. Tengo un problema de conexión con el ` +
                  `servidor de IA; mientras se restablece, cuéntame lo más importante de hoy.`,
              createdAt: Date.now(),
            },
          ]);
          bumpProgress(MILESTONES.bienvenida);
          setStatus("active");
        }
      } finally {
        if (!cancelled) {
          setStreaming(false);
          setStreamingText("");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [uid, empresa, closingDocRef, callApi, commitAssistant, bumpProgress]);

  return {
    messages,
    streaming,
    streamingText,
    progress,
    status,
    closingId: dayRef.current,
    problemsTotal,
    problemsResolved,
    solutions,
    innovation,
    control,
    sendMessage,
    sendOptions,
    elevate,
    saveAndContinue,
    resume,
  };
}

// ─── Lista de cierres anteriores (sidebar) ───────────────────────────────────

export async function fetchClosings(uid: string): Promise<ClosingDoc[]> {
  const q = query(
    collection(getPlusDb(), "cierres", uid, "diarios"),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data() as Record<string, unknown> & {
      createdAt?: number | { toMillis(): number };
    };
    const createdAt =
      typeof data.createdAt === "number"
        ? data.createdAt
        : data.createdAt && typeof data.createdAt === "object"
          ? (data.createdAt as { toMillis(): number }).toMillis()
          : Date.now();
    return {
      id: d.id,
      status: (data.status as ClosingDoc["status"]) ?? "active",
      progress: (data.progress as number) ?? 0,
      summary:
        (data.summary as string) ??
        (data.status === "incomplete" ? "Cierre pendiente por completar…" : "Cierre en curso…"),
      createdAt,
    };
  });
}
