"use client"

import { useAuth } from "@/lib/auth-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Search, ShoppingBag, PawPrint, Megaphone } from "lucide-react"

export function CapabilitiesToggles() {
  const { auth, setCapability } = useAuth()
  const { capabilities, accountType } = auth
  const isResident = accountType === "resident"

  const toggles = [
    {
      key: "canOfferServices" as const,
      label: "Ofrecer servicios en la zona",
      description: "Activa tu perfil profesional para aparecer en el directorio de servicios.",
      icon: Search,
      visible: true,
    },
    {
      key: "canSell" as const,
      label: "Vender en Mercado",
      description: "Publica productos y crea un perfil de negocio con catalogo.",
      icon: ShoppingBag,
      visible: isResident,
    },
    {
      key: "canPostPets" as const,
      label: "Publicar en Mascotas",
      description: "Publica alertas de mascotas perdidas, encontradas o en adopcion.",
      icon: PawPrint,
      visible: isResident,
    },
    {
      key: "canPostZoneUpdates" as const,
      label: "Publicar Novedades de Zona",
      description: "Crea publicaciones visibles en el carrusel de novedades de tu zona.",
      icon: Megaphone,
      visible: isResident,
    },
  ]

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="font-semibold text-foreground mb-1">Funcionalidades</h2>
      <p className="text-xs text-muted-foreground mb-4">
        Activa o desactiva las funcionalidades disponibles para tu cuenta.
      </p>
      <div className="flex flex-col gap-4">
        {toggles
          .filter((t) => t.visible)
          .map((toggle) => (
            <div
              key={toggle.key}
              className="flex items-start justify-between gap-4 rounded-lg border border-border p-4"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-muted p-2">
                  <toggle.icon className="h-4 w-4 text-foreground" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">{toggle.label}</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">{toggle.description}</p>
                </div>
              </div>
              <Switch
                checked={capabilities[toggle.key]}
                onCheckedChange={(val) => setCapability(toggle.key, val)}
                aria-label={toggle.label}
              />
            </div>
          ))}
      </div>
    </div>
  )
}
