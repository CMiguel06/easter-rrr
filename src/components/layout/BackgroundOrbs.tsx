export function BackgroundOrbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="animate-float-slow absolute -top-40 -left-40 h-[42rem] w-[42rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.14 220 / 60%), transparent 70%)" }}
      />
      <div
        className="animate-float-slower absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.16 320 / 60%), transparent 70%)" }}
      />
      <div
        className="animate-float-slow absolute -bottom-40 left-1/4 h-[40rem] w-[40rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.82 0.13 180 / 60%), transparent 70%)" }}
      />
    </div>
  );
}
