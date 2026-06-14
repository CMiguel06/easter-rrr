import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeftRight, Eraser } from "lucide-react";
import { PageHeader } from "@/components/ui-custom/PageHeader";
import { GlassCard } from "@/components/ui-custom/GlassCard";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui-custom/CopyButton";
import { encoders, type EncoderKey } from "@/lib/encoders";

export const Route = createFileRoute("/tools/encoder")({
  head: () => ({
    meta: [
      { title: "Encode / decode text — Easter" },
      {
        name: "description",
        content: "Convert text to and from Base64, binary, hex, ROT13, Morse and ASCII.",
      },
      { property: "og:title", content: "Encode / decode text — Easter" },
      {
        property: "og:description",
        content: "A friendly converter for Base64, binary, hex, ROT13, Morse and ASCII.",
      },
    ],
  }),
  component: EncoderPage,
});

const OPTIONS: { key: EncoderKey; label: string }[] = [
  { key: "base64", label: "Base64" },
  { key: "base32", label: "Base32" },
  { key: "binary", label: "Binary" },
  { key: "hex", label: "Hex" },
  { key: "rot13", label: "ROT13" },
  { key: "caesar3", label: "Caesar (+3)" },
  { key: "url", label: "URL encoding" },
  { key: "unicode", label: "Unicode escape" },
  { key: "morse", label: "Morse" },
  { key: "ascii", label: "ASCII codes" },
];

function EncoderPage() {
  const [tool, setTool] = useState<EncoderKey>("base64");
  const [dir, setDir] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const run = (text = input, t = tool, d = dir) => {
    try {
      const fn = encoders[t][d];
      setOutput(fn(text));
    } catch {
      toast.error("Could not transform that input.");
    }
  };

  const swap = () => {
    setInput(output);
    setOutput(input);
  };

  const clear = () => {
    setInput("");
    setOutput("");
  };

  const isRot = tool === "rot13";

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Encoder"
        title="Encode / decode text"
        description="Pick a format, type or paste your text, and convert it both ways."
      />
      <GlassCard className="space-y-5 p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Format</label>
            <Select
              value={tool}
              onValueChange={(v) => {
                const k = v as EncoderKey;
                setTool(k);
                if (input) run(input, k, dir);
              }}
            >
              <SelectTrigger className="bg-white/5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {OPTIONS.map((o) => (
                  <SelectItem key={o.key} value={o.key}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {!isRot && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Direction</label>
              <Select
                value={dir}
                onValueChange={(v) => {
                  const d = v as "encode" | "decode";
                  setDir(d);
                  if (input) run(input, tool, d);
                }}
              >
                <SelectTrigger className="bg-white/5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="encode">Encode</SelectItem>
                  <SelectItem value="decode">Decode</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Input</label>
          <Textarea
            rows={5}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              run(e.target.value);
            }}
            placeholder="Type or paste anything here…"
            className="bg-white/5"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={swap} variant="outline" className="border-white/10 bg-white/5">
            <ArrowLeftRight className="mr-2 h-3.5 w-3.5" /> Swap
          </Button>
          <Button onClick={clear} variant="outline" className="border-white/10 bg-white/5">
            <Eraser className="mr-2 h-3.5 w-3.5" /> Clear
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Output</label>
            <CopyButton value={output} />
          </div>
          <Textarea
            rows={5}
            value={output}
            readOnly
            className="bg-black/30 font-mono text-sm"
            placeholder="Result appears here…"
          />
        </div>
      </GlassCard>
    </div>
  );
}
