import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { StudioShell } from "@/components/studio-shell";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://software.wavys-technologies.com"),
  title: {
    default: "Wavys Technologies — Software a medida y diseño en Perú / LatAm",
    template: "%s | Wavys Technologies",
  },
  description:
    "Estudio en Lima. Diseñamos webs, apps y sistemas internos para negocios con tracción en Perú y LatAm. IA solo cuando aporta.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wavys Technologies — Software a medida y diseño en Perú / LatAm",
    description:
      "Webs, apps y sistemas internos para negocios que ya operan. Presencial en Lima; remoto para LatAm.",
    type: "website",
    url: "https://software.wavys-technologies.com",
    siteName: "Wavys Technologies",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wavys Technologies — Software a medida y diseño en Perú / LatAm",
    description:
      "Estudio en Lima. Software a medida y diseño para negocios con tracción en Perú y LatAm.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${rubik.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <StudioShell>{children}</StudioShell>
      </body>
    </html>
  );
}
