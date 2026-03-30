import { Shield } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">VEZI</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <span>Privacidad</span>
            <span>Terminos</span>
            <span>Soporte</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {"2026 VEZI. Todos los derechos reservados."}
          </p>
        </div>
      </div>
    </footer>
  )
}
