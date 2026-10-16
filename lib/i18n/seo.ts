import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/site";

const languages = {
  es: "/",
  en: "/en",
  "x-default": "/",
} as const;

const image = {
  url: OG_IMAGE,
  width: 1200,
  height: 630,
  alt: "Wavys Technologies — software and design studio in Lima",
} as const;

export function landingMetadata(locale: "es" | "en"): Metadata {
  if (locale === "en") {
    const title = "Custom software & design studio";
    const description =
      "Lima studio for custom software and product design. Websites, apps, and internal systems for companies already running — remote, worldwide.";
    return {
      title: { absolute: `${title} | Wavys Technologies` },
      description,
      keywords: [
        "custom software",
        "product design studio",
        "web design",
        "internal systems",
        "Lima studio",
        "remote software team",
      ],
      alternates: {
        canonical: "/en",
        languages: { ...languages },
      },
      openGraph: {
        title: `${title} | Wavys Technologies`,
        description,
        type: "website",
        url: "/en",
        siteName: "Wavys Technologies",
        locale: "en_US",
        alternateLocale: ["es_PE"],
        images: [{ ...image, alt: "Wavys Technologies — custom software and design, based in Lima" }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Wavys Technologies`,
        description,
        images: [OG_IMAGE],
      },
    };
  }

  const title = "Software a medida y diseño";
  const description =
    "Estudio en Lima. Software a medida, diseño web, apps y sistemas internos para negocios que ya operan. Remoto, en cualquier país.";
  return {
    title: { absolute: `${title} | Wavys Technologies` },
    description,
    keywords: [
      "software a medida",
      "diseño web",
      "apps",
      "sistemas internos",
      "estudio en Lima",
      "desarrollo remoto",
    ],
    alternates: {
      canonical: "/",
      languages: { ...languages },
    },
    openGraph: {
      title: `${title} | Wavys Technologies`,
      description,
      type: "website",
      url: "/",
      siteName: "Wavys Technologies",
      locale: "es_PE",
      alternateLocale: ["en_US"],
      images: [{ ...image, alt: "Wavys Technologies — estudio de software y diseño en Lima" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Wavys Technologies`,
      description,
      images: [OG_IMAGE],
    },
  };
}
