import { ShoppingBag, MessageCircle, Star, Sparkles } from "lucide-react"

const weeklyStats = [
  {
    label: "Publicaciones en mercado",
    value: 14,
    icon: ShoppingBag,
  },
  {
    label: "Preguntas nuevas",
    value: 9,
    icon: MessageCircle,
  },
  {
    label: "Recomendaciones",
    value: 6,
    icon: Star,
  },
  {
    label: "Novedades publicadas",
    value: 11,
    icon: Sparkles,
  },
]

export function WeeklyActivity() {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Actividad de la semana
          </h3>
          <p className="text-xs text-muted-foreground">
            Movimiento reciente en tu zona
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {weeklyStats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
              <stat.icon className="h-4 w-4" />
            </div>

            <div className="leading-tight">
              <p className="text-sm font-semibold text-foreground">
                {stat.value}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}