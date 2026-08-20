"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { commerces } from "@/lib/commerces-data"
import { Store, MapPin, Clock, Star, ChevronRight, MessageSquare, ExternalLink, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { normalizeSearch } from "@/lib/search"

const comercios = commerces.filter((c) => c.type === "commerce")

type CategoryFilter = "todas" | "gastronomia" | "salud" | "hogar" | "moda" | "tecnologia" | "otro"

const categoryFilters: { key: CategoryFilter; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "gastronomia", label: "Gastronomía" },
  { key: "salud", label: "Salud" },
  { key: "hogar", label: "Hogar y deco" },
  { key: "moda", label: "Moda" },
  { key: "tecnologia", label: "Tecnología" },
  { key: "otro", label: "Otro" },
]

const categoryMap: Record<string, CategoryFilter> = {
  Farmacia: "salud",
  Cafetería: "gastronomia",
  "Muebles y deco": "hogar",
}

function getCategory(cat: string): CategoryFilter {
  return categoryMap[cat] ?? "otro"
}

export default function ComerciosPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("todas")
  const [query, setQuery] = useState("")

  const filtered = comercios.filter((c) => {
    const categoryMatches = activeCategory === "todas" || getCategory(c.category) === activeCategory
    const haystack = normalizeSearch([c.name, c.category, c.description, ...c.products.flatMap((p) => [p.name, p.shortDescription])].join(" "))
    return categoryMatches && haystack.includes(normalizeSearch(query))
  })

  return (
    <div className="flex max-w-full flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
            <Store className="h-3.5 w-3.5" />
            Comercios de tu zona
          </div>
          <h1 className="text-2xl font-bold">Comercios</h1>
          <p className="text-sm text-muted-foreground">
            Locales físicos cerca tuyo con catálogo, horarios y contacto directo.
          </p>
        </div>
      </div>

      {/* Cómo funciona */}
      <div className="grid grid-cols-3 gap-3 rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
        {[
          { step: "1", text: "Explorá locales por rubro y ubicación" },
          { step: "2", text: "Mirá el catálogo y las promos activas" },
          { step: "3", text: "Consultá o pedí directo por WhatsApp" },
        ].map((item) => (
          <div key={item.step} className="flex flex-col items-center gap-1.5 text-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
              {item.step}
            </div>
            <p className="text-[11px] leading-snug text-violet-800">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-600" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar comercio, producto o rubro" className="h-12 rounded-2xl border-violet-200 pl-10 pr-10 focus-visible:ring-violet-500" />
        {query && <button onClick={() => setQuery("")} aria-label="Limpiar búsqueda" className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full hover:bg-violet-50"><X className="h-4 w-4" /></button>}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {categoryFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveCategory(f.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === f.key
                ? "bg-violet-600 text-white"
                : "bg-muted text-muted-foreground hover:bg-violet-100 hover:text-violet-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((comercio) => (
          <Link
            key={comercio.id}
            href={`/dashboard/comercios/${comercio.id}`}
            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-violet-300 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 shrink-0 rounded-xl">
                  <AvatarFallback className="rounded-xl bg-violet-100 text-sm font-bold text-violet-700">
                    {comercio.logo}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold leading-snug text-foreground">{comercio.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {comercio.category} · <MapPin className="mr-0.5 inline-block h-3 w-3" />{comercio.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {comercio.rating.toFixed(1)}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>

            <p className="line-clamp-2 text-sm text-muted-foreground">{comercio.description}</p>

            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-violet-500/10 px-1.5 py-0 text-[10px] text-violet-700">
                <Store className="mr-1 h-3 w-3" /> Local físico
              </Badge>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3" />
                {comercio.hours}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-[11px] text-muted-foreground">
                {comercio.products.length} productos en catálogo
              </span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] font-medium text-violet-700">
                  <MessageSquare className="h-3.5 w-3.5" />
                  WhatsApp
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground/40" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No encontramos comercios o productos con esos filtros.
        </p>
      )}
    </div>
  )
}
