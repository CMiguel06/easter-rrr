import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { hashText, type HashAlgo } from "@/lib/hashing";
import { CopyButton } from "@/components/ui-custom/CopyButton";
import { AlertTriangle, Check, X } from "lucide-react";

export const Route = createFileRoute("/tools/hash")({
  head: () => ({
    meta: [
      { title: "Generate a phrase hash — Easter" },
      { name: "description", content: "Turn any phrase into a cryptographic fingerprint using SHA-256, SHA-384 or SHA-512." },
      { property: "og:title", content: "Generate a phrase hash — Easter" },
      { property: "og:description", content: "Hash phrases with SHA-256/384/512 in your browser. Compare against an expected hash." },
    ],
  }),
  component: HashPage,
});

const ALGOS: HashAlgo[] = ["SHA-256", "SHA-384", "SHA-512", "MD5"];

function HashPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Hash"
        title="Generate a phrase hash"
        description="A hash is a fingerprint of a message. It cannot normally be reversed — perfect for verification clues."
      />
      <Tabs defaultValue="generate">
        <TabsList className="glass-panel mb-6 grid w-full grid-cols-2 rounded-xl p-1">
          <TabsTrigger value="generate" className="rounded-lg">Generate</TabsTrigger>
          <TabsTrigger value="compare" className="rounded-lg">Compare</TabsTrigger>
        </TabsList>
        <TabsContent value="generate"><Generate /></TabsContent>
        <TabsContent value="compare"><Compare /></TabsContent>
      </Tabs>
    </div>
  );
}

function AlgoNote({ algo }: { algo: HashAlgo }) {
  if (algo !== "MD5") return null;
  return (
    <div className="flex items-start gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3 text-xs text-yellow-100/90">
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      MD5 is obsolete and unsafe for security. Included only for legacy comparison.
    </div>
  );
}

function Generate() {
  const [text, setText] = useState("");
  const [algo, setAlgo] = useState<HashAlgo>("SHA-256");
  const [hash, setHash] = useState("");

  useEffect(() => {
    let cancelled = false;
    if (!text) { setHash(""); return; }
    hashText(text, algo).then((h) => { if (!cancelled) setHash(h); });
    return () => { cancelled = true; };
  }, [text, algo]);

  return (
    <GlassCard className="space-y-5 p-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Phrase</label>
        <Textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="the door opens at midnight"
          className="bg-white/5"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Algorithm</label>
        <Select value={algo} onValueChange={(v) => setAlgo(v as HashAlgo)}>
          <SelectTrigger className="bg-white/5"><SelectValue /></SelectTrigger>
          <SelectContent>
            {ALGOS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <AlgoNote algo={algo} />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Hash</label>
          <CopyButton value={hash} />
        </div>
        <div className="break-all rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs text-foreground">
          {hash || <span className="text-muted-foreground">Type a phrase above…</span>}
        </div>
      </div>
    </GlassCard>
  );
}

function Compare() {
  const [text, setText] = useState("");
  const [expected, setExpected] = useState("");
  const [algo, setAlgo] = useState<HashAlgo>("SHA-256");
  const [actual, setActual] = useState("");

  useEffect(() => {
    let cancelled = false;
    if (!text) { setActual(""); return; }
    hashText(text, algo).then((h) => { if (!cancelled) setActual(h); });
    return () => { cancelled = true; };
  }, [text, algo]);

  const match = actual && expected && actual.toLowerCase() === expected.trim().toLowerCase();

  return (
    <GlassCard className="space-y-5 p-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Phrase to test</label>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="the door opens at midnight" className="bg-white/5" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Expected hash</label>
        <Input value={expected} onChange={(e) => setExpected(e.target.value)} placeholder="Paste the hash you're checking against" className="bg-white/5 font-mono text-xs" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Algorithm</label>
        <Select value={algo} onValueChange={(v) => setAlgo(v as HashAlgo)}>
          <SelectTrigger className="bg-white/5"><SelectValue /></SelectTrigger>
          <SelectContent>
            {ALGOS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      {text && expected && (
        <div className={`flex items-center gap-3 rounded-lg border p-4 ${match ? "border-emerald-400/30 bg-emerald-500/10" : "border-rose-400/30 bg-rose-500/10"}`}>
          {match ? <Check className="h-5 w-5 text-emerald-300" /> : <X className="h-5 w-5 text-rose-300" />}
          <div>
            <div className="text-sm font-medium">{match ? "Match" : "No match"}</div>
            <div className="text-xs text-muted-foreground">{match ? "The phrase produces the expected hash." : "Try another phrase."}</div>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
