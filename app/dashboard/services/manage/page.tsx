"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { canAccessServiceManagement } from "@/lib/commercial"
import { Button } from "@/components/ui/button"

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

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Panel de gestión de servicios</h1>
      <p className="text-sm text-muted-foreground">MVP: administrá zona, modalidad, disponibilidad, experiencia, contacto y reseñas.</p>
      <div className="rounded-xl border p-4 text-sm text-muted-foreground">Próximamente: edición completa y métricas del perfil de servicio (sin backend por ahora).</div>
    </div>
  )
}
