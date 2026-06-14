import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/ui-custom/CopyButton";

export const Route = createFileRoute("/tools/html-comment")({
  head: () => ({
    meta: [
      { title: "HTML comment — Easter" },
      {
        name: "description",
        content: "Generate a hidden HTML comment snippet for your website source.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const [msg, setMsg] = useState("Look closer.");
  const snippet = `<!--\n  ${msg.replace(/-->/g, "-- >")}\n-->`;
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="HTML comment"
        title="A whisper in the source"
        description="Paste this anywhere in your HTML. It's visible to anyone who views source — that's the point."
      />
      <GlassCard className="space-y-5 p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Secret message</label>
          <Textarea
            rows={3}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="bg-white/5"
          />
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
          This is not secure. Use it only as a playful easter egg.
        </p>
      </GlassCard>
    </div>
  );
}
