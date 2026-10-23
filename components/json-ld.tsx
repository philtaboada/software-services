import { CONTACT_EMAIL, OG_IMAGE, SITE_URL, SOCIALS } from "@/lib/site";

const languages = [
  { "@type": "Language", name: "Spanish", alternateName: "es" },
  { "@type": "Language", name: "English", alternateName: "en" },
];

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "Wavys Technologies",
        url: SITE_URL,
        email: CONTACT_EMAIL,
        logo: `${SITE_URL}/logo.png`,
        knowsLanguage: languages,
        areaServed: "Worldwide",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lima",
          addressCountry: "PE",
        },
        sameAs: [SOCIALS.linkedin, SOCIALS.instagram, SOCIALS.tiktok],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Wavys Technologies",
        inLanguage: ["es", "en"],
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "Wavys Technologies — software a medida y diseño",
        url: SITE_URL,
        image: `${SITE_URL}${OG_IMAGE}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lima",
          addressCountry: "PE",
        },
        areaServed: "Worldwide",
        availableLanguage: languages,
        parentOrganization: { "@id": `${SITE_URL}/#org` },
        description:
          "Estudio en Lima. Webs, apps y sistemas internos para negocios que ya operan, en cualquier país. Diseño e ingeniería en el mismo equipo.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
