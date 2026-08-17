import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import { FumanchuCarta } from "@/components/carta/fumanchu-carta";
import "./fu-man-chu/fumanchu.css";

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fmc-syne",
  weight: ["700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fmc-outfit",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Carta digital — demo Fu-Man-Chu",
  description:
    "Demo de carta digital Wavys: Fu-Man-Chu Chifita, del PDF al celular. La pieza que se manda por WhatsApp.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/carta" },
};

export default function CartaDemoPage() {
  return (
    <div className={`${syne.variable} ${outfit.variable}`}>
      <FumanchuCarta />
    </div>
  );
}
