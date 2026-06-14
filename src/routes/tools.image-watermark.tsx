import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { FileDropzone } from "@/components/ui-custom/FileDropzone";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/tools/image-watermark")({
  head: () => ({ meta: [
    { title: "Image watermark — Easter" },
    { name: "description", content: "Add a subtle visible watermark to any image, locally." },
  ]}),
  component: Page,
});

type Pos = "tl" | "tr" | "bl" | "br" | "c";

function Page() {
  const [src, setSrc] = useState<string>("");
  const [name, setName] = useState("");
  const [text, setText] = useState("© your name");
  const [opacity, setOpacity] = useState(0.6);
  const [size, setSize] = useState(28);
  const [pos, setPos] = useState<Pos>("br");
  const [out, setOut] = useState("");

  const handleFile = (f: File) => {
    setName(f.name);
    const r = new FileReader();
    r.onload = () => setSrc(r.result as string);
    r.readAsDataURL(f);
    setOut("");
  };

  const render = () => {
    if (!src) return toast.error("Add an image first.");
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth; c.height = img.naturalHeight;
      const ctx = c.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      ctx.font = `${size}px -apple-system, system-ui, sans-serif`;
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      const w = ctx.measureText(text).width;
      const pad = Math.round(size * 0.6);
      let x = pad, y = pad + size;
      if (pos === "tr") x = c.width - w - pad;
      else if (pos === "bl") y = c.height - pad;
      else if (pos === "br") { x = c.width - w - pad; y = c.height - pad; }
      else if (pos === "c") { x = (c.width - w) / 2; y = (c.height + size) / 2; }
      ctx.shadowColor = "rgba(0,0,0,0.5)"; ctx.shadowBlur = 4;
      ctx.fillText(text, x, y);
      setOut(c.toDataURL("image/png"));
      toast.success("Watermark added.");
    };
    img.src = src;
  };

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader eyebrow="Watermark" title="Add a visible watermark" description="A simple, subtle signature for your image. Processed locally." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <GlassCard className="space-y-5 p-6">
          <FileDropzone accept="image/*" onFile={handleFile} fileName={name} hint="PNG, JPEG — anything your browser can render" />
          <div className="space-y-2"><label className="text-sm font-medium">Watermark text</label>
            <Input value={text} onChange={(e) => setText(e.target.value)} className="bg-white/5" /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Position</label>
            <Select value={pos} onValueChange={(v) => setPos(v as Pos)}>
              <SelectTrigger className="bg-white/5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="tl">Top left</SelectItem><SelectItem value="tr">Top right</SelectItem>
                <SelectItem value="bl">Bottom left</SelectItem><SelectItem value="br">Bottom right</SelectItem>
                <SelectItem value="c">Center</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><label className="text-sm font-medium">Opacity — {Math.round(opacity * 100)}%</label>
            <Slider value={[opacity * 100]} onValueChange={(v) => setOpacity(v[0] / 100)} min={10} max={100} step={5} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Size — {size}px</label>
            <Slider value={[size]} onValueChange={(v) => setSize(v[0])} min={12} max={120} step={2} /></div>
          <Button onClick={render} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Apply watermark</Button>
        </GlassCard>
        <GlassCard strong className="flex items-center justify-center p-6">
          {out ? (
            <div className="space-y-4 w-full">
              <img src={out} alt="Watermarked preview" className="mx-auto max-h-[420px] rounded-xl border border-white/10" />
              <a href={out} download="easter-watermark.png" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                <Download className="h-4 w-4" /> Download PNG
              </a>
            </div>
          ) : src ? (
            <img src={src} alt="Original" className="max-h-[420px] rounded-xl border border-white/10 opacity-70" />
          ) : (
            <div className="text-sm text-muted-foreground">Add an image to preview.</div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
