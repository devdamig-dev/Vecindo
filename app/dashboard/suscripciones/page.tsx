"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { Check, CreditCard, Search, Star, Store } from "lucide-react"

const plans = [
  { id: "free", name: "Plan Gratuito", price: "Gratis", period: "", description: "Visibilidad básica para explorar y empezar sin fricción.", features: ["Perfil básico en el directorio", "Contacto por WhatsApp", "Acceso a módulos públicos"], recommended: false, targetRoles: ["resident", "external_professional"], icon: Search },
  { id: "professional", name: "Profesional Destacado", price: "$4.990", period: "/mes", description: "Más presencia para perfiles de servicios que quieren aparecer mejor.", features: ["Prioridad en búsqueda de servicios", "Badge destacado", "Panel de estadísticas (demo)", "Posición preferencial"], recommended: false, targetRoles: ["resident", "external_professional"], icon: Star },
  { id: "commerce", name: "Plan Vender", price: "$9.990", period: "/mes", description: "Tu comercio como mini marca local: perfil visual, catálogo y contacto directo.", features: ["Listado en Espacio comercial", "Presencia en el mapa", "Página pública compartible", "Hasta 50 productos"], recommended: true, targetRoles: ["resident"], icon: Store },
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
    <div className="flex flex-col gap-8">
      <div className="rounded-[2.25rem] border border-stone-200/80 bg-white p-6 shadow-[0_20px_70px_rgba(44,39,31,0.06)] md:p-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#e9efe6] px-3 py-1.5 text-sm font-medium text-primary">
          <CreditCard className="h-4 w-4" />
          Planes comerciales
        </div>
        <h1 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.035em] text-stone-950 md:text-5xl">
          Elegí cómo querés aparecer en NIAR.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
          La lógica se mantiene simple: explorar, destacar o vender. El foco comercial está en Plan Vender.
        </p>
      </div>

      <div className="rounded-[1.75rem] border border-primary/15 bg-[#e9efe6]/70 px-5 py-4">
        <p className="text-sm text-stone-800"><strong>Tu plan actual:</strong> {currentPlan.name}</p>
        <p className="mt-1 text-xs text-stone-600">Durante la etapa beta los planes se muestran como referencia de producto, sin cobro real.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visiblePlans.map((plan) => {
          const isCurrent = plan.id === currentPlanId
          const isCommerce = plan.id === "commerce"
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-[2rem] border bg-white p-6 transition duration-300 ${
                isCommerce
                  ? "border-primary/35 shadow-[0_28px_80px_rgba(88,112,91,0.16)] xl:-mt-4 xl:pb-8"
                  : "border-stone-200/80 shadow-[0_16px_50px_rgba(44,39,31,0.045)] hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(44,39,31,0.08)]"
              }`}
            >
              <div className="mb-6 flex gap-2">
                {plan.recommended && <Badge className="rounded-full bg-primary text-primary-foreground">Foco comercial</Badge>}
                {isCurrent && <Badge variant="secondary" className="rounded-full">Plan actual</Badge>}
              </div>

              <div className="mb-5 flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${isCommerce ? "bg-primary text-primary-foreground" : "bg-[#e9efe6] text-primary"}`}>
                  <plan.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-stone-950">{plan.name}</h3>
              </div>

              <div className="mb-4 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-[-0.04em] text-stone-950">{plan.price}</span>
                {plan.period && <span className="text-sm text-stone-500">{plan.period}</span>}
              </div>

              <p className="mb-6 text-sm leading-6 text-stone-600">{plan.description}</p>
              <ul className="mb-7 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-stone-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full rounded-2xl" variant={isCommerce ? "default" : "outline"} disabled={isCurrent}>
                {isCurrent ? "Plan actual" : isCommerce ? "Activar Plan Vender" : "Seleccionar plan"}
              </Button>
            </div>
          )
        })}
      </div>

      <p className="text-center text-xs text-stone-500">No se requiere tarjeta de crédito. La lógica de pagos se activará en una próxima versión.</p>
    </div>
  )
}
