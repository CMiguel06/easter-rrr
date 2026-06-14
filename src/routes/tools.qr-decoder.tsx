import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import jsQR from "jsqr";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { FileDropzone } from "@/components/ui-custom/FileDropzone";
import { CopyButton } from "@/components/ui-custom/CopyButton";

export const Route = createFileRoute("/tools/qr-decoder")({
  head: () => ({
    meta: [
      { title: "QR decoder — Easter" },
      { name: "description", content: "Read a QR code from a local image." },
    ],
  }),
  component: Page,
});

function Page() {
  const [src, setSrc] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handle = (f: File) => {
    setName(f.name);
    setContent("");
    const r = new FileReader();
    r.onload = () => {
      const url = r.result as string;
      setSrc(url);
      const img = new Image();
      img.onload = () => {
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const ctx = c.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, c.width, c.height);
        const code = jsQR(data.data, data.width, data.height);
        if (code) {
          setContent(code.data);
          toast.success("QR decoded.");
        } else toast.error("No QR code detected in that image.");
      };
      img.src = url;
    };
    r.readAsDataURL(f);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="QR"
        title="QR decoder"
        description="Drop a screenshot or photo of a QR code. Decoded locally."
      />
      <GlassCard className="space-y-5 p-6">
        <FileDropzone
          accept="image/*"
          onFile={handle}
          fileName={name}
          hint="PNG or JPEG with a QR code"
        />
        {src && (
          <img
            src={src}
            alt="QR source"
            className="mx-auto max-h-72 rounded-xl border border-white/10"
          />
        )}
        {content && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Decoded content</label>
              <CopyButton value={content} />
            </div>
            <div className="whitespace-pre-wrap break-all rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-sm">
              {content}
            </div>
            <Link
              to="/tools/qr-secret"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80"
            >
              Create a new QR <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
