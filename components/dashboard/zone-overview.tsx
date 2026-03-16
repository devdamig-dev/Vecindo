import { Users, Wrench, ShoppingBag, PawPrint } from "lucide-react"

const stats = [
  { label: "Residentes", value: "342", icon: Users },
  { label: "Profesionales activos", value: "87", icon: Wrench },
  { label: "Publicaciones en mercado", value: "23", icon: ShoppingBag },
  { label: "Alertas de mascotas", value: "3", icon: PawPrint },
]

const topProfessionals = [
  { name: "Pinturas Express", rating: "4.9", jobs: "34 trabajos" },
  { name: "Electricidad Pro", rating: "4.8", jobs: "28 trabajos" },
  { name: "Jardín Pro", rating: "4.7", jobs: "22 trabajos" },
]

export function ZoneOverview() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="font-semibold text-foreground">Resumen de la zona</h2>
        <p className="text-xs text-muted-foreground">Hudson – Berazategui</p>
      </div>

      <div className="flex flex-col gap-3 p-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-lg bg-muted/50 p-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <stat.icon className="h-4 w-4" />
            </div>

            <div>
              <p className="text-lg font-bold text-foreground leading-none">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border px-5 py-4">
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Profesionales mejor calificados
        </h3>

        <div className="flex flex-col gap-2">
          {topProfessionals.map((pro) => (
            <div
              key={pro.name}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-foreground">{pro.name}</span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {pro.jobs}
                </span>

                <span className="font-semibold text-primary">
                  {pro.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}