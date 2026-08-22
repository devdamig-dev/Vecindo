import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function LandingCTA() {
  return (
    <section className="bg-gradient-to-br from-orange-500 via-rose-500 to-fuchsia-600 py-20 text-white md:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-balance text-4xl font-black tracking-tight md:text-6xl">Tu próxima solución puede estar a pocas cuadras.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/80">Contá qué necesitás y descubrí quién puede ayudarte cerca tuyo.</p>
        <Button size="lg" asChild className="mt-8 gap-2 bg-white text-slate-900 hover:bg-white/90">
          <Link href="/dashboard">Entrar a VEZI<ArrowRight className="h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  )
}
