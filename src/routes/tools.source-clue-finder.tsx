import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RevealFindingCard, type RevealFinding } from "@/components/ui-custom/RevealFindingCard";

export const Route = createFileRoute("/tools/source-clue-finder")({
  head: () => ({
    meta: [
      { title: "Source clue finder — Easter" },
      {
        name: "description",
        content:
          "Spot playful hidden clues in pasted HTML — comments, hidden text, data attributes and more.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const [html, setHtml] = useState("");
  const [findings, setFindings] = useState<RevealFinding[]>([]);
  const run = () => {
    const out: RevealFinding[] = [];
    const comments = [...html.matchAll(/<!--([\s\S]*?)-->/g)]
      .map((m) => m[1].trim())
      .filter(Boolean);
    if (comments.length)
      out.push({
        title: `${comments.length} HTML comment${comments.length === 1 ? "" : "s"}`,
        message: "Comments are visible to anyone viewing source.",
        value: comments.slice(0, 5).join("\n---\n"),
      });
    if (/display\s*:\s*none/i.test(html))
      out.push({
        title: "display:none used",
        message: "Elements hidden with display:none aren't rendered but still live in the DOM.",
      });
    if (/visibility\s*:\s*hidden/i.test(html))
      out.push({
        title: "visibility:hidden used",
        message: "Hidden visually but still occupies space — and is in the DOM.",
      });
    if (/font-size\s*:\s*[0-6]px/i.test(html))
      out.push({
        title: "Very small text",
        message: "Tiny font sizes can hide messages in plain sight.",
      });
    const data = [...html.matchAll(/data-[a-z-]+\s*=\s*"([^"]+)"/gi)].slice(0, 8).map((m) => m[0]);
    if (data.length)
      out.push({
        title: `${data.length} suspicious data attribute${data.length === 1 ? "" : "s"}`,
        message: "data-* attributes sometimes carry hidden clues.",
        value: data.join("\n"),
      });
    const logs = [...html.matchAll(/console\.log\(([^)]+)\)/g)].slice(0, 5).map((m) => m[0]);
    if (logs.length)
      out.push({
        title: `${logs.length} console.log message${logs.length === 1 ? "" : "s"}`,
        message: "Open the browser console to see these.",
        value: logs.join("\n"),
        to: "/tools/console-message",
      });
    if (out.length === 0)
      out.push({
        title: "Nothing obvious",
        message: "No common easter-egg patterns spotted in this HTML.",
      });
    setFindings(out);
  };
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Source"
        title="HTML source clue finder"
        description="Use this on websites you own or are allowed to inspect."
      />
      <GlassCard className="space-y-4 p-6">
        <Textarea
          rows={10}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="Paste page source…"
          className="bg-white/5 font-mono text-xs"
        />
        <Button
          onClick={run}
          disabled={!html}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Scan source
        </Button>
      </GlassCard>
      {findings.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {findings.map((f, i) => (
            <RevealFindingCard key={i} finding={f} />
          ))}
        </div>
      )}
    </div>
  );
}
