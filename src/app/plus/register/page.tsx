"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getPlusAuth, getPlusDb } from "@/lib/firebase-plus";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ChevronRight, ChevronLeft } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type FormData = {
  // Etapa 1
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
  country: string;
  position: string;
  authorityLevel: string[];
  authorityLevelOther: string;
  positionOther: string;
  // Etapa 2
  companyName: string;
  companyLegalName: string;
  sector: string;
  mainActivity: string;
  companyType: string;
  location: string;
  hasBranches: string;
  employeeCount: string;
  departments: string;
  operationDays: string[];
  operationHours: string;
  currency: string;
  closingTime: string;
  // Etapa 3
  companyDescription: string;
  mainProblems: string;
  longStandingProblems: string;
  recurringProblems: string;
  monthlyGoals: string;
  priorities: string[];
  prioritiesOther: string;
  kpis: string;
  // Etapa 4
  transformationRhythm: string;
  autonomySettings: string;
  restrictions: string;
  deliverables: string[];
  salaryStructure: string;
  financialInfo: string;
  // Privacidad
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  acceptDataProcessing: boolean;
  confirmAuthority: boolean;
};

const INITIAL: FormData = {
  name: "", email: "", phone: "", password: "", confirm: "", country: "", position: "", positionOther: "", authorityLevel: [], authorityLevelOther: "",
  companyName: "", companyLegalName: "", sector: "", mainActivity: "", companyType: "", location: "",
  hasBranches: "", employeeCount: "", departments: "", operationDays: [], operationHours: "", currency: "", closingTime: "",
  companyDescription: "", mainProblems: "", longStandingProblems: "", recurringProblems: "", monthlyGoals: "",
  priorities: [], prioritiesOther: "", kpis: "",
  transformationRhythm: "", autonomySettings: "", restrictions: "", deliverables: [], salaryStructure: "", financialInfo: "",
  acceptTerms: false, acceptPrivacy: false, acceptDataProcessing: false, confirmAuthority: false,
};

const STAGES = ["Crea tu cuenta", "Conoce tu empresa", "Estado actual", "Gerente digital"];

const POSITIONS = ["Propietario", "Socio", "Director", "Gerente", "Supervisor", "Encargado", "Otro"];
const AUTHORITY_LEVELS = ["Estratégicas", "Operativas", "Administrativas", "Limitadas", "Otra"];
const COMPANY_TYPES = ["Física", "Digital", "Física + Digital"];
const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const PRIORITIES = [
  "Aumentar ventas", "Reducir costos", "Reducir pérdidas", "Mejorar operaciones",
  "Mejorar productividad", "Mejorar servicio al cliente", "Mejorar organización",
  "Mejorar personal", "Innovar", "Expandirse", "Otra",
];
const DELIVERABLES = [
  "Resumen ejecutivo", "Problemas detectados", "Problemas pendientes", "Causas identificadas",
  "Acciones recomendadas", "Acciones para el siguiente día", "Oportunidades de innovación",
  "Riesgos detectados", "Indicadores relevantes", "Prioridades actuales",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toggleItem(arr: string[], item: string): string[] {
  return arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];
}

function FieldGroup({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
    </div>
  );
}

function CheckGroup({
  options, selected, onChange, otherValue, onOtherChange,
}: {
  options: string[];
  selected: string[];
  onChange: (v: string[]) => void;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}) {
  const showOther = selected.includes("Otra") || selected.includes("Otro");
  return (
    <div className="space-y-2 mt-1">
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm">
            <Checkbox
              checked={selected.includes(opt)}
              onCheckedChange={() => onChange(toggleItem(selected, opt))}
            />
            {opt}
          </label>
        ))}
      </div>
      {showOther && onOtherChange !== undefined && (
        <Input
          value={otherValue ?? ""}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="Favor de especificar..."
          className="mt-1"
          autoFocus
        />
      )}
    </div>
  );
}

function RadioGroup({
  options, value, onChange, otherValue, onOtherChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  otherValue?: string;
  onOtherChange?: (v: string) => void;
}) {
  return (
    <div className="space-y-2 mt-1">
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
              value === opt
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {(value === "Otro" || value === "Otra") && onOtherChange !== undefined && (
        <Input
          value={otherValue ?? ""}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="Favor de especificar..."
          autoFocus
        />
      )}
    </div>
  );
}

// ─── Stage Components ─────────────────────────────────────────────────────────

function Stage1({ data, set }: { data: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <FieldGroup label="Nombre completo" hint="Nombre y apellido.">
        <Input value={data.name} onChange={(e) => set("name", e.target.value)} placeholder="Tu nombre completo" required autoComplete="name" />
      </FieldGroup>
      <FieldGroup label="Correo electrónico" hint="Correo principal para acceder a Deyconic Plus.">
        <Input type="email" value={data.email} onChange={(e) => set("email", e.target.value)} placeholder="tu@correo.com" required autoComplete="email" />
      </FieldGroup>
      <FieldGroup label="Número de teléfono" hint="Número de contacto de la cuenta.">
        <Input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+503 0000-0000" autoComplete="tel" />
      </FieldGroup>
      <FieldGroup label="Contraseña" hint="Crear contraseña segura.">
        <Input type="password" value={data.password} onChange={(e) => set("password", e.target.value)} placeholder="Mínimo 6 caracteres" required autoComplete="new-password" />
      </FieldGroup>
      <FieldGroup label="Repetir contraseña">
        <Input type="password" value={data.confirm} onChange={(e) => set("confirm", e.target.value)} placeholder="Repite tu contraseña" required autoComplete="new-password" />
      </FieldGroup>
      <FieldGroup label="País">
        <Input value={data.country} onChange={(e) => set("country", e.target.value)} placeholder="Ej. El Salvador" />
      </FieldGroup>
      <FieldGroup label="Posición dentro de la empresa">
        <RadioGroup
          options={POSITIONS}
          value={data.position}
          onChange={(v) => set("position", v)}
          otherValue={data.positionOther}
          onOtherChange={(v) => set("positionOther", v)}
        />
      </FieldGroup>
      <FieldGroup label="Nivel de autoridad" hint="¿Qué nivel de decisiones puede tomar dentro de la empresa?">
        <CheckGroup
          options={AUTHORITY_LEVELS}
          selected={data.authorityLevel}
          onChange={(v) => set("authorityLevel", v)}
          otherValue={data.authorityLevelOther}
          onOtherChange={(v) => set("authorityLevelOther", v)}
        />
      </FieldGroup>
    </div>
  );
}

function Stage2({ data, set }: { data: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <FieldGroup label="Nombre de la empresa">
        <Input value={data.companyName} onChange={(e) => set("companyName", e.target.value)} placeholder="Nombre comercial" required />
      </FieldGroup>
      <FieldGroup label="Nombre legal de la empresa" hint="Opcional.">
        <Input value={data.companyLegalName} onChange={(e) => set("companyLegalName", e.target.value)} placeholder="Razón social" />
      </FieldGroup>
      <FieldGroup label="Sector empresarial">
        <Input value={data.sector} onChange={(e) => set("sector", e.target.value)} placeholder="Ej. Retail, Tecnología, Salud..." />
      </FieldGroup>
      <FieldGroup label="Actividad principal" hint="¿Qué hace principalmente la empresa?">
        <Textarea value={data.mainActivity} onChange={(e) => set("mainActivity", e.target.value)} placeholder="Describe la actividad principal..." rows={2} />
      </FieldGroup>
      <FieldGroup label="Tipo de empresa">
        <RadioGroup options={COMPANY_TYPES} value={data.companyType} onChange={(v) => set("companyType", v)} />
      </FieldGroup>
      <FieldGroup label="Ubicación principal" hint="País, ciudad y zona.">
        <Input value={data.location} onChange={(e) => set("location", e.target.value)} placeholder="Ej. El Salvador, San Salvador, Zona Rosa" />
      </FieldGroup>
      <FieldGroup label="¿La empresa tiene varias sucursales?">
        <RadioGroup options={["Sí", "No"]} value={data.hasBranches} onChange={(v) => set("hasBranches", v)} />
      </FieldGroup>
      <FieldGroup label="Número de empleados">
        <Input type="number" min="1" value={data.employeeCount} onChange={(e) => set("employeeCount", e.target.value)} placeholder="Ej. 25" />
      </FieldGroup>
      <FieldGroup label="Departamentos de la empresa" hint="Escriba todos los departamentos existentes. Ej: Ventas, Caja, Administración...">
        <Textarea value={data.departments} onChange={(e) => set("departments", e.target.value)} placeholder="Ventas, Caja, Administración, RRHH..." rows={2} />
      </FieldGroup>
      <FieldGroup label="Días de operación">
        <CheckGroup options={DAYS} selected={data.operationDays} onChange={(v) => set("operationDays", v)} />
      </FieldGroup>
      <FieldGroup label="Horario de operación">
        <Input value={data.operationHours} onChange={(e) => set("operationHours", e.target.value)} placeholder="Ej. 8:00 AM – 6:00 PM" />
      </FieldGroup>
      <FieldGroup label="Moneda principal de la empresa">
        <Input value={data.currency} onChange={(e) => set("currency", e.target.value)} placeholder="Ej. USD, EUR, MXN..." />
      </FieldGroup>
      <FieldGroup label="Hora del cierre diario" hint="¿A qué hora debe Deyconic Plus iniciar el cierre diario de la empresa?">
        <Input type="time" value={data.closingTime} onChange={(e) => set("closingTime", e.target.value)} />
      </FieldGroup>
    </div>
  );
}

function Stage3({ data, set }: { data: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <FieldGroup label="Describe brevemente tu empresa" hint="Explique qué hace, qué ofrece y cómo funciona actualmente.">
        <Textarea value={data.companyDescription} onChange={(e) => set("companyDescription", e.target.value)} placeholder="Descripción general de la empresa..." rows={3} />
      </FieldGroup>
      <FieldGroup label="¿Cuáles son los principales problemas que enfrenta actualmente?" hint="Describa todos los problemas que considere importantes.">
        <Textarea value={data.mainProblems} onChange={(e) => set("mainProblems", e.target.value)} placeholder="Problemas actuales..." rows={3} />
      </FieldGroup>
      <FieldGroup label="¿Qué problemas llevan más tiempo sin resolverse?">
        <Textarea value={data.longStandingProblems} onChange={(e) => set("longStandingProblems", e.target.value)} placeholder="Problemas crónicos..." rows={2} />
      </FieldGroup>
      <FieldGroup label="¿Qué problemas se repiten con frecuencia?">
        <Textarea value={data.recurringProblems} onChange={(e) => set("recurringProblems", e.target.value)} placeholder="Problemas recurrentes..." rows={2} />
      </FieldGroup>
      <FieldGroup label="¿Cuáles son las metas principales para este mes?">
        <Textarea value={data.monthlyGoals} onChange={(e) => set("monthlyGoals", e.target.value)} placeholder="Metas del mes..." rows={2} />
      </FieldGroup>
      <FieldGroup label="¿Cuáles son las prioridades actuales de la empresa?" hint="Seleccione las que correspondan.">
        <CheckGroup
          options={PRIORITIES}
          selected={data.priorities}
          onChange={(v) => set("priorities", v)}
          otherValue={data.prioritiesOther}
          onOtherChange={(v) => set("prioritiesOther", v)}
        />
      </FieldGroup>
      <FieldGroup label="Indicadores importantes de la empresa" hint="¿Qué números utiliza actualmente para saber si la empresa está funcionando correctamente? Ej: Ventas diarias, gastos, clientes...">
        <Textarea value={data.kpis} onChange={(e) => set("kpis", e.target.value)} placeholder="Ventas diarias, gastos mensuales, pedidos..." rows={2} />
      </FieldGroup>
    </div>
  );
}

function Stage4({ data, set }: { data: FormData; set: (k: keyof FormData, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <FieldGroup label="Ritmo de transformación empresarial" hint="¿Qué tan rápido deseas implementar cambios?">
        <div className="grid gap-3 mt-1">
          {[
            { value: "CONSERVADOR", desc: "Cambios graduales, priorizando estabilidad y control del riesgo." },
            { value: "EQUILIBRADO", desc: "Cambios progresivos buscando equilibrio entre estabilidad e impacto." },
            { value: "AGRESIVO", desc: "Cambios rápidos y de mayor impacto cuando las circunstancias lo justifiquen." },
          ].map(({ value, desc }) => (
            <button
              key={value}
              type="button"
              onClick={() => set("transformationRhythm", value)}
              className={`text-left p-3 rounded-lg border transition-colors ${
                data.transformationRhythm === value
                  ? "bg-primary/10 border-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <p className="font-semibold text-sm">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </button>
          ))}
        </div>
      </FieldGroup>
      <FieldGroup label="Autonomía de Deyconic" hint="¿Qué puede hacer Deyconic por iniciativa propia? Especifique qué puede proponer, consultar o requiere autorización.">
        <Textarea value={data.autonomySettings} onChange={(e) => set("autonomySettings", e.target.value)} placeholder="Puede analizar: Sí&#10;Puede proponer soluciones: Sí&#10;Puede modificar procesos: Requiere aprobación..." rows={4} />
      </FieldGroup>
      <FieldGroup label="Restricciones empresariales" hint="¿Qué debe evitar Deyconic Plus? Escriba las reglas o restricciones que el gerente debe respetar.">
        <Textarea value={data.restrictions} onChange={(e) => set("restrictions", e.target.value)} placeholder="Restricciones y reglas..." rows={3} />
      </FieldGroup>
      <FieldGroup label="Entregables obligatorios" hint="¿Qué debe entregar Deyconic en cada cierre?">
        <CheckGroup options={DELIVERABLES} selected={data.deliverables} onChange={(v) => set("deliverables", v)} />
      </FieldGroup>
      <FieldGroup label="Información salarial" hint="Opcional. Departamento → Puesto → Rango salarial → Cantidad de empleados. Ej: Caja → Cajero → US$400–US$500 → 4 empleados">
        <Textarea value={data.salaryStructure} onChange={(e) => set("salaryStructure", e.target.value)} placeholder="Estructura salarial por departamento..." rows={3} />
      </FieldGroup>
      <FieldGroup label="Información financiera inicial" hint="Opcional. Ventas promedio, gastos, costos operativos, presupuesto, etc. Puede completarse posteriormente.">
        <Textarea value={data.financialInfo} onChange={(e) => set("financialInfo", e.target.value)} placeholder="Ventas promedio, gastos, margen aproximado..." rows={3} />
      </FieldGroup>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RegisterPage() {
  const router = useRouter();
  const [stage, setStage] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: keyof FormData, v: unknown) => setData((prev) => ({ ...prev, [k]: v }));

  const validateStage = (): string => {
    if (stage === 0) {
      if (!data.name.trim()) return "El nombre es requerido.";
      if (!data.email.trim()) return "El correo es requerido.";
      if (!data.password) return "La contraseña es requerida.";
      if (data.password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
      if (data.password !== data.confirm) return "Las contraseñas no coinciden.";
    }
    if (stage === 1) {
      if (!data.companyName.trim()) return "El nombre de la empresa es requerido.";
    }
    if (stage === 4) {
      if (!data.acceptTerms) return "Debes aceptar los Términos y Condiciones.";
      if (!data.acceptPrivacy) return "Debes aceptar la Política de Privacidad.";
      if (!data.acceptDataProcessing) return "Debes autorizar el procesamiento de información.";
      if (!data.confirmAuthority) return "Debes confirmar que tienes autorización para administrar esta empresa.";
    }
    return "";
  };

  const handleNext = () => {
    const err = validateStage();
    if (err) { setError(err); return; }
    setError("");
    setStage((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setError("");
    setStage((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStage();
    if (err) { setError(err); return; }
    setLoading(true);
    setError("");
    try {
      const credential = await createUserWithEmailAndPassword(getPlusAuth(), data.email, data.password);
      await updateProfile(credential.user, { displayName: data.name });
      const { password: _p, confirm: _c, acceptTerms: _t, acceptPrivacy: _pr, acceptDataProcessing: _d, confirmAuthority: _a, ...safeData } = data;
      if (safeData.positionOther) safeData.position = safeData.positionOther;
      if (safeData.authorityLevelOther) safeData.authorityLevel = [...safeData.authorityLevel.filter((x) => x !== "Otra"), safeData.authorityLevelOther];
      if (safeData.prioritiesOther) safeData.priorities = [...safeData.priorities.filter((x) => x !== "Otra"), safeData.prioritiesOther];
      await setDoc(doc(getPlusDb(), "empresas", credential.user.uid), {
        ...safeData,
        uid: credential.user.uid,
        createdAt: new Date().toISOString(),
      });
      router.push("/plus/dashboard");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "auth/email-already-in-use") setError("Este correo ya está registrado.");
      else if (code === "auth/invalid-email") setError("El correo electrónico no es válido.");
      else setError("Ocurrió un error. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="w-full max-w-2xl mx-auto">

        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Deyconic <span className="text-primary">Plus</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">Registro empresarial</p>
        </div>

        {/* Stage indicator */}
        <div className="flex items-center justify-between mb-8 px-1">
          {STAGES.map((label, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i < stage ? "bg-primary text-primary-foreground" :
                i === stage ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                "bg-muted text-muted-foreground"
              }`}>
                {i < stage ? "✓" : i + 1}
              </div>
              <span className={`text-[10px] text-center hidden sm:block ${i === stage ? "text-primary font-medium" : "text-muted-foreground"}`}>
                {label}
              </span>
              {i < STAGES.length - 1 && (
                <div className={`absolute hidden`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl">

          {/* Stage header */}
          <div className="mb-6 pb-4 border-b border-border">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest">
              Etapa {stage + 1} de {stage < 4 ? STAGES.length : STAGES.length}
            </p>
            <h2 className="text-xl font-bold mt-1">
              {stage === 0 && "Crea tu cuenta"}
              {stage === 1 && "Conoce tu empresa"}
              {stage === 2 && "Estado actual"}
              {stage === 3 && "Configura tu gerente digital"}
              {stage === 4 && "Privacidad y uso"}
            </h2>
          </div>

          <form onSubmit={stage === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>

            {stage === 0 && <Stage1 data={data} set={set} />}
            {stage === 1 && <Stage2 data={data} set={set} />}
            {stage === 2 && <Stage3 data={data} set={set} />}
            {stage === 3 && <Stage4 data={data} set={set} />}

            {/* Privacy stage */}
            {stage === 4 && (
              <div className="space-y-4">
                {[
                  { key: "acceptTerms" as const, label: "Acepto los Términos y Condiciones." },
                  { key: "acceptPrivacy" as const, label: "Acepto la Política de Privacidad." },
                  { key: "acceptDataProcessing" as const, label: "Autorizo el procesamiento de la información empresarial proporcionada para utilizar las funciones de Deyconic Plus." },
                  { key: "confirmAuthority" as const, label: "Confirmo que tengo autorización para proporcionar y administrar la información de esta empresa." },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={data[key] as boolean}
                      onCheckedChange={(v) => set(key, !!v)}
                      className="mt-0.5"
                    />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="text-sm text-destructive mt-4 text-center">{error}</p>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {stage > 0 && (
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                  <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
                </Button>
              )}
              {stage < 4 ? (
                <Button type="submit" className="flex-1">
                  Siguiente <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando cuenta...</>
                  ) : (
                    "Crear cuenta empresarial"
                  )}
                </Button>
              )}
            </div>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/plus/login" className="text-primary font-medium hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <p className="text-center mt-6">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
