"use client"

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
  title,
  description,
  howItWorks,
  variant = "services",
}: SectionIntroBannerProps) {
  return (
    <div
      className={`rounded-xl px-4 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between shadow-sm border border-white/10 ${variantStyles[variant]}`}
    >
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-white/80">{description}</p>
      </div>

      {howItWorks && (
        <button className="text-xs text-white/80 hover:text-white transition-colors">
          ¿Cómo funciona?
        </button>
      )}
    </div>
  )
}