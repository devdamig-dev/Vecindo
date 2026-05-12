"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCommercialFeed } from "@/lib/commercial-feed";
import { useAuth } from "@/lib/auth-context";
import type {
  CommercialFeedItem,
  CommercialPostType,
} from "@/lib/types/commercial-posts";
import {
  ArrowRight,
  Bookmark,
  Heart,
  Package,
  Share2,
  Store,
  Tag,
} from "lucide-react";

const postTypeLabels: Record<CommercialPostType, string> = {
  promotion: "Promoción",
  new_product: "Nuevo producto",
  news: "Novedad",
  combo: "Combo",
  event: "Evento",
  discount: "Descuento",
  launch: "Lanzamiento",
  highlight: "Destacado",
};

const feedFilters = [
  ["todo", "Todo"],
  ["promos", "Promos"],
  ["novedades", "Novedades"],
  ["patrocinados", "Destacados"],
] as const;

const categoryFilters = [
  "Gastronomía",
  "Deco",
  "Moda",
  "Fitness",
  "Tecnología",
  "Servicios",
  "Hogar",
  "Mascotas",
] as const;

type FeedFilter = (typeof feedFilters)[number][0];
type CategoryFilter = "Todo" | (typeof categoryFilters)[number];

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

function matchesCategory(post: CommercialFeedItem, category: CategoryFilter) {
  if (category === "Todo") return true;

  const normalizedCategory = category.toLowerCase();
  const searchableText = [post.category, post.businessCategory, ...post.tags]
    .join(" ")
    .toLowerCase();

  if (normalizedCategory === "gastronomía") {
    return /gastr|panader|café|comida|combo|dulce/.test(searchableText);
  }

  if (normalizedCategory === "deco") {
    return /deco|cerám|hogar|diseño/.test(searchableText);
  }

  if (normalizedCategory === "tecnología") {
    return /tecno|digital|repar|celular|compu/.test(searchableText);
  }

  return searchableText.includes(normalizedCategory);
}

function CommercialPostCard({ post }: { post: CommercialFeedItem }) {
  const { saveItem, isSaved } = useAuth();
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const saved = isSaved(post.title, "commercial_post", post.id);

  return (
    <article className="overflow-hidden rounded-[26px] border border-violet-100 bg-card shadow-[0_10px_28px_rgba(76,29,149,0.06)]">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-sm font-bold text-violet-700">
          {post.businessLogo}
        </div>
        <div className="min-w-0 flex-1">
          <Link
            href={post.businessHref}
            className="line-clamp-1 text-sm font-semibold text-foreground hover:text-violet-700"
          >
            {post.businessName}
          </Link>
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {post.businessCategory} · {post.zone} · {post.timestamp}
          </p>
        </div>
        {(post.sponsored || post.featured) && (
          <Badge className="shrink-0 bg-violet-100 text-violet-700 hover:bg-violet-100">
            {post.sponsored ? "Patrocinado" : "Destacado"}
          </Badge>
        )}
      </div>

      <div className="relative aspect-[4/3] overflow-hidden bg-muted sm:aspect-[16/9]">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
        />
        <div className="absolute left-3 top-3">
          <Badge className="bg-background/90 text-foreground hover:bg-background/90">
            <Tag className="mr-1 h-3 w-3" />
            {postTypeLabels[post.type]}
          </Badge>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-lg font-bold leading-tight text-foreground">
            {post.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        </div>

        {post.productName && (
          <Link
            href={post.productHref ?? post.businessHref}
            className="flex items-center justify-between gap-3 rounded-2xl border border-violet-100 bg-violet-50/70 p-3 transition-colors hover:bg-violet-50"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-700">
                Producto destacado
              </p>
              <p className="line-clamp-1 text-sm font-semibold text-foreground">
                {post.productName}
              </p>
              {post.productPrice && (
                <p className="text-xs text-muted-foreground">
                  {formatPrice(post.productPrice)}
                </p>
              )}
            </div>
            <Package className="h-5 w-5 shrink-0 text-violet-700" />
          </Link>
        )}

        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <button
              type="button"
              onClick={() => setLiked((value) => !value)}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 transition-colors ${
                liked ? "bg-rose-100 text-rose-700" : "hover:bg-muted"
              }`}
            >
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
                  });
                }
              }}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 transition-colors ${
                saved ? "bg-violet-100 text-violet-700" : "hover:bg-muted"
              }`}
            >
              <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
              {post.saves + (saved ? 1 : 0)}
            </button>
            <button
              type="button"
              onClick={() => setShared(true)}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 transition-colors hover:bg-muted"
            >
              <Share2 className="h-4 w-4" />
              {shared ? "Listo" : "Compartir"}
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
              <Button
                asChild
                size="sm"
                className="bg-violet-600 text-white hover:bg-violet-700"
              >
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
  );
}

export function CommercialFeed() {
  const feed = useMemo(() => getCommercialFeed(), []);
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("todo");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("Todo");

  const posts = feed.posts.filter((post) => {
    const typeMatches =
      activeFilter === "todo" ||
      (activeFilter === "promos" &&
        ["promotion", "discount", "combo"].includes(post.type)) ||
      (activeFilter === "novedades" &&
        ["new_product", "news", "launch", "event", "highlight"].includes(
          post.type,
        )) ||
      (activeFilter === "patrocinados" && (post.sponsored || post.featured));

    return typeMatches && matchesCategory(post, activeCategory);
  });

  return (
    <div className="space-y-4">
      <section className="-mx-1 overflow-x-auto px-1 pb-1">
        <div className="flex min-w-max gap-3">
          {feed.stories.map((story) => (
            <Link
              key={story.id}
              href={story.href}
              className="group w-20 shrink-0 text-center"
            >
              <div className="rounded-[24px] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-400 p-[2px]">
                <div className="overflow-hidden rounded-[22px] border-2 border-background bg-muted">
                  <img
                    src={story.imageUrl}
                    alt={story.label}
                    className="h-20 w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </div>
              <p className="mt-1.5 line-clamp-2 text-xs font-medium text-foreground">
                {story.label}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {feedFilters.map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setActiveFilter(value)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeFilter === value
                  ? "bg-violet-600 text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(["Todo", ...categoryFilters] as CategoryFilter[]).map(
            (category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory === category
                    ? "border-violet-600 bg-violet-50 text-violet-700"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ),
          )}
        </div>
      </section>

      <section className="space-y-4">
        {posts.map((post) => (
          <CommercialPostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}
