"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Handshake,
  Heart,
  Megaphone,
  Radio,
  MessageCircleQuestion,
  PackageOpen,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { ActivityChips } from "@/components/activity/activity-chips";
import { RecentAyudaWidget } from "@/components/ayuda/recent-ayuda-widget";
import { ModuleCard } from "@/components/dashboard/module-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { SearchBar } from "@/components/dashboard/search-bar";
import { SectionHeader } from "@/components/dashboard/section-header";
import { ZoneUpdatesCarousel } from "@/components/zone-updates/zone-updates-carousel";
import { useAuth, type SavedItem } from "@/lib/auth-context";
import {
  getHomeActivitySignals,
  getZonalActivitySignals,
} from "@/lib/activity-insights";
import { getUserPrimaryRole, type UserPrimaryRole } from "@/lib/commercial";
import { getFeaturedCommercialPosts } from "@/lib/commercial-feed";

type HomeRole = UserPrimaryRole;

type QuickAction = {
  label: string;
  description: string;
  icon: LucideIcon;
  href: string;
  theme: "market" | "services" | "commercial" | "help";
  chip: string;
};

type RoleNudge = {
  eyebrow: string;
  title: string;
  insight: string;
  cta: string;
  href: string;
  icon: LucideIcon;
};

type Opportunity = {
  title: string;
  subtitle: string;
  meta: string;
  href: string;
  icon: LucideIcon;
};

const mainModules: QuickAction[] = [
  {
    label: "Mercado",
    description: "Comprá y vendé en tu zona",
    icon: ShoppingBag,
    href: "/dashboard/marketplace",
    theme: "market",
    chip: "Comunidad",
  },
  {
    label: "Servicios",
    description: "Ofrecé o encontrá servicios",
    icon: Wrench,
    href: "/dashboard/services",
    theme: "services",
    chip: "Confiable",
  },
  {
    label: "Espacio comercial",
    description: "Negocios y emprendimientos",
    icon: Store,
    href: "/dashboard/espacio-comercial",
    theme: "commercial",
    chip: "Local",
  },
  {
    label: "Ayuda comunitaria",
    description: "Mascotas, seguridad, colectas y más",
    icon: Heart,
    href: "/dashboard/ayuda",
    theme: "help",
    chip: "Solidario",
  },
];

const roleNudges: Record<HomeRole, RoleNudge> = {
  resident: {
    eyebrow: "Hudson – Berazategui",
    title: "Tu zona está activa",
    insight:
      "Novedades, comercios, servicios y pedidos vecinales se actualizan durante el día.",
    cta: "Explorar comunidad",
    href: "/dashboard/questions",
    icon: Sparkles,
  },
  service_provider: {
    eyebrow: "Prestador",
    title: "Servicios con movimiento cerca",
    insight:
      "4 vecinos buscaron electricistas y arreglos del hogar esta semana.",
    cta: "Gestionar servicios",
    href: "/dashboard/pro",
    icon: Wrench,
  },
  resident_business: {
    eyebrow: "Comercio vecino",
    title: "Tu negocio convive con la comunidad",
    insight:
      "Productos locales y recomendaciones del barrio siguen generando interés cerca tuyo.",
    cta: "Ir a Mi negocio",
    href: "/dashboard/comercial",
    icon: Store,
  },
  external_business: {
    eyebrow: "Comercio local",
    title: "Más presencia sin perder el pulso barrial",
    insight:
      "Cerca tuyo concentra comercios y emprendimientos que la zona descubre primero.",
    cta: "Ir a Mi negocio",
    href: "/dashboard/comercial",
    icon: Megaphone,
  },
};

const opportunities: Record<HomeRole, Opportunity[]> = {
  resident: [
    {
      title: "Feria de emprendedores",
      subtitle: "Productos locales con promos de la semana.",
      meta: "Mercado",
      href: "/dashboard/marketplace",
      icon: ShoppingBag,
    },
    {
      title: "Pedido de ayuda activo",
      subtitle: "Una vecina busca difusión para mascota perdida.",
      meta: "Ayuda",
      href: "/dashboard/ayuda",
      icon: Heart,
    },
  ],
  service_provider: [
    {
      title: "Consulta de la zona",
      subtitle: "Un vecino busca presupuesto para arreglos del hogar.",
      meta: "Hace 1 h",
      href: "/dashboard/services",
      icon: MessageCircleQuestion,
    },
    {
      title: "Comercio renovando equipamiento",
      subtitle: "Posible alianza para mantenimiento recurrente.",
      meta: "Espacio comercial",
      href: "/dashboard/espacio-comercial",
      icon: Handshake,
    },
  ],
  resident_business: [
    {
      title: "Producto con potencial",
      subtitle: "Tu catálogo puede aparecer entre destacados del barrio.",
      meta: "Mi negocio",
      href: "/dashboard/comercial",
      icon: PackageOpen,
    },
    {
      title: "Proveedor recomendado",
      subtitle: "Prestadores con buena respuesta para comercios locales.",
      meta: "Servicios",
      href: "/dashboard/services",
      icon: Wrench,
    },
  ],
  external_business: [
    {
      title: "Patrocinio sugerido",
      subtitle:
        "Cerca tuyo puede reforzar tu presencia durante los próximos días.",
      meta: "Crecimiento",
      href: "/dashboard/espacio-comercial",
      icon: Megaphone,
    },
    {
      title: "Optimizar catálogo",
      subtitle: "Sumá productos de entrada para convertir más visitas.",
      meta: "Mi negocio",
      href: "/dashboard/comercial",
      icon: PackageOpen,
    },
  ],
};

function MainModules() {
  return (
    <div className="grid grid-cols-2 gap-3.5 md:gap-4">
      {mainModules.map((action) => (
        <ModuleCard key={action.href} {...action} />
      ))}
    </div>
  );
}

function RoleNudgeCard({ role }: { role: HomeRole }) {
  const nudge = roleNudges[role];
  const Icon = nudge.icon;

  return (
    <section className="rounded-3xl border border-primary/10 bg-card/90 p-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
            {nudge.eyebrow}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-foreground">
            {nudge.title}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {nudge.insight}
          </p>
        </div>
        <Link
          href={nudge.href}
          className="inline-flex w-fit shrink-0 items-center gap-1 rounded-full bg-foreground px-3 py-1.5 text-[11px] font-semibold text-background transition-transform hover:-translate-y-0.5"
        >
          {nudge.cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

function ZonalMovementStrip({ role }: { role: HomeRole }) {
  const signals = getZonalActivitySignals(role);

  return (
    <section className="rounded-3xl border border-border/70 bg-card/95 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
            Actividad zonal
          </p>
          <p className="text-xs text-muted-foreground">
            Tendencias suaves del barrio, sin ruido ni métricas invasivas.
          </p>
        </div>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <TrendingUp className="h-4 w-4" />
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {signals.map((signal) => (
          <div
            key={`${signal.eyebrow}-${signal.label}`}
            className="rounded-2xl border border-border/60 bg-muted/20 p-3"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              {signal.eyebrow}
            </p>
            <ActivityChips insights={[signal]} className="mt-2" />
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {signal.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReturnToSaved({ items }: { items: SavedItem[] }) {
  const recentItems = items.slice(0, 3);

  if (recentItems.length === 0) return null;

  return (
    <section className="rounded-3xl border border-border/70 bg-card/95 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Volvé a ver</p>
          <p className="text-xs text-muted-foreground">
            Tus últimos guardados para retomar sin volver a buscar.
          </p>
        </div>
        <Link
          href="/dashboard/guardados"
          className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground"
        >
          Ver todos
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {recentItems.map((item) => (
          <Link
            key={item.id}
            href={item.href ?? "/dashboard/guardados"}
            className="group rounded-2xl border border-border/70 bg-muted/20 p-3 transition-colors hover:bg-muted/45"
          >
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-primary">
              <Bookmark className="h-3.5 w-3.5" />
              Guardado {item.savedAt}
            </div>
            <p className="mt-2 line-clamp-1 text-sm font-semibold text-foreground group-hover:text-primary">
              {item.title}
            </p>
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
              {item.subtitle}
            </p>
            <p className="mt-2 text-[11px] text-emerald-700">
              {item.activity ?? "Tiene movimiento reciente"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}


function CommercialPulse() {
  const posts = getFeaturedCommercialPosts(3);

  return (
    <section className="rounded-3xl border border-violet-100 bg-violet-50/70 p-4 shadow-[0_10px_28px_rgba(76,29,149,0.05)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Movimiento comercial cerca</p>
          <p className="text-xs text-muted-foreground">
            Promos, lanzamientos y negocios activos sin mezclar con Mercado.
          </p>
        </div>
        <Link
          href="/dashboard/espacio-comercial"
          className="inline-flex items-center gap-1 rounded-full bg-violet-600 px-3 py-1.5 text-[11px] font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Ver feed
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={post.businessHref}
            className="group overflow-hidden rounded-2xl border border-violet-100 bg-background transition-colors hover:bg-violet-50"
          >
            <div className="aspect-[16/9] overflow-hidden bg-muted">
              <img src={post.imageUrl} alt={post.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
            </div>
            <div className="p-3">
              <div className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-violet-700">
                <Radio className="h-3 w-3" />
                {post.sponsored ? "Patrocinado" : "Actividad comercial"}
              </div>
              <p className="line-clamp-1 text-sm font-semibold text-foreground">{post.title}</p>
              <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{post.businessName} · {post.zone}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ActivityPanel({ role }: { role: HomeRole }) {
  const isCommercial =
    role === "resident_business" || role === "external_business";

  return (
    <section className="rounded-3xl border border-border/70 bg-card/95 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
      <SectionHeader
        title={
          role === "service_provider"
            ? "Movimiento para tus servicios"
            : isCommercial
              ? "Movimiento comercial local"
              : "Actividad de la zona"
        }
        subtitle={
          role === "service_provider"
            ? "Señales breves para conectar con vecinos y comercios."
            : isCommercial
              ? "Oportunidades puntuales para tu negocio dentro de la vida barrial."
              : "Destacados comunitarios para seguir el pulso del barrio."
        }
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {opportunities[role].map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.title}
              href={item.href}
              className="group flex items-start gap-3 rounded-2xl border border-border/70 bg-muted/25 p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-background text-primary shadow-sm">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    {item.meta}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {item.subtitle}
                </p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function DashboardPage() {
  const { auth } = useAuth();
  const role = getUserPrimaryRole(auth);

  return (
    <div className="flex min-w-0 flex-col gap-6 overflow-x-hidden pb-4">
      <ZoneUpdatesCarousel zoneId="berazategui" />

      <SearchBar />

      <MainModules />

      <RecentActivity />

      <section className="flex min-w-0 flex-col gap-4">
        <RoleNudgeCard role={role} />
        <ActivityChips
          insights={getHomeActivitySignals(role)}
          limit={3}
          className="px-1"
        />
      </section>

      <section className="flex min-w-0 flex-col gap-6">
        <ZonalMovementStrip role={role} />
        <CommercialPulse />
        <ActivityPanel role={role} />
        <RecentAyudaWidget />
        <ReturnToSaved items={auth.savedItems} />
      </section>
    </div>
  );
}
