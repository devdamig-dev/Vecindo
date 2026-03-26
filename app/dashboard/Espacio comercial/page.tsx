import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Store, Sparkles, MapPin, ChevronRight } from "lucide-react"

const sections = [
  {
    title: "Comercios",
    description:
      "Locales, negocios y marcas de la zona con ficha comercial, ubicación y contacto.",
    href: "/dashboard/comercios",
    badge: "Geolocalizables",
    icon: Store,
    className: "border-sky-200 bg-sky-50",
    iconClassName: "bg-sky-100 text-sky-700",
  },
  {
    title: "Emprendimientos locales",
    description:
      "Marcas y proyectos de la comunidad que venden productos o servicios, sin necesidad de local físico.",
    href: "/dashboard/comercios?tipo=emprendimientos",
    badge: "Sin local físico",
    icon: Sparkles,
    className: "border-amber-200 bg-amber-50",
    iconClassName: "bg-amber-100 text-amber-700",
  },
]

export default function EspacioComercialPage() {
  return (
    <div className="flex max-w-full flex-col gap-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
          <Store className="h-3.5 w-3.5" />
          Espacio comercial
        </div>

        <h1 className="text-2xl font-bold text-foreground">Espacio comercial</h1>
        <p className="text-sm text-muted-foreground">
          Explorá comercios y emprendimientos locales de la zona.
        </p>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-800 p-5 text-white">
        <h2 className="text-lg font-semibold">Comercios y emprendimientos en un solo lugar</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/80">
          En Vecindo, el espacio comercial reúne tanto negocios consolidados como
          emprendimientos locales. La diferencia principal es que los comercios pueden
          mostrarse con ubicación y ficha más institucional, mientras que los emprendimientos
          destacan su catálogo, marca y contacto sin depender de un local físico.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className={`group rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-sm ${section.className}`}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${section.iconClassName}`}>
              <section.icon className="h-5 w-5" />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              <Badge variant="secondary">{section.badge}</Badge>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {section.description}
            </p>

            <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground">
              Explorar
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold text-foreground">¿Tenés algo para ofrecer en la zona?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Si publicás productos o servicios, después vas a poder gestionarlo todo desde Mi negocio.
            </p>
          </div>

          <Button asChild className="bg-amber-600 text-white hover:bg-amber-700">
            <Link href="/dashboard/comercial">Ir a Mi negocio</Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="font-semibold text-foreground">Diferencia principal</h3>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
            <div className="flex items-center gap-2 text-sky-700">
              <Store className="h-4 w-4" />
              <span className="font-medium">Comercio</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Tiene una ficha más institucional y puede mostrarse con dirección, horarios y ubicación.
            </p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 text-amber-700">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">Emprendimiento local</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Tiene perfil comercial y catálogo, pero no depende de una geolocalización fija.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}