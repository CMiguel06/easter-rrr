import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Easter" },
      { name: "description", content: "Easter requires no accounts and saves no history. Files stay in your browser whenever possible." },
      { property: "og:title", content: "Privacy — Easter" },
      { property: "og:description", content: "No accounts. No saved history. Local-first by design." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 pb-10">
      <PageHeader eyebrow="Privacy" title="Quiet by design" />
      <GlassCard className="space-y-5 p-8 text-[15px] leading-relaxed text-muted-foreground">
        <ul className="space-y-3">
          <li>Easter does not require accounts.</li>
          <li>Easter does not save your history.</li>
          <li>Easter does not store the files you open or create.</li>
          <li>Easter is designed to process content locally in your browser whenever possible.</li>
        </ul>
        <p>
          A few reminders, since this is a creative tool: be careful when sharing files publicly,
          metadata can reveal sensitive information, hidden HTML and CSS easter eggs are visible to
          anyone viewing source, and password-encrypted content cannot be recovered without the password.
        </p>
        <p>
          Hashes are fingerprints, not encryption. Encoding is not encryption. Detections in the Reveal
          Lab are heuristic guesses. Only inspect files and websites you own or are allowed to analyse.
        </p>
      </GlassCard>
    </div>
  );
}
