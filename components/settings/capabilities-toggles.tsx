"use client"

import { useAuth } from "@/lib/auth-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Search, ShoppingBag, PawPrint, Megaphone } from "lucide-react"

export function CapabilitiesToggles() {
  const { auth, setCapability } = useAuth()
  const { capabilities, accountType } = auth

  const isResident = accountType === "resident"
  const isProfessional = accountType === "external_professional"

  const toggles = [
    {
      key: "canOfferServices" as const,
      label: isProfessional
        ? "Activar perfil en el directorio"
        : "Ofrecer servicios en la zona",
      description: isProfessional
        ? "Controlá si tu perfil aparece visible para los vecinos dentro del directorio."
        : "Activa tu perfil profesional para aparecer en el directorio de servicios.",
      icon: Search,
      visible: true,
      locked: isProfessional, // 👈 clave
    },
    {
      key: "canSell" as const,
      label: "Vender en Mercado",
      description: "Publica productos y crea un perfil de negocio con catálogo.",
      icon: ShoppingBag,
      visible: isResident,
    },
    {
      key: "canPostPets" as const,
      label: "Publicar en Mascotas",
      description: "Publica alertas de mascotas perdidas, encontradas o en adopción.",
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
      <h2 className="font-semibold text-foreground mb-1">
        {isProfessional ? "Visibilidad del perfil" : "Funcionalidades"}
      </h2>

      <p className="text-xs text-muted-foreground mb-4">
        {isProfessional
          ? "Gestioná cómo aparece tu servicio dentro de la comunidad."
          : "Activa o desactiva las funcionalidades disponibles para tu cuenta."}
      </p>

      <div className="flex flex-col gap-4">
        {toggles
          .filter((t) => t.visible)
          .map((toggle) => {
            const isLocked = toggle.locked

            return (
              <div
                key={toggle.key}
                className="flex items-start justify-between gap-4 rounded-lg border border-border p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-muted p-2">
                    <toggle.icon className="h-4 w-4 text-foreground" />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground">
                      {toggle.label}
                    </Label>

                    <p className="text-xs text-muted-foreground mt-0.5">
                      {toggle.description}
                    </p>

                    {isLocked && (
                      <p className="text-xs text-primary mt-1">
                        Este ajuste forma parte de tu cuenta profesional.
                      </p>
                    )}
                  </div>
                </div>

                <Switch
                  checked={capabilities[toggle.key]}
                  onCheckedChange={(val) =>
                    !isLocked && setCapability(toggle.key, val)
                  }
                  disabled={isLocked}
                  aria-label={toggle.label}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}