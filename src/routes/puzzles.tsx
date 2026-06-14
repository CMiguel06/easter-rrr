import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { DifficultyBadge } from "@/components/ui-custom/DifficultyBadge";

export const Route = createFileRoute("/puzzles")({
  head: () => ({
    meta: [
      { title: "Puzzle templates — Easter" },
      { name: "description", content: "Ready-made local puzzles: hash hunts, QR trails, image whispers and more." },
      { property: "og:title", content: "Puzzle templates — Easter" },
      { property: "og:description", content: "Ready-made local puzzles you can adapt and share." },
    ],
  }),
  component: Page,
});

type Difficulty = "Easy" | "Medium" | "Advanced";

const TEMPLATES: { title: string; description: string; difficulty: Difficulty; time: string; tool: string; to: string }[] = [
  { title: "Hash Hunt", description: "Players must discover the phrase that matches a hash.", difficulty: "Easy", time: "10 min", tool: "Phrase hash", to: "/tools/hash" },
  { title: "Image Whisper", description: "A secret message hidden in a PNG. Players inspect to find it.", difficulty: "Medium", time: "15 min", tool: "Image secret", to: "/tools/image-secret" },
  { title: "Invisible Ink", description: "A hidden message embedded between visible characters.", difficulty: "Easy", time: "10 min", tool: "Invisible text", to: "/tools/invisible-text" },
  { title: "QR Trail", description: "A sequence of QR clues leads to a final answer.", difficulty: "Medium", time: "20 min", tool: "QR trail", to: "/tools/qr-trail" },
  { title: "Code Cascade", description: "A message encoded through several transformations.", difficulty: "Advanced", time: "25 min", tool: "Encoder lab", to: "/tools/encoder" },
  { title: "Final Door", description: "A final answer verified locally against a hash.", difficulty: "Medium", time: "15 min", tool: "Final answer verifier", to: "/tools/final-door" },
  { title: "Acrostic Letter Hunt", description: "The first letters of lines reveal the hidden clue.", difficulty: "Easy", time: "10 min", tool: "Acrostic maker", to: "/tools/acrostic" },
  { title: "Source Code Secret", description: "A clue hidden inside an HTML comment.", difficulty: "Easy", time: "10 min", tool: "HTML comment", to: "/tools/html-comment" },
  { title: "Console Door", description: "A hidden message appears in the browser console.", difficulty: "Medium", time: "15 min", tool: "Console message", to: "/tools/console-message" },
];

function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-10">
      <PageHeader eyebrow="Puzzle templates" title="Ready-made mysteries" description="Open a template and adapt it to your own clues. Everything runs locally — no accounts, no saved history." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t) => (
          <GlassCard key={t.title} className="flex flex-col p-6">
            <div className="flex items-center justify-between">
              <DifficultyBadge difficulty={t.difficulty} />
              <span className="text-[11px] text-muted-foreground">{t.time}</span>
            </div>
            <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{t.title}</h3>
            <p className="mt-1 text-[13px] text-muted-foreground">{t.description}</p>
            <p className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground/80">Required: {t.tool}</p>
            <div className="mt-5 flex items-center gap-2">
              <Link to={t.to} className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                Use template <ArrowRight className="h-3 w-3" />
              </Link>
              <Link to={t.to} className="text-[11px] text-muted-foreground hover:text-foreground">Preview →</Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
