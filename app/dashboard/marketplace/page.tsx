"use client"

import { useMemo, useState } from "react"
import { MarketplaceGrid, listings } from "@/components/marketplace/marketplace-grid"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { Button } from "@/components/ui/button"
import { Plus, ShieldCheck, Store, MessageCircleMore } from "lucide-react"
import { SectionIntroBanner } from "@/components/ui/section-intro-banner"

export default function MarketplacePage() {
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
      {/* HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            <Store className="h-3.5 w-3.5" />
            Mercado de tu zona
          </div>

          <h1 className="text-2xl font-bold text-foreground">Mercado</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Comprá y vendé productos dentro de tu comunidad, sin comisiones y con contacto directo.
          </p>
        </div>

        <Button
          size="sm"
          className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="h-4 w-4" />
          <span>Publicar producto</span>
        </Button>
      </div>

      {/* INTRO */}
      <SectionIntroBanner
        sectionId="marketplace"
        title="Mercado de la comunidad"
        description="Compra y venta entre vecinos, simple y sin intermediarios."
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

      {/* BENEFICIOS */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-100 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Sin comisiones</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Vendé sin intermediarios ni costos extra.
          </p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-100 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Contacto directo</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Hablá con el comprador por WhatsApp o mensaje.
          </p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-100 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Más confianza</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Solo vecinos de tu zona.
          </p>
        </div>
      </div>

      {/* BLOQUE CONFIANZA */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-100 px-4 py-3">
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <p className="text-sm text-muted-foreground">
            Vecindo conecta vecinos. La compra se realiza directamente entre usuarios.
          </p>
        </div>

        <div className="text-xs font-medium text-emerald-700">
          Contacto directo sin intermediarios
        </div>
      </div>

      {/* FILTROS */}
      <MarketplaceFilters
        query={query}
        onQueryChange={setQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* RESULTADOS */}
      <div className="text-sm text-muted-foreground">
        {filteredListings.length} resultado{filteredListings.length === 1 ? "" : "s"}
      </div>

      <MarketplaceGrid listings={filteredListings} />
    </div>
  )
}