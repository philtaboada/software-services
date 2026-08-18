"use client";

import { CasePlayer } from "@/components/case-player";
import { CASE_BRIEFS } from "@/lib/content";

type Slug = keyof typeof CASE_BRIEFS;

export function CaseCharts({ slug }: { slug: Slug }) {
  const brief = CASE_BRIEFS[slug];

  return (
    <section className="case-block">
      <div className="case-block-head">
        <div>
          <p className="section-label">Lectura visual</p>
          <h2 className="case-heading">Un modelo distinto por pieza.</h2>
        </div>
        <p className="case-lead">
          Pieza en movimiento, hecha con Remotion. Cada caso tiene su propia película, no un template copiado.
        </p>
      </div>
      <div className="case-chart-layout">
        <CasePlayer slug={slug} />
        <aside className="case-chart-notes">
          {brief.product.slice(0, 3).map((entry, index) => (
            <article key={entry.label} className="case-note">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-[var(--accent)]">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-display text-[1.05rem] font-semibold tracking-[-0.03em]">{entry.label}</h3>
              <p className="mt-2 text-[0.86rem] leading-6 text-[var(--cream-soft)]/58">{entry.body}</p>
            </article>
          ))}
        </aside>
      </div>
    </section>
  );
}
