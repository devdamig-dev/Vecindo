"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useState } from "react"
import { ReviewForm } from "@/components/services/review-form"

const reviews = [
  {
    user: "Ana Martinez",
    initials: "AM",
    rating: 5,
    date: "12 Feb, 2026",
    content: "Roberto instalo nuevas luces LED alrededor de nuestra piscina. Excelente trabajo, muy profesional. Llego puntual y limpio todo al terminar. Muy recomendado!",
  },
  {
    user: "Carlos Rodriguez",
    initials: "CR",
    rating: 5,
    date: "28 Ene, 2026",
    content: "Soluciono un problema electrico en nuestro garage que otros dos electricistas no pudieron resolver. Precios justos y excelente comunicacion durante todo el proceso.",
  },
  {
    user: "Patricia Diaz",
    initials: "PD",
    rating: 4,
    date: "15 Ene, 2026",
    content: "Buen trabajo instalando interruptores inteligentes. Lo unico es que coordinar el turno llevo unos dias, pero la calidad del trabajo fue excelente.",
  },
  {
    user: "Miguel Herrera",
    initials: "MH",
    rating: 5,
    date: "20 Dic, 2025",
    content: "Reparacion de emergencia a las 9 PM un sabado. Roberto vino en menos de una hora y soluciono el problema. No se puede pedir mejor servicio.",
  },
]

export function ProfileReviews() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="font-semibold text-foreground">Resenas</h2>
          <p className="text-xs text-muted-foreground">{reviews.length} resenas de residentes verificados</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancelar" : "Escribir Resena"}
        </Button>
      </div>

      {showForm && (
        <div className="border-b border-border p-5">
          <ReviewForm onSubmit={() => setShowForm(false)} />
        </div>
      )}

      <div className="divide-y divide-border">
        {reviews.map((review, i) => (
          <div key={i} className="px-5 py-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-muted text-foreground text-xs">{review.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{review.user}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-3 w-3 ${j < review.rating ? "fill-warning text-warning" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
