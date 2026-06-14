import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { encoders, type EncoderKey } from "@/lib/encoders";

export const Route = createFileRoute("/tools/puzzle-reverse")({
  head: () => ({ meta: [
    { title: "Puzzle reverse path — Easter" },
    { name: "description", content: "Step through transformations to solve a clue manually." },
  ]}),
  component: Page,
});

const OPTIONS: { key: EncoderKey; label: string }[] = [
  { key: "base64", label: "Decode Base64" },
  { key: "base32", label: "Decode Base32" },
  { key: "hex", label: "Decode Hex" },
  { key: "binary", label: "Decode Binary" },
  { key: "rot13", label: "ROT13" },
  { key: "morse", label: "Decode Morse" },
  { key: "url", label: "URL decode" },
  { key: "unicode", label: "Unicode unescape" },
  { key: "ascii", label: "Decode ASCII codes" },
];

function Page() {
  const [current, setCurrent] = useState("");
  const [path, setPath] = useState<{ step: string; value: string }[]>([]);
  const apply = (k: EncoderKey, label: string) => {
    try {
      const v = encoders[k].decode(current);
      setPath((p) => [...p, { step: label, value: v }]);
      setCurrent(v);
    } catch {
      setPath((p) => [...p, { step: `${label} (failed)`, value: current }]);
    }
  };
  const reset = () => { setPath([]); setCurrent(""); };
  const exportTxt = () => {
    const t = path.map((s, i) => `Step ${i + 1}: ${s.step}\n${s.value}\n`).join("\n");
    const blob = new Blob([t], { type: "text/plain" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "easter-solution.txt"; a.click();
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader eyebrow="Reverse" title="Puzzle reverse path" description="Apply transformations one step at a time. Easter doesn't promise automatic solving — it shows your work." />
      <GlassCard className="space-y-4 p-6">
        <label className="text-sm font-medium">Current clue</label>
        <Textarea rows={4} value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Paste the clue…" className="bg-white/5 font-mono text-xs" />
        <div className="flex flex-wrap gap-2">
          {OPTIONS.map((o) => (
            <Button key={o.key} onClick={() => apply(o.key, o.label)} disabled={!current} variant="outline" className="border-white/10 bg-white/5 text-xs">
              {o.label}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={reset} variant="outline" className="border-white/10 bg-white/5"><Trash2 className="mr-2 h-3.5 w-3.5" /> Reset</Button>
          <Button onClick={exportTxt} disabled={!path.length} variant="outline" className="border-white/10 bg-white/5"><Download className="mr-2 h-3.5 w-3.5" /> Export path</Button>
        </div>
      </GlassCard>
      {path.length > 0 && (
        <GlassCard className="mt-5 p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Path so far</div>
          <ol className="mt-3 space-y-2">
            {path.map((s, i) => (
              <li key={i} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-muted-foreground">Step {i + 1} · {s.step}</div>
                <div className="mt-1 break-all font-mono text-xs">{s.value}</div>
              </li>
            ))}
          </ol>
        </GlassCard>
      )}
    </div>
  );
}
