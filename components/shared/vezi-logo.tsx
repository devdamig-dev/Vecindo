import Link from "next/link"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  href?: string
  className?: string
  textClassName?: string
  iconClassName?: string
  compact?: boolean
}

export function VeziLogo({ href = "/", className, textClassName, iconClassName, compact = false }: Props) {
  const content = (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-primary/12 text-primary">
        <MapPin className={cn("h-4.5 w-4.5", iconClassName)} />
        <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-primary" />
      </span>
      <span className={cn("text-xl font-bold tracking-tight text-foreground", textClassName)}>
        VEZI
      </span>
      {!compact && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">beta</span>}
    </span>
  )

  return <Link href={href}>{content}</Link>
}
