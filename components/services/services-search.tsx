"use client"

import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const categories = [
  "Todos",
  "Electricidad",
  "Plomería",
  "Pintura",
  "Jardinería",
  "Limpieza",
  "Clases",
  "Mascotas",
  "Seguridad",
]

interface ServicesSearchProps {
  query: string
  onQueryChange: (value: string) => void
  activeCategory: string
  onCategoryChange: (value: string) => void
}

export function ServicesSearch({
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
}: ServicesSearchProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Buscar profesión, servicio, nombre o especialidad"
            className="h-12 rounded-2xl pl-9 pr-10 focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
          />
          {query && <button onClick={() => onQueryChange("")} aria-label="Limpiar búsqueda" className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full hover:bg-sky-50"><X className="h-4 w-4" /></button>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat

          return (
            <Badge
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`cursor-pointer px-3 py-1 text-xs transition-colors ${
                isActive
                  ? "bg-sky-600 text-white hover:bg-sky-700"
                  : "bg-muted text-muted-foreground hover:bg-sky-100 hover:text-sky-700"
              }`}
            >
              {cat}
            </Badge>
          )
        })}
      </div>
    </div>
  )
}
