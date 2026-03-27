import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { commerces } from "@/lib/commerces-data"
import { CommerceProfileClient } from "@/components/business/commerce-profile-client"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function CommerceProfilePage({ params }: PageProps) {
  const { id } = await params
  const commerce = commerces.find((item) => item.id === id)

  if (!commerce) {
    return (
      <div className="flex flex-col gap-4">
        <Link href="/dashboard/comercios" className="flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Volver a Comercios
        </Link>

        <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
          <h1 className="text-xl font-bold text-foreground">Perfil no encontrado</h1>
          <p className="mt-1 text-sm text-muted-foreground">El perfil que querés ver no existe o fue removido.</p>
        </div>
      </div>
    )
  }

  return <CommerceProfileClient commerce={commerce} />
}
