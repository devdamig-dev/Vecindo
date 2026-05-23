export type CapabilityKey =
  | "offer_services"
  | "has_business"
  | "marketplace_enabled"
  | "sponsor_enabled"

export interface UserCapabilityState {
  key: CapabilityKey
  enabled: boolean
  activatedAt?: string
}

export interface ServiceProfile {
  userId: string
  categories: string[]
  availability?: string
  reputationScore?: number
  responseTimeMinutes?: number
}

export interface BusinessSpaceProfile {
  userId: string
  businessName: string
  showroomEnabled: boolean
  catalogItemsCount: number
  promotionsCount: number
}

export interface SponsorPresence {
  userId: string
  placements: Array<"home_featured" | "stories" | "category_highlight" | "nearby_boost">
  status: "draft" | "active" | "paused"
}

export interface MonetizationPlan {
  id: "base" | "services_pro" | "business" | "sponsor"
  includes: CapabilityKey[]
  limits: {
    monthlyPosts: number
    highlightedStories: number
    feedBoosts: number
  }
}

export const PRODUCT_PRIORITIES = ["services", "commercial_space", "community_help", "marketplace"] as const
