import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { PROCESS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Proceso",
  description:
    "Diagnóstico, dirección, construcción y entrega. Cada fase tiene entregable, tiempo y un punto de decisión.",
  alternates: { canonical: "/proceso" },
};

export default function ProcesoPage() {
  return (
    <>
      <PageHero
        kicker="Proceso"
        title="Cuatro movimientos. Nada al azar."
        lede="Antes de construir hay un diagnóstico. Cada fase deja un entregable, un tiempo y un punto en el que se decide seguir o no."
      />
      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-12">
        <ol className="grid gap-6 lg:grid-cols-2">
          {PROCESS.map((step) => (
            <li
              key={step.id}
              className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] p-8"
            >
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[var(--accent)]">
                {step.id} · {step.kicker}
              </p>
              <h2 className="mt-4 font-display text-[1.5rem] font-semibold tracking-[-0.03em]">
                {step.title}
              </h2>
              <p className="mt-4 text-[0.98rem] leading-7 text-[var(--cream-soft)]/75">{step.body}</p>
              <dl className="mt-6 space-y-2 text-[0.9rem] leading-6 text-[var(--cream-soft)]/60">
                <div>
                  <dt className="inline font-semibold text-[var(--cream-soft)]/85">Entregable. </dt>
                  <dd className="inline">{step.deliverable}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-[var(--cream-soft)]/85">Tiempo. </dt>
                  <dd className="inline">{step.time}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-[var(--cream-soft)]/85">Decisión. </dt>
                  <dd className="inline">{step.decision}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </section>
      <CtaBand />
    </>
  );
}
