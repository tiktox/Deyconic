// Server-only — never import from client components
const NVIDIA_BASE = "https://integrate.api.nvidia.com/v1";
// meta/llama-3.1-70b-instruct fue retirado (EOL 2026-08-26).
// De los modelos habilitados en esta cuenta, Nemotron 3 Super 120B es el más
// capaz para razonamiento empresarial. Su chain-of-thought viaja en
// `reasoning_content` (campo aparte) → no contamina el stream visible.
const MODEL = "nvidia/nemotron-3-super-120b-a12b";

export type NvidiaMessage = { role: "system" | "user" | "assistant"; content: string };

export async function nvidiaChat(
  messages: NvidiaMessage[],
  stream = true
): Promise<Response> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) throw new Error("NVIDIA_API_KEY not set");

  return fetch(`${NVIDIA_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature: 0.6,
      // Nemotron 3 consume tokens en su razonamiento interno + la respuesta
      max_tokens: 2048,
      stream,
      // Razonamiento desactivado: reduce latencia ~10x (15s → ~1.5s) y ahorra
      // tokens; para este flujo conversacional estructurado no se necesita.
      chat_template_kwargs: { enable_thinking: false },
    }),
  });
}
