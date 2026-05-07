import { Compass } from "lucide-react"

export function LandingFooter() {
  return (
    <footer className="border-t border-stone-200/70 bg-[#f4f1ea]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            <span className="font-semibold tracking-[-0.03em] text-stone-950">NIAR</span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-stone-500">
            <span>Privacidad</span>
            <span>Términos</span>
            <span>Soporte</span>
            <span className="text-stone-400">Comunidades y municipios</span>
          </div>
          <p className="text-sm text-stone-500">2026 NIAR. Descubrimiento comercial local.</p>
        </div>
      </div>
    </footer>
  )
}
