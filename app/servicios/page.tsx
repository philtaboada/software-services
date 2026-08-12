import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { SERVICES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Webs, apps, sistemas internos e identidad digital. Software a medida y diseño desde Lima para Perú y LatAm.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        kicker="Servicios"
        title="Cuatro territorios. Una sola ola."
        lede="Dirección visual e ingeniería en el mismo equipo. El alcance se cierra en la llamada."
      />
      <section className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-12">
        <div className="grid gap-5 lg:grid-cols-2">
          {SERVICES.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="group relative min-h-[18rem] overflow-hidden rounded-[1.4rem] border border-[var(--line)]"
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000908] via-[#000908]/55 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-9">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-[var(--accent)]">
                  {item.code}
                </span>
                <h2 className="mt-3 font-display text-[1.7rem] font-bold tracking-[-0.03em]">
                  {item.title}
                </h2>
                <p className="mt-3 max-w-[36rem] text-[0.98rem] leading-7 text-[var(--cream-soft)]/80">
                  {item.outcome}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
