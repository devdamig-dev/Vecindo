export function LandingStats() {
  const stats = [
    { value: "120+", label: "comercios y marcas" },
    { value: "18", label: "rubros explorables" },
    { value: "4.8", label: "confianza promedio" },
    { value: "1", label: "acción simple: contactar" },
  ]

  return (
    <section id="trust" className="bg-[#f4f1ea] py-10">
      <div className="mx-auto grid max-w-7xl gap-3 px-6 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.75rem] bg-white/72 px-6 py-7 shadow-[0_14px_40px_rgba(44,39,31,0.045)]">
            <span className="font-serif text-4xl tracking-[-0.04em] text-stone-950">{stat.value}</span>
            <span className="mt-2 block text-sm text-stone-500">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
