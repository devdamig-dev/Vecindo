import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function LandingCTA() {
  return (
    <section className="border-t border-border/60 bg-gradient-to-br from-slate-950 via-sky-900 to-violet-900 py-20 text-white md:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">Convertí tu zona en tu mejor red diaria</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-sky-100">Entrá a VEZI para encontrar servicios, descubrir comercios y activar oportunidades locales en tiempo real.</p>
        <Button size="lg" asChild className="mt-8 gap-2 bg-white text-slate-900 hover:bg-white/90">
          <Link href="/login">Crear cuenta<ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  )
}
