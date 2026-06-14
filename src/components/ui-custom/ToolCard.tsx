import { Link } from "@tanstack/react-router";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { DifficultyBadge } from "./DifficultyBadge";
import { LocalFirstBadge } from "./LocalFirstBadge";
import type { Difficulty } from "@/lib/tools-data";

export function ToolCard({
  to,
  icon: Icon,
  title,
  description,
  difficulty,
  localFirst,
  category,
}: {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  difficulty?: Difficulty;
  localFirst?: boolean;
  category?: string;
}) {
  return (
    <Link
      to={to}
      className="glass-panel group relative block overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at 30% 0%, oklch(0.72 0.16 245 / 10%), transparent 70%)",
        }}
      />
      <div className="mb-4 flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
          <Icon className="h-4.5 w-4.5 text-foreground/90" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
      <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{description}</p>
      {(difficulty || localFirst || category) && (
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {category && (
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
              {category}
            </span>
          )}
          {difficulty && <DifficultyBadge difficulty={difficulty} />}
          {localFirst && <LocalFirstBadge />}
        </div>
      )}
    </Link>
  );
}
