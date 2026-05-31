"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  useAuth,
  type SavedItem,
  type SavedItemType,
} from "@/lib/auth-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  Heart,
  Megaphone,
  Package,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  Trash2,
} from "lucide-react";

const typeLabels: Record<
  SavedItemType,
  { label: string; plural: string; icon: typeof Search }
> = {
  commerce: { label: "Comercio", plural: "Comercios guardados", icon: Store },
  product: { label: "Producto", plural: "Productos guardados", icon: Package },
  service: { label: "Servicio", plural: "Servicios guardados", icon: Search },
  marketplace_item: {
    label: "Mercado",
    plural: "Publicaciones de Mercado",
    icon: ShoppingBag,
  },
  commercial_post: {
    label: "Comercial",
    plural: "Publicaciones comerciales",
    icon: Sparkles,
  },
  zone_update: {
    label: "Novedad",
    plural: "Novedades guardadas",
    icon: Megaphone,
  },
  ayuda: { label: "Ayuda", plural: "Ayuda / comunidad", icon: Heart },
};

const sectionOrder: SavedItemType[] = [
  "commerce",
  "product",
  "service",
  "marketplace_item",
  "commercial_post",
  "ayuda",
  "zone_update",
];

const filterOptions: { key: SavedItemType | "all"; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "commerce", label: "Comercios" },
  { key: "product", label: "Productos" },
  { key: "service", label: "Servicios" },
  { key: "marketplace_item", label: "Mercado" },
  { key: "commercial_post", label: "Comercial" },
  { key: "ayuda", label: "Ayuda" },
];

const fallbackActivity: Record<SavedItemType, string> = {
  commerce: "Popular esta semana",
  product: "Volvió a estar disponible",
  service: "Responde rápido",
  marketplace_item: "Guardado por 3 personas",
  commercial_post: "Promo activa en tu zona",
  ayuda: "3 vecinos también lo siguen",
  zone_update: "Actualizado recientemente",
};

function SavedCard({
  item,
  onRemove,
}: {
  item: SavedItem;
  onRemove: (id: string) => void;
}) {
  const typeInfo = typeLabels[item.type];
  const Icon = typeInfo.icon;
  const content = (
    <>
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-foreground">
              {item.title}
            </p>
            <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
              {typeInfo.label}
            </Badge>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {item.subtitle}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded-full bg-primary/8 px-2 py-0.5 font-medium text-primary">
              {item.activity ?? fallbackActivity[item.type]}
            </span>
            <span className="text-muted-foreground">
              Guardado {item.savedAt}
            </span>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 shrink-0 p-0 text-muted-foreground hover:text-destructive"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(item.id);
        }}
        aria-label={`Quitar ${item.title} de guardados`}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </>
  );

  const className =
    "flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-sm";

  if (item.href) {
    return (
      <Link href={item.href} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

export default function GuardadosPage() {
  const { auth, removeSavedItem } = useAuth();
  const [activeFilter, setActiveFilter] = useState<SavedItemType | "all">(
    "all",
  );

  const visibleItems =
    activeFilter === "all"
      ? auth.savedItems
      : auth.savedItems.filter((item) => item.type === activeFilter);

  const groupedItems = useMemo(() => {
    return sectionOrder
      .map((type) => ({
        type,
        items: visibleItems.filter((item) => item.type === type),
      }))
      .filter((section) => section.items.length > 0);
  }, [visibleItems]);

  const hasSavedItems = auth.savedItems.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-3xl border border-primary/10 bg-card p-5 shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Bookmark className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Mi espacio personal
            </p>
            <h1 className="mt-1 text-2xl font-bold text-foreground">
              Guardados
            </h1>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Volvé rápido a comercios, productos, servicios y publicaciones que
              te interesan.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setActiveFilter(opt.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === opt.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {!hasSavedItems ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Bookmark className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-base font-semibold text-foreground">
            Todavía no guardaste nada
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Guardá comercios, productos o servicios para volver rápido cuando
            los necesites.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              asChild
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="/dashboard/marketplace">Explorar Mercado</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/services">Ver Servicios</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/espacio-comercial">
                Ver Espacio comercial
              </Link>
            </Button>
          </div>
        </div>
      ) : groupedItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No hay guardados en este filtro. Probá con otra categoría.
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {groupedItems.map(({ type, items }) => {
            const Icon = typeLabels[type].icon;
            return (
              <section key={type} className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-semibold text-foreground">
                      {typeLabels[type].plural}
                    </h2>
                  </div>
                  <Badge variant="outline" className="text-[10px]">
                    {items.length}
                  </Badge>
                </div>
                <div className="grid gap-3 lg:grid-cols-2">
                  {items.map((item) => (
                    <SavedCard
                      key={item.id}
                      item={item}
                      onRemove={removeSavedItem}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {hasSavedItems && (
        <section className="rounded-3xl border border-border bg-muted/25 p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                Señales vinculadas a tus intereses
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Estas pistas son simuladas para el prototipo: ayudan a anticipar
                qué guardados tienen movimiento sin convertirlo en
                notificaciones invasivas.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
