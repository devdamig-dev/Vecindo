export type MarketplacePostType = "casual_sale" | "used_item" | "swap" | "giveaway" | "neighbor_request"

export type MarketplacePost = {
  id: string
  sellerId: string
  type: MarketplacePostType
  title: string
  description: string
  price?: number
  category: string
  condition?: string
  zone: string
  postedAt: string
  active: boolean
}
