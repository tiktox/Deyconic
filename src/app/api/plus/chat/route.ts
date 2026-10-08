import { NextRequest } from "next/server";
import { nvidiaChat, type NvidiaMessage } from "@/lib/nvidia-ai";
import { buildSystemPrompt } from "@/lib/plus-types";
import { verifyPlusIdToken, loadEmpresa } from "@/lib/plus-server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const idToken = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (!idToken) {
      return new Response("Unauthorized", { status: 401 });
    }

    // 1) Verificar identidad del usuario (token de Firebase validado en servidor)
    const uid = await verifyPlusIdToken(idToken);
    if (!uid) {
      return new Response("Unauthorized", { status: 401 });
    }

    // 2) Leer empresa desde Firestore — el cliente nunca envía el contexto
    const empresa = await loadEmpresa(uid, idToken);
    if (!empresa) {
      return new Response("Empresa no registrada", { status: 403 });
    }

    // 3) Sanitizar mensajes entrantes (solo role + content, sin system)
    const body = (await req.json()) as { messages?: unknown };
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const sanitized: NvidiaMessage[] = messages
      .filter(
        (m): m is { role: string; content: string } =>
          !!m &&
          typeof (m as { role?: unknown }).role === "string" &&
          ["user", "assistant"].includes((m as { role: string }).role) &&
          typeof (m as { content?: unknown }).content === "string"
      )
      .map((m) => ({ role: m.role as "user" | "assistant", content: m.content.slice(0, 8000) }))
      .slice(-40); // máximo 40 mensajes de historial

    const systemPrompt = buildSystemPrompt(empresa);
    const fullMessages: NvidiaMessage[] = [
      { role: "system", content: systemPrompt },
      ...sanitized,
    ];

    const nvidiaRes = await nvidiaChat(fullMessages, true);

    if (!nvidiaRes.ok || !nvidiaRes.body) {
      const err = await nvidiaRes.text().catch(() => "unknown");
      console.error("[plus/chat] NVIDIA error:", err);
      return new Response("Error del servidor de IA", { status: 502 });
    }

    return new Response(nvidiaRes.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    console.error("[plus/chat]", e);
    return new Response("Internal error", { status: 500 });
  }
}
