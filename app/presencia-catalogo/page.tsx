import type { Metadata } from "next";
import { PresenciaCatalogoLanding } from "@/components/presencia-catalogo-landing";

export const metadata: Metadata = {
  title: "Presencia Catálogo — Catálogo web desde S/0 · hasta 1.000 productos",
  description:
    "Catálogo digital inteligente y fácil de rellenar. Muestra tus productos en la web, consultas por WhatsApp, sin carrito ni comisiones. Gratis 10 productos · S/99–199/mes.",
  openGraph: {
    title: "Presencia Catálogo — vitrina digital sencilla | Wavys",
    description:
      "Catálogo web con panel fácil. Gratis hasta 10 productos. Planes de pago hasta 1.000 productos. Sin e-commerce, sin comisiones.",
    type: "website",
    siteName: "Wavys Software",
    url: "https://software.wavys-technologies.com/presencia-catalogo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Presencia Catálogo — Wavys Software",
    description:
      "Catálogo digital sencillo de rellenar. Desde gratis (10 productos) hasta S/199/mes (1.000 productos).",
  },
  robots: { index: true, follow: true },
};

export default function PresenciaCatalogoPage() {
  return <PresenciaCatalogoLanding />;
}
