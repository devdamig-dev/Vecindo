import Link from "next/link"
import { Search, MessageCircle, ShoppingBag, Heart } from "lucide-react"

const actions = [
  {
    label: "Servicios",
    description: "Encontrá oficios, ayuda y servicios en tu zona",
    icon: Search,
    href: "/dashboard/services",
    cardClass:
      "border-sky-200 bg-sky-50/80 hover:bg-sky-100/80 hover:border-sky-300",
    iconWrapClass: "bg-sky-100 text-sky-700",
  },
  {
    label: "Comunidad",
    description: "Hacé preguntas y resolvé dudas con vecinos",
    icon: MessageCircle,
    href: "/dashboard/questions",
    cardClass:
      "border-violet-200 bg-violet-50/80 hover:bg-violet-100/80 hover:border-violet-300",
    iconWrapClass: "bg-violet-100 text-violet-700",
  },
  {
    label: "Mercado",
    description: "Compra y venta de productos en tu zona",
    icon: ShoppingBag,
    href: "/dashboard/marketplace",
    cardClass:
      "border-emerald-200 bg-emerald-50/80 hover:bg-emerald-100/80 hover:border-emerald-300",
    iconWrapClass: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Ayuda",
    description: "Mascotas, objetos perdidos, colectas y más",
    icon: Heart,
    href: "/dashboard/ayuda",
    cardClass:
      "border-rose-200 bg-rose-50/80 hover:bg-rose-100/80 hover:border-rose-300",
    iconWrapClass: "bg-rose-100 text-rose-700",
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className={`group flex min-h-[160px] flex-col items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${action.cardClass}`}
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${action.iconWrapClass}`}
          >
            <action.icon className="h-5 w-5" />
          </div>

          <div className="space-y-1.5">
            <p className="text-base font-semibold leading-none text-foreground">
              {action.label}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {action.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}