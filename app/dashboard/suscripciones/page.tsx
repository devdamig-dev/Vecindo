"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { CreditCard, Check, Gem, Rocket, ShieldCheck, Store, Wrench } from "lucide-react"

const plans = [
  { id: "free", name: "Free", price: "Gratis", period: "", description: "Presencia base para participar y descubrir actividad local.", features: ["Perfil básico", "Interacciones y guardados", "Acceso al feed local"], icon: Rocket },
  { id: "services-pro", name: "Servicios Pro", price: "$5.990", period: "/mes", description: "Más alcance para perfiles de servicios y profesionales.", features: ["Destacado en búsquedas", "Badge verificado", "Analytics", "Prioridad en listados"], icon: Wrench },
  { id: "business", name: "Negocio", price: "$9.990", period: "/mes", description: "Showroom, catálogo y publicación comercial para crecer localmente.", features: ["Showroom completo", "Catálogo y promos", "Publicaciones comerciales", "Métricas de rendimiento"], icon: Store },
]

const sponsorUpgrade = { name: "Sponsor", description: "Upgrade premium adicional (no plan independiente).", features: ["Destacados en Home", "Boost local en Cerca tuyo", "Prioridad visual en Stories", "Presencia en feed comercial", "Campañas destacadas"] }

export default function SuscripcionesPage() {
  const { auth } = useAuth()
  const hasBusiness = Boolean(auth.commercialActivity?.hasBusinessProfile || auth.businessProfile)
  const currentPlanId = hasBusiness ? "business" : "free"

  return (
    <div className="flex flex-col gap-6">
      <section className="premium-glow rounded-3xl border border-violet-300/30 bg-[linear-gradient(140deg,rgba(30,41,90,0.85),rgba(59,30,125,0.85))] p-5">
        <div className="flex items-center gap-2"><CreditCard className="h-6 w-6 text-cyan-300" /><h1 className="text-2xl font-bold text-white">Planes y upgrades</h1></div>
        <p className="mt-1 text-sm text-slate-200">Un solo usuario, múltiples activaciones: servicios, negocio y sponsor.</p>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlanId
          return <div key={plan.id} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-2">{plan.id === "business" && <Badge className="bg-violet-500/20 text-violet-100">Top</Badge>}{isCurrent && <Badge variant="secondary">Actual</Badge>}</div>
            <div className="mb-3 flex items-center gap-3"><div className="rounded-xl bg-white/10 p-2 text-cyan-200"><plan.icon className="h-5 w-5" /></div><h3 className="text-lg font-semibold text-white">{plan.name}</h3></div>
            <div className="mb-2"><span className="text-3xl font-bold text-white">{plan.price}</span><span className="text-sm text-slate-300"> {plan.period}</span></div>
            <p className="mb-4 text-sm text-slate-300">{plan.description}</p>
            <ul className="mb-5 space-y-2">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm text-slate-100"><Check className="h-4 w-4 text-cyan-300" />{feature}</li>)}</ul>
            <Button className="w-full" disabled={isCurrent}>{isCurrent ? "Plan actual" : "Activar plan"}</Button>
          </div>
        })}
      </div>

      <section className="premium-glow rounded-3xl border border-cyan-300/30 bg-[linear-gradient(135deg,rgba(14,116,144,0.28),rgba(88,28,135,0.35))] p-6">
        <div className="mb-4 flex items-center gap-3"><div className="rounded-xl bg-violet-600 p-2 text-white"><Gem className="h-5 w-5" /></div><div><h3 className="text-lg font-semibold text-white">{sponsorUpgrade.name} · Upgrade aspiracional</h3><p className="text-sm text-slate-200">{sponsorUpgrade.description}</p></div></div>
        <div className="grid gap-2 sm:grid-cols-2">{sponsorUpgrade.features.map((f) => <div key={f} className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-slate-100">{f}</div>)}</div>
        <div className="mt-4 rounded-xl border border-emerald-300/30 bg-emerald-500/10 p-3 text-sm text-emerald-100"><ShieldCheck className="mr-1 inline h-4 w-4" />El verde queda reservado para estados de confianza y validación.</div>
        <Button className="mt-5"><Gem className="mr-2 h-4 w-4" />Quiero boost sponsor</Button>
      </section>
    </div>
  )
}
