"use client"

import Link from "next/link"
import { MapPin, Store, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { CommerceItem } from "@/lib/commerces-data"

type Props = {
  items: CommerceItem[]
}

const fallbackPositions = [
  { top: "22%", left: "24%" },
  { top: "34%", left: "58%" },
  { top: "55%", left: "42%" },
  { top: "66%", left: "70%" },
  { top: "48%", left: "76%" },
  { top: "28%", left: "72%" },
  { top: "62%", left: "18%" },
  { top: "40%", left: "30%" },
]

function getPosition(index: number) {
  return fallbackPositions[index % fallbackPositions.length]
}

function getDescription(item: CommerceItem) {
  return (
    (item as any).shortDescription ||
    (item as any).description ||
    "Perfil comercial de la zona."
  )
}

export default function ComerciosZoneMap({ items }: Props) {
  const previewItems = items.slice(0, 4)

  return (
    <section className="space-y-4">
      <div className="rounded-[28px] border border-stone-200 bg-white/70 p-5">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <Badge className="bg-[#e9efe6] text-primary hover:bg-[#e9efe6]">
              Mapa zonal
            </Badge>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-stone-950">
                Comercios en tu zona
              </h3>
              <p className="max-w-2xl text-sm text-stone-500">
                Ubicaciones visibles para explorar negocios registrados dentro de
                Hudson – Berazategui. Este bloque diferencia a los comercios con
                local físico de los emprendimientos locales.
              </p>
            </div>
          </div>

          <div className="text-sm text-stone-500">
            <span className="font-medium text-stone-950">{items.length}</span>{" "}
            puntos visibles en el mapa
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.35fr_0.9fr]">
          <div className="relative min-h-[320px] overflow-hidden rounded-[28px] border border-stone-200 bg-gradient-to-br from-[#e9efe6] via-[#eef2ea] to-white">
            <div className="absolute inset-0 opacity-60">
              <div className="absolute left-[8%] top-[18%] h-24 w-24 rounded-full bg-[#dbe7d7]/70 blur-2xl" />
              <div className="absolute right-[10%] top-[22%] h-28 w-28 rounded-full bg-[#d9e4df]/70 blur-2xl" />
              <div className="absolute bottom-[14%] left-[22%] h-36 w-36 rounded-full bg-[#eef2ea] blur-3xl" />
            </div>

            <div className="absolute inset-0">
              <svg viewBox="0 0 100 100" className="h-full w-full opacity-60">
                <path
                  d="M10 66 C22 52, 30 54, 38 46 S58 35, 72 30 S82 24, 90 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  className="text-primary/25"
                />
                <path
                  d="M18 18 C32 22, 46 25, 58 18 S78 20, 88 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="text-primary/18"
                />
                <path
                  d="M12 84 C26 72, 40 76, 54 68 S74 58, 92 64"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="text-primary/18"
                />
                <path
                  d="M28 10 L34 90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="2 3"
                  className="text-primary/25"
                />
                <path
                  d="M58 6 L64 94"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="2 3"
                  className="text-primary/25"
                />
                <path
                  d="M8 46 L94 52"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeDasharray="2 3"
                  className="text-primary/25"
                />
              </svg>
            </div>

            <div className="absolute left-4 top-4 rounded-2xl border border-stone-200 bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold text-stone-950">
                Hudson – Berazategui
              </p>
              <p className="text-xs text-stone-500">
                Exploración geolocalizada de comercios
              </p>
            </div>

            {items.map((item, index) => {
              const position = getPosition(index)

              return (
                <Link
                  key={item.id}
                  href={`/dashboard/comercios/${item.id}`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: position.top, left: position.left }}
                >
                  <div className="relative">
                    <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-md transition group-hover:bg-primary/30" />
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-primary shadow-sm transition group-hover:-translate-y-0.5 group-hover:border-primary/30 group-hover:text-primary group-hover:shadow">
                      <MapPin className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 hidden min-w-[180px] -translate-x-1/2 rounded-2xl border border-stone-200 bg-white p-3 text-left shadow-lg group-hover:block">
                    <p className="line-clamp-1 text-sm font-semibold text-stone-950">
                      {item.name}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                      {getDescription(item)}
                    </p>
                    <p className="mt-2 text-[11px] text-slate-500">
                      {(item as any).location || "Zona visible"}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="space-y-3">
            <div className="rounded-[28px] border border-stone-200 bg-white p-4">
              <div className="mb-3 flex items-center gap-2 text-primary">
                <Store className="h-4 w-4" />
                <h4 className="text-sm font-semibold">Comercios destacados</h4>
              </div>

              <div className="space-y-3">
                {previewItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/dashboard/comercios/${item.id}`}
                    className="block rounded-2xl border border-stone-100 p-3 transition hover:border-stone-200 hover:bg-[#e9efe6]/45"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {item.name}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                          {getDescription(item)}
                        </p>
                        <p className="mt-2 text-[11px] text-slate-500">
                          {(item as any).location || "Zona visible"}
                        </p>
                      </div>
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-white p-4">
              <p className="text-sm font-semibold text-stone-950">
                ¿Cómo leer este mapa?
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Cada pin representa un comercio con local físico visible en la zona.</li>
                <li>• Al entrar al perfil, se priorizan ubicación, horarios y contacto.</li>
                <li>• Los emprendimientos locales se exploran en su propia solapa, sin mapa protagonista.</li>
              </ul>

              <Button
                asChild
                variant="outline"
                className="mt-4 w-full border-stone-200 text-primary hover:bg-[#e9efe6] hover:text-primary"
              >
                <Link href="/dashboard/comercios">Explorar todos los comercios</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}