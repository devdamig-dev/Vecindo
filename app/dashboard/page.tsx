"use client"

import Link from "next/link"
import { ArrowRight, BellRing, HandHelping, MapPin, MessageSquare, Sparkles, Store, Wrench } from "lucide-react"
import { ZoneUpdatesCarousel } from "@/components/zone-updates/zone-updates-carousel"

const activeNeeds = [
  { id: "1", title: "Profesora particular de matemática", zone: "Hudson", replies: 3, urgency: "Esta semana" },
  { id: "2", title: "Plomero para una pérdida en el baño", zone: "Berazategui", replies: 5, urgency: "Urgente" },
]

const discovery = [
  { title: "Servicios que pueden ayudarte", copy: "Profesionales y personas que ofrecen soluciones cerca tuyo.", href: "/dashboard/servicios", icon: Wrench, className: "bg-sky-600 text-white", cta: "Explorar servicios" },
  { title: "Comercios de la zona", copy: "Negocios con local, catálogo y contacto directo.", href: "/dashboard/comercios", icon: Store, className: "bg-violet-600 text-white", cta: "Ver comercios" },
  { title: "Emprendimientos locales", copy: "Proyectos independientes, productos y propuestas con identidad propia.", href: "/dashboard/emprendimientos", icon: Sparkles, className: "bg-emerald-600 text-white", cta: "Descubrir emprendimientos" },
]

export default function DashboardPage() {
  return (
    <div className="flex min-w-0 flex-col gap-7 overflow-x-hidden pb-4">
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 px-5 py-7 text-white shadow-[0_24px_55px_rgba(234,88,12,.28)] sm:px-7">
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border-[28px] border-white/10" />
        <div className="relative max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-amber-100">Necesidades · la demanda activa VEZI</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">¿Qué necesitás?</h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">Contalo en pocas palabras. VEZI usa la categoría y tu ubicación para acercarlo a quienes pueden resolverlo.</p>
          <Link href="/dashboard/necesito/nueva" className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-orange-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
            <HandHelping className="h-5 w-5" /> Publicar una necesidad <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-rose-100 bg-rose-50/60 p-4"><div className="mb-3"><p className="text-xs font-bold uppercase tracking-wider text-rose-700">Actividad reciente</p><h2 className="text-xl font-bold">Novedades cerca tuyo</h2></div><ZoneUpdatesCarousel zoneId="berazategui" /></section>

      <section aria-labelledby="active-needs">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div><p className="text-xs font-bold uppercase tracking-wider text-amber-700">Demanda cerca tuyo</p><h2 id="active-needs" className="text-xl font-bold">Necesidades activas</h2></div>
          <Link href="/dashboard/necesito" className="text-xs font-bold text-amber-700">Ver todas →</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {activeNeeds.map((need) => (
            <Link key={need.id} href={`/dashboard/necesito/${need.id}`} className="group rounded-3xl border border-amber-200 bg-amber-50 p-4 transition hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-md">
              <div className="flex items-center justify-between"><span className="rounded-full bg-orange-600 px-2.5 py-1 text-[10px] font-bold text-white">{need.urgency}</span><ArrowRight className="h-4 w-4 text-amber-700 transition group-hover:translate-x-1" /></div>
              <h3 className="mt-3 font-bold leading-snug">{need.title}</h3>
              <div className="mt-3 flex gap-3 text-xs text-amber-900/70"><span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{need.zone}</span><span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" />{need.replies} respuestas</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3" aria-label="Oferta para resolver necesidades">
        {discovery.map(({ icon: Icon, ...item }) => <Link key={item.href} href={item.href} className={`group flex min-h-52 flex-col rounded-3xl p-5 shadow-lg transition hover:-translate-y-1 ${item.className}`}><Icon className="h-7 w-7" /><h2 className="mt-7 text-lg font-bold leading-tight">{item.title}</h2><p className="mt-2 text-sm leading-relaxed text-white/80">{item.copy}</p><span className="mt-auto pt-4 text-xs font-bold">{item.cta} <ArrowRight className="inline h-3.5 w-3.5 transition group-hover:translate-x-1" /></span></Link>)}
      </section>

      <section className="rounded-3xl bg-slate-900 p-5 text-white">
        <div className="flex items-start gap-3"><div className="rounded-2xl bg-white/10 p-3"><BellRing className="h-5 w-5 text-amber-300" /></div><div><h2 className="font-bold">VEZI conecta oferta y demanda</h2><p className="mt-1 text-sm leading-relaxed text-slate-300">Cuando publiques, prestadores, comercios o emprendimientos compatibles podrán responderte. Las respuestas y notificaciones estarán en un mismo lugar.</p></div></div>
      </section>
    </div>
  )
}
