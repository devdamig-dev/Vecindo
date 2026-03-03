"use client"

import { DemoSwitcher } from "@/components/settings/demo-switcher"
import { ProfileEditor } from "@/components/settings/profile-editor"
import { CapabilitiesToggles } from "@/components/settings/capabilities-toggles"
import { ProfessionalProfileEditor } from "@/components/settings/professional-profile-editor"
import { BusinessProfileEditor } from "@/components/settings/business-profile-editor"
import { CommerceUpsellCard } from "@/components/settings/commerce-upsell-card"
import { useAuth } from "@/lib/auth-context"

export default function SettingsPage() {
  const { auth } = useAuth()
  const { capabilities, accountType } = auth
  const isResident = accountType === "resident"

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuraci&oacute;n</h1>
        <p className="text-sm text-muted-foreground">Administr&aacute; tu perfil, funcionalidades y configuraciones de cuenta.</p>
      </div>

      <DemoSwitcher />
      <ProfileEditor />
      <CapabilitiesToggles />

      {capabilities.canOfferServices && <ProfessionalProfileEditor />}
      {capabilities.canSell && <BusinessProfileEditor />}

      {/* Upsell for residents without a commerce subscription */}
      {isResident && !capabilities.canSell && <CommerceUpsellCard />}
    </div>
  )
}
