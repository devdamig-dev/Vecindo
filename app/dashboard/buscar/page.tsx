"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useMemo, useState } from "react"
import { ArrowLeft, Package, Search } from "lucide-react"
import { searchModuleMeta, searchVezi, type SearchModule } from "@/lib/search"

const filters: Array<{ key: "all" | SearchModule; label: string }> = [
  { key: "all", label: "Todo" }, { key: "needs", label: "Necesidades" }, { key: "services", label: "Servicios" },
  { key: "commerces", label: "Comercios" }, { key: "entrepreneurs", label: "Emprendimientos" },
]

function Results() {
  const params = useSearchParams()
  const query = params.get("q") ?? ""
  const [filter, setFilter] = useState<"all" | SearchModule>("all")
  const results = useMemo(() => searchVezi(query, filter === "all" ? undefined : filter), [query, filter])
  return <div className="space-y-5">
    <header className="rounded-3xl bg-slate-900 p-5 text-white"><Link href="/dashboard" className="inline-flex min-h-11 items-center gap-2 text-sm text-slate-300"><ArrowLeft className="h-4 w-4" /> Volver</Link><div className="mt-2 flex items-center gap-2"><Search className="h-6 w-6 text-amber-300" /><h1 className="text-2xl font-bold">Resultados para “{query}”</h1></div><p className="mt-2 text-sm text-slate-300">Resultados demo en todos los módulos de VEZI.</p></header>
    <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Filtrar resultados">{filters.map((item) => <button key={item.key} onClick={() => setFilter(item.key)} className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-semibold transition active:scale-95 ${filter === item.key ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/70"}`}>{item.label}</button>)}</div>
    <p className="text-sm text-muted-foreground">{results.length} resultado{results.length === 1 ? "" : "s"}</p>
    <div className="space-y-2">{results.map((result) => { const meta = searchModuleMeta[result.module]; return <Link key={result.id} href={result.href} className="flex min-h-16 items-center gap-3 rounded-2xl border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-md active:scale-[.99]"><span className={`h-3 w-3 rounded-full ${meta.dot}`} /><span className="min-w-0 flex-1"><span className={`text-xs font-bold uppercase ${meta.color}`}>{meta.label}</span><span className="mt-1 flex items-center gap-1 font-semibold">{result.kind === "product" && <Package className="h-4 w-4" />}{result.title}</span><span className="text-sm text-muted-foreground">{result.subtitle}</span></span></Link> })}</div>
    {!results.length && <div className="rounded-2xl border border-dashed bg-amber-50 p-7 text-center"><p className="font-bold">No encontramos eso cerca tuyo.</p><p className="mt-1 text-sm text-muted-foreground">Convertí tu búsqueda en demanda para que alguien pueda responder.</p><Link href="/dashboard/necesito/nueva" className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-amber-600 px-4 text-sm font-bold text-white">Publicar necesidad</Link></div>}
  </div>
}

export default function SearchResultsPage() { return <Suspense><Results /></Suspense> }
