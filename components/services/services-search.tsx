"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
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
            placeholder="Buscar servicios, habilidades o personas..."
            className="h-10 pl-9 focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 shrink-0 border-sky-200 hover:bg-sky-100 hover:text-sky-700"
          aria-label="Filtros"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
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