import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RevealFindingCard, type RevealFinding } from "@/components/ui-custom/RevealFindingCard";
import { detect } from "@/lib/detection";

export const Route = createFileRoute("/tools/encoding-detector")({
  head: () => ({ meta: [
    { title: "Encoding detector — Easter" },
    { name: "description", content: "Guess what encoding a piece of text might be. Detection is heuristic." },
  ]}),
  component: Page,
});

function Page() {
  const [text, setText] = useState("");
  const [findings, setFindings] = useState<RevealFinding[]>([]);
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="Detector" title="Encoding detector" description="Paste text and let Easter guess what kind of encoding it might be. Detection is heuristic and may be wrong." />
      <GlassCard className="space-y-4 p-6">
        <Textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste suspicious text…" className="bg-white/5" />
        <Button onClick={() => setFindings(detect(text).map((d) => ({ title: `${d.label} — ${d.confidence}`, message: d.note, value: text.slice(0, 200), to: "/tools/encoder", ctaLabel: "Open encoder" })))} disabled={!text} className="bg-primary text-primary-foreground hover:bg-primary/90">Detect</Button>
      </GlassCard>
      {findings.length > 0 && <div className="mt-5 grid gap-3 sm:grid-cols-2">{findings.map((f, i) => <RevealFindingCard key={i} finding={f} />)}</div>}
      {findings.length === 0 && text && <div className="glass-panel mt-5 rounded-2xl p-6 text-center text-sm text-muted-foreground">Nothing obvious detected. Try a different snippet.</div>}
    </div>
  );
}
