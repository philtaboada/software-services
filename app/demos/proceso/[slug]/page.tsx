import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProcessDemoView } from "@/components/process-demo-view";
import {
  PROCESS_DEMO_ENTRIES,
  getProcessDemoBySlug,
  getProcessDemoIndex,
} from "@/lib/process-demos";

type PageParams = {
  readonly slug: string;
};

export function generateStaticParams(): { slug: string }[] {
  return PROCESS_DEMO_ENTRIES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getProcessDemoBySlug(slug);
  if (!entry) {
    return { title: "Demo no encontrada" };
  }
  return {
    title: `Demo · ${entry.title}`,
    description: entry.description,
  };
}

export default async function ProcessDemoSlugPage({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<React.ReactElement> {
  const { slug } = await params;
  const entry = getProcessDemoBySlug(slug);
  if (!entry) {
    notFound();
  }
  const idx = getProcessDemoIndex(entry.slug);
  const prev = idx > 0 ? PROCESS_DEMO_ENTRIES[idx - 1] : null;
  const next =
    idx < PROCESS_DEMO_ENTRIES.length - 1 ? PROCESS_DEMO_ENTRIES[idx + 1] : null;

  return (
    <main className="min-h-dvh bg-[var(--background)] text-[var(--cream)]">
      <div className="noise pointer-events-none fixed inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <nav className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/demos/proceso"
            className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--muted)] transition-colors hover:text-[var(--cream)]"
          >
            ← Índice demos
          </Link>
          <Link
            href="/#proceso"
            className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--muted)] transition-colors hover:text-[var(--cream)]"
          >
            Ver en landing
          </Link>
        </nav>
        <p className="section-label text-[var(--accent-soft)]">
          Demo · ciclo ~5s
        </p>
        <h1 className="mt-3 font-display text-[clamp(1.6rem,4.5vw,2.5rem)] font-medium leading-tight tracking-[-0.03em]">
          {entry.title}
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-[1rem] leading-7 text-[var(--cream-soft)]/70">
          {entry.description}
        </p>
        <div className="mt-10">
          <ProcessDemoView variant={entry.variant} />
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-8">
          {prev ? (
            <Link
              href={`/demos/proceso/${prev.slug}`}
              className="inline-flex max-w-[48%] flex-col gap-1 text-left font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <span>Anterior</span>
              <span className="font-display text-[0.95rem] normal-case tracking-normal text-[var(--cream)]">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/demos/proceso/${next.slug}`}
              className="inline-flex max-w-[48%] flex-col gap-1 text-right font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <span>Siguiente</span>
              <span className="font-display text-[0.95rem] normal-case tracking-normal text-[var(--cream)]">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </main>
  );
}
