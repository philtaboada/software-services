import type { Metadata } from "next";
import { PresenciaDigitalLanding } from "@/components/presencia-digital-landing";

export const metadata: Metadata = {
  title: "Presencia Digital — Landing + Fotos desde S/149/mes",
  description:
    "Landing page profesional con fotos incluidas, dominio, hosting, SEO y WhatsApp. Plan mensual accesible para negocios en todo el Perú. Entrega en 5–7 días.",
  openGraph: {
    title: "Tu negocio online con fotos profesionales — desde S/149/mes | Wavys",
    description:
      "Landing premium + Pack Foto Essential incluido. Sin inversión inicial alta. Disponible en todo el Perú.",
    type: "website",
    siteName: "Wavys Software",
    url: "https://software.wavys-technologies.com/presencia-digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Presencia Digital — Wavys Software",
    description:
      "Landing profesional con fotos incluidas desde S/149/mes. Dominio, hosting, SEO y WhatsApp integrados.",
  },
  robots: { index: true, follow: true },
};

export default function PresenciaDigitalPage() {
  return <PresenciaDigitalLanding />;
}
