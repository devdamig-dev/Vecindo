import { VeziLogo } from "@/components/shared/vezi-logo"

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <VeziLogo compact />
          <div className="flex gap-8 text-sm text-muted-foreground">
            <span>Privacidad</span>
            <span>Términos</span>
            <span>Soporte</span>
          </div>
          <p className="text-sm text-muted-foreground">2026 VEZI. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
