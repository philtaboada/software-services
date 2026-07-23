import type { Metadata } from "next";
import { WavysOsLanding } from "@/components/wavys-os-landing";

export const metadata: Metadata = {
  title: "Wavys OS — El sistema operativo de tu negocio",
  description:
    "Se abre el chat y nacen web, oferta, citas, stock y pedidos. Packs Tienda, Salón y Restaurante. Presence desde S/169/mes.",
  openGraph: {
    title: "Wavys OS — Wavys Technologies",
    description:
      "Sistema chat-first para PYME: web + oferta + operación según pack. Demo registrada.",
    url: "https://software.wavys-technologies.com/wavys-os",
    type: "website",
    siteName: "Wavys Technologies",
  },
};

export default function WavysOsPage() {
  return <WavysOsLanding />;
}
