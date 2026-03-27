import { commerces } from "@/lib/commerces-data"
import ComerciosPageContent from "@/components/business/comercios-page-content"

export const dynamic = "force-dynamic"

type PageProps = {
  searchParams?: Promise<{ tipo?: string }>
}

export default async function ComerciosPage({ searchParams }: PageProps) {
  const params = (await searchParams) ?? {}
  const activeTab = params.tipo === "emprendimientos" ? "emprendimientos" : "comercios"

  const filteredProfiles = commerces.filter((item) =>
    activeTab === "emprendimientos" ? item.type === "entrepreneur" : item.type === "commerce",
  )

  return <ComerciosPageContent activeTab={activeTab} filteredProfiles={filteredProfiles} />
}
