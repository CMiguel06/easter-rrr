import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Textarea } from "@/components/ui/textarea";
import { CopyButton } from "@/components/ui-custom/CopyButton";
import { Button } from "@/components/ui/button";

const INVIS = /[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g;

export const Route = createFileRoute("/tools/invisible-detector")({
  head: () => ({
    meta: [
      { title: "Invisible character detector — Easter" },
      {
        name: "description",
        content: "Highlight and clean invisible Unicode characters hiding inside text.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const [text, setText] = useState("");
  const matches = Array.from(text.matchAll(INVIS));
  const cleaned = text.replace(INVIS, "");
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Detector"
        title="Invisible characters"
        description="Zero-width and bidi characters can hide inside ordinary text. This finds them, locally."
      />
      <GlassCard className="space-y-5 p-6">
        <Textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste any text…"
          className="bg-white/5"
        />
        <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm">
          Found <span className="text-gradient font-semibold">{matches.length}</span> invisible
          character{matches.length === 1 ? "" : "s"}.
        </div>
        {matches.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Code points</label>
            <div className="max-h-40 overflow-auto rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs">
              {matches.map((m, i) => (
                <div key={i}>
                  position {m.index}: U+
                  {m[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Cleaned text</label>
            <CopyButton value={cleaned} />
          </div>
          <Textarea rows={4} value={cleaned} readOnly className="bg-black/30 text-sm" />
        </div>
        <Button
          onClick={() => setText(cleaned)}
          variant="outline"
          className="border-white/10 bg-white/5"
        >
          Replace input with cleaned text
        </Button>
      </GlassCard>
    </div>
  );
}
