import { ArrowRight, MapPin, MessageSquare, Search, Store, Wrench } from "lucide-react"
import { LandingAuthLink } from "./landing-auth-link"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#FF5A67] to-[#D81BFF]" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-6 lg:pb-28 lg:pt-28">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#FF5A67]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[.14em] text-[#b42336]"><MapPin className="h-3.5 w-3.5" /> Pulso local</p>
          <h1 className="max-w-3xl text-balance text-5xl font-black leading-[.95] tracking-[-.05em] text-foreground sm:text-6xl lg:text-7xl">Encontrá, pedí y resolvé <span className="text-gradient-vezi">cerca tuyo.</span></h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-600">Descubrí servicios, comercios, emprendimientos y productos de tu zona. Y si no encontrás lo que buscás, publicá una necesidad para que te encuentren.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LandingAuthLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-vezi-ink px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5">Empezar en VEZI <ArrowRight className="h-4 w-4" /></LandingAuthLink>
            <LandingAuthLink mode="login" className="inline-flex min-h-12 items-center justify-center rounded-2xl border-2 border-slate-950 px-6 py-3 text-sm font-bold transition hover:bg-white">Ya tengo cuenta</LandingAuthLink>
          </div>
        </div>

        <div className="relative" aria-label="Vista previa de una búsqueda en VEZI">
          <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-orange-400/25 to-fuchsia-500/25 blur-3xl" />
          <div className="relative rounded-[2rem] border border-slate-800 bg-vezi-ink p-4 shadow-2xl sm:p-6">
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-medium text-slate-700"><Search className="h-5 w-5 text-[#FF5A67]" /> ¿Qué estás buscando?</div>
            <p className="mb-3 mt-6 text-xs font-bold uppercase tracking-widest text-[#ff9ca5]">Resultados cerca tuyo</p>
            <div className="space-y-3">
              <div className="rounded-2xl bg-white/10 p-4 text-white ring-1 ring-sky-400/50"><div className="flex items-center gap-2 text-xs font-bold uppercase text-sky-300"><Wrench className="h-4 w-4" /> Servicio · a 1,2 km</div><p className="mt-2 font-bold">Laura · Profesora de matemática</p><p className="mt-1 text-xs text-white/70">Clases de apoyo primario y secundario</p></div>
              <div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white/10 p-4 ring-1 ring-[#FF5A67]/50 text-white"><MessageSquare className="h-4 w-4" /><p className="mt-4 text-sm font-bold">Necesidad relacionada</p><p className="mt-1 text-xs text-white/80">Apoyo escolar en Hudson</p></div><div className="rounded-2xl bg-white/10 p-4 ring-1 ring-teal-400/50 text-white"><Store className="h-4 w-4" /><p className="mt-4 text-sm font-bold">Comercio relacionado</p><p className="mt-1 text-xs text-white/80">Librería El Faro</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
