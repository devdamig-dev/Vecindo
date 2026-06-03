import { HandHelping, Wrench, Store, Sparkles } from "lucide-react"
import { ModuleCard } from "@/components/dashboard/module-card"

const actions = [
  {
    label: "Necesito",
    description: "Publicá lo que necesitás y recibí respuestas",
    icon: HandHelping,
    href: "/dashboard/necesito",
    theme: "help" as const,
    chip: "Demanda",
  },
  {
    label: "Servicios",
    description: "Profesionales de confianza para lo que precisás",
    icon: Wrench,
    href: "/dashboard/servicios",
    theme: "services" as const,
    chip: "Confiable",
  },
  {
    label: "Comercios",
    description: "Locales físicos con catálogo y contacto directo",
    icon: Store,
    href: "/dashboard/comercios",
    theme: "commercial" as const,
    chip: "Local",
  },
  {
    label: "Emprendimientos",
    description: "Marcas locales creadas por vecinos",
    icon: Sparkles,
    href: "/dashboard/emprendimientos",
    theme: "market" as const,
    chip: "Comunidad",
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3.5 md:gap-4">
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
