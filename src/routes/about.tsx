import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Easter" },
      { name: "description", content: "Easter is a private creative lab for hidden messages, secret clues, encoded text and digital puzzles." },
      { property: "og:title", content: "About — Easter" },
      { property: "og:description", content: "A private creative lab for hidden messages and digital puzzles." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-10">
      <PageHeader eyebrow="About" title="About Easter" />
      <GlassCard className="space-y-5 p-8 text-[15px] leading-relaxed text-muted-foreground">
        <p>
          Easter is a private creative lab for hidden messages, secret clues, encoded text and digital puzzles.
          It is designed for playful discovery, learning and elegant digital curiosity.
        </p>
        <p>
          Every tool runs in your browser. There are no accounts, no saved history, and no cloud storage.
          When you upload a file, Easter processes it locally and discards it as soon as you leave the page.
        </p>
        <p>
          Easter is a quiet space. Use it to hide a message in a photo, leave a small clue on a website you
          own, build a treasure hunt for a friend, or simply inspect a file to learn what's inside.
        </p>
        <p className="text-foreground">Hide meaning. Reward curiosity.</p>
      </GlassCard>
    </div>
  );
}
