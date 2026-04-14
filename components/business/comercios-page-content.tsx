"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { hasCommercialActivity } from "@/lib/commercial"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, Store, Sparkles, MapPin } from "lucide-react"
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
    <article
      className={`rounded-[28px] border p-5 transition hover:-translate-y-0.5 hover:shadow-sm ${
        isCommerce
          ? "border-sky-200 bg-sky-50/40"
          : "border-amber-200 bg-amber-50/40"
      }`}
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${
          isCommerce ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"
        }`}
      >
        {isCommerce ? <Store className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </div>

      <div className="space-y-3">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-[1.15rem] font-semibold tracking-tight text-slate-950">
              {item.name}
            </h3>

            {firstBadge && (
              <Badge variant="secondary" className="font-normal">
                {firstBadge}
              </Badge>
            )}
            <Badge className={isCommerce ? "bg-sky-100 text-sky-700 hover:bg-sky-100" : "bg-amber-100 text-amber-700 hover:bg-amber-100"}>
              {isCommerce ? "Comercio local" : "Emprendimiento local"}
            </Badge>
          </div>

          <p className="line-clamp-2 text-sm text-slate-600">
            {getDescription(item)}
          </p>
        </div>

        <div className="text-xs text-slate-500">
          {isCommerce ? (
            <p>{(item as any).location || "Zona visible"} · Dirección visible</p>
          ) : (
            <p>{(item as any).location || "Zona visible"} · Entregas coordinadas</p>
          )}
        </div>

        <Button asChild variant="link" className="h-auto p-0 text-slate-950">
          <Link href={detailHref}>Ver perfil completo</Link>
        </Button>
      </div>
    </article>
  )
}

export default function ComerciosPageContent({
  activeTab,
  filteredProfiles,
}: Props) {
  const { auth } = useAuth()
  const showMyBusiness = hasCommercialActivity(auth)
  const isCommerceTab = activeTab === "comercios"

  return (
    <div className="space-y-6">
      <div
        className={`rounded-[28px] border p-5 ${
          isCommerceTab
            ? "border-sky-200 bg-sky-50/60"
            : "border-amber-200 bg-amber-50/60"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl ${
              isCommerceTab ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"
            }`}
          >
            {isCommerceTab ? <MapPin className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
          </div>

          <div className="space-y-1">
            <h2
              className={`text-[1.35rem] font-semibold tracking-tight ${
                isCommerceTab ? "text-sky-900" : "text-amber-900"
              }`}
            >
              {isCommerceTab ? "Comercios" : "Emprendimientos locales"}
            </h2>
            <p className="max-w-3xl text-sm text-slate-600">
              {isCommerceTab
                ? "Negocios, marcas y locales de la zona con ficha más institucional, ubicación visible y beneficios para vecinos."
                : "Marcas y proyectos de vecinos que venden productos o servicios en la zona, sin necesidad de un local físico."}
            </p>
          </div>
        </div>
      </div>

      {isCommerceTab && <ComerciosZoneMap items={filteredProfiles} />}

      <section className="grid gap-4 xl:grid-cols-3">
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

      <section className="rounded-[28px] border border-border bg-card p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-tight text-slate-950">
              ¿Querés ofrecer algo en la zona?
            </h3>
            <p className="text-sm text-slate-600">
              Publicá productos, ofrecé servicios o activá tu perfil comercial
              para empezar a aparecer en este módulo.
            </p>
          </div>

          {showMyBusiness ? (
            <Button asChild>
              <Link href="/dashboard/comercial">Ir a Mi negocio</Link>
            </Button>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/dashboard/marketplace">
                  <Package className="mr-2 h-4 w-4" />
                  Publicar en Mercado
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/services">Ofrecer servicios</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
