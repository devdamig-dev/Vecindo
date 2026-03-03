import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck } from "lucide-react"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary)_0%,transparent_50%)] opacity-5" />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 md:pb-32 md:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Exclusivo para comunidades cerradas
          </div>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Servicios de confianza para tu comunidad
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Encuentra profesionales verificados, conecta con tus vecinos y construye reputacion dentro de tu comunidad cerrada. Acceso restringido. Confianza garantizada.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2 px-8">
              <Link href="/login">
                Comenzar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">
                Ver Como Funciona
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
