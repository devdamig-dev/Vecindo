"use client"

import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ayudaPosts } from "@/lib/mocks/ayuda"
import type { AyudaCategory } from "@/lib/types/ayuda"
import { Heart, PawPrint, Gift, Key, Users, AlertTriangle, Clock, MapPin, CheckCircle2, Plus } from "lucide-react"

const categoryConfig: Record<AyudaCategory, { label: string; icon: typeof PawPrint; color: string; emoji: string }> = {
  mascotas:  { label: "Mascotas",         icon: PawPrint,      color: "bg-amber-500/10 text-amber-700",      emoji: "🐾" },
  donaciones:{ label: "Donaciones",       icon: Gift,          color: "bg-pink-500/10 text-pink-700",        emoji: "🎁" },
  objetos:   { label: "Objetos perdidos", icon: Key,           color: "bg-blue-500/10 text-blue-700",        emoji: "🔑" },
  personal:  { label: "Personal",         icon: Users,         color: "bg-violet-500/10 text-violet-700",    emoji: "🤝" },
  urgente:   { label: "Urgente",          icon: AlertTriangle, color: "bg-destructive/10 text-destructive",  emoji: "🚨" },
}

type CategoryFilter = AyudaCategory | "todas"

const filters: { key: CategoryFilter; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "mascotas", label: "Mascotas 🐾" },
  { key: "donaciones", label: "Donaciones 🎁" },
  { key: "objetos", label: "Objetos perdidos 🔑" },
  { key: "personal", label: "Personal 🤝" },
  { key: "urgente", label: "Urgente 🚨" },
]

export default function AyudaPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("todas")

  const filtered = ayudaPosts.filter(
    (p) => activeFilter === "todas" || p.category === activeFilter,
  )

  return (
    <div className="flex max-w-full flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700">
            <Heart className="h-3.5 w-3.5" />
            Ayuda vecinal
          </div>
          <h1 className="text-2xl font-bold">Ayuda</h1>
          <p className="text-sm text-muted-foreground">
            Mascotas perdidas, donaciones, objetos y pedidos de ayuda entre vecinos.
          </p>
        </div>
        <Button asChild size="sm" className="gap-1.5 bg-rose-600 text-white hover:bg-rose-700">
          <Link href="/dashboard/ayuda/nueva">
            <Plus className="h-4 w-4" />
            Publicar aviso
          </Link>
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === f.key
                ? "bg-rose-600 text-white"
                : "bg-muted text-muted-foreground hover:bg-rose-100 hover:text-rose-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((post) => {
          const cat = categoryConfig[post.category]
          const CatIcon = cat.icon
          return (
            <Link
              key={post.id}
              href={`/dashboard/ayuda/${post.id}`}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-rose-200 hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-rose-100 text-[11px] text-rose-700">
                    {post.authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-snug text-foreground line-clamp-1">{post.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {post.authorName} · <MapPin className="mr-0.5 inline-block h-3 w-3" />{post.zone}
                  </p>
                </div>
                {post.status === "resuelto" && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                )}
              </div>

              <p className="line-clamp-2 text-sm text-muted-foreground">{post.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <Badge className={`px-1.5 py-0 text-[10px] ${cat.color}`}>
                    <CatIcon className="mr-1 h-3 w-3" />
                    {cat.label}
                  </Badge>
                  {post.status === "resuelto" && (
                    <Badge className="bg-emerald-100 px-1.5 py-0 text-[10px] text-emerald-700">
                      Resuelto
                    </Badge>
                  )}
                </div>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {post.postedAt}
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No hay avisos en esta categoría.
        </p>
      )}
    </div>
  )
}
