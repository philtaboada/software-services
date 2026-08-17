import type { Metadata } from "next";
import { PilotoBoard } from "@/components/piloto/piloto-board";
import { PILOTO_META, PILOTO_STATS } from "@/lib/piloto";

export const metadata: Metadata = {
  title: "Piloto 10 restaurantes — Lima",
  description:
    "Tablero interno del piloto de carta digital: 10 restaurantes independientes en Lima, lun 17 ago 2026.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/piloto" },
};

const STATS = [
  { value: String(PILOTO_STATS.total), label: "Locales con teléfono público" },
  { value: String(PILOTO_STATS.withWeb), label: "Con web propia" },
  { value: String(PILOTO_STATS.withoutWeb), label: "Sin web" },
  { value: String(PILOTO_STATS.pitchClean), label: "Pitch limpio para WA" },
] as const;

export default function PilotoPage() {
  return (
    <>
      <header className="mx-auto max-w-[1440px] px-5 pb-10 pt-32 sm:px-8 lg:px-12">
        <p className="section-label">
          {PILOTO_META.title} · {PILOTO_META.city}
        </p>
        <h1 className="mt-5 max-w-[16ch] font-display text-[clamp(2.1rem,5vw,4.2rem)] font-bold leading-[1.04] tracking-[-0.05em]">
          Diez cartas que todavía viven en PDF, WhatsApp o el salón.
        </h1>
        <p className="mt-6 max-w-[40rem] text-pretty text-[1.05rem] leading-8 text-[var(--cream-soft)]/80">
          Independientes, dueño visible, barrio. Brief del {PILOTO_META.dateLabel}.{" "}
          {PILOTO_META.method} Cada ficha abre una demo de carta y un mensaje listo para WhatsApp.
        </p>
      </header>

      <section className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-8 lg:px-12">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((item) => (
            <li
              key={item.label}
              className="rounded-[1.2rem] border border-[var(--line)] bg-[var(--surface)] px-5 py-5"
            >
              <p className="font-display text-[2rem] font-bold tracking-[-0.04em] text-[var(--accent)]">
                {item.value}
              </p>
              <p className="mt-1 text-[0.88rem] text-[var(--cream-soft)]/70">{item.label}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-[48rem] text-[0.88rem] leading-7 text-[var(--muted)]">
          Más limpios: Don Fernando, Cumpa, Me Gusta, Ozu, Pedrito, Arlotia. El más débil para WA es El
          Rey Marino (solo fijo). No están Pueblo Libre ni San Isidro a propósito. Fuera:{" "}
          {PILOTO_META.excluded}
        </p>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 lg:px-12">
        <PilotoBoard />
      </section>
    </>
  );
}
