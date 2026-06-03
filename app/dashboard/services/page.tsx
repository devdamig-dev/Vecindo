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
import { canAccessServiceManagement, hasPreviewAccessToModule, hasServiceProviderActivity, isResident } from "@/lib/commercial"
import { Search as SearchIcon, Plus, Briefcase, Store, ChevronDown } from "lucide-react"
import { getServiceDemandInsights } from "@/lib/activity-insights"

const necesidadCategories = [
  { label: "Plomería", emoji: "🔧" },
  { label: "Electricidad", emoji: "⚡" },
  { label: "Jardinería", emoji: "🌿" },
  { label: "Pintura", emoji: "🖌️" },
  { label: "Limpieza", emoji: "🧹" },
  { label: "Clases", emoji: "📚" },
  { label: "Mudanza", emoji: "📦" },
  { label: "Técnico", emoji: "🛠️" },
]

function NecesitoHero({ onCategorySelect }: { onCategorySelect: (cat: string) => void }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-sky-100/60">
      <div className="px-5 pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-sky-600">¿Qué necesitás?</p>
        <h2 className="mt-1 text-lg font-bold text-foreground">Contanos tu necesidad</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Elegí una categoría y encontrá prestadores verificados de tu zona, o buscá directamente abajo.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2 p-4 sm:grid-cols-8">
        {necesidadCategories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => onCategorySelect(cat.label)}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-sky-200 bg-white/80 px-2 py-3 text-center text-[11px] font-medium text-sky-800 transition-all hover:border-sky-400 hover:bg-sky-50 hover:shadow-sm active:scale-95"
          >
            <span className="text-xl">{cat.emoji}</span>
            <span className="leading-tight">{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="border-t border-sky-200 px-5 py-3">
        <p className="text-xs text-muted-foreground">
          ¿No encontrás tu categoría?{" "}
          <button
            onClick={() => onCategorySelect("Todos")}
            className="font-medium text-sky-700 underline underline-offset-2"
          >
            Explorá todos los servicios
          </button>
        </p>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const { auth } = useAuth()
  const isProfessional = hasServiceProviderActivity(auth) && !isResident(auth)
  const residentUser = isResident(auth)
  const servicesPreview = hasPreviewAccessToModule(auth, "services")
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

      {/* Necesito — hero de entrada */}
      <NecesitoHero onCategorySelect={handleCategorySelect} />

      {servicesPreview && (
        <div className="rounded-[24px] border border-sky-200 bg-sky-50 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700"><Store className="h-5 w-5" /></div>
              <div>
                <p className="text-sm font-semibold text-foreground">Encontrá prestadores de la zona para resolver necesidades de tu negocio.</p>
                <p className="mt-1 text-sm text-muted-foreground">Esta vista preview te ayuda a detectar colaboradores, oficios y proveedores cercanos.</p>
              </div>
            </div>
            <Button asChild className="bg-sky-600 text-white hover:bg-sky-700">
              <Link href="/dashboard/suscripciones">Activar acceso Comunidad</Link>
            </Button>
          </div>
        </div>
      )}

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
