"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { canAccessMyBusiness } from "@/lib/commercial"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Sparkles, MapPin, Lock, ArrowRight, Star } from "lucide-react"
import ComerciosZoneMap from "@/components/business/comercios-zone-map"
import type { CommerceItem } from "@/lib/commerces-data"

type Props = {
  activeTab: "comercios" | "emprendimientos"
  filteredProfiles: CommerceItem[]
}

function getDescription(item: CommerceItem) {
  return (
    (item as any).shortDescription ||
    (item as any).description ||
    "Perfil comercial de la zona."
  )
}

function getFirstBadge(item: CommerceItem) {
  if (Array.isArray((item as any).badges) && (item as any).badges.length > 0) {
    return (item as any).badges[0]
  }

  if ((item as any).tag) return (item as any).tag
  if ((item as any).category) return (item as any).category

  return null
}

function CommercialListCard({
  item,
  activeTab,
}: {
  item: CommerceItem
  activeTab: "comercios" | "emprendimientos"
}) {
  const detailHref =
    activeTab === "emprendimientos"
      ? `/dashboard/comercios/${item.id}?tipo=emprendimientos`
      : `/dashboard/comercios/${item.id}`

  const isCommerce = item.type === "commerce"
  const firstBadge = getFirstBadge(item)

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-stone-200/75 bg-white shadow-[0_18px_55px_rgba(44,39,31,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(44,39,31,0.11)]">
      <Link href={detailHref} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
          <img
            src={item.bannerUrl}
            alt={item.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {firstBadge && (
              <Badge className="rounded-full bg-white/88 px-3 py-1 text-stone-700 shadow-sm backdrop-blur hover:bg-white">
                {firstBadge}
              </Badge>
            )}
            <Badge className="rounded-full bg-[#e9efe6]/92 px-3 py-1 text-primary shadow-sm backdrop-blur hover:bg-[#e9efe6]">
              Catálogo activo
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-stone-700 shadow-sm backdrop-blur">
            {isCommerce ? "Comercio local" : "Marca local"}
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="line-clamp-1 text-xl font-semibold tracking-[-0.03em] text-stone-950">
                {item.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-stone-500">{item.category}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              {item.rating.toFixed(1)}
            </span>
          </div>

          <p className="mt-4 line-clamp-2 text-sm leading-6 text-stone-600">
            {getDescription(item)}
          </p>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
            <span className="inline-flex min-w-0 items-center gap-2 text-sm text-stone-500">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate">{(item as any).location || "Zona visible"}</span>
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-stone-950">
              Ver perfil
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default function ComerciosPageContent({
  activeTab,
  filteredProfiles,
}: Props) {
  const { auth } = useAuth()
  const showMyBusiness = canAccessMyBusiness(auth)
  const isCommerceTab = activeTab === "comercios"

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-[2.25rem] border border-stone-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(44,39,31,0.06)] md:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#e9efe6] px-3 py-1.5 text-sm font-medium text-primary">
              {isCommerceTab ? <MapPin className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
              Explorar cerca tuyo
            </div>
            <h2 className="max-w-3xl font-serif text-4xl leading-tight tracking-[-0.035em] text-stone-950 md:text-5xl">
              {isCommerceTab ? "Comercios para descubrir hoy" : "Marcas locales con catálogo propio"}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
              {isCommerceTab
                ? "Negocios de la zona con imagen, confianza y contacto directo. Menos ficha técnica, más decisión visual."
                : "Emprendimientos cercanos presentados como mini marcas, con productos claros y atención directa."}
            </p>
          </div>

          <aside className="rounded-[1.75rem] border border-stone-200 bg-stone-50/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Filtros simples</p>
            <div className="mt-4 flex flex-wrap gap-2 lg:flex-col">
              <span className="rounded-full bg-white px-3 py-2 text-sm text-stone-700 shadow-sm">Catálogo activo</span>
              <span className="rounded-full bg-white px-3 py-2 text-sm text-stone-700 shadow-sm">WhatsApp disponible</span>
              <span className="rounded-full bg-white px-3 py-2 text-sm text-stone-700 shadow-sm">Zona visible</span>
            </div>
          </aside>
        </div>
      </div>

      {isCommerceTab && <div className="opacity-80"><ComerciosZoneMap items={filteredProfiles} /></div>}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProfiles.map((item) => (
          <CommercialListCard key={item.id} item={item} activeTab={activeTab} />
        ))}
      </section>

      <div className="flex justify-start">
        <Button asChild variant="outline">
          <Link
            href={
              isCommerceTab
                ? "/dashboard/comercios"
                : "/dashboard/comercios?tipo=emprendimientos"
            }
          >
            {isCommerceTab ? "Ver todos los comercios" : "Ver todos los emprendimientos"}
          </Link>
        </Button>
      </div>

      <section className="rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-[0_18px_55px_rgba(44,39,31,0.055)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-tight text-slate-950">
              ¿Querés ofrecer algo en la zona?
            </h3>
            <p className="text-sm text-slate-600">
              Activá un perfil comercial claro para aparecer donde las personas vienen a descubrir opciones locales.
            </p>
          </div>

          {showMyBusiness ? (
            <div className="flex flex-col items-end gap-1">
              <Button asChild className="shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-200 hover:scale-[1.01]">
                <Link href="/dashboard/comercial">Ir a Mi negocio</Link>
              </Button>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground"><Lock className="h-3 w-3" />Panel privado de tu cuenta</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/dashboard/marketplace">
                  <Package className="mr-2 h-4 w-4" />
                  Publicar producto
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/services/new">Ofrecer servicios</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
