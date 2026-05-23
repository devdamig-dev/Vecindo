export function LandingStats() {
  const stats = [
    { value: "+18k", label: "interacciones locales por mes" },
    { value: "+2.7k", label: "servicios y perfiles activos" },
    { value: "420", label: "comercios y emprendimientos" },
    { value: "4.9", label: "valoración promedio" },
  ]

  return (
    <section className="border-y border-white/60 bg-gradient-to-r from-sky-50/70 via-white to-violet-50/70">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-white/40 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 bg-transparent px-6 py-10 text-center">
            <span className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
