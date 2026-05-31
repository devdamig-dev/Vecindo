"use client"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const categories = [
  "Todos",
  "Muebles",
  "Electrónica",
  "Vehículos",
  "Electrodomésticos",
  "Deportes",
  "Niños",
  "Jardín",
]

interface MarketplaceFiltersProps {
  query: string
  onQueryChange: (value: string) => void
  activeCategory: string
  onCategoryChange: (value: string) => void
}

export function MarketplaceFilters({
  query,
  onQueryChange,
  activeCategory,
  onCategoryChange,
}: MarketplaceFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* INPUT */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar productos..."
          className="h-10 pl-9"
        />
      </div>

      {/* CATEGORÍAS */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat

          return (
            <Badge
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`cursor-pointer px-3 py-1 text-xs transition-colors ${
                isActive
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
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