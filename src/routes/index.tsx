import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Lock,
  Eye,
  Sparkles,
  ImageIcon,
  Hash as HashIcon,
  QrCode,
  EyeOff,
  ShieldCheck,
  Wand2,
  Compass,
  FileSearch,
} from "lucide-react";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { SectionTitle } from "@/components/ui-custom/SectionTitle";
import { CategoryCard } from "@/components/ui-custom/CategoryCard";
import { DifficultyBadge } from "@/components/ui-custom/DifficultyBadge";
import { CATEGORIES } from "@/lib/tools-data";
import { findPuzzleTemplate } from "@/lib/puzzle-templates";
import { hashText } from "@/lib/hashing";
import { encoders } from "@/lib/encoders";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Easter — Hide meaning. Reward curiosity." },
      {
        name: "description",
        content:
          "A private creative lab for hidden messages, secret codes, image easter eggs, QR clues and local puzzles. Everything runs in your browser.",
      },
      { property: "og:title", content: "Easter — Hide meaning. Reward curiosity." },
      {
        property: "og:description",
        content:
          "Create hidden messages, codes, QR clues and small puzzles — locally, in your browser.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="px-4">
      <Hero />
      <ThirtySecond />
      <MoreThanHidden />
      <Toolbox />
      <Workflows />
      <PuzzleStrip />
      <RevealLabPreview />
      <PrivacyCard />
      <HowItWorks />
    </div>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-5xl pt-20 pb-24 sm:pt-28">
      <div className="text-center">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <Sparkles className="h-3 w-3" /> A private creative lab
        </div>
        <h1 className="animate-fade-up mt-7 text-[44px] font-semibold leading-[1.05] tracking-tight sm:text-[76px]">
          Hide meaning.
          <br />
          <span className="text-gradient">Reward curiosity.</span>
        </h1>
        <p className="animate-fade-up mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
          Create hidden messages, secret codes, image easter eggs, QR clues and small puzzles —
          directly in your browser.
        </p>
        <div className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/tools"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-10px_var(--color-primary)] transition-all hover:scale-[1.02]"
          >
            Start creating{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-foreground hover:bg-white/10"
          >
            Explore tools
          </Link>
        </div>
      </div>
      <div className="mt-16">
        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <GlassCard strong className="animate-fade-up mx-auto max-w-4xl p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <MiniTile
          icon={<ImageIcon className="h-4 w-4" />}
          title="PNG carrier"
          body="image.png"
          caption="Hidden message woven in"
        />
        <MiniTile
          icon={<HashIcon className="h-4 w-4" />}
          title="Phrase fingerprint"
          body="9f4c…b2e7"
          caption="SHA-256 of the answer"
          mono
        />
        <MiniTile
          icon={<QrCode className="h-4 w-4" />}
          title="QR clue"
          body="Find the next clue under the old map"
          caption="Scan to continue"
        />
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <div className="text-sm">Final reveal</div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs text-primary ring-1 ring-primary/25">
          curiosity rewarded
        </div>
      </div>
    </GlassCard>
  );
}

function MiniTile({
  icon,
  title,
  body,
  caption,
  mono,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  caption: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {title}
      </div>
      <div className={`mt-3 truncate text-sm ${mono ? "font-mono" : ""}`}>{body}</div>
      <div className="mt-2 text-[11px] text-muted-foreground">{caption}</div>
    </div>
  );
}

function ThirtySecond() {
  const [text, setText] = useState("curiosity rewarded");
  const [mode, setMode] = useState<"hash" | "base64" | "rot13" | "reverse">("hash");
  const [out, setOut] = useState("");
  useEffect(() => {
    (async () => {
      if (!text) return setOut("");
      if (mode === "hash") setOut(await hashText(text, "SHA-256"));
      else if (mode === "base64") setOut(encoders.base64.encode(text));
      else if (mode === "rot13") setOut(encoders.rot13.encode(text));
      else setOut(text.split("").reverse().join(""));
    })();
  }, [text, mode]);
  return (
    <section className="mx-auto max-w-5xl pb-24">
      <SectionTitle
        eyebrow="30 seconds"
        title="Try an easter egg"
        description="Type a message, pick a transformation. The result stays on this page."
        align="center"
      />
      <GlassCard className="mx-auto mt-10 max-w-2xl p-6 sm:p-7">
        <label className="text-xs uppercase tracking-wider text-muted-foreground">
          Write a secret message
        </label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="curiosity rewarded"
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[15px] outline-none focus:border-primary/40"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            { k: "hash", label: "Hash" },
            { k: "base64", label: "Base64" },
            { k: "rot13", label: "ROT13" },
            { k: "reverse", label: "Reverse" },
          ].map((m) => (
            <button
              key={m.k}
              onClick={() => setMode(m.k as typeof mode)}
              className={`rounded-full px-3 py-1.5 text-xs ${mode === m.k ? "bg-primary text-primary-foreground" : "border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"}`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="mt-5 break-all rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-xs text-foreground/90">
          {out || <span className="text-muted-foreground">Result appears here…</span>}
        </div>
        <div className="mt-4 flex justify-end">
          <Link to="/tools" className="text-xs text-primary hover:text-primary/80">
            Open full toolbox →
          </Link>
        </div>
      </GlassCard>
    </section>
  );
}

function MoreThanHidden() {
  const items = [
    { icon: EyeOff, title: "Hide", body: "Place clues inside images, text or files." },
    { icon: Wand2, title: "Transform", body: "Convert messages into codes, hashes or symbols." },
    { icon: ShieldCheck, title: "Verify", body: "Check answers with hashes and local gates." },
    { icon: FileSearch, title: "Reveal", body: "Inspect text, images and files for hidden clues." },
    { icon: Sparkles, title: "Build", body: "Create small puzzles and treasure hunts." },
  ];
  return (
    <section className="mx-auto max-w-6xl pb-24">
      <SectionTitle
        eyebrow="What it does"
        title="More than hidden messages."
        description="Five quiet abilities, all running on your device."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((i) => (
          <GlassCard key={i.title} className="p-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <i.icon className="h-4 w-4" />
            </div>
            <div className="mt-4 text-[15px] font-semibold tracking-tight">{i.title}</div>
            <div className="mt-1 text-[13px] text-muted-foreground">{i.body}</div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

function Toolbox() {
  return (
    <section className="mx-auto max-w-6xl pb-24">
      <SectionTitle
        eyebrow="Toolbox"
        title="A category for every kind of clue."
        description="Tools are grouped so you find the right one in seconds."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.slice(0, 6).map((c) => (
          <CategoryCard key={c.name} {...c} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm hover:bg-white/10"
        >
          Browse the full toolbox <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

function Workflows() {
  const wf = [
    {
      to: "/tools/image-secret",
      title: "Create a PNG with a hidden message",
      steps: [
        "Open the image tool",
        "Add your PNG and write your secret",
        "Download the new image",
      ],
    },
    {
      to: "/tools/qr-trail",
      title: "Build a QR treasure hunt",
      steps: ["Open the QR trail builder", "Add clue steps", "Export the QR set"],
    },
    {
      to: "/tools/final-door",
      title: "Create a hash-based final answer",
      steps: ["Open the verifier", "Hash the answer", "Share the gate"],
    },
    {
      to: "/tools/html-comment",
      title: "Hide a clue in website source code",
      steps: ["Write the clue", "Generate the comment", "Paste it into your page"],
    },
    {
      to: "/tools/easter-hunter",
      title: "Find an easter egg",
      steps: ["Paste text or upload a file", "Review the findings", "Decode the right one"],
    },
    {
      to: "/tools/challenge",
      title: "Create a full local puzzle pack",
      steps: ["Compose steps", "Preview as a player", "Export the challenge"],
    },
  ];
  return (
    <section className="mx-auto max-w-6xl pb-24">
      <SectionTitle eyebrow="Workflows" title="Start with a complete idea." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {wf.map((w) => (
          <GlassCard key={w.to} className="flex flex-col p-5">
            <h3 className="text-[15px] font-semibold tracking-tight">{w.title}</h3>
            <ol className="mt-3 space-y-1.5 text-[13px] text-muted-foreground">
              {w.steps.map((s, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-foreground/40">{i + 1}.</span>
                  {s}
                </li>
              ))}
            </ol>
            <Link
              to={w.to}
              className="mt-5 inline-flex items-center gap-1 self-start rounded-full bg-white/5 px-4 py-1.5 text-xs hover:bg-white/10"
            >
              Start workflow <ArrowRight className="h-3 w-3" />
            </Link>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

function PuzzleStrip() {
  const puzzles = [
    {
      slug: "hash-hunt",
      title: "Hash Hunt",
      time: "10 min",
      diff: "Easy" as const,
      tool: "Phrase hash",
    },
    {
      slug: "image-whisper",
      title: "Image Whisper",
      time: "15 min",
      diff: "Medium" as const,
      tool: "Image secret",
    },
    {
      slug: "qr-trail",
      title: "QR Trail",
      time: "20 min",
      diff: "Medium" as const,
      tool: "QR trail",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl pb-24">
      <SectionTitle eyebrow="Puzzle templates" title="Ready-made mysteries." />
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {puzzles.map((p) => (
          <GlassCard key={p.title} className="p-6">
            <div className="flex items-center justify-between">
              <DifficultyBadge difficulty={p.diff} />
              <span className="text-[11px] text-muted-foreground">{p.time}</span>
            </div>
            <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-1 text-[12px] text-muted-foreground">Required: {p.tool}</p>
            <Link
              to="/tools/challenge"
              search={{ template: findPuzzleTemplate(p.slug)?.slug ?? p.slug }}
              className="mt-5 inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80"
            >
              Use template <ArrowRight className="h-3 w-3" />
            </Link>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

function RevealLabPreview() {
  return (
    <section className="mx-auto max-w-6xl pb-24">
      <GlassCard strong className="grid gap-8 p-8 sm:p-12 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <Compass className="h-3 w-3" /> Reveal Lab
          </div>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
            Reveal hidden clues.
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Inspect text, images and files locally to discover possible easter eggs — base codes,
            invisible characters, file fingerprints, QR codes and more.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/tools/easter-hunter"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:scale-[1.02]"
            >
              Open Reveal Lab <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/tools"
              search={{ category: "Reveal Lab" }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm hover:bg-white/10"
            >
              All inspection tools
            </Link>
          </div>
        </div>
        <div className="grid gap-3">
          {[
            { t: "Possible Base64", b: "VGhlIGRvb3Igb3BlbnMgYXQgbWlkbmlnaHQ=" },
            { t: "Invisible characters", b: "Found 17 zero-width characters in pasted text." },
            { t: "PNG file signature", b: "89 50 4E 47 0D 0A 1A 0A — image/png" },
          ].map((f) => (
            <div key={f.t} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Finding
              </div>
              <div className="mt-1 text-sm font-medium">{f.t}</div>
              <div className="mt-1 break-all font-mono text-[11px] text-muted-foreground">
                {f.b}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}

function PrivacyCard() {
  return (
    <section className="mx-auto max-w-6xl pb-24">
      <GlassCard strong className="p-8 sm:p-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <Lock className="h-3 w-3" /> Privacy
            </div>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
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
                  <Eye className="mt-0.5 h-3.5 w-3.5 text-primary" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Link
            to="/privacy"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm hover:bg-white/10"
          >
            Read more <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </GlassCard>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Choose a tool",
      b: "Pick from the toolbox — hide, transform, verify, reveal or build.",
    },
    {
      n: "02",
      t: "Create or inspect",
      b: "Compose a clue locally, or paste content to inspect for hidden meaning.",
    },
    {
      n: "03",
      t: "Share or challenge",
      b: "Export a file, copy a snippet, or hand someone a hunt to solve.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl pb-8">
      <SectionTitle eyebrow="How it works" title="Three quiet steps." />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <GlassCard key={s.n} className="p-6">
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Step {s.n}
            </div>
            <h3 className="mt-3 text-lg font-semibold tracking-tight">{s.t}</h3>
            <p className="mt-2 text-[13px] text-muted-foreground">{s.b}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
