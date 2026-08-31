import type { Metadata } from "next";
import { CartaDigitalLanding } from "@/components/cartas/carta-digital-landing";
import { CARTA_OFERTA } from "@/lib/carta-oferta";

export const metadata: Metadata = {
  title: CARTA_OFERTA.seoTitle,
  description: CARTA_OFERTA.seoDescription,
  alternates: { canonical: CARTA_OFERTA.path },
  openGraph: {
    title: CARTA_OFERTA.seoTitle,
    description: CARTA_OFERTA.seoDescription,
    url: CARTA_OFERTA.path,
  },
};

export default function CartaDigitalPage() {
  return <CartaDigitalLanding />;
}
