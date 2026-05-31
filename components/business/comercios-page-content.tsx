"use client";

import Link from "next/link";
import { BackButton } from "@/components/ui/back-button";
import { useAuth } from "@/lib/auth-context";
import {
  canAccessMyBusiness,
  canAccessServiceManagement,
  hasServiceProviderActivity,
  isResident,
} from "@/lib/commercial";
import { ActivityChips } from "@/components/activity/activity-chips";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bookmark,
  Clock,
  Package,
  Store,
  Sparkles,
  MapPin,
  MessageSquare,
  Lock,
  Truck,
} from "lucide-react";
import ComerciosZoneMap from "@/components/business/comercios-zone-map";
import type { CommerceItem } from "@/lib/commerces-data";
import {
  getCommerceGrowthInsights,
  getCommerceProfileInsights,
} from "@/lib/activity-insights";

type Props = {
  activeTab: "comercios" | "emprendimientos";
  filteredProfiles: CommerceItem[];
};

function getDescription(item: CommerceItem) {
  return (
    (item as any).shortDescription ||
    (item as any).description ||
    "Perfil comercial de la zona."
  );
}

const commerceCategoryChips = [
  "Gastronomía",
  "Deco",
  "Moda",
  "Fitness",
  "Tecnología",
  "Servicios",
  "Hogar",
  "Mascotas",
];

function getFirstBadge(item: CommerceItem) {
  if (Array.isArray((item as any).badges) && (item as any).badges.length > 0) {
    return (item as any).badges[0];
  }

  if ((item as any).tag) return (item as any).tag;
  if ((item as any).category) return (item as any).category;

  return null;
}

function CommercialListCard({
  item,
  activeTab,
}: {
  item: CommerceItem;
  activeTab: "comercios" | "emprendimientos";
}) {
  const detailHref =
    activeTab === "emprendimientos"
      ? `/dashboard/comercios/${item.id}?tipo=emprendimientos`
      : `/dashboard/comercios/${item.id}`;

  const { saveItem, isSaved } = useAuth();
  const isCommerce = item.type === "commerce";
  const firstBadge = getFirstBadge(item);
  const saved = isSaved(item.name, "commerce", item.id);

  return (
    <article
      className={`rounded-[28px] border p-5 shadow-[0_10px_28px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_16px_38px_rgba(15,23,42,0.07)] active:scale-[0.99] ${
        isCommerce
          ? "border-sky-100 bg-sky-50/55"
          : "border-amber-100 bg-gradient-to-br from-amber-50/70 via-card to-violet-50/50"
      }`}
    >
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${
          isCommerce
            ? "bg-sky-100 text-sky-700"
            : "bg-amber-100 text-amber-700"
        }`}
      >
        {isCommerce ? (
          <Store className="h-5 w-5" />
        ) : (
          <Sparkles className="h-5 w-5" />
        )}
      </div>

      <div className="space-y-3">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-[1.15rem] font-semibold tracking-tight text-slate-950">
              {item.name}
            </h3>

            {firstBadge && (
              <Badge variant="secondary" className="font-normal">
                {firstBadge}
              </Badge>
            )}

            <Badge
              className={
                isCommerce
                  ? "bg-sky-100 text-sky-700 hover:bg-sky-100"
                  : "bg-amber-100 text-amber-700 hover:bg-amber-100"
              }
            >
              {isCommerce ? "Local físico" : "Marca creativa"}
            </Badge>

            <Badge
              variant="outline"
              className="gap-1 border-slate-200 text-slate-600"
            >
              <MessageSquare className="h-3 w-3" />
              Pedido por WhatsApp
            </Badge>

            {saved && (
              <Badge
                variant="outline"
                className="gap-1 border-slate-200 text-slate-600"
              >
                <Bookmark className="h-3 w-3" />
                Guardado
              </Badge>
            )}
          </div>

          <p className="line-clamp-2 text-sm text-slate-600">
            {getDescription(item)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-[11px] font-medium text-slate-500">
          {isCommerce ? (
            <>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1">
                <MapPin className="h-3 w-3" />
                Pin · {(item as any).location || "Zona visible"} · a 1,4 km
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                <Clock className="h-3 w-3" />
                Abierto ahora
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1">
                <Truck className="h-3 w-3" />
                Delivery / retiro
              </span>
            </>
          ) : (
            <>
              <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-1 text-violet-700">
                <Sparkles className="h-3 w-3" />
                Diseño local
              </span>
              <span className="rounded-full bg-white px-2.5 py-1">
                Productos destacados
              </span>
              <span className="rounded-full bg-white px-2.5 py-1">
                Entregas coordinadas
              </span>
            </>
          )}
        </div>

        <ActivityChips
          insights={getCommerceProfileInsights(item.id)}
          limit={2}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/70 pt-3">
          <Button asChild variant="link" className="h-auto p-0 text-slate-950">
            <Link href={detailHref}>
              {isCommerce ? "Ver local y catálogo" : "Descubrir marca"}
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5 border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-700"
            onClick={() =>
              saveItem({
                type: "commerce",
                targetId: item.id,
                title: item.name,
                subtitle: `${item.category} · ${item.location}`,
                href: detailHref,
                activity:
                  getCommerceProfileInsights(item.id)[0]?.label ??
                  "Nuevo producto agregado",
              })
            }
          >
            <Bookmark
              className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`}
            />
            {saved ? "Guardado" : "Guardar"}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function ComerciosPageContent({
  activeTab,
  filteredProfiles,
}: Props) {
  const { auth } = useAuth();
  const showMyBusiness = canAccessMyBusiness(auth);
  const isCommerceTab = activeTab === "comercios";

  return (
    <div className="space-y-6">
      <BackButton
        label={isCommerceTab ? "Volver al espacio comercial" : "Volver al espacio comercial"}
      />

      <div
        className={`rounded-[28px] border p-5 ${
          isCommerceTab
            ? "border-sky-100 bg-sky-50/60"
            : "border-amber-100 bg-gradient-to-br from-amber-50/70 to-violet-50/50"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl ${
              isCommerceTab
                ? "bg-sky-100 text-sky-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {isCommerceTab ? (
              <MapPin className="h-4 w-4" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </div>

          <div className="space-y-3">
            <h2
              className={`text-[1.35rem] font-semibold tracking-tight ${
                isCommerceTab ? "text-sky-950" : "text-amber-950"
              }`}
            >
              {isCommerceTab ? "Comercios" : "Emprendimientos locales"}
            </h2>
            <p className="max-w-3xl text-sm text-slate-600">
              {isCommerceTab
                ? "Locales útiles cerca tuyo: ubicación, rubro, horarios, delivery y pedido simple."
                : "Marcas de vecinos para descubrir productos, identidad y lanzamientos locales."}
            </p>
            {isCommerceTab ? (
              <div className="flex flex-wrap gap-2">
                {commerceCategoryChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-700"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : (
              <ActivityChips
                insights={getCommerceGrowthInsights("commercial-directory")}
                limit={3}
              />
            )}
          </div>
        </div>
      </div>

      {isCommerceTab && <ComerciosZoneMap items={filteredProfiles} />}

      <section className="grid gap-4 xl:grid-cols-3">
        {filteredProfiles.map((item) => (
          <CommercialListCard key={item.id} item={item} activeTab={activeTab} />
        ))}
      </section>

      <div className="flex justify-start">
        <Button asChild variant="outline">
          <Link
            href={
              isCommerceTab
                ? "/dashboard/comercios"
                : "/dashboard/comercios?tipo=emprendimientos"
            }
          >
            {isCommerceTab
              ? "Ver todos los comercios"
              : "Ver todos los emprendimientos"}
          </Link>
        </Button>
      </div>

      <section className="rounded-[28px] border border-border bg-card p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold tracking-tight text-slate-950">
              ¿Querés ofrecer algo en la zona?
            </h3>
            <p className="text-sm text-slate-600">
              Publicá productos, ofrecé servicios o activá tu perfil comercial
              para empezar a aparecer en este módulo.
            </p>
          </div>

          {showMyBusiness ? (
            <div className="flex flex-col items-end gap-1">
              <Button
                asChild
                className="shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-200 hover:scale-[1.01]"
              >
                <Link href="/dashboard/comercial">Ir a Mi negocio</Link>
              </Button>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                <Lock className="h-3 w-3" />
                Panel privado de tu cuenta
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {isResident(auth) && (
                <Button asChild>
                  <Link href="/dashboard/marketplace">
                    <Package className="mr-2 h-4 w-4" />
                    Publicar en Mercado
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline">
                <Link href="/dashboard/services/new">Ofrecer servicios</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
