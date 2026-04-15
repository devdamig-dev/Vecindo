import { Wrench, ShoppingBag, Heart, Store } from "lucide-react"
import { ModuleCard } from "@/components/dashboard/module-card"

const actions = [
  {
    label: "Mercado",
    description: "Comprá y vendé en tu zona",
    icon: ShoppingBag,
    href: "/dashboard/marketplace",
    theme: "market" as const,
    chip: "Comunidad",
  },
  {
    label: "Servicios",
    description: "Ofrecé o encontrá servicios",
    icon: Wrench,
    href: "/dashboard/services",
    theme: "services" as const,
    chip: "Confiable",
  },
  {
    label: "Espacio comercial",
    description: "Negocios y emprendimientos",
    icon: Store,
    href: "/dashboard/espacio-comercial",
    theme: "commercial" as const,
    chip: "Local",
  },
  {
    label: "Ayuda vecinal",
    description: "Mascotas, seguridad, colectas y más",
    icon: Heart,
    href: "/dashboard/ayuda",
    theme: "help" as const,
    chip: "Solidario",
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
      {actions.map((action) => (
        <ModuleCard
          key={action.href}
          label={action.label}
          description={action.description}
          href={action.href}
          icon={action.icon}
          theme={action.theme}
          chip={action.chip}
        />
      ))}
    </div>
  )
}
