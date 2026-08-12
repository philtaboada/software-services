import { CONTACT_EMAIL, NAP, SITE_URL, SOCIALS } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: NAP.name,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lima",
          addressCountry: "PE",
        },
        sameAs: [SOCIALS.linkedin, SOCIALS.instagram, SOCIALS.tiktok],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "Wavys Technologies — software a medida y diseño",
        url: SITE_URL,
        image: `${SITE_URL}/logo.png`,
        areaServed: ["PE", "LatAm"],
        parentOrganization: { "@id": `${SITE_URL}/#org` },
        description:
          "Estudio en Lima. Webs, apps y sistemas internos para negocios con tracción en Perú y LatAm.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
