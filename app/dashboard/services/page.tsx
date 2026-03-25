"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { ServicesSearch } from "@/components/services/services-search"
import { ServicesList, professionals } from "@/components/services/services-list"
import { SectionIntroBanner } from "@/components/ui/section-intro-banner"
import { NeighborRecommendations } from "@/components/services/neighbor-recommendations"
import { Button } from "@/components/ui/button"
import {
  Eye,
  Search as SearchIcon,
  TrendingUp,
  Plus,
  Briefcase,
} from "lucide-react"

export default function ServicesPage() {
  const { auth } = useAuth()
  const isProfessional = auth.accountType === "external_professional"
  const canOfferServices = auth.capabilities?.canOfferServices

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

  if (isProfessional) {
    return (
      <div className="flex max-w-full flex-col gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
            <SearchIcon className="h-3.5 w-3.5" />
            Servicios de tu zona
          </div>

          <h1 className="text-2xl font-bold text-foreground">Servicios</h1>
          <p className="text-sm text-muted-foreground">
            Explorá cómo se muestran otros perfiles y detectá oportunidades dentro de la comunidad.
          </p>
        </div>

        <SectionIntroBanner
          sectionId="services-professional-directory"
          title="Vista profesional del directorio"
          description="Usá este espacio para analizar categorías, competencia y posicionamiento dentro de Hudson – Berazategui."
          howItWorks={{
            title: "¿Cómo aprovechar este directorio?",
            steps: [
              "Explorá qué categorías tienen más oferta dentro de la zona.",
              "Analizá cómo se presentan otros perfiles y qué información muestran.",
              "Detectá oportunidades para destacar mejor tu servicio.",
              "Volvé a tu panel profesional para optimizar tu perfil y suscripción.",
            ],
          }}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-sky-200 bg-sky-100 p-4">
            <div className="flex items-center gap-2 text-sky-700">
              <SearchIcon className="h-4 w-4" />
              <span className="text-sm">Categorías activas</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">8</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Rubros visibles actualmente en la zona
            </p>
          </div>

          <div className="rounded-xl border border-sky-200 bg-sky-100 p-4">
            <div className="flex items-center gap-2 text-sky-700">
              <Eye className="h-4 w-4" />
              <span className="text-sm">Perfiles publicados</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{professionals.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Prestadores actualmente visibles en la plataforma
            </p>
          </div>

          <div className="rounded-xl border border-sky-200 bg-sky-100 p-4">
            <div className="flex items-center gap-2 text-sky-700">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">Oportunidad destacada</span>
            </div>
            <p className="mt-2 text-base font-semibold text-foreground">Clases y seguridad</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Menor competencia relativa frente a otros rubros
            </p>
          </div>
        </div>

        <ServicesSearch
          query={query}
          onQueryChange={setQuery}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>
            {filteredProfessionals.length} resultado{filteredProfessionals.length === 1 ? "" : "s"}
          </span>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-700">
            Vista comparativa para prestadores
          </span>
        </div>

        <ServicesList professionals={filteredProfessionals} />
      </div>
    )
  }

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
          <SearchIcon className="h-3.5 w-3.5" />
          Servicios de tu zona
        </div>

        <h1 className="text-2xl font-bold text-foreground">Servicios</h1>
        <p className="text-sm text-muted-foreground">
          Encontrá oficios, ayuda y servicios recomendados dentro de tu zona.
        </p>
      </div>

      <SectionIntroBanner
        sectionId="services"
        title="Servicios de la comunidad"
        description="Encontrá perfiles con reseñas reales y contacto directo."
        howItWorks={{
          title: "¿Cómo funciona Servicios?",
          steps: [
            "Buscá por categoría o escribiendo el servicio que necesitás.",
            "Mirá reseñas, experiencia y datos del perfil.",
            "Contactá directamente por WhatsApp sin intermediarios.",
            "Después del trabajo, dejá tu reseña para ayudar a otros vecinos.",
          ],
        }}
      />

      {canOfferServices && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-sky-200 bg-sky-100 px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-200 text-sky-700">
              <Briefcase className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                ¿Querés ofrecer tus servicios a la comunidad?
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Publicá tu perfil, mostrale a los vecinos qué hacés y empezá a recibir consultas dentro de tu zona.
              </p>
            </div>
          </div>

          <Button asChild className="bg-sky-600 text-white hover:bg-sky-700">
            <Link href="/dashboard/settings">
              <Plus className="h-4 w-4" />
              Ofrecer servicios
            </Link>
          </Button>
        </div>
      )}

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

      <NeighborRecommendations />
    </div>
  )
}