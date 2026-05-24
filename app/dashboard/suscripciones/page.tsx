"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { CreditCard, Check, Gem, Rocket, Store, Wrench } from "lucide-react"

const plans = [
  { id: "free", name: "Free / Básico", price: "Gratis", period: "", description: "Para empezar en VEZI: descubrí servicios, comercios y movimiento local.", features: ["Perfil único", "Explorar Servicios y Espacio", "Guardados e interacción"], icon: Rocket },
  { id: "services-pro", name: "Servicios Pro", price: "$6.990", period: "/mes", description: "Más visibilidad y herramientas para quienes ofrecen servicios en su zona.", features: ["Perfil profesional destacado", "Prioridad en búsquedas de Servicios", "Más señales de confianza"], icon: Wrench },
  { id: "business", name: "Negocio", price: "$9.990", period: "/mes", description: "Showroom comercial con más alcance para productos, promos e historias.", features: ["Showroom y catálogo", "Promociones y stories", "Métricas de actividad comercial"], icon: Store },
]

const sponsorUpgrade = {
  name: "Sponsor",
  description: "Upgrade premium adicional para potenciar presencia y visibilidad en toda la red VEZI.",
  features: ["Home con mayor exposición", "Prioridad en Cerca tuyo", "Boost en stories y feed comercial", "Espacios destacados + redes sociales VEZI"],
}

export default function SuscripcionesPage() {
  const { auth } = useAuth()
  const hasBusiness = Boolean(auth.commercialActivity?.hasBusinessProfile || auth.businessProfile)
  const currentPlanId = hasBusiness ? "business" : "free"

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2"><CreditCard className="h-6 w-6 text-primary" /><h1 className="text-2xl font-bold">Planes y upgrades</h1></div>
        <p className="mt-1 text-sm text-muted-foreground">Un usuario, múltiples caminos: empezá con Básico y escalá a Servicios Pro, Negocio y Sponsor.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlanId
          const isRecommended = plan.id === "business"
          return <div key={plan.id} className={`rounded-3xl border p-6 shadow-sm ${isRecommended ? "border-violet-200 bg-gradient-to-br from-violet-50/80 via-white to-sky-50/70" : "border-slate-200/80 bg-white/90"}`}>
            <div className="mb-3 flex items-center gap-2">{isRecommended && <Badge>Recomendado</Badge>}{isCurrent && <Badge variant="secondary">Actual</Badge>}</div>
            <div className="mb-4 flex items-center gap-3"><div className="rounded-xl bg-primary/10 p-2 text-primary"><plan.icon className="h-5 w-5" /></div><h3 className="text-lg font-semibold">{plan.name}</h3></div>
            <div className="mb-3"><span className="text-3xl font-bold">{plan.price}</span><span className="text-sm text-muted-foreground"> {plan.period}</span></div>
            <p className="mb-4 text-sm text-muted-foreground">{plan.description}</p>
            <ul className="mb-5 space-y-2">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" />{feature}</li>)}</ul>
            <Button className="w-full" disabled={isCurrent}>{isCurrent ? "Plan actual" : "Activar plan"}</Button>
          </div>
        })}
      </div>

      <section className="rounded-3xl border border-violet-300/40 bg-gradient-to-br from-slate-950 via-violet-950 to-sky-900 p-6 text-white shadow-[0_16px_38px_rgba(30,41,59,0.26)]">
        <div className="mb-4 flex items-center gap-3"><div className="rounded-xl bg-white/20 p-2 text-white"><Gem className="h-5 w-5" /></div><div><h3 className="text-lg font-semibold">{sponsorUpgrade.name} · Upgrade premium adicional</h3><p className="text-sm text-violet-100/90">{sponsorUpgrade.description}</p></div></div>
        <div className="grid gap-2 sm:grid-cols-2">{sponsorUpgrade.features.map((f) => <div key={f} className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm">{f}</div>)}</div>
        <Button className="mt-5 bg-white text-slate-900 hover:bg-white/90">Quiero boost sponsor</Button>
      </section>
    </div>
  )
}
