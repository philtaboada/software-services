import { CONTACT_EMAIL, CONTACT_EMAIL_HREF } from "@/lib/site";

export type Locale = "es" | "en";

export function localeFromPath(pathname: string | null | undefined): Locale {
  if (!pathname) return "es";
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

const EN_MAIL = `mailto:${CONTACT_EMAIL}?subject=I%27d%20like%20to%20talk%20about%20a%20project`;

export const CHROME = {
  es: {
    skip: "Saltar al contenido",
    navLabel: "Navegación principal",
    mobileNavLabel: "Móvil",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    book: "Agendar llamada 30 min",
    langLabel: "Idioma",
    homeAria: "Wavys Technologies, inicio",
    emailHref: CONTACT_EMAIL_HREF,
    footer: {
      blurb:
        "Estudio de software a medida y diseño en Lima. Trabajamos en remoto con clientes en cualquier país.",
      reply: "Respondemos en menos de 24 h hábiles.",
      navigate: "Navegar",
      contact: "Contacto",
      social: "Redes",
      emailKicker: "Correo",
      bookKicker: "Agenda",
      bookLabel: "Llamada de 30 min",
      made: "Hecho con intención desde Lima",
      esNote: "",
    },
  },
  en: {
    skip: "Skip to content",
    navLabel: "Primary",
    mobileNavLabel: "Mobile",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    book: "Book a 30-min call",
    langLabel: "Language",
    homeAria: "Wavys Technologies, home",
    emailHref: EN_MAIL,
    footer: {
      blurb:
        "Custom software and design studio in Lima. We work remotely with clients anywhere.",
      reply: "We reply in under 24 business hours.",
      navigate: "Navigate",
      contact: "Contact",
      social: "Social",
      emailKicker: "Email",
      bookKicker: "Calendar",
      bookLabel: "30-min call",
      made: "Made with intent, from Lima",
      esNote: "These pages are in Spanish.",
    },
  },
} as const;

export const EN_NAV = [
  { href: "/en#work", label: "Work" },
  { href: "/en#services", label: "Services" },
  { href: "/en#process", label: "Process" },
  { href: "/en#faq", label: "FAQ" },
  { href: "/blog", label: "Blog", hrefLang: "es" as const },
] as const;

export const EN_FOOTER_LINKS = [
  { href: "/trabajo", label: "Work" },
  { href: "/carta-digital", label: "Digital menu" },
  { href: "/servicios", label: "Services" },
  { href: "/proceso", label: "Process" },
  { href: "/equipo", label: "Team" },
  { href: "/inversion", label: "Investment" },
  { href: "/blog", label: "Blog" },
  { href: "/privacidad", label: "Privacy" },
  { href: "/terminos", label: "Terms" },
] as const;
