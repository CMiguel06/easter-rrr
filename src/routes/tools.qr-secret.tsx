import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { toast } from "sonner";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { CopyButton } from "@/components/ui-custom/CopyButton";

export const Route = createFileRoute("/tools/qr-secret")({
  head: () => ({
    meta: [
      { title: "Secret QR — Easter" },
      {
        name: "description",
        content: "Wrap any message, link or coordinate in a beautiful QR code.",
      },
      { property: "og:title", content: "Secret QR — Easter" },
      {
        property: "og:description",
        content: "Create a QR code as a clue, message or hidden link.",
      },
    ],
  }),
  component: QRSecret,
});

function QRSecret() {
  const [content, setContent] = useState("Find the next clue under the old map");
  const [label, setLabel] = useState("");
  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [svg, setSvg] = useState("");

  useEffect(() => {
    if (!canvasRef.current) return;
    if (!content) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setSvg("");
      return;
    }
    QRCode.toCanvas(canvasRef.current, content, {
      width: size,
      margin,
      color: { dark: "#e9eaff", light: "#0000" },
      errorCorrectionLevel: "M",
    }).catch(() => {});
    QRCode.toString(content, { type: "svg", margin, color: { dark: "#e9eaff", light: "#0000" } })
      .then(setSvg)
      .catch(() => {});
  }, [content, size, margin]);

  const downloadPNG = () => {
    if (!content) return toast.error("Add QR content first.");
    if (!canvasRef.current) return;
    canvasRef.current.toBlob((b) => {
      if (!b) return toast.error("Could not export PNG.");
      const url = URL.createObjectURL(b);
      const a = document.createElement("a");
      a.href = url;
      a.download = "easter-qr.png";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const downloadSVG = () => {
    if (!svg) return toast.error("Add QR content first.");
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "easter-qr.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Secret QR"
        title="Wrap a clue in a QR code"
        description="Any text, link or set of coordinates can become a scannable square."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <GlassCard className="space-y-5 p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <Textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-white/5"
              placeholder="Find the next clue under the old map"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Label (optional, shown below QR)</label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Clue #1"
              className="bg-white/5"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Size — {size}px</label>
            <Slider
              value={[size]}
              onValueChange={(v) => setSize(v[0])}
              min={160}
              max={640}
              step={20}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Margin — {margin}</label>
            <Slider
              value={[margin]}
              onValueChange={(v) => setMargin(v[0])}
              min={0}
              max={8}
              step={1}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <CopyButton value={content} label="Copy content" />
          </div>
        </GlassCard>
        <GlassCard strong className="flex flex-col items-center justify-center gap-4 p-6">
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-6 ring-1 ring-white/10">
            <canvas ref={canvasRef} className="block max-w-full" />
          </div>
          {label && <div className="text-sm text-muted-foreground">{label}</div>}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={downloadPNG}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-primary to-accent px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              <Download className="h-4 w-4" /> PNG
            </button>
            <button
              onClick={downloadSVG}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm"
            >
              <Download className="h-4 w-4" /> SVG
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
