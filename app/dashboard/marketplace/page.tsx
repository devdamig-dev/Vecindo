"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { MarketplaceGrid, listings } from "@/components/marketplace/marketplace-grid"
import { useAuth } from "@/lib/auth-context"
import { canAccessMarketplace, canPublishMarketplaceItem } from "@/lib/commercial"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { Button } from "@/components/ui/button"
import { Lock, Plus, ShieldCheck, Store, Users } from "lucide-react"
import { SectionIntroBanner } from "@/components/ui/section-intro-banner"

export default function MarketplacePage() {
  const { auth } = useAuth()
  const canPublish = canPublishMarketplaceItem(auth)
  const canAccess = canAccessMarketplace(auth)
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

  if (!canAccess) {
    return (
      <div className="flex max-w-full flex-col gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            <Lock className="h-3.5 w-3.5" /> Mercado comunitario
          </div>
          <h1 className="text-2xl font-bold text-foreground">Mercado</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Mercado es el espacio de intercambio comunitario entre miembros de la red VEZI.
          </p>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-slate-50/75 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.04)]">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-sm">
              <Users className="h-5 w-5" />
            </div>
            <div className="min-w-0 space-y-2">
              <h2 className="text-base font-semibold text-foreground">Mercado es para miembros de la comunidad</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Tu perfil está orientado a Servicios y Espacio comercial. Desde ahí podés potenciar tu presencia en la red local.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Button asChild variant="outline" className="rounded-full border-sky-200 text-sky-700 hover:bg-sky-50">
                  <Link href="/dashboard/services">Ir a Servicios</Link>
                </Button>
                <Button asChild className="rounded-full bg-violet-600 text-white hover:bg-violet-700">
                  <Link href="/dashboard/espacio-comercial">Ver Espacio comercial</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            <Store className="h-3.5 w-3.5" /> Mercado de tu zona
          </div>
          <h1 className="text-2xl font-bold text-foreground">Mercado</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">Comprá y vendé entre vecinos de la zona. Sin comisiones, sin intermediarios y con contacto directo por WhatsApp.</p>
        </div>
        {canPublish && (
          <Button asChild size="sm" className="gap-1.5 bg-foreground text-background hover:bg-foreground/90">
            <Link href="/dashboard/marketplace/new">
              <Plus className="h-4 w-4" /> Publicar producto
            </Link>
          </Button>
        )}
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

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
          <p className="text-sm text-muted-foreground">VEZI conecta vecinos. La compra se realiza directamente entre usuarios.</p>
        </div>
        <div className="text-xs font-medium text-slate-600">Contacto directo sin intermediarios</div>
      </div>

      <MarketplaceFilters query={query} onQueryChange={setQuery} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <div className="text-sm text-muted-foreground">{filteredListings.length} resultado{filteredListings.length === 1 ? "" : "s"}</div>
      <MarketplaceGrid listings={filteredListings} />
    </div>
  )
}
