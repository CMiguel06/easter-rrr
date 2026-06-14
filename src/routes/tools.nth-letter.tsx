import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CopyButton } from "@/components/ui-custom/CopyButton";

export const Route = createFileRoute("/tools/nth-letter")({
  head: () => ({
    meta: [
      { title: "Nth-letter extractor — Easter" },
      { name: "description", content: "Hide or reveal messages with every Nth character." },
    ],
  }),
  component: Page,
});

function Page() {
  const [text, setText] = useState("");
  const [n, setN] = useState(3);
  const [start, setStart] = useState(1);
  const [reverse, setReverse] = useState(false);
  const stripped = text.replace(/\s+/g, "");
  let out = "";
  for (let i = start - 1; i < stripped.length; i += n) out += stripped[i];
  if (reverse) out = out.split("").reverse().join("");

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Nth letter"
        title="Every Nth character"
        description="Reveal a message hidden by skipping characters at a regular rhythm."
      />
      <GlassCard className="space-y-5 p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Text</label>
          <Textarea
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text…"
            className="bg-white/5"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Step (N)</label>
            <Input
              type="number"
              min={1}
              value={n}
              onChange={(e) => setN(Math.max(1, parseInt(e.target.value) || 1))}
              className="bg-white/5"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Start at</label>
            <Input
              type="number"
              min={1}
              value={start}
              onChange={(e) => setStart(Math.max(1, parseInt(e.target.value) || 1))}
              className="bg-white/5"
            />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
          <span className="text-sm">Reverse output</span>
          <Switch checked={reverse} onCheckedChange={setReverse} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Extracted</label>
            <CopyButton value={out} />
          </div>
          <div className="break-all rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-sm">
            {out || <span className="text-muted-foreground">Result appears here…</span>}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
