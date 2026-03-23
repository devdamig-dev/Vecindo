import Link from "next/link"
import { Search, MessageCircle, ShoppingBag, Heart } from "lucide-react"

const actions = [
  {
    label: "Servicios",
    description: "Encontrá oficios, ayuda y servicios en tu zona",
    icon: Search,
    href: "/dashboard/services",
    color: "text-sky-600 bg-sky-100 group-hover:bg-sky-600 group-hover:text-white",
  },
  {
    label: "Comunidad",
    description: "Hacé preguntas y resolvé dudas con vecinos",
    icon: MessageCircle,
    href: "/dashboard/questions",
    color: "text-violet-600 bg-violet-100 group-hover:bg-violet-600 group-hover:text-white",
  },
  {
    label: "Mercado",
    description: "Compra y venta de productos en tu zona",
    icon: ShoppingBag,
    href: "/dashboard/marketplace",
    color: "text-emerald-600 bg-emerald-100 group-hover:bg-emerald-600 group-hover:text-white",
  },
  {
    label: "Ayuda",
    description: "Mascotas, objetos perdidos, colectas y más",
    icon: Heart,
    href: "/dashboard/ayuda",
    color: "text-rose-600 bg-rose-100 group-hover:bg-rose-600 group-hover:text-white",
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className="group flex min-h-[150px] flex-col items-start gap-4 rounded-2xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-sm"
        >
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${action.color}`}
          >
            <action.icon className="h-5 w-5" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-semibold leading-none text-foreground">
              {action.label}
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {action.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}