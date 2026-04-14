"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Store, Sparkles, ChevronRight, MessageSquare } from "lucide-react"
import type { CommerceItem } from "@/lib/commerces-data"

type Props = {
  items: CommerceItem[]
  type: "commerce" | "entrepreneur"
}

export default function ComerciosPageContent({ items, type }: Props) {
  const isCommerce = type === "commerce"

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.id}
          href={`/dashboard/comercios/${item.id}${
            !isCommerce ? "?tipo=emprendimientos" : ""
          }`}
          className={`group rounded-[24px] border p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm ${
            isCommerce ? "border-sky-200 bg-sky-50" : "border-amber-200 bg-amber-50"
          }`}
        >
          {/* Icono */}
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              isCommerce ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"
            }`}
          >
            {isCommerce ? (
              <Store className="h-5 w-5" />
            ) : (
              <Sparkles className="h-5 w-5" />
            )}
          </div>

          {/* Título + badge */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-foreground">{item.name}</h3>
            <Badge
              className={
                isCommerce
                  ? "bg-sky-100 text-sky-700 hover:bg-sky-100"
                  : "bg-amber-100 text-amber-700 hover:bg-amber-100"
              }
            >
              {item.category}
            </Badge>
          </div>

          {/* Descripción */}
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {item.description}
          </p>

          {/* Señales clave */}
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

            <Badge
              variant="outline"
              className="gap-1 border-emerald-200 text-emerald-700"
            >
              <MessageSquare className="h-3 w-3" />
              Pedido por WhatsApp
            </Badge>
          </div>

          {/* Meta */}
          <p className="mt-3 text-xs text-muted-foreground">{item.location}</p>

          {/* CTA */}
          <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
            Ver perfil y catálogo
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>
      ))}
    </div>
  )
}