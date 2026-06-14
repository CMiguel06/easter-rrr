import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 px-4 pb-10">
      <div className="mx-auto max-w-6xl">
        <div className="glass-panel rounded-3xl p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 font-semibold tracking-tight">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
                Easter
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Hide meaning. Reward curiosity.</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Link to="/tools" className="hover:text-foreground">Tools</Link>
              <Link to="/puzzles" className="hover:text-foreground">Puzzles</Link>
              <Link to="/tools/easter-hunter" className="hover:text-foreground">Reveal Lab</Link>
              <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link to="/about" className="hover:text-foreground">About</Link>
            </div>
          </div>
          <div className="mt-6 border-t border-white/5 pt-4 text-xs text-muted-foreground">
            Built for curiosity, not surveillance. Everything runs in your browser.
          </div>
        </div>
      </div>
    </footer>
  );
}
