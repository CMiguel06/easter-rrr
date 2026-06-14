import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { z } from "zod";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { ToolCard } from "@/components/ui-custom/ToolCard";
import { CATEGORIES, TOOLS, type Category, type Difficulty } from "@/lib/tools-data";

const search = z.object({
  category: z.string().optional(),
  difficulty: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/tools/")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Toolbox — Easter" },
      { name: "description", content: "Every Easter tool, grouped by category. Search, filter and open." },
      { property: "og:title", content: "Toolbox — Easter" },
      { property: "og:description", content: "Every Easter tool, grouped by category." },
    ],
  }),
  component: ToolsIndex,
});

const DIFFS: Difficulty[] = ["Easy", "Medium", "Advanced"];

function ToolsIndex() {
  const { category, difficulty, q } = Route.useSearch();
  const [query, setQuery] = useState(q ?? "");
  const navigate = Route.useNavigate();

  const filtered = useMemo(() => {
    return TOOLS.filter((t) => {
      if (category && t.category !== category) return false;
      if (difficulty && t.difficulty !== difficulty) return false;
      if (query) {
        const s = (t.title + " " + t.description + " " + t.category).toLowerCase();
        if (!s.includes(query.toLowerCase())) return false;
      }
      return true;
    });
  }, [category, difficulty, query]);

  const setCat = (c?: string) => navigate({ search: (s) => ({ ...s, category: c }) });
  const setDiff = (d?: string) => navigate({ search: (s) => ({ ...s, difficulty: d }) });

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader eyebrow="Toolbox" title="Every Easter tool." description="Search, filter and open. Each one runs locally in your browser." />
      <div className="glass-panel mb-6 flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); navigate({ search: (s) => ({ ...s, q: e.target.value || undefined }) }); }}
            placeholder="Search tools"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary/40"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {DIFFS.map((d) => (
            <button key={d} onClick={() => setDiff(difficulty === d ? undefined : d)}
              className={`rounded-full px-3 py-1.5 text-xs ${difficulty === d ? "bg-primary text-primary-foreground" : "border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6 flex flex-wrap gap-1.5">
        <button onClick={() => setCat(undefined)} className={`rounded-full px-3 py-1.5 text-xs ${!category ? "bg-primary text-primary-foreground" : "border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"}`}>All</button>
        {CATEGORIES.map((c) => (
          <button key={c.name} onClick={() => setCat(c.name === category ? undefined : c.name)}
            className={`rounded-full px-3 py-1.5 text-xs ${category === c.name ? "bg-primary text-primary-foreground" : "border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"}`}>
            {c.name}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="glass-panel rounded-2xl p-10 text-center text-sm text-muted-foreground">
          Nothing matches. Try clearing the filters.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => <ToolCard key={t.to} {...t} />)}
        </div>
      )}
      <div className="mt-10 text-center text-xs text-muted-foreground">
        Looking for a specific category?{" "}
        <Link to="/" className="text-primary hover:underline">See the homepage groupings →</Link>
      </div>
    </div>
  );
}
