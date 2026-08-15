import { Archivo, Fraunces, IBM_Plex_Mono, Playfair_Display, Spectral } from "next/font/google";
import "../radar-blog.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const spectral = Spectral({
  subsets: ["latin"],
  variable: "--font-spectral",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`radar-blog ${archivo.variable} ${fraunces.variable} ${spectral.variable} ${playfair.variable} ${plexMono.variable}`}
    >
      {children}
    </div>
  );
}
