import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CartaMenu } from "@/components/carta/carta-menu";
import { getPilotoRestaurant, PILOTO_RESTAURANTS } from "@/lib/piloto";
import { SITE_URL } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return PILOTO_RESTAURANTS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getPilotoRestaurant(slug);
  if (!item) return { title: "Carta demo" };
  return {
    title: `${item.name} — carta demo`,
    description: `Demo de carta digital para ${item.name} (${item.distrito}). No es la carta oficial.`,
    robots: { index: false, follow: false },
    alternates: { canonical: `/carta/${item.slug}` },
  };
}

export default async function CartaPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const restaurant = getPilotoRestaurant(slug);
  if (!restaurant) notFound();

  return <CartaMenu restaurant={restaurant} origin={SITE_URL} />;
}
