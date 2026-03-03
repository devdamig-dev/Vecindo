import { Search, Star, ShoppingBag, PawPrint, MessageCircle, ShieldCheck } from "lucide-react"

export function LandingFeatures() {
  const features = [
    {
      icon: Search,
      title: "Directorio de Servicios",
      description: "Encuentra electricistas, plomeros, tutores y mas, todos verificados por tu comunidad.",
    },
    {
      icon: Star,
      title: "Reputacion Estructurada",
      description: "Resenas y calificaciones transparentes de vecinos reales y verificados en los que confias.",
    },
    {
      icon: MessageCircle,
      title: "Preguntas a la Comunidad",
      description: "Hace preguntas y obtene respuestas de residentes de tu zona. Consejos reales, confianza real.",
    },
    {
      icon: ShoppingBag,
      title: "Mercado Local",
      description: "Compra y vende dentro de tu comunidad. Articulos, muebles, vehiculos, solo entre vecinos.",
    },
    {
      icon: PawPrint,
      title: "Mascotas y Alertas",
      description: "Alertas de mascotas perdidas, listados de adopcion y servicios de cuidadores de confianza.",
    },
    {
      icon: ShieldCheck,
      title: "Acceso Verificado",
      description: "Cada usuario es un residente verificado. Sin extraños, sin spam, sin desconocidos.",
    },
  ]

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Todo lo que tu comunidad necesita
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Una plataforma para servicios, comercio y comunidad, organizada por zona, impulsada por la confianza.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
