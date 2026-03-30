"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { UserProfile } from "@/components/profile/user-profile"
import {
  Star,
  MessageSquare,
  Phone,
  Eye,
  Briefcase,
  PencilLine,
  CreditCard,
  BadgeCheck,
} from "lucide-react"

export default function ProfilePage() {
  const { auth } = useAuth()
  const isProfessional = auth.accountType === "external_professional"
  const professionalProfile = auth.professionalProfile

  if (isProfessional) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mi perfil profesional</h1>
          <p className="text-sm text-muted-foreground">
            Revisá cómo se presenta tu servicio dentro de la comunidad
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span className="text-sm">Visitas al perfil</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">56</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">Clics en WhatsApp</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">8</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span className="text-sm">Llamadas</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">5</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-4 w-4" />
              <span className="text-sm">Puntuación promedio</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">4.8</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Resumen de tu perfil público
                </h2>
              </div>

              <p className="text-sm text-muted-foreground">
                Esto es lo que hoy comunica tu perfil dentro del directorio de la zona.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/settings"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                <PencilLine className="h-4 w-4" />
                Editar perfil
              </Link>

              <Link
                href="/dashboard/suscripciones"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                <CreditCard className="h-4 w-4" />
                Suscripción
              </Link>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Nombre visible
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {auth.profile.name}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Categoría principal
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {professionalProfile?.category || "Sin definir"}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Zona de trabajo
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {professionalProfile?.serviceArea || auth.profile.zone}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Contacto principal
              </p>
              <p className="mt-1 text-base font-semibold text-foreground">
                {auth.profile.whatsapp}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-border bg-muted/20 p-4">
            <div className="mb-2 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium text-foreground">Descripción actual</p>
            </div>
            <p className="text-sm text-muted-foreground">
              {professionalProfile?.description || auth.profile.bio || "Todavía no completaste tu descripción profesional."}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Recomendaciones para mejorar tu perfil
          </h2>

          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-muted-foreground">
            <li>Definí una categoría principal clara para aparecer mejor en búsquedas.</li>
            <li>Completá tu descripción con más detalle y especialidades concretas.</li>
            <li>Pedí reseñas a vecinos con los que ya trabajaste.</li>
            <li>Sumá un plan destacado cuando quieras ganar más visibilidad.</li>
          </ul>
        </div>

        <UserProfile />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mi perfil</h1>
        <p className="text-sm text-muted-foreground">
          Administrá tu presencia en la comunidad
        </p>
      </div>

      <UserProfile />
    </div>
  )
}