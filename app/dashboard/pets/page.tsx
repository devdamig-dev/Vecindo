import { redirect } from "next/navigation"

// Mascotas fue absorbido por Ayuda Comunitaria (categoría "Mascotas").
// Mantenemos esta ruta sólo para compatibilidad con links viejos.
export default function PetsRedirectPage() {
  redirect("/dashboard/ayuda")
}
