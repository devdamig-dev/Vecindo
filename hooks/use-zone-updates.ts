import { useMemo } from "react"

export type UpdateType = "service" | "business" | "marketplace"

export interface ZoneUpdateCTA {
  label: string
  href: string
  external?: boolean
}

export interface ZoneUpdateAuthor {
  id: string
  name: string
  role: "professional" | "seller" | "resident"
  avatarUrl?: string
}

export interface ZoneUpdate {
  id: string
  zoneId: string
  type: UpdateType
  title: string
  caption: string
  mediaUrl: string
  author: ZoneUpdateAuthor
  createdAt: string
  expiresAt: string
  ctas: ZoneUpdateCTA[]
  whatsappLink?: string
}

const MOCK_UPDATES: ZoneUpdate[] = [
  {
    id: "u1",
    zoneId: "berazategui",
    type: "service",
    title: "Promo",
    caption: "20% de descuento en pintura de interiores durante todo marzo. Incluye materiales premium y garantia de 2 anos. Consulta sin compromiso!",
    mediaUrl: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=900&fit=crop",
    author: {
      id: "a1",
      name: "Pinturas Express",
      role: "professional",
    },
    createdAt: "2026-02-24T08:00:00Z",
    expiresAt: "2026-02-25T08:00:00Z",
    ctas: [{ label: "Ver perfil", href: "/dashboard/services/1" }],
    whatsappLink: "https://wa.me/5491112345678?text=Hola%20vi%20tu%20promo%20en%20Vecindo",
  },
  {
    id: "u2",
    zoneId: "berazategui",
    type: "business",
    title: "Turnos hoy",
    caption: "Quedan 3 turnos disponibles para hoy! Corte + barba $5.500. Reserva tu lugar por WhatsApp antes de que se agoten.",
    mediaUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=900&fit=crop",
    author: {
      id: "a2",
      name: "Barberia Don Carlos",
      role: "professional",
    },
    createdAt: "2026-02-24T07:00:00Z",
    expiresAt: "2026-02-25T07:00:00Z",
    ctas: [{ label: "Ver perfil", href: "/dashboard/services/2" }],
    whatsappLink: "https://wa.me/5491198765432?text=Quiero%20reservar%20turno",
  },
  {
    id: "u3",
    zoneId: "berazategui",
    type: "marketplace",
    title: "Novedad",
    caption: "Bicicleta Mountain Bike R29, poco uso, ideal para el barrio. Incluye casco y candado. Retira por Hudson.",
    mediaUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=900&fit=crop",
    author: {
      id: "a3",
      name: "Sofia L.",
      role: "seller",
    },
    createdAt: "2026-02-23T18:00:00Z",
    expiresAt: "2026-02-24T18:00:00Z",
    ctas: [{ label: "Ver publicacion", href: "/dashboard/marketplace" }],
  },
  {
    id: "u4",
    zoneId: "berazategui",
    type: "service",
    title: "Disponible",
    caption: "Instalacion de aire acondicionado split. Trabajo prolijo y con garantia. Presupuesto gratis por WhatsApp.",
    mediaUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=900&fit=crop",
    author: {
      id: "a4",
      name: "Electricidad Pro",
      role: "professional",
    },
    createdAt: "2026-02-23T14:00:00Z",
    expiresAt: "2026-02-24T14:00:00Z",
    ctas: [{ label: "Ver perfil", href: "/dashboard/services/3" }],
    whatsappLink: "https://wa.me/5491155556666?text=Consulta%20por%20instalacion%20de%20aire",
  },
  {
    id: "u5",
    zoneId: "berazategui",
    type: "business",
    title: "Nuevo servicio",
    caption: "Ahora hacemos limpieza de piletas! Preparate para el verano con nuestro servicio completo de mantenimiento.",
    mediaUrl: "https://images.unsplash.com/photo-1572331165267-854da2b021b1?w=600&h=900&fit=crop",
    author: {
      id: "a5",
      name: "Jardin Pro",
      role: "professional",
    },
    createdAt: "2026-02-23T10:00:00Z",
    expiresAt: "2026-02-24T10:00:00Z",
    ctas: [{ label: "Ver perfil", href: "/dashboard/services/4" }],
    whatsappLink: "https://wa.me/5491144443333?text=Consulta%20por%20piletas",
  },
  {
    id: "u6",
    zoneId: "berazategui",
    type: "marketplace",
    title: "Oferta",
    caption: "Mesa de jardin con 6 sillas de aluminio, excelente estado. Ideal para el patio. Se retira por la puerta principal.",
    mediaUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=900&fit=crop",
    author: {
      id: "a6",
      name: "Diego P.",
      role: "seller",
    },
    createdAt: "2026-02-22T20:00:00Z",
    expiresAt: "2026-02-23T20:00:00Z",
    ctas: [{ label: "Ver publicacion", href: "/dashboard/marketplace" }],
  },
]

export function useZoneUpdates(zoneId: string) {
  const updates = useMemo(
    () => MOCK_UPDATES.filter((u) => u.zoneId === zoneId),
    [zoneId]
  )

  return { updates }
}
