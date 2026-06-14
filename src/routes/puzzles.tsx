import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { ArrowRight, Clock, Gauge } from "lucide-react";

export const Route = createFileRoute("/puzzles")({
  head: () => ({
    meta: [
      { title: "Puzzles — Easter" },
      { name: "description", content: "Ready-to-use puzzle templates: hash hunts, image whispers, QR trails and more." },
      { property: "og:title", content: "Puzzles — Easter" },
      { property: "og:description", content: "Pick a template and start a small mystery in minutes." },
    ],
  }),
  component: PuzzlesPage,
});

type Difficulty = "Easy" | "Medium" | "Hard";

const TEMPLATES: {
  title: string;
  difficulty: Difficulty;
  time: string;
  tools: string[];
  description: string;
  to: string;
}[] = [
  {
    title: "Hash Hunt",
    difficulty: "Easy",
    time: "5 min",
    tools: ["Hash"],
    description: "Share a clue and a target hash. Players win when they find the phrase.",
    to: "/tools/hash",
  },
  {
    title: "Image Whisper",
    difficulty: "Easy",
    time: "5 min",
    tools: ["Image secret"],
    description: "Hide a message inside an ordinary-looking PNG.",
    to: "/tools/image-secret",
  },
  {
    title: "Invisible Ink",
    difficulty: "Easy",
    time: "3 min",
    tools: ["Invisible text"],
    description: "Slip a message between the letters of a normal sentence.",
    to: "/tools/invisible-text",
  },
  {
    title: "QR Trail",
    difficulty: "Medium",
    time: "10 min",
    tools: ["QR"],
    description: "A series of QR codes, each pointing to the next clue.",
    to: "/tools/qr-secret",
  },
  {
    title: "Code Cascade",
    difficulty: "Medium",
    time: "15 min",
    tools: ["Encoder"],
    description: "A message passed through Base64, then binary, then ROT13. Players unwrap it.",
    to: "/tools/encoder",
  },
  {
    title: "Final Door",
    difficulty: "Hard",
    time: "20 min",
    tools: ["Hash", "Challenge"],
    description: "A multi-step hunt where the final answer is verified against a hash.",
    to: "/tools/challenge",
  },
];

function diffColor(d: Difficulty) {
  return d === "Easy"
    ? "bg-emerald-500/15 text-emerald-200"
    : d === "Medium"
    ? "bg-amber-500/15 text-amber-200"
    : "bg-rose-500/15 text-rose-200";
}

function PuzzlesPage() {
  return (
    <div className="px-4 pt-16 pb-10">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="Puzzles"
          title="Templates to spark a mystery"
          description="Pick a shape, open the matching tool, and shape it into your own."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <GlassCard key={t.title} className="flex flex-col gap-4 p-6 transition-transform hover:-translate-y-0.5">
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-2.5 py-0.5 text-xs ${diffColor(t.difficulty)}`}>{t.difficulty}</span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {t.time}
                </span>
              </div>
              <div>
                <h3 className="text-base font-semibold">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                <Gauge className="h-3 w-3" />
                {t.tools.map((tool) => (
                  <span key={tool} className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5">{tool}</span>
                ))}
              </div>
              <Link
                to={t.to}
                className="mt-auto inline-flex items-center gap-2 self-start rounded-lg bg-gradient-to-br from-primary to-accent px-3 py-1.5 text-sm font-medium text-primary-foreground"
              >
                Use template <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
