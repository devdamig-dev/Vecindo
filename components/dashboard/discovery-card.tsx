import { Badge } from "@/components/ui/badge"

type DiscoveryCardProps = {
  title: string
  subtitle: string
  user: string
  distance: string
  tag: string
  image: string
  tagClassName: string
}

export function DiscoveryCard({ title, subtitle, user, distance, tag, image, tagClassName }: DiscoveryCardProps) {
  return (
    <article className="group w-[272px] shrink-0 overflow-hidden rounded-2xl border border-border/70 bg-background shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-200 hover:scale-[1.01]">
      <div className="relative h-32 w-full overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
        />
        <Badge className={`absolute left-2.5 top-2.5 border text-[12px] ${tagClassName}`}>
          {tag}
        </Badge>
      </div>

      <div className="space-y-2 p-3.5">
        <p className="line-clamp-1 text-[15px] font-semibold text-foreground">{title}</p>
        <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">{subtitle}</p>

        <div className="flex items-center justify-between border-t border-border/70 pt-2 text-[12px] text-muted-foreground">
          <span>{user}</span>
          <span>{distance}</span>
        </div>
      </div>
    </article>
  )
}
