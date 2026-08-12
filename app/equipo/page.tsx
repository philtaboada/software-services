import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { STACK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Equipo",
  description:
    "Phil Taboada y tres developers. Estudio de software a medida y diseño en Lima, remoto para LatAm.",
  alternates: { canonical: "/equipo" },
};

export default function EquipoPage() {
  return (
    <>
      <PageHero
        kicker="Equipo"
        title="Un punto de contacto. Un equipo que construye."
        lede="Phil Taboada dirige producto y diseño desde Lima. Tres developers sostienen ingeniería. No hay cuenta de account managers entre tú y el trabajo."
      />
      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-12">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] p-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Dirección
            </p>
            <h2 className="mt-4 font-display text-[1.8rem] font-bold tracking-[-0.03em]">
              Phil Taboada
            </h2>
            <p className="mt-2 text-[0.95rem] text-[var(--cream-soft)]/60">
              Founder · producto y diseño
            </p>
            <p className="mt-5 text-[0.98rem] leading-7 text-[var(--cream-soft)]/75">
              Lima, Perú. Un solo interlocutor para alcance, dirección visual y
              decisión de producto. Presencial cuando el proyecto lo pide.
            </p>
          </article>
          <article className="rounded-[1.4rem] border border-[var(--line)] bg-[var(--surface)] p-8">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Ingeniería
            </p>
            <h2 className="mt-4 font-display text-[1.8rem] font-bold tracking-[-0.03em]">
              Tres developers
            </h2>
            <p className="mt-2 text-[0.95rem] text-[var(--cream-soft)]/60">
              Front, back y producto
            </p>
            <p className="mt-5 text-[0.98rem] leading-7 text-[var(--cream-soft)]/75">
              El mismo equipo que firma el frente público construye el sistema
              que hay detrás. Nombres y fotos cuando cada persona lo autorice —
              el trabajo ya está en producción.
            </p>
          </article>
        </div>
        <div className="mt-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            Stack
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
