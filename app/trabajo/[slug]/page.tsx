import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { ArrowUpRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { CASES } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return CASES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = CASES.find((entry) => entry.slug === slug);
  if (!item) return { title: "Caso" };
  return {
    title: `${item.client} — ${item.title}`,
    description: item.context,
    alternates: { canonical: `/trabajo/${item.slug}` },
  };
}

export default async function CasoPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = CASES.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const others = CASES.filter((entry) => entry.slug !== item.slug);

  return (
    <>
      <PageHero kicker={`${item.industry} · ${item.year}`} title={item.title} lede={item.context} />
      <section className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-12">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[1.4rem] border border-[var(--line)]">
          <Image
            src={item.image}
            alt={`Captura del sitio de ${item.client}`}
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[1.5rem] font-semibold tracking-[-0.03em]">Problema</h2>
            <ul className="mt-5 space-y-3 text-[1rem] leading-7 text-[var(--cream-soft)]/75">
              {item.problem.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[1.5rem] font-semibold tracking-[-0.03em]">Enfoque</h2>
            <p className="mt-5 text-[1rem] leading-7 text-[var(--cream-soft)]/75">{item.approach}</p>
          </div>
        </div>
        <div className="mt-12 grid gap-12 border-t border-[var(--line)] pt-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[1.5rem] font-semibold tracking-[-0.03em]">Entregables</h2>
            <ul className="mt-5 space-y-3 text-[1rem] leading-7 text-[var(--cream-soft)]/75">
              {item.deliverables.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[1.5rem] font-semibold tracking-[-0.03em]">Resultado</h2>
            <p className="mt-5 text-[1rem] leading-7 text-[var(--cream-soft)]/75">{item.result}</p>
            <a
              href={item.demoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-[0.95rem] text-[var(--accent)]"
            >
              Ver en producción <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="mt-16 border-t border-[var(--line)] pt-10">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
            Más trabajo
          </p>
          <ul className="mt-5 flex flex-wrap gap-4">
            {others.map((entry) => (
              <li key={entry.slug}>
                <Link href={`/trabajo/${entry.slug}`} className="btn-ghost">
                  {entry.client}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
