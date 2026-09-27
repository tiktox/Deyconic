"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { plusAuth, plusDb } from "@/lib/firebase-plus";
import type { EmpresaData } from "@/lib/plus-types";

export type { EmpresaData } from "@/lib/plus-types";

export function usePlusContext() {
  const [empresa, setEmpresa] = useState<EmpresaData | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(plusAuth, async (user) => {
      if (!user) {
        setUid(null);
        setEmpresa(null);
        setLoading(false);
        return;
      }
      setUid(user.uid);
      try {
        const snap = await getDoc(doc(plusDb, "empresas", user.uid));
        if (snap.exists()) setEmpresa(snap.data() as EmpresaData);
      } finally {
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  return { empresa, uid, loading };
}
