"use client"

import Link from "next/link"
import { DemoSwitcher } from "@/components/settings/demo-switcher"
import { ProfileEditor } from "@/components/settings/profile-editor"
import { CapabilitiesToggles } from "@/components/settings/capabilities-toggles"
import { ProfessionalProfileEditor } from "@/components/settings/professional-profile-editor"
import { BusinessProfileEditor } from "@/components/settings/business-profile-editor"
import { CommerceUpsellCard } from "@/components/settings/commerce-upsell-card"
import { useAuth } from "@/lib/auth-context"
import { Briefcase, UserRound, CreditCard, Store, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function getCurrentPlan(auth: ReturnType<typeof useAuth>["auth"]) {
  const hasBusiness = Boolean(auth.commercialActivity?.hasBusinessProfile || auth.businessProfile)
  const hasServices = (auth.commercialActivity?.serviceListingsCount ?? 0) > 0
  if (hasBusiness) return { name: "Plan Comercio", limit: "Hasta 50 productos", accent: "amber" as const }
  if (hasServices) return { name: "Profesional Destacado", limit: "Perfil + servicios activos", accent: "sky" as const }
  return { name: "Plan Gratuito", limit: "Base para empezar", accent: "emerald" as const }
}

function PlanCard({ planName, limit, accent }: { planName: string; limit: string; accent: "amber" | "sky" | "emerald" }) {
  const classes = accent === "amber" ? "border-amber-200 bg-amber-50" : accent === "sky" ? "border-sky-200 bg-sky-50" : "border-emerald-200 bg-emerald-50"
  return (
    <div className={`rounded-xl border p-4 ${classes}`}>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">Plan actual</Badge>
        <span className="text-sm font-semibold text-foreground">{planName}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{limit}. Podés revisar o cambiar este plan desde Suscripciones.</p>
      <Button asChild variant="outline" className="mt-4">
        <Link href="/dashboard/suscripciones">Ver planes</Link>
      </Button>
    </div>
  )
}

export default function SettingsPage() {
  const { auth } = useAuth()
  const { capabilities, accountType } = auth
  const isResident = accountType === "resident"
  const isProfessional = accountType === "external_professional"
  const currentPlan = getCurrentPlan(auth)

  if (isProfessional) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configuración profesional</h1>
          <p className="text-sm text-muted-foreground">Gestioná tu perfil, tu visibilidad y cómo te encuentran dentro de la zona.</p>
        </div>
        <DemoSwitcher />
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-2 flex items-center gap-2"><UserRound className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold text-foreground">Perfil personal</h2></div>
          <p className="mb-4 text-sm text-muted-foreground">Estos datos identifican tu cuenta y tu forma de contacto principal.</p>
          <ProfileEditor />
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-2 flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold text-foreground">Servicios</h2></div>
          <p className="mb-4 text-sm text-muted-foreground">Completá tu rubro, especialidades, descripción y zona de trabajo para aparecer mejor en el directorio.</p>
          <CapabilitiesToggles />
          {capabilities.canOfferServices && <ProfessionalProfileEditor />}
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold text-foreground">Tu plan</h2></div>
          <PlanCard planName={currentPlan.name} limit={currentPlan.limit} accent={currentPlan.accent} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-sm text-muted-foreground">Administrá tu perfil, tus módulos activos y la configuración de cuenta.</p>
      </div>
      <DemoSwitcher />
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 flex items-center gap-2"><UserRound className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold text-foreground">Perfil personal</h2></div>
        <p className="mb-4 text-sm text-muted-foreground">Datos básicos de tu cuenta dentro de la comunidad.</p>
        <ProfileEditor />
      </div>
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold text-foreground">Servicios</h2></div>
        <p className="mb-4 text-sm text-muted-foreground">Activá o desactivá tu perfil de servicios dentro de la zona.</p>
        <CapabilitiesToggles />
        {capabilities.canOfferServices && <ProfessionalProfileEditor />}
      </div>
      {capabilities.canSell && (
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-2 flex items-center gap-2"><Store className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold text-foreground">Espacio comercial</h2></div>
          <p className="mb-4 text-sm text-muted-foreground">Gestioná tu perfil comercial y los productos que mostrás dentro de VEZI.</p>
          <BusinessProfileEditor />
        </div>
      )}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold text-foreground">Tu plan</h2></div>
        <PlanCard planName={currentPlan.name} limit={currentPlan.limit} accent={currentPlan.accent} />
      </div>
      {isResident && !capabilities.canSell && <CommerceUpsellCard />}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /><h2 className="text-lg font-semibold text-foreground">Acceso a la cuenta</h2></div>
        <p className="text-sm text-muted-foreground">Mi perfil ahora se gestiona desde esta sección para mantener la cuenta y los módulos en un solo lugar.</p>
      </div>
    </div>
  )
}
