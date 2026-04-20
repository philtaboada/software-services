import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Wavys Technologies — Estudio de diseño y software a medida",
    template: "%s | Wavys Technologies",
  },
  description:
    "Wavys Technologies diseña webs, apps y software a medida para negocios de España y Latinoamérica que necesitan verse más serios, vender con más claridad y crecer sobre una base técnica sólida.",
  openGraph: {
    title: "Wavys Technologies — Estudio de diseño y software a medida",
    description:
      "Dirección visual, experiencia digital y software a medida para negocios que ya no quieren parecer improvisados ni seguir operando sobre parches.",
    type: "website",
    siteName: "Wavys Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wavys Technologies — Estudio de diseño y software a medida",
    description:
      "Webs, apps y software a medida para negocios que quieren más presencia, más claridad y una base técnica seria.",
  },
};

const THEME_INIT_SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem('wavys-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (err) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="dark"
      suppressHydrationWarning
      className={`${manrope.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
