"use client"

import Link from "next/link"
import { useMemo } from "react"
import { ActivityChips } from "@/components/activity/activity-chips"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { canAccessMyBusiness, canAccessServiceManagement, hasServiceProviderActivity, isResident } from "@/lib/commercial"
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
  Pencil,
  Phone,
  Plus,
  Megaphone,
  Rocket,
  Settings,
  Sparkles,
  Store,
  Wrench,
} from "lucide-react"
import { getCommerceGrowthInsights } from "@/lib/activity-insights"
import { getCommercialPostsByBusinessId } from "@/lib/commercial-feed"


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

function getProfileTypeBadge(type: "entrepreneur" | "business") {
  if (type === "entrepreneur") {
    return {
      label: "Emprendimiento local",
      className: "bg-violet-100 text-violet-700 hover:bg-violet-100",
      icon: Sparkles,
    }
  }

  return {
    label: "Comercio",
    className: "bg-violet-100 text-violet-700 hover:bg-violet-100",
    icon: Store,
  }
}

export default function ComercialPage() {
  const { auth } = useAuth()
  const canAccessCommercialPanel = canAccessMyBusiness(auth)

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
  const commerceGrowthInsights = getCommerceGrowthInsights(commercialProfile.name)
  const managedBusinessId = auth?.managesCommerceIds?.[0] ?? (commercialProfile.name.toLowerCase().includes("mikage") ? "4" : "2")
  const myCommercialPosts = getCommercialPostsByBusinessId(managedBusinessId)
  const commercialPostStats = myCommercialPosts.reduce(
    (totals, post) => ({
      impressions: totals.impressions + post.analytics.impressions,
      interests: totals.interests + post.analytics.interests,
      saves: totals.saves + post.analytics.saves,
      shares: totals.shares + post.analytics.shares,
    }),
    { impressions: 0, interests: 0, saves: 0, shares: 0 },
  )
  const stats = [
    {
      label: "Publicaciones comerciales",
      value: String(myCommercialPosts.length),
      icon: Megaphone,
    },
    {
      label: "Servicios vinculados",
      value: String(activity?.serviceListingsCount ?? 0),
      icon: Wrench,
    },
    {
      label: "Interés en publicaciones",
      value: String(commercialPostStats.interests),
      icon: MessageSquare,
    },
    {
      label: "Vistas del feed",
      value: String(commercialPostStats.impressions),
      icon: BarChart3,
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
            Panel privado de gestión comercial. Este espacio se habilita cuando activás tu presencia comercial.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">Todavía no tenés un negocio activo</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Cuando crees tu perfil comercial vas a poder gestionar publicaciones, servicios y métricas desde este panel.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/dashboard/profile">Crear perfil comercial</Link>
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
          Panel privado para gestionar tu perfil comercial, publicaciones, servicios y rendimiento dentro de VEZI.
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
            <Button asChild variant="secondary">
              <Link href="/dashboard/espacio-comercial">
                <Eye className="h-4 w-4" />
                Ver perfil público
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/comercial#crear-publicacion">
                <Plus className="h-4 w-4" />
                Crear publicación comercial
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

      <ActivityChips insights={commerceGrowthInsights} limit={4} className="rounded-2xl border border-violet-100 bg-violet-50/60 p-3" />

      <Tabs defaultValue="publicaciones" className="gap-4">
        <TabsList className="scrollbar-hide w-full justify-start overflow-x-auto rounded-xl bg-muted p-1 md:w-fit">
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
                    Novedades, promociones y contenidos profesionales que alimentan el feed comercial.
                  </p>
                </div>

                <Button asChild variant="outline" size="sm">
                  <Link href="/dashboard/espacio-comercial">Ver feed</Link>
                </Button>
              </div>

              <div className="flex flex-col divide-y divide-border">
                {myCommercialPosts.map((post) => (
                  <div key={post.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">Publicación comercial</Badge>
                        <Badge className={post.sponsored ? "bg-amber-100 text-amber-700 hover:bg-amber-100" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"}>{post.sponsored ? "Promocionada" : "Activa"}</Badge>
                        <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100">{post.category}</Badge>
                      </div>

                      <p className="font-medium text-foreground">{post.title}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{post.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>{post.analytics.impressions} vistas</span>
                        <span>•</span>
                        <span>{post.analytics.interests} intereses</span>
                        <span>•</span>
                        <span>{post.analytics.saves} guardados</span>
                      </div>
                    </div>

                    <Button asChild variant="ghost" size="sm">
                      <Link href="/dashboard/espacio-comercial">
                        Ver rendimiento
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
                    <Link href="/dashboard/espacio-comercial">
                      Ver perfil público
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="justify-between">
                    <Link href="/dashboard/comercial#crear-publicacion">
                      Crear publicación comercial
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="justify-between">
                    <Link href="/dashboard/suscripciones">
                      Promocionar publicación
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="justify-between">
                    <Link href="/dashboard/comercial#rendimiento">
                      Ver rendimiento
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="justify-between">
                    <Link href="/dashboard/services/new">
                      Publicar servicio
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div id="crear-publicacion" className="rounded-2xl border border-violet-200 bg-violet-50 p-5">
                <div className="flex items-center gap-2 text-violet-700">
                  <Rocket className="h-5 w-5" />
                  <h2 className="font-semibold">Crear publicación comercial</h2>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prepará una promo, novedad, combo o lanzamiento para el feed. Hoy queda simulado/local, pero la entidad ya separa commercial_posts del Marketplace.
                </p>
                <div className="mt-4 grid gap-2">
                  <Button asChild className="justify-between bg-violet-600 text-white hover:bg-violet-700">
                    <Link href="/dashboard/espacio-comercial">
                      Crear publicación comercial
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-between">
                    <Link href="/dashboard/suscripciones">
                      Promocionar publicación
                      <Megaphone className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/40 px-4 py-3">
                <p className="text-sm font-medium text-foreground">Sugerencia</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Alterná promociones, novedades y lanzamientos para mantener vivo el feed comercial de la zona.
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

        <TabsContent id="rendimiento" value="estadisticas" className="space-y-4">
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
                    <span className="font-medium text-foreground">{commerceGrowthInsights[0].label.split(" ")[0]}</span>
                  </div>
                  <Progress value={78} />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Catálogos abiertos</span>
                    <span className="font-medium text-foreground">{commerceGrowthInsights[1].label.split(" ")[0]}</span>
                  </div>
                  <Progress value={54} />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Pedidos iniciados</span>
                    <span className="font-medium text-foreground">{commerceGrowthInsights[2].label.split(" ")[0]}</span>
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
