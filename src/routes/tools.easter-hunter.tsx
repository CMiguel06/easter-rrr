import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "@/components/ui-custom/FileDropzone";
import { RevealFindingCard, type RevealFinding } from "@/components/ui-custom/RevealFindingCard";
import { detect, identifySignature, extractStrings } from "@/lib/detection";

export const Route = createFileRoute("/tools/easter-hunter")({
  head: () => ({ meta: [
    { title: "Easter Hunter — Easter" },
    { name: "description", content: "Inspect text, images and files for possible hidden clues." },
  ]}),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader eyebrow="Reveal Lab" title="Easter Hunter" description="Paste text or drop a file. Easter looks for hints, encodings and possible hidden clues. Detections are guesses." />
      <Tabs defaultValue="text">
        <TabsList className="glass-panel mb-6 grid w-full grid-cols-2 rounded-xl p-1">
          <TabsTrigger value="text" className="rounded-lg">Text</TabsTrigger>
          <TabsTrigger value="file" className="rounded-lg">File</TabsTrigger>
        </TabsList>
        <TabsContent value="text"><TextHunt /></TabsContent>
        <TabsContent value="file"><FileHunt /></TabsContent>
      </Tabs>
    </div>
  );
}

function TextHunt() {
  const [text, setText] = useState("");
  const [findings, setFindings] = useState<RevealFinding[]>([]);
  const run = () => {
    const det = detect(text);
    const f: RevealFinding[] = det.map((d) => ({
      title: d.label,
      message: d.note,
      value: text.slice(0, 200),
      to: routeFor(d.key),
      ctaLabel: ctaFor(d.key),
    }));
    if (f.length === 0) f.push({ title: "Nothing obvious", message: "No common patterns detected. Try the encoder lab or the puzzle reverse path." });
    setFindings(f);
  };
  return (
    <div className="space-y-5">
      <GlassCard className="space-y-4 p-6">
        <Textarea rows={6} value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste suspicious-looking text…" className="bg-white/5" />
        <Button onClick={run} disabled={!text} className="bg-primary text-primary-foreground hover:bg-primary/90">Inspect</Button>
      </GlassCard>
      {findings.length > 0 && <div className="grid gap-3 sm:grid-cols-2">{findings.map((f, i) => <RevealFindingCard key={i} finding={f} />)}</div>}
    </div>
  );
}

function FileHunt() {
  const [name, setName] = useState("");
  const [findings, setFindings] = useState<RevealFinding[]>([]);
  const handle = async (f: File) => {
    setName(f.name);
    const buf = new Uint8Array(await f.arrayBuffer());
    const sig = identifySignature(buf);
    const strs = extractStrings(buf.slice(0, 200_000), 6).slice(0, 8);
    const detected = detect(strs.join(" "));
    const out: RevealFinding[] = [];
    out.push({ title: "File signature", message: sig ? `Looks like ${sig.ext} (${sig.mime}).` : "No common signature recognised in the first bytes.", to: "/tools/file-signature", value: Array.from(buf.slice(0, 16)).map(b => b.toString(16).padStart(2, "0")).join(" ") });
    if (strs.length) out.push({ title: "Readable strings", message: "Found readable text fragments inside the file.", value: strs.join("\n"), to: "/tools/strings" });
    detected.forEach((d) => out.push({ title: d.label, message: d.note, to: routeFor(d.key), ctaLabel: ctaFor(d.key) }));
    setFindings(out);
  };
  return (
    <div className="space-y-5">
      <GlassCard className="p-6"><FileDropzone accept="*/*" onFile={handle} fileName={name} hint="Any local file. Processed in your browser." /></GlassCard>
      {findings.length > 0 && <div className="grid gap-3 sm:grid-cols-2">{findings.map((f, i) => <RevealFindingCard key={i} finding={f} />)}</div>}
    </div>
  );
}

function routeFor(k: string) {
  switch (k) {
    case "base64": case "hex": case "binary": case "rot13": case "url": case "unicode": case "morse": case "ascii": return "/tools/encoder";
    case "hash": return "/tools/hash";
    case "invisible": return "/tools/invisible-detector";
    case "html-comment": return "/tools/source-clue-finder";
  }
  return undefined;
}
function ctaFor(k: string) {
  if (k === "hash") return "Open hash tool";
  if (k === "invisible") return "Open detector";
  if (k === "html-comment") return "Open clue finder";
  return "Decode now";
}
