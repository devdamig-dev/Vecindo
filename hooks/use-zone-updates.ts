"use client"

import { useMemo, useState } from "react"

export type ZoneUpdateType = "service" | "business" | "marketplace"

export interface ZoneUpdateAuthor {
  name: string
  avatarUrl?: string
}

export interface ZoneUpdate {
  id: string
  zoneId: string
  type: ZoneUpdateType
  title: string
  subtitle?: string
  description: string
  createdAt: string
  expiresAt?: string
  image?: string
  images?: string[]
  author: ZoneUpdateAuthor
}

const MOCK_UPDATES: ZoneUpdate[] = [
  {
    id: "zu-1",
    zoneId: "berazategui",
    type: "service",
    title: "Promo",
    subtitle: "Pinturas Express",
    description: "20% off en pintura exterior durante esta semana.",
    createdAt: new Date(Date.now() - 23 * 3600000).toISOString(),
    expiresAt: new Date(Date.now() + 1 * 3600000).toISOString(),
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop",
    author: {
      name: "Pinturas Express",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
    },
  },
  {
    id: "zu-2",
    zoneId: "berazategui",
    type: "business",
    title: "Turnos hoy",
    subtitle: "Barbería Don",
    description: "Quedan turnos disponibles para hoy por la tarde.",
    createdAt: new Date(Date.now() - 23 * 3600000).toISOString(),
    expiresAt: new Date(Date.now() + 1 * 3600000).toISOString(),
    image:
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=400&h=400&fit=crop",
    author: {
      name: "Barbería Don",
      avatarUrl: "https://i.pravatar.cc/150?img=33",
    },
  },
  {
    id: "zu-3",
    zoneId: "berazategui",
    type: "marketplace",
    title: "Novedad",
    subtitle: "Sofía L.",
    description: "Nuevo anuncio cargado en Mercado: bicicleta urbana impecable.",
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    expiresAt: new Date(Date.now() + 0.5 * 3600000).toISOString(),
    image:
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=400&h=400&fit=crop",
    author: {
      name: "Sofía L.",
      avatarUrl: "https://i.pravatar.cc/150?img=20",
    },
  },
  {
    id: "zu-4",
    zoneId: "berazategui",
    type: "service",
    title: "Disponible",
    subtitle: "Electricidad Pro",
    description: "Disponibilidad inmediata para urgencias eléctricas esta tarde.",
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    expiresAt: new Date(Date.now() + 0.5 * 3600000).toISOString(),
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop",
    author: {
      name: "Electricidad Pro",
      avatarUrl: "https://i.pravatar.cc/150?img=47",
    },
  },
  {
    id: "zu-5",
    zoneId: "berazategui",
    type: "service",
    title: "Nuevo servicio",
    subtitle: "Jardín Pro",
    description: "Se suma servicio de poda, mantenimiento y paisajismo.",
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
    expiresAt: new Date(Date.now() + 0.5 * 3600000).toISOString(),
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=400&fit=crop",
    author: {
      name: "Jardín Pro",
      avatarUrl: "https://i.pravatar.cc/150?img=54",
    },
  },
  {
    id: "zu-6",
    zoneId: "berazategui",
    type: "marketplace",
    title: "Oferta",
    subtitle: "Diego P.",
    description: "Baja de precio en una parrilla publicada en Mercado.",
    createdAt: new Date(Date.now() - 25 * 3600000).toISOString(),
    expiresAt: new Date(Date.now() - 1 * 3600000).toISOString(),
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=400&fit=crop",
    author: {
      name: "Diego P.",
      avatarUrl: "https://i.pravatar.cc/150?img=15",
    },
  },
]

export function useZoneUpdates(zoneId: string) {
  const [updates] = useState<ZoneUpdate[]>(MOCK_UPDATES)

  const activeUpdates = useMemo(() => {
    const now = Date.now()

    return updates
      .filter((update) => update.zoneId === zoneId)
      .filter((update) => {
        if (!update.expiresAt) return true
        return new Date(update.expiresAt).getTime() > now
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  }, [updates, zoneId])

  return {
    updates: activeUpdates,
  }
}