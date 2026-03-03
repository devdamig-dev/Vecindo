import Link from "next/link"
import { Search, MessageCircle, ShoppingBag, PawPrint } from "lucide-react"

const actions = [
  {
    label: "Buscar Servicio",
    description: "Profesionales verificados",
    icon: Search,
    href: "/dashboard/services",
  },
  {
    label: "Preguntar",
    description: "Consulta a la comunidad",
    icon: MessageCircle,
    href: "/dashboard/questions",
  },
  {
    label: "Ver Mercado",
    description: "Articulos cerca tuyo",
    icon: ShoppingBag,
    href: "/dashboard/marketplace",
  },
  {
    label: "Mascotas",
    description: "Perdidos, encontrados y mas",
    icon: PawPrint,
    href: "/dashboard/pets",
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 text-center transition-all hover:border-primary/30 hover:shadow-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <action.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{action.label}</p>
            <p className="text-xs text-muted-foreground">{action.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
