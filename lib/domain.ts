/**
 * VEZI domain model — forward-looking entity contracts.
 *
 * These types describe what the backend will expose once it exists.
 * They intentionally mirror the current mock shapes (lib/commerces-data.ts,
 * components/marketplace/marketplace-grid.tsx, components/services/services-list.tsx)
 * but use ids and timestamps instead of inline strings, so the frontend
 * can be migrated table-by-table without rewriting components.
 *
 * Nothing here is wired up yet. It only documents the target contract.
 */

export type ID = string
export type ISODate = string

// users — auth subjects (residents, professionals, commerce owners)
export type AccountType = "resident" | "external_professional"

export type User = {
  id: ID
  accountType: AccountType
  name: string
  avatarInitials: string
  zoneId: ID
  createdAt: ISODate
}

// zones — geographic scopes (e.g. "Hudson – Berazategui")
export type Zone = {
  id: ID
  name: string
  slug: string
}

// businesses — both commerces (with location) and entrepreneurs (no fixed local)
export type BusinessType = "commerce" | "entrepreneur"

export type Business = {
  id: ID
  ownerUserId: ID
  zoneId: ID
  type: BusinessType
  name: string
  category: string
  shortDescription: string
  longDescription: string
  whatsapp: string
  phone: string
  bannerUrl?: string
  logoText: string
  address?: string // nullable for entrepreneurs
  hours?: string
  ratingAvg: number // denormalized aggregate
  reviewsCount: number
  createdAt: ISODate
}

// business_profiles — public-facing presentation, separate from core business
// (badges, meta copy, CTA labels) so it can be edited without touching base data.
export type BusinessProfile = {
  businessId: ID
  badge: string
  meta: string
  cta: string
}

// products — catalog items belonging to a Business
export type Product = {
  id: ID
  businessId: ID
  name: string
  shortDescription: string
  price: number
  imageUrl: string
  active: boolean
  createdAt: ISODate
}

// services — listings under /services (professionals + neighbors offering skills)
export type Service = {
  id: ID
  ownerUserId: ID
  zoneId: ID
  title: string
  category: string
  description: string
  tags: string[]
  ratingAvg: number
  reviewsCount: number
  whatsapp: string
  createdAt: ISODate
}

// marketplace_items — peer-to-peer used/new items between neighbors
export type MarketplaceItem = {
  id: ID
  sellerUserId: ID
  zoneId: ID
  title: string
  category: string
  description: string
  fullDescription: string
  price: number
  images: string[]
  status: "available" | "reserved" | "sold"
  createdAt: ISODate
}

// whatsapp_orders — analytics / lightweight tracking of WhatsApp redirects.
// Persisted server-side; the UI just emits events.
export type WhatsAppOrder = {
  id: ID
  buyerUserId: ID | null // null when not authenticated
  businessId: ID
  items: Array<{ productId: ID; quantity: number; unitPrice: number }>
  totalEstimated: number
  message: string
  createdAt: ISODate
}

// reviews — for businesses, services and marketplace items
export type ReviewableType = "business" | "service" | "marketplace_item"

export type Review = {
  id: ID
  authorUserId: ID
  targetType: ReviewableType
  targetId: ID
  rating: number
  text: string
  verified: boolean
  createdAt: ISODate
}

// saved_items — user bookmarks across modules
export type SavedItemType = "commerce" | "service" | "marketplace_item" | "question"

export type SavedItem = {
  id: ID
  userId: ID
  type: SavedItemType
  targetId: ID
  title: string
  subtitle?: string
  createdAt: ISODate
}

// notifications — system + activity feed
export type NotificationType =
  | "review_received"
  | "order_inquiry"
  | "saved_item_update"
  | "zone_announcement"

export type Notification = {
  id: ID
  userId: ID
  type: NotificationType
  title: string
  body?: string
  href?: string
  readAt: ISODate | null
  createdAt: ISODate
}
