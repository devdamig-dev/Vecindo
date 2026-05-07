import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Search, ShieldCheck, Sparkles } from "lucide-react"

const heroCards = [
  {
    title: "Café de especialidad",
    area: "A 8 min · Plátanos",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Deco para el hogar",
    area: "Showroom · Hudson",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
]

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fbfaf6_0%,#f4f1ea_100%)]">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_22%_20%,rgba(129,155,132,0.22),transparent_34%),radial-gradient(circle_at_82%_12%,rgba(176,167,203,0.18),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-16 md:pb-28 md:pt-24 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:items-center">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/70 px-4 py-2 text-sm text-stone-600 shadow-[0_12px_35px_rgba(36,31,24,0.06)] backdrop-blur">
            <Sparkles className="h-4 w-4 text-primary" />
            Descubrimiento local premium
          </div>

          <h1 className="text-balance font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-stone-950 md:text-7xl">
            Explorá lo mejor de tu zona.
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-stone-600 md:text-xl">
            NIAR reúne comercios, marcas y productos cercanos en una experiencia visual, simple y confiable para descubrir antes de comprar.
          </p>

          <div className="mt-9 rounded-[2rem] border border-white/80 bg-white/85 p-3 shadow-[0_28px_80px_rgba(44,39,31,0.13)] backdrop-blur md:p-4">
            <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_210px_auto] md:items-center">
              <div className="flex items-center gap-3 rounded-2xl bg-stone-50 px-4 py-4">
                <Search className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-stone-500 md:text-base">
                  ¿Qué querés descubrir hoy?
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-stone-50 px-4 py-4">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-stone-700 md:text-base">
                  Hudson · Berazategui
                </span>
              </div>

              <Button size="lg" asChild className="h-14 rounded-2xl px-7 text-base shadow-[0_14px_34px_rgba(88,112,91,0.28)]">
                <Link href="/login">
                  Explorar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-stone-500">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Comercios con datos claros
            </span>
            <span className="rounded-full bg-white/70 px-3 py-1.5">Catálogos visuales</span>
            <span className="rounded-full bg-white/70 px-3 py-1.5">Pedido directo por WhatsApp</span>
          </div>
        </div>

        <div className="relative min-h-[520px]">
          <div className="absolute right-0 top-4 h-[430px] w-[76%] overflow-hidden rounded-[2.5rem] shadow-[0_34px_90px_rgba(44,39,31,0.18)]">
            <img
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1100&q=80"
              alt="Comercio local premium"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/42 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-3xl bg-white/88 p-4 shadow-xl backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Destacado cerca tuyo</p>
              <p className="mt-1 text-lg font-semibold text-stone-950">Punto Café</p>
              <p className="text-sm text-stone-500">Cafetería · Plátanos</p>
            </div>
          </div>

          <div className="absolute left-0 top-24 w-[48%] space-y-4">
            {heroCards.map((card) => (
              <div key={card.title} className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white p-2 shadow-[0_20px_60px_rgba(44,39,31,0.12)]">
                <img src={card.image} alt={card.title} className="h-36 w-full rounded-[1.35rem] object-cover" />
                <div className="px-2 py-3">
                  <p className="font-semibold text-stone-950">{card.title}</p>
                  <p className="mt-1 text-sm text-stone-500">{card.area}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-10 right-12 rounded-[1.75rem] border border-white/80 bg-[#e9efe6]/95 p-5 shadow-[0_18px_50px_rgba(88,112,91,0.18)] backdrop-blur">
            <p className="text-3xl font-semibold tracking-tight text-stone-950">4.8</p>
            <p className="mt-1 text-sm text-stone-600">confianza promedio en perfiles locales</p>
          </div>
        </div>
      </div>
    </section>
  )
}
