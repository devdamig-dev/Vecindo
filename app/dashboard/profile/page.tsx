import { UserProfile } from "@/components/profile/user-profile"

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mi Perfil</h1>
        <p className="text-sm text-muted-foreground">Administra tu presencia en la comunidad</p>
      </div>
      <UserProfile />
    </div>
  )
}
