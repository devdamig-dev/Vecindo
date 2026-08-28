import { ArrowRight } from "lucide-react"
import { LandingAuthLink } from "./landing-auth-link"

export function LandingCTA() {
  return <section className="bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 py-20 text-white"><div className="mx-auto max-w-6xl px-6 text-center"><p className="text-xs font-bold uppercase tracking-[.18em] text-white/75">Todo lo que pasa cerca, conectado</p><h2 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-black tracking-tight md:text-6xl">Tu próxima solución u oportunidad puede estar a pocas cuadras.</h2><p className="mx-auto mt-5 max-w-2xl text-white/85">Creá tu cuenta y configurá las formas en las que querés participar. Podés elegir más de una.</p><LandingAuthLink className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-bold text-white">Empezar en VEZI <ArrowRight className="h-4 w-4"/></LandingAuthLink></div></section>
}
