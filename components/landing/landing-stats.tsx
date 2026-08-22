import { MapPin, MessageCircle, PenLine, Store } from "lucide-react"

const benefits = [
  { icon: MapPin, title: "Encontrá cerca", copy: "Resultados relevantes de tu zona." },
  { icon: PenLine, title: "Publicá en segundos", copy: "Contá lo que necesitás con tus palabras." },
  { icon: MessageCircle, title: "Contactá directo", copy: "Coordiná sin intermediarios innecesarios." },
  { icon: Store, title: "Apoyá lo local", copy: "Servicios, comercios y emprendimientos de tu comunidad." },
]

export function LandingStats() {
  return <section id="beneficios" className="bg-slate-950 text-white"><div className="mx-auto grid max-w-6xl gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(({ icon: Icon, title, copy }) => <article key={title} className="bg-slate-950 p-6 sm:p-8"><Icon className="h-5 w-5 text-orange-400" /><h2 className="mt-5 font-bold">{title}</h2><p className="mt-1 text-sm leading-relaxed text-slate-400">{copy}</p></article>)}</div></section>
}
