import { ProfessionalProfile } from "@/components/services/professional-profile"
import { ProfileReviews } from "@/components/services/profile-reviews"

export default async function ProfessionalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER + INFO PRINCIPAL */}
      <ProfessionalProfile id={id} />

      {/* REVIEWS */}
      <ProfileReviews />

      {/* CTA */}
      <div className="rounded-xl border border-border bg-card p-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">
            ¿Necesitás este servicio?
          </h3>
          <p className="text-sm text-muted-foreground">
            Contactá directamente por WhatsApp
          </p>
        </div>

        <a
          href="https://wa.me/5491123456789"
          target="_blank"
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Escribir por WhatsApp
        </a>
      </div>
    </div>
  )
}