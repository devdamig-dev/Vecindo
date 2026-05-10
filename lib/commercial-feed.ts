import { commerces } from "@/lib/commerces-data"
import { commercialPosts, commercialStories } from "@/lib/mocks/commercial-posts"
import type { CommercialFeedItem, CommercialPost, CommercialStory } from "@/lib/types/commercial-posts"

export type CommercialFeedSection = {
  stories: CommercialStory[]
  posts: CommercialFeedItem[]
  featuredBusinesses: typeof commerces
  featuredEntrepreneurs: typeof commerces
  activePromotions: CommercialFeedItem[]
  featuredProducts: Array<{
    id: string
    businessId: string
    businessName: string
    name: string
    price: number
    imageUrl: string
    href: string
  }>
}

export function enrichCommercialPost(post: CommercialPost): CommercialFeedItem | null {
  const business = commerces.find((commerce) => commerce.id === post.businessId)
  if (!business || !post.active) return null

  const relatedProduct = post.relatedProductId
    ? business.products.find((product) => product.id === post.relatedProductId)
    : undefined

  return {
    ...post,
    businessName: business.name,
    businessType: business.type,
    businessCategory: business.category,
    businessLogo: business.logo,
    businessHref: `/dashboard/comercios/${business.id}${business.type === "entrepreneur" ? "?tipo=emprendimientos" : ""}`,
    productName: relatedProduct?.name,
    productPrice: relatedProduct?.price,
    productHref: relatedProduct ? `/dashboard/comercios/${business.id}${business.type === "entrepreneur" ? "?tipo=emprendimientos" : ""}` : undefined,
  }
}

export function getCommercialFeed(): CommercialFeedSection {
  const posts = commercialPosts
    .map(enrichCommercialPost)
    .filter((post): post is CommercialFeedItem => Boolean(post))

  return {
    stories: commercialStories,
    posts,
    featuredBusinesses: commerces.filter((commerce) => commerce.type === "commerce").slice(0, 3),
    featuredEntrepreneurs: commerces.filter((commerce) => commerce.type === "entrepreneur").slice(0, 3),
    activePromotions: posts.filter((post) => post.type === "promotion" || post.type === "discount" || post.type === "combo"),
    featuredProducts: commerces.flatMap((commerce) =>
      commerce.products.slice(0, 1).map((product) => ({
        id: product.id,
        businessId: commerce.id,
        businessName: commerce.name,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        href: `/dashboard/comercios/${commerce.id}${commerce.type === "entrepreneur" ? "?tipo=emprendimientos" : ""}`,
      })),
    ),
  }
}

export function getCommercialPostsByBusinessId(businessId: string) {
  return commercialPosts.filter((post) => post.businessId === businessId && post.active)
}

export function getFeaturedCommercialPosts(limit = 3) {
  return getCommercialFeed().posts.filter((post) => post.featured || post.sponsored).slice(0, limit)
}
