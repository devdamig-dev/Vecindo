import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, ShieldCheck, MapPin } from "lucide-react"

const professionals = [
  {
    id: "1",
    name: "Roberto Mendez",
    initials: "RM",
    title: "Electricista Matriculado",
    category: "Electricidad",
    rating: 4.9,
    reviews: 47,
    zone: "Hudson",
    verified: true,
    description: "Mas de 15 anos de experiencia. Especialista en instalaciones de hogar inteligente, iluminacion de piscinas y reparaciones de emergencia.",
    tags: ["Matriculado", "Asegurado", "Mismo dia"],
  },
  {
    id: "2",
    name: "Maria Elena Torres",
    initials: "MT",
    title: "Pintora de Interiores",
    category: "Pintura",
    rating: 4.8,
    reviews: 31,
    zone: "Hudson",
    verified: true,
    description: "Especialista en pintura residencial. Materiales ecologicos, atencion meticulosa al detalle.",
    tags: ["Ecologica", "Con referencias"],
  },
  {
    id: "3",
    name: "Alejandro Vargas",
    initials: "AV",
    title: "Arquitecto Paisajista",
    category: "Jardineria",
    rating: 4.7,
    reviews: 22,
    zone: "Hudson, Quilmes",
    verified: true,
    description: "Diseno y mantenimiento de jardines. Sistemas de riego, paisajismo sustentable.",
    tags: ["Diseno", "Mantenimiento"],
  },
  {
    id: "4",
    name: "Carmen Reyes",
    initials: "CR",
    title: "Tutora de Matematicas y Ciencias",
    category: "Clases",
    rating: 5.0,
    reviews: 18,
    zone: "Hudson",
    verified: true,
    description: "Docente certificada. Preparacion para examenes, algebra a calculo. Horarios flexibles.",
    tags: ["Certificada", "Primaria-Secundaria", "Examenes"],
  },
  {
    id: "5",
    name: "Luis Fernandez",
    initials: "LF",
    title: "Plomero",
    category: "Plomeria",
    rating: 4.6,
    reviews: 39,
    zone: "Hudson, Florencio Varela",
    verified: true,
    description: "Plomero matriculado con mas de 10 anos de experiencia. Servicio de emergencia disponible 24/7.",
    tags: ["24/7", "Matriculado", "Emergencias"],
  },
]

export function ServicesList() {
  return (
    <div className="flex flex-col gap-3">
      {professionals.map((pro) => (
        <Link
          key={pro.id}
          href={`/dashboard/services/${pro.id}`}
          className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm sm:flex-row sm:items-start"
        >
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">{pro.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground">{pro.name}</h3>
              {pro.verified && (
                <ShieldCheck className="h-4 w-4 text-primary" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{pro.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">{pro.description}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {pro.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">{tag}</Badge>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1 text-right sm:text-right">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="text-sm font-bold text-foreground">{pro.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">{pro.reviews} resenas</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              {pro.zone}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
