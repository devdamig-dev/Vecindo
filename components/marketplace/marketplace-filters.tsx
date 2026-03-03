"use client"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

const categories = ["Todos", "Muebles", "Electronica", "Vehiculos", "Electrodomesticos", "Deportes", "Ninos", "Jardin"]

export function MarketplaceFilters() {
  const [active, setActive] = useState("Todos")

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar anuncios..." className="h-10 pl-9" />
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
