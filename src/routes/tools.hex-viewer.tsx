import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { FileDropzone } from "@/components/ui-custom/FileDropzone";

export const Route = createFileRoute("/tools/hex-viewer")({
  head: () => ({
    meta: [
      { title: "Hex viewer — Easter" },
      { name: "description", content: "Peek at the raw bytes of a local file." },
    ],
  }),
  component: Page,
});

const MAX = 4096;

function Page() {
  const [name, setName] = useState("");
  const [bytes, setBytes] = useState<Uint8Array | null>(null);
  const handle = async (f: File) => {
    setName(f.name);
    const buf = new Uint8Array(await f.slice(0, MAX).arrayBuffer());
    setBytes(buf);
  };
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Hex"
        title="Hex viewer"
        description={`Showing the first ${MAX.toLocaleString()} bytes. Hex view shows the raw bytes of a file.`}
      />
      <GlassCard className="space-y-5 p-6">
        <FileDropzone accept="*/*" onFile={handle} fileName={name} hint="Any local file" />
        {bytes && <HexDump bytes={bytes} />}
      </GlassCard>
    </div>
  );
}

function HexDump({ bytes }: { bytes: Uint8Array }) {
  const rows: { off: string; hex: string; ascii: string }[] = [];
  for (let i = 0; i < bytes.length; i += 16) {
    const slice = bytes.slice(i, i + 16);
    const hex = Array.from(slice)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(" ");
    const ascii = Array.from(slice)
      .map((b) => (b >= 0x20 && b <= 0x7e ? String.fromCharCode(b) : "."))
      .join("");
    rows.push({ off: i.toString(16).padStart(8, "0"), hex, ascii });
  }
  return (
    <div className="max-h-[60vh] overflow-auto rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-[11px] leading-relaxed">
      {rows.map((r) => (
        <div key={r.off} className="grid grid-cols-[88px_1fr_120px] gap-3 whitespace-pre">
          <span className="text-muted-foreground">{r.off}</span>
          <span className="text-foreground/80">{r.hex}</span>
          <span className="text-primary/70">{r.ascii}</span>
        </div>
      ))}
    </div>
  );
}
