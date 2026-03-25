"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface SectionIntroBannerProps {
  sectionId?: string
  title: string
  description: string
  howItWorks?: {
    title: string
    steps: string[]
  }
  variant?: "services" | "community" | "marketplace" | "ayuda"
}

const variantStyles = {
  services: "bg-sky-800 text-white",
  community: "bg-violet-800 text-white",
  marketplace: "bg-emerald-800 text-white",
  ayuda: "bg-rose-700 text-white",
}

export function SectionIntroBanner({
  sectionId,
  title,
  description,
  howItWorks,
  variant = "services",
}: SectionIntroBannerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        data-section-id={sectionId}
        className={`flex flex-col gap-2 rounded-xl border border-white/10 px-4 py-4 shadow-sm md:flex-row md:items-center md:justify-between ${variantStyles[variant]}`}
      >
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-white/80">{description}</p>
        </div>

        {howItWorks && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-left text-xs text-white/80 transition-colors hover:text-white md:text-right"
          >
            ¿Cómo funciona?
          </button>
        )}
      </div>

      {open && howItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{howItWorks.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {title}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {howItWorks.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}