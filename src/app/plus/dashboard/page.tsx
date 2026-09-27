"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { plusAuth, plusDb } from "@/lib/firebase-plus";
import { usePlusContext } from "@/lib/plus-context";
import {
  useClosing,
  fetchClosings,
  type ClosingDoc,
  type ChatMessage,
} from "@/lib/use-closing";
import PlusSidebar, { type Goal } from "@/components/plus/sidebar/sidebar";
import PlusHeader from "@/components/plus/header/plus-header";
import ChatArea from "@/components/plus/chat/chat-area";
import InputBar from "@/components/plus/chat/input-bar";
import ClosingProgressBar from "@/components/plus/closing/closing-progress-bar";
import MessageBubble from "@/components/plus/chat/message-bubble";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, PanelLeft, LogOut, Clock4, Building2 } from "lucide-react";

export default function PlusDashboardPage() {
  const router = useRouter();
  const { empresa, uid, loading } = usePlusContext();
  const closing = useClosing(empresa, uid);

  const [closings, setClosings] = useState<ClosingDoc[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Diálogos
  const [goalDialog, setGoalDialog] = useState(false);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDesc, setGoalDesc] = useState("");
  const [savingGoal, setSavingGoal] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [viewingClosing, setViewingClosing] = useState<{
    id: string;
    summary?: string;
    createdAt: number;
  } | null>(null);
  const [viewingMessages, setViewingMessages] = useState<ChatMessage[] | null>(null);

  const totalCompleted = closings.filter((c) => c.status === "completed").length;

  // ── Guard de autenticación ────────────────────────────────────────────────
  useEffect(() => {
    if (!loading && !uid) router.replace("/plus/login");
  }, [loading, uid, router]);

  // ── Cargar cierres y metas ────────────────────────────────────────────────
  const refreshClosings = useCallback(async () => {
    if (!uid) return;
    try {
      setClosings(await fetchClosings(uid));
    } catch (e) {
      console.error("[dashboard] closings:", e);
    }
  }, [uid]);

  const refreshGoals = useCallback(async () => {
    if (!uid) return;
    try {
      const q = query(
        collection(plusDb, "metas", uid, "items"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setGoals(
        snap.docs.map((d) => ({
          id: d.id,
          title: (d.data().title as string) ?? "",
          description: (d.data().description as string) ?? "",
          status: (d.data().status as Goal["status"]) ?? "pending",
        }))
      );
    } catch (e) {
      console.error("[dashboard] goals:", e);
    }
  }, [uid]);

  useEffect(() => {
    void refreshClosings();
    void refreshGoals();
  }, [refreshClosings, refreshGoals]);

  // Al completarse el cierre del día → refrescar lista de la sidebar
  useEffect(() => {
    if (closing.status === "completed") void refreshClosings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closing.status]);

  // ── Ver un cierre anterior (panel flotante) ───────────────────────────────
  const openClosing = useCallback(
    async (id: string) => {
      if (!uid) return;
      const meta = closings.find((c) => c.id === id);
      setViewingClosing(meta ? { id, summary: meta.summary, createdAt: meta.createdAt } : { id, createdAt: Date.now() });
      setViewingMessages(null);
      try {
        const snap = await getDoc(doc(plusDb, "cierres", uid, "diarios", id));
        if (snap.exists()) {
          const msgs = (snap.data().messages as ChatMessage[] | undefined) ?? [];
          setViewingMessages(msgs.filter((m) => !m.auto));
        } else {
          setViewingMessages([]);
        }
      } catch {
        setViewingMessages([]);
      }
    },
    [uid, closings]
  );

  // ── Crear meta ────────────────────────────────────────────────────────────
  const createGoal = async () => {
    if (!uid || !goalTitle.trim()) return;
    setSavingGoal(true);
    try {
      await addDoc(collection(plusDb, "metas", uid, "items"), {
        title: goalTitle.trim(),
        description: goalDesc.trim(),
        status: "pending",
        createdAt: Date.now(),
      });
      setGoalTitle("");
      setGoalDesc("");
      setGoalDialog(false);
      void refreshGoals();
    } finally {
      setSavingGoal(false);
    }
  };

  // ── Estados de carga / guardas ────────────────────────────────────────────
  if (loading || !empresa || !uid) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-7 h-7 text-[#5aa9ff] animate-spin" />
        <p className="text-sm text-white/40">
          {loading ? "Verificando sesión…" : "Cargando tu empresa…"}
        </p>
      </div>
    );
  }

  const sidebar = (
    <PlusSidebar
      closings={closings}
      goals={goals}
      totalCompletedClosings={totalCompleted}
      onSelectClosing={(id) => {
        setSidebarOpen(false);
        void openClosing(id);
      }}
      onCreateGoal={() => {
        setSidebarOpen(false);
        setGoalDialog(true);
      }}
    />
  );

  return (
    <div className="h-screen bg-black flex overflow-hidden">

      {/* Sidebar — fija en escritorio, overlay en móvil */}
      <aside className="hidden lg:block h-full">{sidebar}</aside>
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="absolute left-0 top-0 h-full w-[85vw] max-w-[340px] z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebar}
          </aside>
        </div>
      )}

      {/* Columna central */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* Header (sin borde visible, como en la referencia) */}
        <div className="flex items-center bg-black">
          <button
            className="lg:hidden ml-4 w-9 h-9 rounded-xl bg-[#1f1f1f] flex items-center justify-center text-white/60 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir panel"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
          <div className="flex-1">
            <PlusHeader onSettings={() => setSettingsOpen(true)} />
          </div>
        </div>

        <ChatArea
          messages={closing.messages}
          streaming={closing.streaming}
          streamingText={closing.streamingText}
          onSelectOptions={closing.sendOptions}
        />

        <InputBar
          onSend={(text) => void closing.sendMessage(text)}
          streaming={closing.streaming}
          completed={closing.status === "completed"}
          incomplete={closing.status === "incomplete"}
          disabled={closing.status === "loading"}
          onElevate={closing.elevate}
          onSaveAndContinue={() => void closing.saveAndContinue()}
          onResume={closing.resume}
        />

        <ClosingProgressBar
          progress={closing.progress}
          solutionDone={closing.solutions.length > 0}
          innovationDone={!!closing.innovation}
          controlDone={!!closing.control}
        />

        <p className="text-[10px] text-white/25 text-center py-2.5 leading-snug">
          Nos mantenemos Innovamos consistentemente
          <br />
          para ofrecerte un mejor servicio…
        </p>
      </main>

      {/* ── Diálogo: crear meta ── */}
      <Dialog open={goalDialog} onOpenChange={setGoalDialog}>
        <DialogContent className="bg-[#1c1c1c] border-white/10 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nueva meta</DialogTitle>
            <DialogDescription className="text-white/50">
              Define una meta empresarial. Deyconic la tendrá en cuenta en los
              próximos cierres.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <Label className="text-white/80">Título de la meta</Label>
              <Input
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                placeholder="Ej. Aumentar ventas diarias 20%"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/80">Descripción (opcional)</Label>
              <Textarea
                value={goalDesc}
                onChange={(e) => setGoalDesc(e.target.value)}
                placeholder="Detalles, indicadores a mover, plazo…"
                rows={3}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
              />
            </div>
            <Button
              onClick={createGoal}
              disabled={savingGoal || !goalTitle.trim()}
              className="w-full"
            >
              {savingGoal && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Crear meta
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Diálogo: ver cierre anterior ── */}
      <Dialog
        open={!!viewingClosing}
        onOpenChange={(open) => !open && setViewingClosing(null)}
      >
        <DialogContent className="bg-black border-white/10 text-white sm:max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              Cierre del{" "}
              {viewingClosing
                ? new Date(viewingClosing.createdAt).toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })
                : ""}
            </DialogTitle>
            {viewingClosing?.summary && (
              <DialogDescription className="text-white/50 line-clamp-3">
                {viewingClosing.summary}
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 py-2">
            {viewingMessages === null ? (
              <p className="text-sm text-white/40 text-center py-8">
                Cargando conversación…
              </p>
            ) : viewingMessages.length === 0 ? (
              <p className="text-sm text-white/40 text-center py-8">
                Este cierre no tiene conversación registrada.
              </p>
            ) : (
              viewingMessages.map((m) => <MessageBubble key={m.id} message={m} />)
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Diálogo: settings ── */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="bg-[#1c1c1c] border-white/10 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configuración de Deyconic Plus</DialogTitle>
            <DialogDescription className="text-white/50">
              Parámetros activos de tu gerente digital.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3">
              <Building2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold">{empresa.companyName}</p>
                <p className="text-xs text-white/50">
                  {empresa.sector} • {empresa.position}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3">
              <Clock4 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold">
                  Cierre diario: {empresa.closingTime || "Sin hora definida"}
                </p>
                <p className="text-xs text-white/50">
                  El cierre del día se genera automáticamente al entrar al dashboard.
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-white/5 px-4 py-3">
              <p className="text-xs font-semibold text-white/60 mb-1">Ritmo de transformación</p>
              <p className="text-sm">{empresa.transformationRhythm || "No definido"}</p>
              {!!empresa.deliverables?.length && (
                <>
                  <p className="text-xs font-semibold text-white/60 mt-3 mb-1">
                    Entregables por cierre
                  </p>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {empresa.deliverables.join(" • ")}
                  </p>
                </>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => {
                void signOut(plusAuth).then(() => router.push("/plus/login"));
              }}
              className="w-full border-white/15 text-white hover:bg-white/10 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" /> Cerrar sesión
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
