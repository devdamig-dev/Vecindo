"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { ActivityChips } from "@/components/activity/activity-chips"
import { ServicesSearch } from "@/components/services/services-search"
import { ServicesList, professionals } from "@/components/services/services-list"
import { SectionIntroBanner } from "@/components/ui/section-intro-banner"
import { NeighborRecommendations } from "@/components/services/neighbor-recommendations"
import { Button } from "@/components/ui/button"
import { canAccessServiceManagement, hasServiceProviderActivity, isResident } from "@/lib/commercial"
import { Search as SearchIcon, Plus, Briefcase, ChevronDown } from "lucide-react"
import { getServiceDemandInsights } from "@/lib/activity-insights"


export default function ServicesPage() {
  const { auth } = useAuth()
  const isProfessional = hasServiceProviderActivity(auth) && !isResident(auth)
  const residentUser = isResident(auth)
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [showDirectory, setShowDirectory] = useState(false)
  const serviceDemandInsights = getServiceDemandInsights(auth?.profile?.email ?? auth?.profile?.name ?? "services")

  const filteredProfessionals = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return professionals.filter((pro) => {
      const matchesCategory = activeCategory === "Todos" || pro.category === activeCategory
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

  function handleCategorySelect(cat: string) {
    setActiveCategory(cat)
    setShowDirectory(true)
    setTimeout(() => {
      document.getElementById("services-directory")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  if (isProfessional) {
    return (
      <div className="flex max-w-full flex-col gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
            <SearchIcon className="h-3.5 w-3.5" />Servicios de tu zona
          </div>
          <h1 className="text-2xl font-bold text-foreground">Servicios</h1>
          <p className="text-sm text-muted-foreground">Explorá cómo se muestran otros perfiles y detectá oportunidades dentro de la comunidad.</p>
        </div>
        <ActivityChips insights={serviceDemandInsights} limit={3} className="rounded-2xl border border-sky-100 bg-sky-50/60 p-3" />
        <SectionIntroBanner
          sectionId="services-professional-directory"
          title="Vista profesional del directorio"
          description="Usá este espacio para analizar categorías, competencia y posicionamiento dentro de Hudson – Berazategui."
          howItWorks={{ title: "¿Cómo aprovechar este directorio?", steps: ["Explorá qué categorías tienen más oferta dentro de la zona.", "Analizá cómo se presentan otros perfiles y qué información muestran.", "Detectá oportunidades para destacar mejor tu servicio.", "Volvé a tu panel profesional para optimizar tu perfil y suscripción."] }}
        />
        <ServicesSearch query={query} onQueryChange={setQuery} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <div className="text-sm text-muted-foreground">{filteredProfessionals.length} resultado{filteredProfessionals.length === 1 ? "" : "s"}</div>
        <ServicesList professionals={filteredProfessionals} />
      </div>
    )
  }

  return (
    <div className="flex max-w-full flex-col gap-6">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
          <SearchIcon className="h-3.5 w-3.5" />Servicios de tu zona
        </div>
        <h1 className="text-2xl font-bold text-foreground">Servicios</h1>
        <p className="text-sm text-muted-foreground">Profesionales y vecinos de confianza para resolver lo que necesitás cerca tuyo.</p>
      </div>

      {residentUser && canAccessServiceManagement(auth) && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-sky-200 bg-sky-100 px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-200 text-sky-700"><Briefcase className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-semibold text-foreground">¿Ofrecés un servicio en la zona?</p>
              <p className="mt-1 text-sm text-muted-foreground">Publicá tu perfil y empezá a recibir consultas directamente por WhatsApp.</p>
            </div>
          </div>
          <Button asChild className="bg-sky-600 text-white hover:bg-sky-700">
            <Link href="/dashboard/services/new"><Plus className="mr-2 h-4 w-4" />Publicar mi servicio</Link>
          </Button>
        </div>
      )}

      {canAccessServiceManagement(auth) && (
        <ActivityChips insights={serviceDemandInsights} limit={3} className="rounded-2xl border border-sky-100 bg-sky-50/60 p-3" />
      )}

      {/* Directorio — expandible o visible al seleccionar categoría */}
      <div id="services-directory">
        {!showDirectory && activeCategory === "Todos" && (
          <button
            onClick={() => setShowDirectory(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-sky-300 py-3 text-sm font-medium text-sky-700 transition-colors hover:bg-sky-50"
          >
            <ChevronDown className="h-4 w-4" />
            Ver todos los prestadores disponibles
          </button>
        )}

        {(showDirectory || activeCategory !== "Todos") && (
          <>
            <SectionIntroBanner
              sectionId="services"
              variant="services"
              title="Prestadores de la comunidad"
              description="Perfiles con reseñas y contacto directo por WhatsApp. Sin intermediarios."
              howItWorks={{ title: "¿Cómo funciona?", steps: ["Buscá o filtrá por la categoría que necesitás.", "Mirá reseñas y experiencia del perfil.", "Contactá directamente por WhatsApp.", "Después del trabajo, dejá tu reseña."] }}
            />
            <div className="mt-4">
              <ServicesSearch query={query} onQueryChange={setQuery} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            </div>
            <div className="mt-3 text-sm text-muted-foreground">{filteredProfessionals.length} resultado{filteredProfessionals.length === 1 ? "" : "s"}</div>
            <div className="mt-3">
              <ServicesList professionals={filteredProfessionals} />
            </div>
            <NeighborRecommendations />
          </>
        )}
      </div>
    </div>
  )
}
