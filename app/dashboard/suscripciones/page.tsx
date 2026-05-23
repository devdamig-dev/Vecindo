"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { CreditCard, Check, Gem, Rocket, Store } from "lucide-react"

const plans = [
  { id: "free", name: "Free", price: "Gratis", period: "", description: "Presencia básica para descubrir la zona y participar en la red local.", features: ["Perfil base", "Publicaciones esenciales", "Guardados e interacción"], recommended: false, icon: Rocket },
  { id: "business", name: "Negocio", price: "$9.990", period: "/mes", description: "Showroom comercial, catálogo y métricas para crecer cerca tuyo.", features: ["Showroom y catálogo", "Promociones", "Métricas de actividad", "Mayor exposición en comercio"], recommended: true, icon: Store },
]

const sponsorUpgrade = {
  name: "Sponsor",
  description: "Upgrade premium adicional para impulsar posicionamiento y visibilidad en toda la app.",
  features: ["Destacados en Home", "Prioridad en Cerca tuyo", "Mayor alcance en stories", "Posicionamiento preferente"],
}

export default function SuscripcionesPage() {
  const { auth } = useAuth()
  const hasBusiness = Boolean(auth.commercialActivity?.hasBusinessProfile || auth.businessProfile)
  const currentPlanId = hasBusiness ? "business" : "free"

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2"><CreditCard className="h-6 w-6 text-primary" /><h1 className="text-2xl font-bold">Planes y upgrades</h1></div>
        <p className="mt-1 text-sm text-muted-foreground">Un único usuario. Activá negocio y luego potenciá alcance con Sponsor.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlanId
          return <div key={plan.id} className={`rounded-2xl border p-6 ${plan.recommended ? "border-primary/40 bg-primary/5" : "bg-card"}`}>
            <div className="mb-3 flex items-center gap-2">{plan.recommended && <Badge>Recomendado</Badge>}{isCurrent && <Badge variant="secondary">Actual</Badge>}</div>
            <div className="mb-4 flex items-center gap-3"><div className="rounded-xl bg-primary/10 p-2 text-primary"><plan.icon className="h-5 w-5" /></div><h3 className="text-lg font-semibold">{plan.name}</h3></div>
            <div className="mb-3"><span className="text-3xl font-bold">{plan.price}</span><span className="text-sm text-muted-foreground"> {plan.period}</span></div>
            <p className="mb-4 text-sm text-muted-foreground">{plan.description}</p>
            <ul className="mb-5 space-y-2">{plan.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-primary" />{feature}</li>)}</ul>
            <Button className="w-full" disabled={isCurrent}>{isCurrent ? "Plan actual" : "Activar plan"}</Button>
          </div>
        })}
      </div>

      <section className="rounded-3xl border border-violet-300/40 bg-gradient-to-br from-violet-100/80 to-fuchsia-100/70 p-6 shadow-[0_16px_38px_rgba(124,58,237,0.16)]">
        <div className="mb-4 flex items-center gap-3"><div className="rounded-xl bg-violet-600 p-2 text-white"><Gem className="h-5 w-5" /></div><div><h3 className="text-lg font-semibold">{sponsorUpgrade.name} · Upgrade premium</h3><p className="text-sm text-muted-foreground">{sponsorUpgrade.description}</p></div></div>
        <div className="grid gap-2 sm:grid-cols-2">{sponsorUpgrade.features.map((f) => <div key={f} className="rounded-xl bg-white/70 px-3 py-2 text-sm">{f}</div>)}</div>
        <Button className="mt-5">Quiero boost sponsor</Button>
      </section>
    </div>
  )
}
