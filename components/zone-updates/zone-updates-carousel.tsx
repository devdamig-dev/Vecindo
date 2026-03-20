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

function getAvatarUrl(name: string) {
  const map: Record<string, string> = {
    "Pinturas Express": "https://i.pravatar.cc/150?img=12",
    "Barbería Don": "https://i.pravatar.cc/150?img=33",
    "Sofía L.": "https://i.pravatar.cc/150?img=20",
    "Electricidad Pro": "https://i.pravatar.cc/150?img=47",
    "Jardín Pro": "https://i.pravatar.cc/150?img=54",
    "Diego P.": "https://i.pravatar.cc/150?img=15",
  }

  return map[name] || `https://i.pravatar.cc/150?u=${encodeURIComponent(name)}`
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
      <section aria-label="Novedades de la zona">
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-foreground">
            Novedades de la zona
          </h2>
          <p className="text-xs text-muted-foreground">
            Aún no hay novedades hoy
          </p>
        </div>
      </section>
    )
  }

  return (
    <section aria-label="Novedades de la zona">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Novedades de la Zona</h2>
          <p className="text-xs text-muted-foreground">Promos, turnos y novedades de hoy</p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => scroll("left")}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Desplazar a la izquierda"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Desplazar a la derecha"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide -mx-1 flex gap-3 overflow-x-auto px-1 pb-1"
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
          const avatarUrl = getAvatarUrl(update.author.name)

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
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt={update.author.name}
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