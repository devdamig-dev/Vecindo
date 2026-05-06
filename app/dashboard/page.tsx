"use client"

import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Handshake,
  Heart,
  Megaphone,
  MessageCircleQuestion,
  PackageOpen,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { RecentAyudaWidget } from "@/components/ayuda/recent-ayuda-widget"
import { DiscoveryCard } from "@/components/dashboard/discovery-card"
import { ModuleCard } from "@/components/dashboard/module-card"
import { SectionHeader } from "@/components/dashboard/section-header"
import { ZoneUpdatesCarousel } from "@/components/zone-updates/zone-updates-carousel"
import { useAuth } from "@/lib/auth-context"
import { getUserPrimaryRole, type UserPrimaryRole } from "@/lib/commercial"
import { cn } from "@/lib/utils"

type HomeRole = UserPrimaryRole

type QuickAction = {
  label: string
  description: string
  icon: LucideIcon
  href: string
  theme: "market" | "services" | "commercial" | "help"
  chip: string
}

type Insight = {
  label: string
  value: string
  detail: string
}

type Opportunity = {
  title: string
  subtitle: string
  meta: string
  href: string
  icon: LucideIcon
}

const roleCopy: Record<HomeRole, { eyebrow: string; title: string; description: string; banner: string; bannerCta: string; bannerHref: string }> = {
  resident: {
    eyebrow: "Inicio comunitario",
    title: "Hudson – Berazategui",
    description: "Mercado, ayuda, servicios y actividad vecinal priorizados para tu día a día.",
    banner: "Tu comunidad se mueve cerca tuyo: encontrá oportunidades, pedidos de ayuda y comercios destacados sin salir de VEZI.",
    bannerCta: "Explorar comunidad",
    bannerHref: "/dashboard/questions",
  },
  service_provider: {
    eyebrow: "Inicio profesional",
    title: "Oportunidades en tu zona",
    description: "Consultas, visibilidad y alianzas comerciales para hacer crecer tus servicios.",
    banner: "Mejorá tu visibilidad dentro de la zona y convertí consultas recientes en nuevos trabajos.",
    bannerCta: "Gestionar mis servicios",
    bannerHref: "/dashboard/pro",
  },
  resident_business: {
    eyebrow: "Inicio híbrido",
    title: "Comunidad + negocio local",
    description: "Tu home combina vida vecinal, métricas comerciales y módulos para mover tu emprendimiento.",
    banner: "Destacá productos, medí interés local y conectá con prestadores recomendados sin perder el pulso comunitario.",
    bannerCta: "Ver mi negocio",
    bannerHref: "/dashboard/comercial",
  },
  external_business: {
    eyebrow: "Inicio comercial",
    title: "Crecimiento en Hudson",
    description: "Herramientas para mejorar catálogo, visibilidad y presencia patrocinada en la zona.",
    banner: "Aparecé en Cerca tuyo y activá patrocinios para que más residentes descubran tu propuesta.",
    bannerCta: "Impulsar mi negocio",
    bannerHref: "/dashboard/comercial",
  },
}

const quickActions: Record<HomeRole, QuickAction[]> = {
  resident: [
    { label: "Mercado", description: "Comprá y vendé en tu zona", icon: ShoppingBag, href: "/dashboard/marketplace", theme: "market", chip: "Comunidad" },
    { label: "Ayuda vecinal", description: "Mascotas, seguridad, colectas y más", icon: Heart, href: "/dashboard/ayuda", theme: "help", chip: "Solidario" },
    { label: "Servicios", description: "Encontrá prestadores confiables", icon: Wrench, href: "/dashboard/services", theme: "services", chip: "Cerca" },
    { label: "Espacio comercial", description: "Comercios y emprendimientos destacados", icon: Store, href: "/dashboard/espacio-comercial", theme: "commercial", chip: "Local" },
  ],
  service_provider: [
    { label: "Gestionar mis servicios", description: "Editá tu perfil, rubros y cobertura", icon: Wrench, href: "/dashboard/pro", theme: "services", chip: "Principal" },
    { label: "Consultas recientes", description: "Pedidos simulados cerca de tu zona", icon: MessageCircleQuestion, href: "/dashboard/services", theme: "services", chip: "Oportunidad" },
    { label: "Alianzas comerciales", description: "Comercios que podrían necesitarte", icon: Handshake, href: "/dashboard/espacio-comercial", theme: "commercial", chip: "Alianzas" },
    { label: "Prestadores destacados", description: "Referencias para mejorar tu visibilidad", icon: Sparkles, href: "/dashboard/services", theme: "commercial", chip: "Benchmark" },
  ],
  resident_business: [
    { label: "Mi negocio", description: "Catálogo, datos y presencia local", icon: Store, href: "/dashboard/comercial", theme: "commercial", chip: "Principal" },
    { label: "Métricas comerciales", description: "Interés simulado de la comunidad", icon: BarChart3, href: "/dashboard/comercial", theme: "commercial", chip: "Insights" },
    { label: "Productos destacados", description: "Mové publicaciones y catálogo", icon: PackageOpen, href: "/dashboard/marketplace", theme: "market", chip: "Venta" },
    { label: "Prestadores recomendados", description: "Aliados para tu operación diaria", icon: Wrench, href: "/dashboard/services", theme: "services", chip: "Soporte" },
  ],
  external_business: [
    { label: "Mi negocio", description: "Actualizá perfil y propuesta", icon: Store, href: "/dashboard/comercial", theme: "commercial", chip: "Principal" },
    { label: "Productos / catálogo", description: "Prepará tu vidriera para la zona", icon: PackageOpen, href: "/dashboard/comercial", theme: "market", chip: "Catálogo" },
    { label: "Aparecer en Cerca tuyo", description: "Sumá presencia patrocinada", icon: Megaphone, href: "/dashboard/espacio-comercial", theme: "commercial", chip: "Patrocinio" },
    { label: "Prestadores recomendados", description: "Servicios para activar tu llegada", icon: Wrench, href: "/dashboard/services", theme: "services", chip: "Aliados" },
  ],
}

const roleInsights: Record<HomeRole, Insight[]> = {
  resident: [
    { label: "Actividad vecinal", value: "18", detail: "novedades activas esta semana" },
    { label: "Cerca tuyo", value: "6", detail: "comercios y prestadores destacados" },
    { label: "Ayuda comunitaria", value: "3", detail: "pedidos recientes para revisar" },
  ],
  service_provider: [
    { label: "Consultas recientes", value: "7", detail: "pedidos simulados compatibles" },
    { label: "Visibilidad", value: "+24%", detail: "interés potencial en tu rubro" },
    { label: "Alianzas", value: "4", detail: "comercios podrían necesitar servicios" },
  ],
  resident_business: [
    { label: "Vistas del negocio", value: "128", detail: "interacciones simuladas del mes" },
    { label: "Productos", value: "3", detail: "publicaciones con potencial local" },
    { label: "Comunidad", value: "12", detail: "conversaciones vecinales relevantes" },
  ],
  external_business: [
    { label: "Alcance potencial", value: "2.4k", detail: "residentes de la zona objetivo" },
    { label: "Catálogo", value: "5", detail: "productos sugeridos para destacar" },
    { label: "Patrocinio", value: "2", detail: "ubicaciones recomendadas" },
  ],
}

const opportunities: Record<HomeRole, Opportunity[]> = {
  resident: [
    { title: "Feria de emprendedores", subtitle: "Productos locales con promos de la semana.", meta: "Mercado", href: "/dashboard/marketplace", icon: ShoppingBag },
    { title: "Pedido de ayuda activo", subtitle: "Una vecina busca difusión para mascota perdida.", meta: "Ayuda", href: "/dashboard/ayuda", icon: Heart },
  ],
  service_provider: [
    { title: "Consulta: instalación de luces exteriores", subtitle: "Casa en Hudson busca presupuesto esta semana.", meta: "Hace 1 h", href: "/dashboard/services", icon: MessageCircleQuestion },
    { title: "Café local renovando equipamiento", subtitle: "Oportunidad de alianza para mantenimiento recurrente.", meta: "Espacio comercial", href: "/dashboard/espacio-comercial", icon: Handshake },
  ],
  resident_business: [
    { title: "Producto con potencial", subtitle: "Tu catálogo puede aparecer en destacados del barrio.", meta: "Mi negocio", href: "/dashboard/comercial", icon: PackageOpen },
    { title: "Proveedor recomendado", subtitle: "Prestadores con buena respuesta para comercios locales.", meta: "Servicios", href: "/dashboard/services", icon: Wrench },
  ],
  external_business: [
    { title: "Patrocinio sugerido", subtitle: "Aumentá presencia en Cerca tuyo durante los próximos días.", meta: "Crecimiento", href: "/dashboard/espacio-comercial", icon: Megaphone },
    { title: "Optimizar catálogo", subtitle: "Sumá productos de entrada para convertir más visitas.", meta: "Mi negocio", href: "/dashboard/comercial", icon: TrendingUp },
  ],
}

const promotedCards = [
  {
    title: "Panadería artesanal",
    subtitle: "Comercio destacado con catálogo activo y pedido por WhatsApp.",
    user: "Punto Trigo",
    distance: "a 6 min",
    tag: "Cerca tuyo",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=640&h=420&fit=crop",
    href: "/dashboard/comercios/3",
  },
  {
    title: "Luna Cerámica",
    subtitle: "Emprendimiento local promocionado para ganar visibilidad.",
    user: "Emprendimiento local",
    distance: "a 10 min",
    tag: "Emprendimiento",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=640&h=420&fit=crop",
    href: "/dashboard/comercios/5?tipo=emprendimientos",
  },
]

function InsightStrip({ insights }: { insights: Insight[] }) {
  return (
    <section className="grid gap-3 sm:grid-cols-3">
      {insights.map((insight) => (
        <div key={insight.label} className="rounded-3xl border border-border/70 bg-card/95 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{insight.label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">{insight.value}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{insight.detail}</p>
        </div>
      ))}
    </section>
  )
}

function ContextBanner({ role }: { role: HomeRole }) {
  const copy = roleCopy[role]

  return (
    <section className="overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/10 via-card to-violet-50 p-4 shadow-[0_12px_32px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">{copy.banner}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">VEZI mantiene todo el ecosistema disponible, pero ordena lo más útil para tu perfil.</p>
          </div>
        </div>
        <Link href={copy.bannerHref} className="inline-flex w-fit items-center gap-1.5 rounded-full bg-foreground px-3.5 py-2 text-xs font-semibold text-background transition-transform hover:-translate-y-0.5">
          {copy.bannerCta}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  )
}

function DynamicQuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <div className="grid grid-cols-2 gap-3.5 md:gap-4">
      {actions.map((action) => (
        <ModuleCard key={action.href + action.label} {...action} />
      ))}
    </div>
  )
}

function OpportunityPanel({ role }: { role: HomeRole }) {
  const isCommercial = role === "resident_business" || role === "external_business"

  return (
    <section className="rounded-3xl border border-border/70 bg-card/95 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
      <SectionHeader
        title={role === "service_provider" ? "Oportunidades para tus servicios" : isCommercial ? "Crecimiento comercial" : "Actividad vecinal"}
        subtitle={role === "service_provider" ? "Consultas y alianzas simuladas priorizadas para prestadores." : isCommercial ? "Acciones concretas para visibilidad, catálogo y operación." : "Contenido comunitario destacado sin bloquear el resto del ecosistema."}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {opportunities[role].map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.title} href={item.href} className="group flex items-start gap-3 rounded-2xl border border-border/70 bg-muted/25 p-3 transition-colors hover:bg-muted/50">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-background text-primary shadow-sm">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-foreground">{item.title}</p>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">{item.meta}</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.subtitle}</p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function PromotedNearby({ compact = false }: { compact?: boolean }) {
  return (
    <section className={cn("rounded-3xl border border-violet-200/50 bg-card/95 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)]", compact && "opacity-95")}>
      <SectionHeader
        title={compact ? "Ecosistema comunitario" : "Comercios y emprendimientos destacados"}
        subtitle={compact ? "Una vista breve de lo que la comunidad descubre en VEZI." : "Espacios patrocinados y perfiles locales con mayor visibilidad."}
        action={<span className="text-xs font-semibold text-violet-700">Cerca tuyo</span>}
      />
      <div className="scrollbar-hide -mx-1 flex gap-3 overflow-x-auto rounded-2xl bg-violet-50/50 px-2 py-2">
        {promotedCards.map((item) => (
          <DiscoveryCard key={item.title} {...item} tagClassName="border-violet-300 bg-violet-500/15 text-violet-800" />
        ))}
      </div>
    </section>
  )
}

export default function DashboardPage() {
  const { auth } = useAuth()
  const role = getUserPrimaryRole(auth)
  const copy = roleCopy[role]
  const showCommunityFirst = role === "resident" || role === "resident_business"
  const showFullCommunity = role === "resident"
  const showReducedCommunity = role === "external_business"

  return (
    <div className="flex min-w-0 flex-col gap-6 overflow-x-hidden pb-4">
      <section className="space-y-2.5">
        <span className="inline-flex w-fit rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
          {copy.eyebrow}
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{copy.title}</h1>
        <p className="max-w-md text-sm text-muted-foreground">{copy.description}</p>
      </section>

      <ContextBanner role={role} />
      <DynamicQuickActions actions={quickActions[role]} />
      <InsightStrip insights={roleInsights[role]} />

      {showCommunityFirst ? <ZoneUpdatesCarousel zoneId="berazategui" /> : <OpportunityPanel role={role} />}

      <section className="flex min-w-0 flex-col gap-6">
        {showCommunityFirst ? <OpportunityPanel role={role} /> : null}
        {role === "service_provider" ? <RecentActivity /> : null}
        {role === "resident_business" || role === "external_business" ? <PromotedNearby compact={showReducedCommunity} /> : null}
        {showFullCommunity ? <RecentActivity /> : null}
        {showFullCommunity ? <RecentAyudaWidget /> : null}
        {showReducedCommunity ? <ZoneUpdatesCarousel zoneId="berazategui" /> : null}
        {role === "service_provider" ? <PromotedNearby compact /> : null}
      </section>
    </div>
  )
}
