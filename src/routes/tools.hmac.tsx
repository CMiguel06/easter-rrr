import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyButton } from "@/components/ui-custom/CopyButton";
import { Check, X } from "lucide-react";
import { hmac } from "@/lib/encryption";

export const Route = createFileRoute("/tools/hmac")({
  head: () => ({ meta: [
    { title: "HMAC generator — Easter" },
    { name: "description", content: "Generate or verify an HMAC — a keyed hash that proves a message matches a secret key." },
  ]}),
  component: Page,
});

type A = "SHA-256" | "SHA-512";

function Page() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="HMAC" title="Keyed verification" description="An HMAC proves that a message matches a secret key — without revealing the key." />
      <Tabs defaultValue="generate">
        <TabsList className="glass-panel mb-6 grid w-full grid-cols-2 rounded-xl p-1">
          <TabsTrigger value="generate" className="rounded-lg">Generate</TabsTrigger>
          <TabsTrigger value="verify" className="rounded-lg">Verify</TabsTrigger>
        </TabsList>
        <TabsContent value="generate"><Gen /></TabsContent>
        <TabsContent value="verify"><Ver /></TabsContent>
      </Tabs>
    </div>
  );
}

function Gen() {
  const [msg, setMsg] = useState("");
  const [key, setKey] = useState("");
  const [algo, setAlgo] = useState<A>("SHA-256");
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!msg || !key) return setOut("");
    let cancel = false;
    hmac(msg, key, algo).then((h) => { if (!cancel) setOut(h); });
    return () => { cancel = true; };
  }, [msg, key, algo]);
  return (
    <GlassCard className="space-y-5 p-6">
      <Field label="Message"><Textarea rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} className="bg-white/5" /></Field>
      <Field label="Secret key"><Input value={key} onChange={(e) => setKey(e.target.value)} className="bg-white/5" /></Field>
      <Field label="Algorithm">
        <Select value={algo} onValueChange={(v) => setAlgo(v as A)}>
          <SelectTrigger className="bg-white/5"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="SHA-256">SHA-256</SelectItem><SelectItem value="SHA-512">SHA-512</SelectItem></SelectContent>
        </Select>
      </Field>
      <div className="space-y-2">
        <div className="flex items-center justify-between"><label className="text-sm font-medium">HMAC</label><CopyButton value={out} /></div>
        <div className="break-all rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs">{out || <span className="text-muted-foreground">Provide message and key…</span>}</div>
      </div>
    </GlassCard>
  );
}

function Ver() {
  const [msg, setMsg] = useState("");
  const [key, setKey] = useState("");
  const [expected, setExpected] = useState("");
  const [algo, setAlgo] = useState<A>("SHA-256");
  const [actual, setActual] = useState("");
  useEffect(() => {
    if (!msg || !key) return setActual("");
    let cancel = false;
    hmac(msg, key, algo).then((h) => { if (!cancel) setActual(h); });
    return () => { cancel = true; };
  }, [msg, key, algo]);
  const match = actual && expected && actual === expected.trim().toLowerCase();
  return (
    <GlassCard className="space-y-5 p-6">
      <Field label="Message"><Textarea rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} className="bg-white/5" /></Field>
      <Field label="Secret key"><Input value={key} onChange={(e) => setKey(e.target.value)} className="bg-white/5" /></Field>
      <Field label="Expected HMAC"><Input value={expected} onChange={(e) => setExpected(e.target.value)} className="bg-white/5 font-mono text-xs" /></Field>
      <Field label="Algorithm">
        <Select value={algo} onValueChange={(v) => setAlgo(v as A)}>
          <SelectTrigger className="bg-white/5"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="SHA-256">SHA-256</SelectItem><SelectItem value="SHA-512">SHA-512</SelectItem></SelectContent>
        </Select>
      </Field>
      {msg && key && expected && (
        <div className={`flex items-center gap-3 rounded-lg border p-4 ${match ? "border-emerald-400/30 bg-emerald-500/10" : "border-rose-400/30 bg-rose-500/10"}`}>
          {match ? <Check className="h-5 w-5 text-emerald-300" /> : <X className="h-5 w-5 text-rose-300" />}
          <div className="text-sm font-medium">{match ? "Match" : "No match"}</div>
        </div>
      )}
    </GlassCard>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><label className="text-sm font-medium">{label}</label>{children}</div>;
}
