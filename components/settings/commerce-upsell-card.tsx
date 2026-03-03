"use client"

import { Button } from "@/components/ui/button"
import { Store, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"

interface CommerceUpsellCardProps {
  variant?: "default" | "subtle"
}

export function CommerceUpsellCard({ variant = "default" }: CommerceUpsellCardProps) {
  if (variant === "subtle") {
    return (
      <div className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <Store className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              ¿Ten&eacute;s un comercio en la zona?
            </p>
            <p className="text-xs text-muted-foreground">
              Sumalo a la gu&iacute;a por $9.999/mes
            </p>
          </div>
        </div>
        <Button size="sm" variant="outline" asChild>
          <Link href="/dashboard/suscripciones?plan=comercio">
            Inscribir
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="bg-primary/5 border-b border-primary/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <Store className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">¿Ten&eacute;s un comercio en la zona?</h3>
            <p className="text-xs text-muted-foreground">
              Sumalo a la gu&iacute;a y aparec&eacute; en el mapa
            </p>
          </div>
        </div>
      </div>
      <div className="px-5 py-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Por solo <span className="font-semibold text-foreground">$9.999/mes</span> tu comercio
          aparece en la Gu&iacute;a de Comercios con perfil completo, ubicaci&oacute;n en el mapa,
          rese&ntilde;as de vecinos y estad&iacute;sticas de visitas.
        </p>
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>Visible para todos los vecinos de Hudson &ndash; Berazategui</span>
        </div>
        <Button className="w-full mt-4" asChild>
          <Link href="/dashboard/suscripciones?plan=comercio">
            Inscribir mi comercio
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
