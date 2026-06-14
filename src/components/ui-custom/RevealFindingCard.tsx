import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CopyButton } from "./CopyButton";

export type RevealFinding = {
  title: string;
  message: string;
  value?: string;
  to?: string;
  ctaLabel?: string;
  tone?: "info" | "highlight";
};

export function RevealFindingCard({ finding }: { finding: RevealFinding }) {
  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Finding
          </div>
          <h3 className="mt-1 text-[15px] font-semibold tracking-tight">{finding.title}</h3>
        </div>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{finding.message}</p>
      {finding.value && (
        <div className="mt-3 break-all rounded-lg border border-white/10 bg-black/30 p-2 font-mono text-[11px] text-foreground/80">
          {finding.value.slice(0, 240)}
          {finding.value.length > 240 ? "…" : ""}
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {finding.to && (
          <Link
            to={finding.to}
            className="inline-flex items-center gap-1 rounded-lg bg-primary/90 px-3 py-1.5 text-[12px] font-medium text-primary-foreground hover:bg-primary"
          >
            {finding.ctaLabel ?? "Open tool"} <ArrowRight className="h-3 w-3" />
          </Link>
        )}
        {finding.value && <CopyButton value={finding.value} label="Copy" />}
      </div>
    </div>
  );
}
