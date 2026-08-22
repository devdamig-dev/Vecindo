export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black">VEZI<span className="text-orange-500">.</span></span>
          </div>
          <div className="flex gap-8 text-sm text-slate-400">
            <span>Privacidad</span><span>Términos</span><span>Soporte</span>
          </div>
          <p className="text-sm text-slate-400">
            {"2026 VEZI. Todos los derechos reservados."}
          </p>
        </div>
      </div>
    </footer>
  )
}
