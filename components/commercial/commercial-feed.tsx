"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCommercialFeed } from "@/lib/commercial-feed"
import { useAuth } from "@/lib/auth-context"
import type { CommercialFeedItem, CommercialPostType } from "@/lib/types/commercial-posts"
import {
  ArrowRight,
  Bookmark,
  ExternalLink,
  Heart,
  Megaphone,
  MessageCircle,
  Package,
  Share2,
  Sparkles,
  Store,
  Tag,
} from "lucide-react"

const postTypeLabels: Record<CommercialPostType, string> = {
  promotion: "Promoción",
  new_product: "Nuevo producto",
  news: "Novedad",
  combo: "Combo",
  event: "Evento",
  discount: "Descuento",
  launch: "Lanzamiento",
  highlight: "Destacado",
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(price)
}

function CommercialPostCard({ post }: { post: CommercialFeedItem }) {
  const { saveItem, isSaved } = useAuth()
  const [liked, setLiked] = useState(false)
  const [shared, setShared] = useState(false)
  const saved = isSaved(post.title, "commercial_post", post.id)

  return (
    <article className="overflow-hidden rounded-[28px] border border-violet-100 bg-card shadow-[0_12px_34px_rgba(76,29,149,0.07)]">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-sm font-bold text-violet-700">
          {post.businessLogo}
        </div>
        <div className="min-w-0 flex-1">
          <Link href={post.businessHref} className="line-clamp-1 text-sm font-semibold text-foreground hover:text-violet-700">
            {post.businessName}
          </Link>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {post.businessCategory} · {post.zone} · {post.timestamp}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {post.sponsored && <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Patrocinado</Badge>}
          {post.featured && <Badge className="bg-violet-100 text-violet-700 hover:bg-violet-100">Destacado</Badge>}
        </div>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-[16/9]">
        <img src={post.imageUrl} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge className="bg-background/90 text-foreground hover:bg-background/90">
            <Tag className="mr-1 h-3 w-3" />
            {postTypeLabels[post.type]}
          </Badge>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <h3 className="text-lg font-bold leading-tight text-foreground">{post.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
        </div>

        {post.productName && (
          <Link href={post.productHref ?? post.businessHref} className="flex items-center justify-between gap-3 rounded-2xl border border-violet-100 bg-violet-50/70 p-3 transition-colors hover:bg-violet-50">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-700">Producto relacionado</p>
              <p className="line-clamp-1 text-sm font-semibold text-foreground">{post.productName}</p>
              {post.productPrice && <p className="text-xs text-muted-foreground">{formatPrice(post.productPrice)}</p>}
            </div>
            <Package className="h-5 w-5 shrink-0 text-violet-700" />
          </Link>
        )}

        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <button type="button" onClick={() => setLiked((value) => !value)} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 transition-colors ${liked ? "bg-rose-100 text-rose-700" : "hover:bg-muted"}`}>
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              {post.likes + (liked ? 1 : 0)}
            </button>
            <button
              type="button"
              onClick={() => {
                if (!saved) {
                  saveItem({
                    type: "commercial_post",
                    title: post.title,
                    subtitle: `${post.businessName} · ${post.category}`,
                    targetId: post.id,
                    href: post.businessHref,
                    activity: "Publicación comercial guardada",
                  })
                }
              }}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 transition-colors ${saved ? "bg-violet-100 text-violet-700" : "hover:bg-muted"}`}
            >
              <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
              {post.saves + (saved ? 1 : 0)}
            </button>
            <button type="button" onClick={() => setShared(true)} className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 transition-colors hover:bg-muted">
              <Share2 className="h-4 w-4" />
              {shared ? "Compartido" : "Compartir"}
            </button>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={post.businessHref}>
                <Store className="h-4 w-4" />
                Ver negocio
              </Link>
            </Button>
            {post.cta && (
              <Button asChild size="sm" className="bg-violet-600 text-white hover:bg-violet-700">
                <Link href={post.cta.href}>
                  {post.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export function CommercialFeed() {
  const feed = useMemo(() => getCommercialFeed(), [])
  const [activeFilter, setActiveFilter] = useState<"todo" | "promos" | "novedades" | "patrocinados">("todo")

  const posts = feed.posts.filter((post) => {
    if (activeFilter === "promos") return ["promotion", "discount", "combo"].includes(post.type)
    if (activeFilter === "novedades") return ["new_product", "news", "launch", "event", "highlight"].includes(post.type)
    if (activeFilter === "patrocinados") return post.sponsored || post.featured
    return true
  })

  return (
    <div className="space-y-6">
      <section className="-mx-1 overflow-x-auto px-1 pb-1">
        <div className="flex min-w-max gap-3">
          {feed.stories.map((story) => (
            <Link key={story.id} href={story.href} className="group w-20 shrink-0 text-center">
              <div className="rounded-[24px] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 p-[2px]">
                <div className="overflow-hidden rounded-[22px] border-2 border-background bg-muted">
                  <img src={story.imageUrl} alt={story.label} className="h-20 w-full object-cover transition-transform group-hover:scale-105" />
                </div>
              </div>
              <p className="mt-1.5 line-clamp-2 text-xs font-medium text-foreground">{story.label}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-[24px] border border-violet-100 bg-violet-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Promociones activas</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{feed.activePromotions.length}</p>
          <p className="text-sm text-muted-foreground">Ofertas de negocios locales separadas del Mercado casual.</p>
        </div>
        <div className="rounded-[24px] border border-violet-100 bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Comercios activos</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{feed.featuredBusinesses.length + feed.featuredEntrepreneurs.length}</p>
          <p className="text-sm text-muted-foreground">Perfiles con catálogo, novedades y presencia profesional.</p>
        </div>
        <div className="rounded-[24px] border border-violet-100 bg-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">Productos destacados</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{feed.featuredProducts.length}</p>
          <p className="text-sm text-muted-foreground">Catálogos comerciales, no publicaciones vecinales sueltas.</p>
        </div>
      </section>

      <section className="flex gap-2 overflow-x-auto pb-1">
        {[
          ["todo", "Todo"],
          ["promos", "Promos"],
          ["novedades", "Novedades"],
          ["patrocinados", "Destacados"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setActiveFilter(value as typeof activeFilter)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${activeFilter === value ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            {label}
          </button>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          {posts.map((post) => (
            <CommercialPostCard key={post.id} post={post} />
          ))}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          <div className="rounded-[24px] border border-violet-100 bg-card p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-foreground">Comercios destacados</p>
                <p className="text-xs text-muted-foreground">Locales con actividad reciente</p>
              </div>
              <Store className="h-5 w-5 text-violet-700" />
            </div>
            <div className="space-y-3">
              {feed.featuredBusinesses.map((business) => (
                <Link key={business.id} href={`/dashboard/comercios/${business.id}`} className="flex items-center gap-3 rounded-2xl bg-muted/30 p-3 hover:bg-muted/60">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700">{business.logo}</div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-semibold text-foreground">{business.name}</p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">{business.badge} · {business.location}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-violet-100 bg-card p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <p className="font-semibold text-foreground">Emprendimientos</p>
                <p className="text-xs text-muted-foreground">Marcas locales con catálogo</p>
              </div>
              <Sparkles className="h-5 w-5 text-violet-700" />
            </div>
            <div className="space-y-3">
              {feed.featuredEntrepreneurs.map((business) => (
                <Link key={business.id} href={`/dashboard/comercios/${business.id}?tipo=emprendimientos`} className="flex items-center gap-3 rounded-2xl bg-muted/30 p-3 hover:bg-muted/60">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700">{business.logo}</div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-semibold text-foreground">{business.name}</p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">{business.badge} · {business.location}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 text-amber-800">
              <Megaphone className="h-5 w-5" />
              <p className="font-semibold">Separado de Mercado</p>
            </div>
            <p className="mt-2 text-sm text-amber-900/80">
              Este feed muestra actividad profesional: branding, promos, catálogos y patrocinio. Mercado queda para usados e intercambio vecinal.
            </p>
          </div>

          <div className="rounded-[24px] border border-violet-100 bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-violet-700" />
              <p className="font-semibold text-foreground">Próximo backend</p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Las publicaciones ya tienen business_id, producto relacionado, métricas, estado activo, patrocinio y tags para migrar a Supabase.
            </p>
          </div>
        </aside>
      </section>
    </div>
  )
}
