"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import {
  ShieldCheck,
  Briefcase,
  MapPin,
  Calendar,
  Star,
  MessageCircle,
  ShoppingBag,
  Bookmark,
  Settings,
} from "lucide-react"

export function UserProfile() {
  const { auth } = useAuth()
  const { profile, accountType, savedItems } = auth
  const isResident = accountType === "resident"

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Avatar className="h-20 w-20">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <AvatarFallback className="bg-primary text-2xl font-bold text-primary-foreground">
                {profile.avatarInitials}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
              {isResident ? (
                <ShieldCheck className="h-5 w-5 text-primary" />
              ) : (
                <Briefcase className="h-5 w-5 text-chart-2" />
              )}
            </div>

            <p className="text-muted-foreground">
              {isResident ? "Residente verificada" : "Prestador de servicios"}
            </p>

            <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-primary" />
                {profile.zone}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-primary" />
                Miembro desde {profile.memberSince}
              </span>
            </div>

            {isResident ? (
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="secondary">Propietaria</Badge>
                <Badge variant="secondary">Colaboradora activa</Badge>
                <Badge variant="secondary">Reseñadora de confianza</Badge>
              </div>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="secondary">Perfil profesional</Badge>
                <Badge variant="secondary">Disponible en la zona</Badge>
                <Badge variant="secondary">Con reseñas</Badge>
              </div>
            )}
          </div>

          <Button asChild variant="outline" className="shrink-0 gap-2">
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Editar perfil</span>
              <span className="sm:hidden">Editar</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Reseñas dadas", value: isResident ? "12" : "18", icon: Star },
          { label: "Preguntas hechas", value: isResident ? "8" : "2", icon: MessageCircle },
          { label: isResident ? "Anuncios" : "Trabajos", value: isResident ? "3" : "28", icon: ShoppingBag },
          { label: "Guardados", value: savedItems.length.toString(), icon: Bookmark },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <stat.icon className="mx-auto mb-2 h-5 w-5 text-primary" />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {savedItems.length > 0 && (
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="font-semibold text-foreground">Guardados recientes</h3>
            <Link
              href="/dashboard/guardados"
              className="text-xs text-primary underline-offset-2 hover:underline"
            >
              Ver todos
            </Link>
          </div>

          <div className="divide-y divide-border">
            {savedItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{item.savedAt}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h3 className="font-semibold text-foreground">Mi actividad reciente</h3>
        </div>

        <div className="divide-y divide-border">
          {(isResident
            ? [
                {
                  action: "Reseña a Pinturas Express",
                  detail: "5 estrellas - Excelente pintura exterior",
                  time: "hace 2 días",
                },
                {
                  action: "Hizo una pregunta",
                  detail: "Mejor época para podar árboles?",
                  time: "hace 4 días",
                },
                {
                  action: "Publicó un anuncio",
                  detail: "Biblioteca vintage - $85.000",
                  time: "hace 1 semana",
                },
                {
                  action: "Respondió una pregunta",
                  detail: "Recomendó a Roberto para trabajo eléctrico",
                  time: "hace 1 semana",
                },
              ]
            : [
                {
                  action: "Actualizó su perfil",
                  detail: "Agregó especialidades y zona de trabajo",
                  time: "hace 2 días",
                },
                {
                  action: "Recibió una reseña",
                  detail: "5 estrellas por instalación de luces exteriores",
                  time: "hace 5 días",
                },
                {
                  action: "Recibió una consulta",
                  detail: "Nuevo contacto desde el directorio",
                  time: "hace 6 días",
                },
                {
                  action: "Mejoró su visibilidad",
                  detail: "Perfil completo y activo en servicios",
                  time: "hace 1 semana",
                },
              ]
          ).map((item, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{item.action}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}