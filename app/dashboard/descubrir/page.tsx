"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { commerces } from "@/lib/commerces-data"
import { professionals } from "@/components/services/services-list"
import { ActivityChips } from "@/components/activity/activity-chips"
import { getProfessionalCardInsights, getCommerceProfileInsights } from "@/lib/activity-insights"
import {
  Compass,
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Clock,
  Store,
  Zap,
  MessageCircle,
} from "lucide-react"

type DiscoverFilter = "todo" | "comercios" | "emprendedores" | "servicios"

const filters: { key: DiscoverFilter; label: string }[] = [
  { key: "todo", label: "Todo" },
  { key: "comercios", label: "Comercios" },
  { key: "emprendedores", label: "Emprendedores" },
  { key: "servicios", label: "Servicios" },
]

// ── Commerce Card ─────────────────────────────────────────────────────────────
function CommerceCard({ item }: { item: (typeof commerces)[0] }) {
  const insights = getCommerceProfileInsights(item.id)
  const whatsappUrl = `https://wa.me/${item.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hola! Te escribo desde VEZI.`)}`

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-violet-300 hover:shadow-sm">
      <Link href={`/dashboard/comercios/${item.id}`}>
        <div className="relative flex h-28 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-50 to-violet-100">
          {item.bannerUrl ? (
            <img src={item.bannerUrl} alt={item.name} className="h-full w-full object-cover opacity-80 transition-transform group-hover:scale-105" loading="lazy" />
          ) : null}
          <div className="absolute bottom-2 left-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-[11px] font-bold text-violet-700 shadow-sm">
            {item.logo}
          </div>
          {item.type === "entrepreneur" && (
            <div className="absolute right-2 top-2">
              <Badge className="bg-amber-500/90 text-[10px] text-white">Emprendedor</Badge>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/dashboard/comercios/${item.id}`}>
              <h3 className="font-semibold leading-snug transition-colors hover:text-violet-700">{item.name}</h3>
            </Link>
            <p className="text-xs text-muted-foreground">{item.category}</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-amber-600">
            <Star className="h-3 w-3 fill-current" />
            {item.rating}
          </div>
        </div>

        <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>

        {item.hours && (
          <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            {item.hours}
          </div>
        )}

        <ActivityChips insights={insights} limit={2} className="mt-2" />

        <div className="mt-3 flex gap-2 border-t border-border pt-3">
          <Button asChild variant="outline" size="sm" className="flex-1 gap-1.5 border-violet-200 text-violet-700 hover:bg-violet-50">
            <Link href={`/dashboard/comercios/${item.id}`}>
              <Store className="h-3.5 w-3.5" />Ver perfil
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-violet-700">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Service Card ──────────────────────────────────────────────────────────────
function ServiceCard({ pro }: { pro: (typeof professionals)[0] }) {
  const insights = getProfessionalCardInsights(pro.id, pro.category)
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Hola ${pro.name}, te escribo desde VEZI por tu servicio de ${pro.category}.`)}`

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-sky-300 hover:shadow-sm">
      <div className="flex items-start gap-4 p-4">
        <Avatar className="h-12 w-12 shrink-0">
          {pro.avatarUrl ? (
            <img src={pro.avatarUrl} alt={pro.name} className="h-full w-full rounded-full object-cover" loading="lazy" />
          ) : (
            <AvatarFallback className="bg-sky-100 text-sky-700">{pro.initials}</AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href={`/dashboard/services/${pro.id}`}>
              <span className="font-semibold transition-colors hover:text-sky-700">{pro.name}</span>
            </Link>
            {pro.verified && <ShieldCheck className="h-3.5 w-3.5 text-sky-500" />}
          </div>
          <p className="text-xs text-muted-foreground">{pro.title}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 font-medium text-amber-600">
              <Star className="h-3 w-3 fill-current" />{pro.rating}
            </span>
            <span>{pro.reviews} reseñas</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{pro.zone}</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-2">
        <p className="line-clamp-2 text-xs text-muted-foreground">{pro.description}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {pro.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="px-1.5 py-0 text-[10px]">{tag}</Badge>
          ))}
        </div>
        <ActivityChips insights={insights} limit={2} className="mt-2" />
      </div>

      <div className="flex gap-2 border-t border-border p-3">
        <Button asChild variant="outline" size="sm" className="flex-1 gap-1.5 border-sky-200 text-sky-700 hover:bg-sky-50">
          <Link href={`/dashboard/services/${pro.id}`}>Ver perfil</Link>
        </Button>
        {pro.isFast && (
          <Badge className="flex items-center gap-1 bg-sky-100 text-sky-700 hover:bg-sky-100">
            <Zap className="h-3 w-3" />Rápido
          </Badge>
        )}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DescubrirPage() {
  const [filter, setFilter] = useState<DiscoverFilter>("todo")
  const [query, setQuery] = useState("")

  const comercioItems = useMemo(() => commerces.filter((c) => c.type === "commerce"), [])
  const emprendedorItems = useMemo(() => commerces.filter((c) => c.type === "entrepreneur"), [])

  const filteredComercioItems = useMemo(() => {
    if (!query) return comercioItems
    const q = query.toLowerCase()
    return comercioItems.filter((c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
  }, [comercioItems, query])

  const filteredEmprendedorItems = useMemo(() => {
    if (!query) return emprendedorItems
    const q = query.toLowerCase()
    return emprendedorItems.filter((c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
  }, [emprendedorItems, query])

  const filteredServices = useMemo(() => {
    if (!query) return professionals
    const q = query.toLowerCase()
    return professionals.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.title.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q)))
  }, [query])

  const showComercios = filter === "todo" || filter === "comercios"
  const showEmprendedores = filter === "todo" || filter === "emprendedores"
  const showServicios = filter === "todo" || filter === "servicios"

  return (
    <div className="flex max-w-full flex-col gap-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
          <Compass className="h-3.5 w-3.5" />
          Descubrí tu zona
        </div>
        <h1 className="text-2xl font-bold">Descubrir</h1>
        <p className="text-sm text-muted-foreground">
          Comercios, emprendedores y servicios cerca tuyo.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Buscar por nombre, categoría o servicio..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
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

      {/* Comercios */}
      {showComercios && filteredComercioItems.length > 0 && (
        <section>
          {filter === "todo" && (
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <Store className="h-4 w-4 text-violet-500" />
              Comercios
            </h2>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(filter === "todo" ? filteredComercioItems.slice(0, 3) : filteredComercioItems).map((item) => (
              <CommerceCard key={item.id} item={item} />
            ))}
          </div>
          {filter === "todo" && filteredComercioItems.length > 3 && (
            <button onClick={() => setFilter("comercios")} className="mt-3 text-xs font-medium text-violet-600 hover:underline">
              Ver todos los comercios →
            </button>
          )}
        </section>
      )}

      {/* Emprendedores */}
      {showEmprendedores && filteredEmprendedorItems.length > 0 && (
        <section>
          {filter === "todo" && (
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <span className="text-amber-500">✦</span>
              Emprendedores
            </h2>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(filter === "todo" ? filteredEmprendedorItems.slice(0, 3) : filteredEmprendedorItems).map((item) => (
              <CommerceCard key={item.id} item={item} />
            ))}
          </div>
          {filter === "todo" && filteredEmprendedorItems.length > 3 && (
            <button onClick={() => setFilter("emprendedores")} className="mt-3 text-xs font-medium text-violet-600 hover:underline">
              Ver todos los emprendedores →
            </button>
          )}
        </section>
      )}

      {/* Servicios */}
      {showServicios && filteredServices.length > 0 && (
        <section>
          {filter === "todo" && (
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <span className="text-sky-500">⚡</span>
              Servicios
            </h2>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {(filter === "todo" ? filteredServices.slice(0, 4) : filteredServices).map((pro) => (
              <ServiceCard key={pro.id} pro={pro} />
            ))}
          </div>
          {filter === "todo" && filteredServices.length > 4 && (
            <button onClick={() => setFilter("servicios")} className="mt-3 text-xs font-medium text-violet-600 hover:underline">
              Ver todos los servicios →
            </button>
          )}
        </section>
      )}

      {/* Estado vacío */}
      {query && filteredComercioItems.length === 0 && filteredEmprendedorItems.length === 0 && filteredServices.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-violet-200 py-16 text-center">
          <Compass className="mb-3 h-10 w-10 text-violet-200" />
          <p className="text-sm font-medium">Sin resultados para "{query}"</p>
          <p className="mt-1 text-xs text-muted-foreground">Probá con otro término o explorá todas las categorías.</p>
        </div>
      )}
    </div>
  )
}
