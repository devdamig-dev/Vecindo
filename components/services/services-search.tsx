"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const categories = [
  "Todos",
  "Electricidad",
  "Plomeria",
  "Pintura",
  "Jardineria",
  "Limpieza",
  "Clases",
  "Mascotas",
  "Seguridad",
]

export function ServicesSearch() {
  const [active, setActive] = useState("Todos")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
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
            variant={active === cat ? "default" : "secondary"}
            className="cursor-pointer px-3 py-1 text-xs"
            onClick={() => setActive(cat)}
          >
            {cat}
          </Badge>
        ))}
      </div>
    </div>
  )
}
