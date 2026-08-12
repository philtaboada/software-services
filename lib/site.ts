export const SITE_URL = "https://software.wavys-technologies.com" as const;

export const BOOKING_HREF = "https://cal.com/wavys-call/30min" as const;

/** Alias de compatibilidad — el CTA canónico del studio es Cal.com (brief 2026). */
export const CALENDLY_HREF = BOOKING_HREF;

export const CONTACT_EMAIL = "contact@wavys-technologies.com" as const;

export const CONTACT_EMAIL_HREF =
  "mailto:contact@wavys-technologies.com?subject=Quiero%20una%20propuesta%20para%20mi%20proyecto" as const;

export const NAP = {
  name: "Wavys Technologies",
  city: "Lima, Perú",
  region: "Perú y LatAm (remoto)",
} as const;

export const SOCIALS = {
  linkedin: "https://www.linkedin.com/company/94227811/",
  instagram: "https://www.instagram.com/wavys_technologies/",
  tiktok: "https://www.tiktok.com/@wavys.technologies",
} as const;

export const STACK = [
  "Next.js",
  "React Native",
  "NestJS",
  "Django",
  "PostgreSQL",
  "Supabase",
] as const;

export const NAV_LINKS = [
  { href: "/trabajo", label: "Trabajo" },
  { href: "/servicios", label: "Servicios" },
  { href: "/inversion", label: "Inversión" },
  { href: "/equipo", label: "Equipo" },
] as const;

export const FOOTER_LINKS = [
  { href: "/trabajo", label: "Trabajo" },
  { href: "/servicios", label: "Servicios" },
  { href: "/inversion", label: "Inversión" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/terminos", label: "Términos" },
] as const;
