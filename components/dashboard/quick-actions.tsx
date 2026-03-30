import Link from "next/link"
import { Wrench, ShoppingBag, Heart, Store } from "lucide-react"

const actions = [
  {
    label: "Mercado",
    description: "Compra y venta en tu zona entre vecinos.",
    icon: ShoppingBag,
    href: "/dashboard/marketplace",
    cardClass: "border-emerald-200 bg-emerald-100/80 hover:bg-emerald-100 hover:border-emerald-300",
    iconWrapClass: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Servicios",
    description: "Ofrecé o encontrá servicios, oficios y ayuda real.",
    icon: Wrench,
    href: "/dashboard/services",
    cardClass: "border-sky-200 bg-sky-100/80 hover:bg-sky-100 hover:border-sky-300",
    iconWrapClass: "bg-sky-100 text-sky-700",
  },
  {
    label: "Espacio comercial",
    description: "Comercios y emprendimientos para descubrir en la zona.",
    icon: Store,
    href: "/dashboard/espacio-comercial",
    cardClass: "border-amber-200 bg-amber-100/80 hover:bg-amber-100 hover:border-amber-300",
    iconWrapClass: "bg-amber-100 text-amber-700",
  },
  {
    label: "Ayuda comunitaria",
    description: "Mascotas, seguridad, colectas y pedidos puntuales.",
    icon: Heart,
    href: "/dashboard/ayuda",
    cardClass: "border-rose-200 bg-rose-100/80 hover:bg-rose-100 hover:border-rose-300",
    iconWrapClass: "bg-rose-100 text-rose-700",
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => (
        <Link key={action.href} href={action.href} className={`group flex min-h-[150px] flex-col items-start gap-4 rounded-[24px] border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${action.cardClass}`}>
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${action.iconWrapClass}`}>
            <action.icon className="h-5 w-5" />
          </div>
          <div className="space-y-1.5">
            <p className="text-base font-semibold leading-tight text-foreground">{action.label}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{action.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
