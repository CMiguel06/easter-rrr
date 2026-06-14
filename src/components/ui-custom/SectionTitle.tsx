import type { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && (
        <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </div>
      )}
      <h2 className="text-2xl font-semibold tracking-tight sm:text-[32px]">{title}</h2>
      {description && (
        <p
          className={`mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
