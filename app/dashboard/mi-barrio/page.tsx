"use client"

import { useState } from "react"
import { CalendarDays, Megaphone, ShieldCheck, Phone, MessageCircle, ChevronDown, ChevronUp } from "lucide-react"

const notices = [
  {
    id: "1",
    title: "Corte programado de agua",
    description:
      "El jueves de 9:00 a 12:00 hs habrá corte por mantenimiento general.",
    type: "Administración",
    questionsCount: 2,
    lastReply: "hace 1 h",
    thread: [
      {
        author: "Martín R.",
        role: "Vecino",
        text: "¿El corte afecta todo el barrio o solo el sector A?",
      },
      {
        author: "Administración",
        role: "Oficial",
        text: "Afecta todo el barrio, pero el servicio se irá restableciendo por sectores desde las 11:30 hs.",
      },
    ],
  },
  {
    id: "2",
    title: "Poda y mantenimiento de espacios verdes",
    description:
      "Durante esta semana habrá tareas en calles internas y plaza central.",
    type: "Mantenimiento",
    questionsCount: 1,
    lastReply: "hace 3 h",
    thread: [
      {
        author: "Laura T.",
        role: "Vecina",
        text: "¿Se podrá circular normalmente durante la poda?",
      },
      {
        author: "Guardia",
        role: "Oficial",
        text: "Sí, puede haber demoras breves en algunos tramos, pero no se cortará el acceso.",
      },
    ],
  },
  {
    id: "3",
    title: "Nuevo reglamento de invitados",
    description:
      "Se actualizaron los horarios y condiciones de acceso para visitas.",
    type: "Seguridad",
    questionsCount: 3,
    lastReply: "hace 5 h",
    thread: [
      {
        author: "Carlos M.",
        role: "Vecino",
        text: "¿El nuevo reglamento aplica también a proveedores frecuentes?",
      },
      {
        author: "Seguridad",
        role: "Oficial",
        text: "Sí, aunque los proveedores habituales podrán seguir cargándose desde la app con acceso agilizado.",
      },
      {
        author: "Sofía L.",
        role: "Vecina",
        text: "¿Desde cuándo entra en vigencia?",
      },
      {
        author: "Seguridad",
        role: "Oficial",
        text: "Comienza a regir desde el próximo lunes a las 00:00 hs.",
      },
    ],
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
  const [openNoticeId, setOpenNoticeId] = useState<string | null>(null)

  function toggleNotice(id: string) {
    setOpenNoticeId((prev) => (prev === id ? null : id))
  }

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
          {notices.map((notice) => {
            const isOpen = openNoticeId === notice.id

            return (
              <div
                key={notice.id}
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

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" />
                      {notice.questionsCount} consulta{notice.questionsCount === 1 ? "" : "s"}
                    </span>
                    <span>Última respuesta {notice.lastReply}</span>
                  </div>

                  <button
                    onClick={() => toggleNotice(notice.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    Consultar
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {isOpen && (
                  <div className="mt-4 rounded-xl border border-border bg-card p-4">
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-foreground">
                        Consultas sobre este aviso
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Conversación relacionada al aviso interno
                      </p>
                    </div>

                    <div className="flex flex-col gap-3">
                      {notice.thread.map((item, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-border bg-muted/30 p-3"
                        >
                          <div className="mb-1 flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">
                              {item.author}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                item.role === "Oficial"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {item.role}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{item.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-lg border border-dashed border-border bg-muted/20 px-4 py-3">
                      <p className="text-sm text-muted-foreground">
                        En una próxima versión, los vecinos podrán enviar consultas desde acá.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
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