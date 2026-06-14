import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { FileDropzone } from "@/components/ui-custom/FileDropzone";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { extractStrings } from "@/lib/detection";

export const Route = createFileRoute("/tools/strings")({
  head: () => ({
    meta: [
      { title: "Strings extractor — Easter" },
      { name: "description", content: "Pull readable text fragments out of a local file." },
    ],
  }),
  component: Page,
});

function Page() {
  const [name, setName] = useState("");
  const [bytes, setBytes] = useState<Uint8Array | null>(null);
  const [min, setMin] = useState(5);
  const [query, setQuery] = useState("");

  const handle = async (f: File) => {
    setName(f.name);
    setBytes(new Uint8Array(await f.arrayBuffer()));
  };

  const all = useMemo(() => (bytes ? extractStrings(bytes, min) : []), [bytes, min]);
  const filtered = useMemo(
    () => (query ? all.filter((s) => s.toLowerCase().includes(query.toLowerCase())) : all),
    [all, query],
  );

  const exportTxt = () => {
    const blob = new Blob([filtered.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "strings.txt";
    a.click();
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Strings"
        title="Strings extractor"
        description="Find readable text fragments inside any local file."
      />
      <GlassCard className="space-y-5 p-6">
        <FileDropzone accept="*/*" onFile={handle} fileName={name} hint="Any local file" />
        {bytes && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum length — {min}</label>
                <Slider
                  value={[min]}
                  onValueChange={(v) => setMin(v[0])}
                  min={3}
                  max={20}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter strings…"
                  className="bg-white/5"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {filtered.length.toLocaleString()} of {all.length.toLocaleString()} strings
              </span>
              <Button onClick={exportTxt} variant="outline" className="border-white/10 bg-white/5">
                <Download className="mr-2 h-3.5 w-3.5" /> Export TXT
              </Button>
            </div>
            <div className="max-h-[55vh] overflow-auto rounded-lg border border-white/10 bg-black/30">
              {filtered.slice(0, 1000).map((s, i) => (
                <div key={i} className="border-b border-white/5 px-3 py-1.5 font-mono text-xs">
                  {s}
                </div>
              ))}
            </div>
          </>
        )}
      </GlassCard>
    </div>
  );
}
