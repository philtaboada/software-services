import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { StudioShell } from "@/components/studio-shell";
import { OG_IMAGE, SITE_URL } from "@/lib/site";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
    siteName: "Wavys Technologies",
    locale: "es_PE",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Wavys Technologies — estudio de software y diseño en Lima",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wavys Technologies — Software a medida y diseño en Perú / LatAm",
    description:
      "Estudio en Lima. Software a medida y diseño para negocios con tracción en Perú y LatAm.",
    images: [OG_IMAGE],
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
