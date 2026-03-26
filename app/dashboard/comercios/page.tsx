"use client"

export const dynamic = "force-dynamic"

import Link from "next/link"
import { useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, Sparkles, MapPin, ChevronRight, Briefcase, Clock3, Search, Package } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { hasCommercialActivity } from "@/lib/commercial"

type CommercialType = "commerce" | "entrepreneur"

export const commerces = [
    {
    id: "1",
    type: "commerce" as CommercialType,
    title: "Farmacia de la Zona",
    description: "Atención presencial, dermocosmética, perfumería y asesoramiento para vecinos.",
    badge: "Local físico",
    location: "Berazategui",
    meta: "Abierto hoy · Dirección visible",
    cta: "Ver comercio",
  },
  {
    id: "2",
    type: "commerce" as CommercialType,
    title: "Punto Café",
    description: "Cafetería y pastelería con combos, promos del día y beneficios para la comunidad.",
    badge: "Promos activas",
    location: "Plátanos",
    meta: "Retiro por local · WhatsApp",
    cta: "Ver comercio",
  },
  {
    id: "3",
    type: "commerce" as CommercialType,
    title: "Mueblería Nórdica Hudson",
    description: "Muebles, deco y objetos para el hogar con showroom y atención en la zona.",
    badge: "Showroom",
    location: "Hudson",
    meta: "Catálogo + atención local",
    cta: "Ver comercio",
  },
  {
    id: "4",
    type: "entrepreneur" as CommercialType,
    title: "Mikage Deco",
    description: "Mesas, racks y muebles a pedido hechos por un emprendimiento local con entregas coordinadas.",
    badge: "Catálogo",
    location: "Zona Hudson - Berazategui",
    meta: "Sin local físico · Respuesta por WhatsApp",
    cta: "Ver emprendimiento",
  },
  {
    id: "5",
    type: "entrepreneur" as CommercialType,
    title: "Luna Cerámica",
    description: "Piezas artesanales para el hogar, regalos y deco realizadas por encargo.",
    badge: "Hecho a pedido",
    location: "Zona Hudson - Berazategui",
    meta: "Producción local · Entregas coordinadas",
    cta: "Ver emprendimiento",
  },
  {
    id: "6",
    type: "entrepreneur" as CommercialType,
    title: "Dulce Sur",
    description: "Tortas, boxes y mesas dulces personalizadas para cumpleaños y fechas especiales.",
    badge: "Por encargo",
    location: "Zona Hudson - Berazategui",
    meta: "Pedidos anticipados · Atención directa",
    cta: "Ver emprendimiento",
  },
]

function CommercialListCard({ item }: { item: (typeof commerces)[number] }) {
  const isCommerce = item.type === "commerce"

  return (
    <Link
      href="#"
      className={`group rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm ${
        isCommerce ? "border-sky-200 bg-sky-50" : "border-amber-200 bg-amber-50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              isCommerce ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"
            }`}
          >
            {isCommerce ? <Store className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
            <Badge variant="secondary">{item.badge}</Badge>
          </div>
        </div>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

      <div className="mt-4 space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5" />
          <span>{item.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock3 className="h-3.5 w-3.5" />
          <span>{item.meta}</span>
        </div>
      </div>

      <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
        {item.cta}
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}

export default function ComerciosPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { auth } = useAuth()
  const showMyBusiness = hasCommercialActivity(auth)

  const tipo = searchParams.get("tipo")
  const activeTab = tipo === "emprendimientos" ? "emprendimientos" : "comercios"

  const filteredProfiles = useMemo(() => {
    return commerces.filter((item) =>
      activeTab === "emprendimientos" ? item.type === "entrepreneur" : item.type === "commerce"
    )
  }, [activeTab])

  const handleTabChange = (value: string) => {
    if (value === "emprendimientos") {
      router.push("/dashboard/comercios?tipo=emprendimientos")
      return
    }

    router.push("/dashboard/comercios")
  }

  const isCommerceTab = activeTab === "comercios"

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
          <Store className="h-3.5 w-3.5" />
          Espacio comercial
        </div>

        <h1 className="text-2xl font-bold text-foreground">
          {isCommerceTab ? "Comercios" : "Emprendimientos locales"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isCommerceTab
            ? "Explorá negocios, locales y marcas de la zona con presencia comercial más institucional."
            : "Explorá marcas y proyectos independientes de vecinos que venden productos o servicios en la zona."}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
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
      </Tabs>

      <div
        className={`rounded-xl border p-4 ${
          isCommerceTab ? "border-sky-200 bg-sky-50" : "border-amber-200 bg-amber-50"
        }`}
      >
        <div className={`flex items-center gap-2 ${isCommerceTab ? "text-sky-700" : "text-amber-700"}`}>
          {isCommerceTab ? <MapPin className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
          <span className="font-medium">
            {isCommerceTab ? "Perfiles comerciales con ubicación visible" : "Perfiles comerciales sin local físico"}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          {isCommerceTab
            ? "Acá se muestran locales, negocios y marcas que pueden presentarse con dirección, horarios, ficha institucional y beneficios para vecinos."
            : "Acá se muestran proyectos independientes y marcas locales que se apoyan en su perfil, catálogo y contacto, sin depender de una geolocalización fija."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProfiles.map((item) => (
          <CommercialListCard key={item.id} item={item} />
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-foreground">¿Querés aparecer en este módulo?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Podés empezar publicando productos, ofreciendo servicios o activando tu perfil comercial dentro del ecosistema.
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
    </div>
  )
}
