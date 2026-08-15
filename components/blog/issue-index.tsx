import type { RadarIssue } from "@/lib/radar-issues";
import { MagazineCarousel } from "./magazine-carousel";

export function IssueIndex({ issues }: { issues: RadarIssue[] }) {
  return (
    <section className="relative isolate flex h-screen max-h-screen flex-col overflow-hidden px-5 pb-0 pt-24 sm:px-8 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(90,210,208,0.12),transparent_52%)]"
      />

      <div className="relative mx-auto shrink-0 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--rb-teal)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--rb-teal)]" />
          Cada viernes
        </p>
        <h1 className="mt-4 font-[var(--rb-sans)] text-[clamp(2.1rem,5.2vh,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-white">
          Las revistas
        </h1>
        <p className="rb-em mt-1 text-[clamp(1.8rem,4.4vh,3.1rem)] leading-none text-white">
          de Radar
        </p>
      </div>

      <MagazineCarousel issues={issues} />
    </section>
  );
}
