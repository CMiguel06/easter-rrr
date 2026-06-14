import { createFileRoute } from "@tanstack/react-router";
import { ToolCard } from "@/components/ui-custom/ToolCard";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { TOOLS } from "@/lib/tools-data";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "Tools — Easter" },
      { name: "description", content: "Browse Easter's creative tools for hiding messages, encoding text, and building puzzles." },
      { property: "og:title", content: "Tools — Easter" },
      { property: "og:description", content: "Browse Easter's creative tools for hiding messages, encoding text, and building puzzles." },
    ],
  }),
  component: ToolsIndex,
});

function ToolsIndex() {
  return (
    <div className="px-4 pt-16 pb-10">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="Tools"
          title="A small kit of curious things"
          description="Pick a tool to begin. Everything happens in your browser."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <ToolCard key={t.to} {...t} />
          ))}
        </div>
      </div>
    </div>
  );
}
