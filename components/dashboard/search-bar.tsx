"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Buscar en tu zona..."
        className="h-11 rounded-2xl border-border/70 bg-muted/40 pl-10 text-sm shadow-sm focus-visible:ring-primary/30"
      />
    </div>
  )
}
