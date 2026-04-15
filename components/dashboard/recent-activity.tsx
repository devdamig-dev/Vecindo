import { SectionHeader } from "@/components/dashboard/section-header"
import { DiscoveryCard } from "@/components/dashboard/discovery-card"

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
    <section className="rounded-3xl border border-border/70 bg-card/95 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      <SectionHeader
        title="Cerca tuyo"
        subtitle="Descubrí oportunidades y recomendaciones publicadas en tu zona"
        action={<span className="text-xs font-semibold text-muted-foreground">Actualizado hoy</span>}
      />

      <div className="scrollbar-hide -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
        {activities.map((item) => (
          <DiscoveryCard
            key={`${item.type}-${item.title}`}
            title={item.title}
            subtitle={item.subtitle}
            user={item.user}
            distance={item.distance}
            tag={item.tag}
            image={item.image}
            tagClassName={tagStyles[item.tag]}
          />
        ))}
      </div>
    </section>
  )
}
