import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui-custom/CopyButton";
import { encryptText, decryptText } from "@/lib/encryption";

export const Route = createFileRoute("/tools/encrypt")({
  head: () => ({ meta: [
    { title: "Password encryption — Easter" },
    { name: "description", content: "Encrypt and decrypt a message locally with a password using AES-GCM." },
  ]}),
  component: Page,
});

function Page() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="Encryption" title="Password encryption" description="Encrypted with AES-GCM and a key derived from your password. Everything happens in your browser." />
      <div className="mb-5 flex items-start gap-2 rounded-lg border border-amber-400/20 bg-amber-400/5 p-3 text-xs text-amber-100/90">
        <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        If you lose the password, the message cannot be recovered.
      </div>
      <Tabs defaultValue="encrypt">
        <TabsList className="glass-panel mb-6 grid w-full grid-cols-2 rounded-xl p-1">
          <TabsTrigger value="encrypt" className="rounded-lg">Encrypt</TabsTrigger>
          <TabsTrigger value="decrypt" className="rounded-lg">Decrypt</TabsTrigger>
        </TabsList>
        <TabsContent value="encrypt"><Enc /></TabsContent>
        <TabsContent value="decrypt"><Dec /></TabsContent>
      </Tabs>
    </div>
  );
}

function Enc() {
  const [msg, setMsg] = useState(""); const [pw, setPw] = useState(""); const [out, setOut] = useState("");
  return (
    <GlassCard className="space-y-5 p-6">
      <Textarea rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="The door opens at midnight" className="bg-white/5" />
      <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" className="bg-white/5" />
      <Button onClick={async () => { try { setOut(await encryptText(msg, pw)); toast.success("Encrypted."); } catch { toast.error("Could not encrypt."); } }} className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={!msg || !pw}>
        Encrypt
      </Button>
      {out && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">Encrypted text</label><CopyButton value={out} /></div>
          <Textarea rows={4} value={out} readOnly className="bg-black/30 font-mono text-xs" />
        </div>
      )}
    </GlassCard>
  );
}

function Dec() {
  const [msg, setMsg] = useState(""); const [pw, setPw] = useState(""); const [out, setOut] = useState("");
  return (
    <GlassCard className="space-y-5 p-6">
      <Textarea rows={4} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Paste encrypted text here…" className="bg-white/5 font-mono text-xs" />
      <Input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" className="bg-white/5" />
      <Button onClick={async () => { try { setOut(await decryptText(msg, pw)); toast.success("Decrypted."); } catch (e) { toast.error((e as Error).message); } }} className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={!msg || !pw}>
        Decrypt
      </Button>
      {out && (
        <div className="space-y-2">
          <div className="flex items-center justify-between"><label className="text-sm font-medium">Decrypted message</label><CopyButton value={out} /></div>
          <div className="whitespace-pre-wrap break-words rounded-lg border border-white/10 bg-black/30 p-3 text-sm">{out}</div>
        </div>
      )}
    </GlassCard>
  );
}
