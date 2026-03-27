import { notFound } from "next/navigation"
import { commerces } from "@/lib/commerces-data"
import CommerceProfileClient from "@/components/business/commerce-profile-client"

type PageProps = {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ tipo?: string }>
}

export default async function ComercioDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params
  const resolvedSearchParams = (await searchParams) ?? {}
  const activeTab = resolvedSearchParams.tipo === "emprendimientos" ? "emprendimientos" : "comercios"

  const item = commerces.find((commerce) => commerce.id === id)

  if (!item) {
    notFound()
  }

  return <CommerceProfileClient commerce={item} activeTab={activeTab} />
}
