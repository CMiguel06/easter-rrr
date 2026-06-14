import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/tools/import")({
  head: () => ({
    meta: [
      { title: "Import centre — Easter" },
      {
        name: "description",
        content: "Open a local Easter challenge or secret note file. Nothing is uploaded.",
      },
    ],
  }),
  component: Page,
});

function Page() {
  const [preview, setPreview] = useState<unknown | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const handle = async (f: File) => {
    try {
      const obj = JSON.parse(await f.text());
      setPreview(obj);
      toast.success("Loaded.");
    } catch {
      toast.error("Could not read that file.");
    }
  };
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Import"
        title="Import centre"
        description="Open a local Easter challenge or secret note JSON. Nothing leaves your browser."
      />
      <GlassCard className="space-y-5 p-6">
        <Button
          onClick={() => ref.current?.click()}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Upload className="mr-2 h-4 w-4" /> Choose JSON file
        </Button>
        <input
          ref={ref}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handle(f);
            e.target.value = "";
          }}
        />
        {preview !== null && (
          <pre className="max-h-[60vh] overflow-auto rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs">
            {JSON.stringify(preview, null, 2)}
          </pre>
        )}
      </GlassCard>
    </div>
  );
}
