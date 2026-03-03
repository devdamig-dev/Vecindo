"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { CreditCard, Check, Star, Store, Megaphone, BarChart3, MapPin, Search } from "lucide-react"

const plans = [
  {
    id: "free",
    name: "Plan Gratuito",
    price: "Gratis",
    period: "",
    description: "Visibilidad b\u00e1sica para comenzar a ofrecer tus servicios en la zona.",
    features: [
      "Perfil b\u00e1sico en el directorio",
      "1 novedad de zona por semana",
      "Rese\u00f1as de vecinos",
      "Contacto por WhatsApp",
    ],
    recommended: false,
    targetRoles: ["resident", "external_professional"],
    icon: Search,
  },
  {
    id: "professional",
    name: "Profesional Destacado",
    price: "$4.990",
    period: "/mes",
    description: "Destac\u00e1 tu perfil profesional y lleg\u00e1 a m\u00e1s vecinos de la zona.",
    features: [
      "Prioridad en b\u00fasqueda de servicios",
      "3 novedades de zona por semana",
      "Badge de Profesional Destacado",
      "Panel de estad\u00edsticas (demo)",
      "Posici\u00f3n preferencial en resultados",
    ],
    recommended: true,
    targetRoles: ["resident", "external_professional"],
    icon: Star,
  },
  {
    id: "commerce",
    name: "Plan Comercio",
    price: "$9.990",
    period: "/mes",
    description: "Tu negocio visible en la gu&iacute;a de comercios de la zona con presencia en el mapa.",
    features: [
      "Listado en Gu&iacute;a de Comercios",
      "Presencia en el mapa de la zona",
      "Visibilidad promocional destacada",
      "P\u00e1gina de perfil de comercio",
      "Rese\u00f1as de vecinos verificados",
      "Panel de estad\u00edsticas (demo)",
    ],
    recommended: false,
    targetRoles: ["resident"],
    icon: Store,
  },
]

export default function SuscripcionesPage() {
  const { auth } = useAuth()
  const isResident = auth.accountType === "resident"

  const visiblePlans = plans.filter((p) =>
    p.targetRoles.includes(auth.accountType)
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Suscripciones</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {"Eleg\u00ed el plan que mejor se adapte a tus necesidades."}
        </p>
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4">
        <p className="text-sm text-foreground">
          <strong>Tu plan actual:</strong> Plan Gratuito
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Todos los planes se gestionan sin tarjeta de cr\u00e9dito durante la etapa beta.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visiblePlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-xl border bg-card p-6 transition-all ${
              plan.recommended
                ? "border-primary shadow-sm"
                : "border-border hover:border-primary/30"
            }`}
          >
            {plan.recommended && (
              <Badge className="absolute -top-2.5 left-4 bg-primary text-primary-foreground">
                Recomendado
              </Badge>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${plan.recommended ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
                <plan.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{plan.name}</h3>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-5">{plan.description}</p>

            <ul className="flex flex-col gap-2.5 mb-6 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full"
              variant={plan.recommended ? "default" : "outline"}
              disabled={plan.id === "free"}
            >
              {plan.id === "free" ? "Plan Actual" : "Seleccionar Plan"}
            </Button>
          </div>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground">
        {"No se requiere tarjeta de cr\u00e9dito. Los pagos se habilitar\u00e1n en una pr\u00f3xima versi\u00f3n."}
      </p>
    </div>
  )
}
