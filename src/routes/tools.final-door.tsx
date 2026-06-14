import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { CopyButton } from "@/components/ui-custom/CopyButton";
import { hashText } from "@/lib/hashing";
import { Check, X, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/tools/final-door")({
  head: () => ({
    meta: [
      { title: "Final answer verifier — Easter" },
      {
        name: "description",
        content: "Build a local gate that opens only with the correct answer. No server involved.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Final door"
        title="A gate for your final answer"
        description="Create a local verification step for your puzzle. The answer is checked entirely in the browser."
      />
      <Tabs defaultValue="create">
        <TabsList className="glass-panel mb-6 grid w-full grid-cols-2 rounded-xl p-1">
          <TabsTrigger value="create" className="rounded-lg">
            Create gate
          </TabsTrigger>
          <TabsTrigger value="play" className="rounded-lg">
            Play gate
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <Create />
        </TabsContent>
        <TabsContent value="play">
          <Play />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Create() {
  const [answer, setAnswer] = useState("");
  const [hash, setHash] = useState("");
  useEffect(() => {
    if (!answer) return setHash("");
    hashText(answer.trim().toLowerCase(), "SHA-256").then(setHash);
  }, [answer]);
  return (
    <GlassCard className="space-y-5 p-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Correct answer</label>
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="midnight"
          className="bg-white/5"
        />
        <p className="text-xs text-muted-foreground">
          The answer is lowercased and trimmed before hashing.
        </p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Verification hash</label>
          <CopyButton value={hash} />
        </div>
        <div className="break-all rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs">
          {hash || <span className="text-muted-foreground">Enter the answer above…</span>}
        </div>
        <p className="text-xs text-muted-foreground">Share this hash — not the answer.</p>
      </div>
    </GlassCard>
  );
}

function Play() {
  const [expected, setExpected] = useState("");
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<null | boolean>(null);
  const check = async () => {
    if (!expected || !guess) return;
    const h = await hashText(guess.trim().toLowerCase(), "SHA-256");
    setResult(h === expected.trim().toLowerCase());
  };
  return (
    <GlassCard className="space-y-5 p-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Verification hash</label>
        <Input
          value={expected}
          onChange={(e) => setExpected(e.target.value)}
          className="bg-white/5 font-mono text-xs"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Your answer</label>
        <Input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check()}
          className="bg-white/5"
        />
      </div>
      <button
        onClick={check}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        <ShieldCheck className="h-4 w-4" /> Try the gate
      </button>
      {result !== null && (
        <div
          className={`flex items-center gap-3 rounded-lg border p-4 ${result ? "border-emerald-400/30 bg-emerald-500/10" : "border-rose-400/30 bg-rose-500/10"}`}
        >
          {result ? (
            <Check className="h-5 w-5 text-emerald-300" />
          ) : (
            <X className="h-5 w-5 text-rose-300" />
          )}
          <div className="text-sm">{result ? "curiosity rewarded" : "Not quite — try again."}</div>
        </div>
      )}
    </GlassCard>
  );
}
