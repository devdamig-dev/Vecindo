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
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <Store className="h-3.5 w-3.5" />
            Compra y venta entre vecinos
          </div>

          <h1 className="text-2xl font-bold text-foreground">Mercado</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Publicá, comprá y vendé productos dentro de tu comunidad. Sin comisiones y
            con contacto directo.
          </p>
        </div>

        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          <span>Publicar producto</span>
        </Button>
      </div>

      <SectionIntroBanner
        sectionId="marketplace"
        title="Mercado de la comunidad"
        description="Comprá y vendé productos en tu zona, con contacto directo y sin intermediarios."
        howItWorks={{
          title: "¿Cómo funciona?",
          steps: [
            "Publicá un producto con fotos, precio y descripción.",
            "Los vecinos interesados te contactan directamente.",
            "Coordinan entrega, retiro y pago entre ustedes.",
            "Todo dentro de una comunidad más cercana y confiable.",
          ],
        }}
      />

      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Sin comisiones</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Publicá y vendé sin costos extra ni intermediarios.
          </p>
        </div>

        <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Contacto directo</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Hablá con el vecino interesado y definan todo por privado.
          </p>
        </div>

        <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-3">
          <p className="text-sm font-semibold text-foreground">Más confianza</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Las publicaciones circulan dentro de la comunidad y la zona.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3">
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            Vecindo facilita el encuentro entre vecinos. La coordinación de pago,
            entrega y retiro se realiza directamente entre las partes.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          <MessageCircleMore className="h-3.5 w-3.5" />
          Contacto directo por WhatsApp o mensaje
        </div>
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