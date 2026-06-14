import { Upload } from "lucide-react";
import { useRef, useState, type DragEvent } from "react";
import { cn } from "@/lib/utils";

export function FileDropzone({
  accept = "image/png,image/jpeg",
  onFile,
  hint,
  fileName,
}: {
  accept?: string;
  onFile: (file: File) => void;
  hint?: string;
  fileName?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onFile(f);
  };
  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
      className={cn(
        "group relative flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-10 text-center transition-all",
        over && "border-primary/60 bg-primary/5",
      )}
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
        <Upload className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="text-sm text-foreground">
        {fileName ? (
          <span className="font-medium">{fileName}</span>
        ) : (
          <>
            Drop a file here or <span className="text-primary">browse</span>
          </>
        )}
      </div>
      {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />
    </button>
  );
}
