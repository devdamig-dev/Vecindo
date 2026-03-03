"use client"

import { MarketplaceGrid } from "@/components/marketplace/marketplace-grid"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { Button } from "@/components/ui/button"
import { Plus, ShieldCheck } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { SectionIntroBanner } from "@/components/ui/section-intro-banner"

export default function MarketplacePage() {
  const { auth } = useAuth()
  const canSell = auth.capabilities.canSell

  return (
    <div className="flex flex-col gap-6 max-w-full">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mercado</h1>
          <p className="text-sm text-muted-foreground">{"Compr\u00e1 y vend\u00e9 dentro de tu comunidad"}</p>
        </div>
        {canSell ? (
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Publicar Anuncio</span>
          </Button>
        ) : (
          <div className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground max-w-full">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{"Activ\u00e1 \"Vender en Mercado\" en Configuraci\u00f3n."}</span>
          </div>
        )}
      </div>

      <SectionIntroBanner
        sectionId="marketplace"
        title="Mercado de la comunidad"
        description="Sin comisiones. Contacto directo entre vecinos."
        howItWorks={{
          title: "\u00bfC\u00f3mo funciona el Mercado?",
          steps: [
            "Public\u00e1 lo que quieras vender con fotos y precio.",
            "Los vecinos interesados te contactan por WhatsApp.",
            "Coordinan entrega y pago directamente, sin intermediarios.",
            "Todo dentro de la comunidad, m\u00e1s seguro y r\u00e1pido.",
          ],
        }}
      />

      {/* Disclaimer */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-center">
        <p className="text-sm font-medium text-foreground">
          {"Comunidad cerrada. Sin comisiones. Contacto directo por WhatsApp."}
        </p>
      </div>

      <MarketplaceFilters />
      <MarketplaceGrid />
    </div>
  )
}
