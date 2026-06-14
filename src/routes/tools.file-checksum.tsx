import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { FileDropzone } from "@/components/ui-custom/FileDropzone";
import { CopyButton } from "@/components/ui-custom/CopyButton";
import { Input } from "@/components/ui/input";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/tools/file-checksum")({
  head: () => ({
    meta: [
      { title: "File checksum — Easter" },
      {
        name: "description",
        content: "Generate a SHA fingerprint of a local file to verify it hasn't changed.",
      },
    ],
  }),
  component: Page,
});

async function hashFile(file: File, algo: "SHA-256" | "SHA-512") {
  const buf = await file.arrayBuffer();
  const digest = await crypto.subtle.digest(algo, buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function Page() {
  const [name, setName] = useState("");
  const [sha256, setSha256] = useState("");
  const [sha512, setSha512] = useState("");
  const [expected, setExpected] = useState("");

  const handleFile = async (f: File) => {
    setName(f.name);
    setSha256("");
    setSha512("");
    try {
      const [a, b] = await Promise.all([hashFile(f, "SHA-256"), hashFile(f, "SHA-512")]);
      setSha256(a);
      setSha512(b);
    } catch {
      toast.error("Could not read the file.");
    }
  };

  const match =
    expected &&
    (expected.trim().toLowerCase() === sha256 || expected.trim().toLowerCase() === sha512);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Checksum"
        title="File checksum"
        description="A checksum helps verify that a file has not changed. Files never leave your browser."
      />
      <GlassCard className="space-y-6 p-6">
        <FileDropzone
          accept="*/*"
          onFile={handleFile}
          fileName={name}
          hint="Any file. Processed locally."
        />
        {sha256 && (
          <>
            <Row label="SHA-256" value={sha256} />
            <Row label="SHA-512" value={sha512} />
            <div className="space-y-2">
              <label className="text-sm font-medium">Compare against a known checksum</label>
              <Input
                value={expected}
                onChange={(e) => setExpected(e.target.value)}
                placeholder="Paste an expected hash"
                className="bg-white/5 font-mono text-xs"
              />
              {expected && (
                <div
                  className={`mt-2 flex items-center gap-2 rounded-lg border p-3 text-sm ${match ? "border-emerald-400/30 bg-emerald-500/10" : "border-rose-400/30 bg-rose-500/10"}`}
                >
                  {match ? (
                    <Check className="h-4 w-4 text-emerald-300" />
                  ) : (
                    <X className="h-4 w-4 text-rose-300" />
                  )}
                  {match ? "Match — the file matches that hash." : "No match."}
                </div>
              )}
            </div>
          </>
        )}
      </GlassCard>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <CopyButton value={value} />
      </div>
      <div className="break-all rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs">
        {value}
      </div>
    </div>
  );
}
