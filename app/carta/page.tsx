import type { Metadata } from "next";
import Link from "next/link";
import { PILOTO_RESTAURANTS } from "@/lib/piloto";

export const metadata: Metadata = {
  title: "Cartas demo — piloto Lima",
  description: "Diez demos de carta digital para el piloto de restaurantes en Lima.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/carta" },
};

export default function CartaIndexPage() {
  return (
    <section className="mx-auto max-w-[720px] px-5 pb-24 pt-32 sm:px-8">
      <p className="section-label">Carta digital · demo</p>
      <h1 className="mt-5 font-display text-[clamp(2rem,4vw,3.4rem)] font-bold tracking-[-0.04em]">
        Diez cartas, un mismo molde.
      </h1>
      <p className="mt-5 max-w-[36rem] text-[1.02rem] leading-8 text-[var(--cream-soft)]/75">
        Cada link es lo que se manda por WhatsApp. Platos y precios solo si aparecieron en fuentes
        públicas el 17 ago 2026.
      </p>
      <ol className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {PILOTO_RESTAURANTS.map((item) => (
          <li key={item.slug}>
            <Link
              href={`/carta/${item.slug}`}
              className="flex min-h-16 items-center justify-between gap-4 py-4 text-[1.05rem] hover:text-[var(--accent)]"
            >
              <span>
                <span className="font-mono text-[0.7rem] text-[var(--muted)]">
                  {String(item.n).padStart(2, "0")}
                </span>{" "}
                {item.shortName}
              </span>
              <span className="text-[0.8rem] text-[var(--muted)]">{item.distrito}</span>
            </Link>
          </li>
        ))}
      </ol>
      <Link href="/piloto" className="btn-ghost mt-8">
        Abrir tablero del piloto
      </Link>
    </section>
  );
}
