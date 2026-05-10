export type CommercialPostType =
  | "promotion"
  | "new_product"
  | "news"
  | "combo"
  | "event"
  | "discount"
  | "launch"
  | "highlight"

export type CommercialPostCTA = {
  label: string
  href: string
  intent: "view_business" | "view_product" | "whatsapp" | "book" | "learn_more"
}

export type CommercialPostAnalytics = {
  impressions: number
  interests: number
  saves: number
  shares: number
  profileVisits: number
}

export type CommercialPost = {
  id: string
  businessId: string
  type: CommercialPostType
  title: string
  description: string
  imageUrl: string
  cta?: CommercialPostCTA
  relatedProductId?: string
  timestamp: string
  likes: number
  saves: number
  tags: string[]
  category: string
  zone: string
  featured: boolean
  sponsored: boolean
  active: boolean
  analytics: CommercialPostAnalytics
}

export type CommercialStory = {
  id: string
  businessId: string
  label: string
  imageUrl: string
  tone: "promo" | "launch" | "event" | "catalog" | "featured"
  href: string
}

export type CommercialFeedItem = CommercialPost & {
  businessName: string
  businessType: "commerce" | "entrepreneur"
  businessCategory: string
  businessLogo: string
  businessHref: string
  productName?: string
  productPrice?: number
  productHref?: string
}
