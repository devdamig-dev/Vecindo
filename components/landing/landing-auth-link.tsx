"use client"

import Link from "next/link"
import { useEffect, useState, type ReactNode } from "react"

export function LandingAuthLink({ children, className, mode = "register", intent }: { children: ReactNode; className?: string; mode?: "register" | "login"; intent?: "service" | "commerce" | "venture" }) {
  const [href, setHref] = useState(`/login?mode=${mode}${intent ? `&intent=${intent}` : ""}`)

  useEffect(() => {
    if (window.localStorage.getItem("vezi_session") === "active") setHref("/dashboard")
  }, [])

  return <Link href={href} className={className}>{children}</Link>
}
