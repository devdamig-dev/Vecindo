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

const TYPE_LABELS: Record<string, string> = {
  service: "Servicios",
  business: "Emprendimientos",
  marketplace: "Mercado",
}

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
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return "ahora"
  if (hours < 24) return `hace ${hours}h`
  return `hace ${Math.floor(hours / 24)}d`
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

  if (updates.length === 0) return null

  return (
    <section aria-label="Novedades de la zona">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Novedades de la Zona</h2>
          <p className="text-xs text-muted-foreground">Promos, turnos y novedades de hoy</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => scroll("left")}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Publicar button */}
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex flex-col items-center gap-2 shrink-0 group"
          aria-label="Publicar novedad"
        >
          <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-dashed border-primary/40 bg-primary/5 transition-all group-hover:border-primary group-hover:bg-primary/10">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <span className="text-[11px] font-medium text-primary leading-tight text-center w-[76px] truncate">
            + Publicar
          </span>
        </button>

        {/* Update bubbles */}
        {updates.map((update, i) => (
          <button
            key={update.id}
            onClick={() => openUpdate(update, i)}
            className="flex flex-col items-center gap-2 shrink-0 group"
          >
            <div className="relative">
              <div className={cn(
                "h-[72px] w-[72px] rounded-full p-[3px]",
                update.type === "service" ? "bg-gradient-to-br from-primary to-primary/60" :
                update.type === "business" ? "bg-gradient-to-br from-warning to-warning/60" :
                "bg-gradient-to-br from-muted-foreground to-muted-foreground/60"
              )}>
                <div className="flex h-full w-full items-center justify-center rounded-full bg-card overflow-hidden">
                  <Avatar className="h-full w-full rounded-full">
                    <AvatarFallback className="bg-muted text-foreground text-sm font-semibold rounded-full h-full w-full">
                      {getInitials(update.author.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <Badge
                className={cn(
                  "absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] px-1.5 py-0 leading-4 border-2 border-card whitespace-nowrap",
                  TYPE_COLORS[update.type]
                )}
              >
                {update.title}
              </Badge>
            </div>
            <div className="text-center w-[76px]">
              <p className="text-[11px] font-medium text-foreground leading-tight truncate">
                {update.author.name}
              </p>
              <p className="text-[10px] text-muted-foreground leading-tight">
                {timeAgo(update.createdAt)}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Viewer Modal */}
      <ZoneUpdateViewerModal
        update={selectedUpdate}
        onClose={() => setSelectedUpdate(null)}
        onPrev={selectedIndex > 0 ? () => navigateUpdate("prev") : undefined}
        onNext={selectedIndex < updates.length - 1 ? () => navigateUpdate("next") : undefined}
        currentIndex={selectedIndex}
        totalCount={updates.length}
      />

      {/* Create Form */}
      <CreateZoneUpdateForm
        open={showCreateForm}
        onClose={() => setShowCreateForm(false)}
      />
    </section>
  )
}
