"use client"

import Link from "next/link"
import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { hasCommercialActivity } from "@/lib/commercial"
import {
  BarChart3,
  Briefcase,
  Building2,
  ChevronRight,
  Eye,
  FileText,
  Globe,
  Instagram,
  MessageSquare,
  Package,
  Pencil,
  Phone,
  Plus,
  Settings,
  Sparkles,
  Store,
  Wrench,
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

const fallbackCommercialProfile = {
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

function getListingTypeLabel(type: ListingType) {
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
  const canAccessCommercialPanel = hasCommercialActivity(auth)

  const commercialProfile = useMemo(() => {
    const hasBusinessProfile = Boolean(auth?.commercialActivity?.hasBusinessProfile || auth?.businessProfile)
    const businessName = auth?.businessProfile?.businessName?.trim()

    return {
      type: hasBusinessProfile ? ("business" as const) : ("entrepreneur" as const),
      name: businessName || fallbackCommercialProfile.name,
      category:
        auth?.professionalProfile?.category ||
        (hasBusinessProfile ? "Comercio local" : fallbackCommercialProfile.category),
      description:
        auth?.businessProfile?.description || auth?.professionalProfile?.description || fallbackCommercialProfile.description,
      zone: auth?.profile?.zone || fallbackCommercialProfile.zone,
      whatsapp: auth?.businessProfile?.whatsapp || auth?.profile?.whatsapp || fallbackCommercialProfile.whatsapp,
      instagram: fallbackCommercialProfile.instagram,
      isProfileComplete: Boolean(
        (auth?.businessProfile?.businessName && auth?.businessProfile?.description && auth?.businessProfile?.whatsapp) ||
          (auth?.professionalProfile?.category && auth?.professionalProfile?.description),
      ),
    }
  }, [auth])

  const profileBadge = getProfileTypeBadge(commercialProfile.type)
  const ProfileIcon = profileBadge.icon

  const activity = auth?.commercialActivity
  const stats = [
    {
      label: "Publicaciones en mercado",
      value: String(activity?.marketplaceListingsCount ?? 0),
      icon: Package,
    },
    {
      label: "Servicios activos",
      value: String(activity?.serviceListingsCount ?? 0),
      icon: Wrench,
    },
    {
      label: "Consultas recibidas",
      value: "14",
      icon: MessageSquare,
    },
    {
      label: "Vistas del perfil",
      value: "127",
      icon: Eye,
    },
  ]

  const profileCompletion = useMemo(() => {
    const checks = [
      Boolean(commercialProfile.name),
      Boolean(commercialProfile.description),
      Boolean(commercialProfile.whatsapp),
      Boolean(commercialProfile.zone),
      Boolean(commercialProfile.category),
    ]

    const completed = checks.filter(Boolean).length
    return Math.round((completed / checks.length) * 100)
  }, [commercialProfile])

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
          Gestioná tu perfil, tus publicaciones y el rendimiento de tu actividad comercial dentro de la comunidad.
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

      <Tabs defaultValue="publicaciones" className="gap-4">
        <TabsList className="w-full justify-start overflow-x-auto rounded-xl bg-muted p-1 md:w-fit">
          <TabsTrigger value="publicaciones">Publicaciones</TabsTrigger>
          <TabsTrigger value="perfil">Perfil comercial</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="publicaciones" className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-2xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <h2 className="font-semibold text-foreground">Mis publicaciones</h2>
                  <p className="text-sm text-muted-foreground">
                    Productos y servicios vinculados a tu actividad comercial.
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
                  Mantené productos y servicios activos para mejorar visibilidad y generar más consultas.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="perfil" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-foreground">Perfil comercial</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Revisá los datos que hoy ven los vecinos cuando exploran tu perfil.
                  </p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/profile">
                    <Pencil className="h-4 w-4" />
                    Editar
                  </Link>
                </Button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    Nombre / marca
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{commercialProfile.name}</p>
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Categoría
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{commercialProfile.category}</p>
                </div>

                <div className="rounded-xl border border-border bg-background p-4 md:col-span-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Descripción
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{commercialProfile.description}</p>
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    WhatsApp
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{commercialProfile.whatsapp}</p>
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Instagram className="h-4 w-4 text-muted-foreground" />
                    Instagram
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{commercialProfile.instagram}</p>
                </div>

                <div className="rounded-xl border border-border bg-background p-4 md:col-span-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    Zona
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{commercialProfile.zone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-foreground">Completitud del perfil</h3>
                  <span className="text-sm font-semibold text-foreground">{profileCompletion}%</span>
                </div>
                <Progress className="mt-3" value={profileCompletion} />
                <p className="mt-3 text-sm text-muted-foreground">
                  Cuanto más completo esté el perfil, más confianza genera dentro de la comunidad.
                </p>
              </div>

              <div className="rounded-2xl border border-dashed border-border bg-background p-5">
                <h3 className="font-semibold text-foreground">Próximos pasos</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>• Sumá portada o logo para dar más identidad.</li>
                  <li>• Agregá más publicaciones activas.</li>
                  <li>• Completá redes y datos de contacto.</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="estadisticas" className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
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

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-semibold text-foreground">Resumen de rendimiento</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Vistas del perfil</span>
                    <span className="font-medium text-foreground">127</span>
                  </div>
                  <Progress value={78} />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Clicks a WhatsApp</span>
                    <span className="font-medium text-foreground">38</span>
                  </div>
                  <Progress value={54} />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Consultas recibidas</span>
                    <span className="font-medium text-foreground">14</span>
                  </div>
                  <Progress value={36} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-semibold text-foreground">Lectura rápida</h2>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                <p>
                  Tus productos generan más visibilidad que los servicios, así que conviene mantener ambas líneas activas.
                </p>
                <p>
                  El mayor punto de conversión hoy es WhatsApp. Completar mejor el perfil puede ayudarte a aumentar consultas.
                </p>
                <p>
                  Cuando quieras, el próximo paso puede ser sumar filtros, estados de publicación y métricas por item.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
