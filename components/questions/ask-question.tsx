"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function AskQuestion() {
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-xl border border-border bg-card p-4 text-left text-sm text-muted-foreground transition-colors hover:border-primary/30"
      >
        Hacele una pregunta a tu comunidad...
      </button>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setOpen(false)
        }}
        className="flex flex-col gap-3"
      >
        <Textarea
          placeholder="Que te gustaria preguntarle a tus vecinos?"
          rows={3}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit">Publicar Pregunta</Button>
        </div>
      </form>
    </div>
  )
}
