import type { RadarIssue } from "@/lib/radar-issues";
import { MagazineCarousel } from "./magazine-carousel";
import { RadarAmbient } from "./radar-ambient";

export function IssueIndex({ issues }: { issues: RadarIssue[] }) {
  return (
    <section className="relative isolate flex h-dvh max-h-dvh flex-col overflow-hidden px-5 pb-0 pt-20 sm:px-8 sm:pt-24">
      <RadarAmbient />

      <div className="relative z-10 mx-auto shrink-0 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--rb-teal)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--rb-teal)]" />
          Cada viernes
        </p>
        <h1 className="mt-3 font-[var(--rb-sans)] text-[clamp(1.9rem,4.4vh,3.1rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-white">
          Las revistas
        </h1>
        <p className="rb-em mt-0.5 text-[clamp(1.6rem,3.8vh,2.7rem)] leading-none text-white">
          de Radar
        </p>
      </div>

      <MagazineCarousel issues={issues} />
    </section>
  );
}
