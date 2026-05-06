"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { canAccessServiceManagement } from "@/lib/commercial"
import { ActivityChips } from "@/components/activity/activity-chips"
import { Button } from "@/components/ui/button"
import { getServiceDemandInsights } from "@/lib/activity-insights"

export default function ServiceManagementPage() {
  const { auth } = useAuth()

  if (!canAccessServiceManagement(auth)) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Gestión de servicios</h1>
        <p className="text-sm text-muted-foreground">Este panel es solo para prestadores de servicio.</p>
        <Button asChild><Link href="/dashboard/services">Ir a Servicios</Link></Button>
      </div>
    )
  }

  const serviceDemandInsights = getServiceDemandInsights(auth?.profile?.email ?? auth?.profile?.name ?? "service-management")

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Panel de gestión de servicios</h1>
      <p className="text-sm text-muted-foreground">MVP: administrá zona, modalidad, disponibilidad, experiencia, contacto y reseñas.</p>
      <ActivityChips insights={serviceDemandInsights} className="rounded-2xl border border-sky-100 bg-sky-50/60 p-3" />
      <div className="rounded-xl border p-4 text-sm text-muted-foreground">Actividad estimada para orientar tu posicionamiento mientras el backend no está implementado.</div>
    </div>
  )
}
