"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HandHelping, Plus, MapPin, Clock, ChevronRight, MessageSquare, Zap } from "lucide-react"

type NecesidadCategory =
  | "plomeria" | "electricidad" | "jardineria" | "pintura"
  | "limpieza" | "mudanza" | "educacion" | "tecnologia"
  | "cuidado" | "catering" | "diseno" | "otro"

type NecesidadUrgencia = "inmediata" | "esta_semana" | "flexible"

interface Necesidad {
  id: string
  userId: string
  userName: string
  userInitials: string
  title: string
  description: string
  category: NecesidadCategory
  urgency: NecesidadUrgencia
  zone: string
  respuestas: number
  postedAt: string
  budget?: string
}

const categoryConfig: Record<NecesidadCategory, { label: string; color: string; emoji: string }> = {
  plomeria:     { label: "Plomería",      color: "bg-blue-500/10 text-blue-700",    emoji: "🔧" },
  electricidad: { label: "Electricidad",  color: "bg-yellow-500/10 text-yellow-700", emoji: "⚡" },
  jardineria:   { label: "Jardinería",    color: "bg-green-500/10 text-green-700",   emoji: "🌿" },
  pintura:      { label: "Pintura",       color: "bg-orange-500/10 text-orange-700", emoji: "🖌️" },
  limpieza:     { label: "Limpieza",      color: "bg-cyan-500/10 text-cyan-700",     emoji: "🧹" },
  mudanza:      { label: "Mudanza",       color: "bg-slate-500/10 text-slate-700",   emoji: "📦" },
  educacion:    { label: "Educación",     color: "bg-violet-500/10 text-violet-700", emoji: "📚" },
  tecnologia:   { label: "Tecnología",    color: "bg-indigo-500/10 text-indigo-700", emoji: "💻" },
  cuidado:      { label: "Cuidado",       color: "bg-rose-500/10 text-rose-700",     emoji: "🤍" },
  catering:     { label: "Gastronomía",   color: "bg-amber-500/10 text-amber-700",   emoji: "🍽️" },
  diseno:       { label: "Diseño",        color: "bg-pink-500/10 text-pink-700",     emoji: "✏️" },
  otro:         { label: "Otro",          color: "bg-gray-500/10 text-gray-700",     emoji: "📋" },
}

const urgencyConfig: Record<NecesidadUrgencia, { label: string; color: string }> = {
  inmediata:    { label: "Urgente",       color: "bg-red-100 text-red-700" },
  esta_semana:  { label: "Esta semana",   color: "bg-amber-100 text-amber-700" },
  flexible:     { label: "Flexible",      color: "bg-slate-100 text-slate-600" },
}

const necesidades: Necesidad[] = [
  {
    id: "1",
    userId: "u1",
    userName: "María G.",
    userInitials: "MG",
    title: "Necesito profesora particular de matemáticas para secundaria",
    description: "Mi hijo está en 4to año y necesita apoyo en álgebra y geometría. Preferentemente que pueda venir a casa en Hudson dos veces por semana.",
    category: "educacion",
    urgency: "esta_semana",
    zone: "Hudson",
    respuestas: 3,
    postedAt: "hace 2 horas",
  },
  {
    id: "2",
    userId: "u2",
    userName: "Roberto F.",
    userInitials: "RF",
    title: "Busco plomero para pérdida en baño principal",
    description: "Tengo una pérdida debajo de la bañera. Necesito que venga a revisar esta semana. Ya intenté con cinta pero sigue.",
    category: "plomeria",
    urgency: "inmediata",
    zone: "Berazategui",
    respuestas: 5,
    postedAt: "hace 4 horas",
    budget: "$15.000 - $30.000",
  },
  {
    id: "3",
    userId: "u3",
    userName: "Ana M.",
    userInitials: "AM",
    title: "Necesito diseñador para logo de emprendimiento",
    description: "Arranco un emprendimiento de cerámica artesanal y necesito identidad visual: logo, paleta y tipografías. Tengo referencias de estilo.",
    category: "diseno",
    urgency: "flexible",
    zone: "Hudson",
    respuestas: 2,
    postedAt: "hace 6 horas",
    budget: "$20.000 - $50.000",
  },
  {
    id: "4",
    userId: "u4",
    userName: "Carlos R.",
    userInitials: "CR",
    title: "Busco electricista para instalación de toma trifásico",
    description: "Tengo un torno y necesito instalar una toma trifásica en el garage. El tablero ya tiene espacio.",
    category: "electricidad",
    urgency: "esta_semana",
    zone: "Hudson",
    respuestas: 4,
    postedAt: "hace 1 día",
    budget: "$25.000",
  },
  {
    id: "5",
    userId: "u5",
    userName: "Sofía L.",
    userInitials: "SL",
    title: "Necesito cuidadora para personas mayores, medio tiempo",
    description: "Mi mamá necesita acompañamiento de lunes a viernes de 9 a 14hs. Que sea de la zona y tenga referencias.",
    category: "cuidado",
    urgency: "inmediata",
    zone: "Hudson",
    respuestas: 6,
    postedAt: "hace 2 días",
  },
  {
    id: "6",
    userId: "u6",
    userName: "Diego P.",
    userInitials: "DP",
    title: "Busco jardinero para mantenimiento mensual de 300m2",
    description: "Jardín con césped, plantas y árboles frutales. Necesito alguien que venga una vez al mes con herramientas propias.",
    category: "jardineria",
    urgency: "flexible",
    zone: "Berazategui",
    respuestas: 1,
    postedAt: "hace 3 días",
    budget: "$30.000/vez",
  },
]

const categoryFilters: { key: NecesidadCategory | "todas"; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "educacion", label: "Educación" },
  { key: "plomeria", label: "Plomería" },
  { key: "electricidad", label: "Electricidad" },
  { key: "jardineria", label: "Jardinería" },
  { key: "cuidado", label: "Cuidado" },
  { key: "diseno", label: "Diseño" },
  { key: "otro", label: "Otro" },
]

export default function NecesitoPage() {
  const [activeCategory, setActiveCategory] = useState<NecesidadCategory | "todas">("todas")

  const filtered = necesidades.filter(
    (n) => activeCategory === "todas" || n.category === activeCategory,
  )

  return (
    <div className="flex max-w-full flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
            <HandHelping className="h-3.5 w-3.5" />
            Necesidades de tu zona
          </div>
          <h1 className="text-2xl font-bold">Necesito</h1>
          <p className="text-sm text-muted-foreground">
            Publicá lo que necesitás. Los prestadores de tu zona te responden.
          </p>
        </div>
        <Button asChild size="sm" className="gap-1.5 bg-amber-600 text-white hover:bg-amber-700">
          <Link href="/dashboard/necesito/nueva">
            <Plus className="h-4 w-4" />
            Publicar necesidad
          </Link>
        </Button>
      </div>

      {/* Cómo funciona */}
      <div className="grid grid-cols-3 gap-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
        {[
          { step: "1", text: "Publicás tu necesidad con categoría y descripción" },
          { step: "2", text: "Los prestadores de la zona la reciben y responden" },
          { step: "3", text: "Elegís y coordinás directo por WhatsApp" },
        ].map((item) => (
          <div key={item.step} className="flex flex-col items-center gap-1.5 text-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
              {item.step}
            </div>
            <p className="text-[11px] leading-snug text-amber-800">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {categoryFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveCategory(f.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === f.key
                ? "bg-amber-600 text-white"
                : "bg-muted text-muted-foreground hover:bg-amber-100 hover:text-amber-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((need) => {
          const cat = categoryConfig[need.category]
          const urg = urgencyConfig[need.urgency]

          return (
            <div
              key={need.id}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-amber-300 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-amber-100 text-[11px] text-amber-700">
                      {need.userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Link href={`/dashboard/necesito/${need.id}`} className="text-sm font-semibold leading-snug text-foreground hover:text-amber-700 hover:underline">{need.title}</Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {need.userName} · <MapPin className="mr-0.5 inline-block h-3 w-3" />{need.zone}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
              </div>

              <p className="line-clamp-2 text-sm text-muted-foreground">{need.description}</p>

              <div className="flex flex-wrap items-center gap-2">
                <Badge className={`px-1.5 py-0 text-[10px] ${cat.color}`}>
                  {cat.emoji} {cat.label}
                </Badge>
                <Badge className={`px-1.5 py-0 text-[10px] ${urg.color}`}>
                  {urg.label}
                </Badge>
                {need.budget && (
                  <span className="text-[11px] font-medium text-emerald-700">{need.budget}</span>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5 text-amber-500" />
                    <span className="font-medium text-amber-700">{need.respuestas}</span> respuestas
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {need.postedAt}
                  </span>
                </div>
                <Button asChild size="sm" variant="outline" className="h-7 gap-1 border-amber-200 px-3 text-xs text-amber-700 hover:bg-amber-50">
                  <Link href={`/dashboard/necesito/${need.id}`}><Zap className="h-3 w-3" /> Responder</Link>
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
