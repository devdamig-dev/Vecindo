import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  title: string
  subtitle?: string
  action?: ReactNode
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export function SectionHeader({ title, subtitle, action, className, titleClassName, subtitleClassName }: SectionHeaderProps) {
  return (
    <div className={cn("mb-3 flex items-end justify-between gap-3", className)}>
      <div>
        <h2 className={cn("text-[17px] font-semibold tracking-tight text-foreground", titleClassName)}>{title}</h2>
        {subtitle ? <p className={cn("text-[13px] text-muted-foreground", subtitleClassName)}>{subtitle}</p> : null}
      </div>
      {action}
    </div>
  )
}
