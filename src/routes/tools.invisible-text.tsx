import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui-custom/CopyButton";
import { cleanInvisible, detectInvisible, hideInvisible, revealInvisible } from "@/lib/invisible";

export const Route = createFileRoute("/tools/invisible-text")({
  head: () => ({
    meta: [
      { title: "Invisible text — Easter" },
      { name: "description", content: "Hide messages between letters using invisible Unicode characters, or strip them away." },
      { property: "og:title", content: "Invisible text — Easter" },
      { property: "og:description", content: "Slip a secret message into ordinary-looking text with zero-width characters." },
    ],
  }),
  component: InvisibleText,
});

function InvisibleText() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Invisible text"
        title="Hide a message between letters"
        description="Zero-width characters let you slip a secret into ordinary text. They may not survive every platform — test where you'll share it."
      />
      <Tabs defaultValue="hide">
        <TabsList className="glass-panel mb-6 grid w-full grid-cols-4 rounded-xl p-1">
          <TabsTrigger value="hide" className="rounded-lg">Hide</TabsTrigger>
          <TabsTrigger value="reveal" className="rounded-lg">Reveal</TabsTrigger>
          <TabsTrigger value="detect" className="rounded-lg">Detect</TabsTrigger>
          <TabsTrigger value="clean" className="rounded-lg">Clean</TabsTrigger>
        </TabsList>
        <TabsContent value="hide"><Hide /></TabsContent>
        <TabsContent value="reveal"><Reveal /></TabsContent>
        <TabsContent value="detect"><Detect /></TabsContent>
        <TabsContent value="clean"><Clean /></TabsContent>
      </Tabs>
    </div>
  );
}

function Hide() {
  const [carrier, setCarrier] = useState("");
  const [secret, setSecret] = useState("");
  const [out, setOut] = useState("");
  return (
    <GlassCard className="space-y-5 p-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Carrier text (visible)</label>
        <Textarea rows={3} value={carrier} onChange={(e) => setCarrier(e.target.value)} placeholder="This sentence looks completely normal." className="bg-white/5" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Secret message</label>
        <Input value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="curiosity rewarded" className="bg-white/5" />
      </div>
      <Button onClick={() => {
        if (!secret) return toast.error("Add a secret first.");
        setOut(hideInvisible(carrier || " ", secret));
        toast.success("Invisible payload added.");
      }} className="w-full bg-gradient-to-br from-primary to-accent text-primary-foreground">Hide message</Button>
      {out && (
        <div className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Output</div>
            <CopyButton value={out} />
          </div>
          <div className="whitespace-pre-wrap break-words text-sm">{out}</div>
        </div>
      )}
    </GlassCard>
  );
}

function Reveal() {
  const [input, setInput] = useState("");
  const [out, setOut] = useState<string | null>(null);
  return (
    <GlassCard className="space-y-5 p-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Paste text containing the invisible message</label>
        <Textarea rows={4} value={input} onChange={(e) => setInput(e.target.value)} className="bg-white/5" />
      </div>
      <Button onClick={() => {
        try { setOut(revealInvisible(input)); toast.success("Message revealed."); }
        catch (e) { toast.error((e as Error).message); }
      }} className="w-full bg-gradient-to-br from-primary to-accent text-primary-foreground">Reveal message</Button>
      {out !== null && (
        <div className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Hidden message</div>
            <CopyButton value={out} />
          </div>
          <div className="break-words text-sm">{out}</div>
        </div>
      )}
    </GlassCard>
  );
}

function Detect() {
  const [input, setInput] = useState("");
  const count = detectInvisible(input);
  return (
    <GlassCard className="space-y-5 p-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Paste any text</label>
        <Textarea rows={4} value={input} onChange={(e) => setInput(e.target.value)} className="bg-white/5" />
      </div>
      <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm">
        Found <span className="text-gradient font-semibold">{count}</span> invisible character{count === 1 ? "" : "s"}.
      </div>
    </GlassCard>
  );
}

function Clean() {
  const [input, setInput] = useState("");
  const cleaned = cleanInvisible(input);
  return (
    <GlassCard className="space-y-5 p-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Paste text to clean</label>
        <Textarea rows={4} value={input} onChange={(e) => setInput(e.target.value)} className="bg-white/5" />
      </div>
      <div className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Cleaned text</div>
          <CopyButton value={cleaned} />
        </div>
        <div className="whitespace-pre-wrap break-words text-sm">{cleaned || <span className="text-muted-foreground">Result appears here…</span>}</div>
      </div>
    </GlassCard>
  );
}
