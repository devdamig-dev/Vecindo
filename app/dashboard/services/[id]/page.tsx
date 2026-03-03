import { ProfessionalProfile } from "@/components/services/professional-profile"
import { ProfileReviews } from "@/components/services/profile-reviews"

export default async function ProfessionalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="flex flex-col gap-6">
      <ProfessionalProfile id={id} />
      <ProfileReviews />
    </div>
  )
}
