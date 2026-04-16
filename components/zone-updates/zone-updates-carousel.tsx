"use client"

import { useRef, useState } from "react"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useZoneUpdates } from "@/hooks/use-zone-updates"
import type { ZoneUpdate } from "@/hooks/use-zone-updates"
import { ZoneUpdateViewerModal } from "./zone-update-viewer-modal"
import { CreateZoneUpdateForm } from "./create-zone-update-form"
import { SectionHeader } from "@/components/dashboard/section-header"

const TYPE_COLORS: Record<string, string> = {
  service: "bg-primary/15 text-primary",
  business: "bg-warning/15 text-warning-foreground",
  marketplace: "bg-accent text-accent-foreground",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.max(0, Math.floor(diff / 3600000))

  if (hours < 1) return "ahora"
  if (hours <= 24) return `hace ${hours}h`
  return "hace 24h"
}

function getFallbackImage(update: ZoneUpdate) {
  const byTitle: Record<string, string> = {
    "Promo": "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=300&h=300&fit=crop",
    "Turnos hoy": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop",
    "Novedad": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
    "Disponible": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    "Nuevo servicio": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
    "Oferta": "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop",
  }

  if (byTitle[update.title]) return byTitle[update.title]

  if (update.type === "marketplace") {
    return "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
  }

  if (update.type === "business") {
    return "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=300&h=300&fit=crop"
  }

  return "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop"
}

/**
 * Intenta tomar una imagen real de la novedad si existe.
 * Soporta varias estructuras posibles para no romper el MVP.
 */
function getPreviewImage(update: ZoneUpdate) {
  const candidate =
    (update as any)?.image ||
    (update as any)?.imageUrl ||
    (update as any)?.thumbnail ||
    (update as any)?.thumbnailUrl ||
    (update as any)?.coverImage ||
    (update as any)?.coverUrl ||
    (Array.isArray((update as any)?.images) ? (update as any).images[0] : undefined) ||
    (Array.isArray((update as any)?.media) ? (update as any).media[0] : undefined)

  if (typeof candidate === "string" && candidate.length > 0) return candidate

  if (candidate && typeof candidate === "object") {
    if (typeof candidate.url === "string") return candidate.url
    if (typeof candidate.src === "string") return candidate.src
  }

  return getFallbackImage(update)
}

export function ZoneUpdatesCarousel({ zoneId = "berazategui" }: { zoneId?: string }) {
  const { updates } = useZoneUpdates(zoneId)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [selectedUpdate, setSelectedUpdate] = useState<ZoneUpdate | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [showCreateForm, setShowCreateForm] = useState(false)

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return
    const amount = 200
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    })
  }

  function openUpdate(update: ZoneUpdate, index: number) {
    setSelectedUpdate(update)
    setSelectedIndex(index)
  }

  function navigateUpdate(direction: "prev" | "next") {
    const newIndex = direction === "prev" ? selectedIndex - 1 : selectedIndex + 1
    if (newIndex >= 0 && newIndex < updates.length) {
      setSelectedUpdate(updates[newIndex])
      setSelectedIndex(newIndex)
    }
  }

  if (updates.length === 0) {
    return (
      <section aria-label="Novedades de la zona" className="rounded-[28px] border border-violet-200/70 bg-gradient-to-br from-violet-50 via-background to-sky-50 p-4 shadow-[0_12px_30px_rgba(76,29,149,0.08)]">
        <SectionHeader
          title="Novedades de la zona"
          subtitle="Bloque destacado de historias, promos y actividad local"
          className="mb-1"
        />
        <p className="text-xs text-muted-foreground">Aún no hay novedades hoy</p>
      </section>
    )
  }

  return (
    <section aria-label="Novedades de la zona" className="relative overflow-hidden rounded-[28px] border border-violet-200/70 bg-gradient-to-br from-violet-50 via-background to-sky-50 p-4 shadow-[0_14px_35px_rgba(76,29,149,0.1)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/70 to-transparent" />
      <SectionHeader
        title="Novedades de la zona"
        subtitle="Historias destacadas para mantenerte al día en tu comunidad"
        action={
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll("left")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-200 bg-background/90 text-violet-700 transition-colors hover:bg-violet-100 hover:text-violet-800"
              aria-label="Desplazar a la izquierda"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => scroll("right")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-200 bg-background/90 text-violet-700 transition-colors hover:bg-violet-100 hover:text-violet-800"
              aria-label="Desplazar a la derecha"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        }
      />

      <div
        ref={scrollRef}
        className="scrollbar-hide -mx-1 mt-4 flex gap-3 overflow-x-auto px-1 pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <button
          onClick={() => setShowCreateForm(true)}
          className="group flex shrink-0 flex-col items-center gap-2"
          aria-label="Publicar novedad"
        >
          <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-dashed border-primary/40 bg-primary/5 transition-all group-hover:border-primary group-hover:bg-primary/10">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <span className="w-[76px] truncate text-center text-[11px] font-medium leading-tight text-primary">
            + Publicar
          </span>
        </button>

        {updates.map((update, i) => {
          const previewImage = getPreviewImage(update)

          return (
            <button
              key={update.id}
              onClick={() => openUpdate(update, i)}
              className="group flex shrink-0 flex-col items-center gap-2"
            >
              <div className="relative">
                <div
                  className={cn(
                    "h-[72px] w-[72px] rounded-full p-[3px]",
                    update.type === "service"
                      ? "bg-gradient-to-br from-primary to-primary/60"
                      : update.type === "business"
                      ? "bg-gradient-to-br from-warning to-warning/60"
                      : "bg-gradient-to-br from-muted-foreground to-muted-foreground/60"
                  )}
                >
                  <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-card">
                    <Avatar className="h-full w-full rounded-full">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt={update.title}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <AvatarFallback className="h-full w-full rounded-full bg-muted text-sm font-semibold text-foreground">
                          {getInitials(update.author.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                </div>

                <Badge
                  className={cn(
                    "absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap border-2 border-card px-1.5 py-0 text-[9px] leading-4",
                    TYPE_COLORS[update.type]
                  )}
                >
                  {update.title}
                </Badge>
              </div>

              <div className="w-[76px] text-center">
                <p className="truncate text-[11px] font-medium leading-tight text-foreground">
                  {update.author.name}
                </p>
                <p className="text-[10px] leading-tight text-muted-foreground">
                  {timeAgo(update.createdAt)}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      <ZoneUpdateViewerModal
        update={selectedUpdate}
        onClose={() => setSelectedUpdate(null)}
        onPrev={selectedIndex > 0 ? () => navigateUpdate("prev") : undefined}
        onNext={selectedIndex < updates.length - 1 ? () => navigateUpdate("next") : undefined}
        currentIndex={selectedIndex}
        totalCount={updates.length}
      />

      <CreateZoneUpdateForm
        open={showCreateForm}
        onClose={() => setShowCreateForm(false)}
      />
    </section>
  )
}
