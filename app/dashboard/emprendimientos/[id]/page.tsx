import { notFound } from "next/navigation"
import { commerces } from "@/lib/commerces-data"
import CommerceProfileClient from "@/components/business/commerce-profile-client"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function EmprendimientoDetailPage({ params }: PageProps) {
  const { id } = await params
  const item = commerces.find((c) => c.id === id && c.type === "entrepreneur")

  if (!item) {
    notFound()
  }

  return <CommerceProfileClient commerce={item} activeTab="emprendimientos" />
}
