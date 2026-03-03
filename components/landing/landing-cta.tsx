import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function LandingCTA() {
  return (
    <section className="border-t border-border bg-card py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Listo para unirte a tu comunidad?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
          Solicita acceso con tu direccion residencial. Una vez verificado, tendras acceso completo a tu zona.
        </p>
        <Button size="lg" asChild className="mt-8 gap-2 px-8">
          <Link href="/login">
            Solicitar Acceso
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
