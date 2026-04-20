import { SectionHeader } from "@/components/dashboard/section-header"
import { DiscoveryCard } from "@/components/dashboard/discovery-card"

const activities = [
  {
    type: "servicio",
    title: "Electricista matriculado",
    subtitle: "Perfil destacado con respuesta rápida y valoraciones recientes.",
    user: "Ana M.",
    distance: "a 8 min",
    tag: "Servicio destacado",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=640&h=420&fit=crop",
    href: "/dashboard/services",
  },
  {
    type: "comercial",
    title: "Promo en panadería artesanal",
    subtitle: "Comercio destacado con catálogo activo y pedido por WhatsApp.",
    user: "Punto Trigo",
    distance: "a 6 min",
    tag: "Comercio destacado",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=640&h=420&fit=crop",
    href: "/dashboard/comercios/3",
  },
  {
    type: "emprendimiento",
    title: "Luna Cerámica",
    subtitle: "Emprendimiento local promocionado para ganar visibilidad en la zona.",
    user: "Emprendimiento local",
    distance: "a 10 min",
    tag: "Emprendimiento destacado",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=640&h=420&fit=crop",
    href: "/dashboard/comercios/5?tipo=emprendimientos",
  },
]

const tagStyles: Record<string, string> = {
  "Servicio destacado": "bg-sky-500/15 text-sky-800 border-sky-300",
  "Comercio destacado": "bg-violet-500/15 text-violet-800 border-violet-300",
  "Emprendimiento destacado": "bg-fuchsia-500/15 text-fuchsia-800 border-fuchsia-300",
}

export function RecentActivity() {
  return (
    <section className="rounded-3xl border border-violet-200/50 bg-card/95 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
      <SectionHeader
        title="Cerca tuyo"
        subtitle="Perfiles destacados de servicios, comercios y emprendimientos con mayor visibilidad."
        action={<span className="text-xs font-semibold text-violet-700">Perfiles promocionados</span>}
      />

      <div className="scrollbar-hide -mx-1 flex gap-3 overflow-x-auto rounded-2xl bg-violet-50/50 px-2 py-2">
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
            href={item.href}
          />
        ))}
      </div>
    </section>
  )
}
