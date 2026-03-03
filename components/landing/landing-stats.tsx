export function LandingStats() {
  const stats = [
    { value: "2.400+", label: "Residentes verificados" },
    { value: "850+", label: "Profesionales de confianza" },
    { value: "12", label: "Zonas activas" },
    { value: "4.8", label: "Calificacion promedio" },
  ]

  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 bg-card px-6 py-10">
            <span className="text-3xl font-bold tracking-tight text-foreground">{stat.value}</span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
