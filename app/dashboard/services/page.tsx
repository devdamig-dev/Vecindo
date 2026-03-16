"use client"

import { useMemo, useState } from "react"
import { ServicesSearch } from "@/components/services/services-search"
import { ServicesList, professionals } from "@/components/services/services-list"
import { SectionIntroBanner } from "@/components/ui/section-intro-banner"
import { NeighborRecommendations } from "@/components/services/neighbor-recommendations"

export default function ServicesPage() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Todos")

  const filteredProfessionals = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return professionals.filter((pro) => {
      const matchesCategory =
        activeCategory === "Todos" || pro.category === activeCategory

      const matchesQuery =
        normalizedQuery.length === 0 ||
        pro.name.toLowerCase().includes(normalizedQuery) ||
        pro.title.toLowerCase().includes(normalizedQuery) ||
        pro.description.toLowerCase().includes(normalizedQuery) ||
        pro.category.toLowerCase().includes(normalizedQuery) ||
        pro.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))

      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Directorio de Servicios</h1>
        <p className="text-sm text-muted-foreground">Encontrá profesionales verificados en tu zona</p>
      </div>

      <SectionIntroBanner
        sectionId="services"
        title="Profesionales verificados de tu zona"
        description="Todos los prestadores tienen reseñas reales de vecinos."
        howItWorks={{
          title: "¿Cómo funciona Servicios?",
          steps: [
            "Buscá por categoría o escribiendo el servicio que necesitás.",
            "Mirá las reseñas y puntuaciones de otros vecinos.",
            "Contactá directamente por WhatsApp sin intermediarios.",
            "Después del trabajo, dejá tu reseña para ayudar a otros.",
          ],
        }}
      />

      <NeighborRecommendations />

      <ServicesSearch
        query={query}
        onQueryChange={setQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="text-sm text-muted-foreground">
        {filteredProfessionals.length} resultado{filteredProfessionals.length === 1 ? "" : "s"}
      </div>

      <ServicesList professionals={filteredProfessionals} />
    </div>
  )
}