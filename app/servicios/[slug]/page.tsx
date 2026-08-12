import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { N8nFlows } from "@/components/n8n-flows";
import { PageHero } from "@/components/page-hero";
import { SERVICE_COPY, SERVICES } from "@/lib/content";
import { BOOKING_HREF } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return SERVICES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);
  if (!service) return { title: "Servicio" };
  return {
    title: service.title,
    description: service.outcome,
    alternates: { canonical: service.href },
  };
}

export default async function ServicioDetallePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.slug === slug);
  const copy = SERVICE_COPY[slug as keyof typeof SERVICE_COPY];
  if (!service || !copy) notFound();

  return (
    <>
      <PageHero kicker={`Servicio · ${service.code}`} title={service.title} lede={copy.intro} />
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <div>
          <div className="relative min-h-[18rem] overflow-hidden rounded-[1.4rem] border border-[var(--line)]">
            <Image
              src={service.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          {slug === "sistemas" ? (
            <div className="mt-10">
              <p className="section-label">Flujos en producción</p>
              <div className="mt-6">
                <N8nFlows />
              </div>
            </div>
          ) : null}
        </div>
        <div>
          <ul className="space-y-4 text-[1rem] leading-7 text-[var(--cream-soft)]/80">
            {copy.bullets.map((bullet) => (
              <li key={bullet} className="border-t border-[var(--line)] pt-4">
                {bullet}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.95rem] leading-7 text-[var(--cream-soft)]/65">{copy.forWhom}</p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
            <a
              href={BOOKING_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Agendar llamada 30 min
            </a>
            <Link href="/trabajo" className="btn-ghost">
              Ver trabajo
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
