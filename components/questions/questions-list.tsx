"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, ThumbsUp, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

const questions = [
  {
    id: "1",
    user: "Ana Martinez",
    initials: "AM",
    time: "hace 2 hrs",
    category: "Electricidad",
    question: "Alguien puede recomendar un buen electricista para iluminacion de piscina? Queremos agregar LEDs subacuaticos y luces paisajistas alrededor del area de la pileta.",
    answers: [
      {
        user: "Carlos R.",
        initials: "CR",
        time: "hace 1 hr",
        content: "Roberto Mendez es excelente! Hizo la iluminacion de nuestra piscina el mes pasado. Muy profesional y precios justos. Podes encontrar su perfil en el directorio de servicios.",
        likes: 8,
      },
      {
        user: "Sofia L.",
        initials: "SL",
        time: "hace 45 min",
        content: "Apoyo lo de Roberto. Tambien instalo nuestro sistema de hogar inteligente. Muy recomendado.",
        likes: 5,
      },
    ],
    likes: 12,
  },
  {
    id: "2",
    user: "Diego Perez",
    initials: "DP",
    time: "hace 5 hrs",
    category: "General",
    question: "Alguien sabe si el porton principal va a estar cerrado por mantenimiento este fin de semana? Escuche algo sobre mejoras de seguridad.",
    answers: [
      {
        user: "Laura T.",
        initials: "LT",
        time: "hace 4 hrs",
        content: "Si, la administracion mando un email. El porton sur va a estar cerrado el sabado de 8 AM a 2 PM. El porton norte va a seguir abierto.",
        likes: 15,
      },
    ],
    likes: 7,
  },
  {
    id: "3",
    user: "Patricia Diaz",
    initials: "PD",
    time: "hace 1 dia",
    category: "Mascotas",
    question: "Busco un paseador de perros confiable para las mananas entre semana. Tenemos un labrador amigable de unos 14 kg. Alguien en Hudson ofrece este servicio?",
    answers: [
      {
        user: "Miguel H.",
        initials: "MH",
        time: "hace 20 hrs",
        content: "Mi hija pasea perros en el barrio. Tiene 17, es muy responsable y ama los animales. Cobra $5.000 por paseo. Queres que los conecte?",
        likes: 4,
      },
    ],
    likes: 3,
  },
]

export function QuestionsList() {
  const [expandedId, setExpandedId] = useState<string | null>("1")

  return (
    <div className="flex flex-col gap-3">
      {questions.map((q) => {
        const isExpanded = expandedId === q.id
        return (
          <div key={q.id} className="rounded-xl border border-border bg-card">
            <div className="p-5">
              <div className="flex items-start gap-3">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="bg-muted text-foreground text-xs">{q.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-foreground">{q.user}</span>
                    <span className="text-xs text-muted-foreground">{q.time}</span>
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{q.category}</Badge>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground">{q.question}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {q.likes}
                    </button>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      {q.answers.length} {q.answers.length === 1 ? "respuesta" : "respuestas"}
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-border bg-muted/30">
                {q.answers.map((a, i) => (
                  <div key={i} className="border-b border-border/50 px-5 py-4 last:border-b-0">
                    <div className="flex items-start gap-3 pl-6">
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarFallback className="bg-muted text-foreground text-[10px]">{a.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{a.user}</span>
                          <span className="text-xs text-muted-foreground">{a.time}</span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.content}</p>
                        <button className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                          <ThumbsUp className="h-3 w-3" />
                          {a.likes}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="px-5 py-3">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    Escribir una respuesta...
                  </Button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
