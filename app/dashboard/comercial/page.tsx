"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, Sparkles, MapPin, ChevronRight, Briefcase, Package, Search } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { hasCommercialActivity } from "@/lib/commercial"

const commerceItems = [
  {
    title: "Mueblería Nórdica Hudson",
    description: "Muebles, decoración y objetos para el hogar con atención en la zona.",
    badge: "Geolocalizable",
    meta: "Hudson · Abierto hoy · WhatsApp",
    href: "/dashboard/comercios",
  },
  {
    title: "Farmacia de la Zona",
    description: "Atención presencial, asesoramiento y productos de cuidado personal.",
    badge: "Local físico",
    meta: "Berazategui · Dirección visible",
    href: "/dashboard/comercios",
  },
  {
    title: "Punto Café",
    description: "Cafetería y pastelería con promos para vecinos y retiro por local.",
    badge: "Promos activas",
    meta: "Plátanos · Beneficios Vecindo",
    href: "/dashboard/comercios",
  },
]

const entrepreneurItems = [
  {
    title: "Mikage Deco",
    description: "Mesas, racks y muebles hechos a pedido con entrega en la zona.",
    badge: "Catálogo",
    meta: "Emprendimiento local · Respuesta por WhatsApp",
    href: "/dashboard/comercios?tipo=emprendimientos",
  },
  {
    title: "Luna Cerámica",
    description: "Piezas artesanales para el hogar, regalos y deco hechas por encargo.",
    badge: "Hecho a pedido",
    meta: "Sin local físico · Entregas coordinadas",
    href: "/dashboard/comercios?tipo=emprendimientos",
  },
  {
    title: "Dulce Sur",
    description: "Tortas y boxes personalizados para cumpleaños, eventos y fechas especiales.",
    badge: "Por encargo",
    meta: "Producción local · Pedidos anticipados",
    href: "/dashboard/comercios?tipo=emprendimientos",
  },
]

function CommercialCard({
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
      className={`group rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm ${
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
        <Badge variant="secondary">{badge}</Badge>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <p className="mt-3 text-xs text-muted-foreground">{meta}</p>

      <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
        Ver perfil
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
          Explorá perfiles comerciales de la zona y descubrí tanto comercios como emprendimientos locales.
        </p>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-800 p-5 text-white">
        <h2 className="text-lg font-semibold">Un único módulo, dos tipos de perfiles</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/80">
          En Espacio comercial reunimos negocios con local físico y también proyectos independientes de la comunidad.
          Los comercios pueden mostrarse con ubicación y ficha institucional, mientras que los emprendimientos locales
          destacan su marca, catálogo y contacto, aunque no tengan un punto fijo.
        </p>
      </div>

      <Tabs defaultValue="comercios" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="comercios" className="gap-2">
            <Store className="h-4 w-4" />
            Comercios
          </TabsTrigger>
          <TabsTrigger value="emprendimientos" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Emprendimientos locales
          </TabsTrigger>
        </TabsList>

        <TabsContent value="comercios" className="mt-4 space-y-4">
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
            <div className="flex items-center gap-2 text-sky-700">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">Comercios</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Negocios, marcas y locales de la zona con ficha más institucional, ubicación visible y beneficios para vecinos.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {commerceItems.map((item) => (
              <CommercialCard key={item.title} {...item} type="commerce" />
            ))}
          </div>

          <div className="flex justify-start">
            <Button asChild variant="outline">
              <Link href="/dashboard/comercios">Ver todos los comercios</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="emprendimientos" className="mt-4 space-y-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 text-amber-700">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">Emprendimientos locales</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Marcas y proyectos de vecinos que venden productos o servicios en la zona, sin necesidad de un local físico.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {entrepreneurItems.map((item) => (
              <CommercialCard key={item.title} {...item} type="entrepreneur" />
            ))}
          </div>

          <div className="flex justify-start">
            <Button asChild variant="outline">
              <Link href="/dashboard/comercios?tipo=emprendimientos">Ver todos los emprendimientos</Link>
            </Button>
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
                <Briefcase className="h-4 w-4" />
                Ir a Mi negocio
              </Link>
            </Button>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link href="/dashboard/marketplace">
                  <Package className="h-4 w-4" />
                  Publicar en Mercado
                </Link>
              </Button>
              <Button asChild className="bg-amber-600 text-white hover:bg-amber-700">
                <Link href="/dashboard/services">
                  <Search className="h-4 w-4" />
                  Ofrecer servicios
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="font-semibold text-foreground">Diferencia principal</h3>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
            <div className="flex items-center gap-2 text-sky-700">
              <Store className="h-4 w-4" />
              <span className="font-medium">Comercio</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Tiene una ficha más institucional y puede mostrarse con dirección, horarios, ubicación y atención en un punto físico.
            </p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 text-amber-700">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">Emprendimiento local</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Tiene perfil comercial y catálogo, pero no depende de una geolocalización fija: se apoya más en marca, productos y contacto.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
