import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { Category } from "@/lib/tools-data";
import { toolsByCategory } from "@/lib/tools-data";

export function CategoryCard({
  name, description, icon: Icon,
}: { name: Category; description: string; icon: LucideIcon }) {
  const items = toolsByCategory(name).slice(0, 4);
  return (
    <div className="glass-panel group rounded-2xl p-6 transition-all hover:-translate-y-0.5">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
          <Icon className="h-4.5 w-4.5" />
        </div>
        <h3 className="text-[15px] font-semibold tracking-tight">{name}</h3>
      </div>
      <p className="text-[13px] text-muted-foreground">{description}</p>
      <ul className="mt-4 space-y-1.5">
        {items.map((t) => (
          <li key={t.to}>
            <Link to={t.to} className="flex items-center justify-between rounded-lg px-2 py-1 text-[13px] text-foreground/80 hover:bg-white/5 hover:text-foreground">
              <span>{t.title}</span>
              <ArrowRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/tools"
        search={{ category: name }}
        className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-primary hover:text-primary/80"
      >
        View all tools <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
