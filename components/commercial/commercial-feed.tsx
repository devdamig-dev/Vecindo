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
  MapPin,
  Package,
  Share2,
  ShieldCheck,
  Sparkles,
  Store,
  Tag,
  TrendingUp,
  Zap,
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

function getPostTrustSignals(post: CommercialFeedItem) {
  const signals = [
    { label: post.sponsored ? "Patrocinado" : "Verificado", icon: ShieldCheck, className: "text-emerald-700" },
  ];

  if (post.timestamp.includes("min") || post.timestamp.includes("1 h")) {
    signals.push({ label: "Nuevo en tu zona", icon: Sparkles, className: "text-violet-700" });
  }

  if (post.likes >= 40 || post.saves >= 18) {
    signals.push({ label: "Popular en Hudson", icon: TrendingUp, className: "text-amber-700" });
  } else if (post.featured || post.sponsored) {
    signals.push({ label: "Muy visitado", icon: Zap, className: "text-violet-700" });
  }

  return signals.slice(0, 3);
}

function CommercialPostSkeleton() {
  return (
    <article className="rounded-[28px] border border-violet-100/70 bg-card p-4 shadow-[0_12px_32px_rgba(76,29,149,0.05)]">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-muted animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-36 rounded-full bg-muted animate-pulse" />
          <div className="h-3 w-48 rounded-full bg-muted/80 animate-pulse" />
        </div>
      </div>
      <div className="mt-4 aspect-[4/3] rounded-[24px] bg-muted animate-pulse sm:aspect-[16/9]" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 rounded-full bg-muted animate-pulse" />
        <div className="h-3 w-full rounded-full bg-muted/80 animate-pulse" />
      </div>
    </article>
  );
}

function CommercialPostCard({ post }: { post: CommercialFeedItem }) {
  const { saveItem, isSaved } = useAuth();
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const saved = isSaved(post.title, "commercial_post", post.id);
  const signals = getPostTrustSignals(post);

  return (
    <article className="group overflow-hidden rounded-[30px] border border-violet-100/80 bg-card shadow-[0_14px_34px_rgba(76,29,149,0.055)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_18px_42px_rgba(76,29,149,0.09)] active:scale-[0.995]">
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-violet-100 bg-violet-50 text-sm font-bold text-violet-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
          {post.businessLogo}
        </div>
        <div className="min-w-0 flex-1">
          <Link
            href={post.businessHref}
            className="line-clamp-1 text-sm font-semibold text-foreground transition-colors hover:text-violet-700"
          >
            {post.businessName}
          </Link>
          <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">
              {post.zone} · {post.timestamp}
            </span>
          </p>
        </div>
        {(post.sponsored || post.featured) && (
          <Badge className="shrink-0 rounded-full border border-violet-200/70 bg-violet-50 px-2.5 py-1 text-[10px] font-semibold text-violet-700 shadow-none hover:bg-violet-50">
            {post.sponsored ? "Patrocinado" : "Muy visitado"}
          </Badge>
        )}
      </div>

      <div className="relative mx-3 aspect-[4/3] overflow-hidden rounded-[24px] bg-muted sm:aspect-[16/9]">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        <div className="absolute left-3 top-3">
          <Badge className="rounded-full border border-white/35 bg-background/88 text-[11px] text-foreground shadow-sm backdrop-blur-md hover:bg-background/88">
            <Tag className="mr-1 h-3 w-3" />
            {postTypeLabels[post.type]}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {signals.map(({ label, icon: Icon, className }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/88 px-2 py-1 text-[10px] font-semibold shadow-sm backdrop-blur-md ${className}`}
              >
                <Icon className="h-3 w-3" />
                {label}
              </span>
            ))}
          </div>
          <span className="shrink-0 rounded-full bg-black/35 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-md">
            {post.businessCategory}
          </span>
        </div>
      </div>

      <div className="space-y-4 p-4 pt-4">
        <div>
          <h3 className="text-[17px] font-bold leading-tight text-foreground">
            {post.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        </div>

        {post.productName && (
          <Link
            href={post.productHref ?? post.businessHref}
            className="flex items-center justify-between gap-3 rounded-[20px] border border-violet-100 bg-violet-50/55 p-3 transition-all duration-200 hover:border-violet-200 hover:bg-violet-50 active:scale-[0.99]"
          >
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-700">
                Producto destacado
              </p>
              <p className="mt-0.5 line-clamp-1 text-sm font-semibold text-foreground">
                {post.productName}
              </p>
              {post.productPrice && (
                <p className="text-xs text-muted-foreground">
                  {formatPrice(post.productPrice)} · cerca tuyo
                </p>
              )}
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-violet-700 shadow-sm">
              <Package className="h-4 w-4" />
            </div>
          </Link>
        )}

        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <button
              type="button"
              onClick={() => setLiked((value) => !value)}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 transition-all duration-200 active:scale-95 ${
                liked ? "bg-rose-100 text-rose-700" : "hover:bg-muted hover:text-foreground"
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
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 transition-all duration-200 active:scale-95 ${
                saved ? "bg-violet-100 text-violet-700" : "hover:bg-muted hover:text-foreground"
              }`}
            >
              <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
              {saved ? "Guardado" : post.saves}
            </button>
            <button
              type="button"
              onClick={() => setShared(true)}
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-95"
            >
              <Share2 className="h-4 w-4" />
              {shared ? "Listo" : "Compartir"}
            </button>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link href={post.businessHref}>
                <Store className="h-4 w-4" />
                Ver negocio
              </Link>
            </Button>
            {post.cta && (
              <Button
                asChild
                size="sm"
                className="rounded-full bg-violet-600 text-white shadow-[0_8px_18px_rgba(124,58,237,0.18)] transition-all hover:bg-violet-700 active:scale-[0.98]"
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
    <div className="space-y-5">
      <section className="scrollbar-hide -mx-1 overflow-x-auto px-1 pb-1 pt-0.5">
        <div className="flex min-w-max gap-3.5">
          {feed.stories.map((story) => (
            <Link
              key={story.id}
              href={story.href}
              className="group w-[78px] shrink-0 text-center transition-transform duration-200 active:scale-95"
            >
              <div className="rounded-[24px] bg-gradient-to-br from-violet-500/90 via-fuchsia-500/85 to-amber-300/90 p-[1.5px] shadow-[0_10px_22px_rgba(124,58,237,0.12)] transition-all duration-300 group-hover:shadow-[0_12px_28px_rgba(124,58,237,0.18)]">
                <div className="overflow-hidden rounded-[22px] border border-background/90 bg-muted">
                  <img
                    src={story.imageUrl}
                    alt={story.label}
                    className="h-[78px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
              <p className="mt-2 line-clamp-2 text-[11.5px] font-semibold leading-tight text-foreground/85">
                {story.label}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="sticky top-[7.5rem] z-20 -mx-4 space-y-2.5 border-y border-violet-100/70 bg-background/90 px-4 py-3 backdrop-blur-xl sm:-mx-5 sm:px-5">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
          {feedFilters.map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setActiveFilter(value)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95 ${
                activeFilter === value
                  ? "bg-violet-600 text-white shadow-[0_8px_18px_rgba(124,58,237,0.20)]"
                  : "bg-card text-foreground shadow-sm ring-1 ring-border/70 hover:bg-violet-50 hover:text-violet-700 hover:ring-violet-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="scrollbar-hide flex gap-1.5 overflow-x-auto pb-1">
          {(["Todo", ...categoryFilters] as CategoryFilter[]).map(
            (category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all duration-200 active:scale-95 ${
                  activeCategory === category
                    ? "border-violet-200 bg-violet-50 text-violet-700"
                    : "border-border/70 bg-background/70 text-muted-foreground hover:border-violet-100 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ),
          )}
        </div>
      </section>

      <section className="space-y-5">
        {posts.length > 0 ? (
          posts.map((post) => <CommercialPostCard key={post.id} post={post} />)
        ) : (
          <div className="rounded-[24px] border border-dashed border-violet-200 bg-violet-50/50 p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-violet-700 shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-foreground">
              No hay publicaciones con estos filtros
            </h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Probá cambiar la categoría para seguir descubriendo propuestas locales.
            </p>
          </div>
        )}
      </section>

      {feed.posts.length === 0 && (
        <div className="space-y-4" aria-hidden>
          <CommercialPostSkeleton />
          <CommercialPostSkeleton />
        </div>
      )}
    </div>
  );
}
