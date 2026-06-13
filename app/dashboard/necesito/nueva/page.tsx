"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, HandHelping, Send } from "lucide-react"
import type { NecesidadCategory, NecesidadUrgencia } from "@/lib/types/necesito"

const categories: { key: NecesidadCategory; label: string; emoji: string }[] = [
  { key: "plomeria",     label: "Plomería",     emoji: "🔧" },
  { key: "electricidad", label: "Electricidad",  emoji: "⚡" },
  { key: "jardineria",   label: "Jardinería",    emoji: "🌿" },
  { key: "pintura",      label: "Pintura",       emoji: "🖌️" },
  { key: "limpieza",     label: "Limpieza",      emoji: "🧹" },
  { key: "mudanza",      label: "Mudanza",       emoji: "📦" },
  { key: "educacion",    label: "Educación",     emoji: "📚" },
  { key: "tecnologia",   label: "Tecnología",    emoji: "💻" },
  { key: "cuidado",      label: "Cuidado",       emoji: "🤍" },
  { key: "catering",     label: "Gastronomía",   emoji: "🍽️" },
  { key: "diseno",       label: "Diseño",        emoji: "✏️" },
  { key: "otro",         label: "Otro",          emoji: "📋" },
]

const urgencies: { key: NecesidadUrgencia; label: string; description: string }[] = [
  { key: "inmediata",   label: "Urgente",      description: "Lo necesito hoy o mañana" },
  { key: "esta_semana", label: "Esta semana",  description: "Puede esperar unos días" },
  { key: "flexible",    label: "Flexible",     description: "Sin apuro particular" },
]

export default function NuevaNeceesidadPage() {
  const [category, setCategory] = useState<NecesidadCategory | "">("")
  const [urgency, setUrgency] = useState<NecesidadUrgencia | "">("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const isValid = category !== "" && urgency !== "" && title.trim().length > 5 && description.trim().length > 10

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
          <HandHelping className="h-8 w-8 text-amber-600" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">¡Necesidad publicada!</h1>
          <p className="text-sm text-muted-foreground">
            Los prestadores de tu zona van a recibir tu aviso y te responderán pronto.
          </p>
        </div>
        <Button asChild className="bg-amber-600 text-white hover:bg-amber-700">
          <Link href="/dashboard/necesito">Ver todas las necesidades</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex max-w-lg flex-col gap-6">
      {/* Header */}
      <div className="space-y-1">
        <Link
          href="/dashboard/necesito"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver
        </Link>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
          <HandHelping className="h-3.5 w-3.5" />
          Nueva necesidad
        </div>
        <h1 className="text-2xl font-bold">Publicar necesidad</h1>
        <p className="text-sm text-muted-foreground">
          Describí lo que necesitás y los prestadores de la zona te responden.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Categoría */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Categoría *</label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setCategory(cat.key)}
                className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center text-xs font-medium transition-all ${
                  category === cat.key
                    ? "border-amber-400 bg-amber-50 text-amber-700"
                    : "border-border bg-card text-muted-foreground hover:border-amber-200 hover:bg-amber-50/50"
                }`}
              >
                <span className="text-lg">{cat.emoji}</span>
                <span className="leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Urgencia */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Urgencia *</label>
          <div className="flex flex-col gap-2">
            {urgencies.map((u) => (
              <button
                key={u.key}
                type="button"
                onClick={() => setUrgency(u.key)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                  urgency === u.key
                    ? "border-amber-400 bg-amber-50"
                    : "border-border bg-card hover:border-amber-200"
                }`}
              >
                <div className="flex-1">
                  <p className={`text-sm font-medium ${urgency === u.key ? "text-amber-700" : "text-foreground"}`}>
                    {u.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{u.description}</p>
                </div>
                <div className={`h-4 w-4 rounded-full border-2 transition-colors ${
                  urgency === u.key ? "border-amber-500 bg-amber-500" : "border-muted-foreground/30"
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Título */}
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-foreground">
            Título *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Busco plomero para pérdida en baño"
            maxLength={80}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
          <p className="text-right text-[11px] text-muted-foreground">{title.length}/80</p>
        </div>

        {/* Descripción */}
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-foreground">
            Descripción *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Contá más detalles: qué necesitás, cuándo, dónde, cualquier info relevante..."
            rows={4}
            maxLength={400}
            className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
          <p className="text-right text-[11px] text-muted-foreground">{description.length}/400</p>
        </div>

        {/* Presupuesto (opcional) */}
        <div className="space-y-2">
          <label htmlFor="budget" className="text-sm font-medium text-foreground">
            Presupuesto estimado <span className="text-muted-foreground font-normal">(opcional)</span>
          </label>
          <input
            id="budget"
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Ej: $15.000 - $30.000"
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>

        <Button
          type="submit"
          disabled={!isValid}
          className="mt-2 gap-2 bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          Publicar necesidad
        </Button>
      </form>
    </div>
  )
}
