import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye } from "lucide-react";
import { z } from "zod";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { DifficultyBadge } from "@/components/ui-custom/DifficultyBadge";
import { PUZZLE_TEMPLATES, findPuzzleTemplate } from "@/lib/puzzle-templates";

const puzzleSearch = z.object({
  template: z.string().optional(),
});

export const Route = createFileRoute("/puzzles")({
  validateSearch: puzzleSearch,
  head: () => ({
    meta: [
      { title: "Puzzle templates - Easter" },
      {
        name: "description",
        content: "Ready-made local puzzles: hash hunts, QR trails, image whispers and more.",
      },
      { property: "og:title", content: "Puzzle templates - Easter" },
      { property: "og:description", content: "Ready-made local puzzles you can adapt and share." },
    ],
  }),
  component: Page,
});

function Page() {
  const { template } = Route.useSearch();
  const navigate = Route.useNavigate();
  const selected = findPuzzleTemplate(template) ?? PUZZLE_TEMPLATES[0];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-10">
      <PageHeader
        eyebrow="Puzzle templates"
        title="Ready-made mysteries"
        description="Open a template and adapt it to your own clues. Everything runs locally - no accounts, no saved history."
      />
      <GlassCard strong className="mb-6 grid gap-5 p-6 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={selected.difficulty} />
            <span className="text-[11px] text-muted-foreground">{selected.time}</span>
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground/80">
              {selected.tool}
            </span>
          </div>
          <h2 className="text-xl font-semibold tracking-tight">{selected.title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{selected.description}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {selected.steps.map((step, index) => (
              <div
                key={`${step.kind}-${index}`}
                className="rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Step {index + 1} - {step.kind}
                </div>
                <div className="mt-1 line-clamp-3 text-xs text-foreground/90">{step.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          <Link
            to="/tools/challenge"
            search={{ template: selected.slug }}
            className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            Use template <ArrowRight className="h-3 w-3" />
          </Link>
          <Link
            to={selected.to}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-foreground hover:bg-white/10"
          >
            Open tool <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </GlassCard>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PUZZLE_TEMPLATES.map((t) => (
          <GlassCard key={t.title} className="flex flex-col p-6">
            <div className="flex items-center justify-between">
              <DifficultyBadge difficulty={t.difficulty} />
              <span className="text-[11px] text-muted-foreground">{t.time}</span>
            </div>
            <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{t.title}</h3>
            <p className="mt-1 text-[13px] text-muted-foreground">{t.description}</p>
            <p className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground/80">
              Required: {t.tool}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <Link
                to="/tools/challenge"
                search={{ template: t.slug }}
                className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              >
                Use template <ArrowRight className="h-3 w-3" />
              </Link>
              <button
                type="button"
                onClick={() => navigate({ search: { template: t.slug } })}
                className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground"
              >
                <Eye className="h-3 w-3" /> Preview
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
