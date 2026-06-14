import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Download, GripVertical, Plus, Upload, X } from "lucide-react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui-custom/CopyButton";

export const Route = createFileRoute("/tools/challenge")({
  head: () => ({
    meta: [
      { title: "Create a complete challenge — Easter" },
      {
        name: "description",
        content:
          "Assemble a small treasure hunt by stacking steps, then export it as a local file.",
      },
      { property: "og:title", content: "Create a complete challenge — Easter" },
      {
        property: "og:description",
        content: "Build, copy and export multi-step easter egg challenges.",
      },
    ],
  }),
  component: ChallengePage,
});

type StepKind = "clue" | "base64" | "binary" | "hash" | "image" | "qr" | "reveal";

type Step = { id: string; kind: StepKind; value: string };

const STEP_LIB: { kind: StepKind; label: string; placeholder: string; desc: string }[] = [
  {
    kind: "clue",
    label: "Start clue",
    placeholder: "Begin where the day ends.",
    desc: "An opening sentence to hook the player.",
  },
  {
    kind: "base64",
    label: "Encode in Base64",
    placeholder: "the second key is rain",
    desc: "Players decode Base64 to reveal the next clue.",
  },
  {
    kind: "binary",
    label: "Convert to binary",
    placeholder: "follow the river",
    desc: "Players translate binary back to text.",
  },
  {
    kind: "hash",
    label: "Hash verification",
    placeholder: "what comes after dusk",
    desc: "Players must find the phrase that matches a given hash.",
  },
  {
    kind: "image",
    label: "Hidden image message",
    placeholder: "look beneath the pixels",
    desc: "A note tucked inside an image you'll share.",
  },
  {
    kind: "qr",
    label: "QR clue",
    placeholder: "https://example.com/secret",
    desc: "A QR code with the next clue, link or coordinate.",
  },
  {
    kind: "reveal",
    label: "Final reveal",
    placeholder: "curiosity rewarded",
    desc: "The grand-prize sentence.",
  },
];

function ChallengePage() {
  const [title, setTitle] = useState("My Easter challenge");
  const [steps, setSteps] = useState<Step[]>([
    { id: crypto.randomUUID(), kind: "clue", value: "Begin where the day ends." },
    { id: crypto.randomUUID(), kind: "reveal", value: "curiosity rewarded" },
  ]);
  const fileRef = useRef<HTMLInputElement>(null);

  const add = (kind: StepKind) => {
    const meta = STEP_LIB.find((s) => s.kind === kind)!;
    const reveal = steps.find((s) => s.kind === "reveal");
    const next: Step = { id: crypto.randomUUID(), kind, value: meta.placeholder };
    if (reveal) {
      // insert before reveal
      setSteps((prev) => {
        const idx = prev.findIndex((s) => s.id === reveal.id);
        const copy = prev.slice();
        copy.splice(idx, 0, next);
        return copy;
      });
    } else {
      setSteps((p) => [...p, next]);
    }
  };

  const remove = (id: string) => setSteps((p) => p.filter((s) => s.id !== id));
  const update = (id: string, value: string) =>
    setSteps((p) => p.map((s) => (s.id === id ? { ...s, value } : s)));

  const move = (id: string, dir: -1 | 1) => {
    setSteps((p) => {
      const i = p.findIndex((s) => s.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= p.length) return p;
      const copy = p.slice();
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  };

  const summary = buildSummary(title, steps);

  const exportJSON = () => {
    const data = { title, steps };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Challenge exported.");
  };

  const importJSON = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (typeof data.title === "string" && Array.isArray(data.steps)) {
        setTitle(data.title);
        setSteps(data.steps.map((s: Step) => ({ ...s, id: crypto.randomUUID() })));
        toast.success("Challenge imported.");
      } else {
        toast.error("That doesn't look like a valid challenge file.");
      }
    } catch {
      toast.error("Could not read that file.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Challenge builder"
        title="Build a small treasure hunt"
        description="Stack steps to design a multi-step easter egg. Export the plan as a local file — nothing is saved online."
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <GlassCard className="space-y-3 p-5">
            <label className="text-sm font-medium">Challenge title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/5"
            />
            <div className="flex flex-wrap gap-2 pt-2">
              {STEP_LIB.filter((s) => s.kind !== "reveal").map((s) => (
                <Button
                  key={s.kind}
                  size="sm"
                  variant="outline"
                  className="border-white/10 bg-white/5"
                  onClick={() => add(s.kind)}
                >
                  <Plus className="mr-1 h-3.5 w-3.5" /> {s.label}
                </Button>
              ))}
            </div>
          </GlassCard>
          <div className="space-y-3">
            {steps.map((s, i) => {
              const meta = STEP_LIB.find((m) => m.kind === s.kind)!;
              return (
                <GlassCard key={s.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <button
                        onClick={() => move(s.id, -1)}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="Up"
                      >
                        ▲
                      </button>
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <button
                        onClick={() => move(s.id, 1)}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="Down"
                      >
                        ▼
                      </button>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-muted-foreground">
                            Step {i + 1}
                          </span>
                          <span className="text-sm font-medium">{meta.label}</span>
                        </div>
                        {s.kind !== "reveal" && (
                          <button
                            onClick={() => remove(s.id)}
                            className="text-muted-foreground hover:text-rose-300"
                            aria-label="Remove"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <Textarea
                        rows={2}
                        value={s.value}
                        onChange={(e) => update(s.id, e.target.value)}
                        placeholder={meta.placeholder}
                        className="bg-white/5 text-sm"
                      />
                      <div className="text-xs text-muted-foreground">{meta.desc}</div>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={exportJSON}
              className="bg-gradient-to-br from-primary to-accent text-primary-foreground"
            >
              <Download className="mr-2 h-4 w-4" /> Export as JSON
            </Button>
            <Button
              variant="outline"
              className="border-white/10 bg-white/5"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" /> Import JSON
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) importJSON(f);
                e.target.value = "";
              }}
            />
          </div>
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <GlassCard strong className="space-y-3 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Challenge summary</h3>
              <CopyButton value={summary} />
            </div>
            <pre className="max-h-[60vh] overflow-auto whitespace-pre-wrap rounded-lg bg-black/30 p-4 text-xs leading-relaxed text-foreground">
              {summary}
            </pre>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

function buildSummary(title: string, steps: Step[]): string {
  const lines = [`# ${title}`, ""];
  steps.forEach((s, i) => {
    const meta = STEP_LIB.find((m) => m.kind === s.kind)!;
    lines.push(`Step ${i + 1} — ${meta.label}`);
    lines.push(`  ${s.value}`);
    lines.push("");
  });
  return lines.join("\n");
}
