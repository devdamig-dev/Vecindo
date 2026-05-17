"use client";

import Link from "next/link";
import { CommercialFeed } from "@/components/commercial/commercial-feed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  ChevronRight,
  Clock,
  Lock,
  MapPin,
  Megaphone,
  Package,
  Search,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  canAccessMyBusiness,
  getUserPrimaryRole,
  hasPreviewAccessToModule,
} from "@/lib/commercial";
import { commerces } from "@/lib/commerces-data";

const commerceItems = commerces
  .filter((c) => c.type === "commerce")
  .slice(0, 3)
  .map((c) => ({
    title: c.name,
    description: c.description,
    badge: c.badge,
    meta: c.meta,
    location: c.location,
    href: `/dashboard/comercios/${c.id}`,
  }));

const entrepreneurItems = commerces
  .filter((c) => c.type === "entrepreneur")
  .slice(0, 3)
  .map((c) => ({
    title: c.name,
    description: c.description,
    badge: c.badge,
    meta: c.meta,
    location: c.location,
    href: `/dashboard/comercios/${c.id}?tipo=emprendimientos`,
  }));

function CommercialPreviewCard({
  title,
  description,
  badge,
  meta,
  location,
  href,
  type,
}: {
  title: string;
  description: string;
  badge: string;
  meta: string;
  location: string;
  href: string;
  type: "commerce" | "entrepreneur";
}) {
  const isCommerce = type === "commerce";

  return (
    <Link
      href={href}
      className={`group rounded-[24px] border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.99] ${
        isCommerce
          ? "border-sky-100 bg-sky-50/45 hover:border-sky-200"
          : "border-amber-100 bg-gradient-to-br from-amber-50/70 via-card to-violet-50/50 hover:border-amber-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
            isCommerce ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"
          }`}
        >
          {isCommerce ? (
            <Store className="h-5 w-5" />
          ) : (
            <Sparkles className="h-5 w-5" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="line-clamp-1 text-base font-semibold text-foreground">
              {title}
            </h3>
            <Badge variant="secondary">{badge}</Badge>
            <Badge
              className={
                isCommerce
                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                  : "bg-violet-100 text-violet-700 hover:bg-violet-100"
              }
            >
              {isCommerce ? "Local físico" : "Marca local"}
            </Badge>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-muted-foreground">
        {isCommerce ? (
          <>
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
              <MapPin className="h-3 w-3" />
              Pin · {location} · a 1,4 km
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
              <Clock className="h-3 w-3" />
              Abierto ahora
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1">
              <Truck className="h-3 w-3" />
              Delivery / retiro
            </span>
          </>
        ) : (
          <>
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-violet-700">
              <Sparkles className="h-3 w-3" />
              Identidad propia
            </span>
            <span className="rounded-full bg-white/80 px-2.5 py-1">Productos con autoría</span>
            <span className="rounded-full bg-white/80 px-2.5 py-1">{meta}</span>
          </>
        )}
      </div>

      <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-700">
        {isCommerce ? "Ver local y ubicación" : "Descubrir productos"}
        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

export default function EspacioComercialPage() {
  const { auth } = useAuth();
  const showMyBusiness = canAccessMyBusiness(auth);
  const commercialSpacePreview = hasPreviewAccessToModule(
    auth,
    "commercialSpace",
  );
  const role = getUserPrimaryRole(auth);

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
            <Store className="h-3.5 w-3.5" />
            Espacio comercial
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Feed comercial local
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Promos, lanzamientos y productos de comercios y emprendimientos
            cerca.
          </p>
        </div>
        {showMyBusiness && (
          <Button
            asChild
            size="sm"
            variant="outline"
            className="w-fit rounded-full border-violet-200 bg-card/80 px-3.5 text-violet-700 shadow-sm backdrop-blur transition-all hover:bg-violet-50 hover:text-violet-800 active:scale-[0.98]"
          >
            <Link href="/dashboard/comercial">
              <Briefcase className="mr-2 h-3.5 w-3.5" />
              Mi negocio
            </Link>
          </Button>
        )}
      </div>

      {commercialSpacePreview && (
        <div className="rounded-[22px] border border-violet-200 bg-violet-50 px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              {role === "service_provider"
                ? "Preview para detectar comercios cercanos y oportunidades de alianza."
                : "Preview para ver cómo tu marca puede aparecer en la red local."}
            </p>
            <Button
              asChild
              size="sm"
              className="bg-violet-600 text-white hover:bg-violet-700"
            >
              <Link href="/dashboard/suscripciones">
                {role === "service_provider"
                  ? "Activar Red local"
                  : "Activar acceso"}
              </Link>
            </Button>
          </div>
        </div>
      )}

      <CommercialFeed />

      <section className="space-y-3.5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Explorar comercios
            </h2>
            <p className="text-sm text-muted-foreground">
              Cercanía, horarios, delivery y rubros útiles.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/comercios">Ver todos</Link>
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {commerceItems.map((item) => (
            <CommercialPreviewCard key={item.title} {...item} type="commerce" />
          ))}
        </div>
      </section>

      <section className="space-y-3.5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Explorar emprendimientos
            </h2>
            <p className="text-sm text-muted-foreground">
              Marcas locales, creatividad y productos destacados.
            </p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/comercios?tipo=emprendimientos">
              Ver todos
            </Link>
          </Button>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {entrepreneurItems.map((item) => (
            <CommercialPreviewCard
              key={item.title}
              {...item}
              type="entrepreneur"
            />
          ))}
        </div>
      </section>

      <div className="rounded-[22px] border border-border/80 bg-card/80 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.035)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-foreground">Publicar o vender</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Comercial para marcas activas. Mercado para usados o ventas
              vecinales.
            </p>
          </div>
          {showMyBusiness ? (
            <div className="flex flex-col items-end gap-1">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="rounded-full border-violet-200 text-violet-700 hover:bg-violet-50"
              >
                <Link href="/dashboard/comercial">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Ir a Mi negocio
                </Link>
              </Button>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <Lock className="h-3 w-3" />
                Panel privado
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link href={auth.capabilities.canAccessMarketplace ? "/dashboard/marketplace" : "/dashboard/services/new"}>
                  <Package className="mr-2 h-4 w-4" />
                  {auth.capabilities.canAccessMarketplace ? "Mercado" : "Servicios"}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/dashboard/services/new">
                  <Search className="mr-2 h-4 w-4" />
                  Servicio
                </Link>
              </Button>
              <Button
                asChild
                className="bg-violet-600 text-white hover:bg-violet-700"
              >
                <Link href="/dashboard/comercial">
                  <Megaphone className="mr-2 h-4 w-4" />
                  Comercial
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
