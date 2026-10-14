import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import Script from "next/script";
import { JsonLd } from "@/components/json-ld";
import { StudioShell } from "@/components/studio-shell";
import { OG_IMAGE, SITE_URL } from "@/lib/site";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#000908",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wavys Technologies — software a medida y diseño",
    template: "%s | Wavys Technologies",
  },
  description:
    "Estudio en Lima. Software a medida, diseño web, apps y sistemas internos para negocios que ya operan. Remoto, en cualquier país.",
  openGraph: {
    title: "Wavys Technologies — software a medida y diseño",
    description:
      "Webs, apps y sistemas internos para negocios que ya operan. Estudio en Lima, remoto para cualquier país.",
    type: "website",
    url: SITE_URL,
    siteName: "Wavys Technologies",
    locale: "es_PE",
    alternateLocale: ["en_US"],
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
    title: "Wavys Technologies — software a medida y diseño",
    description:
      "Estudio en Lima. Software a medida y diseño para negocios que ya operan, en cualquier país.",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8BVBK2Z5EB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8BVBK2Z5EB');
          `}
        </Script>
      </body>
    </html>
  );
}
