import { CONTACT_EMAIL, NAP, OG_IMAGE, SITE_URL, SOCIALS } from "@/lib/site";
import { FAQ_ITEMS } from "@/lib/faq";

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
        logo: `${SITE_URL}/logo.png`,
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
        image: `${SITE_URL}${OG_IMAGE}`,
        areaServed: ["PE", "LatAm"],
        parentOrganization: { "@id": `${SITE_URL}/#org` },
        description:
          "Estudio en Lima. Webs, apps y sistemas internos para negocios con tracción en Perú y LatAm.",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
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
