import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { CASES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Trabajo",
  description:
    "Casos en producción: Inmobiliaria Fabre, JLH Corredores y La Alcoba. Software a medida y diseño desde Lima.",
  alternates: { canonical: "/trabajo" },
};

export default function TrabajoPage() {
  return (
    <>
      <PageHero
        kicker="Trabajo"
        title="Piezas con peso, en uso."
        lede="Tres casos públicos. Sin métricas inventadas y sin usar la web corporativa de Wavys como pieza destacada."
      />
      <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
        <ul className="grid gap-6 lg:grid-cols-3">
          {CASES.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/trabajo/${item.slug}`}
                className="group block overflow-hidden rounded-[1.4rem] border border-[var(--line)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={`Captura del sitio de ${item.client}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                    {item.client}
                  </p>
                  <h2 className="mt-3 font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.03em]">
                    {item.title}
                  </h2>
                  <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)]">
                    {item.type} · {item.year}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand title="Si esto se parece a lo que necesitas, hablemos." />
    </>
  );
}
