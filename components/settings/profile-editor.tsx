"use client"

import { useAuth } from "@/lib/auth-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ShieldCheck, Briefcase } from "lucide-react"

const demoAvatars = [
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=12",
  "https://i.pravatar.cc/150?img=20",
  "https://i.pravatar.cc/150?img=33",
]

export function ProfileEditor() {
  const { auth, updateProfile } = useAuth()
  const { profile, accountType } = auth

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 font-semibold text-foreground">Informacion personal</h2>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar className="h-16 w-16">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <AvatarFallback className="bg-primary text-xl font-bold text-primary-foreground">
                {profile.avatarInitials}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex-1">
            <p className="font-medium text-foreground">{profile.name}</p>

            <div className="mt-1 flex items-center gap-2">
              {accountType === "resident" ? (
                <Badge className="gap-1 border-0 bg-primary/10 text-primary">
                  <ShieldCheck className="h-3 w-3" />
                  Residente
                </Badge>
              ) : (
                <Badge className="gap-1 border-0 bg-chart-2/10 text-chart-2">
                  <Briefcase className="h-3 w-3" />
                  Profesional externo
                </Badge>
              )}
            </div>

            <p className="mt-3 text-sm text-muted-foreground">Foto de perfil</p>

            <div className="mt-2 flex gap-2">
              {demoAvatars.map((img) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => updateProfile({ avatarUrl: img })}
                  className={`h-10 w-10 overflow-hidden rounded-full border-2 transition ${
                    profile.avatarUrl === img
                      ? "border-primary"
                      : "border-transparent hover:border-border"
                  }`}
                  aria-label="Seleccionar avatar"
                >
                  <img src={img} alt="Avatar demo" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              En el MVP usamos fotos demo. Más adelante se podrá subir una imagen propia.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              value={profile.whatsapp}
              onChange={(e) => updateProfile({ whatsapp: e.target.value })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="bio">Biografia breve</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => updateProfile({ bio: e.target.value })}
            rows={3}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Zona</Label>
          <Input value={profile.zone} disabled className="bg-muted" />
          <p className="text-xs text-muted-foreground">
            La zona se asigna durante el proceso de validacion.
          </p>
        </div>

        <Button className="w-fit">Guardar cambios</Button>
      </div>
    </div>
  )
}