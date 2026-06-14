import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="animate-fade-up mb-10 text-center">
      {eyebrow && (
        <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </div>
      )}
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        <span className="text-gradient">{title}</span>
      </h1>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">{description}</p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
