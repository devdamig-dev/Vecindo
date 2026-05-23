import { Building2, Megaphone, Radio, Search, Sparkles, Store, Wrench } from "lucide-react"

const sections = [
  {
    id: "como-funciona",
    title: "Cómo funciona VEZI",
    description: "Entrás, elegís tu zona, descubrís movimiento real y activás lo que necesitás: servicios, comercio o sponsor.",
    bullets: ["Un perfil único", "Flujo social y comercial integrado", "Experiencia rápida mobile-first"],
    icon: Sparkles,
  },
  {
    id: "servicios",
    title: "Servicios cerca tuyo",
    description: "El corazón de VEZI: perfiles activos, reputación visible y disponibilidad real para resolver cosas hoy.",
    bullets: ["Categorías útiles", "Reseñas y confianza", "Actividad reciente en cada perfil"],
    icon: Wrench,
  },
  { id: "comercios", title: "Comercios y emprendimientos", description: "Showrooms modernos para descubrir productos, promos e historias de negocios locales.", bullets: ["Catálogo visual", "Promociones destacadas", "Descubrimiento por cercanía"], icon: Store },
  { id: "movimiento", title: "Movimiento local en tiempo real", description: "Novedades de la zona, pedidos, recomendaciones y actividad comercial en un mismo flujo vivo.", bullets: ["Feed dinámico", "Historias locales", "Señales de actividad"], icon: Radio },
  { id: "publicaciones", title: "Publicaciones e historias", description: "Personas y marcas comparten actualizaciones que generan conversación y descubrimiento continuo.", bullets: ["Formato social", "Contenido útil", "Interacción contextual"], icon: Megaphone },
  { id: "perfiles", title: "Perfiles comerciales", description: "Cada negocio muestra identidad, servicios, métricas y pruebas sociales para convertir más cerca suyo.", bullets: ["Showroom + métricas", "Promos activas", "Posicionamiento local"], icon: Building2 },
  { id: "sponsor", title: "Sponsors destacados", description: "Sponsor es un upgrade premium para ganar prioridad visual en Home, Cerca tuyo, Stories y feed comercial.", bullets: ["Boost aspiracional", "Mayor alcance", "Prioridad de exposición"], icon: Search },
]

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl space-y-5 px-6">
        {sections.map((section) => (
          <article key={section.id} id={section.id} className="rounded-3xl border border-white/60 bg-gradient-to-br from-white via-sky-50/60 to-violet-50/60 p-6 shadow-[0_16px_45px_rgba(14,116,144,0.1)]">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg"><section.icon className="h-5 w-5" /></div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{section.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {section.bullets.map((bullet) => <span key={bullet} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{bullet}</span>)}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
