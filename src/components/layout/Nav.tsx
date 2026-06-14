import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/tools", label: "Tools" },
  { to: "/puzzles", label: "Puzzles" },
  { to: "/tools/easter-hunter", label: "Reveal Lab" },
  { to: "/privacy", label: "Privacy" },
  { to: "/about", label: "About" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="mx-auto mt-4 flex max-w-5xl justify-center px-4">
        <nav className="glass-island flex w-full items-center justify-between rounded-full px-3 py-2 sm:w-auto sm:gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-[15px] font-semibold tracking-tight"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-white/10 to-white/0 ring-1 ring-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
            </span>
            Easter
          </Link>
          <div className="hidden items-center gap-0.5 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                activeProps={{ className: "bg-white/8 text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/tools"
              className="ml-1 rounded-full bg-primary/90 px-4 py-1.5 text-[13px] font-medium text-primary-foreground shadow-[0_0_24px_-6px_var(--color-primary)] transition-all hover:bg-primary"
            >
              Create
            </Link>
          </div>
          <button
            className="rounded-full p-2 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>
      </div>
      {open && (
        <div className="mx-auto mt-2 max-w-5xl px-4 md:hidden">
          <div className="glass-island flex flex-col gap-1 rounded-2xl p-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/tools"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl bg-primary/90 px-3 py-2 text-center text-sm font-medium text-primary-foreground"
            >
              Create
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
