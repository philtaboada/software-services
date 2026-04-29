import type { Metadata } from "next";
import Link from "next/link";
import { PROCESS_DEMO_ENTRIES } from "@/lib/process-demos";

export const metadata: Metadata = {
  title: "Demos · Proceso",
  description:
    "Animaciones del pipeline Wavys en páginas independientes para iterar diseño y motion.",
};

export default function DemosProcesoIndexPage(): React.ReactElement {
  return (
    <main className="min-h-dvh bg-[var(--background)] text-[var(--cream)]">
      <div className="noise pointer-events-none fixed inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
        <nav className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--muted)] transition-colors hover:text-[var(--cream)]"
          >
            ← Inicio
          </Link>
        </nav>
        <p className="section-label text-[var(--accent-soft)]">Demos</p>
        <h1 className="mt-4 font-display text-[clamp(1.75rem,5vw,2.75rem)] font-medium leading-tight tracking-[-0.03em]">
          Proceso — una ruta por animación
        </h1>
        <p className="mt-5 text-pretty text-[1rem] leading-7 text-[var(--cream-soft)]/70">
          Cada escena vive en su propia URL para que podamos pulir motion, copy y
          layout sin mezclar con el resto de la landing.
        </p>
        <ul className="mt-12 space-y-3">
          {PROCESS_DEMO_ENTRIES.map((entry, idx) => (
            <li key={entry.slug}>
              <Link
                href={`/demos/proceso/${entry.slug}`}
                className="group card-outline flex flex-col gap-2 rounded-2xl px-5 py-4 transition-colors hover:border-[var(--line-strong)]"
              >
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  {String(idx + 1).padStart(2, "0")} · {entry.slug}
                </span>
                <span className="font-display text-[1.15rem] font-medium tracking-[-0.02em] text-[var(--cream)] group-hover:text-[var(--accent-soft)]">
                  {entry.title}
                </span>
                <span className="text-[0.9rem] leading-6 text-[var(--cream-soft)]/65">
                  {entry.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
