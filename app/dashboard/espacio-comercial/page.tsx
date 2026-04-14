"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Store,
  Sparkles,
  MapPin,
  ChevronRight,
  Briefcase,
  Package,
  Search,
  MessageSquare,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { hasCommercialActivity } from "@/lib/commercial"

const commerceItems = [
  {
    title: "Mueblería Nórdica Hudson",
    description: "Muebles, decoración y objetos para el hogar con atención en la zona.",
    badge: "Geolocalizable",
    meta: "Hudson · Abierto hoy · WhatsApp",
    href: "/dashboard/comercios/3",
  },
  {
    title: "Farmacia de la Zona",
    description: "Atención presencial, asesoramiento y productos de cuidado personal.",
    badge: "Local físico",
    meta: "Berazategui · Dirección visible",
    href: "/dashboard/comercios/1",
  },
]

const entrepreneurItems = [
  {
    title: "Mikage Deco",
    description: "Mesas, racks y muebles hechos a pedido con entrega en la zona.",
    badge: "Catálogo",
    meta: "Emprendimiento local · Respuesta por WhatsApp",
    href: "/dashboard/comercios/4?tipo=emprendimientos",
  },
  {
    title: "Luna Cerámica",
    description: "Piezas artesanales para el hogar, regalos y deco hechas por encargo.",
    badge: "Hecho a pedido",
    meta: "Sin local físico · Entregas coordinadas",
    href: "/dashboard/comercios/5?tipo=emprendimientos",
  },
]

function CommercialPreviewCard({
  title,
  description,
  badge,
  meta,
  href,
  type,
}: {
  title: string
  description: string
  badge: string
  meta: string
  href: string
  type: "commerce" | "entrepreneur"
}) {
  const isCommerce = type === "commerce"

  return (
    <Link
      href={href}
      className={`group rounded-[24px] border p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm ${
        isCommerce ? "border-sky-200 bg-sky-50" : "border-amber-200 bg-amber-50"
      }`}
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
          isCommerce ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"
        }`}
      >
        {isCommerce ? <Store className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <Badge
          className={
            isCommerce
              ? "bg-sky-100 text-sky-700 hover:bg-sky-100"
              : "bg-amber-100 text-amber-700 hover:bg-amber-100"
          }
        >
          {badge}
        </Badge>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

      {/* Señales comerciales */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge
          className={
            isCommerce
              ? "bg-sky-100 text-sky-700 hover:bg-sky-100"
              : "bg-amber-100 text-amber-700 hover:bg-amber-100"
          }
        >
          Catálogo activo
        </Badge>
        <Badge variant="outline" className="gap-1 border-emerald-200 text-emerald-700">
          <MessageSquare className="h-3 w-3" />
          Pedido por WhatsApp
        </Badge>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">{meta}</p>

      <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
        Ver perfil y catálogo
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}

export default function EspacioComercialPage() {
  const { auth } = useAuth()
  const showMyBusiness = hasCommercialActivity(auth)

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
          <Store className="h-3.5 w-3.5" />
          Espacio comercial
        </div>
        <h1 className="text-2xl font-bold text-foreground">Espacio comercial</h1>
        <p className="text-sm text-muted-foreground">
          Explorá perfiles públicos con catálogo activo, sumá productos y pedí por WhatsApp sin checkout complejo.
        </p>
      </div>

      {/* HERO RESUELTO */}
      <div className="rounded-[28px] border border-amber-200 bg-amber-800 p-5 text-white">
        <h2 className="text-lg font-semibold">Un único módulo, dos tipos de perfiles</h2>

        <p className="mt-2 max-w-3xl text-sm text-white/85">
          Tanto comercios como emprendimientos pueden mostrar catálogo público, recibir pedidos simples por WhatsApp
          y compartir su perfil fuera de VEZI.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge className="bg-white/15 text-white hover:bg-white/15">Catálogo activo</Badge>
          <Badge className="bg-white/15 text-white hover:bg-white/15">Pedido por WhatsApp</Badge>
          <Badge className="bg-white/15 text-white hover:bg-white/15">Sin intermediarios</Badge>
        </div>
      </div>

      <Tabs defaultValue="comercios" className="w-full">
        <TabsList className="grid h-auto w-full max-w-[520px] grid-cols-2 gap-2 rounded-2xl bg-muted p-1.5">
          <TabsTrigger value="comercios" className="gap-2 rounded-xl px-4 py-3 text-sm">
            <Store className="h-4 w-4" />
            Comercios
          </TabsTrigger>
          <TabsTrigger value="emprendimientos" className="gap-2 rounded-xl px-4 py-3 text-sm">
            <Sparkles className="h-4 w-4" />
            Emprendimientos locales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="comercios" className="mt-5 space-y-4">
          <div className="rounded-[24px] border border-sky-200 bg-sky-50 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-sky-700">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">Comercios</span>
                </div>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Negocios y locales con dirección visible, horarios y ficha más institucional dentro de la zona.
                </p>
              </div>
              <Button asChild className="bg-sky-600 text-white hover:bg-sky-700">
                <Link href="/dashboard/comercios">Explorar comercios</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {commerceItems.map((item) => (
              <CommercialPreviewCard key={item.title} {...item} type="commerce" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="emprendimientos" className="mt-5 space-y-4">
          <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-700">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-medium">Emprendimientos locales</span>
                </div>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Proyectos y marcas de vecinos que venden productos o servicios sin necesidad de un local físico.
                </p>
              </div>
              <Button asChild className="bg-amber-600 text-white hover:bg-amber-700">
                <Link href="/dashboard/comercios?tipo=emprendimientos">
                  Explorar emprendimientos
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {entrepreneurItems.map((item) => (
              <CommercialPreviewCard key={item.title} {...item} type="entrepreneur" />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-foreground">¿Querés ofrecer algo en la zona?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Publicá productos, ofrecé servicios o activá tu perfil comercial para empezar a aparecer en este módulo.
            </p>
          </div>

          {showMyBusiness ? (
            <Button asChild className="bg-sidebar-primary text-sidebar-primary-foreground hover:opacity-90">
              <Link href="/dashboard/comercial">
                <Briefcase className="mr-2 h-4 w-4" />
                Ir a Mi negocio
              </Link>
            </Button>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link href="/dashboard/marketplace">
                  <Package className="mr-2 h-4 w-4" />
                  Publicar producto
                </Link>
              </Button>
              <Button asChild className="bg-amber-600 text-white hover:bg-amber-700">
                <Link href="/dashboard/services">
                  <Search className="mr-2 h-4 w-4" />
                  Ofrecer servicio
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}