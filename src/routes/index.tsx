import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Lock, Eye, Sparkles } from "lucide-react";
import { ToolCard } from "@/components/ui-custom/ToolCard";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { TOOLS } from "@/lib/tools-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Easter — Hide meaning. Reward curiosity." },
      {
        name: "description",
        content:
          "Create hidden messages, secret codes, image easter eggs, QR clues and small puzzles directly in your browser.",
      },
      { property: "og:title", content: "Easter — Hide meaning. Reward curiosity." },
      {
        property: "og:description",
        content: "Create hidden messages, secret codes, image easter eggs, QR clues and small puzzles directly in your browser.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="px-4">
      {/* Hero */}
      <section className="mx-auto max-w-5xl pt-16 pb-20 text-center sm:pt-24">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3" /> A small creative lab
        </div>
        <h1 className="animate-fade-up mt-6 text-5xl font-semibold tracking-tight sm:text-7xl">
          <span className="text-gradient">Hide meaning.</span>
          <br />
          Reward curiosity.
        </h1>
        <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Create hidden messages, secret codes, image easter eggs, QR clues and small
          puzzles — directly in your browser.
        </p>
        <div className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/tools"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-accent px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-10px_var(--color-primary)] transition-transform hover:scale-[1.02]"
          >
            Start creating
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-foreground backdrop-blur hover:bg-white/10"
          >
            Explore tools
          </Link>
        </div>
      </section>

      {/* Tools grid */}
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Tools</h2>
            <p className="mt-1 text-sm text-muted-foreground">Each one runs locally in your browser.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <ToolCard key={t.to} {...t} />
          ))}
        </div>
      </section>

      {/* Privacy */}
      <section className="mx-auto mt-24 max-w-6xl">
        <GlassCard strong className="p-8 sm:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" /> Privacy first
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Quiet by design.
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "No accounts.",
                  "No saved history.",
                  "Files stay in your browser whenever possible.",
                  "Built for curiosity, not surveillance.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Eye className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link
              to="/privacy"
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
            >
              Read more <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* How it works */}
      <section className="mx-auto mt-24 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">How it works</h2>
          <p className="mt-1 text-sm text-muted-foreground">Three steps from idea to mystery.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { n: "01", t: "Choose a tool", d: "Pick the kind of secret you want to make." },
            { n: "02", t: "Create your message", d: "Write, hide, encode or wrap your clue." },
            { n: "03", t: "Share the mystery", d: "Send the result, or challenge a friend." },
          ].map((s) => (
            <GlassCard key={s.n} className="p-6">
              <div className="text-gradient text-sm font-mono">{s.n}</div>
              <div className="mt-3 text-lg font-semibold">{s.t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.d}</div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
