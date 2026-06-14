import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Download, Eye, Image as ImageIcon, Lock } from "lucide-react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { FileDropzone } from "@/components/ui-custom/FileDropzone";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { hideMessageInImage, revealMessageFromImage } from "@/lib/steganography";
import { CopyButton } from "@/components/ui-custom/CopyButton";

export const Route = createFileRoute("/tools/image-secret")({
  head: () => ({
    meta: [
      { title: "Hide message in an image — Easter" },
      { name: "description", content: "Tuck a hidden note inside a PNG image. Looks identical to the eye." },
      { property: "og:title", content: "Hide message in an image — Easter" },
      { property: "og:description", content: "Hide and reveal messages inside PNG images, right in your browser." },
    ],
  }),
  component: ImageSecret,
});

function ImageSecret() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Image secret"
        title="Hide a message in an image"
        description="Choose a PNG, write your message, and download a new image that looks identical but carries your secret."
      />
      <Tabs defaultValue="hide" className="w-full">
        <TabsList className="glass-panel mb-6 grid w-full grid-cols-2 rounded-xl p-1">
          <TabsTrigger value="hide" className="rounded-lg">Hide</TabsTrigger>
          <TabsTrigger value="reveal" className="rounded-lg">Reveal</TabsTrigger>
        </TabsList>
        <TabsContent value="hide"><HideTab /></TabsContent>
        <TabsContent value="reveal"><RevealTab /></TabsContent>
      </Tabs>
      <div className="mt-6 text-xs text-muted-foreground">
        Tip: use PNG for best results. JPEG compression may destroy hidden data.
      </div>
    </div>
  );
}

function HideTab() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const onFile = (f: File) => {
    setFile(f);
    setResultUrl(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  };

  const onHide = async () => {
    if (!file) return toast.error("Choose an image first.");
    if (!message) return toast.error("Write a message first.");
    setBusy(true);
    try {
      const blob = await hideMessageInImage(file, message, password);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      setResultUrl(URL.createObjectURL(blob));
      toast.success("Message hidden. Download your image.");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <GlassCard className="space-y-5 p-6">
      <FileDropzone
        accept="image/png,image/jpeg"
        onFile={onFile}
        hint="PNG recommended. Stays in your browser."
        fileName={file?.name}
      />
      {preview && (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <img src={preview} alt="Preview" className="max-h-64 w-full object-contain bg-black/30" />
        </div>
      )}
      <div className="space-y-2">
        <label className="text-sm font-medium">Secret message</label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="curiosity rewarded"
          rows={3}
          className="bg-white/5"
        />
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-sm font-medium">
          <Lock className="h-3.5 w-3.5" /> Optional password
        </label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leave empty for none"
          type="password"
          className="bg-white/5"
        />
      </div>
      <Button onClick={onHide} disabled={busy} className="w-full bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <ImageIcon className="mr-2 h-4 w-4" />
        {busy ? "Hiding…" : "Hide message"}
      </Button>
      {resultUrl && (
        <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-medium">Your image is ready</div>
          <img src={resultUrl} alt="Result" className="max-h-48 w-full rounded-lg object-contain bg-black/30" />
          <a
            href={resultUrl}
            download="easter-secret.png"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-primary to-accent px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            <Download className="h-4 w-4" /> Download PNG
          </a>
        </div>
      )}
    </GlassCard>
  );
}

function RevealTab() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onReveal = async () => {
    if (!file) return toast.error("Choose an image first.");
    setBusy(true); setMessage(null);
    try {
      const text = await revealMessageFromImage(file, password);
      setMessage(text);
      toast.success("Message revealed.");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <GlassCard className="space-y-5 p-6">
      <FileDropzone accept="image/png" onFile={(f) => { setFile(f); setMessage(null); }} fileName={file?.name} hint="PNG only" />
      <div className="space-y-2">
        <label className="text-sm font-medium">Password (if any)</label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Leave empty for none"
          type="password"
          className="bg-white/5"
        />
      </div>
      <Button onClick={onReveal} disabled={busy} className="w-full bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <Eye className="mr-2 h-4 w-4" />
        {busy ? "Reading…" : "Reveal message"}
      </Button>
      {message !== null && (
        <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Hidden message</div>
            <CopyButton value={message} />
          </div>
          <pre className="whitespace-pre-wrap break-words font-sans text-sm text-foreground">{message}</pre>
        </div>
      )}
    </GlassCard>
  );
}
