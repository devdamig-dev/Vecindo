import { notFound } from "next/navigation"
import { getCommerceBySlug } from "@/lib/commerces-data"
import PublicCommerceCatalog from "@/components/business/public-commerce-catalog"

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function PublicCommercePage({ params }: PageProps) {
  const { slug } = await params
  const commerce = getCommerceBySlug(slug)

  if (!commerce) notFound()

  return <PublicCommerceCatalog commerce={commerce} />
}
