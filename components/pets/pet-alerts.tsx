import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Clock, PawPrint } from "lucide-react"

const alerts = [
  {
    id: "1",
    type: "Perdido",
    status: "Activo",
    petName: "Max",
    breed: "Golden Retriever",
    description: "Perdido cerca del porton principal. Lleva collar azul con chapita. Muy amigable, responde a su nombre.",
    owner: "Diego P.",
    initials: "DP",
    location: "Porton Principal",
    time: "hace 3 hrs",
  },
  {
    id: "2",
    type: "Encontrado",
    status: "Resuelto",
    petName: "Luna",
    breed: "Gata Atigrada",
    description: "Encontre esta gata cerca de las canchas de tenis. Atigrada naranja, sin collar. Muy dulce y parece bien alimentada.",
    owner: "Ana M.",
    initials: "AM",
    location: "Canchas de Tenis",
    time: "hace 1 dia",
  },
  {
    id: "3",
    type: "Adopcion",
    status: "Disponible",
    petName: "Buddy",
    breed: "Perro Mestizo",
    description: "Mestizo amigable de 2 anos buscando un hogar amoroso. Vacunado y castrado. Se lleva genial con ninos.",
    owner: "Patricia D.",
    initials: "PD",
    location: "Hudson",
    time: "hace 2 dias",
  },
  {
    id: "4",
    type: "Perdido",
    status: "Resuelto",
    petName: "Coco",
    breed: "Bulldog Frances",
    description: "Estaba perdido cerca del area de juegos. Color marron y blanco. Ya fue encontrado y devuelto a su hogar!",
    owner: "Sofia L.",
    initials: "SL",
    location: "Area de Juegos",
    time: "hace 3 dias",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Activo":
      return "bg-destructive/10 text-destructive border-destructive/20"
    case "Resuelto":
      return "bg-success/10 text-success border-success/20"
    case "Disponible":
      return "bg-primary/10 text-primary border-primary/20"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function getTypeColor(type: string) {
  switch (type) {
    case "Perdido":
      return "destructive" as const
    case "Encontrado":
      return "secondary" as const
    case "Adopcion":
      return "default" as const
    default:
      return "secondary" as const
  }
}

export function PetAlerts() {
  return (
    <div>
      <h2 className="mb-3 font-semibold text-foreground">Alertas Activas</h2>
      <div className="flex flex-col gap-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted">
              <PawPrint className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground">{alert.petName}</h3>
                <Badge variant={getTypeColor(alert.type)} className="text-[10px]">{alert.type}</Badge>
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${getStatusColor(alert.status)}`}>
                  {alert.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{alert.breed}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{alert.description}</p>
              <div className="mt-2 flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="bg-muted text-foreground text-[8px]">{alert.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{alert.owner}</span>
                </div>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {alert.location}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {alert.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
