"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { CreditCard, Check, Star, Store, Search } from "lucide-react"

const plans = [
  { id: "free", name: "Base", price: "Gratis", period: "", description: "Cuenta universal para explorar, publicar y participar en la red local.", features: ["Perfil universal", "Publicaciones limitadas", "Guardados e interacción"], recommended: false, targetRoles: ["resident", "external_professional"], icon: Search },
  { id: "professional", name: "Servicios Pro", price: "$4.990", period: "/mes", description: "Potenciá tu perfil de servicios con prioridad, reputación y más consultas locales.", features: ["Prioridad en resultados", "Insignia de confianza", "Más visibilidad en Servicios", "Métricas de rendimiento"], recommended: true, targetRoles: ["resident", "external_professional"], icon: Star },
  { id: "commerce", name: "Negocio + Sponsor", price: "$9.990", period: "/mes", description: "Showroom comercial más posicionamiento premium integrado en VEZI.", features: ["Showroom y catálogo", "Promociones en Espacio comercial", "Destacados en Home y Cerca tuyo", "Boost de alcance local"], recommended: false, targetRoles: ["resident"], icon: Store },
]

function getCurrentPlanId(auth: ReturnType<typeof useAuth>["auth"]) {
  const hasBusiness = Boolean(auth.commercialActivity?.hasBusinessProfile || auth.businessProfile)
  const hasServices = (auth.commercialActivity?.serviceListingsCount ?? 0) > 0
  if (hasBusiness) return "commerce"
  if (hasServices) return "professional"
  return "free"
}

export default function SuscripcionesPage() {
  const { auth } = useAuth()
  const currentPlanId = getCurrentPlanId(auth)
  const currentPlan = plans.find((p) => p.id === currentPlanId) ?? plans[0]
  const visiblePlans = plans.filter((p) => p.targetRoles.includes(auth.accountType))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2"><CreditCard className="h-6 w-6 text-primary" /><h1 className="text-2xl font-bold text-foreground">Suscripciones</h1></div>
        <p className="mt-1 text-sm text-muted-foreground">Elegí cómo querés activar capacidades y presencia dentro de la red local VEZI.</p>
      </div>
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
        <p className="text-sm text-foreground"><strong>Tu plan actual:</strong> {currentPlan.name}</p>
        <p className="mt-1 text-xs text-muted-foreground">Durante la etapa beta los planes se muestran como referencia de producto, sin cobro real.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visiblePlans.map((plan) => {
          const isCurrent = plan.id === currentPlanId
          return (
            <div key={plan.id} className={`relative flex flex-col rounded-xl border bg-card p-6 transition-all ${isCurrent ? "border-primary shadow-sm" : plan.recommended ? "border-primary/40" : "border-border hover:border-primary/30"}`}>
              <div className="absolute left-4 top-4 flex gap-2">{plan.recommended && <Badge className="bg-primary text-primary-foreground">Recomendado</Badge>}{isCurrent && <Badge variant="secondary">Plan actual</Badge>}</div>
              <div className="mb-4 mt-8 flex items-center gap-3"><div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isCurrent || plan.recommended ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}><plan.icon className="h-5 w-5" /></div><div><h3 className="font-semibold text-foreground">{plan.name}</h3></div></div>
              <div className="mb-4 flex items-baseline gap-1"><span className="text-3xl font-bold text-foreground">{plan.price}</span>{plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}</div>
              <p className="mb-5 text-sm text-muted-foreground">{plan.description}</p>
              <ul className="mb-6 flex flex-1 flex-col gap-2.5">{plan.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span className="text-foreground">{feature}</span></li>)}</ul>
              <Button className="w-full" variant={isCurrent || plan.recommended ? "default" : "outline"} disabled={isCurrent}>{isCurrent ? "Plan actual" : "Seleccionar plan"}</Button>
            </div>
          )
        })}
      </div>
      <p className="text-center text-xs text-muted-foreground">No se requiere tarjeta de crédito. La lógica de pagos se activará en una próxima versión.</p>
    </div>
  )
}
