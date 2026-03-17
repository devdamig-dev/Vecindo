import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, ShieldCheck, MapPin, Zap } from "lucide-react"

export const professionals = [
  {
    id: "1",
    name: "Roberto Mendez",
    initials: "RM",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    title: "Electricista Matriculado",
    category: "Electricidad",
    rating: 4.9,
    reviews: 47,
    jobs: 32,
    zone: "Hudson",
    verified: true,
    isTop: true,
    isFast: true,
    description:
      "Mas de 15 anos de experiencia. Especialista en instalaciones de hogar inteligente, iluminacion de piscinas y reparaciones de emergencia.",
    tags: ["Matriculado", "Asegurado", "Mismo dia"],
  },
  {
    id: "2",
    name: "Maria Elena Torres",
    initials: "MT",
    avatarUrl: "https://i.pravatar.cc/150?img=20",
    title: "Pintora de Interiores",
    category: "Pintura",
    rating: 4.8,
    reviews: 31,
    jobs: 21,
    zone: "Hudson",
    verified: true,
    isTop: true,
    isFast: false,
    description:
      "Especialista en pintura residencial. Materiales ecologicos, atencion meticulosa al detalle.",
    tags: ["Ecologica", "Con referencias"],
  },
  {
    id: "3",
    name: "Alejandro Vargas",
    initials: "AV",
    avatarUrl: "https://i.pravatar.cc/150?img=33",
    title: "Arquitecto Paisajista",
    category: "Jardineria",
    rating: 4.7,
    reviews: 22,
    jobs: 18,
    zone: "Hudson, Quilmes",
    verified: true,
    isTop: false,
    isFast: false,
    description:
      "Diseno y mantenimiento de jardines. Sistemas de riego, paisajismo sustentable.",
    tags: ["Diseno", "Mantenimiento"],
  },
  {
    id: "4",
    name: "Carmen Reyes",
    initials: "CR",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    title: "Tutora de Matematicas y Ciencias",
    category: "Clases",
    rating: 5.0,
    reviews: 18,
    jobs: 14,
    zone: "Hudson",
    verified: true,
    isTop: false,
    isFast: true,
    description:
      "Docente certificada. Preparacion para examenes, algebra a calculo. Horarios flexibles.",
    tags: ["Certificada", "Primaria-Secundaria", "Examenes"],
  },
  {
    id: "5",
    name: "Luis Fernandez",
    initials: "LF",
    avatarUrl: "https://i.pravatar.cc/150?img=54",
    title: "Plomero",
    category: "Plomería",
    rating: 4.6,
    reviews: 39,
    jobs: 27,
    zone: "Hudson, Florencio Varela",
    verified: true,
    isTop: false,
    isFast: true,
    description:
      "Plomero matriculado con mas de 10 anos de experiencia. Servicio de emergencia disponible 24/7.",
    tags: ["24/7", "Matriculado", "Emergencias"],
  },
]

interface ServicesListProps {
  professionals: typeof professionals
}

export function ServicesList({ professionals }: ServicesListProps) {
  if (professionals.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
        <h3 className="text-base font-semibold text-foreground">No encontramos resultados</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Probá con otra categoría o cambiá el texto de búsqueda.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {professionals.map((pro) => (
        <Link
          key={pro.id}
          href={`/dashboard/services/${pro.id}`}
          className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm sm:flex-row sm:items-start"
        >
          <Avatar className="h-14 w-14 shrink-0">
            {pro.avatarUrl ? (
              <img
                src={pro.avatarUrl}
                alt={pro.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                {pro.initials}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-foreground">{pro.name}</h3>

              {pro.verified && <ShieldCheck className="h-4 w-4 text-primary" />}

              {pro.isTop && (
                <Badge className="border-0 bg-yellow-500/10 text-[10px] text-yellow-700 hover:bg-yellow-500/10">
                  Destacado
                </Badge>
              )}

              {pro.isFast && (
                <Badge className="border-0 bg-green-500/10 text-[10px] text-green-700 hover:bg-green-500/10">
                  <Zap className="mr-1 h-3 w-3" />
                  Respuesta rápida
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground">{pro.title}</p>

            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {pro.description}
            </p>

            <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span>+{pro.jobs} trabajos</span>
              <span>•</span>
              <span>{pro.reviews} vecinos lo recomiendan</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {pro.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-1.5 py-0 text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1 text-right">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="text-sm font-bold text-foreground">{pro.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">{pro.reviews} resenas</span>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {pro.zone}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}