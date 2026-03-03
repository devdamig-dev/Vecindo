"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"

export function ReviewForm({ onSubmit }: { onSubmit: () => void }) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <Label>Calificacion</Label>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHoveredRating(i + 1)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-0.5"
              aria-label={`Calificar con ${i + 1} estrellas`}
            >
              <Star
                className={`h-6 w-6 transition-colors ${
                  i < (hoveredRating || rating)
                    ? "fill-warning text-warning"
                    : "text-muted"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="review">Tu Resena</Label>
        <Textarea
          id="review"
          placeholder="Conta tu experiencia con este profesional..."
          rows={4}
        />
      </div>
      <Button type="submit" className="w-fit" disabled={rating === 0}>
        Enviar Resena
      </Button>
    </form>
  )
}
