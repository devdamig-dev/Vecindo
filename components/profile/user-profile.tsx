"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { ShieldCheck, Briefcase, MapPin, Calendar, Star, MessageCircle, ShoppingBag, Bookmark, Settings } from "lucide-react"

export function UserProfile() {
  const { auth } = useAuth()
  const { profile, accountType, savedItems } = auth
  const isResident = accountType === "resident"

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
              {profile.avatarInitials}
            </AvatarFallback>
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
              {isResident ? "Residente Verificada" : "Profesional Externo"}
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
            {isResident && (
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="secondary">Propietaria</Badge>
                <Badge variant="secondary">Colaboradora Activa</Badge>
                <Badge variant="secondary">Rese\u00f1adora de Confianza</Badge>
              </div>
            )}
          </div>
          <Button asChild variant="outline" className="gap-2 shrink-0">
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Editar Perfil</span>
              <span className="sm:hidden">Editar</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Rese\u00f1as Dadas", value: "12", icon: Star },
          { label: "Preguntas Hechas", value: "8", icon: MessageCircle },
          { label: isResident ? "Anuncios" : "Trabajos", value: isResident ? "3" : "28", icon: ShoppingBag },
          { label: "Guardados", value: savedItems.length.toString(), icon: Bookmark },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
            <stat.icon className="mx-auto h-5 w-5 text-primary mb-2" />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Saved Items Preview */}
      {savedItems.length > 0 && (
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="font-semibold text-foreground">Guardados Recientes</h3>
            <Link href="/dashboard/guardados" className="text-xs text-primary hover:underline underline-offset-2">
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

      {/* Recent Activity */}
      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-4">
          <h3 className="font-semibold text-foreground">Mi Actividad Reciente</h3>
        </div>
        <div className="divide-y divide-border">
          {[
            { action: "Rese\u00f1a a Pinturas Express", detail: "5 estrellas - Excelente pintura exterior", time: "hace 2 d\u00edas" },
            { action: "Hizo una pregunta", detail: "Mejor \u00e9poca para podar \u00e1rboles?", time: "hace 4 d\u00edas" },
            { action: "Public\u00f3 un anuncio", detail: "Biblioteca vintage - $85.000", time: "hace 1 semana" },
            { action: "Respondi\u00f3 una pregunta", detail: "Recomend\u00f3 a Roberto para trabajo el\u00e9ctrico", time: "hace 1 semana" },
          ].map((item, i) => (
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
