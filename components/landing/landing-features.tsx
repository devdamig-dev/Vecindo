import { MapPin, MessageCircle, Search, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react"

export function LandingFeatures() {
  const features = [
    {
      icon: Search,
      title: "Exploración primero",
      description: "Buscá por rubro, producto o intención y descubrí opciones cercanas con una lectura rápida.",
    },
    {
      icon: ShoppingBag,
      title: "Catálogos visuales",
      description: "Productos con imagen, precio y pedido directo, sin convertir la experiencia en un ecommerce complejo.",
    },
    {
      icon: ShieldCheck,
      title: "Confianza clara",
      description: "Ubicación, horarios, reseñas y señales simples para decidir con tranquilidad.",
    },
    {
      icon: MessageCircle,
      title: "Contacto comercial",
      description: "El camino natural es hablar por WhatsApp, consultar y coordinar con cada comercio.",
    },
    {
      icon: MapPin,
      title: "Cerca de tu zona",
      description: "La ubicación acompaña la decisión sin volver protagonista a municipios o trámites.",
    },
    {
      icon: Sparkles,
      title: "Presencia premium",
      description: "Cada perfil funciona como una mini marca: portada, catálogo, confianza y acción.",
    },
  ]

  return (
    <section id="features" className="bg-[#fbfaf6] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">Cómo se descubre</p>
          <h2 className="mt-4 text-balance font-serif text-4xl leading-tight tracking-[-0.03em] text-stone-950 md:text-5xl">
            Menos módulos. Más foco en encontrar comercios que valen la pena.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-[2rem] border border-stone-200/70 bg-white p-7 shadow-[0_18px_50px_rgba(44,39,31,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(44,39,31,0.08)]"
            >
              <div className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9efe6] text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-stone-950">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
