import { BusinessProfilePublic } from "@/components/business/business-profile-public"

export default async function BusinessProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <BusinessProfilePublic id={id} />
}
