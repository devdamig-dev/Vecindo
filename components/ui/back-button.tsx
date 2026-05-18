"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  label?: string;
  className?: string;
}

export function BackButton({ label = "Volver", className }: BackButtonProps) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={cn(
        "flex w-fit items-center gap-2 text-sm text-muted-foreground transition-all duration-200 hover:text-foreground active:scale-[0.97]",
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      {label}
    </button>
  );
}
