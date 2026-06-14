import type { ReactNode } from "react";

export function PageHeader({
  eyebrow, title, description, children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="animate-fade-up mb-10">
      {eyebrow && (
        <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </div>
      )}
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {description && (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{description}</p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
