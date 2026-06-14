import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CopyButton } from "@/components/ui-custom/CopyButton";

export const Route = createFileRoute("/tools/console-message")({
  head: () => ({
    meta: [
      { title: "Browser console message — Easter" },
      {
        name: "description",
        content:
          "Generate a small JavaScript snippet that prints a hidden message in the browser console.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const [msg, setMsg] = useState("Welcome, curious one.");
  const [style, setStyle] = useState<"simple" | "elegant" | "warning">("elegant");
  const snippet = build(msg, style);
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Console"
        title="A message in the browser console"
        description="A small script you can include on a page you own to greet curious visitors."
      />
      <GlassCard className="space-y-5 p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <Input value={msg} onChange={(e) => setMsg(e.target.value)} className="bg-white/5" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Style</label>
          <Select value={style} onValueChange={(v) => setStyle(v as typeof style)}>
            <SelectTrigger className="bg-white/5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Simple</SelectItem>
              <SelectItem value="elegant">Elegant</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Snippet</label>
            <CopyButton value={snippet} />
          </div>
          <pre className="whitespace-pre-wrap break-all rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs">
            {snippet}
          </pre>
        </div>
        <p className="text-xs text-muted-foreground">
          Only use scripts on websites you own or are allowed to edit.
        </p>
      </GlassCard>
    </div>
  );
}

function build(msg: string, style: "simple" | "elegant" | "warning") {
  const safe = msg.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  if (style === "simple") return `<script>\n  console.log(\`${safe}\`);\n</script>`;
  if (style === "warning")
    return `<script>\n  console.log(\n    \`%c${safe}\`,\n    'color:#ffb454;font-size:14px;font-weight:600;'\n  );\n</script>`;
  return `<script>\n  console.log(\n    \`%c${safe}\`,\n    'color:#9ecbff;font:600 16px -apple-system,system-ui,sans-serif;letter-spacing:.02em;'\n  );\n</script>`;
}
