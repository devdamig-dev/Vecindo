"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, Sparkles, MapPin, ChevronRight, Briefcase, Package, Search, Lock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { canAccessMyBusiness, canAccessServiceManagement, hasServiceProviderActivity, isResident } from "@/lib/commercial"
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
    <Link href={href} className={`group rounded-[24px] border p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm ${isCommerce ? "border-violet-200 bg-violet-50" : "border-violet-200 bg-violet-50"}`}>
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isCommerce ? "bg-violet-100 text-violet-700" : "bg-violet-100 text-violet-700"}`}>{isCommerce ? <Store className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}</div>
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

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700"><Store className="h-3.5 w-3.5" />Espacio comercial</div>
        <h1 className="text-2xl font-bold text-foreground">Espacio comercial</h1>
        <p className="text-sm text-muted-foreground">Explorá comercios y emprendimientos locales con perfiles claros, contacto directo y presencia real en tu zona.</p>
      </div>

      <div className="rounded-[28px] border border-violet-200 bg-violet-800 p-5 text-white">
        <h2 className="text-lg font-semibold">Un único módulo, dos tipos de perfiles</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/85">Los comercios muestran ubicación visible y ficha institucional. Los emprendimientos destacan catálogo, atención directa y entregas coordinadas, aunque no tengan local físico.</p>
      </div>

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
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Negocios y locales con dirección visible, horarios y ficha más institucional dentro de la zona.</p>
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
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Proyectos y marcas de vecinos que venden productos o servicios sin necesidad de un local físico.</p>
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
            <h3 className="font-semibold text-foreground">¿Querés ofrecer algo en la zona?</h3>
            <p className="mt-1 text-sm text-muted-foreground">Publicá productos, ofrecé servicios o activá tu perfil comercial para empezar a aparecer en este módulo.</p>
          </div>
          {showMyBusiness ? (
            <div className="flex flex-col items-end gap-1">
              <Button asChild className="bg-sidebar-primary text-sidebar-primary-foreground hover:opacity-90"><Link href="/dashboard/comercial"><Briefcase className="mr-2 h-4 w-4" />Ir a Mi negocio</Link></Button>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground"><Lock className="h-3 w-3" />Panel privado de tu cuenta</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline"><Link href="/dashboard/marketplace"><Package className="mr-2 h-4 w-4" />Publicar producto</Link></Button>
              <Button asChild className="bg-violet-600 text-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-200 hover:scale-[1.01] hover:bg-violet-700"><Link href="/dashboard/services/new"><Search className="mr-2 h-4 w-4" />Ofrecer servicio</Link></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
