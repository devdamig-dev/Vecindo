import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, ShieldCheck } from "lucide-react"

const petPros = [
  {
    name: "Elena Rios",
    initials: "ER",
    title: "Tecnica Veterinaria",
    rating: 4.9,
    reviews: 14,
    verified: true,
    description: "Visitas a domicilio para cuidado basico de mascotas, vacunas y chequeos de bienestar.",
  },
  {
    name: "Marco Gutierrez",
    initials: "MG",
    title: "Entrenador Canino",
    rating: 4.7,
    reviews: 9,
    verified: true,
    description: "Entrenamiento con refuerzo positivo para cachorros y perros adultos. Sesiones grupales y privadas.",
  },
  {
    name: "Isabella Ruiz",
    initials: "IR",
    title: "Cuidadora y Paseadora",
    rating: 5.0,
    reviews: 21,
    verified: true,
    description: "Cuidadora experimentada que ofrece paseos diarios, estadia nocturna y cuidado de fin de semana.",
  },
]

export function PetServices() {
  return (
    <div>
      <h2 className="mb-3 font-semibold text-foreground">Profesionales de Mascotas</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {petPros.map((pro) => (
          <div key={pro.name} className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">{pro.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-foreground">{pro.name}</h3>
                  {pro.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground">{pro.title}</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{pro.description}</p>
            <div className="mt-3 flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              <span className="text-sm font-bold text-foreground">{pro.rating}</span>
              <span className="text-xs text-muted-foreground">({pro.reviews})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
