import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { FileDropzone } from "@/components/ui-custom/FileDropzone";
import { CopyButton } from "@/components/ui-custom/CopyButton";
import { identifySignature, bytesToHex } from "@/lib/detection";

export const Route = createFileRoute("/tools/file-signature")({
  head: () => ({ meta: [
    { title: "File signature — Easter" },
    { name: "description", content: "Read the first bytes of a local file to identify its type." },
  ]}),
  component: Page,
});

function Page() {
  const [name, setName] = useState("");
  const [size, setSize] = useState(0);
  const [type, setType] = useState("");
  const [head, setHead] = useState<Uint8Array | null>(null);
  const [sig, setSig] = useState<{ mime: string; ext: string } | null>(null);

  const handle = async (f: File) => {
    setName(f.name); setSize(f.size); setType(f.type);
    const buf = new Uint8Array(await f.slice(0, 32).arrayBuffer());
    setHead(buf);
    setSig(identifySignature(buf));
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="Signature" title="File signature" description="The first few bytes of a file often reveal its true type. Processed locally." />
      <GlassCard className="space-y-5 p-6">
        <FileDropzone accept="*/*" onFile={handle} fileName={name} hint="Any local file" />
        {head && (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Info label="File name" value={name} />
              <Info label="Size" value={`${size.toLocaleString()} bytes`} />
              <Info label="Browser MIME" value={type || "—"} />
              <Info label="Detected type" value={sig ? `${sig.ext} (${sig.mime})` : "Unknown"} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between"><label className="text-sm font-medium">First bytes (hex)</label><CopyButton value={bytesToHex(head)} /></div>
              <div className="break-all rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs">{bytesToHex(head)}</div>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 truncate text-sm">{value}</div>
    </div>
  );
}
