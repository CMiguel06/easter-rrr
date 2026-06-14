import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui-custom/CopyButton";

export const Route = createFileRoute("/tools/konami")({
  head: () => ({ meta: [
    { title: "Konami code easter egg — Easter" },
    { name: "description", content: "Trigger a hidden reveal with the classic Konami Code." },
  ]}),
  component: Page,
});

function Page() {
  const [msg, setMsg] = useState("You found it.");
  const [url, setUrl] = useState("");
  const snippet = build(msg, url);
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="Konami code" title="↑ ↑ ↓ ↓ ← → ← → B A" description="Add this to your own page to trigger a small reveal when visitors type the classic combo." />
      <GlassCard className="space-y-5 p-6">
        <div className="space-y-2"><label className="text-sm font-medium">Reveal message</label>
          <Input value={msg} onChange={(e) => setMsg(e.target.value)} className="bg-white/5" /></div>
        <div className="space-y-2"><label className="text-sm font-medium">Optional redirect URL</label>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://…" className="bg-white/5" /></div>
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">Snippet</label><CopyButton value={snippet} /></div>
          <pre className="whitespace-pre-wrap break-all rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs">{snippet}</pre>
        </div>
        <p className="text-xs text-muted-foreground">Use only on your own website.</p>
      </GlassCard>
    </div>
  );
}

function build(msg: string, url: string) {
  const safeMsg = msg.replace(/`/g, "\\`");
  const safeUrl = url.trim();
  const action = safeUrl
    ? `window.location.href = ${JSON.stringify(safeUrl)};`
    : `var o = document.createElement('div');\n      o.textContent = \`${safeMsg}\`;\n      Object.assign(o.style, { position:'fixed', inset:0, display:'grid', placeItems:'center', background:'rgba(0,0,0,.85)', color:'#fff', fontSize:'28px', fontFamily:'-apple-system,system-ui,sans-serif', zIndex:9999 });\n      o.onclick = function(){ o.remove(); };\n      document.body.appendChild(o);`;
  return `<script>\n(function(){\n  var seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];\n  var i = 0;\n  window.addEventListener('keydown', function(e){\n    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;\n    if (k === seq[i]) { i++; if (i === seq.length) { i = 0; ${action} } }\n    else { i = (k === seq[0]) ? 1 : 0; }\n  });\n})();\n</script>`;
}
