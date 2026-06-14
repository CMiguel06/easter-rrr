export function BackgroundOrbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="animate-float-slow absolute -top-48 -left-48 h-[44rem] w-[44rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.16 245 / 45%), transparent 70%)" }}
      />
      <div
        className="animate-float-slower absolute top-1/3 -right-56 h-[38rem] w-[38rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.11 215 / 40%), transparent 70%)" }}
      />
      <div
        className="animate-float-slow absolute -bottom-56 left-1/4 h-[40rem] w-[40rem] rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.06 230 / 35%), transparent 70%)" }}
      />
    </div>
  );
}
