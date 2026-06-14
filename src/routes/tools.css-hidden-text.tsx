import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton } from "@/components/ui-custom/CopyButton";

export const Route = createFileRoute("/tools/css-hidden-text")({
  head: () => ({ meta: [
    { title: "Hidden CSS text — Easter" },
    { name: "description", content: "Generate playful CSS/HTML snippets for hidden text reveals." },
  ]}),
  component: Page,
});

type Mode = "blend" | "tiny" | "hover" | "click";

function Page() {
  const [msg, setMsg] = useState("Look closer.");
  const [mode, setMode] = useState<Mode>("blend");
  const snippet = build(msg, mode);
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="Hidden CSS" title="Tiny in-page reveals" description="Playful HTML/CSS snippets that hide text in plain sight." />
      <GlassCard className="space-y-5 p-6">
        <div className="space-y-2"><label className="text-sm font-medium">Hidden text</label>
          <Input value={msg} onChange={(e) => setMsg(e.target.value)} className="bg-white/5" /></div>
        <div className="space-y-2"><label className="text-sm font-medium">Style</label>
          <Select value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <SelectTrigger className="bg-white/5"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="blend">Same colour as background</SelectItem>
              <SelectItem value="tiny">Tiny footer text</SelectItem>
              <SelectItem value="hover">Reveal on hover</SelectItem>
              <SelectItem value="click">Reveal after click</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">Snippet</label><CopyButton value={snippet} /></div>
          <pre className="whitespace-pre-wrap break-all rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs">{snippet}</pre>
        </div>
        <p className="text-xs text-muted-foreground">This is not secure. It's a playful easter egg.</p>
      </GlassCard>
    </div>
  );
}

function build(msg: string, mode: Mode) {
  const safe = msg.replace(/</g, "&lt;");
  if (mode === "blend") return `<span style="color:#0d0d0d;background:#0d0d0d;">${safe}</span>`;
  if (mode === "tiny") return `<span style="font-size:6px;color:#888;opacity:.6;">${safe}</span>`;
  if (mode === "hover") return `<span style="color:transparent;transition:color .3s;" onmouseover="this.style.color='currentColor'" onmouseout="this.style.color='transparent'">${safe}</span>`;
  return `<span id="easter-secret" style="color:transparent;cursor:pointer;" onclick="this.style.color='currentColor'">${safe}</span>`;
}
