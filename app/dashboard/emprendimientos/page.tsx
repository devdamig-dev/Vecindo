"use client"

import { useState } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { commerces } from "@/lib/commerces-data"
import { Sparkles, MapPin, Star, ChevronRight, MessageSquare, Package, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { normalizeSearch } from "@/lib/search"

const emprendimientos = commerces.filter((c) => c.type === "entrepreneur")

type CategoryFilter = "todas" | "deco" | "gastronomia" | "ceramica" | "moda" | "otro"

const categoryFilters: { key: CategoryFilter; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "deco", label: "Deco y hogar" },
  { key: "gastronomia", label: "Gastronomía" },
  { key: "ceramica", label: "Cerámica" },
  { key: "moda", label: "Moda" },
  { key: "otro", label: "Otro" },
]

const categoryMap: Record<string, CategoryFilter> = {
  "Muebles a pedido": "deco",
  "Emprendimiento de deco": "deco",
  "Cerámica artesanal": "ceramica",
  "Pastelería por encargo": "gastronomia",
}

function getCategory(cat: string): CategoryFilter {
  return categoryMap[cat] ?? "otro"
}

export default function EmprendimientosPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("todas")
  const [query, setQuery] = useState("")

  const filtered = emprendimientos.filter((e) => {
    const categoryMatches = activeCategory === "todas" || getCategory(e.category) === activeCategory
    const haystack = normalizeSearch([e.name, e.category, e.description, ...e.products.flatMap((p) => [p.name, p.shortDescription])].join(" "))
    return categoryMatches && haystack.includes(normalizeSearch(query))
  })

  return (
    <div className="flex max-w-full flex-col gap-6">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          <Sparkles className="h-3.5 w-3.5" />
          Emprendimientos de tu zona
        </div>
        <h1 className="text-2xl font-bold">Emprendimientos</h1>
        <p className="text-sm text-muted-foreground">
          Marcas locales creadas por vecinos. Descubrí productos únicos y apoyá lo cercano.
        </p>
      </div>

      {/* Cómo funciona */}
      <div className="grid grid-cols-3 gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
        {[
          { step: "1", text: "Explorá marcas locales por categoría" },
          { step: "2", text: "Descubrí productos y proyectos únicos" },
          { step: "3", text: "Consultá o pedí directo por WhatsApp" },
        ].map((item) => (
          <div key={item.step} className="flex flex-col items-center gap-1.5 text-center">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
              {item.step}
            </div>
            <p className="text-[11px] leading-snug text-emerald-800">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-600" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar emprendimiento o producto" className="h-12 rounded-2xl border-emerald-200 pl-10 pr-10 focus-visible:ring-emerald-500" />
        {query && <button onClick={() => setQuery("")} aria-label="Limpiar búsqueda" className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full hover:bg-emerald-50"><X className="h-4 w-4" /></button>}
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {categoryFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveCategory(f.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === f.key
                ? "bg-emerald-600 text-white"
                : "bg-muted text-muted-foreground hover:bg-emerald-100 hover:text-emerald-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((emp) => (
          <Link
            key={emp.id}
            href={`/dashboard/emprendimientos/${emp.id}`}
            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-emerald-300 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 shrink-0 rounded-xl">
                  <AvatarFallback className="rounded-xl bg-emerald-100 text-sm font-bold text-emerald-700">
                    {emp.logo}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold leading-snug text-foreground">{emp.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {emp.category} · <MapPin className="mr-0.5 inline-block h-3 w-3" />{emp.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {emp.rating.toFixed(1)}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>

            <p className="line-clamp-2 text-sm text-muted-foreground">{emp.description}</p>

            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-emerald-500/10 px-1.5 py-0 text-[10px] text-emerald-700">
                <Sparkles className="mr-1 h-3 w-3" /> Marca local
              </Badge>
              <Badge className="bg-amber-500/10 px-1.5 py-0 text-[10px] text-amber-700">
                {emp.badge}
              </Badge>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Package className="h-3.5 w-3.5" />
                {emp.products.length} productos en catálogo
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                <MessageSquare className="h-3.5 w-3.5" />
                Pedido por WhatsApp
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No encontramos emprendimientos o productos con esos filtros.
        </p>
      )}
    </div>
  )
}
