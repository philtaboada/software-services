import type { Metadata } from "next";
import { CartasLanding } from "@/components/cartas/cartas-landing";
import { CARTA_OFERTA } from "@/lib/carta-oferta";

export const metadata: Metadata = {
  title: "Carta digital",
  description: CARTA_OFERTA.deck,
  robots: { index: false, follow: false },
  alternates: { canonical: "/cartas" },
};

export default function CartasPage() {
  return <CartasLanding />;
}
