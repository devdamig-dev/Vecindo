import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/dashboard/section-header"

const activities = [
  {
    type: "servicio",
    title: "Electricista matriculado",
    subtitle: "Disponible hoy en Hudson",
    user: "Ana M.",
    distance: "a 8 min",
    tag: "Servicios",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=640&h=420&fit=crop",
  },
  {
    type: "mercado",
    title: "Parrilla Weber impecable",
    subtitle: "Publicación nueva con retiro en barrio",
    user: "Sofía L.",
    distance: "a 12 min",
    tag: "Mercado",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=640&h=420&fit=crop",
  },
  {
    type: "comercial",
    title: "Promo en panadería artesanal",
    subtitle: "2x1 en facturas hasta las 18 h",
    user: "Punto Trigo",
    distance: "a 6 min",
    tag: "Espacio comercial",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=640&h=420&fit=crop",
  },
]

const tagStyles: Record<string, string> = {
  Servicios: "bg-sky-500/10 text-sky-700 border-sky-200",
  Mercado: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
  "Espacio comercial": "bg-violet-500/10 text-violet-700 border-violet-200",
}

export function RecentActivity() {
  return (
    <section className="rounded-3xl border border-border/70 bg-card p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <SectionHeader
        title="Cerca tuyo"
        subtitle="Descubrí oportunidades y recomendaciones publicadas en tu zona"
      />

      <div className="scrollbar-hide -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
        {activities.map((item) => (
          <article
            key={`${item.type}-${item.title}`}
            className="w-[270px] shrink-0 overflow-hidden rounded-2xl border border-border/70 bg-background"
          >
            <div className="relative h-32 w-full overflow-hidden bg-muted">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
              />
              <Badge className={`absolute left-2.5 top-2.5 border text-[10px] ${tagStyles[item.tag]}`}>
                {item.tag}
              </Badge>
            </div>

            <div className="space-y-2 p-3.5">
              <p className="line-clamp-1 text-sm font-semibold text-foreground">{item.title}</p>
              <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.subtitle}</p>

              <div className="flex items-center justify-between border-t border-border/70 pt-2 text-[11px] text-muted-foreground">
                <span>{item.user}</span>
                <span>{item.distance}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
