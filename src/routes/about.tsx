import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Easter" },
      { name: "description", content: "Easter is a small creative lab for hidden messages, secret clues, and digital puzzles." },
      { property: "og:title", content: "About — Easter" },
      { property: "og:description", content: "A small creative lab for hidden messages, secret clues, and digital puzzles." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="px-4 pt-16 pb-10">
      <div className="mx-auto max-w-3xl">
        <PageHeader
          eyebrow="About"
          title="About Easter"
          description="A small creative lab for hidden messages."
        />
        <GlassCard className="space-y-5 p-8 text-base leading-relaxed text-muted-foreground">
          <p>
            Easter is a small creative lab for hidden messages, secret clues, encoded text and
            digital puzzles. It's designed for curiosity, learning and playful discovery —
            something you can open on a quiet afternoon and tinker with.
          </p>
          <p>
            Everything is built to run in your browser. There are no accounts, no databases, no
            cloud storage and no history of what you've made. The result is intentionally simple:
            a handful of tools that do one thing well, and a few templates to help you stitch
            them together.
          </p>
          <p>
            If you build something fun, share it with someone curious. That's the whole idea.
          </p>
          <div className="pt-2">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-accent px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Try a tool
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
