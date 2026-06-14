import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import exifr from "exifr";
import { toast } from "sonner";
import { AlertTriangle, Download } from "lucide-react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { FileDropzone } from "@/components/ui-custom/FileDropzone";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/tools/metadata")({
  head: () => ({
    meta: [
      { title: "Analyse file metadata — Easter" },
      { name: "description", content: "See what your photos quietly reveal — and export a cleaned version." },
      { property: "og:title", content: "Analyse file metadata — Easter" },
      { property: "og:description", content: "Inspect EXIF and other metadata fields. Files stay in your browser." },
    ],
  }),
  component: MetadataPage,
});

type FieldRow = { key: string; value: string; sensitive?: boolean };

function MetadataPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState<FieldRow[] | null>(null);
  const [cleanedUrl, setCleanedUrl] = useState<string | null>(null);

  const onFile = async (f: File) => {
    setFile(f); setFields(null); setCleanedUrl(null);
    try {
      const data = await exifr.parse(f, { gps: true });
      const rows: FieldRow[] = [];
      rows.push({ key: "File name", value: f.name });
      rows.push({ key: "Size", value: `${(f.size / 1024).toFixed(1)} KB` });
      rows.push({ key: "Type", value: f.type || "unknown" });
      if (data) {
        if (data.Make || data.Model) rows.push({ key: "Camera", value: [data.Make, data.Model].filter(Boolean).join(" "), sensitive: true });
        if (data.DateTimeOriginal) rows.push({ key: "Taken on", value: new Date(data.DateTimeOriginal).toLocaleString(), sensitive: true });
        if (data.ExifImageWidth && data.ExifImageHeight)
          rows.push({ key: "Dimensions", value: `${data.ExifImageWidth} × ${data.ExifImageHeight}` });
        if (data.Software) rows.push({ key: "Software", value: String(data.Software) });
        if (data.latitude && data.longitude) rows.push({
          key: "GPS",
          value: `${data.latitude.toFixed(5)}, ${data.longitude.toFixed(5)}`,
          sensitive: true,
        });
        if (data.LensModel) rows.push({ key: "Lens", value: String(data.LensModel) });
        if (data.ISO) rows.push({ key: "ISO", value: String(data.ISO) });
      }
      setFields(rows);
    } catch {
      toast.error("Could not read metadata from this file.");
      setFields([{ key: "File name", value: f.name }, { key: "Size", value: `${(f.size / 1024).toFixed(1)} KB` }]);
    }
  };

  const exportCleaned = async () => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((b) => {
        if (!b) return toast.error("Export failed.");
        if (cleanedUrl) URL.revokeObjectURL(cleanedUrl);
        setCleanedUrl(URL.createObjectURL(b));
        toast.success("Cleaned image ready.");
      }, "image/png");
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const hasSensitive = fields?.some((f) => f.sensitive);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Metadata"
        title="What does this file reveal?"
        description="Files stay in your browser. Nothing is uploaded."
      />
      <GlassCard className="space-y-5 p-6">
        <FileDropzone accept="image/*" onFile={onFile} fileName={file?.name} hint="Images: full EXIF read. Other files: basic info only." />
        {fields && (
          <div className="space-y-3">
            {hasSensitive && (
              <div className="flex items-start gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3 text-xs text-yellow-100/90">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Some fields here can identify you, your device or your location. Consider stripping them before sharing.
              </div>
            )}
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <tbody>
                  {fields.map((f) => (
                    <tr key={f.key} className="border-b border-white/5 last:border-0">
                      <td className="w-1/3 bg-white/[0.02] px-4 py-2.5 text-muted-foreground">{f.key}</td>
                      <td className="px-4 py-2.5 font-mono text-xs break-all">
                        {f.value}
                        {f.sensitive && <span className="ml-2 rounded bg-yellow-500/20 px-1.5 py-0.5 text-[10px] text-yellow-100">sensitive</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {file?.type.startsWith("image/") && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-medium">Export cleaned image</div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Re-encodes as PNG, which removes EXIF metadata. The visible image stays the same.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Button onClick={exportCleaned} className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    Strip metadata
                  </Button>
                  {cleanedUrl && (
                    <a href={cleanedUrl} download="cleaned.png" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm">
                      <Download className="h-4 w-4" /> Download cleaned
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-xs text-muted-foreground">
          What this means: metadata is information stored inside a file — like the camera that took a photo, when it was taken, and sometimes where. It travels with the file when you share it.
        </div>
      </GlassCard>
    </div>
  );
}
