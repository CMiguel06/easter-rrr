import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download } from "lucide-react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";

export const Route = createFileRoute("/tools/export")({
  head: () => ({ meta: [
    { title: "Export centre — Easter" },
    { name: "description", content: "All the ways to export your local Easter results." },
  ]}),
  component: Page,
});

const ROWS = [
  { title: "Encoded / decoded text", desc: "Use the copy button in any encoder tool to grab the result.", to: "/tools/encoder" },
  { title: "Challenge JSON", desc: "Export your composed challenge as a local JSON file.", to: "/tools/challenge" },
  { title: "QR images", desc: "Download QR codes as PNG or SVG.", to: "/tools/qr-secret" },
  { title: "QR trail bundle", desc: "Download all QR codes in a trail plus instructions.", to: "/tools/qr-trail" },
  { title: "Secret note file", desc: "Save an encrypted note as JSON.", to: "/tools/secret-note" },
  { title: "Image with hidden message", desc: "Save a PNG that carries a hidden message.", to: "/tools/image-secret" },
  { title: "Watermarked image", desc: "Save a watermarked PNG.", to: "/tools/image-watermark" },
  { title: "Strings dump", desc: "Save extracted readable strings as TXT.", to: "/tools/strings" },
  { title: "Solution path", desc: "Save your puzzle-solving steps as TXT.", to: "/tools/puzzle-reverse" },
];

function Page() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader eyebrow="Export" title="Export centre" description="Every Easter result you can save locally, in one place." />
      <div className="grid gap-3 sm:grid-cols-2">
        {ROWS.map((r) => (
          <GlassCard key={r.to} className="p-5">
            <div className="flex items-start gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10"><Download className="h-4 w-4" /></div>
              <div>
                <h3 className="text-[15px] font-semibold tracking-tight">{r.title}</h3>
                <p className="mt-1 text-[13px] text-muted-foreground">{r.desc}</p>
                <Link to={r.to} className="mt-3 inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80">Open <ArrowRight className="h-3 w-3" /></Link>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
