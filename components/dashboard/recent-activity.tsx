import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Star, ShoppingBag, PawPrint } from "lucide-react"

const activities = [
  {
    type: "question",
    icon: MessageCircle,
    user: "Ana M.",
    initials: "AM",
    action: "hizo una pregunta",
    content: "¿Mejor electricista en Hudson para iluminación de piscina?",
    time: "hace 12 min",
    badge: "Pregunta",
  },
  {
    type: "review",
    icon: Star,
    user: "Carlos R.",
    initials: "CR",
    action: "dejó una reseña",
    content: "Calificó a Pinturas Express con 5 estrellas por pintura exterior",
    time: "hace 1 h",
    badge: "Reseña",
  },
  {
    type: "listing",
    icon: ShoppingBag,
    user: "Sofía L.",
    initials: "SL",
    action: "publicó un anuncio",
    content: "Parrilla Weber, excelente estado – $180",
    time: "hace 2 h",
    badge: "Mercado",
  },
  {
    type: "pet",
    icon: PawPrint,
    user: "Diego P.",
    initials: "DP",
    action: "publicó una alerta de mascota",
    content: "Golden retriever perdido cerca de la entrada principal – ENCONTRADO",
    time: "hace 3 h",
    badge: "Mascota",
  },
  {
    type: "review",
    icon: Star,
    user: "Laura T.",
    initials: "LT",
    action: "dejó una reseña",
    content: "Calificó a Jardín Pro con 4 estrellas por mantenimiento de jardín",
    time: "hace 5 h",
    badge: "Reseña",
  },
]

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-semibold text-foreground">Actividad reciente</h2>
        <p className="text-xs text-muted-foreground">Lo último en tu zona</p>
      </div>

      <div className="divide-y divide-border">
        {activities.map((item, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-4 sm:px-5">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarFallback className="bg-muted text-foreground text-xs">
                {item.initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {item.user}
                </span>

                <span className="text-xs text-muted-foreground">
                  {item.action}
                </span>

                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                  {item.badge}
                </Badge>
              </div>

              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground sm:truncate">
                {item.content}
              </p>
            </div>

            <span className="hidden shrink-0 whitespace-nowrap text-xs text-muted-foreground sm:block">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}