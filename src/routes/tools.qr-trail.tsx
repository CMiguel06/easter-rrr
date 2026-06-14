import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";
import { Download, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/tools/qr-trail")({
  head: () => ({
    meta: [
      { title: "QR Trail Builder — Easter" },
      {
        name: "description",
        content: "Create a sequence of QR clues that lead to a final answer.",
      },
    ],
  }),
  component: Page,
});

type Step = { title: string; clue: string; hint?: string };

function Page() {
  const [steps, setSteps] = useState<Step[]>([
    { title: "Step 1", clue: "Find the next clue under the old map", hint: "" },
  ]);

  const update = (i: number, patch: Partial<Step>) =>
    setSteps((s) => s.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  const remove = (i: number) => setSteps((s) => s.filter((_, idx) => idx !== i));
  const add = () => setSteps((s) => [...s, { title: `Step ${s.length + 1}`, clue: "", hint: "" }]);

  const exportInstructions = () => {
    const txt = steps
      .map(
        (s, i) =>
          `Step ${i + 1}: ${s.title}\nClue: ${s.clue}${s.hint ? `\nHint: ${s.hint}` : ""}\n`,
      )
      .join("\n");
    download("easter-trail.txt", new Blob([txt], { type: "text/plain" }));
  };
  const exportJson = () =>
    download(
      "easter-trail.json",
      new Blob([JSON.stringify({ v: 1, steps }, null, 2)], { type: "application/json" }),
    );

  const exportAllQR = async () => {
    for (let i = 0; i < steps.length; i++) {
      const url = await QRCode.toDataURL(steps[i].clue || " ", {
        margin: 2,
        width: 480,
        color: { dark: "#e9eaff", light: "#0000" },
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = `trail-${i + 1}.png`;
      a.click();
      await new Promise((r) => setTimeout(r, 80));
    }
    toast.success("Downloaded QR set.");
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="QR trail"
        title="Build a QR treasure hunt"
        description="Stack a sequence of QR clues, each leading to the next. Export QR images and instructions locally."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <Button onClick={add} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Add step
        </Button>
        <Button onClick={exportAllQR} variant="outline" className="border-white/10 bg-white/5">
          <Download className="mr-2 h-4 w-4" /> All QR (PNG)
        </Button>
        <Button
          onClick={exportInstructions}
          variant="outline"
          className="border-white/10 bg-white/5"
        >
          <Download className="mr-2 h-4 w-4" /> Instructions (TXT)
        </Button>
        <Button onClick={exportJson} variant="outline" className="border-white/10 bg-white/5">
          <Download className="mr-2 h-4 w-4" /> Trail (JSON)
        </Button>
      </div>
      <div className="space-y-4">
        {steps.map((s, i) => (
          <StepCard
            key={i}
            step={s}
            index={i}
            onChange={(p) => update(i, p)}
            onRemove={() => remove(i)}
          />
        ))}
      </div>
    </div>
  );
}

function StepCard({
  step,
  index,
  onChange,
  onRemove,
}: {
  step: Step;
  index: number;
  onChange: (p: Partial<Step>) => void;
  onRemove: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    if (!step.clue) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      return;
    }
    QRCode.toCanvas(canvasRef.current, step.clue, {
      margin: 2,
      width: 160,
      color: { dark: "#e9eaff", light: "#0000" },
    }).catch(() => {});
  }, [step.clue]);
  return (
    <GlassCard className="grid gap-4 p-5 sm:grid-cols-[1fr_auto]">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Step {index + 1}
          </span>
          <button
            onClick={onRemove}
            className="text-muted-foreground hover:text-rose-300"
            aria-label={`Remove QR trail step ${index + 1}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
        <Input
          value={step.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Title"
          className="bg-white/5"
        />
        <Textarea
          rows={2}
          value={step.clue}
          onChange={(e) => onChange({ clue: e.target.value })}
          placeholder="Clue text or link"
          className="bg-white/5"
        />
        <Input
          value={step.hint ?? ""}
          onChange={(e) => onChange({ hint: e.target.value })}
          placeholder="Optional hint"
          className="bg-white/5"
        />
      </div>
      <div className="grid place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-3 ring-1 ring-white/10">
        <canvas ref={canvasRef} />
      </div>
    </GlassCard>
  );
}

function download(name: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
