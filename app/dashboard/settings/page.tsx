"use client"

import { DemoSwitcher } from "@/components/settings/demo-switcher"
import { ProfileEditor } from "@/components/settings/profile-editor"
import { CapabilitiesToggles } from "@/components/settings/capabilities-toggles"
import { ProfessionalProfileEditor } from "@/components/settings/professional-profile-editor"
import { BusinessProfileEditor } from "@/components/settings/business-profile-editor"
import { CommerceUpsellCard } from "@/components/settings/commerce-upsell-card"
import { useAuth } from "@/lib/auth-context"
import { Briefcase, UserRound, CreditCard, Store } from "lucide-react"

export default function SettingsPage() {
  const { auth } = useAuth()
  const { capabilities, accountType } = auth
  const isResident = accountType === "resident"
  const isProfessional = accountType === "external_professional"

  if (isProfessional) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configuración profesional</h1>
          <p className="text-sm text-muted-foreground">
            Gestioná tu perfil, tu visibilidad y cómo te encontran dentro de la zona
          </p>
        </div>

        <DemoSwitcher />

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <UserRound className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Datos personales</h2>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Estos datos identifican tu cuenta y tu forma de contacto principal.
          </p>

          <ProfileEditor />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Perfil profesional</h2>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Completá tu rubro, especialidades, descripción y zona de trabajo para aparecer mejor en el directorio.
          </p>

          <CapabilitiesToggles />

          {capabilities.canOfferServices && <ProfessionalProfileEditor />}
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Visibilidad y suscripción</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Más adelante desde acá vas a poder gestionar planes destacados, prioridad en búsquedas y beneficios premium para prestadores.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-sm text-muted-foreground">
          Administrá tu perfil, funcionalidades y configuraciones de cuenta.
        </p>
      </div>

      <DemoSwitcher />

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <UserRound className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Perfil personal</h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Datos básicos de tu cuenta dentro de la comunidad.
        </p>

        <ProfileEditor />
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Servicios</h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Activá o desactivá tu perfil profesional dentro de la zona.
        </p>

        <CapabilitiesToggles />

        {capabilities.canOfferServices && <ProfessionalProfileEditor />}
      </div>

      {capabilities.canSell && (
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <Store className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Mercado y emprendimiento</h2>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Gestioná tu perfil comercial y los productos que mostrás dentro de VEZI.
          </p>

          <BusinessProfileEditor />
        </div>
      )}

      {isResident && !capabilities.canSell && <CommerceUpsellCard />}
    </div>
  )
}