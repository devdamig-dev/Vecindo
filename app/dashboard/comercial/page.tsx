"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { hasCommercialActivity } from "@/lib/commercial"
import {
  Briefcase,
  Store,
  Sparkles,
  Plus,
  MessageSquare,
  Eye,
  Package,
  Settings,
  ChevronRight,
  BarChart3,
} from "lucide-react"

type ListingType = "product" | "service"

type RecentListing = {
  id: string
  title: string
  type: ListingType
  status: string
  price: string
  href: string
}

const commercialProfile = {
  type: "entrepreneur" as "entrepreneur" | "business",
  name: "Mikage Deco",
  category: "Decoración y muebles",
  description:
    "Emprendimiento local de muebles y objetos de diseño para el hogar. Trabajamos por pedido y coordinamos entregas en la zona.",
  zone: "Hudson – Berazategui",
  whatsapp: "+54 11 2345 6789",
  instagram: "@mikage.deco",
  isProfileComplete: false,
}

const stats = [
  {
    label: "Publicaciones activas",
    value: "6",
    icon: Package,
  },
  {
    label: "Consultas recibidas",
    value: "14",
    icon: MessageSquare,
  },
  {
    label: "Clicks a WhatsApp",
    value: "38",
    icon: Eye,
  },
  {
    label: "Vistas del perfil",
    value: "127",
    icon: BarChart3,
  },
]

const recentListings: RecentListing[] = [
  {
    id: "1",
    title: "Mesa de comedor de hierro y tapa simil mármol",
    type: "product",
    status: "Disponible",
    price: "$420.000",
    href: "/dashboard/marketplace/1",
  },
  {
    id: "2",
    title: "Rack TV minimalista en madera",
    type: "product",
    status: "Reservado",
    price: "$210.000",
    href: "/dashboard/marketplace/2",
  },
  {
    id: "3",
    title: "Asesoramiento en diseño de espacios",
    type: "service",
    status: "Activo",
    price: "Servicio",
    href: "/dashboard/services",
  },
]

function getProfileTypeBadge(type: "entrepreneur" | "business") {
  if (type === "entrepreneur") {
    return {
      label: "Emprendimiento local",
      className: "bg-amber-100 text-amber-700 hover:bg-amber-100",
      icon: Sparkles,
    }
  }

  return {
    label: "Comercio",
    className: "bg-sky-100 text-sky-700 hover:bg-sky-100",
    icon: Store,
  }
}

function getListingTypeLabel(type: "product" | "service") {
  return type === "product" ? "Producto" : "Servicio"
}

function getListingStatusClass(status: string) {
  const normalized = status.toLowerCase()

  if (normalized.includes("disponible") || normalized.includes("activo")) {
    return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
  }

  if (normalized.includes("reservado")) {
    return "bg-amber-100 text-amber-700 hover:bg-amber-100"
  }

  if (normalized.includes("vendido")) {
    return "bg-muted text-muted-foreground hover:bg-muted"
  }

  return "bg-muted text-muted-foreground hover:bg-muted"
}

export default function ComercialPage() {
  const { auth } = useAuth()
  const profileBadge = getProfileTypeBadge(commercialProfile.type)
  const ProfileIcon = profileBadge.icon
  const canAccessCommercialPanel = hasCommercialActivity(auth)

  if (!canAccessCommercialPanel) {
    return (
      <div className="flex max-w-full flex-col gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
            <Briefcase className="h-3.5 w-3.5" />
            Mi negocio
          </div>
          <h1 className="text-2xl font-bold text-foreground">Mi negocio</h1>
          <p className="text-sm text-muted-foreground">
            Este panel aparece cuando publicás productos, ofrecés servicios o creás tu perfil comercial.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">Todavía no tenés actividad comercial</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Cuando publiques en Mercado, actives tus servicios o crees tu emprendimiento o comercio,
            vas a poder gestionar todo desde acá.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/dashboard/marketplace">Publicar en Mercado</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/services">Ofrecer servicios</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/espacio-comercial">Ir a Espacio comercial</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
          <Briefcase className="h-3.5 w-3.5" />
          Mi negocio
        </div>

        <h1 className="text-2xl font-bold text-foreground">Mi negocio</h1>
        <p className="text-sm text-muted-foreground">
          Gestioná tu perfil, tus publicaciones y las consultas que recibís dentro de la comunidad.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={profileBadge.className}>
                <ProfileIcon className="mr-1 h-3 w-3" />
                {profileBadge.label}
              </Badge>

              <Badge variant="secondary">{commercialProfile.category}</Badge>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">{commercialProfile.name}</h2>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{commercialProfile.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span>{commercialProfile.zone}</span>
              <span>•</span>
              <span>{commercialProfile.instagram}</span>
              <span>•</span>
              <span>{commercialProfile.whatsapp}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/dashboard/marketplace">
                <Plus className="h-4 w-4" />
                Nueva publicación
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/dashboard/profile">
                <Settings className="h-4 w-4" />
                Editar perfil
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {!commercialProfile.isProfileComplete && (
        <div className="rounded-xl border border-dashed border-border bg-background p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Completá tu perfil comercial</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Sumá logo, portada, Instagram y más datos para generar confianza y recibir más consultas.
              </p>
            </div>

            <Button variant="outline">Completar perfil</Button>
          </div>
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <item.icon className="h-4 w-4" />
              <span className="text-sm">{item.label}</span>
            </div>
            <p className="mt-3 text-2xl font-bold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="font-semibold text-foreground">Mis publicaciones</h2>
              <p className="text-sm text-muted-foreground">
                Productos y servicios activos de tu perfil comercial.
              </p>
            </div>

            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/marketplace">Ver todas</Link>
            </Button>
          </div>

          <div className="flex flex-col divide-y divide-border">
            {recentListings.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{getListingTypeLabel(item.type)}</Badge>
                    <Badge className={getListingStatusClass(item.status)}>{item.status}</Badge>
                  </div>

                  <p className="truncate font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.price}</p>
                </div>

                <Button asChild variant="ghost" size="sm">
                  <Link href={item.href}>
                    Ver
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-semibold text-foreground">Accesos rápidos</h2>
            <div className="mt-4 grid gap-2">
              <Button asChild variant="outline" className="justify-between">
                <Link href="/dashboard/marketplace">
                  Gestionar productos
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="justify-between">
                <Link href="/dashboard/services">
                  Gestionar servicios
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="justify-between">
                <Link href="/dashboard/espacio-comercial">
                  Ver espacio comercial
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/40 px-4 py-3">
            <p className="text-sm font-medium text-foreground">Sugerencia</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Completá tu perfil y mantené publicaciones activas para mejorar visibilidad y generar más consultas.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
