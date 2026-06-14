import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Eye, FileLock2, Server, Sparkles } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Easter" },
      { name: "description", content: "Easter does not require accounts or save your data. Everything runs in your browser." },
      { property: "og:title", content: "Privacy — Easter" },
      { property: "og:description", content: "How Easter handles (and doesn't handle) your data." },
    ],
  }),
  component: PrivacyPage,
});

const POINTS = [
  { icon: Sparkles, title: "No accounts", text: "There's nothing to sign up for. Open a tool and start." },
  { icon: Eye, title: "No saved history", text: "Your inputs live only while the page is open." },
  { icon: FileLock2, title: "Files stay local", text: "Wherever possible, files are processed entirely in your browser." },
  { icon: Server, title: "No surveillance", text: "Easter is built for curiosity. There's no tracking dashboard behind it." },
];

function PrivacyPage() {
  return (
    <div className="px-4 pt-16 pb-10">
      <div className="mx-auto max-w-3xl">
        <PageHeader
          eyebrow="Privacy"
          title="Quiet by design"
          description="A short, honest summary of how Easter treats your data."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {POINTS.map((p) => (
            <GlassCard key={p.title} className="p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 ring-1 ring-white/10">
                <p.icon className="h-4 w-4" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="mt-6 space-y-3 p-6 text-sm text-muted-foreground">
          <p>
            A few honest notes: when you share a file publicly — like an image with a hidden message —
            anyone who has the file can try to read it. Files can carry metadata that reveals the
            device that made them, when, and sometimes where. Use the metadata tool to check.
          </p>
          <p>
            Some browser features (like clipboard or file access) require your permission. Easter only
            uses them when you ask for them, and only in your browser.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
