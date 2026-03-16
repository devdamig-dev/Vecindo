import { CalendarDays, Megaphone, ShieldCheck, Phone } from "lucide-react"

const notices = [
  {
    title: "Corte programado de agua",
    description: "El jueves de 9:00 a 12:00 hs habrá corte por mantenimiento general.",
    type: "Administración",
  },
  {
    title: "Poda y mantenimiento de espacios verdes",
    description: "Durante esta semana habrá tareas en calles internas y plaza central.",
    type: "Mantenimiento",
  },
  {
    title: "Nuevo reglamento de invitados",
    description: "Se actualizaron los horarios y condiciones de acceso para visitas.",
    type: "Seguridad",
  },
]

const events = [
  {
    title: "Clase abierta de yoga",
    date: "Sábado 10:00 hs",
    place: "SUM del barrio",
  },
  {
    title: "Feria de emprendedores",
    date: "Domingo 16:00 hs",
    place: "Plaza interna",
  },
]

export default function MiBarrioPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mi barrio</h1>
        <p className="text-sm text-muted-foreground">
          Avisos, eventos e información interna del barrio
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Avisos del barrio</h2>
        </div>

        <div className="flex flex-col gap-3">
          {notices.map((notice) => (
            <div
              key={notice.title}
              className="rounded-xl border border-border bg-muted/30 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  {notice.type}
                </span>
              </div>

              <h3 className="font-medium text-foreground">{notice.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {notice.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">Próximos eventos</h2>
          </div>

          <div className="flex flex-col gap-3">
            {events.map((event) => (
              <div
                key={event.title}
                className="rounded-xl border border-border bg-muted/30 p-4"
              >
                <h3 className="font-medium text-foreground">{event.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{event.date}</p>
                <p className="text-sm text-muted-foreground">{event.place}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold text-foreground">Contacto útil del barrio</h2>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <h3 className="font-medium text-foreground">Administración</h3>
              <a
                href="tel:+541143210000"
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Phone className="h-4 w-4" />
                +54 11 4321-0000
              </a>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-4">
              <h3 className="font-medium text-foreground">Seguridad / Guardia</h3>
              <a
                href="tel:+541143210111"
                className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Phone className="h-4 w-4" />
                +54 11 4321-0111
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}