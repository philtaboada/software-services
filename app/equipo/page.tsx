import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { STACK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Equipo",
  description:
    "Estudio de software a medida y diseño en Lima. Un equipo para que el digital trabaje a favor del negocio. Remoto para LatAm.",
  alternates: { canonical: "/equipo" },
};

export default function EquipoPage() {
  return (
    <>
      <PageHero
        kicker="Equipo"
        title="Un equipo. Tus resultados."
        lede="No hace falta saber quién está detrás de cada línea. Somos un estudio: entramos al problema y construimos hasta que el digital deje de frenar el negocio."
      />
      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2">
          <article className="border-t border-[var(--line-strong)] pt-6">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[var(--accent)]">
              01 · Conversación
            </p>
            <h2 className="mt-4 font-display text-[1.6rem] font-bold tracking-[-0.03em]">
              Un interlocutor
            </h2>
            <p className="mt-4 text-[0.98rem] leading-7 text-[var(--cream-soft)]/75">
              Alcance, visual y decisión en la misma mesa. Presencial en Lima
              cuando el proyecto lo pide; remoto para LatAm.
            </p>
          </article>
          <article className="border-t border-[var(--line-strong)] pt-6">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[var(--accent)]">
              02 · Entrega
            </p>
            <h2 className="mt-4 font-display text-[1.6rem] font-bold tracking-[-0.03em]">
              Resultado en producción
            </h2>
            <p className="mt-4 text-[0.98rem] leading-7 text-[var(--cream-soft)]/75">
              Diseño e ingeniería en un solo ciclo. El trabajo se mide cuando ya
              está operando — no en una presentación.
            </p>
          </article>
        </div>
        <div className="mt-14">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            Con qué construimos
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {STACK.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[var(--line-strong)] px-4 py-2 text-[0.85rem] text-[var(--cream-soft)]/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
