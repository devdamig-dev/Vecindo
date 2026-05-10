"use client"

import Link from "next/link"
import { CommercialFeed } from "@/components/commercial/commercial-feed"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, Sparkles, MapPin, ChevronRight, Briefcase, Package, Search, Lock, Handshake, Megaphone, Radio } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { canAccessMyBusiness, getUserPrimaryRole, hasPreviewAccessToModule } from "@/lib/commercial"
import { commerces } from "@/lib/commerces-data"

const commerceItems = commerces
  .filter((c) => c.type === "commerce")
  .slice(0, 2)
  .map((c) => ({
    title: c.name,
    description: c.description,
    badge: c.badge,
    meta: c.meta,
    href: `/dashboard/comercios/${c.id}`,
  }))

const entrepreneurItems = commerces
  .filter((c) => c.type === "entrepreneur")
  .slice(0, 2)
  .map((c) => ({
    title: c.name,
    description: c.description,
    badge: c.badge,
    meta: c.meta,
    href: `/dashboard/comercios/${c.id}?tipo=emprendimientos`,
  }))

function CommercialPreviewCard({ title, description, badge, meta, href, type }: { title: string; description: string; badge: string; meta: string; href: string; type: "commerce" | "entrepreneur" }) {
  const isCommerce = type === "commerce"
  return (
    <Link href={href} className="group rounded-[24px] border border-violet-200 bg-violet-50 p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">{isCommerce ? <Store className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}</div>
      <div className="mt-4 flex flex-wrap items-center gap-2"><h3 className="text-base font-semibold text-foreground">{title}</h3><Badge variant="secondary">{badge}</Badge></div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <p className="mt-3 text-xs text-muted-foreground">{meta}</p>
      <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">Ver perfil <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></div>
    </Link>
  )
}

export default function EspacioComercialPage() {
  const { auth } = useAuth()
  const showMyBusiness = canAccessMyBusiness(auth)
  const commercialSpacePreview = hasPreviewAccessToModule(auth, "commercialSpace")
  const role = getUserPrimaryRole(auth)

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700"><Store className="h-3.5 w-3.5" />Espacio comercial</div>
        <h1 className="text-2xl font-bold text-foreground">Espacio comercial</h1>
        <p className="max-w-3xl text-sm text-muted-foreground">Descubrí actividad comercial profesional de tu zona: promociones, lanzamientos, catálogos, novedades y negocios activos en un feed vivo.</p>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-violet-200 bg-violet-800 text-white">
        <div className="grid gap-4 p-5 md:grid-cols-[1.1fr_0.9fr] md:p-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold"><Radio className="h-3.5 w-3.5" />Feed comercial local</div>
            <h2 className="mt-4 text-2xl font-bold">Negocios con movimiento, no un directorio</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/85">Espacio comercial reúne publicaciones de comercios y emprendimientos: promos, combos, nuevos productos, eventos y destacados. Mercado queda para intercambios casuales entre vecinos.</p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-4">
            <p className="text-sm font-semibold">Diferenciación clara</p>
            <div className="mt-3 grid gap-2 text-sm text-white/85">
              <div className="rounded-2xl bg-white/10 p-3"><span className="font-semibold text-white">Mercado:</span> usados, publicaciones rápidas e intercambio vecinal.</div>
              <div className="rounded-2xl bg-white/10 p-3"><span className="font-semibold text-white">Espacio comercial:</span> branding, catálogo, promociones, patrocinio y actividad profesional.</div>
            </div>
          </div>
        </div>
      </div>

      {commercialSpacePreview && (
        <div className="rounded-[24px] border border-violet-200 bg-violet-50 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700"><Handshake className="h-5 w-5" /></div>
              <div>
                <p className="text-sm font-semibold text-foreground">{role === "service_provider" ? "Conectá con comercios de tu zona para ofrecer tus servicios o generar alianzas." : "Mirá cómo tu negocio puede aparecer dentro de la red local."}</p>
                <p className="mt-1 text-sm text-muted-foreground">{role === "service_provider" ? "Esta vista preview te muestra comercios y emprendimientos cercanos para detectar oportunidades comerciales sin bloquearte el ecosistema." : "Esta vista preview te ayuda a entender la presencia comercial disponible antes de activar el acceso completo a comunidad."}</p>
              </div>
            </div>
            <Button asChild className="bg-violet-600 text-white hover:bg-violet-700"><Link href="/dashboard/suscripciones">{role === "service_provider" ? "Activar plan Red local" : "Activar acceso Comunidad"}</Link></Button>
          </div>
        </div>
      )}

      <CommercialFeed />

      <Tabs defaultValue="comercios" className="w-full">
        <TabsList className="grid h-auto w-full max-w-[520px] grid-cols-2 gap-2 rounded-2xl bg-muted p-1.5">
          <TabsTrigger value="comercios" className="gap-2 rounded-xl px-4 py-3 text-sm"><Store className="h-4 w-4" />Comercios</TabsTrigger>
          <TabsTrigger value="emprendimientos" className="gap-2 rounded-xl px-4 py-3 text-sm"><Sparkles className="h-4 w-4" />Emprendimientos locales</TabsTrigger>
        </TabsList>

        <TabsContent value="comercios" className="mt-5 space-y-4">
          <div className="rounded-[24px] border border-violet-200 bg-violet-50 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-violet-700"><MapPin className="h-4 w-4" /><span className="font-medium">Comercios</span></div>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Negocios y locales con dirección visible, horarios, ficha institucional y publicaciones comerciales activas.</p>
              </div>
              <Button asChild className="bg-violet-600 text-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-200 hover:scale-[1.01] hover:bg-violet-700"><Link href="/dashboard/comercios">Explorar comercios</Link></Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">{commerceItems.map((item) => <CommercialPreviewCard key={item.title} {...item} type="commerce" />)}</div>
        </TabsContent>

        <TabsContent value="emprendimientos" className="mt-5 space-y-4">
          <div className="rounded-[24px] border border-violet-200 bg-violet-50 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-violet-700"><Sparkles className="h-4 w-4" /><span className="font-medium">Emprendimientos locales</span></div>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Proyectos y marcas de vecinos con catálogo, atención directa, novedades y lanzamientos propios.</p>
              </div>
              <Button asChild className="bg-violet-600 text-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-200 hover:scale-[1.01] hover:bg-violet-700"><Link href="/dashboard/comercios?tipo=emprendimientos">Explorar emprendimientos</Link></Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">{entrepreneurItems.map((item) => <CommercialPreviewCard key={item.title} {...item} type="entrepreneur" />)}</div>
        </TabsContent>
      </Tabs>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-foreground">¿Querés activar presencia comercial profesional?</h3>
            <p className="mt-1 text-sm text-muted-foreground">Creá publicaciones comerciales para novedades, promociones y lanzamientos. Si solo querés vender algo usado, usá Mercado.</p>
          </div>
          {showMyBusiness ? (
            <div className="flex flex-col items-end gap-1">
              <Button asChild className="bg-sidebar-primary text-sidebar-primary-foreground hover:opacity-90"><Link href="/dashboard/comercial"><Briefcase className="mr-2 h-4 w-4" />Ir a Mi negocio</Link></Button>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground"><Lock className="h-3 w-3" />Panel privado de tu cuenta</span>
            </div>
          ) : role === "service_provider" ? (
            <Button asChild className="bg-violet-600 text-white hover:bg-violet-700"><Link href="/dashboard/suscripciones"><Handshake className="mr-2 h-4 w-4" />Activar plan Red local</Link></Button>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline"><Link href="/dashboard/marketplace"><Package className="mr-2 h-4 w-4" />Publicar en Mercado</Link></Button>
              <Button asChild className="bg-violet-600 text-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-200 hover:scale-[1.01] hover:bg-violet-700"><Link href="/dashboard/services/new"><Search className="mr-2 h-4 w-4" />Ofrecer servicio</Link></Button>
              <Button asChild className="bg-violet-600 text-white hover:bg-violet-700"><Link href="/dashboard/comercial"><Megaphone className="mr-2 h-4 w-4" />Crear publicación comercial</Link></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
