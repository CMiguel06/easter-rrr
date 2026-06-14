import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function GlassCard({
  className,
  strong = false,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { strong?: boolean }) {
  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass-panel",
        "rounded-2xl",
        className,
      )}
      {...rest}
    />
  );
}
