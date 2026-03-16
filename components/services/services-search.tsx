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
            placeholder="Buscar servicios, habilidades o profesionales..."
            className="h-10 pl-9"
          />
        </div>
        <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Filtros">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={activeCategory === cat ? "default" : "secondary"}
            className="cursor-pointer px-3 py-1 text-xs"
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>
    </div>
  )
}