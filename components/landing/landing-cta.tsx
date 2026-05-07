import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function LandingCTA() {
  return (
    <section id="plans" className="bg-[#fbfaf6] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2.5rem] bg-stone-950 p-8 text-white shadow-[0_34px_90px_rgba(44,39,31,0.2)] md:p-12">
          <div className="grid gap-10 md:grid-cols-[1fr_360px] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#cbd8c7]">Plan Vender</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em] md:text-5xl">
                Convertí tu comercio en una mini marca local.
              </h2>
              <p className="mt-5 max-w-2xl text-stone-300">
                Perfil visual, catálogo claro y WhatsApp protagonista para que más personas descubran y contacten tu negocio.
              </p>
            </div>
            <div className="rounded-[2rem] bg-white p-5 text-stone-950">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold tracking-tight">$9.990</span>
                <span className="text-sm text-stone-500">/mes</span>
              </div>
              <p className="mt-3 text-sm text-stone-600">Visibilidad comercial prioritaria sin sumar complejidad operativa.</p>
              <Button size="lg" asChild className="mt-6 w-full rounded-2xl">
                <Link href="/login">
                  Ver Plan Vender
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
