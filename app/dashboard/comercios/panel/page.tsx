"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCommerceStats, seedMockAnalytics } from "@/hooks/use-commerce-analytics"
import { useAuth } from "@/lib/auth-context"
import {
  Eye,
  MessageSquare,
  Phone,
  Search,
  TrendingUp,
  Store,
  ArrowLeft,
  Settings,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { commerces } from "../page"

export default function CommercePanelPage() {
  const { auth } = useAuth()

  if (!auth.hasCommerceProfile || auth.managesCommerceIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-md mx-auto">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mb-4">
          <Store className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-bold text-foreground mb-2">No tenés un comercio registrado</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Para acceder al panel de estadísticas necesitás registrar tu comercio en la guía de la zona.
        </p>
        <Button asChild>
          <Link href="/dashboard/suscripciones?plan=comercio">
            <Store className="h-4 w-4 mr-2" />
            Registrá tu comercio
          </Link>
        </Button>
        <Link href="/dashboard/comercios" className="mt-4 text-sm text-muted-foreground hover:text-foreground">
          ← Volver a Comercios
        </Link>
      </div>
    )
  }

  const commerceId = auth.managesCommerceIds[0]
  const myCommerce = commerces.find((c) => c.id === commerceId) ?? commerces[0]

  const [period, setPeriod] = useState<7 | 30>(7)
  const { stats, dailyStats, isLoading } = useCommerceStats(myCommerce.id, period)

  useEffect(() => {
    seedMockAnalytics(myCommerce.id)
  }, [myCommerce.id])

  const statCards = [
    {
      label: "Visitas al perfil",
      value: stats.profileViews,
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Clics en WhatsApp",
      value: stats.whatsappClicks,
      icon: MessageSquare,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      label: "Clics en Llamar",
      value: stats.callClicks,
      icon: Phone,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      label: "Apariciones en búsqueda",
      value: stats.searchImpressions,
      icon: Search,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ]

  const maxValue = Math.max(
    ...dailyStats.map((d) => Math.max(d.profileViews, d.whatsappClicks * 5, d.callClicks * 5)),
    1
  )

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <Link
        href="/dashboard/comercios"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-fit"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Comercios
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
              {myCommerce.logo}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">{myCommerce.name}</h1>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                Comercio Destacado
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Panel de estadísticas de tu comercio
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/comercios/${myCommerce.id}`}>
              <Eye className="h-4 w-4 mr-1.5" />
              Ver perfil público
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4 mr-1.5" />
              Editar
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Plan Comercio activo</p>
              <p className="text-xs text-muted-foreground">Renovación: 15 de abril, 2026</p>
            </div>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/suscripciones">Gestionar suscripción</Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">Estadísticas</h2>
        </div>

        <div className="flex rounded-lg border border-border bg-muted/50 p-0.5">
          <button
            onClick={() => setPeriod(7)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              period === 7 ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Últimos 7 días
          </button>
          <button
            onClick={() => setPeriod(30)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              period === 30 ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Últimos 30 días
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">
                {isLoading ? "-" : stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-foreground">Actividad diaria</h3>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">Visitas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-success" />
              <span className="text-muted-foreground">WhatsApp</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="text-muted-foreground">Llamadas</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
            Cargando...
          </div>
        ) : (
          <div className="flex items-end gap-1 h-40 overflow-x-auto pb-6">
            {dailyStats.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1 min-w-[28px] flex-1">
                <div className="flex items-end gap-0.5 h-28">
                  <div
                    className="w-2 bg-blue-500 rounded-t transition-all"
                    style={{ height: `${(day.profileViews / maxValue) * 100}%`, minHeight: day.profileViews > 0 ? 4 : 0 }}
                  />
                  <div
                    className="w-2 bg-success rounded-t transition-all"
                    style={{ height: `${((day.whatsappClicks * 5) / maxValue) * 100}%`, minHeight: day.whatsappClicks > 0 ? 4 : 0 }}
                  />
                  <div
                    className="w-2 bg-amber-500 rounded-t transition-all"
                    style={{ height: `${((day.callClicks * 5) / maxValue) * 100}%`, minHeight: day.callClicks > 0 ? 4 : 0 }}
                  />
                </div>
                <span className="text-[9px] text-muted-foreground whitespace-nowrap">{day.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground text-sm">Consejo para mejorar</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Los comercios con fotos de productos reciben más clics en WhatsApp. Asegurate de tener imágenes actualizadas en tu perfil.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}