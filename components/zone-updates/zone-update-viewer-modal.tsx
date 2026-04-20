"use client"

import { useEffect, useCallback } from "react"
import Link from "next/link"
import {
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Bookmark,
  Flag,
  ExternalLink,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ZoneUpdate } from "@/hooks/use-zone-updates"

const TYPE_LABELS: Record<string, string> = {
  service: "Servicios",
  business: "Emprendimientos",
  marketplace: "Mercado",
}

const TYPE_BADGE_COLORS: Record<string, string> = {
  service: "bg-primary/20 text-primary-foreground",
  business: "bg-warning/20 text-card-foreground",
  marketplace: "bg-muted text-muted-foreground",
}

const TYPE_FALLBACK_ROUTES: Record<string, string> = {
  service: "/dashboard/services",
  business: "/dashboard/espacio-comercial",
  marketplace: "/dashboard/marketplace",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function formatTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return "hace menos de 1h"
  if (hours < 24) return `hace ${hours}h`
  return `hace ${Math.floor(hours / 24)}d`
}

interface ZoneUpdateViewerModalProps {
  update: ZoneUpdate | null
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  currentIndex: number
  totalCount: number
}

export function ZoneUpdateViewerModal({
  update,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}: ZoneUpdateViewerModalProps) {
  const fallbackRoute = TYPE_FALLBACK_ROUTES[update?.type ?? ""] ?? "/dashboard/services"

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft" && onPrev) onPrev()
      if (e.key === "ArrowRight" && onNext) onNext()
    },
    [onClose, onPrev, onNext]
  )

  useEffect(() => {
    if (!update) return
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [update, handleKeyDown])

  if (!update) return null

  const updateMediaUrl =
    (update as any).mediaUrl ||
    (update as any).image ||
    (Array.isArray((update as any).images) ? (update as any).images[0] : undefined) ||
    "https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=900&h=1400&fit=crop"

  const updateCaption = (update as any).caption || update.description
  const updateCtas =
    Array.isArray((update as any).ctas) && (update as any).ctas.length > 0
      ? (update as any).ctas
      : [{ href: fallbackRoute, label: "Ver más" }]
  const whatsappLink = (update as any).whatsappLink

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 backdrop-blur-sm">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-card/20 text-card backdrop-blur-sm transition-colors hover:bg-card/30"
        aria-label="Cerrar"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Nav arrows */}
      {onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/20 text-card backdrop-blur-sm transition-colors hover:bg-card/30 md:left-4"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/20 text-card backdrop-blur-sm transition-colors hover:bg-card/30 md:right-4"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Content card */}
      <div className="relative mx-auto flex h-[90dvh] w-full max-w-[420px] flex-col overflow-hidden rounded-2xl bg-card shadow-2xl md:h-[85dvh]">
        {/* Progress indicators */}
        <div className="absolute left-0 right-0 top-0 z-10 flex gap-1 px-3 pt-3">
          {Array.from({ length: totalCount }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-0.5 flex-1 rounded-full transition-colors",
                i === currentIndex ? "bg-card" : "bg-card/30"
              )}
            />
          ))}
        </div>

        {/* Image area */}
        <div className="relative flex-1 bg-muted overflow-hidden">
          <img
            src={updateMediaUrl}
            alt={update.title}
            className="h-full w-full object-cover"
            crossOrigin="anonymous"
          />
          {/* Gradient overlay at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

          {/* Author header over image */}
          <div className="absolute left-0 right-0 top-6 flex items-center gap-3 px-4">
            <Avatar className="h-9 w-9 border-2 border-card/50">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {getInitials(update.author.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-card truncate">{update.author.name}</p>
              <p className="text-xs text-card/70">{formatTime(update.createdAt)}</p>
            </div>
            <Badge className={cn("text-[10px] shrink-0", TYPE_BADGE_COLORS[update.type])}>
              {TYPE_LABELS[update.type]}
            </Badge>
          </div>

          {/* Caption over image bottom */}
          <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
            <p className="text-sm leading-relaxed text-card">{updateCaption}</p>
          </div>
        </div>

        {/* Actions bar */}
        <div className="flex flex-col gap-3 border-t border-border bg-card px-4 py-4">
          {/* Primary CTA */}
          <div className="flex gap-2">
            {updateCtas.map((cta: { href: string; label: string }) => (
              <Button key={cta.href} asChild className="flex-1 gap-2">
                <Link href={cta.href || fallbackRoute}>
                  <ExternalLink className="h-4 w-4" />
                  {cta.label}
                </Link>
              </Button>
            ))}
          </div>

          {/* Secondary actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {whatsappLink && (
                <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-3.5 w-3.5" />
                    Contactar
                  </a>
                </Button>
              )}
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
                <Bookmark className="h-3.5 w-3.5" />
                Guardar
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-destructive">
              <Flag className="h-3.5 w-3.5" />
              Reportar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
