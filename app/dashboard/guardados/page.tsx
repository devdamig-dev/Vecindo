"use client"

import { useAuth, type SavedItemType } from "@/lib/auth-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, Search, ShoppingBag, Store, Megaphone, Trash2, Heart } from "lucide-react"
import { useState } from "react"

const typeLabels: Record<SavedItemType, { label: string; icon: typeof Search }> = {
  service: { label: "Servicio", icon: Search },
  marketplace: { label: "Mercado", icon: ShoppingBag },
  commerce: { label: "Comercio", icon: Store },
  zone_update: { label: "Novedad", icon: Megaphone },
  ayuda: { label: "Ayuda", icon: Heart },
}

const filterOptions: { key: SavedItemType | "all"; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "service", label: "Servicios" },
  { key: "marketplace", label: "Mercado" },
  { key: "commerce", label: "Comercios" },
  { key: "zone_update", label: "Novedades" },
  { key: "ayuda", label: "Ayuda" },
]

export default function GuardadosPage() {
  const { auth, removeSavedItem } = useAuth()
  const [activeFilter, setActiveFilter] = useState<SavedItemType | "all">("all")

  const items = activeFilter === "all"
    ? auth.savedItems
    : auth.savedItems.filter((item) => item.type === activeFilter)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2">
          <Bookmark className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Guardados</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Tus servicios, anuncios, comercios y novedades guardados.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setActiveFilter(opt.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === opt.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Saved items list */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
          <Bookmark className="h-10 w-10 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">No hay elementos guardados</p>
          <p className="text-xs text-muted-foreground mt-1">
            {"Guard\u00e1 servicios, anuncios, comercios o novedades para encontrarlos f\u00e1cilmente."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            const typeInfo = typeLabels[item.type]
            return (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <typeInfo.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{typeInfo.label}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden text-xs text-muted-foreground sm:block">{item.savedAt}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive h-8 w-8 p-0"
                    onClick={() => removeSavedItem(item.id)}
                    aria-label={`Quitar ${item.title} de guardados`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
