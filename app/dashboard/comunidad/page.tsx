"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreateAyudaForm } from "@/components/ayuda/create-ayuda-form"
import { useAuth } from "@/lib/auth-context"
import {
  Users,
  Plus,
  ThumbsUp,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  CheckCircle2,
  PawPrint,
  Gift,
  Key,
  AlertTriangle,
  MessageSquare,
  Bookmark,
} from "lucide-react"
import { getAyudaCommunityInsights } from "@/lib/activity-insights"
import { ActivityChips } from "@/components/activity/activity-chips"
import { ayudaPosts } from "@/app/dashboard/ayuda/page"
import Link from "next/link"

// ── Consultas data (from questions module) ────────────────────────────────────
const consultas = [
  {
    id: "q1",
    user: "Ana Martinez",
    initials: "AM",
    time: "hace 2 hs",
    category: "Electricidad",
    question: "¿Alguien puede recomendar un buen electricista para iluminación de piscina? Queremos agregar LEDs subacuáticos.",
    answers: [
      { user: "Carlos R.", initials: "CR", time: "hace 1 hr", content: "Roberto Mendez es excelente! Hizo la iluminación de nuestra piscina el mes pasado. Muy profesional y precios justos.", likes: 8 },
      { user: "Sofía L.", initials: "SL", time: "hace 45 min", content: "Apoyo lo de Roberto. También instaló nuestro sistema de hogar inteligente. Muy recomendado.", likes: 5 },
    ],
    likes: 12,
  },
  {
    id: "q2",
    user: "Diego Perez",
    initials: "DP",
    time: "hace 5 hs",
    category: "General",
    question: "¿Alguien sabe si el portón principal va a estar cerrado por mantenimiento este fin de semana?",
    answers: [
      { user: "Laura T.", initials: "LT", time: "hace 4 hs", content: "Sí, la administración mandó un email. El portón sur va a estar cerrado el sábado de 8 AM a 2 PM.", likes: 15 },
    ],
    likes: 7,
  },
  {
    id: "q3",
    user: "Patricia Diaz",
    initials: "PD",
    time: "hace 1 día",
    category: "Plomería",
    question: "¿Alguien tiene el contacto de un plomero de confianza? Tenemos una pérdida en el baño principal.",
    answers: [
      { user: "Miguel S.", initials: "MS", time: "hace 23 hs", content: "Llamen a Javier García, muy bueno y de la zona. Está en el directorio de servicios de VEZI.", likes: 11 },
    ],
    likes: 9,
  },
]

// ── Type config ───────────────────────────────────────────────────────────────
type FilterType = "todos" | "avisos" | "consultas"

const ayudaCategoryConfig = {
  mascotas:  { label: "Mascotas",  icon: PawPrint,     color: "bg-amber-500/10 text-amber-600" },
  donaciones: { label: "Donaciones", icon: Gift,         color: "bg-pink-500/10 text-pink-600" },
  objetos:   { label: "Objetos",   icon: Key,          color: "bg-blue-500/10 text-blue-600" },
  personal:  { label: "Personal",  icon: Users,        color: "bg-violet-500/10 text-violet-600" },
  urgente:   { label: "Urgente",   icon: AlertTriangle, color: "bg-destructive/10 text-destructive" },
} as const

// ── Components ────────────────────────────────────────────────────────────────
function AvisoCard({ post }: { post: (typeof ayudaPosts)[0] }) {
  const { saveItem, isSaved } = useAuth()
  const cat = ayudaCategoryConfig[post.category]
  const CatIcon = cat.icon
  const saved = isSaved(post.title, "ayuda", post.id)
  const whatsappUrl = `https://wa.me/${post.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola ${post.authorName}, te escribo por el aviso "${post.title}" en VEZI.`)}`
  const insights = getAyudaCommunityInsights(post.id, post.status, post.category)

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-rose-300 hover:shadow-sm">
      <Link href={`/dashboard/ayuda/${post.id}`} className="block">
        {post.images.length > 0 ? (
          <div className="relative h-36 overflow-hidden bg-muted/50">
            <img src={post.images[0]} alt={post.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
            {post.status === "resuelto" && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                <Badge className="gap-1 bg-success text-success-foreground"><CheckCircle2 className="h-3 w-3" />Resuelto</Badge>
              </div>
            )}
          </div>
        ) : (
          <div className="relative flex h-36 items-center justify-center bg-rose-50">
            <CatIcon className="h-10 w-10 text-rose-200" />
            {post.status === "resuelto" && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                <Badge className="gap-1 bg-success text-success-foreground"><CheckCircle2 className="h-3 w-3" />Resuelto</Badge>
              </div>
            )}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/dashboard/ayuda/${post.id}`}>
          <h3 className="line-clamp-2 font-semibold leading-snug text-foreground transition-colors hover:text-rose-700">{post.title}</h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{post.description}</p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          <Badge variant="secondary" className={`px-1.5 py-0 text-[10px] ${cat.color}`}>
            <CatIcon className="mr-1 h-2.5 w-2.5" />{cat.label}
          </Badge>
          <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
            <MapPin className="mr-1 h-2.5 w-2.5" />{post.zone}
          </Badge>
        </div>

        <ActivityChips insights={insights} limit={2} className="mt-2" />

        <div className="mt-3 flex gap-2 border-t border-border pt-3">
          <Button asChild variant="outline" size="sm" className="flex-1 gap-1.5 border-rose-200 text-rose-700 hover:bg-rose-50">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="h-3.5 w-3.5" />WhatsApp
            </a>
          </Button>
          <Button
            variant="ghost" size="sm"
            className={saved ? "text-rose-700" : "text-muted-foreground"}
            onClick={() => {
              if (!saved) saveItem({ type: "ayuda", targetId: post.id, title: post.title, subtitle: `${cat.label} · ${post.authorName}`, href: `/dashboard/ayuda/${post.id}`, activity: "3 vecinos también lo siguen" })
            }}
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
          </Button>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="bg-rose-100 text-[8px] text-rose-700">{post.authorInitials}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{post.authorName}</span>
          </div>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock className="h-3 w-3" />{post.postedAt}
          </span>
        </div>
      </div>
    </div>
  )
}

function ConsultaCard({ q }: { q: (typeof consultas)[0] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-violet-300">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="bg-violet-100 text-[11px] text-violet-700">{q.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">{q.user}</span>
              <span className="text-xs text-muted-foreground">{q.time}</span>
              <Badge className="bg-violet-100 text-[10px] text-violet-700 hover:bg-violet-100">{q.category}</Badge>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed">{q.question}</p>
            <div className="mt-3 flex items-center gap-4">
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-violet-700">
                <ThumbsUp className="h-3.5 w-3.5" />{q.likes}
              </button>
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-violet-700"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {q.answers.length} {q.answers.length === 1 ? "respuesta" : "respuestas"}
                {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-violet-200 bg-violet-50/50">
          {q.answers.map((a, i) => (
            <div key={i} className="border-b border-violet-100 px-5 py-4 last:border-b-0">
              <div className="flex items-start gap-3 pl-4">
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="bg-violet-100 text-[10px] text-violet-700">{a.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{a.user}</span>
                    <span className="text-xs text-muted-foreground">{a.time}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.content}</p>
                  <button className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground hover:text-violet-700">
                    <ThumbsUp className="h-3 w-3" />{a.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="px-5 py-3">
            <Button variant="ghost" size="sm" className="w-full text-xs text-violet-700 hover:bg-violet-100">
              Escribir una respuesta...
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ComunidadPage() {
  const { auth } = useAuth()
  const [filter, setFilter] = useState<FilterType>("todos")
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filters: { key: FilterType; label: string }[] = [
    { key: "todos", label: "Todo" },
    { key: "avisos", label: "Avisos" },
    { key: "consultas", label: "Consultas" },
  ]

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
            <Users className="h-3.5 w-3.5" />
            Comunidad de tu zona
          </div>
          <h1 className="text-2xl font-bold">Comunidad</h1>
          <p className="text-sm text-muted-foreground">
            Avisos vecinales, consultas, recomendaciones y lo que pasa en tu zona.
          </p>
        </div>

        <Button
          size="sm"
          className="gap-1.5 bg-violet-600 text-white hover:bg-violet-700"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="h-4 w-4" />
          Publicar
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              filter === f.key
                ? "bg-violet-600 text-white"
                : "bg-muted text-muted-foreground hover:bg-violet-100 hover:text-violet-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Contenido */}
      {(filter === "todos" || filter === "avisos") && (
        <section>
          {filter === "todos" && (
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              Avisos recientes
            </h2>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ayudaPosts.slice(0, filter === "todos" ? 3 : ayudaPosts.length).map((post) => (
              <AvisoCard key={post.id} post={post} />
            ))}
          </div>
          {filter === "todos" && (
            <button
              onClick={() => setFilter("avisos")}
              className="mt-3 text-xs font-medium text-violet-600 hover:underline"
            >
              Ver todos los avisos →
            </button>
          )}
        </section>
      )}

      {(filter === "todos" || filter === "consultas") && (
        <section>
          {filter === "todos" && (
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              Consultas de vecinos
            </h2>
          )}
          <div className="flex flex-col gap-3">
            {consultas.map((q) => (
              <ConsultaCard key={q.id} q={q} />
            ))}
          </div>
        </section>
      )}

      <CreateAyudaForm open={showCreateForm} onOpenChange={setShowCreateForm} />
    </div>
  )
}
