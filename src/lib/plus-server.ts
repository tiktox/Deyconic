// SERVER-ONLY: verificación de identidad y lectura de Firestore vía REST API.
// Nunca importar desde componentes de cliente.

import type { EmpresaData } from "@/lib/plus-types";

const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY!;
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;

/**
 * Verifica un Firebase ID Token con la REST API de Identity Toolkit.
 * Devuelve el uid si el token es válido; null en caso contrario.
 */
export async function verifyPlusIdToken(idToken: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${PUBLIC_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { users?: { localId: string }[] };
    return data.users?.[0]?.localId ?? null;
  } catch {
    return null;
  }
}

type FirestoreField =
  | { stringValue: string }
  | { integerValue: string }
  | { doubleValue: number }
  | { booleanValue: boolean }
  | { nullValue: null }
  | { timestampValue: string }
  | { arrayValue: { values?: FirestoreField[] } }
  | { mapValue: { fields?: Record<string, FirestoreField> } };

function decodeField(field: FirestoreField): unknown {
  if ("stringValue" in field) return field.stringValue;
  if ("integerValue" in field) return Number(field.integerValue);
  if ("doubleValue" in field) return field.doubleValue;
  if ("booleanValue" in field) return field.booleanValue;
  if ("nullValue" in field) return null;
  if ("timestampValue" in field) return field.timestampValue;
  if ("arrayValue" in field) return (field.arrayValue.values ?? []).map(decodeField);
  if ("mapValue" in field) return decodeDoc(field.mapValue.fields ?? {});
  return null;
}

function decodeDoc(fields: Record<string, FirestoreField>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(fields)) out[k] = decodeField(v);
  return out;
}

/**
 * Lee empresas/{uid} desde Firestore usando la REST API con el idToken
 * del propio usuario (respeta las reglas de seguridad existentes).
 */
export async function loadEmpresa(
  uid: string,
  idToken?: string
): Promise<EmpresaData | null> {
  try {
    const headers: Record<string, string> = {};
    if (idToken) headers.Authorization = `Bearer ${idToken}`;
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/empresas/${uid}`,
      { headers, cache: "no-store" }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { fields?: Record<string, FirestoreField> };
    if (!data.fields) return null;
    return decodeDoc(data.fields) as unknown as EmpresaData;
  } catch {
    return null;
  }
}
