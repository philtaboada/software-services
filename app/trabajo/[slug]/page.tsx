import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStory } from "@/components/case-story";
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
    title: `${item.client} — cómo se planeó y se construyó`,
    description: item.context,
    alternates: { canonical: `/trabajo/${item.slug}` },
  };
}

export default async function CasoPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = CASES.find((entry) => entry.slug === slug);
  if (!item) notFound();

  const others = CASES.filter((entry) => entry.slug !== item.slug);

  return <CaseStory item={item} others={others} />;
}
