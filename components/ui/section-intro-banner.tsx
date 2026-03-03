"use client"

import { useState, useEffect } from "react"
import { X, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface SectionIntroBannerProps {
  sectionId: string
  title: string
  description: string
  howItWorks: {
    title: string
    steps: string[]
  }
}

export function SectionIntroBanner({
  sectionId,
  title,
  description,
  howItWorks,
}: SectionIntroBannerProps) {
  const [dismissed, setDismissed] = useState(true) // Default to hidden until localStorage check
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const key = `vecindo_banner_${sectionId}`
    const isDismissed = localStorage.getItem(key) === "true"
    setDismissed(isDismissed)
  }, [sectionId])

  const handleDismiss = () => {
    const key = `vecindo_banner_${sectionId}`
    localStorage.setItem(key, "true")
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <>
      <div className="relative flex items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <HelpCircle className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{title}</p>
            <p className="text-xs text-muted-foreground line-clamp-1">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowModal(true)}
            className="text-xs text-primary hover:text-primary"
          >
            {"\u00bfC\u00f3mo funciona?"}
          </Button>
          <button
            onClick={handleDismiss}
            className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{howItWorks.title}</DialogTitle>
            <DialogDescription className="sr-only">
              Informaci\u00f3n sobre c\u00f3mo funciona esta secci\u00f3n
            </DialogDescription>
          </DialogHeader>
          <ol className="space-y-3 mt-2">
            {howItWorks.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
          <Button onClick={() => setShowModal(false)} className="mt-4 w-full">
            Entendido
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
