"use client"

import { useMemo, useState } from "react"
import { MarketplaceGrid, listings } from "@/components/marketplace/marketplace-grid"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { Button } from "@/components/ui/button"
import { Plus, ShieldCheck } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { SectionIntroBanner } from "@/components/ui/section-intro-banner"

export default function MarketplacePage() {
  const { auth } = useAuth()
  const canSell = auth.capabilities.canSell

  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Todos")

  const filteredListings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return listings.filter((listing) => {
      const matchesCategory =
        activeCategory === "Todos" || listing.category === activeCategory

      const matchesQuery =
        normalizedQuery.length === 0 ||
        listing.title.toLowerCase().includes(normalizedQuery) ||
        listing.description.toLowerCase().includes(normalizedQuery) ||
        listing.fullDescription.toLowerCase().includes(normalizedQuery) ||
        listing.category.toLowerCase().includes(normalizedQuery) ||
        listing.seller.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mercado</h1>
          <p className="text-sm text-muted-foreground">Comprá y vendé dentro de tu comunidad</p>
        </div>

        {canSell ? (
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Publicar Anuncio</span>
          </Button>
        ) : (
          <div className="flex max-w-full items-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Activá "Vender en Mercado" en Configuración.</span>
          </div>
        )}
      </div>

      <SectionIntroBanner
        sectionId="marketplace"
        title="Mercado de la comunidad"
        description="Sin comisiones. Contacto directo entre vecinos."
        howItWorks={{
          title: "¿Cómo funciona el Mercado?",
          steps: [
            "Publicá lo que quieras vender con fotos y precio.",
            "Los vecinos interesados te contactan por WhatsApp.",
            "Coordinan entrega y pago directamente, sin intermediarios.",
            "Todo dentro de la comunidad, más seguro y rápido.",
          ],
        }}
      />

      <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-center">
        <p className="text-sm font-medium text-foreground">
          Comunidad cerrada. Sin comisiones. Contacto directo por WhatsApp.
        </p>
      </div>

      <MarketplaceFilters
        query={query}
        onQueryChange={setQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="text-sm text-muted-foreground">
        {filteredListings.length} resultado{filteredListings.length === 1 ? "" : "s"}
      </div>

      <MarketplaceGrid listings={filteredListings} />
    </div>
  )
}