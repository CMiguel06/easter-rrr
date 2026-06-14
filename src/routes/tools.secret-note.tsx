import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Download, Upload } from "lucide-react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { encryptText, decryptText } from "@/lib/encryption";

export const Route = createFileRoute("/tools/secret-note")({
  head: () => ({
    meta: [
      { title: "Secret note file — Easter" },
      { name: "description", content: "Save and re-open a small encrypted note as a local file." },
    ],
  }),
  component: Page,
});

function Page() {
  const [note, setNote] = useState("");
  const [pw, setPw] = useState("");
  const [encrypt, setEncrypt] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const save = async () => {
    if (!note) return toast.error("Write a note first.");
    let payload: { v: 1; encrypted: boolean; body: string };
    if (encrypt) {
      if (!pw) return toast.error("Set a password.");
      payload = { v: 1, encrypted: true, body: await encryptText(note, pw) };
    } else {
      payload = { v: 1, encrypted: false, body: note };
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "easter-note.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Saved locally.");
  };

  const open = async (f: File) => {
    try {
      const obj = JSON.parse(await f.text());
      if (obj.encrypted) {
        if (!pw) return toast.error("Enter the password to open.");
        setNote(await decryptText(obj.body, pw));
      } else setNote(obj.body);
      toast.success("Note loaded.");
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Secret note"
        title="A small encrypted note file"
        description="Write a note, optionally encrypt it with a password, then save it as a local file. Re-open later with the same password."
      />
      <GlassCard className="space-y-5 p-6">
        <Textarea
          rows={8}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your note…"
          className="bg-white/5"
        />
        <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
          <span className="text-sm">Encrypt with password</span>
          <Switch checked={encrypt} onCheckedChange={setEncrypt} />
        </div>
        {encrypt && (
          <Input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            className="bg-white/5"
          />
        )}
        <div className="flex flex-wrap gap-2">
          <Button onClick={save} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Download className="mr-2 h-4 w-4" /> Save note
          </Button>
          <Button
            onClick={() => inputRef.current?.click()}
            variant="outline"
            className="border-white/10 bg-white/5"
          >
            <Upload className="mr-2 h-4 w-4" /> Open note
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) open(f);
              e.target.value = "";
            }}
          />
        </div>
      </GlassCard>
    </div>
  );
}
