import type { Difficulty } from "@/lib/tools-data";
import { cn } from "@/lib/utils";

export function DifficultyBadge({ difficulty, className }: { difficulty: Difficulty; className?: string }) {
  const map: Record<Difficulty, string> = {
    Easy: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
    Medium: "bg-amber-400/10 text-amber-200 ring-amber-400/20",
    Advanced: "bg-rose-400/10 text-rose-200 ring-rose-400/20",
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ring-1", map[difficulty], className)}>
      {difficulty}
    </span>
  );
}
