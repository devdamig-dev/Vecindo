import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Sparkles } from "lucide-react"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.2),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(168,85,247,0.22),transparent_45%),radial-gradient(circle_at_50%_85%,rgba(59,130,246,0.16),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white/80 via-white/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 md:pb-32 md:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/75 px-4 py-1.5 text-sm text-primary shadow-[0_8px_30px_rgba(59,130,246,0.15)] backdrop-blur-md">
            <MapPin className="h-4 w-4" />
            Red local moderna · Servicios, comercios y comunidad
          </div>

          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Descubrí lo mejor de tu zona en una sola app
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600">
            VEZI conecta personas, negocios y servicios con una experiencia social, cercana y moderna para resolver la vida cotidiana.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2 rounded-full bg-foreground px-8 text-background shadow-[0_12px_30px_rgba(15,23,42,0.25)] hover:bg-foreground/90">
              <Link href="/login">
                Empezar ahora
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full border-primary/25 bg-white/80 hover:bg-white">
              <Link href="#features">
                Ver cómo funciona
              </Link>
            </Button>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-violet-100/75 px-4 py-2 text-xs font-semibold text-violet-700">
            <Sparkles className="h-3.5 w-3.5" />
            Diseñada para descubrimiento local mobile-first
          </div>
        </div>
      </div>
    </section>
  )
}
