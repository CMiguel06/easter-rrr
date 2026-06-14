import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export function LocalFirstBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground ring-1 ring-white/10",
        className,
      )}
    >
      <Lock className="h-2.5 w-2.5" /> Local
    </span>
  );
}
