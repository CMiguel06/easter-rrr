import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Egg } from "lucide-react";

const links = [
  { to: "/tools", label: "Tools" },
  { to: "/puzzles", label: "Puzzles" },
  { to: "/privacy", label: "Privacy" },
  { to: "/about", label: "About" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto mt-3 max-w-6xl px-4">
        <nav className="glass-strong flex items-center justify-between rounded-2xl px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary/40 to-accent/40 ring-1 ring-white/10">
              <Egg className="h-4 w-4" />
            </span>
            <span className="text-lg">Easter</span>
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                activeProps={{ className: "bg-white/5 text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/tools"
              className="ml-2 rounded-lg bg-gradient-to-br from-primary to-accent px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-[0_0_20px_-4px_var(--color-primary)] transition-transform hover:scale-[1.02]"
            >
              Create
            </Link>
          </div>
          <button
            className="rounded-lg p-2 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        {open && (
          <div className="glass-panel mt-2 flex flex-col gap-1 rounded-2xl p-2 md:hidden">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/tools"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-gradient-to-br from-primary to-accent px-3 py-2 text-center text-sm font-medium text-primary-foreground"
            >
              Create
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
