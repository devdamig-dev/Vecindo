"use client"

import { useMemo, useState } from "react"
import { MarketplaceGrid, listings } from "@/components/marketplace/marketplace-grid"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { Button } from "@/components/ui/button"
import { Plus, ShieldCheck, Store } from "lucide-react"
import { SectionIntroBanner } from "@/components/ui/section-intro-banner"

export default function MarketplacePage() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Todos")

  const filteredListings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return listings.filter((listing) => {
      const matchesCategory = activeCategory === "Todos" || listing.category === activeCategory
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
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            <Store className="h-3.5 w-3.5" /> Mercado de tu zona
          </div>
          <h1 className="text-2xl font-bold text-foreground">Mercado</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">Comprá y vendé entre vecinos de la zona. Sin comisiones, sin intermediarios y con contacto directo por WhatsApp.</p>
        </div>
        <Button
          size="sm"
          disabled
          aria-disabled="true"
          title="Próximamente"
          className="gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" /> Publicar producto
        </Button>
      </div>

      <SectionIntroBanner
        sectionId="marketplace"
        variant="marketplace"
        title="Mercado entre vecinos"
        description="Compra y venta dentro de tu zona, simple, sin intermediarios y con coordinación directa."
        howItWorks={{
          title: "¿Cómo funciona?",
          steps: [
            "Publicá un producto con fotos y precio.",
            "Los vecinos te contactan directamente.",
            "Coordinan entrega y pago entre ustedes.",
            "Sin comisiones y dentro de la comunidad.",
          ],
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-100 px-4 py-3">
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <p className="text-sm text-muted-foreground">VEZI conecta vecinos. La compra se realiza directamente entre usuarios.</p>
        </div>
        <div className="text-xs font-medium text-emerald-700">Contacto directo sin intermediarios</div>
      </div>

      <MarketplaceFilters query={query} onQueryChange={setQuery} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <div className="text-sm text-muted-foreground">{filteredListings.length} resultado{filteredListings.length === 1 ? "" : "s"}</div>
      <MarketplaceGrid listings={filteredListings} />
    </div>
  )
}
