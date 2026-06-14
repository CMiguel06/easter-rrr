import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui-custom/CopyButton";

export const Route = createFileRoute("/tools/acrostic")({
  head: () => ({ meta: [
    { title: "Acrostic maker — Easter" },
    { name: "description", content: "Hide a word in the first letters of each line, or extract one from existing text." },
  ]}),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="Acrostic" title="Hide a word in plain sight" description="Use the first letter of each line to reveal a secret word." />
      <Tabs defaultValue="make">
        <TabsList className="glass-panel mb-6 grid w-full grid-cols-2 rounded-xl p-1">
          <TabsTrigger value="make" className="rounded-lg">Make</TabsTrigger>
          <TabsTrigger value="extract" className="rounded-lg">Extract</TabsTrigger>
        </TabsList>
        <TabsContent value="make"><Make /></TabsContent>
        <TabsContent value="extract"><Extract /></TabsContent>
      </Tabs>
    </div>
  );
}

function Make() {
  const [word, setWord] = useState("EASTER");
  const lines = word.split("").map((c) => `${c.toUpperCase()}…`).join("\n");
  return (
    <GlassCard className="space-y-5 p-6">
      <div className="space-y-2"><label className="text-sm font-medium">Hidden word</label>
        <Input value={word} onChange={(e) => setWord(e.target.value)} placeholder="EASTER" className="bg-white/5" /></div>
      <div className="space-y-2">
        <div className="flex items-center justify-between"><label className="text-sm font-medium">Draft</label><CopyButton value={lines} /></div>
        <Textarea rows={Math.max(word.length, 4)} value={lines} readOnly className="bg-black/30 font-mono text-sm" />
        <p className="text-xs text-muted-foreground">Replace each <span className="font-mono">…</span> with a line that starts with the highlighted letter.</p>
      </div>
    </GlassCard>
  );
}

function Extract() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"line" | "sentence">("line");
  const result = mode === "line"
    ? text.split(/\r?\n/).map((l) => l.trim()[0] ?? "").join("")
    : text.split(/[.!?]\s+/).map((l) => l.trim()[0] ?? "").join("");
  return (
    <GlassCard className="space-y-5 p-6">
      <div className="space-y-2"><label className="text-sm font-medium">Paste text</label>
        <Textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} className="bg-white/5" /></div>
      <div className="flex gap-2">
        {(["line", "sentence"] as const).map((m) => (
          <Button key={m} variant={mode === m ? "default" : "outline"} onClick={() => setMode(m)} className={mode === m ? "bg-primary text-primary-foreground" : "border-white/10 bg-white/5"}>
            First letter of each {m}
          </Button>
        ))}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between"><label className="text-sm font-medium">Extracted</label><CopyButton value={result} /></div>
        <div className="break-all rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-sm">{result || <span className="text-muted-foreground">Paste text above…</span>}</div>
      </div>
    </GlassCard>
  );
}
