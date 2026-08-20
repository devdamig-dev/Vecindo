import { commerces } from "@/lib/commerces-data"
import { professionals } from "@/components/services/services-list"

export type SearchModule = "needs" | "services" | "commerces" | "entrepreneurs"

export type SearchResult = {
  id: string
  module: SearchModule
  title: string
  subtitle: string
  href: string
  searchable: string
  kind?: "product"
}

const needs: SearchResult[] = [
  { id: "need-1", module: "needs", title: "Necesito profesora particular de matemáticas para secundaria", subtitle: "Educación · Hudson", href: "/dashboard/necesito/1", searchable: "profesora particular matematica matematicas secundaria algebra geometria educacion hudson" },
  { id: "need-2", module: "needs", title: "Busco plomero para pérdida en baño principal", subtitle: "Plomería · Berazategui", href: "/dashboard/necesito/2", searchable: "plomero perdida baño principal plomeria berazategui" },
  { id: "need-4", module: "needs", title: "Busco electricista para instalar una térmica", subtitle: "Electricidad · Hudson", href: "/dashboard/necesito/4", searchable: "busco electricista electricidad instalacion termica tablero hudson" },
]

export const normalizeSearch = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()

export const searchIndex: SearchResult[] = [
  ...needs,
  ...professionals.map((professional) => ({
    id: `service-${professional.id}`,
    module: "services" as const,
    title: professional.name,
    subtitle: `${professional.title} · ${professional.zone}`,
    href: `/dashboard/services/${professional.id}`,
    searchable: [professional.name, professional.title, professional.category, professional.description, ...professional.tags].join(" "),
  })),
  ...commerces.flatMap((business) => {
    const module: SearchModule = business.type === "commerce" ? "commerces" : "entrepreneurs"
    const base: SearchResult = {
      id: `${business.type}-${business.id}`,
      module,
      title: business.name,
      subtitle: `${business.category} · ${business.location}`,
      href: `/dashboard/${module === "commerces" ? "comercios" : "emprendimientos"}/${business.id}`,
      searchable: [business.name, business.category, business.description, business.longDescription].join(" "),
    }
    return [base, ...business.products.map((product) => ({
      id: `product-${business.id}-${product.id}`,
      module,
      kind: "product" as const,
      title: product.name,
      subtitle: `Producto de ${business.name}`,
      href: base.href,
      searchable: [product.name, product.shortDescription, business.name, business.category].join(" "),
    }))]
  }),
]

export function searchVezi(query: string, module?: SearchModule) {
  const term = normalizeSearch(query)
  if (term.length < 2) return []
  return searchIndex.filter((result) =>
    (!module || result.module === module) && normalizeSearch(`${result.title} ${result.subtitle} ${result.searchable}`).includes(term),
  )
}

export const searchModuleMeta: Record<SearchModule, { label: string; color: string; dot: string }> = {
  needs: { label: "Necesidades", color: "text-amber-800", dot: "bg-amber-500" },
  services: { label: "Servicios", color: "text-sky-800", dot: "bg-sky-500" },
  commerces: { label: "Comercios", color: "text-violet-800", dot: "bg-violet-500" },
  entrepreneurs: { label: "Emprendimientos", color: "text-emerald-800", dot: "bg-emerald-500" },
}
